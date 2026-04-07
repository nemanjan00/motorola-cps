/**
 * ESBEP checksum: 0xFF - (sum of all bytes & 0xFF)
 */

/**
 * Calculate ESBEP checksum for a frame (excluding the checksum byte itself).
 * @param {Uint8Array} data - Frame bytes without checksum
 * @returns {number} Checksum byte
 */
export function calcChecksum(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return (0xFF - (sum & 0xFF)) & 0xFF;
}

/**
 * Verify ESBEP checksum on a complete frame (including checksum byte).
 * Sum of all bytes including checksum should equal 0xFF.
 * @param {Uint8Array} frame - Complete frame with checksum
 * @returns {boolean}
 */
export function verifyChecksum(frame) {
  let sum = 0;
  for (let i = 0; i < frame.length; i++) {
    sum += frame[i];
  }
  return (sum & 0xFF) === 0xFF;
}
