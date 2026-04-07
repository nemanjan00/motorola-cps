<script setup>
import { ref, reactive } from 'vue';
import { useRadioStore } from '../stores/radio.js';

const radioStore = useRadioStore();

// Softpots
const softpots = reactive(new Map());
const softpotIndex = ref(0);
const softpotWriteValue = ref(0);
const softpotLoading = ref(false);

// Autotune
const autotuneResult = ref(null);
const autotuneRunning = ref(false);

// Test mode
const testModeActive = ref(false);
const testModeLoading = ref(false);

// Error display
const tunerError = ref(null);

async function readSoftpot(index) {
  tunerError.value = null;
  softpotLoading.value = true;
  try {
    const value = await radioStore.readSoftpot(index);
    softpots.set(index, value);
  } catch (e) {
    tunerError.value = e.message;
  } finally {
    softpotLoading.value = false;
  }
}

async function writeSoftpot(index, value) {
  tunerError.value = null;
  softpotLoading.value = true;
  try {
    await radioStore.writeSoftpot(index, value);
    softpots.set(index, value);
  } catch (e) {
    tunerError.value = e.message;
  } finally {
    softpotLoading.value = false;
  }
}

async function readAllSoftpots() {
  tunerError.value = null;
  softpotLoading.value = true;
  try {
    const result = await radioStore.readAllSoftpots();
    for (const [k, v] of result) {
      softpots.set(k, v);
    }
  } catch (e) {
    tunerError.value = e.message;
  } finally {
    softpotLoading.value = false;
  }
}

async function runAutotune() {
  tunerError.value = null;
  autotuneRunning.value = true;
  autotuneResult.value = null;
  try {
    const data = await radioStore.startAutotune();
    autotuneResult.value = data
      ? Array.from(data).map((b) => b.toString(16).padStart(2, '0')).join(' ')
      : 'Complete (no data returned)';
  } catch (e) {
    tunerError.value = e.message;
  } finally {
    autotuneRunning.value = false;
  }
}

async function toggleTestMode() {
  tunerError.value = null;
  testModeLoading.value = true;
  try {
    if (testModeActive.value) {
      await radioStore.exitTestMode();
      testModeActive.value = false;
    } else {
      await radioStore.enterTestMode();
      testModeActive.value = true;
    }
  } catch (e) {
    tunerError.value = e.message;
  } finally {
    testModeLoading.value = false;
  }
}

function softpotEntries() {
  return [...softpots.entries()].sort((a, b) => a[0] - b[0]);
}
</script>

<template>
  <div v-if="radioStore.connected">
    <div v-if="tunerError" class="card mb-2" style="border-color: var(--error);">
      <p class="text-error text-sm">{{ tunerError }}</p>
    </div>

    <div class="tuner-sections flex-col gap-4">
      <!-- Softpots -->
      <div class="card">
        <h3>Softpots</h3>
        <p class="text-muted text-sm mb-2">Read and write individual softpot tuning values.</p>

        <div class="flex items-center gap-2 mb-2">
          <button class="primary" :disabled="softpotLoading" @click="readAllSoftpots">
            Read All
          </button>
        </div>

        <!-- Single softpot read/write -->
        <div class="flex items-center gap-2 mb-2">
          <label class="text-sm text-muted">Index:</label>
          <input type="number" v-model.number="softpotIndex" min="0" style="width: 60px;" />
          <button :disabled="softpotLoading" @click="readSoftpot(softpotIndex)">Read</button>
          <label class="text-sm text-muted">Value:</label>
          <input type="number" v-model.number="softpotWriteValue" style="width: 80px;" />
          <button :disabled="softpotLoading" @click="writeSoftpot(softpotIndex, softpotWriteValue)">Write</button>
        </div>

        <!-- Softpot table -->
        <table v-if="softpots.size > 0">
          <thead>
            <tr>
              <th>Index</th>
              <th>Value</th>
              <th>Hex</th>
              <th style="width: 140px;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="[idx, val] in softpotEntries()" :key="idx">
              <td class="text-mono">{{ idx }}</td>
              <td class="text-mono">{{ val }}</td>
              <td class="text-mono text-muted">0x{{ val.toString(16).padStart(4, '0').toUpperCase() }}</td>
              <td>
                <div class="flex gap-1">
                  <button class="text-xs" @click="readSoftpot(idx)">Read</button>
                  <button class="text-xs" @click="writeSoftpot(idx, val)">Write</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Autotune -->
      <div class="card">
        <h3>Autotune</h3>
        <p class="text-muted text-sm mb-2">Run the radio's auto-tune alignment sequence.</p>

        <button
          class="primary"
          :disabled="autotuneRunning"
          @click="runAutotune"
        >
          {{ autotuneRunning ? 'Running...' : 'Start Autotune' }}
        </button>

        <div v-if="autotuneResult" class="mt-2">
          <span class="text-sm text-muted">Result: </span>
          <span class="text-mono text-sm">{{ autotuneResult }}</span>
        </div>
      </div>

      <!-- Test Mode -->
      <div class="card">
        <h3>Test Mode</h3>
        <p class="text-muted text-sm mb-2">Enter or exit radio test mode for RF measurements.</p>

        <div class="flex items-center gap-3">
          <button
            :class="testModeActive ? 'danger' : 'primary'"
            :disabled="testModeLoading"
            @click="toggleTestMode"
          >
            {{ testModeLoading ? 'Working...' : (testModeActive ? 'Exit Test Mode' : 'Enter Test Mode') }}
          </button>

          <div class="flex items-center gap-1">
            <span
              class="status-dot"
              :class="testModeActive ? 'connected' : 'disconnected'"
            ></span>
            <span class="text-sm text-muted">
              {{ testModeActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="empty-state">
    <div class="icon">&#x1F527;</div>
    <h2>Not Connected</h2>
    <p>Connect to a radio to use tuner functions.</p>
  </div>
</template>

<style scoped>
.tuner-sections {
  max-width: 700px;
}
</style>
