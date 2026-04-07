<script setup>
import { computed } from 'vue';
import { useCodeplugStore } from '../stores/codeplug.js';
import { getBlockFields, getFieldDef } from 'motorola-cps';
import FieldEditor from '../components/FieldEditor.vue';

const cpStore = useCodeplugStore();

const BLOCK_LABELS = {
  RC_BLOCK: 'General Settings', DR_BLOCK: 'Dynamic Radio', AC_BLOCK: 'Accessories',
  CB_BLOCK: 'Buttons', SC_BLOCK: 'Signaling', MDC_BLOCK: 'MDC Systems',
  MDCC_BLOCK: 'MDC Call', QC_BLOCK: 'Quik-Call II', QCC_BLOCK: 'Quik-Call II Call',
  DTMF_BLOCK: 'DTMF', DTMFC_BLOCK: 'DTMF Call', EM_BLOCK: 'Emergency',
  EMDC_BLOCK: 'Emergency MDC', MENU_BLOCK: 'Menu', OT_BLOCK: 'One-Touch',
  PS_BLOCK: 'Phone Systems', SLI_BLOCK: 'Scan Lists', AUXC_BLOCK: 'Auxiliary',
  OBC_BLOCK: 'Option Board', RI_BLOCK: 'Radio Information', MDF_BLOCK: 'Model Definition',
  TI_BLOCK: 'Tool Info', SM_BLOCK: 'Scan Members', CALL_BLOCK: 'Call List',
  S5_RADIO_OPTION_BLOCK: 'Radio Options', S5_RADIO_INFO_BLOCK: 'Radio Information',
  S5_DYNAMIC_RADIO_BLOCK: 'Dynamic Radio', S5_EMERGENCY_BLOCK: 'Emergency',
  S5_CONTACT_LIST_BLOCK: 'Contacts', S5_MULTICALL_CFG_BLOCK: 'Multicall',
  S5_SEL5_SIG_SYS_LIST_BLOCK: 'Select-5', S5_DTMF_SIG_SYS_LIST_BLOCK: 'DTMF',
  S5_SCAN_LIST_BLOCK: 'Scan Lists', S5_PERSONALITY_LIST_BLOCK: 'Personalities',
  S5_BUTTON_DEFINITION_BLOCK: 'Buttons', S5_ALERT_BLOCK: 'Alerts',
  S5_GENERAL_IO_BLOCK: 'I/O Config', S5_USER_COMMENT_BLOCK: 'Comments',
  S5_ENCODER_SEQ_LIST_BLOCK: 'Encoder Sequences', S5_SEL5_DECODER_LIST_BLOCK: 'Decoder List',
  S5_ENCODER_STATUS_LIST_BLOCK: 'Encoder Status', S5_DECODER_STATUS_LIST_BLOCK: 'Decoder Status',
  S5_AUTO_ACK_LIST_BLOCK: 'Auto Acknowledge', S5_USER_DEF_SIG_LIST_BLOCK: 'User Signaling',
  S5_OPTION_BOARD_BLOCK: 'Option Board', S5_SEL5_DTMF_ENCODER_TG_LIST_BLOCK: 'DTMF Encoder TG',
};

/* CPS-style section ordering. Blocks listed here appear in this order.
   Any remaining blocks are appended at the end. */
