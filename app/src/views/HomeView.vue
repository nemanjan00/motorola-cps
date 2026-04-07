<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCodeplugStore } from '../stores/codeplug.js';
import { useRadioStore } from '../stores/radio.js';

const router = useRouter();
const cpStore = useCodeplugStore();
const radioStore = useRadioStore();
const dragging = ref(false);
const fileInput = ref(null);

async function handleFile(file) {
  if (!file) return;
  await cpStore.openFile(file);
  router.push('/channels');
}
async function onFileSelected(e) {
  await handleFile(e.target.files?.[0]);
  e.target.value = '';
}
function onDrop(e) {
  dragging.value = false;
  handleFile(e.dataTransfer?.files?.[0]);
}
async function onConnect() { await radioStore.connect(); }
async function onRead() {
  const cp = await radioStore.readCodeplug();
  if (cp) {
    cpStore.loadCodeplug(cp, radioStore.radioInfo?.model + '.cps');
    router.push('/channels');
  }
}
async function onWrite() {
  if (cpStore.codeplug) await radioStore.writeCodeplug(cpStore.codeplug);
}
</script>

<template>
  <div class="home">
    <div class="hero">
      <div class="hero-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="56" height="56">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="9" y1="18" x2="15" y2="18" />
          <circle cx="12" cy="9" r="3" />
          <line x1="12" y1="6" x2="12" y2="3" />
        </svg>
      </div>
      <h1>Motorola CPS</h1>
      <p>Open-source programming for Commercial Series radios</p>
    </div>

    <div class="cards">
      <div class="home-card" @click="fileInput?.click()" @drop.prevent="onDrop"
           @dragover.prevent="dragging = true" @dragleave="dragging = false"
           :class="{ 'drag-active': dragging }">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <polyline points="9 15 12 12 15 15" />
          </svg>
        </div>
        <h3>Open File</h3>
        <p>Drop a <code>.cps</code> file or click to browse</p>
        <span class="card-hint">ELP_ELM &amp; S5T formats</span>
        <input ref="fileInput" type="file" accept=".cps" style="display:none" @change="onFileSelected" @click.stop>
        <div v-if="cpStore.loading" class="card-status">Loading...</div>
      </div>

      <div class="home-card" :class="{ disabled: !radioStore.webSerialSupported }">
        <div class="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
            <path d="M6 4h15v2H6zM6 11h15v2H6zM6 18h15v2H6z" />
            <circle cx="3" cy="5" r="1.5" fill="currentColor" />
            <circle cx="3" cy="12" r="1.5" fill="currentColor" />
            <circle cx="3" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <template v-if="radioStore.webSerialSupported">
          <h3>Serial Port</h3>

          <template v-if="!radioStore.connected">
            <p>Connect a radio via ESBEP serial</p>
            <button class="connect-btn" :disabled="radioStore.connecting" @click.stop="onConnect">
              <span v-if="radioStore.connecting" class="status-dot connecting"></span>
              <span v-else class="status-dot disconnected"></span>
              {{ radioStore.connecting ? 'Connecting...' : 'Connect' }}
            </button>
          </template>

          <template v-else>
            <div class="radio-badge" v-if="radioStore.radioInfo">
              <span class="status-dot connected"></span>
              <strong>{{ radioStore.radioInfo.model }}</strong>
              <span class="text-muted text-xs">{{ radioStore.radioInfo.format }}</span>
            </div>
            <div class="card-actions">
              <button class="primary" @click.stop="onRead">Read</button>
              <button :disabled="!cpStore.isLoaded" @click.stop="onWrite">Write</button>
              <button class="danger" @click.stop="radioStore.disconnect()">Disconnect</button>
            </div>
          </template>

          <div v-if="radioStore.error" class="card-error">{{ radioStore.error }}</div>
        </template>
        <template v-else>
          <h3>Serial Port</h3>
          <p class="text-muted">Requires Chrome or Edge 89+</p>
        </template>
      </div>
    </div>

    <div v-if="cpStore.isLoaded" class="loaded-banner" @click="router.push('/channels')">
      <span class="status-dot connected"></span>
      <span><strong>{{ cpStore.modelNumber || cpStore.fileName }}</strong> loaded — {{ cpStore.channels.length }} channels</span>
      <span class="badge accent">{{ cpStore.format }}</span>
      <span v-if="cpStore.hasErrors" class="badge error">{{ cpStore.errorCount }} errors</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="9 18 15 12 9 6" /></svg>
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
  gap: 32px;
}
.hero { text-align: center; }
.hero-icon { color: var(--accent); margin-bottom: 12px; opacity: 0.8; }
.hero h1 { font-size: 32px; font-weight: 800; letter-spacing: -1px; margin-bottom: 4px; }
.hero p { color: var(--text-muted); font-size: 15px; }
.cards { display: flex; gap: 20px; max-width: 640px; width: 100%; }
.home-card {
  flex: 1;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 28px 24px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.1s;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.home-card:hover { border-color: var(--border-light); background: var(--bg-tertiary); }
.home-card:active { transform: scale(0.99); }
.home-card.drag-active { border-color: var(--accent); background: var(--bg-active); }
.home-card.disabled { opacity: 0.5; cursor: not-allowed; }
.card-icon { color: var(--accent); opacity: 0.9; }
.home-card h3 { font-size: 16px; font-weight: 700; }
.home-card p { font-size: 13px; color: var(--text-secondary); margin: 0; }
.home-card code { background: var(--bg-tertiary); padding: 1px 5px; border-radius: 3px; font-size: 12px; }
.card-hint { font-size: 11px; color: var(--text-muted); }
.card-status { font-size: 12px; color: var(--accent); }
.card-error { font-size: 12px; color: var(--error); margin-top: 4px; }
.card-actions { display: flex; gap: 6px; margin-top: 4px; }
.card-actions button { flex: 1; font-size: 12px; padding: 6px 10px; }
.connect-btn {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-tertiary); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 8px 14px;
  color: var(--text-primary); cursor: pointer; font-size: 13px;
  transition: background 0.15s;
}
.connect-btn:hover { background: var(--bg-hover); }
.radio-badge {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-primary); border-radius: var(--radius);
  padding: 8px 12px; font-size: 13px;
}
.loaded-banner {
  display: flex; align-items: center; gap: 10px;
  background: var(--bg-secondary); border: 1px solid var(--border);
  border-radius: 10px; padding: 12px 20px;
  cursor: pointer; transition: border-color 0.15s;
  max-width: 640px; width: 100;
}
.loaded-banner:hover { border-color: var(--accent); }
@media (max-width: 640px) { .cards { flex-direction: column; } }
</style>
