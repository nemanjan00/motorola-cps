/**
 * motorola-cps — Motorola Commercial Series radio programming library.
 *
 * @example
 * // Read a .cps file
 * import { readCpsFile, parseCodeplugXml, getFieldDef } from 'motorola-cps';
 * const xml = await readCpsFile('radio.cps');
 * const codeplug = parseCodeplugXml(xml);
 * console.log(codeplug.getField('CP_BLOCK', 'CP_RXFREQ'));
 * console.log(getFieldDef('CP_RXFREQ'));
 *
 * @example
 * // Talk to a radio (browser)
 * import { createWebSerialTransport, ESBEPSession, RadioSession } from 'motorola-cps';
 * const port = await navigator.serial.requestPort();
 * const transport = await createWebSerialTransport(port);
 * const esbep = new ESBEPSession(transport);
 * const session = new RadioSession(esbep);
 * const info = await session.identify();
 * const codeplug = await session.readCodeplug(info);
 */

// Codeplug model & file I/O
export { Codeplug } from './codeplug/codeplug.js';
export { decodeCps, encodeCps, readCpsFile, writeCpsFile } from './codeplug/cps-file.js';
export { parseCodeplugXml } from './codeplug/xml-parser.js';
export { serializeCodeplugXml } from './codeplug/xml-serializer.js';
export { validateCodeplug } from './codeplug/validate.js';

// Protocol
export { ESBEPSession, buildFrame, parseResponse, OP, RESP, QUERY } from './protocol/esbep.js';
export { createWebSerialTransport, createNodeTransport } from './protocol/transport.js';
export { RadioSession } from './protocol/radio-session.js';
export { TunerSession, TUNER_OP, TUNER_RESP } from './protocol/tuner.js';

// Binary codecs
export { decodeCpEntry, encodeCpEntry } from './binary/cp-block-codec.js';
export { parseBlockHeader, buildBlockHeader } from './binary/block-codec.js';

// Data & metadata
export {
  getFieldDef, getBlockDef, getBlockFields, getEnumValues,
  getBlocksForFormat, getFieldsForFormat, getStringLabel, getHelp,
} from './data/registry.js';
export { decodePartNumber, getCodeplugFormat, MODELS, BAND_CODES } from './data/models.js';
export { CTCSS_TONES, DPL_CODES } from './data/enums.js';
