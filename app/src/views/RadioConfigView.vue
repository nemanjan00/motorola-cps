<script setup>
import { computed } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import { getBlockFields, getFieldDef, getBlocksForFormat } from 'motorola-cps';
import FieldEditor from '../components/FieldEditor.vue';

const codeplugStore = useCodeplugStore();

// Block display name mapping
const BLOCK_LABELS = {
  RC_BLOCK: 'General Settings',
  DR_BLOCK: 'Dynamic Radio',
  AC_BLOCK: 'Accessories',
  RI_BLOCK: 'Radio Info',
  MDF_BLOCK: 'Model Definition',
  TI_BLOCK: 'Tone Info',
  CALL_BLOCK: 'Call List',
  SC_BLOCK: 'Scan List',
  EM_BLOCK: 'Emergency',
  CBM_BLOCK: 'Button Map',
  MDC_BLOCK: 'MDC1200',
  DTMF_BLOCK: 'DTMF',
  S5_RADIO_CONFIG_BLOCK: 'General Settings',
  S5_DYNAMIC_RADIO_BLOCK: 'Dynamic Radio',
  S5_RADIO_INFO_BLOCK: 'Radio Info',
  S5_TONE_INFO_BLOCK: 'Tone Info',
  S5_SCAN_LIST_BLOCK: 'Scan List',
  S5_EMERGENCY_BLOCK: 'Emergency',
};

// Blocks to exclude from config view (shown elsewhere)
const EXCLUDED_BLOCKS = new Set([
  'CP_BLOCK',
  'S5_CHANNEL_LIST_BLOCK',
  'VECT_BLOCK',
  'TC_BLOCK',
  'RRW_BLOCK',
  'S5_CFG_BLOCK',
  'S5_TYPE_CONTROL_BLOCK',
  'S5_VECTOR_BLOCK',
]);

const configGroups = computed(() => {
  if (!codeplugStore.codeplug) return [];

  const presentBlocks = codeplugStore.codeplug.listBlocks();
  const groups = [];

  for (const blockName of presentBlocks) {
    if (EXCLUDED_BLOCKS.has(blockName)) continue;

    const fields = getBlockFields(blockName);
    if (fields.length === 0) continue;

    // Filter to fields that have actual definitions
    const validFields = fields.filter((f) => {
      const def = getFieldDef(f);
      return def && def.inputType !== undefined;
    });

    if (validFields.length === 0) continue;

    const block = codeplugStore.codeplug.getBlock(blockName);
    const entryCount = block?.entries?.length ?? 1;

    groups.push({
      blockName,
      label: BLOCK_LABELS[blockName] || blockName.replace(/_BLOCK$/, '').replace(/_/g, ' '),
      fields: validFields,
      entryCount,
    });
  }

  return groups;
});
</script>

<template>
  <div v-if="codeplugStore.isLoaded">
    <div v-if="configGroups.length === 0" class="empty-state">
      <div class="icon">&#x2699;</div>
      <h2>No Configuration Blocks</h2>
      <p>This codeplug has no editable configuration blocks.</p>
    </div>

    <div v-else class="config-groups flex-col gap-4">
      <div
        v-for="group in configGroups"
        :key="group.blockName"
        class="card"
      >
        <h3>{{ group.label }}</h3>

        <template v-for="entryIdx in group.entryCount" :key="entryIdx">
          <div v-if="group.entryCount > 1" class="text-sm text-muted mb-2" style="margin-top: 8px;">
            Entry {{ entryIdx }}
          </div>
          <div class="field-grid">
            <FieldEditor
              v-for="fieldName in group.fields"
              :key="fieldName"
              :blockName="group.blockName"
              :fieldName="fieldName"
              :entryIndex="entryIdx - 1"
            />
          </div>
        </template>
      </div>
    </div>
  </div>

  <div v-else class="empty-state">
    <div class="icon">&#x2699;</div>
    <h2>No Codeplug Loaded</h2>
    <p>Open a .cps file or read from a radio to edit configuration.</p>
  </div>
</template>

<style scoped>
.config-groups {
  max-width: 900px;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}
</style>
