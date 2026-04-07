/**
 * CPS file I/O — .cps files are XOR-obfuscated XML.
 * XOR key: 0x95 applied to every byte.
 */

const XOR_KEY = 0x95;

/**
 * Decode a .cps file buffer to XML string.
 * @param {Uint8Array|Buffer} data - Raw .cps file bytes
 * @returns {string} XML content
 */
export function decodeCps(data) {
  const decoded = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    decoded[i] = data[i] ^ XOR_KEY;
  }
  // Handle BOM if present
  const str = new TextDecoder('utf-8').decode(decoded);
  return str.charCodeAt(0) === 0xFEFF ? str.slice(1) : str;
}

/**
 * Encode XML string to .cps file buffer.
 * @param {string} xml - XML content
 * @returns {Uint8Array} Encoded .cps file bytes
 */
export function encodeCps(xml) {
  const bytes = new TextEncoder().encode(xml);
  const encoded = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    encoded[i] = bytes[i] ^ XOR_KEY;
  }
  return encoded;
}

/**
 * Read a .cps file (Node.js).
 * @param {string} path - File path
 * @returns {Promise<string>} XML content
 */
export async function readCpsFile(path) {
  const mod = 'node:fs/promises';
  const fs = await import(/* @vite-ignore */ mod);
  const data = await fs.readFile(path);
  return decodeCps(new Uint8Array(data));
}

/**
 * Write a .cps file (Node.js).
 * @param {string} path - File path
 * @param {string} xml - XML content
 */
export async function writeCpsFile(path, xml) {
  const mod = 'node:fs/promises';
  const fs = await import(/* @vite-ignore */ mod);
  await fs.writeFile(path, encodeCps(xml));
}
