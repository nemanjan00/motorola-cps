/**
 * ESBEP protocol — frame construction, parsing, and session management.
 *
 * Frame format:
 *   Short: [0xF0|payload_len] [opcode] [data...] [checksum]
 *   Checksum: 0xFF - (sum of all preceding bytes)
 *   Echo mode: radio echoes each sent byte before responding.
 */
import { calcChecksum, verifyChecksum } from '../util/checksum.js';

/** Request opcodes */
export const OP = {
  RESET:          0x10,
  READ:           0x11,
  QUERY_MAX_XFER: 0x13,
  WRITE:          0x17,
  SET:            0x18,
  QUERY:          0x23,
};

/** Response opcodes */
export const RESP = {
  ACK:            0x05,
  NAK:            0x06,
  MAX_XFER:       0x82,
  READ_OK:        0x84,
  READ_ERR:       0x85,
  QUERY_RESP:     0x8B,
};

/** Query sub-commands */
export const QUERY = {
  MODEL:          0x00,
  SERIAL:         0x01,
  ESN:            0x02,
  FIRMWARE:       0x03,
  CP_VERSION:     0x04,
  CP_SIZE:        0x07,
  PASSWORD_CHECK: 0x08,
  BATTERY:        0x09,
  LAST_PROGRAMMED:0x0A,
  UUID:           0x0F,
  REGION:         0x10,
};

/**
 * Build an ESBEP frame.
 * @param {number} opcode
 * @param {Uint8Array|number[]} [data=[]]
 * @returns {Uint8Array} Complete frame with header and checksum
 */
export function buildFrame(opcode, data = []) {
  const payload = [opcode, ...data];
  const header = 0xF0 | (payload.length & 0x0F);
  const frame = new Uint8Array(payload.length + 2); // header + payload + checksum
  frame[0] = header;
  for (let i = 0; i < payload.length; i++) {
    frame[1 + i] = payload[i];
  }
  frame[frame.length - 1] = calcChecksum(frame.subarray(0, frame.length - 1));
  return frame;
}

/**
 * Parse a response frame.
 * @param {Uint8Array} frame
 * @returns {{opcode: number, data: Uint8Array, valid: boolean}}
 */
export function parseResponse(frame) {
  if (frame.length < 3) return { opcode: 0, data: new Uint8Array(0), valid: false };
  const valid = verifyChecksum(frame);
  const opcode = frame[1];
  const data = frame.slice(2, frame.length - 1);
  return { opcode, data, valid };
}

/**
 * Build a READ command frame.
 * @param {number} address - 16-bit virtual address
 * @param {number} length - Bytes to read
 * @returns {Uint8Array}
 */
export function buildReadFrame(address, length) {
  return buildFrame(OP.READ, [
    (address >> 8) & 0xFF,  // addr high
    address & 0xFF,          // addr low
    length,
    0x00,                    // flags: virtual address
  ]);
}

/**
 * Build a WRITE command frame.
 * @param {number} address - 16-bit virtual address
 * @param {Uint8Array} data - Data to write
 * @returns {Uint8Array}
 */
export function buildWriteFrame(address, data) {
  return buildFrame(OP.WRITE, [
    0x00,                    // flags
    (address >> 8) & 0xFF,
    address & 0xFF,
    ...data,
  ]);
}

/**
 * Build a QUERY command frame.
 * @param {number} subCommand - Query sub-command (0x00=model, etc.)
 * @returns {Uint8Array}
 */
export function buildQueryFrame(subCommand) {
  return buildFrame(OP.QUERY, [subCommand]);
}

/**
 * ESBEP session — stateful protocol handler over a serial transport.
 */
export class ESBEPSession {
  /**
   * @param {import('./transport.js').SerialTransport} transport
   * @param {{maxTransfer?: number, echo?: boolean, timeout?: number}} [opts]
   */
  constructor(transport, opts = {}) {
    this.transport = transport;
    this.maxTransfer = opts.maxTransfer || 40;
    this.echo = opts.echo !== false;
    this.timeout = opts.timeout || 3000;
  }

