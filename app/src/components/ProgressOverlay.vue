<script setup>
import { computed } from 'vue';
import { useRadioStore } from '../stores/radio.js';

const radioStore = useRadioStore();

const visible = computed(() => radioStore.progress !== null);

const label = computed(() => {
  // Determine label from context - if writing, show write; default to reading
  return 'Communicating with radio...';
});

const percentage = computed(() => {
  if (!radioStore.progress) return 0;
  const { current, total } = radioStore.progress;
  if (!total || total === 0) return 0;
  return Math.min(100, Math.round((current / total) * 100));
});

const progressText = computed(() => {
  if (!radioStore.progress) return '';
  const { current, total } = radioStore.progress;
  if (!total) return '';
  return `${current} / ${total} bytes`;
});
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="overlay">
      <div class="modal" style="text-align: center;">
        <h3 style="margin-bottom: 16px;">{{ label }}</h3>

        <div class="progress-bar" style="height: 6px; margin-bottom: 12px;">
          <div
            class="progress-bar-fill"
            :style="{ width: percentage + '%' }"
          ></div>
        </div>

        <div class="text-sm text-muted">
          {{ percentage }}%
          <span v-if="progressText"> &mdash; {{ progressText }}</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
