/**
 * Enumeration tables for Motorola Commercial Series CPS.
 *
 * CTCSS tones and DPL codes are standard Motorola tables (public data).
 * Other enums extracted from rmenglish.dll string table and CPS documentation.
 */

/**
 * Standard 50 CTCSS/TPL tones in Hz, with Motorola code names.
 * Index in this array corresponds to the codeplug encoding value.
 * @type {Array<{freq: number, code: string}>}
 */
export const CTCSS_TONES = [
  { freq: 67.0, code: 'XZ' },
  { freq: 69.3, code: 'WZ' },
  { freq: 71.9, code: 'XA' },
  { freq: 74.4, code: 'WA' },
  { freq: 77.0, code: 'XB' },
  { freq: 79.7, code: 'WB' },
  { freq: 82.5, code: 'YZ' },
  { freq: 85.4, code: 'YA' },
  { freq: 88.5, code: 'YB' },
  { freq: 91.5, code: 'ZZ' },
  { freq: 94.8, code: 'ZA' },
  { freq: 97.4, code: 'ZB' },
  { freq: 100.0, code: '1Z' },
  { freq: 103.5, code: '1A' },
  { freq: 107.2, code: '1B' },
  { freq: 110.9, code: '2Z' },
  { freq: 114.8, code: '2A' },
  { freq: 118.8, code: '2B' },
  { freq: 123.0, code: '3Z' },
  { freq: 127.3, code: '3A' },
  { freq: 131.8, code: '3B' },
  { freq: 136.5, code: '4Z' },
  { freq: 141.3, code: '4A' },
  { freq: 146.2, code: '4B' },
  { freq: 151.4, code: '5Z' },
  { freq: 156.7, code: '5A' },
  { freq: 162.2, code: '5B' },
  { freq: 167.9, code: '6Z' },
  { freq: 173.8, code: '6A' },
  { freq: 179.9, code: '6B' },
  { freq: 186.2, code: '7Z' },
  { freq: 192.8, code: '7A' },
  { freq: 203.5, code: 'M1' },
  { freq: 206.5, code: '8Z' },
  { freq: 210.7, code: 'M2' },
  { freq: 218.1, code: 'M3' },
  { freq: 225.7, code: 'M4' },
  { freq: 229.1, code: '9Z' },
  { freq: 233.6, code: 'M5' },
  { freq: 241.8, code: 'M6' },
  { freq: 250.3, code: 'M7' },
  { freq: 254.1, code: '0Z' },
];

/**
 * Standard 104 Motorola DPL (Digital Private Line) codes in octal.
 * These are the normal (non-inverted) codes. Inverted codes use the
 * same set with the DPL Invert flag set.
 * @type {number[]}
 */
export const DPL_CODES = [
  23,  25,  26,  31,  32,  36,  43,  47,
  51,  53,  54,  65,  71,  72,  73,  74,
  114, 115, 116, 122, 125, 131, 132, 134,
  143, 145, 152, 155, 156, 162, 165, 172,
  174, 205, 212, 223, 225, 226, 243, 244,
  245, 246, 251, 252, 255, 261, 263, 265,
  266, 271, 274, 306, 311, 315, 325, 331,
  332, 343, 346, 351, 356, 364, 365, 371,
  411, 412, 413, 423, 431, 432, 445, 446,
  452, 454, 455, 462, 464, 465, 466, 503,
  506, 516, 523, 526, 532, 546, 565, 606,
  612, 624, 627, 631, 632, 654, 662, 664,
  703, 712, 723, 731, 732, 734, 743, 754,
];

/** @type {string[]} Squelch/code type selections */
export const SQUELCH_TYPES = ['CSQ', 'TPL', 'DPL'];

/** @type {string[]} Power level settings */
export const POWER_LEVELS = ['Low', 'High'];

/** @type {string[]} Channel bandwidth options in kHz */
export const CHANNEL_BANDWIDTHS = ['12.5', '20', '25'];

/** @type {string[]} Companding mode options */
export const COMPANDING_MODES = [
  'Disabled',
  'Full Companding',
  'Full Expansion',
  'AGC mode',
  'Low-level Expansion',
  'Full Compression',
];

/** @type {string[]} Signaling system types */
export const SIGNALING_TYPES = ['None', 'MDC', 'Quik-Call II', 'DTMF'];

/** @type {string[]} Emphasis selection options */
export const EMPHASIS_SELECTIONS = [
  'None',
  'De-Emphasis',
  'Pre-Emphasis',
  'De-Emphasis and Pre-Emphasis',
];

/** @type {string[]} Unmute/Mute rule options */
export const UNMUTE_MUTE_RULES = [
  'Std Unmuting, Std Muting',
  'And Unmuting, Std Muting',
  'And Unmuting, Or Muting',
];

/** @type {string[]} Squelch tightness setting */
export const SQUELCH_SETTINGS = ['Normal', 'Tight'];

/** @type {string[]} Busy channel lockout options */
export const BUSY_CHANNEL_LOCKOUT = [
  'Disabled',
  'On Busy Channel',
  'On Busy Channel With Wrong PL Code',
];

