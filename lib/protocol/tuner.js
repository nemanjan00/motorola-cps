/**
 * TunerSession — ESBEP tuner-specific commands for RF alignment.
 *
 * Extends the base ESBEP session with opcodes for softpot tuning,
 * auto-tune, test mode, and button test (opcodes 0x1B-0x24).
 *
 * @module protocol/tuner
 */
import { buildFrame } from './esbep.js';

/** Tuner request opcodes (ESBEP extended set) */
const TUNER_OP = {
  TUNE_PARAMS: 0x1B,
  BUTTON_TST:  0x1C,
  AUTOTUNE:    0x1F,
  SOFTPOT:     0x20,
  TESTMODE:    0x22,
  KEYPAD:      0x24,
};

/** Tuner response opcodes */
const TUNER_RESP = {
  TUNE_PARAMS_RESP: 0x87,
  BUTTON_TST_RESP:  0x88,
  AUTOTUNE_RESP:    0x8C,
  SOFTPOT_RESP:     0x8D,
  TESTMODE_RESP:    0x8E,
};

/** Sub-commands for SOFTPOT read/write */
const SOFTPOT_SUB = {
  READ:  0x00,
  WRITE: 0x01,
};

/** Sub-commands for TESTMODE enter/exit */
const TESTMODE_SUB = {
  ENTER: 0x01,
  EXIT:  0x00,
};

export class TunerSession {
  /**
   * @param {import('./esbep.js').ESBEPSession} esbep
   */
  constructor(esbep) {
    this.esbep = esbep;
  }

  /**
   * Read a single softpot value by index.
   * @param {number} index - Softpot index (0-based)
   * @returns {Promise<number>} Softpot value
   */
  async readSoftpot(index) {
    const frame = buildFrame(TUNER_OP.SOFTPOT, [SOFTPOT_SUB.READ, index & 0xFF]);
    const resp = await this.esbep.transact(frame);

    if (resp.opcode !== TUNER_RESP.SOFTPOT_RESP) {
      throw new Error(`Unexpected response opcode 0x${resp.opcode.toString(16)} for SOFTPOT read`);
    }

    // Response data: [index, value_lo, value_hi] or [index, value]
    if (resp.data.length >= 3) {
      return resp.data[1] | (resp.data[2] << 8);
    }
    if (resp.data.length >= 2) {
      return resp.data[1];
    }
    return 0;
  }

  /**
   * Write a single softpot value by index.
   * @param {number} index - Softpot index (0-based)
   * @param {number} value - Value to write
   * @returns {Promise<void>}
   */
  async writeSoftpot(index, value) {
    const frame = buildFrame(TUNER_OP.SOFTPOT, [
      SOFTPOT_SUB.WRITE,
      index & 0xFF,
      value & 0xFF,
      (value >> 8) & 0xFF,
    ]);
    const resp = await this.esbep.transact(frame);

    if (resp.opcode !== TUNER_RESP.SOFTPOT_RESP && resp.opcode !== 0x05 /* ACK */) {
      throw new Error(`Unexpected response opcode 0x${resp.opcode.toString(16)} for SOFTPOT write`);
    }
  }

  /**
   * Read all softpots using TUNE_PARAMS command.
   * @returns {Promise<Map<number, number>>} Map of index → value
   */
  async readAllSoftpots() {
    const frame = buildFrame(TUNER_OP.TUNE_PARAMS, [SOFTPOT_SUB.READ]);
    const resp = await this.esbep.transact(frame);

    if (resp.opcode !== TUNER_RESP.TUNE_PARAMS_RESP) {
      throw new Error(`Unexpected response opcode 0x${resp.opcode.toString(16)} for TUNE_PARAMS read`);
    }

    const softpots = new Map();
    // Response data is a sequence of [index, value_lo, value_hi] triplets
    // or [index, value] pairs — parse based on available length
    const data = resp.data;
    let offset = 0;
    let idx = 0;

    while (offset < data.length) {
      if (offset + 2 <= data.length) {
        const value = data[offset] | (data[offset + 1] << 8);
        softpots.set(idx, value);
        offset += 2;
        idx++;
      } else {
        softpots.set(idx, data[offset]);
        offset++;
        idx++;
      }
    }

    return softpots;
  }

  /**
   * Enter test mode on the radio.
   * @returns {Promise<void>}
   */
  async enterTestMode() {
    const frame = buildFrame(TUNER_OP.TESTMODE, [TESTMODE_SUB.ENTER]);
    const resp = await this.esbep.transact(frame);

    if (resp.opcode !== TUNER_RESP.TESTMODE_RESP && resp.opcode !== 0x05 /* ACK */) {
      throw new Error(`Unexpected response opcode 0x${resp.opcode.toString(16)} for TESTMODE enter`);
    }
  }

  /**
   * Exit test mode on the radio.
   * @returns {Promise<void>}
   */
  async exitTestMode() {
    const frame = buildFrame(TUNER_OP.TESTMODE, [TESTMODE_SUB.EXIT]);
    const resp = await this.esbep.transact(frame);

    if (resp.opcode !== TUNER_RESP.TESTMODE_RESP && resp.opcode !== 0x05 /* ACK */) {
      throw new Error(`Unexpected response opcode 0x${resp.opcode.toString(16)} for TESTMODE exit`);
    }
  }

  /**
   * Start auto-tune sequence.
   * @param {Uint8Array|number[]} [params=[]] - Auto-tune parameters (radio-specific)
   * @returns {Promise<Uint8Array>} Response data from the radio
   */
  async startAutotune(params = []) {
    const frame = buildFrame(TUNER_OP.AUTOTUNE, [...params]);
    const resp = await this.esbep.transact(frame);

    if (resp.opcode !== TUNER_RESP.AUTOTUNE_RESP && resp.opcode !== 0x05 /* ACK */) {
      throw new Error(`Unexpected response opcode 0x${resp.opcode.toString(16)} for AUTOTUNE`);
    }

    return resp.data;
  }

  /**
   * Enter button test mode and return button press data.
   * @returns {Promise<Uint8Array>} Button test response data
   */
  async buttonTest() {
    const frame = buildFrame(TUNER_OP.BUTTON_TST);
    const resp = await this.esbep.transact(frame);

    if (resp.opcode !== TUNER_RESP.BUTTON_TST_RESP && resp.opcode !== 0x05 /* ACK */) {
      throw new Error(`Unexpected response opcode 0x${resp.opcode.toString(16)} for BUTTON_TST`);
    }

    return resp.data;
  }
}

export { TUNER_OP, TUNER_RESP };
