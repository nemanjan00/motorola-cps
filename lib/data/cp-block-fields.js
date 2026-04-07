/**
 * CP_BLOCK binary field map — 27 bytes per channel entry.
 * Byte offsets and masks from elpelmcpservices.dll decompilation (DATA_PIPELINE.md section 6).
 *
 * ONLY fields with VERIFIED encoding are included. Fields where the enum string
 * table has not been reversed from the DLL are excluded (they round-trip via XML only).
 *
 * Transform types:
 *   'boolean'    — 0/1 bit, XML values "0"/"1"
 *   'enum'       — integer index via lookup table (VERIFIED tables only)
 *   'direct'     — raw byte value, XML value is decimal string
 *   'div5'       — value = byte * 5 (TOT in 5-second units)
 *   'div0.25'    — value = byte * 0.25 (frequency offset in MHz)
 *   'div1.5'     — value = byte * 1.5 (reference frequency in MHz)
 *   'string8'    — 8-byte fixed ASCII string
 *   'nonlinear'  — custom formula (see field-specific comments)
 *
 * Enum fields marked 'choiceIndex' are stored as integer choice indices in the
 * COM field table. The XML displays human-readable strings via resourcemanager.dll,
 * but the binary serializer uses atoi() and the deserializer uses sprintf("%d").
 * The index-to-display-string mapping is defined by rmenglish.dll string table order.
 * Verified by: DLL disassembly (pack_bits mask + atoi/sprintf pattern) + factory sample defaults.
 */

/** @type {Array<{name: string, byteOffset: number, mask: number, transform: string, format?: string, enumTable?: string}>} */
export const CP_BLOCK_FIELDS = [
  // Byte +3: packed bits
  { name: 'CP_CHBWSEL',           byteOffset: 0x03, mask: 0x01, transform: 'enum', enumTable: 'BANDWIDTH' },
  { name: 'CP_RXONLY',            byteOffset: 0x03, mask: 0x02, transform: 'boolean' },
  // bit 2 (0x04) = extended feature flag
  { name: 'CP_TALKAROUNDEN',      byteOffset: 0x03, mask: 0x08, transform: 'boolean' },
  { name: 'CP_AUTOSCANEN',        byteOffset: 0x03, mask: 0x10, transform: 'boolean' },
  { name: 'CP_SCANLISTINDEX',     byteOffset: 0x03, mask: 0x20, transform: 'boolean' },
  { name: 'CP_EMPSEL',            byteOffset: 0x03, mask: 0x40, transform: 'enum', enumTable: 'EMPHASIS_SEL' },
  { name: 'CP_VOXEN',             byteOffset: 0x03, mask: 0x80, transform: 'boolean' },

  // Byte +4: packed bits
  // CP_PHSYSINDEX at 0x04 mask 0x0F — direct 4-bit index (SKIP: XML "255" overflows 4 bits)
  { name: 'CP_UNMUTETYPE',        byteOffset: 0x04, mask: 0x10, transform: 'enum', enumTable: 'UNMUTE_RULE' },
  { name: 'CP_SIGSQ',             byteOffset: 0x04, mask: 0x20, transform: 'enum', enumTable: 'SIG_SQUELCH' },
  { name: 'CP_TXPWRLEVSEL',       byteOffset: 0x04, mask: 0x40, transform: 'enum', enumTable: 'POWER_LEVEL' },
  { name: 'CP_SQSET',             byteOffset: 0x04, mask: 0x80, transform: 'enum', enumTable: 'SQUELCH_SETTING' },

  // Byte +5: packed bits
  { name: 'CP_OPTBRDFEATEN',      byteOffset: 0x05, mask: 0x01, transform: 'boolean' },
  { name: 'CP_FLATTXAUDIOEN',     byteOffset: 0x05, mask: 0x02, transform: 'boolean' },
  { name: 'CP_TOTTYPE',           byteOffset: 0x05, mask: 0x04, transform: 'enum', enumTable: 'TOT_TYPE' },
  { name: 'CP_PLREQFORDATA',      byteOffset: 0x05, mask: 0x08, transform: 'boolean' },
  // CP_RXSQCODESEL at 0x05 mask 0x10 — 1-bit, only "CSQ" observed. Unclear if 1 = "use TXSQCODESEL". SKIP.
  { name: 'CP_TXSQCODESEL',       byteOffset: 0x05, mask: 0xC0, transform: 'enum', enumTable: 'SQUELCH_CODE' },

  // Byte +6: packed bits
  { name: 'CP_LONEWOKEREN',       byteOffset: 0x06, mask: 0x20, transform: 'boolean' },
  { name: 'CP_RXSIGTYPE',         byteOffset: 0x06, mask: 0x40, transform: 'enum', enumTable: 'SIG_TYPE' },
  { name: 'CP_TXSIGTYPE',         byteOffset: 0x06, mask: 0x80, transform: 'enum', enumTable: 'SIG_TYPE' },

  // Byte +7: full byte — TOT
  { name: 'CP_TOT',               byteOffset: 0x07, mask: 0xFF, transform: 'div5', format: '%d' },

  // Bytes +8, +9: signaling system indices (direct byte)
  { name: 'CP_RXSIGINDEX',        byteOffset: 0x08, mask: 0xFF, transform: 'direct' },
  { name: 'CP_TXSIGINDEX',        byteOffset: 0x09, mask: 0xFF, transform: 'direct' },

  // Bytes +0x14, +0x15: DPL invert flags (boolean)
  { name: 'CP_RXDPLINVERT',       byteOffset: 0x14, mask: 0xFF, transform: 'boolean' },
  { name: 'CP_TXDPLINVERT',       byteOffset: 0x15, mask: 0xFF, transform: 'boolean' },

  // Bytes +0x1C, +0x1D: channel frequency offsets (VERIFIED)
  { name: 'CP_RXFREQ',            byteOffset: 0x1C, mask: 0xFF, transform: 'div0.25', format: '%2.2f' },
  { name: 'CP_TXFREQ',            byteOffset: 0x1D, mask: 0xFF, transform: 'div0.25', format: '%2.2f' },

  // Bytes +0x1F, +0x20: reference frequencies (VERIFIED)
  { name: 'CP_RXREFFREQ',         byteOffset: 0x1F, mask: 0xFF, transform: 'div1.5', format: '%2.1f' },
  { name: 'CP_TXREFFREQ',         byteOffset: 0x20, mask: 0xFF, transform: 'div1.5', format: '%2.1f' },

  // Byte +0x23: TX deviation — nonlinear encoding
  // Serializer: byte = (int)(atof(val) * sqrt(val / 25.0) + 0.5)
  // Deserializer: inverse lookup required. Observed: "2.5"->1, "5.0"->2
  { name: 'CP_TXDEV',             byteOffset: 0x23, mask: 0xFF, transform: 'nonlinear', format: 'txdev' },

  // Bytes +0x29-0x30: 8-byte channel alias string (VERIFIED)
  { name: 'ALIAS',                byteOffset: 0x29, mask: 0xFF, transform: 'string8' },
];

