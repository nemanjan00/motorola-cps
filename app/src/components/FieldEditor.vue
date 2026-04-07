<script setup>
import { computed } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import { getFieldDef } from 'motorola-cps';

const props = defineProps({
  blockName: { type: String, required: true },
  fieldName: { type: String, required: true },
  entryIndex: { type: Number, default: 0 },
});

const codeplugStore = useCodeplugStore();

const fieldDef = computed(() => getFieldDef(props.fieldName));
const label = computed(() => fieldDef.value?.label || props.fieldName);
const inputType = computed(() => fieldDef.value?.inputType || 'string');
const enumValues = computed(() => fieldDef.value?.enumValues || []);
const help = computed(() => fieldDef.value?.help || null);

const value = computed(() => {
  if (!codeplugStore.codeplug) return '';
  return codeplugStore.codeplug.getField(props.blockName, props.fieldName, props.entryIndex) ?? '';
});

function isChecked(val) {
  const v = String(val).toLowerCase();
  return v === 'on' || v === 'true' || v === '1' || v === 'yes';
}

function onChange(newValue) {
  codeplugStore.setField(props.blockName, props.fieldName, newValue, props.entryIndex);
}

function onInput(event) {
  onChange(event.target.value);
}

function onCheckbox(event) {
  onChange(event.target.checked ? '1' : '0');
}
</script>

<template>
  <div class="field-editor" :title="help || undefined">
    <!-- Boolean -->
    <label v-if="inputType === 'boolean'" class="field-check">
      <input
        type="checkbox"
        :checked="isChecked(value)"
        @change="onCheckbox"
      />
      <span>{{ label }}</span>
    </label>

    <!-- Enum -->
    <template v-else-if="inputType === 'enum'">
      <label class="field-label">{{ label }}</label>
      <select :value="value" @change="onInput">
        <option v-if="!enumValues.includes(value)" :value="value">{{ value }}</option>
        <option v-for="opt in enumValues" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </template>

    <!-- Frequency -->
    <template v-else-if="inputType === 'frequency'">
      <label class="field-label">{{ label }}</label>
      <input type="number" step="0.00025" :value="value" @change="onInput" />
    </template>

    <!-- Integer -->
    <template v-else-if="inputType === 'integer'">
      <label class="field-label">{{ label }}</label>
      <input type="number" step="1" :value="value" @change="onInput" />
    </template>

    <!-- Float -->
    <template v-else-if="inputType === 'float'">
      <label class="field-label">{{ label }}</label>
      <input type="number" step="0.01" :value="value" @change="onInput" />
    </template>

    <!-- Password -->
    <template v-else-if="inputType === 'password'">
      <label class="field-label">{{ label }}</label>
      <input type="password" :value="value" @change="onInput" />
    </template>

    <!-- String (default) -->
    <template v-else>
      <label class="field-label">{{ label }}</label>
      <input type="text" :value="value" @change="onInput" />
    </template>
  </div>
</template>

<style scoped>
.field-editor {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.field-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.field-check {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 0;
}

.field-check input {
  margin: 0;
}

.field-editor input,
.field-editor select {
  width: 100%;
}
</style>
