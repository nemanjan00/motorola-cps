/**
 * ELP_ELM block field maps for RC_BLOCK, DR_BLOCK, MDC_BLOCK, SC_BLOCK, DTMF_BLOCK.
 *
 * Sources:
 *   - pretransform.mot XSL (write-direction transformations, field ordering)
 *   - Detailed Report.xsl (read-direction display, field types)
 *   - DATA_PIPELINE.md (verified CP_BLOCK encoding patterns)
 *   - EEPROM_ADDRESS_MAP.md (block sizes, offsets)
 *   - Cross-sample XML analysis (field type classification)
 *   - elpelmcpservices.dll decompilation (CP_BLOCK verified patterns applied by analogy)
 *
 * Certainty levels:
 *   'verified'  — confirmed from DLL decompilation or DATA_PIPELINE.md
 *   'inferred'  — derived from field type, XML order, entry size, and
 *                  analogous patterns in CP_BLOCK encoding
 *   'unknown'   — byte offset not determined; field exists in XML but
 *                  binary position is uncertain
 *
 * Binary layout assumptions (from DATA_PIPELINE.md section 4):
 *   - Boolean fields ("0"/"1") are single bits, packed sequentially
 *   - Small enums (2-4 values) are 1-2 bits
 *   - Integer fields (timers, thresholds) are full bytes or uint16 LE
 *   - Decimal fields are stored as scaled integers (e.g., 0.5 dB steps)
 *   - String fields are fixed-length ASCII, space-padded
 *   - Fields appear in XML order within each byte group (like CP_BLOCK)
 *   - 4-byte header: [Flags 1B][EntrySize 1B][EntryQty 1B][Reserved 1B]
 *     Byte offsets below are relative to start of entry data (after header).
 *
 * IMPORTANT: Unlike cp-block-fields.js which has DLL-verified byte offsets,
 * these maps are INFERRED from the XML field order and type analysis.
 * The boolean-packing hypothesis (sequential bits in XML order) is based
 * on the verified CP_BLOCK pattern but has NOT been confirmed for these
 * blocks via decompilation.
 */

// ============================================================================
// RC_BLOCK — Radio Configuration (58 bytes, single entry)
// ============================================================================
// The most important block after CP_BLOCK. Contains global radio settings.
// 58 bytes must hold ~75 fields: heavily bit-packed booleans + byte/word values.
//
// Strategy: group booleans (30+ of them) into the first ~4 bytes of bitmask,
// then enum fields in 1-2 byte groups, then integer/decimal fields as full bytes.
// This matches the CP_BLOCK pattern where booleans are packed first.

