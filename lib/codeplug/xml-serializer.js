/**
 * Serialize a Codeplug model back to CPS XML string.
 */
import { getFieldsForFormat } from '../data/registry.js';

/**
 * Serialize a Codeplug to XML string.
 * @param {import('./codeplug.js').Codeplug} codeplug
 * @returns {string}
 */
export function serializeCodeplugXml(codeplug) {
  const isS5T = codeplug.format === 'S5T';
  const rootTag = isS5T ? 'S5T_CODEPLUG' : 'ELP_ELM_CODEPLUG';
  const doctype = isS5T ? 'S5T_Codeplug' : 'ELP_ELM_Codeplug';

  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
  lines.push(`<!DOCTYPE ${doctype}>`);
  lines.push(`<${rootTag} VERSION="1.0">`);

  // ELP_ELM has RRO (read-only) and RRW (read-write) regions
  // S5T has empty RRO and everything in RRW
  if (isS5T) {
    lines.push('\t<RRO/>');
    lines.push('\t<RRW>');
    serializeBlocks(codeplug, lines, 2);
    lines.push('\t</RRW>');
  } else {
    lines.push('\t<RRO>');
    // RRO blocks: MDF_BLOCK, RI_BLOCK
    for (const name of ['MDF_BLOCK', 'RI_BLOCK']) {
      const block = codeplug.getBlock(name);
      if (block) serializeBlock(name, block, lines, 2);
    }
    lines.push('\t</RRO>');

    lines.push('\t<RRW>');
    // All other blocks
    for (const [name, block] of codeplug.blocks) {
      if (name === 'MDF_BLOCK' || name === 'RI_BLOCK') continue;
      serializeBlock(name, block, lines, 2);
    }
    lines.push('\t</RRW>');
  }

  lines.push(`</${rootTag}>`);
  return lines.join('\n');
}

/**
 * @param {import('./codeplug.js').Codeplug} codeplug
 * @param {string[]} lines
 * @param {number} depth
 */
function serializeBlocks(codeplug, lines, depth) {
  for (const [name, block] of codeplug.blocks) {
    serializeBlock(name, block, lines, depth);
  }
}

/**
 * @param {string} name
 * @param {import('./codeplug.js').Block} block
 * @param {string[]} lines
 * @param {number} depth
 */
function serializeBlock(name, block, lines, depth) {
  const tabs = '\t'.repeat(depth);
  const idAttr = block.id !== undefined ? ` ID="${block.id}"` : '';

  // Structural blocks (TC, VECT, RRW, CFG) — flat fields
  if (isStructural(name)) {
    lines.push(`${tabs}<${name}${idAttr}>`);
    if (block.entries[0]) {
      for (const [k, v] of Object.entries(block.entries[0].fields)) {
        lines.push(`${tabs}\t<${k}>${escapeXml(v)}</${k}>`);
      }
    }
    lines.push(`${tabs}</${name}>`);
    return;
  }

  lines.push(`${tabs}<${name}${idAttr}>`);

  // ENTRY_INFO
  if (block.entrySize !== null && block.entrySize !== undefined) {
    lines.push(`${tabs}\t<ENTRY_INFO>`);
    if (block.headerValue !== null && block.headerValue !== undefined) {
      lines.push(`${tabs}\t\t<ENTRY_HEADER>${block.headerValue}</ENTRY_HEADER>`);
    }
    lines.push(`${tabs}\t\t<ENTRY_SIZE>${block.entrySize}</ENTRY_SIZE>`);
    lines.push(`${tabs}\t\t<ENTRY_QUANTITY>${block.entryQty || block.entries.length}</ENTRY_QUANTITY>`);
    lines.push(`${tabs}\t</ENTRY_INFO>`);
  }

  // ENTRY_DATA for each entry
  for (const entry of block.entries) {
    lines.push(`${tabs}\t<ENTRY_DATA>`);
    for (const [fieldName, value] of Object.entries(entry.fields)) {
      // Reconstruct ID and TYPE from field definitions if available
      lines.push(`${tabs}\t\t<${fieldName}>${escapeXml(value)}</${fieldName}>`);
    }
    lines.push(`${tabs}\t</ENTRY_DATA>`);
  }

  lines.push(`${tabs}</${name}>`);
}

function isStructural(name) {
  return ['RRW_BLOCK', 'TC_BLOCK', 'VECT_BLOCK',
          'S5_CFG_BLOCK', 'S5_TYPE_CONTROL_BLOCK', 'S5_VECTOR_BLOCK'].includes(name);
}

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
