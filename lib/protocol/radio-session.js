/**
 * RadioSession — high-level radio programming: identify, read codeplug, write codeplug.
 * Implements the bootstrap sequences from EEPROM_ADDRESS_MAP.md.
 */
import { ESBEPSession, QUERY, OP, RESP, buildFrame } from './esbep.js';
import { parseBlockHeader, buildBlockHeader, blockBinarySize } from '../binary/block-codec.js';
import { decodeCpEntry, encodeCpEntry } from '../binary/cp-block-codec.js';
import { Codeplug } from '../codeplug/codeplug.js';
import { getCodeplugFormat } from '../data/models.js';
import { ELP_ELM_BLOCKS } from '../data/elp-elm-blocks.js';
import { S5T_BLOCKS } from '../data/s5t-blocks.js';

/** Fixed offsets */
const CODEPLUG_START = 642;
const ELP_ELM_RI_SIZE = 86;
const ELP_ELM_MDF_SIZE = 48;

/**
 * @typedef {Object} RadioInfo
 * @property {string} model
 * @property {string} serial
 * @property {string} firmware
 * @property {string} cpVersion
 * @property {number} cpSize
 * @property {'ELP_ELM'|'S5T'} format
 * @property {string} [region]
 */

export class RadioSession {
  /**
   * @param {ESBEPSession} esbep
   */
  constructor(esbep) {
    this.esbep = esbep;
  }

  /**
   * Identify the connected radio.
   * @returns {Promise<RadioInfo>}
   */
  async identify() {
    const model = await this.esbep.query(QUERY.MODEL);
    const serial = await this.esbep.query(QUERY.SERIAL);
    const firmware = await this.esbep.query(QUERY.FIRMWARE);
    const cpVersion = await this.esbep.query(QUERY.CP_VERSION);
    const cpSizeStr = await this.esbep.query(QUERY.CP_SIZE);
    const cpSize = parseInt(cpSizeStr) || 0;

    let region;
    try { region = await this.esbep.query(QUERY.REGION); } catch (e) { /* optional */ }

    const format = getCodeplugFormat(model);

    return { model, serial, firmware, cpVersion, cpSize, format, region };
  }

  /**
   * Read full codeplug from radio.
   * @param {RadioInfo} [info] - If not provided, will identify first
   * @param {function(number, number): void} [onProgress] - Progress callback (bytesRead, totalBytes)
   * @returns {Promise<Codeplug>}
   */
  async readCodeplug(info, onProgress) {
    if (!info) info = await this.identify();
    return info.format === 'S5T'
      ? this._readS5T(info, onProgress)
      : this._readElpElm(info, onProgress);
  }

  /**
   * Write codeplug to radio.
   * @param {Codeplug} codeplug
   * @param {function(number, number): void} [onProgress]
   * @returns {Promise<void>}
   */
  async writeCodeplug(codeplug, onProgress) {
    return codeplug.format === 'S5T'
      ? this._writeS5T(codeplug, onProgress)
      : this._writeElpElm(codeplug, onProgress);
  }

  // --- ELP_ELM implementation ---

