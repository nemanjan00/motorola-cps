<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCodeplugStore } from '../stores/codeplug.js';
import { useRadioStore } from '../stores/radio.js';

const router = useRouter();
const codeplugStore = useCodeplugStore();
const radioStore = useRadioStore();

const dragging = ref(false);
const fileInput = ref(null);

function triggerFileInput() {
  fileInput.value?.click();
}

async function handleFile(file) {
  if (!file) return;
  await codeplugStore.openFile(file);
  router.push('/channels');
}

async function onFileSelected(event) {
  const file = event.target.files?.[0];
  await handleFile(file);
  event.target.value = '';
}

function onDrop(event) {
  dragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  handleFile(file);
}

function onDragOver() {
  dragging.value = true;
}

function onDragLeave() {
  dragging.value = false;
}

async function onConnect() {
  await radioStore.connect();
}

async function onRead() {
  const codeplug = await radioStore.readCodeplug();
  if (codeplug) {
    codeplugStore.codeplug = codeplug;
    codeplugStore.fileName = radioStore.radioInfo?.model || 'radio';
    codeplugStore.dirty = false;
    codeplugStore.validate();
    router.push('/channels');
  }
}

async function onWrite() {
  if (!codeplugStore.codeplug) return;
  await radioStore.writeCodeplug(codeplugStore.codeplug);
}
</script>

<template>
  <div class="home">
    <div class="home-hero">
      <h1 class="home-title">Motorola CPS</h1>
      <p class="text-muted">Commercial Series Radio Programming</p>
    </div>

    <div class="home-cards">
      <!-- Open Codeplug File -->
      <div class="card home-card">
        <h3>Open Codeplug File</h3>
        <p class="text-muted text-sm mb-2">Load a .cps codeplug file to view and edit radio configuration.</p>

        <div
          class="drop-zone"
          :class="{ active: dragging }"
          @click="triggerFileInput"
          @drop.prevent="onDrop"
          @dragover.prevent="onDragOver"
          @dragleave="onDragLeave"
        >
          <div class="drop-zone-icon">&#x1F4C1;</div>
          <div class="drop-zone-text">Drop .cps file here or click to browse</div>
          <div class="text-muted text-xs">Supports ELP_ELM and S5T codeplug formats</div>
        </div>

        <input
          ref="fileInput"
          type="file"
          accept=".cps"
          style="display: none"
          @change="onFileSelected"
        />

        <div v-if="codeplugStore.loading" class="mt-2 text-muted text-sm">Loading...</div>
      </div>

      <!-- Connect to Radio -->
      <div class="card home-card">
        <h3>Connect to Radio</h3>

        <template v-if="radioStore.webSerialSupported">
          <p class="text-muted text-sm mb-2">Connect via serial port to read or write the radio codeplug.</p>

          <div v-if="!radioStore.connected" class="flex flex-col gap-2">
            <button
              class="primary"
              :disabled="radioStore.connecting"
              @click="onConnect"
            >
              {{ radioStore.connecting ? 'Connecting...' : 'Connect' }}
            </button>
          </div>

          <div v-else class="flex flex-col gap-3">
            <!-- Radio Info -->
            <div v-if="radioStore.radioInfo" class="radio-info-mini">
              <div class="flex items-center gap-2 mb-2">
                <span class="status-dot connected"></span>
                <span class="fw-600">{{ radioStore.radioInfo.model }}</span>
              </div>
              <div class="text-sm text-muted">
                Serial: {{ radioStore.radioInfo.serial || 'N/A' }}<br />
                Firmware: {{ radioStore.radioInfo.firmware || 'N/A' }}<br />
                Format: {{ radioStore.radioInfo.format }}
              </div>
            </div>

            <!-- Read / Write -->
            <div class="flex gap-2">
              <button class="primary" @click="onRead">Read from Radio</button>
              <button
                :disabled="!codeplugStore.isLoaded"
                @click="onWrite"
              >Write to Radio</button>
            </div>

            <button class="danger" @click="radioStore.disconnect()">Disconnect</button>
          </div>

          <div v-if="radioStore.error" class="mt-2 text-error text-sm">
            {{ radioStore.error }}
          </div>
        </template>

        <template v-else>
          <div class="webserial-notice">
            <p class="text-muted text-sm">WebSerial API is not available in this browser.</p>
            <p class="text-muted text-xs mt-2">WebSerial requires Chrome/Edge 89+</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 40px 24px;
}

.home-hero {
  text-align: center;
  margin-bottom: 40px;
}

.home-title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 4px;
}

.home-cards {
  display: flex;
  gap: 24px;
  max-width: 720px;
  width: 100%;
}

.home-card {
  flex: 1;
  min-width: 0;
}

.drop-zone {
  border: 2px dashed var(--border);
  border-radius: var(--radius);
  padding: 32px 16px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.drop-zone:hover {
  border-color: var(--border-light);
  background: var(--bg-tertiary);
}

.drop-zone.active {
  border-color: var(--accent);
  background: var(--bg-active);
}

.drop-zone-icon {
  font-size: 32px;
  margin-bottom: 8px;
  opacity: 0.6;
}

.drop-zone-text {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.radio-info-mini {
  background: var(--bg-tertiary);
  border-radius: var(--radius);
  padding: 12px;
}

.webserial-notice {
  background: var(--bg-tertiary);
  border-radius: var(--radius);
  padding: 24px 16px;
  text-align: center;
}

@media (max-width: 640px) {
  .home-cards {
    flex-direction: column;
  }
}
</style>
