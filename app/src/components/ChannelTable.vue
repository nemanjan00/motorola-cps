<script setup>
import { computed } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import { getFieldDef } from 'motorola-cps';

const props = defineProps({
  selectedIndices: { type: Set, default: () => new Set() },
});

const emit = defineEmits(['update:selectedIndices']);

const codeplugStore = useCodeplugStore();

const blockName = computed(() => {
  return codeplugStore.format === 'S5T' ? 'S5_CHANNEL_LIST_BLOCK' : 'CP_BLOCK';
});

const channels = computed(() => codeplugStore.channels);

// Column definitions with field mappings
const columns = computed(() => {
  const isS5T = codeplugStore.format === 'S5T';
  return [
    { key: 'alias', label: 'Alias', field: isS5T ? 'S5_CP_ALIAS' : 'CP_ALIAS', type: 'text' },
    { key: 'rxFreq', label: 'RX Freq', field: isS5T ? 'S5_CP_RXFREQ' : 'CP_RXFREQ', type: 'frequency' },
    { key: 'txFreq', label: 'TX Freq', field: isS5T ? 'S5_CP_TXFREQ' : 'CP_TXFREQ', type: 'frequency' },
    { key: 'power', label: 'Power', field: isS5T ? 'S5_CP_POWER' : 'CP_POWER', type: 'enum' },
    { key: 'bw', label: 'BW', field: isS5T ? 'S5_CP_BANDWIDTH' : 'CP_BANDWIDTH', type: 'enum' },
    { key: 'tot', label: 'TOT', field: isS5T ? 'S5_CP_TOT' : 'CP_TOT', type: 'number' },
    { key: 'rxOnly', label: 'RX Only', field: isS5T ? 'S5_CP_RXONLY' : 'CP_RXONLY', type: 'boolean' },
    { key: 'vox', label: 'VOX', field: isS5T ? 'S5_CP_VOX' : 'CP_VOX', type: 'boolean' },
    { key: 'talkaround', label: 'T/A', field: isS5T ? 'S5_CP_TALKAROUND' : 'CP_TALKAROUND', type: 'boolean' },
    { key: 'scan', label: 'Scan', field: isS5T ? 'S5_CP_SCAN' : 'CP_SCANADD', type: 'boolean' },
  ];
});

function getFieldValue(entryIndex, fieldName) {
  if (!codeplugStore.codeplug) return '';
  return codeplugStore.codeplug.getField(blockName.value, fieldName, entryIndex) ?? '';
}

function setFieldValue(entryIndex, fieldName, value) {
  codeplugStore.setField(blockName.value, fieldName, value, entryIndex);
}

function getEnumOptions(fieldName) {
  const def = getFieldDef(fieldName);
  return def?.enumValues ?? [];
}

function toggleSelected(index) {
  const next = new Set(props.selectedIndices);
  if (next.has(index)) {
    next.delete(index);
  } else {
    next.add(index);
  }
  emit('update:selectedIndices', next);
}

function formatFreq(val) {
  const n = parseFloat(val);
  if (isNaN(n)) return val;
  return n.toFixed(5);
}

function onFreqChange(entryIndex, fieldName, event) {
  const val = event.target.value;
  setFieldValue(entryIndex, fieldName, val);
}

function onTextChange(entryIndex, fieldName, event) {
  setFieldValue(entryIndex, fieldName, event.target.value);
}

function onSelectChange(entryIndex, fieldName, event) {
  setFieldValue(entryIndex, fieldName, event.target.value);
}

function onCheckboxChange(entryIndex, fieldName, event) {
  setFieldValue(entryIndex, fieldName, event.target.checked ? 'On' : 'Off');
}

function isChecked(value) {
  const v = String(value).toLowerCase();
  return v === 'on' || v === 'true' || v === '1' || v === 'yes';
}
</script>

<template>
  <div class="channel-table-wrap overflow-auto">
    <table v-if="channels.length > 0">
      <thead>
        <tr>
          <th style="width: 30px;"></th>
          <th style="width: 40px;">#</th>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, idx) in channels" :key="idx">
          <td>
            <input
              type="checkbox"
              :checked="selectedIndices.has(idx)"
              @change="toggleSelected(idx)"
            />
          </td>
          <td class="text-muted text-mono">{{ idx + 1 }}</td>

          <td v-for="col in columns" :key="col.key">
            <!-- Text (Alias) -->
            <input
              v-if="col.type === 'text'"
              type="text"
              maxlength="8"
              :value="getFieldValue(idx, col.field)"
              @change="onTextChange(idx, col.field, $event)"
            />

            <!-- Frequency -->
            <input
              v-else-if="col.type === 'frequency'"
              type="number"
              step="0.00025"
              :value="formatFreq(getFieldValue(idx, col.field))"
              @change="onFreqChange(idx, col.field, $event)"
            />

            <!-- Enum (Power, BW) -->
            <select
              v-else-if="col.type === 'enum'"
              :value="getFieldValue(idx, col.field)"
              @change="onSelectChange(idx, col.field, $event)"
            >
              <option
                v-for="opt in getEnumOptions(col.field)"
                :key="opt"
                :value="opt"
              >{{ opt }}</option>
            </select>

            <!-- Number (TOT) -->
            <input
              v-else-if="col.type === 'number'"
              type="number"
              :value="getFieldValue(idx, col.field)"
              @change="onTextChange(idx, col.field, $event)"
            />

            <!-- Boolean (checkboxes) -->
            <input
              v-else-if="col.type === 'boolean'"
              type="checkbox"
              :checked="isChecked(getFieldValue(idx, col.field))"
              @change="onCheckboxChange(idx, col.field, $event)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="empty-state">
      <div class="icon">&#x1F4FB;</div>
      <h2>No Channels</h2>
      <p>Add a channel to get started.</p>
    </div>
  </div>
</template>

<style scoped>
.channel-table-wrap {
  max-height: calc(100vh - 180px);
}

td input[type="checkbox"] {
  width: auto;
}

td input[type="text"] {
  width: 80px;
}

td input[type="number"] {
  width: 100px;
}

td select {
  min-width: 70px;
}
</style>
