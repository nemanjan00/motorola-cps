<script setup>
import { computed, ref } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import { getFieldDef } from 'motorola-cps';

const props = defineProps({
  blockName: { type: String, required: true },
  fieldName: { type: String, required: true },
  entryIndex: { type: Number, default: 0 },
});

const store = useCodeplugStore();
const showHelp = ref(false);

const fd = computed(() => getFieldDef(props.fieldName));
const label = computed(() => fd.value?.label || props.fieldName);
const inputType = computed(() => fd.value?.inputType || 'string');
const enumValues = computed(() => fd.value?.enumValues || []);
const help = computed(() => fd.value?.help || null);

const value = computed(() =>
  store.codeplug?.getField(props.blockName, props.fieldName, props.entryIndex) ?? ''
);

function isChecked(v) { return v === '1' || v === 'true'; }
function set(v) { store.setField(props.blockName, props.fieldName, v, props.entryIndex); }
function onInput(e) { set(e.target.value); }
function onCheck(e) { set(e.target.checked ? '1' : '0'); }
</script>

<template>
  <!-- Boolean: compact pill toggle -->
  <label v-if="inputType === 'boolean'" class="toggle-pill" :class="{ on: isChecked(value) }">
    <input type="checkbox" :checked="isChecked(value)" @change="onCheck">
    <span class="toggle-label">{{ label }}</span>
    <button v-if="help" class="help-btn" @click.prevent.stop="showHelp = !showHelp" tabindex="-1">?</button>
  </label>

  <!-- All other types -->
  <div v-else class="field-editor">
    <div class="field-header">
      <label class="field-label">{{ label }}</label>
      <button v-if="help" class="help-btn" @click.stop="showHelp = !showHelp" tabindex="-1">?</button>
    </div>

    <select v-if="inputType === 'enum'" :value="value" @change="onInput">
      <option v-if="value && !enumValues.includes(value)" :value="value">{{ value }}</option>
      <option v-for="opt in enumValues" :key="opt" :value="opt">{{ opt }}</option>
    </select>

    <input v-else-if="inputType === 'frequency'" type="number" step="0.00025" :value="value" @change="onInput">
    <input v-else-if="inputType === 'integer'" type="number" step="1" :value="value" @change="onInput">
    <input v-else-if="inputType === 'float'" type="number" step="0.1" :value="value" @change="onInput">
    <input v-else-if="inputType === 'password'" type="password" :value="value" @change="onInput">
    <input v-else type="text" :value="value" @change="onInput">

    <!-- Help popover -->
    <div v-if="showHelp && help" class="help-popover" @click="showHelp = false">
      <div class="help-title">{{ label }}</div>
      <div class="help-body">{{ help }}</div>
    </div>
  </div>

  <!-- Help popover for booleans -->
  <div v-if="inputType === 'boolean' && showHelp && help" class="help-popover" @click="showHelp = false">
    <div class="help-title">{{ label }}</div>
    <div class="help-body">{{ help }}</div>
  </div>
</template>

<style scoped>
/* ---- Boolean pill ---- */
.toggle-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  color: var(--text-muted);
  transition: all 0.15s;
  white-space: nowrap;
  user-select: none;
}
.toggle-pill:hover { border-color: var(--border-light); color: var(--text-secondary); }
.toggle-pill.on {
  background: var(--accent-glow);
  border-color: var(--accent);
  color: var(--accent);
}
.toggle-pill input { display: none; }

/* ---- Labeled field ---- */
.field-editor {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
  padding: 6px 0;
  position: relative;
}
.field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}
.field-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.2px;
}
.field-editor input,
.field-editor select { width: 100%; }

/* ---- Help button ---- */
.help-btn {
  width: 16px; height: 16px;
  border-radius: 50%;
  font-size: 10px; font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: all 0.15s;
}
.help-btn:hover { background: var(--accent-glow); color: var(--accent); border-color: var(--accent); }

/* ---- Help popover ---- */
.help-popover {
  position: relative;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  padding: 12px 14px;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-secondary);
  cursor: pointer;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}
.help-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
  font-size: 12px;
}
.help-body { white-space: pre-wrap; }
</style>
