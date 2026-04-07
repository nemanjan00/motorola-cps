/**
 * Bit-field extraction and packing helpers.
 */

/**
 * Count trailing zeros in a byte mask.
 * @param {number} mask
 * @returns {number}
 */
export function ctz(mask) {
  if (mask === 0) return 8;
  let n = 0;
  while ((mask & 1) === 0) { mask >>= 1; n++; }
  return n;
}

/**
 * Extract a value from a byte using a bitmask.
 * @param {number} byte_ - The source byte
 * @param {number} mask - Bitmask (e.g. 0xC0 for bits 6-7)
 * @returns {number} Extracted value, shifted to bit 0
 */
export function extractBits(byte_, mask) {
  return (byte_ & mask) >>> ctz(mask);
}

/**
 * Pack a value into a byte using a bitmask.
 * @param {number} byte_ - The original byte
 * @param {number} mask - Bitmask
 * @param {number} value - Value to pack (pre-shift position)
 * @returns {number} Modified byte
 */
export function packBits(byte_, mask, value) {
  const shift = ctz(mask);
  return (byte_ & ~mask) | ((value << shift) & mask);
}
