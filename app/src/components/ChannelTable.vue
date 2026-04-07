<script setup>
import { computed } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import { getFieldDef } from 'motorola-cps';

const props = defineProps({
  selectedIndices: { type: Set, default: () => new Set() },
});
const emit = defineEmits(['update:selectedIndices']);
const store = useCodeplugStore();

const blockName = computed(() => store.channelBlockName);

// Use the ACTUAL XML field names from the codeplug
const columns = computed(() => {
  if (store.format === 'S5T') {
    // S5T has different field names — TODO: map these when S5T editing is implemented
    return [
      { label: 'Alias', field: 'S5_ACA_ALPHANUM_CH_ALIAS', type: 'text' },
    ];
  }
  return [
    { label: 'Alias',     field: 'ALIAS',             type: 'text', width: '120px' },
    { label: 'RX Freq',   field: 'CP_RXFREQ',         type: 'frequency', width: '130px' },
    { label: 'TX Freq',   field: 'CP_TXFREQ',         type: 'frequency', width: '130px' },
    { label: 'Power',     field: 'CP_TXPWRLEVSEL',    type: 'enum', width: '90px' },
    { label: 'BW (kHz)',  field: 'CP_CHBWSEL',         type: 'enum', width: '90px' },
    { label: 'TOT (s)',   field: 'CP_TOT',            type: 'number', width: '80px' },
    { label: 'Squelch',   field: 'CP_SQSET',          type: 'enum', width: '100px' },
    { label: 'TX SQ',     field: 'CP_TXSQCODESEL',    type: 'enum', width: '80px' },
    { label: 'RX Only',   field: 'CP_RXONLY',          type: 'boolean' },
    { label: 'VOX',       field: 'CP_VOXEN',          type: 'boolean' },
    { label: 'T/A',       field: 'CP_TALKAROUNDEN',    type: 'boolean' },
    { label: 'Scan',      field: 'CP_AUTOSCANEN',      type: 'boolean' },
  ];
});

function getValue(idx, field) {
  return store.channels[idx]?.fields?.[field] ?? '';
}

function setValue(idx, field, val) {
  store.setField(blockName.value, field, val, idx);
}

function getEnumOpts(field) {
  const def = getFieldDef(field);
  return def?.enumValues ?? [];
}

function toggleSel(idx) {
  const s = new Set(props.selectedIndices);
  s.has(idx) ? s.delete(idx) : s.add(idx);
  emit('update:selectedIndices', s);
}

function isChecked(val) {
  return val === '1' || val === 'true' || val === 'True';
}

function fmtFreq(val) {
  const n = parseFloat(val);
  return isNaN(n) ? val : n.toFixed(4);
}
</script>

<template>
  <div class="ch-table-wrap">
    <table v-if="store.channels.length > 0">
      <thead>
        <tr>
          <th class="col-check"></th>
          <th class="col-num">#</th>
          <th v-for="col in columns" :key="col.field" :style="col.width ? { minWidth: col.width } : {}">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, idx) in store.channels" :key="idx"
            :class="{ selected: selectedIndices.has(idx) }">
          <td class="col-check">
            <input type="checkbox" :checked="selectedIndices.has(idx)" @change="toggleSel(idx)">
          </td>
          <td class="col-num text-muted text-mono">{{ idx + 1 }}</td>

          <td v-for="col in columns" :key="col.field">
            <input v-if="col.type === 'text'"
              type="text" maxlength="8" spellcheck="false"
              :value="getValue(idx, col.field)"
              @change="setValue(idx, col.field, $event.target.value)">

            <input v-else-if="col.type === 'frequency'"
              type="text" inputmode="decimal" class="freq-input"
              :value="fmtFreq(getValue(idx, col.field))"
              @change="setValue(idx, col.field, $event.target.value)">

            <select v-else-if="col.type === 'enum'"
              :value="getValue(idx, col.field)"
              @change="setValue(idx, col.field, $event.target.value)">
              <option v-for="opt in getEnumOpts(col.field)" :key="opt" :value="opt">{{ opt }}</option>
              <!-- Show current value even if not in enum list -->
              <option v-if="getValue(idx, col.field) && !getEnumOpts(col.field).includes(getValue(idx, col.field))"
                :value="getValue(idx, col.field)">{{ getValue(idx, col.field) }}</option>
            </select>

            <input v-else-if="col.type === 'number'"
              type="number"
              :value="getValue(idx, col.field)"
              @change="setValue(idx, col.field, $event.target.value)">

            <input v-else-if="col.type === 'boolean'"
              type="checkbox"
              :checked="isChecked(getValue(idx, col.field))"
              @change="setValue(idx, col.field, $event.target.checked ? '1' : '0')">
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="empty-state">
      <div class="icon">📻</div>
      <h2>No Channels</h2>
      <p class="text-muted">Add a channel to get started</p>
    </div>
  </div>
</template>

<style scoped>
.ch-table-wrap {
  flex: 1;
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-secondary);
}

.ch-table-wrap table {
  width: 100%;
}

.col-check { width: 36px; text-align: center; }
.col-num { width: 40px; text-align: center; }

tr.selected td { background: var(--bg-active) !important; }

td input[type="text"],
td .freq-input {
  width: 100%;
  font-family: var(--font-mono);
  font-size: 12px;
}
td input[type="number"] {
  width: 100%;
  font-family: var(--font-mono);
  font-size: 12px;
}
td select { width: 100%; font-size: 12px; }
td input[type="checkbox"] { width: auto; }
.freq-input { text-align: right; }
</style>
