<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCodeplugStore } from '../stores/codeplug.js';
import { useRadioStore } from '../stores/radio.js';

const route = useRoute();
const cpStore = useCodeplugStore();
const radioStore = useRadioStore();

const pageTitle = computed(() => {
  const titles = { home: 'Home', channels: 'Channels', config: 'Configuration', info: 'Radio Info', tuner: 'Tuner', raw: 'Raw Blocks' };
  return titles[route.name] || 'Motorola CPS';
});
const connStatus = computed(() => radioStore.connecting ? 'connecting' : radioStore.connected ? 'connected' : 'disconnected');
</script>

<template>
  <header class="main-header">
    <h1 style="font-size: 15px; font-weight: 600; letter-spacing: -0.3px;">{{ pageTitle }}</h1>
    <div class="flex items-center gap-3">
      <template v-if="cpStore.isLoaded">
        <span v-if="cpStore.errorCount > 0" class="badge error">{{ cpStore.errorCount }} errors</span>
        <span v-else-if="cpStore.warningCount > 0" class="badge" style="background:#d2992222;color:var(--warning)">{{ cpStore.warningCount }} warnings</span>
        <span v-else class="badge success">Valid</span>
      </template>
      <div class="flex items-center gap-1">
        <span class="status-dot" :class="connStatus"></span>
        <span v-if="radioStore.radioInfo" class="text-sm">{{ radioStore.radioInfo.model }}</span>
      </div>
    </div>
  </header>
</template>
