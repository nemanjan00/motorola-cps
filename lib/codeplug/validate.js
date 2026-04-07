/**
 * Codeplug validation — checks field values, frequency ranges, and required blocks.
 *
 * @module codeplug/validate
 */
import { FIELD_LABELS } from '../data/field-labels.js';
import { ELP_ELM_FIELDS, S5T_FIELDS } from '../data/field-defs.js';

/**
 * @typedef {Object} ValidationResult
 * @property {string} field - Field name
 * @property {string} block - Block name
 * @property {number} entry - Entry index
 * @property {string} message - Human-readable description
 * @property {'error'|'warning'} severity
 */

/** Required blocks per format */
const REQUIRED_BLOCKS = {
  ELP_ELM: ['MDF_BLOCK', 'RI_BLOCK', 'CP_BLOCK'],
  S5T: ['S5_CFG_BLOCK', 'S5_RADIO_INFO_BLOCK'],
};

/**
 * Validate a Codeplug for errors and warnings.
 * @param {import('./codeplug.js').Codeplug} codeplug
 * @returns {ValidationResult[]}
 */
export function validateCodeplug(codeplug) {
  /** @type {ValidationResult[]} */
  const results = [];

  // 1. Check required blocks
  const required = REQUIRED_BLOCKS[codeplug.format] || [];
  for (const blockName of required) {
    if (!codeplug.getBlock(blockName)) {
      results.push({
        field: '',
        block: blockName,
        entry: -1,
        message: `Required block ${blockName} is missing`,
        severity: 'error',
      });
    }
  }

  // 2. Read band limits from RI_BLOCK / S5_RADIO_INFO_BLOCK for frequency validation
  let bandMinFreq = null;
  let bandMaxFreq = null;

  if (codeplug.format === 'ELP_ELM') {
    const minStr = codeplug.getField('RI_BLOCK', 'RI_BANDMINFREQ');
    const maxStr = codeplug.getField('RI_BLOCK', 'RI_BANDMAXFREQ');
    if (minStr) bandMinFreq = parseFloat(minStr);
    if (maxStr) bandMaxFreq = parseFloat(maxStr);
  } else {
    const minStr = codeplug.getField('S5_RADIO_INFO_BLOCK', 'S5_RI_BAND_MIN_FREQ');
    const maxStr = codeplug.getField('S5_RADIO_INFO_BLOCK', 'S5_RI_BAND_MAX_FREQ');
    if (minStr) bandMinFreq = parseFloat(minStr);
    if (maxStr) bandMaxFreq = parseFloat(maxStr);
  }

  // Build field lookup by format
  const fieldDefs = codeplug.format === 'S5T' ? S5T_FIELDS : ELP_ELM_FIELDS;

  // 3. Validate every field in every block
  for (const [blockName, block] of codeplug.blocks) {
    for (let entryIdx = 0; entryIdx < block.entries.length; entryIdx++) {
      const entry = block.entries[entryIdx];
      if (!entry || !entry.fields) continue;

      for (const [fieldName, value] of Object.entries(entry.fields)) {
        const label = FIELD_LABELS[fieldName];
        const fieldDef = fieldDefs[fieldName];
        // Determine inputType: prefer FIELD_LABELS, fall back to field-defs dataType
        const inputType = (label && label.inputType) || (fieldDef && fieldDef.dataType) || null;
        if (!inputType) continue;

        const validationErrors = validateFieldValue(fieldName, value, inputType, label);
        for (const msg of validationErrors) {
          results.push({
            field: fieldName,
            block: blockName,
            entry: entryIdx,
            message: msg.message,
            severity: msg.severity,
          });
        }

        // 4. Frequency range checks for RX/TX freq fields
        if (fieldName === 'CP_RXFREQ' || fieldName === 'CP_TXFREQ') {
          const freq = parseFloat(value);
          if (!isNaN(freq) && freq > 0) {
            if (bandMinFreq !== null && freq < bandMinFreq) {
              results.push({
                field: fieldName,
                block: blockName,
                entry: entryIdx,
                message: `${fieldName} value ${value} is below band minimum ${bandMinFreq}`,
                severity: 'error',
              });
            }
            if (bandMaxFreq !== null && freq > bandMaxFreq) {
              results.push({
                field: fieldName,
                block: blockName,
                entry: entryIdx,
                message: `${fieldName} value ${value} is above band maximum ${bandMaxFreq}`,
                severity: 'error',
              });
            }
          }
        }
      }
    }
  }

  return results;
}

/**
 * Validate a single field value against its inputType.
 * @param {string} fieldName
 * @param {string} value
 * @param {string} inputType
 * @param {import('../data/field-labels.js').FieldLabel|undefined} label
 * @returns {{message: string, severity: 'error'|'warning'}[]}
 */
function validateFieldValue(fieldName, value, inputType, label) {
  /** @type {{message: string, severity: 'error'|'warning'}[]} */
  const errors = [];

  switch (inputType) {
    case 'boolean':
      if (value !== '0' && value !== '1') {
        errors.push({
          message: `${fieldName} must be "0" or "1", got "${value}"`,
          severity: 'error',
        });
      }
      break;

    case 'enum':
      if (label && label.enumValues && label.enumValues.length > 0) {
        if (!label.enumValues.includes(value)) {
          errors.push({
            message: `${fieldName} value "${value}" is not in allowed values: [${label.enumValues.join(', ')}]`,
            severity: 'warning',
          });
        }
      }
      break;

    case 'integer': {
      const parsed = parseInt(value, 10);
      if (isNaN(parsed) || String(parsed) !== value.trim()) {
        errors.push({
          message: `${fieldName} must be an integer, got "${value}"`,
          severity: 'error',
        });
      }
      break;
    }

    case 'float': {
      const parsed = parseFloat(value);
      if (isNaN(parsed)) {
        errors.push({
          message: `${fieldName} must be a float, got "${value}"`,
          severity: 'error',
        });
      }
      break;
    }

    case 'frequency': {
      const parsed = parseFloat(value);
      if (isNaN(parsed)) {
        errors.push({
          message: `${fieldName} must be a valid frequency, got "${value}"`,
          severity: 'error',
        });
      } else if (parsed <= 0) {
        errors.push({
          message: `${fieldName} frequency must be > 0, got "${value}"`,
          severity: 'error',
        });
      }
      break;
    }

    case 'string':
      if (value === '' || value === undefined || value === null) {
        errors.push({
          message: `${fieldName} must be a non-empty string`,
          severity: 'warning',
        });
      }
      break;

    // 'password' and other types: no validation
    default:
      break;
  }

  return errors;
}
