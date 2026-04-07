<script setup>
import { computed } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import { useRadioStore } from '../stores/radio.js';
import { decodePartNumber } from 'motorola-cps';

const codeplugStore = useCodeplugStore();
const radioStore = useRadioStore();

const info = computed(() => {
  const items = [];

  // From radio (live connection)
  const ri = radioStore.radioInfo;
  if (ri) {
    items.push({ label: 'Model', value: ri.model });
    items.push({ label: 'Serial Number', value: ri.serial || 'N/A' });
    items.push({ label: 'Firmware Version', value: ri.firmware || 'N/A' });
    items.push({ label: 'Codeplug Version', value: ri.cpVersion || 'N/A' });
    items.push({ label: 'Codeplug Size', value: ri.cpSize ? `${ri.cpSize} bytes` : 'N/A' });
    items.push({ label: 'Format', value: ri.format || 'N/A' });
    if (ri.region) items.push({ label: 'Region', value: ri.region });
  }

  // From codeplug (file)
  if (codeplugStore.codeplug) {
    const cp = codeplugStore.codeplug;

    if (!ri) {
      const modelNum = cp.getModelNumber();
      if (modelNum) items.push({ label: 'Model', value: modelNum });

      const serial = cp.getSerialNumber();
      if (serial) items.push({ label: 'Serial Number', value: serial });

      items.push({ label: 'Format', value: cp.format });
    }

    // RI_BLOCK fields
    const riBlock = cp.getBlock('RI_BLOCK') || cp.getBlock('S5_RADIO_INFO_BLOCK');
    if (riBlock?.entries?.[0]) {
      const fields = riBlock.entries[0].fields;
      if (!fields) return items;
      for (const [key, val] of Object.entries(fields)) {
        // Skip fields already covered
        if (key.includes('MODEL') || key.includes('SERIAL')) continue;
        if (val === undefined || val === '') continue;
        const label = key
          .replace(/^(RI_|S5_RI_)/, '')
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        items.push({ label, value: String(val) });
      }
    }

    // TI_BLOCK fields
    const tiBlock = cp.getBlock('TI_BLOCK') || cp.getBlock('S5_TONE_INFO_BLOCK');
    if (tiBlock?.entries?.[0]) {
      const fields = tiBlock.entries[0].fields;
      if (!fields) return items;
      for (const [key, val] of Object.entries(fields)) {
        if (val === undefined || val === '') continue;
        const label = key
          .replace(/^(TI_|S5_TI_)/, '')
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        items.push({ label, value: String(val) });
      }
    }

    items.push({ label: 'Channel Count', value: String(cp.getChannelCount()) });
  }

  return items;
});

const partNumberDecoded = computed(() => {
  if (!codeplugStore.codeplug) return null;
  const cp = codeplugStore.codeplug;
  const riBlock = cp.getBlock('RI_BLOCK') || cp.getBlock('S5_RADIO_INFO_BLOCK');
  if (!riBlock?.entries?.[0]?.fields) return null;
  const fields = riBlock.entries[0].fields;
  const pn = fields.RI_MODELNUM || fields.S5_RI_MODELNUM;
  if (!pn) return null;
  try {
    return decodePartNumber(pn);
  } catch {
    return null;
  }
});

const lastProgrammed = computed(() => {
  if (codeplugStore.codeplug) {
    const cp = codeplugStore.codeplug;
    const riBlock = cp.getBlock('RI_BLOCK') || cp.getBlock('S5_RADIO_INFO_BLOCK');
    if (riBlock?.entries?.[0]?.fields) {
      const fields = riBlock.entries[0].fields;
      return fields.RI_ORIGDATE || fields.S5_RI_PROG_DATE || null;
    }
  }
  return null;
});
</script>

<template>
  <div v-if="codeplugStore.isLoaded || radioStore.radioInfo">
    <div class="info-container">
      <div class="card">
        <h3>Radio Information</h3>

        <div class="info-grid">
          <div v-for="(item, idx) in info" :key="idx" class="info-row">
            <span class="info-label">{{ item.label }}</span>
            <span class="info-value text-mono">{{ item.value }}</span>
          </div>

          <div v-if="lastProgrammed" class="info-row">
            <span class="info-label">Last Programmed</span>
            <span class="info-value text-mono">{{ lastProgrammed }}</span>
          </div>
        </div>
      </div>

      <!-- Decoded Part Number -->
      <div v-if="partNumberDecoded" class="card mt-4">
        <h3>Decoded Part Number</h3>
        <div class="info-grid">
          <div v-for="(val, key) in partNumberDecoded" :key="key" class="info-row">
            <span class="info-label">{{ key }}</span>
            <span class="info-value text-mono">{{ val }}</span>
          </div>
        </div>
      </div>

      <!-- File info -->
      <div v-if="codeplugStore.fileName" class="card mt-4">
        <h3>File</h3>
        <div class="info-grid">
          <div class="info-row">
            <span class="info-label">Filename</span>
            <span class="info-value text-mono">{{ codeplugStore.fileName }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Modified</span>
            <span class="info-value">
              <span v-if="codeplugStore.dirty" class="text-warning">Yes</span>
              <span v-else class="text-muted">No</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="empty-state">
    <div class="icon">&#x1F4E1;</div>
    <h2>No Radio Information</h2>
    <p>Open a codeplug file or connect to a radio to see information.</p>
  </div>
</template>

<style scoped>
.info-container {
  max-width: 600px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 160px;
}

.info-value {
  font-size: 13px;
  color: var(--text-primary);
  text-align: right;
}
</style>
