/**
 * Codeplug — in-memory model for a Motorola Commercial Series codeplug.
 * Field values are always strings (matching XML format).
 */
import { getFieldDef, getBlockFields, getBlockDef } from '../data/registry.js';
import { validateCodeplug } from './validate.js';

/**
 * @typedef {Object} BlockEntry
 * @property {Object<string, string>} fields - field name → string value
 */

/**
 * @typedef {Object} Block
 * @property {string} name - Block name
 * @property {number} [id] - Block ID from XML
 * @property {number} [entrySize] - Bytes per entry
 * @property {number} [entryQty] - Number of entries
 * @property {number} [headerValue] - ENTRY_HEADER value (128/192/0)
 * @property {BlockEntry[]} entries - Array of entries
 * @property {Uint8Array|null} rawBinary - Raw EEPROM bytes (null if loaded from XML only)
 */

export class Codeplug {
  /**
   * @param {'ELP_ELM'|'S5T'} format
   */
  constructor(format) {
    /** @type {'ELP_ELM'|'S5T'} */
    this.format = format;

    /** @type {Map<string, Block>} */
    this.blocks = new Map();

    /** @type {Object} Metadata from RRW/CFG */
    this.meta = {};

    /** @type {Map<string, number>} Block name → EEPROM VECT address (set during radio read) */
    this.vectAddresses = new Map();
  }

  /**
   * Get a block by name.
   * @param {string} name
   * @returns {Block|undefined}
   */
  getBlock(name) {
    return this.blocks.get(name);
  }

  /**
   * Set a block.
   * @param {string} name
   * @param {Block} block
   */
  setBlock(name, block) {
    this.blocks.set(name, block);
  }

  /**
   * Get a field value from a block.
   * @param {string} blockName
   * @param {string} fieldName
   * @param {number} [entryIndex=0]
   * @returns {string|undefined}
   */
  getField(blockName, fieldName, entryIndex = 0) {
    const block = this.blocks.get(blockName);
    if (!block || !block.entries[entryIndex]) return undefined;
    return block.entries[entryIndex].fields[fieldName];
  }

  /**
   * Set a field value.
   * @param {string} blockName
   * @param {string} fieldName
   * @param {string} value
   * @param {number} [entryIndex=0]
   */
  setField(blockName, fieldName, value, entryIndex = 0) {
    const block = this.blocks.get(blockName);
    if (!block) throw new Error(`Block ${blockName} not found`);
    if (!block.entries[entryIndex]) {
      block.entries[entryIndex] = { fields: {} };
    }
    block.entries[entryIndex].fields[fieldName] = value;
  }

  /**
   * Get field definition with help, type, and possible values.
   * @param {string} fieldName
   * @returns {object|null}
   */
  describeField(fieldName) {
    return getFieldDef(fieldName);
  }

  /**
   * Get all field names in a block.
   * @param {string} blockName
   * @returns {string[]}
   */
  listFields(blockName) {
    return getBlockFields(blockName);
  }

  /**
   * Get model number from Radio Info block.
   * @returns {string|undefined}
   */
  getModelNumber() {
    return this.getField('RI_BLOCK', 'RI_MODELNUM') ||
           this.getField('S5_RADIO_INFO_BLOCK', 'S5_RI_MODELNUM');
  }

  /**
   * Get serial number.
   * @returns {string|undefined}
   */
  getSerialNumber() {
    return this.getField('RI_BLOCK', 'RI_SERIALNUM') ||
           this.getField('S5_RADIO_INFO_BLOCK', 'S5_RI_SERIAL_NO');
  }

  /**
   * Get channel count.
   * @returns {number}
   */
  getChannelCount() {
    const cpBlock = this.blocks.get('CP_BLOCK') || this.blocks.get('S5_CHANNEL_LIST_BLOCK');
    return cpBlock ? cpBlock.entries.length : 0;
  }

  /**
   * Get all block names present in this codeplug.
   * @returns {string[]}
   */
  listBlocks() {
    return [...this.blocks.keys()];
  }

  /**
   * Validate the codeplug for errors and warnings.
   * @returns {import('./validate.js').ValidationResult[]}
   */
  validate() {
    return validateCodeplug(this);
  }
}