  async _readElpElm(info, onProgress) {
    const codeplug = new Codeplug('ELP_ELM');
    let bytesRead = 0;
    const total = info.cpSize || 3000;

    // 1. Read RI_BLOCK at fixed offset 642
    const riData = await this.esbep.readMemory(CODEPLUG_START, ELP_ELM_RI_SIZE);
    bytesRead += ELP_ELM_RI_SIZE;
    onProgress?.(bytesRead, total);

    // 2. Read MDF_BLOCK at fixed offset 728
    const mdfData = await this.esbep.readMemory(CODEPLUG_START + ELP_ELM_RI_SIZE, ELP_ELM_MDF_SIZE);
    bytesRead += ELP_ELM_MDF_SIZE;
    onProgress?.(bytesRead, total);

    // Store RI and MDF as raw binary blocks (with EEPROM addresses for write-back)
    this._storeRawBlock(codeplug, 'RI_BLOCK', riData, CODEPLUG_START);
    this._storeRawBlock(codeplug, 'MDF_BLOCK', mdfData, CODEPLUG_START + ELP_ELM_RI_SIZE);

    // 3. Determine portable vs mobile from MDF (affects RRW offset)
    // MDF_RADTYPE at a fixed position in the block — for now use model prefix
    const isPortable = info.model.startsWith('H');
    const rrwOffset = isPortable ? 759 : 767;

    // 4. Read RRW header (9 bytes)
    const rrwHeader = await this.esbep.readMemory(CODEPLUG_START + rrwOffset - CODEPLUG_START + CODEPLUG_START, 9);
    bytesRead += 9;

    const rrwSize = rrwHeader[0] | (rrwHeader[1] << 8);
    // Bytes 5-6: TC_BLOCK vector (relative to RRW start? or absolute?)
    // Actually from EEPROM map, these are absolute EEPROM offsets
    const tcVec = rrwHeader[5] | (rrwHeader[6] << 8);
    const vbVec = rrwHeader[7] | (rrwHeader[8] << 8);

    // 5. Read TC_BLOCK (10 bytes)
    const tcData = await this.esbep.readMemory(tcVec, 10);
    bytesRead += 10;

    // 6. Read VECT_BLOCK (114 bytes = 2 + 56*2)
    const vbData = await this.esbep.readMemory(vbVec, 114);
    bytesRead += 114;
    onProgress?.(bytesRead, total);

    const vectQty = vbData[0] | (vbData[1] << 8);
    const vectors = [];
    for (let i = 0; i < vectQty; i++) {
      vectors.push(vbData[2 + i * 2] | (vbData[3 + i * 2] << 8));
    }

    // 7. Read each present block
    const blockNames = Object.keys(ELP_ELM_BLOCKS);
    for (let idx = 0; idx < vectors.length && idx < blockNames.length; idx++) {
      const offset = vectors[idx];
      if (offset === 0) continue;
      if (!tcBitSet(tcData, idx)) continue;

      const blockName = blockNames[idx];
      if (['RI_BLOCK', 'MDF_BLOCK'].includes(blockName)) continue; // already read

      const blockDef = ELP_ELM_BLOCKS[blockName];
      if (!blockDef) continue;

      // Read header first to determine size
      const hdrData = await this.esbep.readMemory(offset, 5);
      const hdr = parseBlockHeader(hdrData, 'ELP_ELM');
      const dataSize = hdr.entrySize * hdr.entryQty;

      if (dataSize > 0) {
        const blockData = await this.esbep.readMemory(offset, hdr.headerSize + dataSize);
        this._storeRawBlock(codeplug, blockName, blockData, offset);
        bytesRead += hdr.headerSize + dataSize;
        onProgress?.(bytesRead, total);
      }
    }

    return codeplug;
  }

  async _readS5T(info, onProgress) {
    const codeplug = new Codeplug('S5T');
    let bytesRead = 0;
    const total = info.cpSize || 2000;

    // 1. Read S5_CFG_BLOCK at offset 642 (9 bytes)
    const cfgData = await this.esbep.readMemory(CODEPLUG_START, 9);
    bytesRead += 9;

    const cpSize = cfgData[3] | (cfgData[4] << 8);
    const tcbVec = cfgData[5] | (cfgData[6] << 8);
    const vbVec = cfgData[7] | (cfgData[8] << 8);

    // 2. Read TC_BLOCK (7 bytes)
    const tcData = await this.esbep.readMemory(tcbVec, 7);
    bytesRead += 7;

    // 3. Read VECT_BLOCK (65 bytes = 1 + 32*2)
    const vbData = await this.esbep.readMemory(vbVec, 65);
    bytesRead += 65;
    onProgress?.(bytesRead, total);

    const numVectors = vbData[0];
    const vectors = [];
    for (let i = 0; i < numVectors; i++) {
      vectors.push(vbData[1 + i * 2] | (vbData[2 + i * 2] << 8));
    }

    // 4. Read each block
    const blockNames = Object.keys(S5T_BLOCKS);
    for (let idx = 0; idx < vectors.length && idx < blockNames.length; idx++) {
      const offset = vectors[idx];
      if (offset === 0) continue;

      const blockName = blockNames[idx];
      const hdrData = await this.esbep.readMemory(offset, 5);
      const hdr = parseBlockHeader(hdrData, 'S5T');
      const dataSize = hdr.entrySize * hdr.entryQty;

      if (dataSize > 0) {
        const blockData = await this.esbep.readMemory(offset, 5 + dataSize);
        this._storeRawBlock(codeplug, blockName, blockData, offset);
        bytesRead += 5 + dataSize;
        onProgress?.(bytesRead, total);
      }
    }

    return codeplug;
  }

  // --- Write implementations ---

  async _writeElpElm(codeplug, onProgress) {
    if (codeplug.vectAddresses.size === 0) {
      throw new Error('Write requires prior read to establish VECT addresses');
    }

    let bytesWritten = 0;
    const totalBytes = this._calcTotalWriteBytes(codeplug);

    for (const [blockName, block] of codeplug.blocks) {
      if (!block.rawBinary) continue;
      const address = codeplug.vectAddresses.get(blockName);
      if (address === undefined) continue;

      const data = this._prepareBlockData(codeplug, blockName, block);
      await this.esbep.writeMemory(address, data);
      bytesWritten += data.length;
      onProgress?.(bytesWritten, totalBytes);
    }

    // Update last-programmed timestamp via SET command (opcode 0x18, sub 0x03)
    await this._setLastProgrammed();

    // Reset radio
    await this.esbep.resetRadio();
  }

