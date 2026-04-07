<script setup>
import { computed, ref } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import { getBlockFields, getFieldDef } from 'motorola-cps';
import FieldEditor from '../components/FieldEditor.vue';

const cpStore = useCodeplugStore();
const expandedBlock = ref(null);

const BLOCK_LABELS = {
  RC_BLOCK: 'General Settings',
  DR_BLOCK: 'Dynamic Radio',
  AC_BLOCK: 'Accessories',
  CB_BLOCK: 'Buttons (Mobile)',
  CBP_BLOCK: 'Buttons (Portable)',
  SC_BLOCK: 'Signaling',
  MDC_BLOCK: 'MDC1200',
  MDCC_BLOCK: 'MDC Call',
  QC_BLOCK: 'Quik-Call II',
  QCC_BLOCK: 'Quik-Call II Call',
  DTMF_BLOCK: 'DTMF',
  DTMFC_BLOCK: 'DTMF Call',
  EM_BLOCK: 'Emergency',
  EMDC_BLOCK: 'Emergency MDC',
  MENU_BLOCK: 'Menu Configuration',
  OT_BLOCK: 'One-Touch',
  PS_BLOCK: 'Phone System',
  SLI_BLOCK: 'Scan Lists',
  AUXC_BLOCK: 'Auxiliary',
  OBC_BLOCK: 'Option Board',
  RI_BLOCK: 'Radio Information',
  MDF_BLOCK: 'Model Definition',
  TI_BLOCK: 'Tool Information',
  // S5T
  S5_RADIO_OPTION_BLOCK: 'Radio Options',
  S5_RADIO_INFO_BLOCK: 'Radio Information',
  S5_DYNAMIC_RADIO_BLOCK: 'Dynamic Radio',
  S5_EMERGENCY_BLOCK: 'Emergency',
  S5_CONTACT_LIST_BLOCK: 'Contact List',
  S5_MULTICALL_CFG_BLOCK: 'Multicall Config',
  S5_SEL5_SIG_SYS_LIST_BLOCK: 'Select-5 Signaling',
  S5_DTMF_SIG_SYS_LIST_BLOCK: 'DTMF Signaling',
  S5_SCAN_LIST_BLOCK: 'Scan Lists',
  S5_PERSONALITY_LIST_BLOCK: 'Personalities',
  S5_BUTTON_DEFINITION_BLOCK: 'Buttons',
  S5_ALERT_BLOCK: 'Alerts',
  S5_GENERAL_IO_BLOCK: 'I/O Configuration',
  S5_USER_COMMENT_BLOCK: 'User Comments',
};

const EXCLUDED = new Set([
  'CP_BLOCK', 'S5_CHANNEL_LIST_BLOCK', 'S5_ALPHANUM_CH_ALIAS_BLOCK',
  'VECT_BLOCK', 'TC_BLOCK', 'RRW_BLOCK',
  'S5_CFG_BLOCK', 'S5_TYPE_CONTROL_BLOCK', 'S5_VECTOR_BLOCK',
  'PA_BLOCK', 'ZA_BLOCK', 'PNA_BLOCK', 'PN_BLOCK',
  'CPA_BLOCK', 'SLA_BLOCK', 'MDCA_BLOCK', 'QCA_BLOCK', 'DTMFA_BLOCK',
  'PSA_BLOCK', 'LGA_BLOCK', 'LUIDA_BLOCK', 'LSA_BLOCK', 'LRA_BLOCK',
  'MDCST_BLOCK', 'MDCM_BLOCK', 'DVS_BLOCK', 'CHD_BLOCK', 'CS_BLOCK',
  'LUID_BLOCK', 'LG_BLOCK', 'LRF_BLOCK', 'LS_BLOCK',
  'S5_DR_BLOCK_STATUS', 'S5_V_USER_COMMENT_BLOCK_VEC',
  'S5_RADIO_FEATURE_DEFINITION_BLOCK',
]);

const groups = computed(() => {
  if (!cpStore.codeplug) return [];
  return cpStore.codeplug.listBlocks()
    .filter(bn => !EXCLUDED.has(bn))
    .map(bn => {
      const fields = getBlockFields(bn).filter(f => {
        const d = getFieldDef(f);
        return d && d.inputType;
      });
      if (!fields.length) return null;
      const block = cpStore.codeplug.getBlock(bn);
      return {
        blockName: bn,
        label: BLOCK_LABELS[bn] || bn.replace(/_BLOCK$/, '').replace(/^S5_/, '').replace(/_/g, ' '),
        fields,
        entryCount: block?.entries?.length || 1,
      };
    })
    .filter(Boolean);
});

function toggle(bn) {
  expandedBlock.value = expandedBlock.value === bn ? null : bn;
}
</script>

<template>
  <div v-if="cpStore.isLoaded">
    <h2 style="font-size:18px; font-weight:700; margin-bottom:20px; letter-spacing:-0.3px">Configuration</h2>

    <div class="config-list">
      <div v-for="g in groups" :key="g.blockName" class="config-block">
        <div class="config-block-header" @click="toggle(g.blockName)"
             :class="{ active: expandedBlock === g.blockName }">
          <div class="flex items-center gap-3">
            <svg :class="{ rotated: expandedBlock === g.blockName }" class="chevron"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
            <span class="config-block-title">{{ g.label }}</span>
            <span class="badge">{{ g.fields.length }} fields</span>
          </div>
        </div>

        <div v-if="expandedBlock === g.blockName" class="config-block-body">
          <template v-for="ei in g.entryCount" :key="ei">
            <div v-if="g.entryCount > 1" class="text-sm text-muted mb-2 mt-4 fw-600">
              Entry {{ ei }}
            </div>
            <div class="field-grid">
              <FieldEditor
                v-for="fn in g.fields" :key="fn"
                :blockName="g.blockName"
                :fieldName="fn"
                :entryIndex="ei - 1"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="empty-state">
    <div class="icon">&#x2699;</div>
    <h2>No Codeplug Loaded</h2>
    <p class="text-muted">Open a file or read from radio to edit configuration</p>
  </div>
</template>

<style scoped>
.config-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 960px;
}
.config-block {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.config-block-header {
  padding: 14px 20px;
  cursor: pointer;
  transition: background 0.1s;
  user-select: none;
}
.config-block-header:hover { background: var(--bg-tertiary); }
.config-block-header.active { background: var(--bg-tertiary); }
.config-block-title { font-weight: 600; font-size: 14px; }
.chevron { transition: transform 0.2s; color: var(--text-muted); flex-shrink: 0; }
.chevron.rotated { transform: rotate(90deg); }
.config-block-body {
  padding: 8px 20px 24px;
  border-top: 1px solid var(--border);
}
.field-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
</style>