/**
 * Enum tables — ONLY those verified from DLL decompilation.
 * Index = binary value, element = XML display string.
 *
 * Tables fall into two categories:
 * 1. "DLL enum tables" — used by enum_lookup/reverse_enum functions in the serializer.
 *    These are {value, string_ptr} arrays in the DLL .data section.
 * 2. "Choice index tables" — single-bit fields where the serializer uses atoi() and the
 *    deserializer uses sprintf("%d"). The display string comes from rmenglish.dll string
 *    table, ordered by consecutive string IDs. Index 0 = factory default (memset 0).
 *    Verified by: matching factory sample XML values against default binary (all zeros).
 */
export const CP_ENUMS = {
  // --- DLL enum tables (from elpelmcpservices.dll .data section) ---
  BANDWIDTH:       ['25', '12.5'],          // 0→"25", 1→"12.5" (confirmed in DATA_PIPELINE.md)
  POWER_LEVEL:     ['High', 'Low'],         // 0→"High", 1→"Low" (confirmed)
  SQUELCH_SETTING: ['Normal', 'Tight'],     // 0→"Normal", 1→"Tight" (confirmed)
  SQUELCH_CODE:    ['CSQ', 'TPL', 'DPL'],   // 00→"CSQ", 01→"TPL", 10→"DPL" (confirmed in byte map)

  // --- Choice index tables (rmenglish.dll string table order, factory default = index 0) ---

  // CP_EMPSEL: Emphasis Selection (byte +3, mask 0x40, field idx 0x70)
  // rmenglish IDs 227-229. 1 bit = 2 values. "Pre-Emphasis" (ID 228) exists but unused in ELP_ELM.
  // Factory default: "De-Emphasis and Pre-Emphasis" (all 148 samples). Alternate: "De-Emphasis" (8 ch).
  // DLL proof: serializer at 0x6107a9c8 calls atoi()+pack_bits(0x40); deserializer at 0x61077ceb uses sprintf("%d").
  EMPHASIS_SEL:    ['De-Emphasis and Pre-Emphasis', 'De-Emphasis'],

  // CP_UNMUTETYPE: Unmute/Mute Rule (byte +4, mask 0x10, field idx 0x73)
  // rmenglish IDs 236-238. 1 bit = 2 values. "And Unmuting, Or Muting" (ID 238) unused in ELP_ELM.
  // Factory default: "Std Unmuting, Std Muting" (all 146 samples with this field).
  // DLL proof: serializer uses atoi()+pack_bits(0x10); deserializer uses sprintf("%d").
  UNMUTE_RULE:     ['Std Unmuting, Std Muting', 'And Unmuting, Std Muting'],

  // CP_SIGSQ: Signaling Squelch logic (byte +4, mask 0x20, field idx 0x74)
  // rmenglish: "Or" and "And" are the two signaling squelch modes.
  // Factory default: "Or" (all 146 samples).
  // DLL proof: serializer uses atoi()+pack_bits(0x20); deserializer uses sprintf("%d").
  SIG_SQUELCH:     ['Or', 'And'],

  // CP_TOTTYPE: Time-Out Timer Type (byte +5, mask 0x04, field idx 0x79)
  // rmenglish IDs 621-622 (or 996-997). 1 bit = 2 values.
  // Factory default: "Non-Cumulative" (all 146 samples).
  // DLL proof: serializer uses atoi()+pack_bits(0x04); deserializer uses sprintf("%d").
  TOT_TYPE:        ['Non-Cumulative', 'Cumulative'],

  // CP_RXSIGTYPE / CP_TXSIGTYPE: Signaling Type (byte +6, masks 0x40/0x80, field idx 0x82/0x83)
  // rmenglish IDs 265-266. 1 bit = 2 values.
  // Factory default: "None". Alternate: "MDC" (2 TX channels observed in user samples).
  // DLL proof: serializer uses atoi()+pack_bits(0x40 / 0x80); deserializer uses sprintf("%d").
  SIG_TYPE:        ['None', 'MDC'],
};

