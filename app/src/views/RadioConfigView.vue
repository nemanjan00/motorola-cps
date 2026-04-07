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

const SECTION_ORDER = [
  'RI_BLOCK', 'S5_RADIO_INFO_BLOCK',
  'RC_BLOCK', 'S5_RADIO_OPTION_BLOCK',
  'AC_BLOCK', 'S5_GENERAL_IO_BLOCK',
  'SC_BLOCK', 'EMDC_BLOCK', 'EM_BLOCK', 'S5_EMERGENCY_BLOCK',
  'MDC_BLOCK', 'MDCC_BLOCK',
  'QC_BLOCK', 'QCC_BLOCK',
  'DTMF_BLOCK', 'DTMFC_BLOCK', 'S5_DTMF_SIG_SYS_LIST_BLOCK',
  'CB_BLOCK', 'S5_BUTTON_DEFINITION_BLOCK',
  'MENU_BLOCK', 'PS_BLOCK', 'OT_BLOCK',
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
  'S5_SEL5_DTMF_ENCODER_TG_LIST_BLOCK', 'CALL_BLOCK',
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

/**
 * Group fields within a block into logical sub-groups.
 * Returns [{label, fields: [{name, def}]}]
 */
function groupFields(blockName, fields) {
  const defs = fields.map(f => ({ name: f, def: getFieldDef(f) }));

  // AC_BLOCK: group by pin number
  if (blockName === 'AC_BLOCK' || blockName === 'S5_GENERAL_IO_BLOCK') {
    return groupByPin(defs, blockName);
  }

  // CB_BLOCK: group by button (short+long press pairs)
  if (blockName === 'CB_BLOCK' || blockName === 'S5_BUTTON_DEFINITION_BLOCK') {
    return groupByButton(defs);
  }

  // SC_BLOCK: group into Emergency, Encode, General
  if (blockName === 'SC_BLOCK') {
    return groupSignaling(defs);
  }

  // MDC_BLOCK: group into IDs, PTT ID, Call Alert, DOS, Decode, Advanced
  if (blockName === 'MDC_BLOCK') {
    return groupMDC(defs);
  }

  // Default: single group
  return [{ label: null, fields: defs }];
}

function groupByPin(defs, blockName) {
  const pins = new Map(); // pin label → fields
  const general = [];
  const pinRe = blockName.startsWith('S5_')
    ? /PIN(\d+)/
    : /PIN(\d+)/;

  for (const d of defs) {
    const m = d.name.match(pinRe);
    if (m) {
      const pin = m[1];
      if (!pins.has(pin)) pins.set(pin, []);
      pins.get(pin).push(d);
    } else {
      general.push(d);
    }
  }

  const groups = [];
  if (general.length) groups.push({ label: 'General', fields: general });
  for (const [pin, fields] of pins) {
    // Sort: Function first, then Active Level, then Debounce
    fields.sort((a, b) => {
      const order = f => f.name.includes('FUNC') ? 0 : f.name.includes('ACT') ? 1 : f.name.includes('DIR') ? 1 : f.name.includes('DEB') ? 2 : 3;
      return order(a) - order(b);
    });
    groups.push({ label: `Pin #${pin}`, fields, inline: true });
  }
  return groups;
}

function groupByButton(defs) {
  const buttons = new Map(); // button name → fields
  const other = [];

  for (const d of defs) {
    // Extract button identity: e.g. CBP_SIDE1 from CBP_SIDE1LONGPRESS
    // or S5_BD_BUTTON1 from S5_BD_BUTTON1
    let btnName = null;
    const label = d.def?.label || d.name;

    if (d.name.includes('SHORTPRESS') || d.name.includes('LONGPRESS')) {
      btnName = label.replace(/ (Short|Long) Press$/, '');
    } else if (d.name.includes('ROTFUNC')) {
      btnName = 'Rotary';
    } else {
      // S5T buttons don't have SHORT/LONG suffix — each is its own
      btnName = label;
    }

    if (btnName && (d.name.includes('SHORTPRESS') || d.name.includes('LONGPRESS'))) {
      if (!buttons.has(btnName)) buttons.set(btnName, []);
      buttons.get(btnName).push(d);
    } else {
      other.push(d);
    }
  }

  const groups = [];
  for (const [btn, fields] of buttons) {
    // Sort: short press first
    fields.sort((a, b) => a.name.includes('SHORT') ? -1 : 1);
    groups.push({ label: btn, fields, inline: true });
  }
  if (other.length) groups.push({ label: 'Other', fields: other });
  return groups;
}

function groupSignaling(defs) {
  const emergency = [];
  const encode = [];
  const general = [];

  for (const d of defs) {
    if (d.name.startsWith('SC_EM')) {
      emergency.push(d);
    } else if (d.name.includes('ENCEN') || d.name.includes('TONETAG') || d.name.includes('STENC') || d.name.includes('STON')) {
      encode.push(d);
    } else {
      general.push(d);
    }
  }

  const groups = [];
  if (emergency.length) groups.push({ label: 'Emergency', fields: emergency });
  if (encode.length) groups.push({ label: 'Encode / Tone Tags', fields: encode });
  if (general.length) groups.push({ label: 'General', fields: general });
  return groups;
}

function groupMDC(defs) {
  const ids = [];
  const pttid = [];
  const callAlert = [];
  const dos = [];
  const decode = [];
  const advanced = [];

  for (const d of defs) {
    const n = d.name;
    if (n === 'MDC_PRIMARYID' || n === 'MDC_GRPID' || n === 'ALIAS') ids.push(d);
    else if (n.includes('PTTID') || n.includes('PTTSID') || n.includes('PTTSH')) pttid.push(d);
    else if (n.includes('CALLALERT') || n.includes('ALERTAUTO')) callAlert.push(d);
    else if (n.includes('DOS')) dos.push(d);
    else if (n.includes('DECEN') || n.includes('DECODE') || n.includes('LEDEN') || n.includes('DISPDEC') || n.includes('MSGDEC') || n.includes('EMDEC') || n.includes('REMMON') || n.includes('RADCHK') || n.includes('STPOLL') || n.includes('VIDEN') || n.includes('REQTO') || n.includes('STNOACK')) decode.push(d);
    else advanced.push(d);
  }

  const groups = [];
  if (ids.length) groups.push({ label: 'Identification', fields: ids });
  if (pttid.length) groups.push({ label: 'PTT ID', fields: pttid });
  if (callAlert.length) groups.push({ label: 'Call Alert', fields: callAlert });
  if (dos.length) groups.push({ label: 'Data Operated Squelch', fields: dos });
  if (decode.length) groups.push({ label: 'Decode / Monitor', fields: decode });
  if (advanced.length) groups.push({ label: 'Timing & Advanced', fields: advanced });
  return groups;
}

const sections = computed(() => {
  if (!cpStore.codeplug) return [];
  const available = new Set(cpStore.codeplug.listBlocks().filter(bn => !EXCLUDED.has(bn)));

  const ordered = [];
  const seen = new Set();
  for (const bn of SECTION_ORDER) {
    if (available.has(bn) && !seen.has(bn)) { ordered.push(bn); seen.add(bn); }
  }
  for (const bn of available) {
    if (!seen.has(bn)) { ordered.push(bn); seen.add(bn); }
  }

  return ordered.map(bn => {
    const allFields = getBlockFields(bn).filter(f => {
      const d = getFieldDef(f);
      return d && d.inputType;
    });
    if (!allFields.length) return null;

    const block = cpStore.codeplug.getBlock(bn);
    const subgroups = groupFields(bn, allFields);

    return {
      blockName: bn,
      label: BLOCK_LABELS[bn] || bn.replace(/_BLOCK$/, '').replace(/^S5_/, '').replace(/_/g, ' '),
      subgroups,
      entryCount: block?.entries?.length || 1,
      fieldCount: allFields.length,
    };
  }).filter(Boolean);
});
</script>

<template>
  <div v-if="cpStore.isLoaded" class="config-page">
    <div v-for="s in sections" :key="s.blockName" class="config-section">
      <div class="section-header">
        <h3>{{ s.label }}</h3>
        <span class="section-meta">{{ s.fieldCount }} fields</span>
      </div>

      <template v-for="ei in s.entryCount" :key="ei">
        <div v-if="s.entryCount > 1" class="entry-label">Entry {{ ei }}</div>

        <div v-for="sg in s.subgroups" :key="sg.label || 'default'" class="subgroup">
          <div v-if="sg.label" class="subgroup-label">{{ sg.label }}</div>

          <!-- Inline group: fields side-by-side (pins, button pairs) -->
          <div v-if="sg.inline" class="inline-group">
            <FieldEditor v-for="fd in sg.fields" :key="fd.name"
              :blockName="s.blockName" :fieldName="fd.name" :entryIndex="ei - 1" />
          </div>

          <!-- Normal group: split booleans and inputs -->
          <template v-else>
            <div class="input-list">
              <template v-for="fd in sg.fields" :key="fd.name">
                <FieldEditor v-if="fd.def?.inputType !== 'boolean'"
                  :blockName="s.blockName" :fieldName="fd.name" :entryIndex="ei - 1" />
              </template>
            </div>
            <div class="toggle-list">
              <template v-for="fd in sg.fields" :key="fd.name">
                <FieldEditor v-if="fd.def?.inputType === 'boolean'"
                  :blockName="s.blockName" :fieldName="fd.name" :entryIndex="ei - 1" />
              </template>
            </div>
          </template>
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
@media (min-width: 1200px) { .config-page { grid-template-columns: 1fr 1fr; } }
@media (min-width: 2200px) { .config-page { grid-template-columns: 1fr 1fr 1fr; } }

.config-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 20px 24px 24px;
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
.section-header h3 { font-size: 13px; font-weight: 700; margin: 0; }
.section-meta { font-size: 11px; color: var(--text-muted); font-family: var(--font-mono); }

.entry-label {
  font-size: 11px; font-weight: 600; color: var(--text-muted);
  text-transform: uppercase; letter-spacing: 0.5px; margin: 16px 0 8px;
}

.subgroup { margin-bottom: 12px; }
.subgroup:last-child { margin-bottom: 0; }
.subgroup-label {
  font-size: 11px; font-weight: 600; color: var(--accent);
  letter-spacing: 0.3px; margin-bottom: 8px; padding-bottom: 4px;
  border-bottom: 1px solid var(--border);
}

/* Inline group: fields in a horizontal row (pin settings, button pairs) */
.inline-group {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex-wrap: wrap;
}
.inline-group > * { flex: 1; min-width: 120px; }

/* Normal lists */
.input-list { display: flex; flex-direction: column; gap: 2px; }
.toggle-list {
  display: flex; flex-direction: column; gap: 0;
  margin-top: 8px;
}
</style>
