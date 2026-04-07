<script setup>
import { useCodeplugStore } from './stores/codeplug.js';
import { useRadioStore } from './stores/radio.js';
import ProgressOverlay from './components/ProgressOverlay.vue';
import { ref } from 'vue';

const cpStore = useCodeplugStore();
const radioStore = useRadioStore();
const fileInput = ref(null);

async function openFile(e) {
  const file = e.target.files?.[0];
  if (file) await cpStore.openFile(file);
  e.target.value = '';
}
</script>

<template>
  <div class="topbar">
    <div class="topbar-brand">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
        <rect x="6" y="2" width="12" height="20" rx="2"/>
        <circle cx="12" cy="9" r="2.5"/>
        <line x1="12" y1="6.5" x2="12" y2="3.5"/>
        <line x1="9" y1="17" x2="15" y2="17"/>
      </svg>
      Motorola CPS
    </div>

    <nav class="topbar-nav">
      <router-link to="/">Home</router-link>
      <template v-if="cpStore.isLoaded">
        <router-link to="/channels">Channels</router-link>
        <router-link to="/config">Config</router-link>
        <router-link to="/info">Info</router-link>
        <router-link to="/raw">Raw</router-link>
      </template>
      <router-link v-if="radioStore.connected" to="/tuner">Tuner</router-link>
    </nav>

    <div class="topbar-actions">
      <input ref="fileInput" type="file" accept=".cps" style="display:none" @change="openFile">
      <button @click="fileInput?.click()">Open</button>
      <button v-if="cpStore.isLoaded" @click="cpStore.saveFile()">Save</button>

      <div class="topbar-divider"></div>

      <template v-if="radioStore.webSerialSupported">
        <button v-if="!radioStore.connected" @click="radioStore.connect()" :disabled="radioStore.connecting">
          <span class="status-dot" :class="radioStore.connecting ? 'connecting' : 'disconnected'" style="margin-right:5px"></span>
          {{ radioStore.connecting ? 'Connecting...' : 'Connect' }}
        </button>
        <template v-else>
          <span class="badge success" style="gap:5px">
            <span class="status-dot connected"></span>
            {{ radioStore.radioInfo?.model || 'Connected' }}
          </span>
          <button class="danger" @click="radioStore.disconnect()">Disconnect</button>
        </template>
      </template>

      <template v-if="cpStore.isLoaded">
        <div class="topbar-divider"></div>
        <span class="badge accent">{{ cpStore.format }}</span>
        <span v-if="cpStore.dirty" class="badge warning">Modified</span>
        <span v-if="cpStore.errorCount > 0" class="badge error">{{ cpStore.errorCount }} errors</span>
        <span v-else class="badge success">Valid</span>
      </template>
    </div>
  </div>

  <div class="main-content">
    <div class="main-body">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>

  <ProgressOverlay />
</template>
