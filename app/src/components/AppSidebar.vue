<script setup>
import { ref } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import { useRadioStore } from '../stores/radio.js';

const codeplugStore = useCodeplugStore();
const radioStore = useRadioStore();
const fileInput = ref(null);

function triggerOpen() {
  fileInput.value?.click();
}

async function onFileSelected(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  await codeplugStore.openFile(file);
  event.target.value = '';
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">Motorola CPS</div>

    <div class="sidebar-section">File</div>
    <nav>
      <input
        ref="fileInput"
        type="file"
        accept=".cps,.cpg"
        style="display: none"
        @change="onFileSelected"
      />
      <a href="#" @click.prevent="triggerOpen">Open</a>
      <a
        href="#"
        :class="{ disabled: !codeplugStore.isLoaded }"
        @click.prevent="codeplugStore.isLoaded && codeplugStore.saveFile()"
      >Save</a>
      <a
        v-if="codeplugStore.isLoaded"
        href="#"
        @click.prevent="codeplugStore.closeFile()"
      >Close</a>
    </nav>

    <template v-if="codeplugStore.isLoaded">
      <div class="sidebar-section">Navigation</div>
      <nav>
        <router-link to="/channels">Channels</router-link>
        <router-link to="/config">Config</router-link>
        <router-link to="/info">Info</router-link>
        <router-link to="/raw">Raw Blocks</router-link>
      </nav>
    </template>

    <div class="sidebar-section">Radio</div>
    <nav>
      <a
        v-if="radioStore.webSerialSupported && !radioStore.connected"
        href="#"
        @click.prevent="radioStore.connect()"
        :class="{ disabled: radioStore.connecting }"
      >
        {{ radioStore.connecting ? 'Connecting...' : 'Connect' }}
      </a>
      <a
        v-if="radioStore.connected"
        href="#"
        @click.prevent="radioStore.disconnect()"
      >Disconnect</a>
      <router-link v-if="radioStore.connected" to="/tuner">Tuner</router-link>
      <span v-if="!radioStore.webSerialSupported" class="text-muted text-sm" style="padding: 7px 12px;">
        WebSerial not available
      </span>
    </nav>

    <div class="sidebar-footer">
      <template v-if="codeplugStore.isLoaded">
        <span class="badge accent">{{ codeplugStore.format }}</span>
        <span v-if="codeplugStore.dirty" class="text-warning" style="margin-left: 6px;">Modified</span>
      </template>
      <template v-else>
        <span class="text-muted">No file loaded</span>
      </template>
    </div>
  </aside>
</template>

<style scoped>
a.disabled {
  opacity: 0.4;
  pointer-events: none;
}
</style>
