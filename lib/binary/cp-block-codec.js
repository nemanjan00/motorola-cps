/**
 * CP_BLOCK binary codec — full field-level encode/decode for 27-byte channel entries.
 * Driven by the field map in data/cp-block-fields.js.
 */
import { extractBits, packBits } from './bitfield.js';
import { CP_BLOCK_FIELDS, CP_ENUMS } from '../data/cp-block-fields.js';

const ENTRY_SIZE = 27;

/**
 * Decode a CP_BLOCK binary entry (27 bytes) into field name/value pairs.
 * @param {Uint8Array} entry - 27-byte entry data (after block header)
 * @returns {Object<string, string>} Field name → string value (XML format)
 */
export function decodeCpEntry(entry) {
  const fields = {};

  for (const field of CP_BLOCK_FIELDS) {
    const { name, byteOffset, mask, transform, format, enumTable } = field;

    if (byteOffset >= entry.length) continue;

    if (transform === 'string8') {
      // 8-byte fixed ASCII string
      const bytes = entry.slice(byteOffset, byteOffset + 8);
      let str = '';
      for (let i = 0; i < 8; i++) {
        if (bytes[i] === 0) break;
        str += String.fromCharCode(bytes[i]);
      }
      fields[name] = str;
      continue;
    }

    const raw = extractBits(entry[byteOffset], mask);

    switch (transform) {
      case 'boolean':
        fields[name] = raw ? '1' : '0';
        break;

      case 'enum':
        if (enumTable && CP_ENUMS[enumTable]) {
          fields[name] = CP_ENUMS[enumTable][raw] || String(raw);
        } else {
          fields[name] = String(raw);
        }
        break;

      case 'direct':
        fields[name] = String(raw);
        break;

      case 'div5':
        fields[name] = String(raw * 5);
        break;

      case 'div0.25': {
        const val = raw * 0.25;
        fields[name] = format === '%2.2f' ? val.toFixed(2) : val.toFixed(6);
        break;
      }

      case 'div1.5': {
        const val = raw * 1.5;
        fields[name] = format === '%2.1f' ? val.toFixed(1) : val.toFixed(6);
        break;
      }

      case 'div250':
        fields[name] = String(raw * 250);
        break;

      case 'txdev': {
        // Reverse the nonlinear encoding: byte = val * sqrt(val / 25) + 0.5
        // This is a forward decode — we store the raw byte for now
        fields[name] = String(raw);
        break;
      }

      case 'enumLookup':
        fields[name] = String(raw);
        break;

      default:
        fields[name] = String(raw);
    }
  }

  return fields;
}

/**
 * Encode field name/value pairs into a 27-byte CP_BLOCK binary entry.
 * @param {Object<string, string>} fields - Field name → string value
 * @returns {Uint8Array} 27-byte entry
 */
export function encodeCpEntry(fields) {
  const entry = new Uint8Array(ENTRY_SIZE);

  for (const field of CP_BLOCK_FIELDS) {
    const { name, byteOffset, mask, transform, enumTable } = field;
    const value = fields[name];
    if (value === undefined) continue;
    if (byteOffset >= ENTRY_SIZE) continue;

    if (transform === 'string8') {
      const str = String(value);
      for (let i = 0; i < 8; i++) {
        entry[byteOffset + i] = i < str.length ? str.charCodeAt(i) : 0;
      }
      continue;
    }

    let raw;

    switch (transform) {
      case 'boolean':
        raw = value === '1' || value === 'true' || value === 'True' ? 1 : 0;
        break;

      case 'enum':
        if (enumTable && CP_ENUMS[enumTable]) {
          raw = CP_ENUMS[enumTable].indexOf(value);
          if (raw === -1) raw = parseInt(value) || 0;
        } else {
          raw = parseInt(value) || 0;
        }
        break;

      case 'direct':
        raw = parseInt(value) || 0;
        break;

      case 'div5':
        raw = Math.round(parseInt(value) / 5);
        break;

      case 'div0.25':
        raw = Math.round(parseFloat(value) / 0.25);
        break;

      case 'div1.5':
        raw = Math.round(parseFloat(value) / 1.5);
        break;

      case 'div250':
        raw = Math.round(parseInt(value) / 250);
        break;

      case 'txdev': {
        const v = parseFloat(value);
        raw = Math.round(v * Math.sqrt(v / 25.0) + 0.5);
        break;
      }

      case 'enumLookup':
        raw = parseInt(value) || 0;
        break;

      default:
        raw = parseInt(value) || 0;
    }

    entry[byteOffset] = packBits(entry[byteOffset], mask, raw & 0xFF);
  }

  return entry;
}