/**
 * Fields with known byte offsets but UNVERIFIED or problematic encoding.
 * Listed here for tracking — NOT used by the codec.
 *
 * Moved to CP_BLOCK_FIELDS (RESOLVED):
 *   CP_EMPSEL, CP_UNMUTETYPE, CP_SIGSQ, CP_TOTTYPE, CP_RXSIGTYPE, CP_TXSIGTYPE, CP_TXDEV
 */
export const UNVERIFIED_FIELDS = [
  { name: 'CP_PHSYSINDEX',        byteOffset: 0x04, mask: 0x0F, note: 'direct 4-bit, but XML stores "255" which overflows 4 bits. Needs investigation.' },
  { name: 'CP_RXSQCODESEL',       byteOffset: 0x05, mask: 0x10, note: '1-bit choice index (atoi/sprintf "%d"). Only "CSQ" (=0) observed in all 148 samples. Bit 1 meaning unclear — may select "use TXSQCODESEL code" vs "CSQ".' },
  { name: 'CP_RXDECDATA',         byteOffset: 0x0C, mask: 0xFF, note: 'Serializer: atoi(value) / 250. But atoi("023")=23, 23/250=0 — gives 0 for all observed values. Encoding does not match DATA_PIPELINE.md claim. Needs re-investigation.' },
  { name: 'CP_TXENCDATA',         byteOffset: 0x0D, mask: 0xFF, note: 'DATA_PIPELINE.md claims "enum lookup via table at 0x61134a28" but that table is OPTION_BOARD_CONFIG (None/Simple Decoder/...), not PL/DPL. Field mapping error — actual PL/DPL encoding unknown.' },
  { name: 'CP_OPTBRDCONFIGINDEX', byteOffset: 0x06, mask: 0x02, note: 'XML stores "255". 1 bit can only hold 0/1. Enum table at 0x61134a28 has 5 entries (0-8). Field may be wider or at different offset.' },
  { name: 'CP_BUSYCHLKOUT',       byteOffset: 0x27, mask: 0x20, note: 'DATA_PIPELINE.md maps to field idx 0xA9, but DLL deserializer for 0xA9 uses reverse_enum with table {"Control Head","Accessory Connector"} — NOT BUSYCHLKOUT. Field index mapping error. Only "Disabled" observed.' },
  { name: 'CP_TXHIGHPWR',         byteOffset: 0x25, mask: 0xFF, note: 'Actually RC_TXHIGHPWR (in RC_BLOCK, not CP_BLOCK). Values: "26.0"-"49.0" (watt strings). Direct byte but unit conversion unknown.' },
];