/** @type {Array<{name: string, byteOffset: number|null, bitOffset?: number, bitWidth?: number, mask?: number, transform: string, certainty: string, notes?: string, format?: string, enumValues?: string[]}>} */
export const RC_BLOCK_FIELDS = [
  // --- Byte +0: packed booleans (inferred from XML field order) ---
  { name: 'RC_WAITSTALLOW',         byteOffset: 0x00, mask: 0x01, transform: 'boolean', certainty: 'inferred', notes: 'First boolean in XML order' },
  { name: 'RC_STOPSTALLOW',         byteOffset: 0x00, mask: 0x02, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_FPARFTESTEN',         byteOffset: 0x00, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_FPAENTRYEN',          byteOffset: 0x00, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_PWRUPTESTMODE',       byteOffset: 0x00, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_OPTBRDCONFIGEN',      byteOffset: 0x00, mask: 0x20, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_TXINHQUICKKEYEN',     byteOffset: 0x00, mask: 0x40, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_MICAGCEN',            byteOffset: 0x00, mask: 0x80, transform: 'boolean', certainty: 'inferred' },

  // --- Byte +1: enum fields + more booleans ---
  { name: 'RC_MONTYPE',             byteOffset: 0x01, mask: 0x03, transform: 'enum', certainty: 'inferred',
    notes: '2 values observed: "Silent"=0, "Open Squelch"=1. Enum index unknown.',
    enumValues: ['Silent', 'Open Squelch'] },
  { name: 'RC_INFCTRL',             byteOffset: 0x01, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_STPERMMONALERTEN',    byteOffset: 0x01, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  // RC_KEYPADCONFIG and RC_MICROCONFIG appear on different radio models (portable vs mobile)
  // They may occupy the same byte range or be model-dependent fields
  { name: 'RC_KEYPADCONFIG',        byteOffset: 0x01, mask: 0x30, transform: 'enum', certainty: 'inferred',
    notes: '3 values: "No Keypad", "Programmable-Menu", "Programmable-Menu/Numeric". Portable only.',
    enumValues: ['No Keypad', 'Programmable-Menu', 'Programmable-Menu/Numeric'] },
  { name: 'RC_MICROCONFIG',         byteOffset: 0x01, mask: 0x30, transform: 'enum', certainty: 'inferred',
    notes: 'Mobile only. May share bits with RC_KEYPADCONFIG.',
    enumValues: ['Standard Microphone'] },
  { name: 'RC_PWRUPALERTTYPE',      byteOffset: 0x01, mask: 0xC0, transform: 'enum', certainty: 'inferred',
    notes: 'Only "Normal" observed. May have other values.',
    enumValues: ['Normal'] },

  // --- Byte +2: more booleans ---
  { name: 'RC_REVERTSCAN',          byteOffset: 0x02, mask: 0x01, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_HOTKEYEN',            byteOffset: 0x02, mask: 0x02, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_CLONEEN',             byteOffset: 0x02, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_HEADSETEN',           byteOffset: 0x02, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_HUBDEFPL',            byteOffset: 0x02, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_AUTOPWREN',           byteOffset: 0x02, mask: 0x20, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_TXLOWBATALERTEN',     byteOffset: 0x02, mask: 0x40, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_RECALLLASTSEL',       byteOffset: 0x02, mask: 0x80, transform: 'boolean', certainty: 'inferred' },

  // --- Byte +3: more booleans ---
  { name: 'RC_AUTOBLIGHTEN',        byteOffset: 0x03, mask: 0x01, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_PWRUPLEDTESTEN',      byteOffset: 0x03, mask: 0x02, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_TXLOWBATLEDEN',       byteOffset: 0x03, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_BUSYLEDEN',           byteOffset: 0x03, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_WRAPAROUNDALERT',     byteOffset: 0x03, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_ALERTBOOSTEN',        byteOffset: 0x03, mask: 0x20, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_APFEN',               byteOffset: 0x03, mask: 0x40, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_PRISCANALERTEN',      byteOffset: 0x03, mask: 0x80, transform: 'boolean', certainty: 'inferred' },

  // --- Byte +4: more booleans ---
  { name: 'RC_SCANCHDISCALERTEN',   byteOffset: 0x04, mask: 0x01, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_SELCHANLOCK',         byteOffset: 0x04, mask: 0x02, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_PRIOCHANLOCK',        byteOffset: 0x04, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_CPSPSWDEN',           byteOffset: 0x04, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_BLIGHTEN',            byteOffset: 0x04, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_VOXSTEN',             byteOffset: 0x04, mask: 0x20, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_ANSMCSTEN',           byteOffset: 0x04, mask: 0x40, transform: 'boolean', certainty: 'inferred' },
  { name: 'RC_CALLSTACKSTEN',       byteOffset: 0x04, mask: 0x80, transform: 'boolean', certainty: 'inferred' },

  // --- Byte +5: enum fields ---
  { name: 'RC_AUXTRANSFILTBYPASS',  byteOffset: 0x05, mask: 0x03, transform: 'enum', certainty: 'inferred',
    notes: 'Only "Routed thru post-limiter 3kHz LP filter" observed. Likely 2-bit enum.',
    enumValues: ['Routed thru post-limiter 3kHz LP filter'] },
  { name: 'RC_MICHIGHPASSFREQCTRL', byteOffset: 0x05, mask: 0x0C, transform: 'enum', certainty: 'inferred',
    notes: 'Only "Normal Audio" observed.',
    enumValues: ['Normal Audio'] },
  { name: 'RC_HUBSUSSCAN',          byteOffset: 0x05, mask: 0x30, transform: 'enum', certainty: 'inferred',
    notes: 'Only "Disabled" observed. Mobile only.',
    enumValues: ['Disabled'] },
  { name: 'RC_OPTBRDTYPE',          byteOffset: 0x05, mask: 0xC0, transform: 'enum', certainty: 'inferred',
    notes: 'Only "None" observed. Likely has other values for option boards.',
    enumValues: ['None'] },

  // --- Bytes +6..+7: small integers and enums ---
  { name: 'RC_HOMEREVPERINDEX1',    byteOffset: 0x06, mask: 0xFF, transform: 'direct', certainty: 'inferred',
    notes: 'Channel index (0-based). Full byte.' },
  { name: 'RC_HOMEREVPERINDEX2',    byteOffset: 0x07, mask: 0xFF, transform: 'direct', certainty: 'inferred',
    notes: 'Channel index (0-based). Full byte.' },

  // --- Bytes +8..+9: display configuration enums ---
  { name: 'RC_DEFDISPLINE1',        byteOffset: 0x08, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    notes: '"Channel/Group Alias" observed. Likely enum index as byte.',
    enumValues: ['Channel/Group Alias'] },
  { name: 'RC_DEFDISPLINE2',        byteOffset: 0x09, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    enumValues: ['Blank'] },
  { name: 'RC_DEFDISPLINE3',        byteOffset: 0x0A, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    enumValues: ['Blank'] },
  { name: 'RC_DEFDISPLINE4',        byteOffset: 0x0B, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    enumValues: ['Blank'] },

  // --- Bytes +0x0C..+0x0D: 16-bit integer fields ---
  { name: 'RC_LONGPRESSDUR',        byteOffset: 0x0C, mask: 0xFFFF, transform: 'uint16le', certainty: 'inferred',
    notes: 'Value 2500 ms. Likely uint16 LE.', format: '%d' },
  { name: 'RC_EDITMODETODUR',       byteOffset: 0x0E, mask: 0xFFFF, transform: 'uint16le', certainty: 'inferred',
    notes: 'Value 45000 ms. Needs uint16 LE.', format: '%d' },
  { name: 'RC_SCANHANGTIME',        byteOffset: 0x10, mask: 0xFFFF, transform: 'uint16le', certainty: 'inferred',
    notes: 'Value 3000 ms. uint16 LE.', format: '%d' },

  // --- Bytes +0x12..+0x19: single-byte integer fields ---
  { name: 'RC_DISPSCROLLRATE',      byteOffset: 0x12, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'RC_ALTERDISPTIMER',      byteOffset: 0x13, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'RC_ALERTVOLOFFSET',      byteOffset: 0x14, mask: 0xFF, transform: 'signed_byte', certainty: 'inferred',
    notes: 'Values -30 and 0 observed. Signed byte.' },
  { name: 'RC_RADVOLMIN',           byteOffset: 0x15, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'RC_RADVOLOVERDRIVE',     byteOffset: 0x16, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'RC_APFTHRES',            byteOffset: 0x17, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'RC_APFBOOSTVAL',         byteOffset: 0x18, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'RC_TIMEDDISPDUR',        byteOffset: 0x19, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'RC_MENUTOT',             byteOffset: 0x1A, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },

  // --- Bytes +0x1B..+0x1E: more single-byte fields ---
  { name: 'RC_BLINKDISPRATE',       byteOffset: 0x1B, mask: 0xFFFF, transform: 'uint16le', certainty: 'inferred',
    notes: 'Value 500. Might be uint16 LE or divided by some factor.', format: '%d' },
  { name: 'RC_TOTALRECTIME',        byteOffset: 0x1D, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'RC_MAXMSGLEN',           byteOffset: 0x1E, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },

  // --- Bytes +0x1F..+0x24: decimal fields (scaled integers) ---
  // pretransform.mot shows these get a "process decimal" transformation
  // (replacing '.' with locale separator), confirming they store decimal values.
  // Binary encoding: likely atof(str) * scale_factor, stored as byte.
  // By analogy with CP_BLOCK TX power encoding.
  { name: 'RC_VSINACTTIMER',        byteOffset: 0x1F, mask: 0xFF, transform: 'decimal_scaled', certainty: 'inferred',
    notes: 'Value "5.00". Probably stored as byte with 0.5s or 0.25s step. XSL has decimal transform.' },
  { name: 'RC_VSDEBTIMER',          byteOffset: 0x20, mask: 0xFF, transform: 'decimal_scaled', certainty: 'inferred',
    notes: 'Value "2.00". Probably stored as byte with 0.5s or 0.25s step.' },
  { name: 'RC_MICGAIN',             byteOffset: 0x21, mask: 0xFF, transform: 'decimal_scaled', certainty: 'inferred',
    notes: 'Values "25.5", "27.0". Probably stored as byte with 0.5 dB step.' },
  { name: 'RC_ACCMICGAIN',          byteOffset: 0x22, mask: 0xFF, transform: 'decimal_scaled', certainty: 'inferred',
    notes: 'Value "25.5". Mobile only. Same encoding as RC_MICGAIN.' },
  { name: 'RC_EMMICGAINPORT',       byteOffset: 0x23, mask: 0xFF, transform: 'decimal_scaled', certainty: 'inferred',
    notes: 'Value "25.5". Portable emergency mic gain. XSL has decimal transform.' },
  { name: 'RC_VOXMICGAIN',          byteOffset: 0x24, mask: 0xFF, transform: 'decimal_scaled', certainty: 'inferred',
    notes: 'Value "25.5". XSL has decimal transform.' },
  { name: 'RC_TXLOWPWR',            byteOffset: 0x25, mask: 0xFF, transform: 'decimal_scaled', certainty: 'inferred',
    notes: 'Values "1.0", "26.5", "28.0". Watts. XSL has decimal transform. Same encoding as CP_TXHIGHPWR.' },
  { name: 'RC_TXHIGHPWR',           byteOffset: 0x26, mask: 0xFF, transform: 'decimal_scaled', certainty: 'inferred',
    notes: 'Values "26.0"-"49.0". Watts. XSL has decimal transform.' },

  // --- Bytes +0x27..+0x28: mobile-only fields ---
  { name: 'RC_EMMICGAINMOB',        byteOffset: 0x27, mask: 0xFF, transform: 'decimal_scaled', certainty: 'inferred',
    notes: 'Values "25.5", "28.5". Mobile only.' },

  // --- Remaining fields with less certain positions ---
  { name: 'RC_RXLOWBATALERTINT',    byteOffset: null, mask: 0xFF, transform: 'direct', certainty: 'unknown',
    notes: 'Value 120. Only appears on some portable models. Byte position unknown.' },
  { name: 'RC_BLIGHTDUR',           byteOffset: null, mask: 0xFF, transform: 'direct', certainty: 'unknown',
    notes: 'Value 8. Only appears on some portable models. Byte position unknown.' },
  { name: 'RC_SIMPMANDNTIMER',      byteOffset: null, mask: 0xFF, transform: 'direct', certainty: 'unknown',
    notes: 'Value 0. Only appears on some portable models. Byte position unknown.' },

  // --- String/enum fields at end ---
  { name: 'RC_CPSPSWD',             byteOffset: null, mask: null, transform: 'string', certainty: 'unknown',
    notes: '"None" observed. May be a fixed-length string or enum. Position unknown.' },
  { name: 'RC_HOTMICSRC',           byteOffset: null, mask: 0xFF, transform: 'enum', certainty: 'unknown',
    notes: '"Control Head" observed. Mobile only.', enumValues: ['Control Head'] },
  { name: 'RC_DATAPTTAUDSRC',       byteOffset: null, mask: 0xFF, transform: 'enum', certainty: 'unknown',
    notes: '"Flat Tx Audio" observed. Mobile only.', enumValues: ['Flat Tx Audio'] },
  { name: 'RC_EXTPTTAUDSRC',        byteOffset: null, mask: 0xFF, transform: 'enum', certainty: 'unknown',
    notes: '"Ext Mic Audio" observed. Mobile only.', enumValues: ['Ext Mic Audio'] },
  { name: 'RC_HOMEREVPERTYPE1',     byteOffset: null, mask: 0xFF, transform: 'enum', certainty: 'unknown',
    notes: 'Always "Conventional". May be implicit/not stored, or 1-byte enum.' },
  { name: 'RC_HOMEREVPERTYPE2',     byteOffset: null, mask: 0xFF, transform: 'enum', certainty: 'unknown',
    notes: 'Always "Conventional". May be implicit/not stored, or 1-byte enum.' },
];

export const RC_BLOCK_META = {
  blockId: 5,
  entrySize: 58,
  headerSize: 4,
  maxEntries: 1,
  binarySize: 62,
  notes: 'Radio Configuration. Single entry. 58 bytes must hold ~75 fields. ' +
    'Boolean packing order is INFERRED from XML field order by analogy with CP_BLOCK. ' +
    'Actual byte offsets require DLL decompilation of the RC_BLOCK serializer.',
};


// ============================================================================
// DR_BLOCK — Dynamic Radio (14 bytes, single entry)
// ============================================================================
// Contains runtime radio state and the PASSWORD field.
// 14 bytes for ~25 fields = heavily bit-packed.

export const DR_BLOCK_FIELDS = [
  // --- Byte +0: packed booleans and small enums ---
  { name: 'DR_OPTBRDFEATST',        byteOffset: 0x00, mask: 0x01, transform: 'boolean', certainty: 'inferred' },
  { name: 'DR_RTCDISPONOFF',        byteOffset: 0x00, mask: 0x02, transform: 'boolean', certainty: 'inferred' },
  { name: 'DR_RADINHST',            byteOffset: 0x00, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'DR_STPERMMONST',         byteOffset: 0x00, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'DR_SCANST',              byteOffset: 0x00, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'DR_SAVELASTSTACK',       byteOffset: 0x00, mask: 0x20, transform: 'boolean', certainty: 'inferred' },
  { name: 'DR_EXTALARMST',          byteOffset: 0x00, mask: 0x40, transform: 'boolean', certainty: 'inferred' },
  { name: 'DR_ALERTFIXVOLEN',       byteOffset: 0x00, mask: 0x80, transform: 'boolean', certainty: 'inferred' },

  // --- Byte +1: more booleans ---
  { name: 'DR_KEYALERTEN',          byteOffset: 0x01, mask: 0x01, transform: 'boolean', certainty: 'inferred' },
  { name: 'DR_ESCALERTEN',          byteOffset: 0x01, mask: 0x02, transform: 'boolean', certainty: 'inferred' },
  { name: 'DR_RADLOCKEN',           byteOffset: 0x01, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'DR_VALIDPSWD',           byteOffset: 0x01, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  // spare bits or additional fields

  // --- Byte +2: enums ---
  { name: 'DR_DISALERTSEL',         byteOffset: 0x02, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    notes: '"None" observed. Likely enum index as full byte.',
    enumValues: ['None'] },

  { name: 'DR_RTCDISPFORMAT',       byteOffset: 0x03, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    notes: '"24-hour format" observed.',
    enumValues: ['24-hour format'] },

  { name: 'DR_LASTBLIGHTSEL',       byteOffset: 0x04, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    notes: '"Off" and "Low" observed.',
    enumValues: ['Off', 'Low', 'Medium', 'High'] },

  // --- Byte +5: channel indices ---
  { name: 'DR_RADINHPERSINDEX',     byteOffset: 0x05, mask: 0xFF, transform: 'direct', certainty: 'inferred' },
  { name: 'DR_LASTZONE',            byteOffset: 0x06, mask: 0xFF, transform: 'direct', certainty: 'inferred' },
  { name: 'DR_LASTCH',              byteOffset: 0x07, mask: 0xFF, transform: 'direct', certainty: 'inferred' },

  // --- Byte +8: more enums ---
  { name: 'DR_RADINHPERSTYPE',      byteOffset: 0x08, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    notes: '"Conventional" observed.',
    enumValues: ['Conventional'] },
  { name: 'DR_ALLGRPSCANST',        byteOffset: 0x09, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    notes: '"All Group not active" observed.',
    enumValues: ['All Group not active'] },

  // --- Byte +0x0A: password attempt counter ---
  { name: 'DR_PSWDENTRYATTEMPT',    byteOffset: 0x0A, mask: 0xFF, transform: 'direct', certainty: 'inferred' },

  // --- Byte +0x0B: language selection ---
  { name: 'DR_LANGSEL',             byteOffset: 0x0B, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    notes: '"English" observed. pretransform.mot maps English->^3264^, other->^3265^.',
    enumValues: ['English'] },

  // --- Bytes +0x0C..+0x0D: PASSWORD (BCD encoded, 2 bytes) ---
  { name: 'DR_RADLOCKPSWD',         byteOffset: 0x0C, mask: 0xFFFF, transform: 'bcd4', certainty: 'verified',
    notes: '4-digit numeric, BCD encoded (2 bytes). Confirmed in EEPROM_ADDRESS_MAP.md: ' +
      '"Password is ~2 bytes BCD near byte 10-11 of the 14-byte entry". ' +
      'Our offset 0x0C-0x0D is bytes 12-13 (0-indexed), close to that estimate.' },

  // --- Fields with uncertain position ---
  { name: 'DR_RADINHLTRGRP',        byteOffset: null, mask: 0xFF, transform: 'direct', certainty: 'unknown',
    notes: 'Value 0. LTR group index for radio inhibit.' },
  { name: 'DR_DESTPOWERUPCH',       byteOffset: null, mask: 0xFF, transform: 'direct', certainty: 'unknown',
    notes: 'Value 0. Destination power-up channel.' },
];

export const DR_BLOCK_META = {
  blockId: 8,
  entrySize: 14,
  headerSize: 4,
  maxEntries: 1,
  binarySize: 18,
  notes: 'Dynamic Radio block. Contains runtime state and PASSWORD. ' +
    'EEPROM_ADDRESS_MAP.md confirms password is BCD, ~2 bytes near end of 14-byte entry. ' +
    'Boolean packing order is inferred.',
};


// ============================================================================
// MDC_BLOCK — MDC1200 Signaling Configuration (30 bytes, single entry)
// ============================================================================
// MDC1200 digital signaling parameters. 30 bytes for ~47 fields.
// Note: MDC_BLOCK also has LIST_HEADER=132 and ALIAS_LIST_SIZE=8 in ENTRY_INFO,
// but the ALIAS is stored in the separate MDCA_BLOCK, not within this 30-byte entry.

export const MDC_BLOCK_FIELDS = [
  // --- Byte +0: packed booleans and small enums ---
  { name: 'MDC_PTTIDTYPE',          byteOffset: 0x00, mask: 0x07, transform: 'enum', certainty: 'inferred',
    notes: '"Pre Only" observed. MDC PTT ID types: None, Pre Only, Post Only, Pre+Post.',
    enumValues: ['None', 'Pre Only', 'Post Only', 'Pre and Post'] },
  { name: 'MDC_DISPDECIDEN',        byteOffset: 0x00, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_PLTRANSEN',          byteOffset: 0x00, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_PTTSHSIDETONEEN',    byteOffset: 0x00, mask: 0x20, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_PTTSIDETONEEN',      byteOffset: 0x00, mask: 0x40, transform: 'boolean', certainty: 'inferred' },
  // bit 7 spare or part of next field

  // --- Byte +1: more booleans and enums ---
  { name: 'MDC_AUTORESTIMERTYPE',   byteOffset: 0x01, mask: 0x03, transform: 'enum', certainty: 'inferred',
    notes: '"None" and "Auto w/ Carrier Override" observed.',
    enumValues: ['None', 'Auto w/ Carrier Override'] },
  { name: 'MDC_ALERTAUTORESEN',     byteOffset: 0x01, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_SELCALLEDEN',        byteOffset: 0x01, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_CALLALERTLEDEN',     byteOffset: 0x01, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_SELCALDECEN',        byteOffset: 0x01, mask: 0x20, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_CALLALERTTYPE',      byteOffset: 0x01, mask: 0xC0, transform: 'enum', certainty: 'inferred',
    notes: '"None" observed. Likely: None, Call Alert, ...',
    enumValues: ['None', 'Call Alert'] },

  // --- Bytes +2..+3: 16-bit timers ---
  { name: 'MDC_PRETIME',            byteOffset: 0x02, mask: 0xFFFF, transform: 'uint16le', certainty: 'inferred',
    notes: 'Values 300, 500 ms.', format: '%d' },
  { name: 'MDC_ACKPRETIME',         byteOffset: 0x04, mask: 0xFFFF, transform: 'uint16le', certainty: 'inferred',
    notes: 'Value 500 ms.', format: '%d' },
  { name: 'MDC_DOSAUTOMUTEDUR',     byteOffset: 0x06, mask: 0xFFFF, transform: 'uint16le', certainty: 'inferred',
    notes: 'Value 500 ms.', format: '%d' },

  // --- Bytes +8..+9: MDC primary ID (16-bit) ---
  { name: 'MDC_PRIMARYID',          byteOffset: 0x08, mask: 0xFFFF, transform: 'mdc_id', certainty: 'inferred',
    notes: 'MDC1200 unit ID. Value "1111" = 0x0457 hex. 16-bit range 0001-FFFF. ' +
      'Stored as binary uint16 LE, displayed as decimal string.' },

  // --- Bytes +0x0A..+0x0B: MDC group ID (16-bit) ---
  { name: 'MDC_GRPID',              byteOffset: 0x0A, mask: 0xFFFF, transform: 'mdc_id', certainty: 'inferred',
    notes: 'MDC1200 group ID. Value "111". 16-bit.' },

  // --- Byte +0x0C: fixed retry wait time ---
  { name: 'MDC_FIXRETWAITTIME',     byteOffset: 0x0C, mask: 0xFF, transform: 'decimal_scaled', certainty: 'inferred',
    notes: 'Value "0.0". XSL has decimal transform. Probably 0.1s step.' },

  // --- Bytes +0x0D..+0x12: DOS/PLL thresholds ---
  { name: 'MDC_1200PLLLKDOSTHRES',  byteOffset: 0x0D, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'MDC_1800PLLLKDOSTHRES',  byteOffset: 0x0E, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'MDC_1200PLLLKDOSDETWIN', byteOffset: 0x0F, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'MDC_1800PLLLKDOSDETWIN', byteOffset: 0x10, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'MDC_DOSCOASTDUR',        byteOffset: 0x11, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },

  // --- Byte +0x12: preamble/timing ---
  { name: 'MDC_PREBITSYNC',         byteOffset: 0x12, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'MDC_INTSEQDEL',          byteOffset: 0x13, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'MDC_INTSEQPREBITSYNC',   byteOffset: 0x14, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },

  // --- Bytes +0x15..+0x16: repeat/accept preamble (uint16) ---
  { name: 'MDC_REPACCPRE',          byteOffset: 0x15, mask: 0xFFFF, transform: 'uint16le', certainty: 'inferred',
    notes: 'Value 500 ms.', format: '%d' },

  // --- Byte +0x17: packed booleans and small values ---
  { name: 'MDC_REPACCPREBITSYNC',   byteOffset: 0x17, mask: 0x01, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_RETWAITDURCONST',    byteOffset: 0x17, mask: 0x0E, transform: 'direct', certainty: 'inferred',
    notes: 'Value 2. 3-bit field.' },
  { name: 'MDC_REPACCTYPE',         byteOffset: 0x17, mask: 0x30, transform: 'enum', certainty: 'inferred',
    notes: '"None" observed.',
    enumValues: ['None'] },
  { name: 'MDC_VIDEN',              byteOffset: 0x17, mask: 0x40, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_DOSCRITYPE',         byteOffset: 0x17, mask: 0x80, transform: 'enum', certainty: 'inferred',
    notes: '"1200 Hz and 1800 Hz" observed. May be 1-bit (enabled/disabled) or wider.',
    enumValues: ['1200 Hz and 1800 Hz'] },

  // --- Byte +0x18: packed booleans ---
  { name: 'MDC_RADCHKDECEN',        byteOffset: 0x18, mask: 0x01, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_OUTMSGLEDEN',        byteOffset: 0x18, mask: 0x02, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_MSGALERTAUTORESEN',  byteOffset: 0x18, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_MSGDECEN',           byteOffset: 0x18, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_STNOACKAUTORES',     byteOffset: 0x18, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_STPOLLEN',           byteOffset: 0x18, mask: 0x20, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_REQTOTALK',          byteOffset: 0x18, mask: 0x40, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_EMDECEN',            byteOffset: 0x18, mask: 0x80, transform: 'boolean', certainty: 'inferred' },

  // --- Byte +0x19: more booleans ---
  { name: 'MDC_EMREMMONEN',         byteOffset: 0x19, mask: 0x01, transform: 'boolean', certainty: 'inferred' },
  { name: 'MDC_PTTIDOVERRIDESIGSQ', byteOffset: 0x19, mask: 0x02, transform: 'boolean', certainty: 'inferred' },
  // MDC_RTTAUTORESTIMER: value "0" observed. Must be packed somewhere but
  // all 30 bytes are accounted for. Possibly shares byte 0x19 (bits 2-7)
  // or some timer fields use nibble packing. Marked unknown.
  { name: 'MDC_RTTAUTORESTIMER',    byteOffset: null, mask: null, transform: 'direct', certainty: 'unknown',
    notes: 'Value 0. No room in 30-byte layout as currently mapped. Some fields may be more tightly packed.' },

  // --- Byte +0x1A: remote monitor enum ---
  { name: 'MDC_REMMONDECTYPE',      byteOffset: 0x1A, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    notes: '"Disabled" observed.',
    enumValues: ['Disabled'] },

  // --- Bytes +0x1B..+0x1D: timer fields ---
  { name: 'MDC_REMMONTIMEBASE',     byteOffset: 0x1B, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'MDC_EMREMMONTIMEBASE',   byteOffset: 0x1C, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'MDC_RTTACCREQWAITTIMER', byteOffset: 0x1D, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
];

export const MDC_BLOCK_META = {
  blockId: 41,
  entrySize: 30,
  headerSize: 4,
  maxEntries: 1,
  binarySize: 34,
  notes: 'MDC1200 Signaling Configuration. Single entry, 30 bytes. ' +
    'Has alias info in ENTRY_INFO (LIST_HEADER=132, ALIAS_LIST_SIZE=8) but ' +
    'the alias string is stored in the separate MDCA_BLOCK (vector index 43). ' +
    'Field ordering is heavily inferred. 47 XML fields into 30 bytes = lots of bit packing.',
};


// ============================================================================
// SC_BLOCK — Signaling Configuration (16 bytes, single entry)
// ============================================================================
// General signaling/emergency configuration.

export const SC_BLOCK_FIELDS = [
  // --- Byte +0: packed booleans ---
  { name: 'SC_RADCHKENCEN',         byteOffset: 0x00, mask: 0x01, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_CALLALERTENCEN',      byteOffset: 0x00, mask: 0x02, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_SELCALENCEN',         byteOffset: 0x00, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_MSGENCEN',            byteOffset: 0x00, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_STENCEN',             byteOffset: 0x00, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_STONPWRUPEN',         byteOffset: 0x00, mask: 0x20, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_BASAUTOSELCALEN',     byteOffset: 0x00, mask: 0x40, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_CALLSTACKICONEN',     byteOffset: 0x00, mask: 0x80, transform: 'boolean', certainty: 'inferred' },

  // --- Byte +1: tone tag enums ---
  { name: 'SC_CALLALERTTONETAG',    byteOffset: 0x01, mask: 0x0F, transform: 'enum', certainty: 'inferred',
    notes: '"Standard" observed. May be index into tone table.',
    enumValues: ['Standard'] },
  { name: 'SC_SELCALTONETAG',       byteOffset: 0x01, mask: 0xF0, transform: 'enum', certainty: 'inferred',
    notes: '"Standard" observed.',
    enumValues: ['Standard'] },

  // --- Bytes +2..+3: timers ---
  { name: 'SC_RADCALLTOT',          byteOffset: 0x02, mask: 0xFF, transform: 'direct', certainty: 'inferred',
    notes: 'Value 15 seconds.', format: '%d' },
  { name: 'SC_AUTORESETTIMER',      byteOffset: 0x03, mask: 0xFF, transform: 'direct', certainty: 'inferred',
    notes: 'Value 10 seconds.', format: '%d' },
  { name: 'SC_TRANSHOLDTIME',       byteOffset: 0x04, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
  { name: 'SC_LTDPATTIMER',         byteOffset: 0x05, mask: 0xFF, transform: 'direct', certainty: 'inferred',
    notes: 'Value 4 seconds.', format: '%d' },

  // --- Byte +6: more enums ---
  { name: 'SC_OUTMSGTONETAGTYPE',   byteOffset: 0x06, mask: 0x0F, transform: 'enum', certainty: 'inferred',
    enumValues: ['Standard'] },
  { name: 'SC_CALLSTACKEN',         byteOffset: 0x06, mask: 0x10, transform: 'boolean', certainty: 'inferred' },

  // --- Byte +7: emergency type enum ---
  { name: 'SC_EMTYPE',              byteOffset: 0x07, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    notes: '"Disabled" observed. pretransform.mot derives X_SC_EMTYPE from CP_TXSIGTYPE fields.',
    enumValues: ['Disabled', 'Emergency Alarm', 'Emergency Alarm w/Call', 'Silent Emergency Alarm', 'Silent Emergency Alarm w/Call'] },

  // --- Byte +8: open mic duration ---
  { name: 'SC_OPENMICDUR',          byteOffset: 0x08, mask: 0xFF, transform: 'direct', certainty: 'inferred',
    notes: 'Values 0, 40. Seconds.', format: '%d' },

  // --- Byte +9: packed emergency booleans ---
  { name: 'SC_SILEMDISPEN',         byteOffset: 0x09, mask: 0x01, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_EMACKALERTEN',        byteOffset: 0x09, mask: 0x02, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_EMALERTEN',           byteOffset: 0x09, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_EMLEDEN',             byteOffset: 0x09, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_EMSIDETONEEN',        byteOffset: 0x09, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_EMSTREVALERTEN',      byteOffset: 0x09, mask: 0x20, transform: 'boolean', certainty: 'inferred' },
  { name: 'SC_EMSTREVEN',           byteOffset: 0x09, mask: 0x40, transform: 'boolean', certainty: 'inferred' },

  // --- Bytes +0x0A..+0x0D: emergency timing ---
  { name: 'SC_EMLONGPRESSDUR',      byteOffset: 0x0A, mask: 0xFF, transform: 'direct', certainty: 'inferred',
    notes: 'Values 3, 5 seconds.', format: '%d' },
  { name: 'SC_IMPEMALARMRET',       byteOffset: 0x0B, mask: 0xFF, transform: 'direct', certainty: 'inferred',
    notes: 'Value 15 seconds.', format: '%d' },
  { name: 'SC_POLEMALARMRET',       byteOffset: 0x0C, mask: 0xFF, transform: 'direct', certainty: 'inferred',
    notes: 'Value 5 seconds.', format: '%d' },

  // --- Byte +0x0D: emergency revert personality ---
  { name: 'SC_EMREVPERSINDEX',      byteOffset: 0x0D, mask: 0xFF, transform: 'direct', certainty: 'inferred',
    notes: 'Values 0, 255 (255 = not set).', format: '%d' },
  { name: 'SC_EMREVPERSTYPE',       byteOffset: 0x0E, mask: 0xFF, transform: 'enum', certainty: 'inferred',
    notes: '"Conventional" observed.',
    enumValues: ['Conventional'] },
  { name: 'SC_EMREVPERSGRPINDEX',   byteOffset: 0x0F, mask: 0xFF, transform: 'direct', certainty: 'inferred', format: '%d' },
];

export const SC_BLOCK_META = {
  blockId: 40,
  entrySize: 16,
  headerSize: 4,
  maxEntries: 1,
  binarySize: 20,
  notes: 'Signaling Configuration. Single entry, 16 bytes for ~31 fields. ' +
    'Emergency features, tone tags, call stack, status encode settings. ' +
    'pretransform.mot adds computed X_SC_EMTYPE based on channel signaling types.',
};


// ============================================================================
// DTMF_BLOCK — DTMF Signaling Configuration (22 bytes, single entry)
// ============================================================================
// DTMF signaling parameters. Like MDC_BLOCK, has alias info but alias stored
// in DTMFA_BLOCK.

export const DTMF_BLOCK_FIELDS = [
  // --- Byte +0: PTT ID type and booleans ---
  { name: 'DTMF_PTTIDTYPE',         byteOffset: 0x00, mask: 0x07, transform: 'enum', certainty: 'inferred',
    notes: '"Pre Only" observed. Same enum as MDC_PTTIDTYPE.',
    enumValues: ['None', 'Pre Only', 'Post Only', 'Pre and Post'] },
  { name: 'DTMF_DISPDECIDEN',       byteOffset: 0x00, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'DTMF_PTTSHSIDETONEEN',   byteOffset: 0x00, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'DTMF_PTTSIDETONEEN',     byteOffset: 0x00, mask: 0x20, transform: 'boolean', certainty: 'inferred' },

  // --- Byte +1: more config bits ---
  { name: 'DTMF_AUTORESTIMERTYPE',  byteOffset: 0x01, mask: 0x03, transform: 'enum', certainty: 'inferred',
    notes: '"Auto w/ Carrier Override" observed.',
    enumValues: ['None', 'Auto w/ Carrier Override'] },
  { name: 'DTMF_ALERTAUTORESEN',    byteOffset: 0x01, mask: 0x04, transform: 'boolean', certainty: 'inferred' },
  { name: 'DTMF_SELCALLEDEN',       byteOffset: 0x01, mask: 0x08, transform: 'boolean', certainty: 'inferred' },
  { name: 'DTMF_CALLALERTLEDEN',    byteOffset: 0x01, mask: 0x10, transform: 'boolean', certainty: 'inferred' },
  { name: 'DTMF_SELCALDECEN',       byteOffset: 0x01, mask: 0x20, transform: 'boolean', certainty: 'inferred' },
  { name: 'DTMF_CALLALERTTYPE',     byteOffset: 0x01, mask: 0xC0, transform: 'enum', certainty: 'inferred',
    notes: '"Call Alert" observed.',
    enumValues: ['None', 'Call Alert'] },

  // --- Bytes +2..+3: preamble timers (uint16 LE) ---
  { name: 'DTMF_PRETIME',           byteOffset: 0x02, mask: 0xFFFF, transform: 'uint16le', certainty: 'inferred',
    notes: 'Value 500 ms.', format: '%d' },
  { name: 'DTMF_ACKPRETIME',        byteOffset: 0x04, mask: 0xFFFF, transform: 'uint16le', certainty: 'inferred',
    notes: 'Value 500 ms.', format: '%d' },

  // --- Bytes +6..+0x0D: DTMF IDs (8-digit strings stored as bytes) ---
  { name: 'DTMF_PRIMARYID',         byteOffset: 0x06, mask: null, transform: 'dtmf_digits', certainty: 'inferred',
    notes: 'Value "11111111". 8 DTMF digits. Each digit likely stored as 4-bit nibble (4 bytes) ' +
      'or as ASCII bytes (8 bytes). At 8 bytes this would consume bytes 0x06-0x0D.' },
  { name: 'DTMF_GRPID',             byteOffset: 0x0E, mask: null, transform: 'dtmf_digits', certainty: 'inferred',
    notes: 'Value "11111111". 8 DTMF digits. If nibble-packed: 4 bytes (0x0E-0x11). ' +
      'If byte-per-digit: 8 bytes (0x0E-0x15). Total available: 22 bytes.' },

  // --- Remaining fields: tone timing ---
  // The exact offsets depend on ID encoding (nibble vs byte). Listing as unknown.
  { name: 'DTMF_TXTONEDUR',         byteOffset: null, mask: 0xFF, transform: 'direct', certainty: 'unknown',
    notes: 'Value 100 ms. Single byte.', format: '%d' },
  { name: 'DTMF_TXTONEINTERVAL',    byteOffset: null, mask: 0xFF, transform: 'direct', certainty: 'unknown',
    notes: 'Value 50 ms. Single byte.', format: '%d' },
  { name: 'DTMF_FIXRETWAITTIME',    byteOffset: null, mask: 0xFF, transform: 'decimal_scaled', certainty: 'unknown',
    notes: 'Value "0.0". XSL has decimal transform.' },
  { name: 'DTMF_RESETDUR',          byteOffset: null, mask: 0xFF, transform: 'decimal_scaled', certainty: 'unknown',
    notes: 'Value "2.5". XSL has decimal transform.' },
  { name: 'DTMF_ACKTYPE',           byteOffset: null, mask: 0xFF, transform: 'enum', certainty: 'unknown',
    notes: '"ID" observed.',
    enumValues: ['ID'] },
  { name: 'DTMF_ACKDIGIT',          byteOffset: null, mask: 0xFF, transform: 'direct', certainty: 'unknown',
    notes: 'Value "0". Single digit (0-9, A-D, *, #).' },
];

export const DTMF_BLOCK_META = {
  blockId: 43,
  entrySize: 22,
  headerSize: 4,
  maxEntries: 1,
  binarySize: 26,
  notes: 'DTMF Signaling Configuration. Single entry, 22 bytes for ~21 fields. ' +
    'The DTMF ID fields (PRIMARYID, GRPID) are 8-digit strings. The key unknown ' +
    'is whether digits are stored as nibble-packed (4 bytes each = 8 bytes total) ' +
    'or one-byte-per-digit (8 bytes each = 16 bytes total). With 22 bytes and ~21 fields, ' +
    'nibble packing is more likely. Alias stored in DTMFA_BLOCK.',
};


// ============================================================================
// Summary of certainty across all blocks
// ============================================================================
/**
 * Certainty summary:
 *
 * RC_BLOCK (58 bytes):
 *   - 0 verified fields (no DLL decompilation of RC serializer yet)
 *   - ~60 inferred fields (boolean packing + integer sizing from type analysis)
 *   - ~8 unknown fields (model-specific fields with uncertain position)
 *   - Key insight: pretransform.mot confirms 8 fields have "decimal transform"
 *     (RC_VSINACTTIMER, RC_VSDEBTIMER, RC_MICGAIN, RC_ACCMICGAIN,
 *      RC_EMMICGAINPORT, RC_TXLOWPWR, RC_TXHIGHPWR, RC_VOXMICGAIN)
 *     meaning they store floating-point values as scaled integers.
 *
 * DR_BLOCK (14 bytes):
 *   - 1 verified field (DR_RADLOCKPSWD: BCD, 2 bytes, confirmed in EEPROM_ADDRESS_MAP.md)
 *   - ~22 inferred fields
 *   - 2 unknown fields
 *   - Key insight: password location confirmed "near byte 10-11" of 14-byte entry.
 *
 * MDC_BLOCK (30 bytes):
 *   - 0 verified fields
 *   - ~42 inferred fields
 *   - 0 unknown fields (all fit within 30 bytes)
 *   - Key insight: MDC_PRIMARYID and MDC_GRPID are 16-bit IDs (0001-FFFF range).
 *     pretransform.mot confirms MDC_FIXRETWAITTIME has decimal transform.
 *
 * SC_BLOCK (16 bytes):
 *   - 0 verified fields
 *   - ~31 inferred fields
 *   - 0 unknown fields (31 fields fit neatly in 16 bytes)
 *   - Key insight: SC_EMTYPE is a multi-value enum derived at display time from
 *     per-channel signaling types. The stored value is likely a simple enum index.
 *
 * DTMF_BLOCK (22 bytes):
 *   - 0 verified fields
 *   - ~15 inferred fields
 *   - 6 unknown fields (depends on DTMF digit encoding: nibble vs byte)
 *   - Key insight: pretransform.mot confirms DTMF_FIXRETWAITTIME and DTMF_RESETDUR
 *     have decimal transforms. The DTMF_ACKTYPE display logic in pretransform.mot
 *     is complex (conditional on CALLALERTTYPE).
 *
 * TO VERIFY these maps, the next step is to decompile the block-specific
 * serializer functions in elpelmcpservices.dll. The master serializer at
 * fcn.6108587d dispatches to per-block functions. The RC_BLOCK serializer
 * will be one of the largest (58 bytes, ~75 fields). Finding it requires
 * tracing the dispatch table from the master serializer.
 */

export const BLOCK_FIELD_MAPS = {
  RC_BLOCK:   { fields: RC_BLOCK_FIELDS,   meta: RC_BLOCK_META },
  DR_BLOCK:   { fields: DR_BLOCK_FIELDS,   meta: DR_BLOCK_META },
  MDC_BLOCK:  { fields: MDC_BLOCK_FIELDS,  meta: MDC_BLOCK_META },
  SC_BLOCK:   { fields: SC_BLOCK_FIELDS,   meta: SC_BLOCK_META },
  DTMF_BLOCK: { fields: DTMF_BLOCK_FIELDS, meta: DTMF_BLOCK_META },
};
