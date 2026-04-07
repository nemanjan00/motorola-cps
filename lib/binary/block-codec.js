/**
 * Block header parsing and building for both ELP_ELM and S5T formats.
 */

/**
 * @typedef {Object} BlockHeader
 * @property {number} flags - Header byte 0 (ELP_ELM) or checksum type (S5T)
 * @property {number} entrySize - Bytes per entry
 * @property {number} entryQty - Number of entries
 * @property {number} headerSize - Total header size in bytes (4 or 5)
 */

/**
 * Parse block header from binary data.
 * @param {Uint8Array} data - Raw bytes starting at block offset
 * @param {'ELP_ELM'|'S5T'} format
 * @returns {BlockHeader}
 */
export function parseBlockHeader(data, format) {
  if (format === 'S5T') {
    return {
      flags: data[0],
      entrySize: data[1] | (data[2] << 8),  // uint16 LE
      entryQty: data[3] | (data[4] << 8),   // uint16 LE
      headerSize: 5,
    };
  }

  // ELP_ELM: header is 4 bytes normally, 5 if flags & 0x40 (list block with alias)
  const flags = data[0];
  const entrySize = data[1];
  const entryQty = data[2];
  const headerSize = (flags & 0x40) ? 5 : 4;

  return { flags, entrySize, entryQty, headerSize };
}

/**
 * Build block header bytes.
 * @param {BlockHeader} header
 * @param {'ELP_ELM'|'S5T'} format
 * @returns {Uint8Array}
 */
export function buildBlockHeader(header, format) {
  if (format === 'S5T') {
    const buf = new Uint8Array(5);
    buf[0] = header.flags;
    buf[1] = header.entrySize & 0xFF;
    buf[2] = (header.entrySize >> 8) & 0xFF;
    buf[3] = header.entryQty & 0xFF;
    buf[4] = (header.entryQty >> 8) & 0xFF;
    return buf;
  }

  const size = header.headerSize || ((header.flags & 0x40) ? 5 : 4);
  const buf = new Uint8Array(size);
  buf[0] = header.flags;
  buf[1] = header.entrySize;
  buf[2] = header.entryQty;
  // buf[3] = 0 (reserved)
  return buf;
}

/**
 * Get total block binary size.
 * @param {BlockHeader} header
 * @returns {number}
 */
export function blockBinarySize(header) {
  return header.headerSize + header.entrySize * header.entryQty;
}