const SECTION_ORDER = [
  'RI_BLOCK', 'S5_RADIO_INFO_BLOCK',
  'RC_BLOCK', 'S5_RADIO_OPTION_BLOCK',
  'AC_BLOCK', 'S5_GENERAL_IO_BLOCK',
  'SC_BLOCK', 'EMDC_BLOCK', 'EM_BLOCK', 'S5_EMERGENCY_BLOCK',
  'MDC_BLOCK', 'MDCC_BLOCK', 'MDCST_BLOCK',
  'QC_BLOCK', 'QCC_BLOCK',
  'DTMF_BLOCK', 'DTMFC_BLOCK', 'S5_DTMF_SIG_SYS_LIST_BLOCK',
  'CB_BLOCK', 'S5_BUTTON_DEFINITION_BLOCK',
  'MENU_BLOCK',
  'PS_BLOCK',
  'OT_BLOCK',
  'SLI_BLOCK', 'SM_BLOCK', 'S5_SCAN_LIST_BLOCK',
  'DR_BLOCK', 'S5_DYNAMIC_RADIO_BLOCK',
  'AUXC_BLOCK', 'OBC_BLOCK', 'S5_OPTION_BOARD_BLOCK',
  'MDF_BLOCK', 'TI_BLOCK',
  'S5_ALERT_BLOCK', 'S5_USER_COMMENT_BLOCK',
  'S5_CONTACT_LIST_BLOCK', 'S5_MULTICALL_CFG_BLOCK',
  'S5_SEL5_SIG_SYS_LIST_BLOCK', 'S5_PERSONALITY_LIST_BLOCK',
  'S5_ENCODER_SEQ_LIST_BLOCK', 'S5_SEL5_DECODER_LIST_BLOCK',
  'S5_ENCODER_STATUS_LIST_BLOCK', 'S5_DECODER_STATUS_LIST_BLOCK',
  'S5_AUTO_ACK_LIST_BLOCK', 'S5_USER_DEF_SIG_LIST_BLOCK',
  'S5_SEL5_DTMF_ENCODER_TG_LIST_BLOCK',
  'CALL_BLOCK',
];

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

  const available = cpStore.codeplug.listBlocks().filter(bn => !EXCLUDED.has(bn));
  const availSet = new Set(available);

  // Build ordered list: first items from SECTION_ORDER that exist, then remainder
  const ordered = [];
  const seen = new Set();
  for (const bn of SECTION_ORDER) {
    if (availSet.has(bn) && !seen.has(bn)) {
      ordered.push(bn);
      seen.add(bn);
    }
  }
  for (const bn of available) {
    if (!seen.has(bn)) {
      ordered.push(bn);
      seen.add(bn);
    }
  }

  return ordered.map(bn => {
    const allFields = getBlockFields(bn).filter(f => {
      const d = getFieldDef(f);
      return d && d.inputType;
    });
    if (!allFields.length) return null;

    const booleans = [];
    const inputs = [];
    for (const f of allFields) {
      const d = getFieldDef(f);
      if (d.inputType === 'boolean') booleans.push(f);
      else inputs.push(f);
    }

    const block = cpStore.codeplug.getBlock(bn);
    return {
      blockName: bn,
      label: BLOCK_LABELS[bn] || bn.replace(/_BLOCK$/, '').replace(/^S5_/, '').replace(/_/g, ' '),
      inputs,
      booleans,
      entryCount: block?.entries?.length || 1,
    };
  }).filter(Boolean);
});
</script>

<template>
  <div v-if="cpStore.isLoaded" class="config-page">
    <div v-for="g in groups" :key="g.blockName" class="config-section">
      <div class="section-header">
        <h3>{{ g.label }}</h3>
        <span class="section-meta">{{ g.blockName }} &middot; {{ g.inputs.length + g.booleans.length }} fields</span>
      </div>

      <template v-for="ei in g.entryCount" :key="ei">
        <div v-if="g.entryCount > 1" class="entry-label">Entry {{ ei }}</div>

        <!-- Labeled inputs: enum, frequency, integer, float, string, password -->
        <div v-if="g.inputs.length" class="input-grid">
          <FieldEditor v-for="fn in g.inputs" :key="fn"
            :blockName="g.blockName" :fieldName="fn" :entryIndex="ei - 1" />
        </div>

        <!-- Booleans: compact toggle list in columns -->
        <div v-if="g.booleans.length" class="toggle-grid">
          <FieldEditor v-for="fn in g.booleans" :key="fn"
            :blockName="g.blockName" :fieldName="fn" :entryIndex="ei - 1" />
        </div>
      </template>
    </div>
  </div>

  <div v-else class="empty-state">
    <div class="icon">&#x2699;</div>
    <h2>No Codeplug Loaded</h2>
    <p class="text-muted">Open a file or read from radio</p>
  </div>
</template>

<style scoped>
.config-page {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  max-width: 1600px;
}

/* On wide screens, use 2 columns */
@media (min-width: 1200px) {
  .config-page {
    grid-template-columns: 1fr 1fr;
  }
}

/* On ultra-wide / 4K, allow 3 columns */
@media (min-width: 2200px) {
  .config-page {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.config-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 20px 24px 24px;
  /* Prevent sections from stretching to fill tall grid cells */
  align-self: start;
}

.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

.section-header h3 {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.2px;
  margin: 0;
  color: var(--text-primary);
}

.section-meta {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.entry-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 16px 0 8px;
}

.input-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toggle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}
</style>
