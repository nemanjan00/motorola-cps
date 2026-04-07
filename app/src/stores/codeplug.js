import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  decodeCps, encodeCps, parseCodeplugXml, serializeCodeplugXml,
  validateCodeplug, getFieldDef, getBlockFields, decodePartNumber,
} from 'motorola-cps';

export const useCodeplugStore = defineStore('codeplug', () => {
  // State
  const codeplug = ref(null);
  const fileName = ref(null);
  const dirty = ref(false);
  const validationResults = ref([]);
  const loading = ref(false);

  // Getters
  const isLoaded = computed(() => codeplug.value !== null);

  const format = computed(() => codeplug.value?.format ?? null);

  const channels = computed(() => {
    if (!codeplug.value) return [];
    const fmt = codeplug.value.format;
    const blockName = fmt === 'S5T' ? 'S5_CHANNEL_LIST_BLOCK' : 'CP_BLOCK';
    return codeplug.value.getBlock(blockName)?.entries ?? [];
  });

  const modelInfo = computed(() => {
    if (!codeplug.value) return null;
    try {
      const riBlock = codeplug.value.getBlock('RI_BLOCK');
      if (!riBlock) return null;
      const partNumber = riBlock.entries?.[0]?.RI_PART_NUMBER
        ?? riBlock.entries?.[0]?.RI_MODEL;
      if (!partNumber) return null;
      return decodePartNumber(partNumber);
    } catch {
      return null;
    }
  });

  const hasErrors = computed(() =>
    validationResults.value.some((r) => r.level === 'error'),
  );

  const hasWarnings = computed(() =>
    validationResults.value.some((r) => r.level === 'warning'),
  );

  // Actions
  async function openFile(file) {
    loading.value = true;
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const xml = decodeCps(bytes);
      const cp = parseCodeplugXml(xml);
      codeplug.value = cp;
      fileName.value = file.name;
      dirty.value = false;
      validate();
    } finally {
      loading.value = false;
    }
  }

  function saveFile() {
    if (!codeplug.value) return;
    const xml = serializeCodeplugXml(codeplug.value);
    const bytes = encodeCps(xml);
    const blob = new Blob([bytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.value || 'codeplug.cps';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    dirty.value = false;
  }

  function setField(blockName, fieldName, value, entryIndex = 0) {
    if (!codeplug.value) return;
    codeplug.value.setField(blockName, fieldName, value, entryIndex);
    dirty.value = true;
    validate();
  }

  function addChannel() {
    if (!codeplug.value) return;
    const fmt = codeplug.value.format;
    const blockName = fmt === 'S5T' ? 'S5_CHANNEL_LIST_BLOCK' : 'CP_BLOCK';
    const block = codeplug.value.getBlock(blockName);
    if (!block) return;
    const fields = getBlockFields(blockName);
    const entry = {};
    for (const f of fields) {
      const def = getFieldDef(f);
      entry[f] = def?.default ?? '';
    }
    block.entries.push(entry);
    dirty.value = true;
    validate();
  }

  function removeChannel(index) {
    if (!codeplug.value) return;
    const fmt = codeplug.value.format;
    const blockName = fmt === 'S5T' ? 'S5_CHANNEL_LIST_BLOCK' : 'CP_BLOCK';
    const block = codeplug.value.getBlock(blockName);
    if (!block || index < 0 || index >= block.entries.length) return;
    block.entries.splice(index, 1);
    dirty.value = true;
    validate();
  }

  function validate() {
    if (!codeplug.value) {
      validationResults.value = [];
      return;
    }
    try {
      validationResults.value = validateCodeplug(codeplug.value);
    } catch {
      validationResults.value = [];
    }
  }

  function closeFile() {
    codeplug.value = null;
    fileName.value = null;
    dirty.value = false;
    validationResults.value = [];
    loading.value = false;
  }

  return {
    // State
    codeplug,
    fileName,
    dirty,
    validationResults,
    loading,
    // Getters
    isLoaded,
    format,
    channels,
    modelInfo,
    hasErrors,
    hasWarnings,
    // Actions
    openFile,
    saveFile,
    setField,
    addChannel,
    removeChannel,
    validate,
    closeFile,
  };
});