  async _writeS5T(codeplug, onProgress) {
    if (codeplug.vectAddresses.size === 0) {
      throw new Error('Write requires prior read to establish VECT addresses');
    }

    let bytesWritten = 0;
    const totalBytes = this._calcTotalWriteBytes(codeplug);

    for (const [blockName, block] of codeplug.blocks) {
      if (!block.rawBinary) continue;
      const address = codeplug.vectAddresses.get(blockName);
      if (address === undefined) continue;

      // S5T blocks: passthrough rawBinary (CP_BLOCK re-encode not applicable to S5T)
      await this.esbep.writeMemory(address, block.rawBinary);
      bytesWritten += block.rawBinary.length;
      onProgress?.(bytesWritten, totalBytes);
    }

    // Update last-programmed timestamp
    await this._setLastProgrammed();

    // Reset radio
    await this.esbep.resetRadio();
  }

  /**
   * Prepare block data for writing. For CP_BLOCK, re-encode entries from fields;
   * for all other blocks, use rawBinary as-is.
   * @param {Codeplug} codeplug
   * @param {string} blockName
   * @param {import('../codeplug/codeplug.js').Block} block
   * @returns {Uint8Array}
   */
  _prepareBlockData(codeplug, blockName, block) {
    if (blockName !== 'CP_BLOCK' || !block.entries || block.entries.length === 0) {
      return block.rawBinary;
    }

    // Re-encode CP_BLOCK: keep original header, rebuild data portion from fields
    const hdr = parseBlockHeader(block.rawBinary, codeplug.format);
    const headerBytes = block.rawBinary.slice(0, hdr.headerSize);
    const entrySize = hdr.entrySize;
    const result = new Uint8Array(hdr.headerSize + entrySize * block.entries.length);
    result.set(headerBytes, 0);

    for (let i = 0; i < block.entries.length; i++) {
      const encoded = encodeCpEntry(block.entries[i].fields);
      result.set(encoded.slice(0, entrySize), hdr.headerSize + i * entrySize);
    }

    return result;
  }

  /**
   * Calculate total bytes to write for progress reporting.
   * @param {Codeplug} codeplug
   * @returns {number}
   */
  _calcTotalWriteBytes(codeplug) {
    let total = 0;
    for (const [blockName, block] of codeplug.blocks) {
      if (!block.rawBinary) continue;
      if (codeplug.vectAddresses.get(blockName) === undefined) continue;
      total += block.rawBinary.length;
    }
    return total;
  }

  /**
   * Set the last-programmed timestamp on the radio using SET command.
   * CPS timestamp format: [YY, MM, DD, HH, MM, SS] (6 bytes BCD).
   * SET opcode 0x18, sub-command 0x03 (LAST_PROGRAMMED).
   * @returns {Promise<void>}
   */
  async _setLastProgrammed() {
    const now = new Date();
    const timestamp = new Uint8Array([
      0x03, // sub-command: last programmed
      now.getFullYear() % 100,
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ]);
    const frame = buildFrame(OP.SET, timestamp);
    const resp = await this.esbep.transact(frame);
    if (resp.opcode === RESP.NAK) {
      // Non-fatal: some radios may not support timestamp update
    }
  }

  // --- Helpers ---

  /**
   * Store raw binary data as a block on the codeplug.
   * @param {Codeplug} codeplug
   * @param {string} name - Block name
   * @param {Uint8Array} data - Raw EEPROM bytes
   * @param {number} [address] - EEPROM address for write-back (stored in vectAddresses)
   */
  _storeRawBlock(codeplug, name, data, address) {
    const block = {
      name,
      entries: [{ fields: {} }],
      rawBinary: new Uint8Array(data),
    };

    // For CP_BLOCK, also decode fields
    if (name === 'CP_BLOCK' && data.length > 5) {
      const hdr = parseBlockHeader(data, codeplug.format);
      block.entries = [];
      for (let i = 0; i < hdr.entryQty; i++) {
        const entryStart = hdr.headerSize + i * hdr.entrySize;
        const entryData = data.slice(entryStart, entryStart + hdr.entrySize);
        const fields = decodeCpEntry(entryData);
        block.entries.push({ fields });
      }
      block.entrySize = hdr.entrySize;
      block.entryQty = hdr.entryQty;
    }

    codeplug.setBlock(name, block);

    // Store VECT address for write-back
    if (address !== undefined) {
      codeplug.vectAddresses.set(name, address);
    }
  }
}

/**
 * Check if a bit in TC_BLOCK is set for a given VECT index.
 * @param {Uint8Array} tc - TC_BLOCK data (10 bytes for ELP_ELM)
 * @param {number} idx - VECT index
 * @returns {boolean}
 */
function tcBitSet(tc, idx) {
  const byteIdx = Math.floor(idx / 8);
  const bitIdx = idx % 8;
  return byteIdx < tc.length && (tc[byteIdx] & (1 << bitIdx)) !== 0;
}
