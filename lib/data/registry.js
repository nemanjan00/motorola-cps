/**
 * Central registry — unified lookup for field definitions, help, and metadata.
 */
import { ELP_ELM_FIELDS, S5T_FIELDS } from './field-defs.js';
import { ELP_ELM_BLOCKS } from './elp-elm-blocks.js';
import { S5T_BLOCKS } from './s5t-blocks.js';
import { CP_BLOCK_FIELDS, CP_ENUMS } from './cp-block-fields.js';
import { STRING_TABLE } from './string-table.js';
import { HELP } from './help.js';
import { FIELD_LABELS } from './field-labels.js';

/** All fields indexed by name */
const ALL_FIELDS = { ...ELP_ELM_FIELDS, ...S5T_FIELDS };

/** All blocks indexed by name */
const ALL_BLOCKS = { ...ELP_ELM_BLOCKS, ...S5T_BLOCKS };

/** CP_BLOCK fields indexed by name for fast lookup */
const CP_FIELD_MAP = new Map(CP_BLOCK_FIELDS.map(f => [f.name, f]));

/**
 * Get field definition by name.
 * @param {string} name - XML field name (e.g. 'CP_RXFREQ')
 * @returns {{id: number, type: string, block: string, dataType: string, label?: string, encoding?: object, enumValues?: string[], help?: string}|null}
 */
export function getFieldDef(name) {
  const field = ALL_FIELDS[name];
  if (!field) return null;

  const result = { ...field, name };

  // Add label, inputType, and enumValues from FIELD_LABELS (authoritative source)
  const labelDef = FIELD_LABELS[name];
  if (labelDef) {
    result.label = labelDef.label;
    result.inputType = labelDef.inputType;
    if (labelDef.enumValues) {
      result.enumValues = labelDef.enumValues;
    }
    if (labelDef.readOnly) {
      result.readOnly = true;
    }
  }

  // Fallback: display label from string table if FIELD_LABELS didn't provide one
  if (!result.label && field.id && STRING_TABLE[field.id]) {
    result.label = STRING_TABLE[field.id];
  }

  // Add binary encoding from CP_BLOCK map if available
  const cpField = CP_FIELD_MAP.get(name);
  if (cpField) {
    result.encoding = {
      byteOffset: cpField.byteOffset,
      mask: cpField.mask,
      transform: cpField.transform,
      format: cpField.format || null,
      enumTable: cpField.enumTable || null,
    };
  }

  // Add help text from FIELD_LABELS helpKey mapping first, then fallback patterns
  if (labelDef && labelDef.helpKey && HELP[labelDef.helpKey]) {
    result.help = HELP[labelDef.helpKey];
  } else {
    // Fallback: try several key patterns
    const helpKeys = [
      name.toLowerCase(),
      name.replace(/^CP_/, '').replace(/^RC_/, '').replace(/^DR_/, '').toLowerCase(),
    ];
    for (const k of helpKeys) {
      if (HELP[k]) {
        result.help = HELP[k];
        break;
      }
    }
  }

  return result;
}

/**
 * Get block definition by name.
 * @param {string} name - Block name (e.g. 'CP_BLOCK')
 * @returns {object|null}
 */
export function getBlockDef(name) {
  return ALL_BLOCKS[name] || null;
}

/**
 * Get all field names for a given block.
 * @param {string} blockName
 * @returns {string[]}
 */
export function getBlockFields(blockName) {
  return Object.entries(ALL_FIELDS)
    .filter(([_, def]) => def.block === blockName)
    .map(([name]) => name);
}

/**
 * Get enum values for a CP_BLOCK enum table.
 * @param {string} tableName - e.g. 'POWER_LEVEL'
 * @returns {string[]|null}
 */
export function getEnumValues(tableName) {
  return CP_ENUMS[tableName] || null;
}

/**
 * Get all block definitions for a format.
 * @param {'ELP_ELM'|'S5T'} format
 * @returns {Object}
 */
export function getBlocksForFormat(format) {
  return format === 'S5T' ? S5T_BLOCKS : ELP_ELM_BLOCKS;
}

/**
 * Get all field definitions for a format.
 * @param {'ELP_ELM'|'S5T'} format
 * @returns {Object}
 */
export function getFieldsForFormat(format) {
  return format === 'S5T' ? S5T_FIELDS : ELP_ELM_FIELDS;
}

/**
 * Get string table entry by resource ID.
 * @param {number} id
 * @returns {string|null}
 */
export function getStringLabel(id) {
  return STRING_TABLE[id] || null;
}

/**
 * Get help text by topic key.
 * @param {string} key
 * @returns {string|null}
 */
export function getHelp(key) {
  return HELP[key] || null;
}
