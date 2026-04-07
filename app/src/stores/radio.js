import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  createWebSerialTransport, ESBEPSession, RadioSession, TunerSession,
} from 'motorola-cps';

export const useRadioStore = defineStore('radio', () => {
  // Public state
  const connected = ref(false);
  const connecting = ref(false);
  const radioInfo = ref(null);
  const progress = ref(null);
  const error = ref(null);

  // Private refs (not exposed)
  let transport = null;
  let esbep = null;
  let radioSession = null;
  let tunerSession = null;

  // Getters
  const webSerialSupported = computed(() => 'serial' in navigator);

  // Actions
  async function connect() {
    if (!webSerialSupported.value) {
      error.value = 'WebSerial is not supported in this browser';
      return;
    }
    connecting.value = true;
    error.value = null;
    try {
      const port = await navigator.serial.requestPort();
      transport = await createWebSerialTransport(port);
      esbep = new ESBEPSession(transport);
      radioSession = new RadioSession(esbep);
      tunerSession = new TunerSession(esbep);
      const info = await radioSession.identify();
      radioInfo.value = info;
      connected.value = true;
    } catch (err) {
      error.value = err.message || 'Failed to connect';
      await cleanup();
    } finally {
      connecting.value = false;
    }
  }

  async function disconnect() {
    error.value = null;
    await cleanup();
  }

  async function cleanup() {
    try {
      if (transport && typeof transport.close === 'function') {
        await transport.close();
      }
    } catch { /* ignore */ }
    transport = null;
    esbep = null;
    radioSession = null;
    tunerSession = null;
    connected.value = false;
    radioInfo.value = null;
    progress.value = null;
  }

  async function readCodeplug() {
    if (!radioSession) throw new Error('Not connected');
    error.value = null;
    progress.value = { current: 0, total: 0 };
    try {
      const codeplug = await radioSession.readCodeplug(radioInfo.value, (current, total) => {
        progress.value = { current, total };
      });
      progress.value = null;
      return codeplug;
    } catch (err) {
      error.value = err.message || 'Read failed';
      progress.value = null;
      throw err;
    }
  }

  async function writeCodeplug(codeplug) {
    if (!radioSession) throw new Error('Not connected');
    error.value = null;
    progress.value = { current: 0, total: 0 };
    try {
      await radioSession.writeCodeplug(codeplug, (current, total) => {
        progress.value = { current, total };
      });
      progress.value = null;
    } catch (err) {
      error.value = err.message || 'Write failed';
      progress.value = null;
      throw err;
    }
  }

  async function readSoftpot(index) {
    if (!tunerSession) throw new Error('Not connected');
    return tunerSession.readSoftpot(index);
  }

  async function writeSoftpot(index, value) {
    if (!tunerSession) throw new Error('Not connected');
    return tunerSession.writeSoftpot(index, value);
  }

  async function readAllSoftpots() {
    if (!tunerSession) throw new Error('Not connected');
    return tunerSession.readAllSoftpots();
  }

  async function startAutotune() {
    if (!tunerSession) throw new Error('Not connected');
    return tunerSession.startAutotune();
  }

  async function enterTestMode() {
    if (!tunerSession) throw new Error('Not connected');
    return tunerSession.enterTestMode();
  }

  async function exitTestMode() {
    if (!tunerSession) throw new Error('Not connected');
    return tunerSession.exitTestMode();
  }

  return {
    // State
    connected,
    connecting,
    radioInfo,
    progress,
    error,
    // Getters
    webSerialSupported,
    // Actions
    connect,
    disconnect,
    readCodeplug,
    writeCodeplug,
    readSoftpot,
    writeSoftpot,
    readAllSoftpots,
    startAutotune,
    enterTestMode,
    exitTestMode,
  };
});