  /**
   * Send a frame and receive the response.
   * Handles echo mode: for each byte sent, reads back the echo before proceeding.
   * @param {Uint8Array} frame
   * @returns {Promise<{opcode: number, data: Uint8Array}>}
   */
  async transact(frame) {
    if (this.echo) {
      // Send byte-by-byte, verify echo
      for (let i = 0; i < frame.length; i++) {
        await this.transport.write(new Uint8Array([frame[i]]));
        const echoBuf = await this.transport.read(1, this.timeout);
        if (echoBuf[0] !== frame[i]) {
          throw new Error(`Echo mismatch at byte ${i}: sent 0x${frame[i].toString(16)}, got 0x${echoBuf[0].toString(16)}`);
        }
      }
    } else {
      await this.transport.write(frame);
    }

    // Read response: first byte is header (0xF0|len or 0x05/0x06 for ACK/NAK)
    const headerBuf = await this.transport.read(1, this.timeout);
    const header = headerBuf[0];

    if (header === RESP.ACK) {
      return { opcode: RESP.ACK, data: new Uint8Array(0) };
    }
    if (header === RESP.NAK) {
      return { opcode: RESP.NAK, data: new Uint8Array(0) };
    }

    // Normal response frame: header contains payload length
    const payloadLen = header & 0x0F;
    const rest = await this.transport.read(payloadLen + 1, this.timeout); // payload + checksum
    const fullFrame = new Uint8Array(1 + payloadLen + 1);
    fullFrame[0] = header;
    fullFrame.set(rest, 1);

    const resp = parseResponse(fullFrame);
    if (!resp.valid) {
      throw new Error('Checksum error in response');
    }
    return resp;
  }

  /**
   * Read memory at a virtual address, handling chunking.
   * @param {number} address
   * @param {number} length
   * @returns {Promise<Uint8Array>}
   */
  async readMemory(address, length) {
    const chunkSize = this.maxTransfer - 8;
    const result = new Uint8Array(length);
    let offset = 0;

    while (offset < length) {
      const toRead = Math.min(chunkSize, length - offset);
      const frame = buildReadFrame(address + offset, toRead);
      const resp = await this.transact(frame);

      if (resp.opcode === RESP.READ_ERR) {
        throw new Error(`Read error at address 0x${(address + offset).toString(16)}`);
      }
      if (resp.opcode !== RESP.READ_OK) {
        throw new Error(`Unexpected response opcode 0x${resp.opcode.toString(16)}`);
      }

      result.set(resp.data, offset);
      offset += toRead;
    }

    return result;
  }

  /**
   * Write memory at a virtual address, handling chunking.
   * @param {number} address
   * @param {Uint8Array} data
   * @returns {Promise<void>}
   */
  async writeMemory(address, data) {
    const chunkSize = this.maxTransfer - 4;
    let offset = 0;

    while (offset < data.length) {
      const toWrite = Math.min(chunkSize, data.length - offset);
      const chunk = data.slice(offset, offset + toWrite);
      const frame = buildWriteFrame(address + offset, chunk);
      const resp = await this.transact(frame);

      if (resp.opcode !== RESP.READ_OK && resp.opcode !== RESP.ACK) {
        throw new Error(`Write error at address 0x${(address + offset).toString(16)}`);
      }

      offset += toWrite;
    }
  }

  /**
   * Query radio info.
   * @param {number} subCommand - QUERY.MODEL, QUERY.SERIAL, etc.
   * @returns {Promise<string>} Response as ASCII string
   */
  async query(subCommand) {
    const frame = buildQueryFrame(subCommand);
    const resp = await this.transact(frame);

    if (resp.opcode !== RESP.QUERY_RESP) {
      throw new Error(`Query failed: opcode 0x${resp.opcode.toString(16)}`);
    }

    // Response data: [sub_command, ...data_bytes]
    const dataBytes = resp.data.slice(1);
    return new TextDecoder('ascii').decode(dataBytes).replace(/\0/g, '');
  }

  /**
   * Query max transfer size.
   * @returns {Promise<number>}
   */
  async queryMaxTransfer() {
    const frame = buildFrame(OP.QUERY_MAX_XFER);
    const resp = await this.transact(frame);
    if (resp.opcode === RESP.MAX_XFER && resp.data.length >= 2) {
      this.maxTransfer = resp.data[0] | (resp.data[1] << 8);
    }
    return this.maxTransfer;
  }

  /**
   * Reset radio.
   * @returns {Promise<void>}
   */
  async resetRadio() {
    const frame = buildFrame(OP.RESET);
    await this.transact(frame);
  }

  /**
   * Close the transport.
   */
  async close() {
    await this.transport.close();
  }
}
