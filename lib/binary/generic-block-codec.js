/**
 * Generic block codec — raw binary passthrough for blocks without field-level mapping.
 * Stores/returns raw bytes unchanged, enabling safe round-trip for unmapped blocks.
 */

/**
 * "Decode" a generic block — just returns the raw bytes as-is.
 * @param {Uint8Array} data - Raw entry data (after header)
 * @returns {Uint8Array}
 */
export function decodeGenericBlock(data) {
  return new Uint8Array(data);
}

/**
 * "Encode" a generic block — returns the stored raw bytes.
 * @param {Uint8Array} data - Previously stored raw bytes
 * @returns {Uint8Array}
 */
export function encodeGenericBlock(data) {
  return new Uint8Array(data);
}
