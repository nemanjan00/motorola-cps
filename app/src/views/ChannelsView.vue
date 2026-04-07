<script setup>
import { ref, computed } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import ChannelTable from '../components/ChannelTable.vue';
import ValidationPanel from '../components/ValidationPanel.vue';

const codeplugStore = useCodeplugStore();
const selectedIndices = ref(new Set());

const channelCount = computed(() => codeplugStore.channels.length);

function addChannel() {
  codeplugStore.addChannel();
}

function removeSelected() {
  // Remove in reverse order so indices stay valid
  const sorted = [...selectedIndices.value].sort((a, b) => b - a);
  for (const idx of sorted) {
    codeplugStore.removeChannel(idx);
  }
  selectedIndices.value = new Set();
}
</script>

<template>
  <div v-if="codeplugStore.isLoaded" class="channels-page">
    <!-- Toolbar -->
    <div class="channels-toolbar">
      <div class="flex items-center gap-2">
        <button class="primary" @click="addChannel">Add Channel</button>
        <button
          class="danger"
          :disabled="selectedIndices.size === 0"
          @click="removeSelected"
        >Remove Selected</button>
      </div>
      <span class="badge accent">{{ channelCount }} channel{{ channelCount !== 1 ? 's' : '' }}</span>
    </div>

    <!-- Validation warnings inline -->
    <ValidationPanel />

    <!-- Channel table -->
    <ChannelTable
      :selectedIndices="selectedIndices"
      @update:selectedIndices="selectedIndices = $event"
    />
  </div>

  <div v-else class="empty-state">
    <div class="icon">&#x1F4FB;</div>
    <h2>No Codeplug Loaded</h2>
    <p>Open a .cps file or read from a radio to begin editing channels.</p>
  </div>
</template>

<style scoped>
.channels-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.channels-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-shrink: 0;
}
</style>
