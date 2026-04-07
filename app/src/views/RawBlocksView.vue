<script setup>
import { ref, computed } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import { getBlockFields, getFieldDef } from 'motorola-cps';

const codeplugStore = useCodeplugStore();
const expandedBlock = ref(null);

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
  expandedBlock.value = expandedBlock.value === name ? null : name;
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
    lines.push(`${offset}  ${hex}  |${ascii}|`);
  }
  return lines.join('\n');
}
</script>

<template>
  <div v-if="codeplugStore.isLoaded">
    <div class="flex items-center gap-2 mb-2">
      <span class="badge accent">{{ blocks.length }} block{{ blocks.length !== 1 ? 's' : '' }}</span>
    </div>

    <div class="blocks-list flex-col gap-1">
      <div
        v-for="b in blocks"
        :key="b.name"
        class="block-item"
      >
        <!-- Block header row -->
        <div
          class="block-header flex items-center justify-between"
          @click="toggleBlock(b.name)"
        >
          <div class="flex items-center gap-2">
            <span class="expand-icon text-mono">{{ expandedBlock === b.name ? '-' : '+' }}</span>
            <span class="fw-600 text-sm">{{ b.name }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="badge">{{ b.entryCount }} {{ b.entryCount === 1 ? 'entry' : 'entries' }}</span>
            <span v-if="b.hasRaw" class="badge">{{ b.rawSize }}B raw</span>
          </div>
        </div>

        <!-- Expanded detail -->
        <div v-if="expandedBlock === b.name" class="block-detail">
          <!-- Field entries table -->
          <div v-for="(entry, eIdx) in getBlockEntries(b.name)" :key="eIdx" class="mb-2">
            <div v-if="getBlockEntries(b.name).length > 1" class="text-xs text-muted mb-2">
              Entry {{ eIdx + 1 }}
            </div>

            <table v-if="entry.fields && Object.keys(entry.fields).length > 0" class="text-sm">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(val, key) in entry.fields" :key="key">
                  <td class="text-muted">{{ getFieldLabel(key) }}</td>
                  <td class="text-mono">{{ val }}</td>
                </tr>
              </tbody>
            </table>

            <div v-else class="text-muted text-sm p-3">No decoded fields.</div>
          </div>

          <!-- Hex dump -->
          <div v-if="hexDump(b.name)" class="hex-dump-section mt-2">
            <div class="text-xs text-muted fw-600 mb-2" style="text-transform: uppercase; letter-spacing: 0.5px;">
              Raw Binary
            </div>
            <pre class="hex-dump text-mono text-xs">{{ hexDump(b.name) }}</pre>
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
.block-item {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.block-header {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.1s;
}

.block-header:hover {
  background: var(--bg-tertiary);
}

.expand-icon {
  width: 14px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
}

.block-detail {
  padding: 0 12px 12px;
  border-top: 1px solid var(--border);
}

.hex-dump-section {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px;
  overflow-x: auto;
}

.hex-dump {
  margin: 0;
  white-space: pre;
  line-height: 1.6;
  color: var(--text-secondary);
}
</style>
