/**
 * @file ELP_ELM block definitions for CM140/CM160/CP040-CP180 codeplugs.
 *
 * Each block entry contains:
 * @typedef {Object} BlockDef
 * @property {number} id - XML ID attribute for this block element
 * @property {number} vectIndex - Index into the VECT_BLOCK (56 x 16-bit LE offsets)
 * @property {number} headerSize - Binary header size in bytes (4=standard, 5=list blocks)
 * @property {number|null} entrySize - Fixed entry size in bytes, or null if variable
 * @property {string[]} observedQuantities - All ENTRY_QUANTITY values seen across 134 samples
 * @property {string} description - Human-readable block description
 *
 * VECT_BLOCK contains 56 entries (indices 0-55, with 48-55 reserved/spare).
 * Block header format: [Flags 1B][EntrySize 1B][EntryQty 1B][Reserved 1B] (4 bytes)
 * List block header: [Flags 1B][EntrySize 1B][EntryQty 1B][Reserved 1B][ListQty 1B] (5 bytes)
 *
 * @module data/elp-elm-blocks
 */

export const ELP_ELM_BLOCKS = {
  AC_BLOCK: { id: 19, vectIndex: 16, headerSize: 4, entrySize: 21, observedQuantities: ['1'], description: 'Accessory Configuration' },
  AUXC_BLOCK: { id: 20, vectIndex: 17, headerSize: 4, entrySize: 42, observedQuantities: ['1'], description: 'Auxiliary Configuration' },
  CALL_BLOCK: { id: 23, vectIndex: 23, headerSize: 5, entrySize: 2, observedQuantities: ['2', '3'], description: 'Call lists' },
  CB_BLOCK: { id: 15, vectIndex: 12, headerSize: 4, entrySize: 15, observedQuantities: ['1'], description: 'Control Buttons' },
  CHD_BLOCK: { id: null, vectIndex: 18, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Channel Data' },
  CPA_BLOCK: { id: null, vectIndex: 40, headerSize: 5, entrySize: null, observedQuantities: [], description: 'Channel Parameters Alias' },
  CP_BLOCK: { id: 38, vectIndex: 39, headerSize: 5, entrySize: 27, observedQuantities: ['1'], description: 'Channel Parameters (frequencies, PL/DPL, power)' },
  CS_BLOCK: { id: null, vectIndex: 45, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Call Settings' },
  DR_BLOCK: { id: 8, vectIndex: 6, headerSize: 4, entrySize: 14, observedQuantities: ['1'], description: 'Dynamic Radio (runtime state, password)' },
  DTMFA_BLOCK: { id: null, vectIndex: 46, headerSize: 4, entrySize: null, observedQuantities: [], description: 'DTMF Alias' },
  DTMFC_BLOCK: { id: 26, vectIndex: 26, headerSize: 5, entrySize: 17, observedQuantities: ['1'], description: 'DTMF Call' },
  DTMF_BLOCK: { id: 43, vectIndex: 44, headerSize: 4, entrySize: 22, observedQuantities: ['1'], description: 'DTMF Configuration' },
  DVS_BLOCK: { id: null, vectIndex: 15, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Digital Voice Storage' },
  EMDC_BLOCK: { id: 30, vectIndex: 30, headerSize: 4, entrySize: 11, observedQuantities: ['1'], description: 'Emergency MDC' },
  EM_BLOCK: { id: 22, vectIndex: 19, headerSize: 4, entrySize: 10, observedQuantities: ['1'], description: 'Emergency' },
  LGA_BLOCK: { id: null, vectIndex: 33, headerSize: 4, entrySize: null, observedQuantities: [], description: 'LTR Group Alias' },
  LG_BLOCK: { id: null, vectIndex: 32, headerSize: 4, entrySize: null, observedQuantities: [], description: 'LTR Group' },
  LRA_BLOCK: { id: null, vectIndex: 31, headerSize: 4, entrySize: null, observedQuantities: [], description: 'LTR Repeater Alias' },
  LRF_BLOCK: { id: null, vectIndex: 36, headerSize: 4, entrySize: null, observedQuantities: [], description: 'LTR Repeater Freq' },
  LSA_BLOCK: { id: null, vectIndex: 38, headerSize: 4, entrySize: null, observedQuantities: [], description: 'LTR Settings Alias' },
  LS_BLOCK: { id: null, vectIndex: 37, headerSize: 4, entrySize: null, observedQuantities: [], description: 'LTR Settings' },
  LUIDA_BLOCK: { id: null, vectIndex: 35, headerSize: 4, entrySize: null, observedQuantities: [], description: 'LTR User ID Alias' },
  LUID_BLOCK: { id: null, vectIndex: 34, headerSize: 4, entrySize: null, observedQuantities: [], description: 'LTR User ID' },
  MDCA_BLOCK: { id: null, vectIndex: 21, headerSize: 4, entrySize: null, observedQuantities: [], description: 'MDC Alias' },
  MDCC_BLOCK: { id: 24, vectIndex: 24, headerSize: 5, entrySize: 16, observedQuantities: ['1'], description: 'MDC Call' },
  MDCM_BLOCK: { id: null, vectIndex: 27, headerSize: 4, entrySize: null, observedQuantities: [], description: 'MDC Monitor' },
  MDCST_BLOCK: { id: null, vectIndex: 28, headerSize: 4, entrySize: null, observedQuantities: [], description: 'MDC Status' },
  MDC_BLOCK: { id: 41, vectIndex: 42, headerSize: 4, entrySize: 30, observedQuantities: ['1'], description: 'MDC1200 Configuration' },
  MDF_BLOCK: { id: 2, vectIndex: 1, headerSize: 4, entrySize: 10, observedQuantities: ['1'], description: 'Model Definition (features, max channels)' },
  MENU_BLOCK: { id: 16, vectIndex: 13, headerSize: 4, entrySize: 12, observedQuantities: ['1'], description: 'Menu configuration' },
  OBC_BLOCK: { id: 17, vectIndex: 14, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Option Board Config' },
  OT_BLOCK: { id: 29, vectIndex: 29, headerSize: 4, entrySize: 3, observedQuantities: ['8'], description: 'One-Touch' },
  PA_BLOCK: { id: 6, vectIndex: 4, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Personality Assignment (zone-to-channel map)' },
  PNA_BLOCK: { id: null, vectIndex: 8, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Personality Name Aliases' },
  PN_BLOCK: { id: 9, vectIndex: 7, headerSize: 4, entrySize: null, observedQuantities: ['26'], description: 'Personality (per-channel settings)' },
  PSA_BLOCK: { id: null, vectIndex: 47, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Personality Settings Alias' },
  PS_BLOCK: { id: 11, vectIndex: 9, headerSize: 4, entrySize: 24, observedQuantities: ['1'], description: 'Personality Settings' },
  QCA_BLOCK: { id: null, vectIndex: 22, headerSize: 4, entrySize: null, observedQuantities: [], description: 'QC Alias' },
  QCC_BLOCK: { id: 25, vectIndex: 25, headerSize: 5, entrySize: 16, observedQuantities: ['1'], description: 'QC Call' },
  QC_BLOCK: { id: 42, vectIndex: 43, headerSize: 4, entrySize: 19, observedQuantities: ['1'], description: 'Quik-Call II Configuration' },
  RC_BLOCK: { id: 5, vectIndex: 3, headerSize: 4, entrySize: 58, observedQuantities: ['1'], description: 'Radio Configuration (general settings)' },
  RI_BLOCK: { id: 3, vectIndex: 0, headerSize: 4, entrySize: 82, observedQuantities: ['1'], description: 'Radio Info (serial, model, band, freq range)' },
  RRW_BLOCK: { id: 1, vectIndex: null, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Read-Write Region wrapper' },
  SC_BLOCK: { id: 40, vectIndex: 41, headerSize: 4, entrySize: 16, observedQuantities: ['1'], description: 'Signaling Configuration' },
  SLA_BLOCK: { id: null, vectIndex: 20, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Scan List Alias' },
  SLI_BLOCK: { id: 13, vectIndex: 11, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Scan List Info' },
  SM_BLOCK: { id: null, vectIndex: 10, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Scan Member list' },
  TC_BLOCK: { id: 453, vectIndex: null, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Type Control (block presence flags)' },
  TI_BLOCK: { id: 4, vectIndex: 2, headerSize: 4, entrySize: 9, observedQuantities: ['1'], description: 'Tool Info (last programmed date/source)' },
  VECT_BLOCK: { id: 454, vectIndex: null, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Vector Block (offsets to all data blocks)' },
  ZA_BLOCK: { id: null, vectIndex: 5, headerSize: 4, entrySize: null, observedQuantities: [], description: 'Zone Assignment' },
};

/** Total VECT_BLOCK entries (56 x 16-bit LE offsets = 112 bytes + 2 spare) */
export const ELP_ELM_VECT_COUNT = 56;

/** Fixed codeplug start offset (all models) */
export const ELP_ELM_CODEPLUG_START = 642;