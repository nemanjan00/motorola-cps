import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  decodeCps, encodeCps, parseCodeplugXml, serializeCodeplugXml,
  validateCodeplug, getFieldDef, getBlockFields, decodePartNumber,
} from 'motorola-cps';

export const useCodeplugStore = defineStore('codeplug', () => {
  const codeplug = ref(null);
  const fileName = ref(null);
  const dirty = ref(false);
  const validationResults = ref([]);
  const loading = ref(false);

  const isLoaded = computed(() => codeplug.value !== null);
  const format = computed(() => codeplug.value?.format ?? null);

  const channels = computed(() => {
    if (!codeplug.value) return [];
    const blockName = codeplug.value.format === 'S5T' ? 'S5_CHANNEL_LIST_BLOCK' : 'CP_BLOCK';
    return codeplug.value.getBlock(blockName)?.entries ?? [];
  });

  const channelBlockName = computed(() =>
    codeplug.value?.format === 'S5T' ? 'S5_CHANNEL_LIST_BLOCK' : 'CP_BLOCK'
  );

  const modelNumber = computed(() => {
    if (!codeplug.value) return null;
    return codeplug.value.getModelNumber() || null;
  });

  const modelInfo = computed(() => {
    const mn = modelNumber.value;
    if (!mn) return null;
    try { return decodePartNumber(mn); } catch { return null; }
  });

  const bandInfo = computed(() => {
    if (!codeplug.value) return null;
    const ri = codeplug.value.getBlock('RI_BLOCK');
    if (!ri?.entries[0]) return null;
    const f = ri.entries[0].fields;
    return {
      min: f.RI_BANDMINFREQ,
      max: f.RI_BANDMAXFREQ,
      band: f.RI_BANDSEL,
    };
  });

  const hasErrors = computed(() =>
    validationResults.value.some(r => r.severity === 'error')
  );
  const hasWarnings = computed(() =>
    validationResults.value.some(r => r.severity === 'warning')
  );
  const errorCount = computed(() =>
    validationResults.value.filter(r => r.severity === 'error').length
  );
  const warningCount = computed(() =>
    validationResults.value.filter(r => r.severity === 'warning').length
  );

  async function openFile(file) {
    loading.value = true;
    try {
      const buffer = await file.arrayBuffer();
      const xml = decodeCps(new Uint8Array(buffer));
      codeplug.value = parseCodeplugXml(xml);
      fileName.value = file.name;
      dirty.value = false;
      validate();
    } finally {
      loading.value = false;
    }
  }

  function loadCodeplug(cp, name) {
    codeplug.value = cp;
    fileName.value = name || 'radio.cps';
    dirty.value = false;
    validate();
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

  function getField(blockName, fieldName, entryIndex = 0) {
    if (!codeplug.value) return undefined;
    return codeplug.value.getField(blockName, fieldName, entryIndex);
  }

  function addChannel() {
    if (!codeplug.value) return;
    const block = codeplug.value.getBlock(channelBlockName.value);
    if (!block) return;
    // Copy defaults from first channel if exists, else empty
    const template = block.entries[0]
      ? { ...block.entries[0].fields }
      : {};
    template.ALIAS = `Ch${block.entries.length + 1}`;
    block.entries.push({ fields: template });
    dirty.value = true;
    validate();
  }

  function removeChannel(index) {
    if (!codeplug.value) return;
    const block = codeplug.value.getBlock(channelBlockName.value);
    if (!block || index < 0 || index >= block.entries.length) return;
    block.entries.splice(index, 1);
    dirty.value = true;
    validate();
  }

  function validate() {
    if (!codeplug.value) { validationResults.value = []; return; }
    try { validationResults.value = validateCodeplug(codeplug.value); }
    catch { validationResults.value = []; }
  }

  function closeFile() {
    codeplug.value = null;
    fileName.value = null;
    dirty.value = false;
    validationResults.value = [];
  }

  return {
    codeplug, fileName, dirty, validationResults, loading,
    isLoaded, format, channels, channelBlockName, modelNumber, modelInfo, bandInfo,
    hasErrors, hasWarnings, errorCount, warningCount,
    openFile, loadCodeplug, saveFile, setField, getField,
    addChannel, removeChannel, validate, closeFile,
  };
});
