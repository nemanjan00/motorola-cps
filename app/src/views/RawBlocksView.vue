<script setup>
import { ref, computed } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import { getBlockFields, getFieldDef } from 'motorola-cps';

const codeplugStore = useCodeplugStore();
const expandedBlocks = ref(new Set());

const blocks = computed(() => {
  if (!codeplugStore.codeplug) return [];
  return codeplugStore.codeplug.listBlocks().map((name) => {
    const block = codeplugStore.codeplug.getBlock(name);
    return {
      name,
      entryCount: block?.entries?.length ?? 0,
      hasRaw: !!block?.rawBinary,
      rawSize: block?.rawBinary?.length ?? 0,
    };
  });
});

function toggleBlock(name) {
  const s = new Set(expandedBlocks.value);
  s.has(name) ? s.delete(name) : s.add(name);
  expandedBlocks.value = s;
}

function isExpanded(name) {
  return expandedBlocks.value.has(name);
}

function getBlockEntries(blockName) {
  const block = codeplugStore.codeplug?.getBlock(blockName);
  if (!block?.entries) return [];
  return block.entries;
}

function getFieldLabel(fieldName) {
  const def = getFieldDef(fieldName);
  return def?.label || fieldName;
}

function getFields(blockName) {
  return getBlockFields(blockName);
}

function hexDump(blockName) {
  const block = codeplugStore.codeplug?.getBlock(blockName);
  if (!block?.rawBinary) return null;
  const bytes = block.rawBinary;
  const lines = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const offset = i.toString(16).padStart(6, '0');
    const hexParts = [];
    let ascii = '';
    for (let j = 0; j < 16; j++) {
      if (i + j < bytes.length) {
        hexParts.push(bytes[i + j].toString(16).padStart(2, '0'));
        const c = bytes[i + j];
        ascii += (c >= 0x20 && c <= 0x7E) ? String.fromCharCode(c) : '.';
      } else {
        hexParts.push('  ');
        ascii += ' ';
      }
    }
    const hex = hexParts.slice(0, 8).join(' ') + '  ' + hexParts.slice(8).join(' ');
    lines.push({ offset, hex, ascii });
  }
  return lines;
}
</script>

<template>
  <div v-if="codeplugStore.isLoaded" class="raw-page">
    <div class="raw-header">
      <h2>Block Inspector</h2>
      <span class="badge accent">{{ blocks.length }} block{{ blocks.length !== 1 ? 's' : '' }}</span>
    </div>

    <div class="blocks-list">
      <div
        v-for="b in blocks"
        :key="b.name"
        class="block-item"
        :class="{ expanded: isExpanded(b.name) }"
      >
        <!-- Block header row -->
        <div class="block-header" @click="toggleBlock(b.name)">
          <div class="block-header-left">
            <svg class="chevron" :class="{ open: isExpanded(b.name) }" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 4 10 8 6 12" />
            </svg>
            <span class="block-name">{{ b.name }}</span>
          </div>
          <div class="block-header-right">
            <span class="block-tag">{{ b.entryCount }} {{ b.entryCount === 1 ? 'entry' : 'entries' }}</span>
            <span v-if="b.hasRaw" class="block-tag">{{ b.rawSize }} B</span>
          </div>
        </div>

        <!-- Expanded detail -->
        <div v-if="isExpanded(b.name)" class="block-detail">
          <!-- Field entries table -->
          <div v-for="(entry, eIdx) in getBlockEntries(b.name)" :key="eIdx" class="entry-section">
            <div v-if="getBlockEntries(b.name).length > 1" class="entry-header">
              Entry {{ eIdx + 1 }}
            </div>

            <div v-if="entry.fields && Object.keys(entry.fields).length > 0" class="fields-table">
              <div class="field-row field-row-header">
                <span class="field-name-col">Field</span>
                <span class="field-value-col">Value</span>
              </div>
              <div v-for="(val, key) in entry.fields" :key="key" class="field-row">
                <span class="field-name-col">{{ getFieldLabel(key) }}</span>
                <span class="field-value-col">{{ val }}</span>
              </div>
            </div>

            <div v-else class="no-fields">No decoded fields</div>
          </div>

          <!-- Hex dump -->
          <div v-if="hexDump(b.name)" class="hex-section">
            <div class="hex-label">Raw Binary</div>
            <div class="hex-dump-wrap">
              <table class="hex-table">
                <thead>
                  <tr>
                    <th class="hex-offset-col">Offset</th>
                    <th class="hex-bytes-col">00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F</th>
                    <th class="hex-ascii-col">ASCII</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(line, li) in hexDump(b.name)" :key="li">
                    <td class="hex-offset">{{ line.offset }}</td>
                    <td class="hex-bytes">{{ line.hex }}</td>
                    <td class="hex-ascii">{{ line.ascii }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="empty-state">
    <div class="icon">&#x1F50D;</div>
    <h2>No Codeplug Loaded</h2>
    <p>Open a .cps file or read from a radio to inspect raw blocks.</p>
  </div>
</template>

<style scoped>
.raw-page {
  max-width: 1400px;
}

.raw-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.raw-header h2 {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.blocks-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.block-item {
  background: var(--bg-secondary);
}

.block-item.expanded {
  background: var(--bg-secondary);
}

.block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.1s;
  user-select: none;
}

.block-header:hover {
  background: var(--bg-tertiary);
}

.block-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.block-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chevron {
  color: var(--text-muted);
  transition: transform 0.15s ease;
  flex-shrink: 0;
}

.chevron.open {
  transform: rotate(90deg);
}

.block-name {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
}

.block-tag {
  font-size: 11px;
  color: var(--text-muted);
  background: var(--bg-primary);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-mono);
}

.block-detail {
  border-top: 1px solid var(--border);
  padding: 16px;
  background: var(--bg-primary);
}

.entry-section {
  margin-bottom: 12px;
}

.entry-section:last-child {
  margin-bottom: 0;
}

.entry-header {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

/* Custom field table (not using global <table> styles) */
.fields-table {
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.field-row {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) 2fr;
  border-bottom: 1px solid var(--border);
  font-size: 12px;
}

.field-row:last-child {
  border-bottom: none;
}

.field-row-header {
  background: var(--bg-secondary);
}

.field-row-header .field-name-col,
.field-row-header .field-value-col {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field-name-col {
  padding: 6px 12px;
  color: var(--text-secondary);
  border-right: 1px solid var(--border);
  background: var(--bg-secondary);
}

.field-value-col {
  padding: 6px 12px;
  font-family: var(--font-mono);
  color: var(--text-primary);
}

.field-row:not(.field-row-header):hover .field-value-col {
  background: var(--bg-tertiary);
}

.no-fields {
  font-size: 12px;
  color: var(--text-muted);
  padding: 12px 0;
}

/* Hex dump */
.hex-section {
  margin-top: 12px;
}

.hex-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.hex-dump-wrap {
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow-x: auto;
  background: var(--bg-secondary);
}

.hex-table {
  width: auto;
  min-width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.7;
}

.hex-table thead th {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  padding: 6px 12px;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
  position: static;
}

.hex-table tbody td {
  padding: 2px 12px;
  white-space: nowrap;
  border-bottom: none;
}

.hex-table tbody tr:hover td {
  background: var(--bg-hover);
}

.hex-offset {
  color: var(--accent);
  user-select: none;
  opacity: 0.7;
}

.hex-bytes {
  color: var(--text-secondary);
  letter-spacing: 0.3px;
}

.hex-ascii {
  color: var(--text-muted);
  border-left: 1px solid var(--border);
}
</style>
