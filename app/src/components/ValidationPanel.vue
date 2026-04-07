<script setup>
import { ref, computed } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';

const codeplugStore = useCodeplugStore();
const collapsed = ref(true);

const results = computed(() => codeplugStore.validationResults);
const hasIssues = computed(() => results.value.length > 0);

const errors = computed(() => results.value.filter((r) => r.level === 'error'));
const warnings = computed(() => results.value.filter((r) => r.level === 'warning'));

function toggle() {
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <div v-if="hasIssues" class="validation-panel mb-2">
    <div class="validation-header flex items-center gap-2" @click="toggle">
      <span class="text-mono text-sm" style="width: 14px; text-align: center;">
        {{ collapsed ? '+' : '-' }}
      </span>
      <span v-if="errors.length > 0" class="badge error">
        {{ errors.length }} error{{ errors.length !== 1 ? 's' : '' }}
      </span>
      <span v-if="warnings.length > 0" class="badge" style="background: #d2992222; color: var(--warning);">
        {{ warnings.length }} warning{{ warnings.length !== 1 ? 's' : '' }}
      </span>
    </div>

    <div v-if="!collapsed" class="validation-list">
      <div
        v-for="(item, idx) in results"
        :key="idx"
        class="validation-item"
        :class="item.level"
      >
        <span
          class="validation-dot"
          :style="{ background: item.level === 'error' ? 'var(--error)' : 'var(--warning)' }"
        ></span>
        <span class="text-sm">
          <span v-if="item.block" class="text-muted">{{ item.block }}</span>
          <span v-if="item.field" class="text-muted"> / {{ item.field }}</span>
          <span v-if="item.block || item.field"> &mdash; </span>
          {{ item.message }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.validation-panel {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.validation-header {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.1s;
}

.validation-header:hover {
  background: var(--bg-tertiary);
}

.validation-list {
  border-top: 1px solid var(--border);
  max-height: 200px;
  overflow-y: auto;
}

.validation-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--border);
}

.validation-item:last-child {
  border-bottom: none;
}

.validation-item.error {
  background: #f8514908;
}

.validation-item.warning {
  background: #d2992208;
}

.validation-dot {
  width: 6px;
  height: 6px;
  min-width: 6px;
  border-radius: 50%;
  margin-top: 6px;
}
</style>
