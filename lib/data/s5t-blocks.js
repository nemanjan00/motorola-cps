/**
 * @file S5T block definitions for CM340/CM360/CP340-CP380 codeplugs.
 *
 * Each block entry contains:
 * @typedef {Object} S5TBlockDef
 * @property {number} id - XML ID attribute for this block element
 * @property {number|null} vectIndex - Index into the VECTOR_BLOCK (32 x 16-bit LE offsets), null for meta blocks
 * @property {number} headerSize - Binary header size: [ChecksumType 1B][EntrySize uint16 LE][EntryQty uint16 LE] = 5
 * @property {number|null} entrySize - Fixed entry size in bytes
 * @property {string} description - Human-readable block description
 *
 * S5T header format differs from ELP_ELM:
 *   [ChecksumType 1B][EntrySize uint16 LE][EntryQty uint16 LE] (5 bytes for all blocks)
 *
 * @module data/s5t-blocks
 */

export const S5T_BLOCKS = {
  S5_ALERT_BLOCK: { id: 2022, vectIndex: 21, headerSize: 5, entrySize: 15, description: 'Alert tones' },
  S5_ALPHANUM_CH_ALIAS_BLOCK: { id: 2019, vectIndex: 16, headerSize: 5, entrySize: 14, description: 'Channel aliases (UHF4 only)' },
  S5_AUTO_ACK_LIST_BLOCK: { id: 2014, vectIndex: 11, headerSize: 5, entrySize: 6, description: 'Auto-acknowledge' },
  S5_BUTTON_DEFINITION_BLOCK: { id: 2021, vectIndex: 20, headerSize: 5, entrySize: 24, description: 'Programmable buttons' },
  S5_CFG_BLOCK: { id: 2002, vectIndex: null, headerSize: 5, entrySize: null, description: 'Config block (codeplug size, TCB/VB offsets)' },
  S5_CHANNEL_LIST_BLOCK: { id: 2018, vectIndex: 15, headerSize: 5, entrySize: 15, description: 'Channel frequencies' },
  S5_CONTACT_LIST_BLOCK: { id: 2006, vectIndex: 3, headerSize: 5, entrySize: 29, description: 'Address book' },
  S5_DECODER_STATUS_LIST_BLOCK: { id: 2008, vectIndex: 5, headerSize: 5, entrySize: 17, description: 'Decoder status' },
  S5_DTMF_SIG_SYS_LIST_BLOCK: { id: 2015, vectIndex: 12, headerSize: 5, entrySize: 12, description: 'DTMF signaling' },
  S5_DYNAMIC_RADIO_BLOCK: { id: 2026, vectIndex: 31, headerSize: 5, entrySize: 296, description: 'Runtime state' },
  S5_EMERGENCY_BLOCK: { id: 2005, vectIndex: 2, headerSize: 5, entrySize: 15, description: 'Emergency config' },
  S5_ENCODER_SEQ_LIST_BLOCK: { id: 2011, vectIndex: 8, headerSize: 5, entrySize: 17, description: 'Encoder sequences' },
  S5_ENCODER_STATUS_LIST_BLOCK: { id: 2007, vectIndex: 4, headerSize: 5, entrySize: 17, description: 'Encoder status' },
  S5_GENERAL_IO_BLOCK: { id: 2024, vectIndex: 23, headerSize: 5, entrySize: 17, description: 'General I/O' },
  S5_MULTICALL_CFG_BLOCK: { id: 2009, vectIndex: 6, headerSize: 5, entrySize: 50, description: 'Multi-call config' },
  S5_OPTION_BOARD_BLOCK: { id: 2023, vectIndex: 22, headerSize: 5, entrySize: 1, description: 'Option board' },
  S5_PERSONALITY_LIST_BLOCK: { id: 2017, vectIndex: 14, headerSize: 5, entrySize: 26, description: 'Channel personality' },
  S5_RADIO_INFO_BLOCK: { id: 2003, vectIndex: 0, headerSize: 5, entrySize: 67, description: 'Radio info, model, password at byte +53' },
  S5_RADIO_OPTION_BLOCK: { id: 2004, vectIndex: 1, headerSize: 5, entrySize: 199, description: 'Radio options (199 settings)' },
  S5_SCAN_LIST_BLOCK: { id: 2016, vectIndex: 13, headerSize: 5, entrySize: 25, description: 'Scan lists' },
  S5_SEL5_DECODER_LIST_BLOCK: { id: 2012, vectIndex: 9, headerSize: 5, entrySize: 56, description: 'Select-5 decoder' },
  S5_SEL5_DTMF_ENCODER_TG_LIST_BLOCK: { id: 2013, vectIndex: 10, headerSize: 5, entrySize: 6, description: 'DTMF encoder talk group' },
  S5_SEL5_SIG_SYS_LIST_BLOCK: { id: 2010, vectIndex: 7, headerSize: 5, entrySize: 27, description: 'Select-5 signaling' },
  S5_TYPE_CONTROL_BLOCK: { id: 2027, vectIndex: null, headerSize: 5, entrySize: null, description: 'Block presence flags' },
  S5_USER_COMMENT_BLOCK: { id: 2025, vectIndex: 24, headerSize: 5, entrySize: 1, description: 'User comment' },
  S5_USER_DEF_SIG_LIST_BLOCK: { id: 2020, vectIndex: 17, headerSize: 5, entrySize: 38, description: 'User-defined signaling' },
  S5_VECTOR_BLOCK: { id: 2028, vectIndex: null, headerSize: 5, entrySize: null, description: 'Offsets to all data blocks (32 x 16-bit LE)' },
};

/** Total VECTOR_BLOCK entries (32 x 16-bit LE offsets) */
export const S5T_VECT_COUNT = 32;

/** Fixed codeplug start offset (all S5T models) */
export const S5T_CODEPLUG_START = 642;

/** S5_CFG_BLOCK size in bytes */
export const S5T_CFG_BLOCK_SIZE = 9;