/** @type {string[]} Talkaround mode options */
export const TALKAROUND_MODES = ['Auto', 'Repeater', 'Talkaround'];

/** @type {string[]} Monitor type options */
export const MONITOR_TYPES = ['Open Squelch', 'Carrier Squelch'];

/** @type {string[]} Option board type options */
export const OPTION_BOARD_TYPES = [
  'Disabled',
  'Simple Decoder',
  'Simple Option Interface',
  'Advanced Option Interface',
  'Voice Storage',
  'Advanced and Voice Storage',
];

/** @type {string[]} Quik-Call II call format options */
export const QCII_CALL_FORMATS = [
  'A-B',
  'A-B/A-C',
  'A-B/C-B',
  'A-B/Long B',
  'A-B/Long C',
  'A-B/A-C/Long C',
  'A-B/Long B/Long C',
  'A-B/A-C/Long B/Long C',
  'A-B/A-D/C-D',
  'A-B/C-D',
];

/**
 * Programmable button functions.
 * String table IDs 147-209, extracted from rmenglish.dll.
 * Index corresponds to the codeplug enum value for CBP and CBM fields.
 * @type {Array<{id: number, label: string}>}
 */
export const BUTTON_FUNCTIONS = [
  { id: 0, label: 'Unassigned' },
  { id: 1, label: 'Emergency On' },
  { id: 2, label: 'Emergency Off' },
  { id: 3, label: 'Emergency Siren On' },
  { id: 4, label: 'Emergency Siren Off' },
  { id: 5, label: 'Monitor' },
  { id: 6, label: 'Sticky Permanent Monitor' },
  { id: 7, label: 'Volume Set' },
  { id: 8, label: 'Battery Indicator' },
  { id: 9, label: 'Toggle System Scan On/Off' },
  { id: 10, label: 'Nuisance Delete' },
  { id: 11, label: 'Toggle High/Low Power' },
  { id: 12, label: 'Toggle Keypad Lock On/Off' },
  { id: 13, label: 'Toggle Repeater/Talkaround' },
  { id: 14, label: 'Toggle Tight/Normal Squelch' },
  { id: 15, label: 'Toggle Option Board On/Off' },
  { id: 16, label: 'Phone Mode' },
  { id: 17, label: 'Phone Speed Dial' },
  { id: 18, label: 'Radio Call' },
  { id: 19, label: 'All Group Scan' },
  { id: 20, label: 'Voice Storage Exit' },
  { id: 21, label: 'Voice Storage Record' },
  { id: 22, label: 'Voice Storage Playback' },
  { id: 23, label: 'Voice Storage Delete' },
  { id: 24, label: 'Light' },
  { id: 25, label: 'Backlight Control' },
  { id: 26, label: 'Backlight Color' },
  { id: 27, label: 'Channel Select 1' },
  { id: 28, label: 'Channel Select 2' },
  { id: 29, label: 'Channel Select 3' },
  { id: 30, label: 'Channel Select 4' },
  { id: 31, label: 'Aux Control 1' },
  { id: 32, label: 'Aux Control 2' },
  { id: 33, label: 'Priority Request to Talk' },
  { id: 34, label: 'Status' },
  { id: 35, label: 'Message' },
  { id: 36, label: 'One Touch 1' },
  { id: 37, label: 'One Touch 2' },
  { id: 38, label: 'One Touch 3' },
  { id: 39, label: 'One Touch 4' },
  { id: 40, label: 'One Touch 5' },
  { id: 41, label: 'One Touch 6' },
  { id: 42, label: 'One Touch 7' },
  { id: 43, label: 'One Touch 8' },
  { id: 44, label: 'Channel Down' },
  { id: 45, label: 'Radio Call' },
  { id: 46, label: 'Right' },
  { id: 47, label: 'Left' },
  { id: 48, label: 'Select/Enter' },
  { id: 49, label: 'Exit' },
  { id: 50, label: 'PTT' },
  { id: 51, label: 'Direct Channel' },
  { id: 52, label: 'Home Channel' },
  { id: 53, label: 'Zone' },
  { id: 54, label: 'Open Squelch' },
  { id: 55, label: 'External Alarm' },
  { id: 56, label: 'Toggle Signalling Squelch On/Off' },
  { id: 57, label: 'Display Clock' },
  { id: 58, label: 'Toggle Voice Operated Tx' },
  { id: 59, label: 'Call Stack' },
  { id: 60, label: 'Toggle Answer Mode On/Off' },
  { id: 61, label: 'Scan List Edit' },
  { id: 62, label: 'Home Revert AutoKey 1' },
];

/**
 * Channel step sizes in kHz.
 * @type {number[]}
 */
export const CHANNEL_STEP_SIZES = [1.25, 2.1, 2.225, 2.4, 2.5, 3.125, 5.0, 6.25, 12.5];

/**
 * Time-Out Timer values in seconds.
 * 0 = disabled, then 15-180 in steps, plus Infinity for infinite.
 * @type {number[]}
 */
export const TIMEOUT_TIMER_VALUES = [
  0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, Infinity,
];
