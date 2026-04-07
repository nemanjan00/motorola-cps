/**
 * Motorola Commercial Series radio model identification tables.
 *
 * Part number decoding, band identification, and codeplug format detection
 * based on reverse engineering of CPS R05.15 (elpelmcpservices.dll).
 */

/**
 * Band codes from part number 3rd character (after platform prefix).
 * @type {Object<string, {band: string, range: string}>}
 */
export const BAND_CODES = {
  F: { band: 'Lowband', range: '66-88 MHz' },
  J: { band: 'VHF1', range: '136-162 MHz' },
  K: { band: 'VHF2', range: '146-174 MHz' },
  N: { band: '350 MHz', range: '350-380 MHz' },
  Q: { band: 'UHF1', range: '403-440 MHz' },
  R: { band: 'UHF2', range: '438-470 MHz' },
  S: { band: 'UHF3', range: '465-495 MHz' },
  T: { band: 'UHF4', range: '490-527 MHz' },
  X: { band: 'UHF (403)', range: '403-445 MHz' },
};

/**
 * Platform prefix to form factor mapping.
 * First character: H = portable (handheld), M = mobile (vehicle-mount).
 * Next two digits: platform family.
 * @type {Object<string, {formFactor: string, platform: string, models: string[]}>}
 */
export const PLATFORM_PREFIXES = {
  H50: { formFactor: 'Portable', platform: 'Standard', models: ['CP040'] },
  H65: { formFactor: 'Portable', platform: 'Piranha', models: ['CP140', 'CP160', 'CP180', 'CP340', 'CP360', 'CP380'] },
  M50: { formFactor: 'Mobile', platform: 'Standard', models: ['CM140', 'CM160', 'CM340', 'CM360'] },
};

/**
 * Internal codenames to product models.
 * MDF_MODELTYPE field values from the codeplug.
 * @type {Object<string, {models: string[], formFactor: string, format: string, description: string}>}
 */
export const CODENAMES = {
  Guppy:   { models: ['CP040'], formFactor: 'Portable', format: 'ELP_ELM', description: 'No display' },
  G2W:     { models: ['CP040'], formFactor: 'Portable', format: 'ELP_ELM', description: '2W variant' },
  Marlin:  { models: ['CM140'], formFactor: 'Mobile', format: 'ELP_ELM', description: 'Basic' },
  'Marlin+': { models: ['CM160'], formFactor: 'Mobile', format: 'ELP_ELM', description: 'Display' },
  MPLUS:   { models: ['CM160'], formFactor: 'Mobile', format: 'ELP_ELM', description: 'Display (alias)' },
  PNK:     { models: ['CP140'], formFactor: 'Portable', format: 'ELP_ELM', description: 'Piranha No Keypad' },
  PLK:     { models: ['CP160'], formFactor: 'Portable', format: 'ELP_ELM', description: 'Piranha Limited Keypad' },
  PFK:     { models: ['CP180'], formFactor: 'Portable', format: 'ELP_ELM', description: 'Piranha Full Keypad' },
  ELT_Ninja: { models: ['Japan variant'], formFactor: 'Portable', format: 'ELP_ELM', description: 'Japan region' },
  ELT_MOR:   { models: ['Japan variant'], formFactor: 'Portable', format: 'ELP_ELM', description: 'Japan region' },
};

/**
 * Known Commercial Series radio models with their codeplug format.
 * @type {Object<string, {type: string, format: string, since: string}>}
 */
export const MODELS = {
  CP040: { type: 'Portable', format: 'ELP_ELM', since: 'R01.00' },
  CM140: { type: 'Mobile', format: 'ELP_ELM', since: 'R01.00' },
  CP140: { type: 'Portable', format: 'ELP_ELM', since: 'R02.00' },
  CP160: { type: 'Portable', format: 'ELP_ELM', since: 'R02.00' },
  CP180: { type: 'Portable', format: 'ELP_ELM', since: 'R02.00' },
  CM160: { type: 'Mobile', format: 'ELP_ELM', since: 'R02.00' },
  CM340: { type: 'Mobile', format: 'S5T', since: 'R04.00' },
  CM360: { type: 'Mobile', format: 'S5T', since: 'R04.00' },
  CP340: { type: 'Portable', format: 'S5T', since: 'R04.00' },
  CP360: { type: 'Portable', format: 'S5T', since: 'R04.00' },
  CP380: { type: 'Portable', format: 'S5T', since: 'R04.00' },
};

/**
 * S5T-format model patterns.
 * If the model string contains any of these, the codeplug uses S5T format.
 * Otherwise it uses ELP_ELM format.
 * @type {string[]}
 */
export const S5T_MODELS = ['CM340', 'CM360', 'CP340', 'CP360', 'CP380'];

/**
 * Decode a Motorola part number into its components.
 *
 * Format: [H|M][50|65][Band][Type][Channels][9|4]A[Region][Variant]
 * Example: H65QNC49ABEAN → Portable, Piranha, UHF1, basic, 4ch, region BE, variant AN
 *
 * @param {string} partNumber - Full Motorola part number
 * @returns {{
 *   formFactor: string,
 *   prefix: string,
 *   band: {code: string, band: string, range: string} | null,
 *   typeCode: string,
 *   raw: string,
 * }}
 */
export function decodePartNumber(partNumber) {
  const pn = partNumber.toUpperCase().trim();
  const result = {
    formFactor: '',
    prefix: '',
    band: null,
    typeCode: '',
    raw: pn,
  };

  if (pn.length < 4) return result;

  // First character: form factor
  result.formFactor = pn[0] === 'H' ? 'Portable' : pn[0] === 'M' ? 'Mobile' : 'Unknown';

  // Characters 1-2: platform
  result.prefix = pn.substring(0, 3);

  // Character 3: band
  const bandChar = pn[3];
  if (BAND_CODES[bandChar]) {
    result.band = { code: bandChar, ...BAND_CODES[bandChar] };
  }

  // Characters 4-5: type code (DC/NC/QC=basic, DF/NF/QF=plus, DH=full keypad)
  if (pn.length >= 6) {
    result.typeCode = pn.substring(4, 6);
  }

  return result;
}

/**
 * Determine the codeplug format for a given model string.
 *
 * @param {string} model - Model name (e.g., 'CM340', 'CP040')
 * @returns {'ELP_ELM' | 'S5T' | 'unknown'}
 */
export function getCodeplugFormat(model) {
  const upper = model.toUpperCase().trim();
  for (const s5t of S5T_MODELS) {
    if (upper.includes(s5t)) return 'S5T';
  }
  // Check if it matches any known ELP_ELM model
  for (const [name, info] of Object.entries(MODELS)) {
    if (upper.includes(name)) return info.format;
  }
  return 'unknown';
}

/**
 * Look up model info from an MDF_MODELTYPE codename string.
 *
 * @param {string} codename - Internal codename (e.g., 'Guppy', 'Marlin+')
 * @returns {typeof CODENAMES[string] | null}
 */
export function lookupCodename(codename) {
  return CODENAMES[codename] || null;
}

/**
 * Identify probable model(s) from a part number prefix.
 *
 * @param {string} prefix - 3-character prefix (e.g., 'H50', 'H65', 'M50')
 * @returns {string[]} Possible model names
 */
export function modelsForPrefix(prefix) {
  const entry = PLATFORM_PREFIXES[prefix.toUpperCase()];
  return entry ? entry.models : [];
}
