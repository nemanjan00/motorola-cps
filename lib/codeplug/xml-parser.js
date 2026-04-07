/**
 * Parse CPS XML into a Codeplug model.
 * Handles both ELP_ELM_CODEPLUG and S5T_CODEPLUG formats.
 */
import { Codeplug } from './codeplug.js';
import { parseXml } from '../util/xml.js';

/**
 * Parse XML string into a Codeplug.
 * @param {string} xml - Decoded CPS XML content
 * @returns {Codeplug}
 */
export function parseCodeplugXml(xml) {
  const doc = parseXml(xml);
  const root = doc.documentElement;

  const rootTag = root.tagName || root.nodeName;
  const format = rootTag.includes('S5T') ? 'S5T' : 'ELP_ELM';

  const codeplug = new Codeplug(format);

  // Walk regions: RRO, RRW
  for (const region of root.childNodes) {
    if (region.nodeType !== 1) continue;
    const regionName = region.tagName;

    // Walk blocks within region
    for (const blockNode of region.childNodes) {
      if (blockNode.nodeType !== 1) continue;

      const blockName = blockNode.tagName;
      const blockId = blockNode.getAttribute('ID');

      // Special structural blocks (no ENTRY_INFO/ENTRY_DATA)
      if (isStructuralBlock(blockName)) {
        const block = parseStructuralBlock(blockName, blockNode);
        if (blockName === 'RRW_BLOCK') {
          codeplug.meta.rrw = block;
        } else if (blockName === 'TC_BLOCK') {
          codeplug.meta.tc = block;
        } else if (blockName === 'VECT_BLOCK') {
          codeplug.meta.vect = block;
        } else if (blockName === 'S5_CFG_BLOCK') {
          codeplug.meta.cfg = block;
        }
        codeplug.setBlock(blockName, {
          name: blockName,
          id: blockId ? parseInt(blockId) : undefined,
          entries: [{ fields: block }],
          rawBinary: null,
        });
        continue;
      }

      // Regular data block
      const block = parseDataBlock(blockName, blockId, blockNode);
      codeplug.setBlock(blockName, block);
    }
  }

  return codeplug;
}

/**
 * @param {string} name
 * @returns {boolean}
 */
function isStructuralBlock(name) {
  return ['RRW_BLOCK', 'TC_BLOCK', 'VECT_BLOCK',
          'S5_CFG_BLOCK', 'S5_TYPE_CONTROL_BLOCK', 'S5_VECTOR_BLOCK'].includes(name);
}

/**
 * Parse a structural block (flat key-value fields, no ENTRY_INFO).
 * @param {string} name
 * @param {object} node
 * @returns {Object<string, string>}
 */
function parseStructuralBlock(name, node) {
  const fields = {};
  for (const child of node.childNodes) {
    if (child.nodeType !== 1) continue;
    const text = getDirectText(child);
    if (text !== null) {
      fields[child.tagName] = text;
    }
    // Recurse one level for nested children (TC_BLOCK has direct fields)
    for (const sub of child.childNodes) {
      if (sub.nodeType === 1) {
        const subText = getDirectText(sub);
        if (subText !== null) {
          fields[sub.tagName] = subText;
        }
      }
    }
  }
  return fields;
}

/**
 * Parse a regular data block with ENTRY_INFO and ENTRY_DATA.
 * @param {string} blockName
 * @param {string|null} blockId
 * @param {object} blockNode
 * @returns {import('./codeplug.js').Block}
 */
function parseDataBlock(blockName, blockId, blockNode) {
  let entrySize = null;
  let entryQty = null;
  let headerValue = null;
  const entries = [];

  for (const child of blockNode.childNodes) {
    if (child.nodeType !== 1) continue;

    if (child.tagName === 'ENTRY_INFO') {
      for (const info of child.childNodes) {
        if (info.nodeType !== 1) continue;
        const val = getDirectText(info);
        if (val === null) continue;
        const tag = info.tagName;
        if (tag.includes('ENTRY_HEADER') || tag.includes('CHECKSUM_LAYOUT')) {
          headerValue = parseInt(val);
        } else if (tag.includes('ENTRY_SIZE') && !tag.includes('UNIT') && !tag.includes('FIELD_LEN')) {
          entrySize = parseInt(val);
        } else if (tag.includes('ENTRY_QUANTITY') || tag.includes('QUANTITY_HEADER')) {
          entryQty = parseInt(val);
        }
      }
    } else if (child.tagName === 'ENTRY_DATA') {
      entries.push(parseEntryData(child));
    } else if (child.tagName === 'LIST_INFO') {
      // List blocks — parse LIST_INFO similarly
      for (const info of child.childNodes) {
        if (info.nodeType !== 1) continue;
        const val = getDirectText(info);
        if (val === null) continue;
        const tag = info.tagName;
        if (tag.includes('LIST_HEADER')) headerValue = parseInt(val);
        if (tag.includes('LIST_SIZE')) entrySize = parseInt(val);
        if (tag.includes('LIST_QUANTITY')) entryQty = parseInt(val);
      }
    } else if (child.tagName === 'LIST_DATA') {
      // List data may contain nested ENTRY_DATA
      const listEntry = { fields: {} };
      for (const sub of child.childNodes) {
        if (sub.nodeType !== 1) continue;
        if (sub.tagName === 'ENTRY_DATA') {
          entries.push(parseEntryData(sub));
        } else {
          const val = getDirectText(sub);
          if (val !== null) listEntry.fields[sub.tagName] = val;
        }
      }
      if (Object.keys(listEntry.fields).length > 0) {
        entries.push(listEntry);
      }
    }
  }

  // If no ENTRY_DATA found, there might be direct fields (some blocks)
  if (entries.length === 0) {
    const directFields = {};
    for (const child of blockNode.childNodes) {
      if (child.nodeType !== 1) continue;
      if (['ENTRY_INFO', 'LIST_INFO', 'ENTRY_DATA', 'LIST_DATA'].includes(child.tagName)) continue;
      const val = getDirectText(child);
      if (val !== null) directFields[child.tagName] = val;
    }
    if (Object.keys(directFields).length > 0) {
      entries.push({ fields: directFields });
    }
  }

  return {
    name: blockName,
    id: blockId ? parseInt(blockId) : undefined,
    entrySize,
    entryQty,
    headerValue,
    entries,
    rawBinary: null,
  };
}

/**
 * Parse an ENTRY_DATA element into field name/value pairs.
 * @param {object} entryNode
 * @returns {import('./codeplug.js').BlockEntry}
 */
function parseEntryData(entryNode) {
  const fields = {};
  for (const field of entryNode.childNodes) {
    if (field.nodeType !== 1) continue;
    const val = getDirectText(field);
    if (val !== null) {
      fields[field.tagName] = val;
    }
  }
  return { fields };
}

/**
 * Get direct text content of an element (not from child elements).
 * @param {object} node
 * @returns {string|null}
 */
function getDirectText(node) {
  const children = node.childNodes ? [...node.childNodes] : [];
  // Look for direct text nodes
  for (const child of children) {
    if (child.nodeType === 3) {
      const text = child.textContent.trim();
      if (text) return text;
    }
  }
  // Fallback: textContent if no child elements present
  if (children.length === 0 || children.every(c => c.nodeType === 3)) {
    const text = (node.textContent || '').trim();
    return text || null;
  }
  return null;
}
