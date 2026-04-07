<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCodeplugStore } from '../stores/codeplug.js';
import { useRadioStore } from '../stores/radio.js';

const route = useRoute();
const codeplugStore = useCodeplugStore();
const radioStore = useRadioStore();

const pageTitle = computed(() => {
  const name = route.name;
  if (!name) return 'Motorola CPS';
  return name.charAt(0).toUpperCase() + name.slice(1);
});

const errorCount = computed(() =>
  codeplugStore.validationResults.filter((r) => r.level === 'error').length,
);

const warningCount = computed(() =>
  codeplugStore.validationResults.filter((r) => r.level === 'warning').length,
);

const connectionStatus = computed(() => {
  if (radioStore.connecting) return 'connecting';
  if (radioStore.connected) return 'connected';
  return 'disconnected';
});

const modelString = computed(() => {
  if (!radioStore.radioInfo) return null;
  return radioStore.radioInfo.model || radioStore.radioInfo.modelNumber || 'Unknown Radio';
});
</script>

<template>
  <header class="main-header">
    <h1 style="font-size: 16px; font-weight: 600;">{{ pageTitle }}</h1>

    <div class="flex items-center gap-3">
      <!-- Validation badge -->
      <template v-if="codeplugStore.isLoaded">
        <span v-if="errorCount > 0" class="badge error">
          {{ errorCount }} error{{ errorCount !== 1 ? 's' : '' }}
        </span>
        <span v-else-if="warningCount > 0" class="badge" style="background: #d2992222; color: var(--warning);">
          {{ warningCount }} warning{{ warningCount !== 1 ? 's' : '' }}
        </span>
        <span v-else class="badge success">Valid</span>
      </template>

      <!-- Connection status -->
      <div class="flex items-center gap-1">
        <span
          class="status-dot"
          :class="connectionStatus"
        ></span>
        <span v-if="modelString" class="text-sm">{{ modelString }}</span>
      </div>
    </div>
  </header>
</template>
