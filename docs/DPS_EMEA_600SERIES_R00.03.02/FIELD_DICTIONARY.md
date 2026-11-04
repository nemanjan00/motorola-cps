# GM600 codeplug — complete field dictionary (static extract)

All **195 field descriptors** (fid 0–194) of the GM600/GP600 codeplug, recovered statically
from the field-registry table in `WDPS_DP.EXE` (Dealer Programmer). Each descriptor is a 40-byte
(`0x28`) record: `+0` far-pointer to the field-name string, `+4` category word, `+0x14` field-id,
`+0x1a` attribute flags; two far-pointers at `+0xc/+0x10` are runtime object pointers (zero in the
static image). The table lives at linear `0xA7730`–`0xA95A8` in the IDA database; the name strings
are in the resource string segment.

This is the authoritative list of **which fields the codeplug stores**. Exact radio-byte/bit
offsets are applied by transform routines keyed on the field-id and are bound separately (by live
write-contrast, see `LIVE_CAPTURE.md`, or deeper transform RE). It supersedes the earlier guess
that `WDPS_NP.EXE`'s `dseg54`/`sub_772A0` was the field map — `sub_772A0` is a Zinc GUI
window-builder, not a codeplug packer.

**Category codes** (`+4`): `1`=int (plain numeric count/value); `2`=enum/string (small enumerated or label); `3`=frequency (BE freq word, 375 MHz base — see FREQ_ENCODING); `4`=boolean enable (on/off); `5`=enum (network dialling-plan / type selector); `6`=enum (multi-value option); `7`=enum (short CLIM/CLIME option); `8`=byte, low/binary half (…_B, operator-ID low); `9`=byte, high half (operator-ID high, config byte); `10`=list/table (repeated sub-structure); `11`=MPT1327 address (packed prefix+ident); `12`=timer/duration (scaled units); `13`=tuner/alignment analog (softpot/DAC).

**Attribute flags** (`+0x1a`, observed): `0x8000`=radio-wide/system, `0x4000`=network/trunking domain, `0x0100`=member of a repeated table (per-channel/per-entry), plus low sub-attribute bits.


## Network (MPT1327) — 127 fields

| fid | field | cat | flags | notes |
|---:|---|---:|---|---|
| 0 | `ACCESS_AUTHORISATION` | 10 | `0x8000` | 0x8000 radio-wide/system |
| 1 | `ACCESS_AUTH_BIN` | 8 | `0x0100` | 0x0100 member of a repeated table |
| 2 | `ACCESS_AUTH_CLASS` | 6 | `0x0100` | 0x0100 member of a repeated table |
| 3 | `ACCESS_AUTH_IDENT` | 1 | `0x0100` | 0x0100 member of a repeated table |
| 7 | `BACKGROUND_HUNT` | 4 | `0x8000` | 0x8000 radio-wide/system |
| 8 | `BROADCAST_CALLS_ENABLED` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 9 | `CALL_DIVERSION` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 10 | `CALL_DURATION_TIMER_MODE` | 6 | `0x4000` | 0x4000 network/trunking-domain |
| 11 | `CALL_IN_ABSENCE_ENABLE` | 4 | `0x0021` | 0x0020, 0x0001 |
| 12 | `CALL_IN_ABSENCE_TIMER` | 1 | `0x0020` | 0x0020 |
| 13 | `CALL_TX_TIMEOUT_OPERATION` | 4 | `0x8000` | 0x8000 radio-wide/system |
| 20 | `CLIM` | 7 | `0x4000` | 0x4000 network/trunking-domain |
| 21 | `CLIME` | 7 | `0x4000` | 0x4000 network/trunking-domain |
| 22 | `CLIME_ENABLE` | 4 | `0x4001` | 0x4000 network/trunking-domain, 0x0001 |
| 23 | `CLIM_ENABLE` | 4 | `0x4001` | 0x4000 network/trunking-domain, 0x0001 |
| 24 | `CONTROL_CHANNEL_CATEGORY` | 6 | `0x8000` | 0x8000 radio-wide/system |
| 25 | `CONTROL_CHANNEL_CONTROL` | 1 | `0x0100` | 0x0100 member of a repeated table |
| 26 | `CONTROL_CHANNEL_HOME` | 6 | `0x0100` | 0x0100 member of a repeated table |
| 27 | `CONTROL_CHANNEL_LIST` | 10 | `0x8000` | 0x8000 radio-wide/system |
| 28 | `CONTROL_CHANNEL_SHARED` | 6 | `0x0100` | 0x0100 member of a repeated table |
| 47 | `DESCRIPTION` | 2 | `0x0100` | 0x0100 member of a repeated table |
| 50 | `DTMF_OVERDIALING` | 4 | `0x4200` | 0x4000 network/trunking-domain, 0x0200 |
| 51 | `EMERGENCY_CALLS_ENABLED` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 52 | `EMERGENCY_CALL_KEY_DELAY` | 12 | `0x0000` | — |
| 56 | `GROUP_CALLS_ENABLED` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 57 | `HIGHEST_CALLABLE_UNIT_NUMB` | 1 | `0x4000` | 0x4000 network/trunking-domain |
| 58 | `HIGHEST_CHANNEL_NUMBER` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 59 | `HIGHEST_GROUP_NUMBER` | 1 | `0x4000` | 0x4000 network/trunking-domain |
| 60 | `HIGHEST_SYSTEM_CHANNEL_NO` | 1 | `0x8080` | 0x8000 radio-wide/system, 0x0080 |
| 61 | `HIGHEST_UNIT_NUMB_IN_FLEET` | 1 | `0x4000` | 0x4000 network/trunking-domain |
| 63 | `HOME_ZONE` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 64 | `HUNT_OPTION` | 6 | `0x8000` | 0x8000 radio-wide/system |
| 65 | `IGNORE_LAB_SUBFIELD` | 4 | `0x8080` | 0x8000 radio-wide/system, 0x0080 |
| 66 | `INTER_FLEET_CALLS_ENABLED` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 67 | `INTER_FLEET_GRP_CALL_ENABLE` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 68 | `INTER_PREFIX_CALLS_ENABLED` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 71 | `LENGTH_OF_AREA` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 72 | `LENGTH_OF_ZONE` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 73 | `LMVOTE` | 1 | `0x8080` | 0x8000 radio-wide/system, 0x0080 |
| 74 | `LNR_DISABLE` | 4 | `0x4080` | 0x4000 network/trunking-domain, 0x0080 |
| 75 | `LOWEST_CALLABLE_UNIT_NUMBER` | 1 | `0x4000` | 0x4000 network/trunking-domain |
| 76 | `LOWEST_CHANNEL_NUMBER` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 77 | `LOWEST_SYSTEM_CHANNEL_NO` | 1 | `0x8080` | 0x8000 radio-wide/system, 0x0080 |
| 79 | `MAXIMUM_DTMF_TONE_DURATION` | 12 | `0x4200` | 0x4000 network/trunking-domain, 0x0200 |
| 84 | `MINIMUM_DTMF_TONE_DURATION` | 12 | `0x4200` | 0x4000 network/trunking-domain, 0x0200 |
| 85 | `MIN_DTMF_INTERTONE_DURATION` | 12 | `0x4200` | 0x4000 network/trunking-domain, 0x0200 |
| 91 | `MPT1327_GROUP_IDENT` | 11 | `0x0000` | — |
| 92 | `MPT1327_GROUP_PREFIX` | 11 | `0x0000` | — |
| 93 | `MPT1327_OWN_IDENT` | 11 | `0x4000` | 0x4000 network/trunking-domain |
| 94 | `MPT1327_OWN_PREFIX` | 11 | `0x4000` | 0x4000 network/trunking-domain |
| 96 | `MPT_POWER_LEVEL` | 6 | `0x4000` | 0x4000 network/trunking-domain |
| 97 | `NC1_CONTINUOUS` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 98 | `NC1_TIME_SHARED` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 99 | `NC2_CONTINUOUS` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 100 | `NC2_TIME_SHARED` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 101 | `ND1` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 102 | `ND2` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 103 | `NDD_SAMPLE_DURATION` | 12 | `0x8000` | 0x8000 radio-wide/system |
| 104 | `NE` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 105 | `NETWORK_DIALLING_PLAN` | 5 | `0x8000` | 0x8000 radio-wide/system |
| 106 | `NETWORK_OPERATOR_ID_B` | 8 | `0x8000` | 0x8000 radio-wide/system |
| 107 | `NETWORK_OPERATOR_ID_H` | 9 | `0x8000` | 0x8000 radio-wide/system |
| 108 | `NETWORK_TYPE` | 5 | `0x8000` | 0x8000 radio-wide/system |
| 109 | `NI` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 110 | `NORMAL_CALL_KEY_DELAY` | 12 | `0x0000` | — |
| 111 | `NPD_ALERT_ENABLE` | 4 | `0x4080` | 0x4000 network/trunking-domain, 0x0080 |
| 112 | `NPD_CALLS` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 113 | `NPD_MAINT_ENABLE` | 4 | `0x4080` | 0x4000 network/trunking-domain, 0x0080 |
| 114 | `NR` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 115 | `NS` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 116 | `NT` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 117 | `NVOTE` | 1 | `0x8080` | 0x8000 radio-wide/system, 0x0080 |
| 118 | `NV_CONTINUOUS` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 119 | `NV_TIME_SHARED` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 120 | `NW` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 121 | `NX1_CONTINUOUS` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 122 | `NX1_TIME_SHARED` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 123 | `NX2_CONTINUOUS` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 124 | `NX2_TIME_SHARED` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 125 | `NZ1` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 126 | `NZ2` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 127 | `OACSU_IMITATE_ENABLE` | 6 | `0x4000` | 0x4000 network/trunking-domain |
| 128 | `OWN_FLEET_GROUP_NUMBER` | 1 | `0x4000` | 0x4000 network/trunking-domain |
| 129 | `OWN_FLEET_INDIVIDUAL_NUMBER` | 1 | `0x4000` | 0x4000 network/trunking-domain |
| 130 | `OWN_GROUP_FLEET` | 1 | `0x4100` | 0x4000 network/trunking-domain, 0x0100 member of a repeated table |
| 131 | `OWN_GROUP_GROUP` | 1 | `0x0100` | 0x0100 member of a repeated table |
| 132 | `OWN_GROUP_NUMBERS` | 10 | `0x0000` | — |
| 133 | `OWN_GROUP_PREFIX` | 1 | `0x4100` | 0x4000 network/trunking-domain, 0x0100 member of a repeated table |
| 134 | `OWN_GROUP_TALKG` | 6 | `0x0180` | 0x0100 member of a repeated table, 0x0080 |
| 135 | `OWN_PREFIX` | 1 | `0x4000` | 0x4000 network/trunking-domain |
| 136 | `OWN_UNIT_NUMBER` | 1 | `0x4000` | 0x4000 network/trunking-domain |
| 137 | `PABX_CALLS_ENABLED` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 141 | `PREFERENTIAL_NDD` | 10 | `0x8000` | 0x8000 radio-wide/system |
| 142 | `PREF_NDD_FIELD_LENGTH` | 1 | `0x0100` | 0x0100 member of a repeated table |
| 143 | `PREF_NDD_PRIORITY` | 1 | `0x0100` | 0x0100 member of a repeated table |
| 144 | `PREF_NDD_SUB_FIELD` | 1 | `0x0100` | 0x0100 member of a repeated table |
| 145 | `PRIORITY_CALLS_ENABLED` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 146 | `PSTN_CALLS_ENABLED` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 147 | `RADIO_CONFIG_BYTE_1` | 9 | `0x8000` | 0x8000 radio-wide/system |
| 148 | `RADIO_CONFIG_BYTE_1_B` | 8 | `0x8000` | 0x8000 radio-wide/system |
| 149 | `RADIO_CONFIG_BYTE_2` | 9 | `0x8000` | 0x8000 radio-wide/system |
| 150 | `RADIO_CONFIG_BYTE_2_B` | 8 | `0x8000` | 0x8000 radio-wide/system |
| 155 | `REGISTRATION_INFO` | 1 | `0x8040` | 0x8000 radio-wide/system |
| 156 | `REGISTRATION_ON_POWERUP` | 4 | `0x8000` | 0x8000 radio-wide/system |
| 164 | `RX_LOW_BATTERY_THRESHOLD` | 1 | `0x0000` | — |
| 167 | `SHORT_ADDRESSING_PABX_CALLS` | 4 | `0x8000` | 0x8000 radio-wide/system |
| 169 | `STATUS_CALLS_ENABLED` | 4 | `0x4000` | 0x4000 network/trunking-domain |
| 170 | `SUPPRESS_COMPREHENSIVE_HUNT` | 4 | `0x8000` | 0x8000 radio-wide/system |
| 171 | `SYNCH_PATTERN_TYPE` | 6 | `0x8000` | 0x8000 radio-wide/system |
| 172 | `TA` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 173 | `TB` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 174 | `TC` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 175 | `TD` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 176 | `TH` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 177 | `TI` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 178 | `TJ` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 179 | `TL` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 180 | `TN` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 181 | `TP` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 182 | `TS` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 183 | `TT` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 184 | `TVOTE` | 1 | `0x8080` | 0x8000 radio-wide/system, 0x0080 |
| 185 | `TW` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 186 | `TWO_THREE_DIGIT_GROUP_DIAL` | 1 | `0x4000` | 0x4000 network/trunking-domain |
| 187 | `TWO_THREE_DIGIT_INDIV_DIAL` | 1 | `0x4000` | 0x4000 network/trunking-domain |
| 188 | `TX_HIGH_BATTERY_THRESHOLD` | 1 | `0x0000` | — |
| 191 | `TX_LOW_BATTERY_THRESHOLD` | 1 | `0x0000` | — |

## Personality/Radio-wide — 35 fields

| fid | field | cat | flags | notes |
|---:|---|---:|---|---|
| 4 | `ACOUSTIC_FEEDBACK` | 4 | `0x0000` | — |
| 5 | `ALERT_TONE_VOLUME_OFFSET` | 1 | `0x0000` | — |
| 6 | `AUDIO_PATH` | 6 | `0x8000` | 0x8000 radio-wide/system |
| 14 | `CHANNEL_FREQUENCY_PLAN` | 10 | `0x8000` | 0x8000 radio-wide/system |
| 15 | `CHANNEL_FREQ_CHANNEL` | 1 | `0x0100` | 0x0100 member of a repeated table |
| 16 | `CHANNEL_FREQ_RX` | 3 | `0x0100` | 0x0100 member of a repeated table |
| 17 | `CHANNEL_FREQ_TX` | 3 | `0x0100` | 0x0100 member of a repeated table |
| 18 | `CHANNEL_SPACING` | 2 | `0x0100` | 0x0100 member of a repeated table |
| 19 | `CHANNEL_VOTING_TIMER` | 1 | `0x8040` | 0x8000 radio-wide/system |
| 29 | `CONVENTIONAL_DTMF_ENABLE` | 4 | `0x4200` | 0x4000 network/trunking-domain, 0x0200 |
| 30 | `CONVENTIONAL_MODE_INHIBIT` | 6 | `0x8000` | 0x8000 radio-wide/system |
| 31 | `CONVENTIONAL_PERSONALITIES` | 10 | `0x0000` | — |
| 32 | `CONVENTIONAL_TIMEOUT_ENABLE` | 4 | `0x0001` | 0x0001 |
| 33 | `CONVENTIONAL_TIMEOUT_TIMER` | 1 | `0x0000` | — |
| 34 | `CONV_PERS_DATA_CHAN` | 6 | `0x0180` | 0x0100 member of a repeated table, 0x0080 |
| 35 | `CONV_PERS_MONITOR` | 6 | `0x0100` | 0x0100 member of a repeated table |
| 36 | `CONV_PERS_RX` | 3 | `0x0100` | 0x0100 member of a repeated table |
| 37 | `CONV_PERS_RX_PL` | 6 | `0x0100` | 0x0100 member of a repeated table |
| 38 | `CONV_PERS_TX` | 3 | `0x0100` | 0x0100 member of a repeated table |
| 39 | `CONV_PERS_TX_INHIBIT` | 6 | `0x0100` | 0x0100 member of a repeated table |
| 40 | `CONV_PERS_TX_PL` | 6 | `0x0100` | 0x0100 member of a repeated table |
| 41 | `CONV_PERS_TX_POWER` | 6 | `0x0100` | 0x0100 member of a repeated table |
| 42 | `CP_VERSION_MAJOR` | 1 | `0x0000` | — |
| 48 | `DISPLAY_BACKLIGHT_MODE` | 6 | `0x0400` | 0x0400 |
| 53 | `EXTERNAL_ALARM_DURATION` | 1 | `0x1000` | 0x1000 |
| 54 | `EXTERNAL_ALARM_ENABLE` | 4 | `0x1001` | 0x1000, 0x0001 |
| 62 | `HIGH_POWER_LEVEL` | 1 | `0x5000` | 0x4000 network/trunking-domain, 0x1000 |
| 70 | `KEYPAD_LOCK` | 4 | `0x0200` | 0x0200 |
| 78 | `LOW_POWER_LEVEL` | 1 | `0x5000` | 0x4000 network/trunking-domain, 0x1000 |
| 80 | `MAXTRAC_HANDSET` | 4 | `0x0000` | — |
| 83 | `MINIMUM_AUDIO_VOLUME` | 1 | `0x0000` | — |
| 140 | `POWER_LEVEL` | 2 | `0x0100` | 0x0100 member of a repeated table |
| 152 | `RATED_AUDIO_VOLUME` | 1 | `0x0000` | — |
| 165 | `SHORTFORM_DIALLING` | 10 | `0x0000` | — |
| 166 | `SHORTFORM_NUMBER` | 2 | `0x0100` | 0x0100 member of a repeated table |

## Alignment/Tuner — 33 fields

| fid | field | cat | flags | notes |
|---:|---|---:|---|---|
| 43 | `CTD_COLD_TEMPERATURE` | 1 | `0x0000` | — |
| 44 | `CTD_HOT_TEMPERATURE` | 1 | `0x0000` | — |
| 45 | `CTD_INFLECTION` | 1 | `0x0000` | — |
| 46 | `CTD_LINEAR` | 1 | `0x0000` | — |
| 49 | `DTMF_DEVIATION` | 1 | `0x0000` | — |
| 55 | `FRONT_END_FILTER` | 13 | `0x0000` | — |
| 69 | `KCP` | 13 | `0x0000` | — |
| 81 | `MAX_FREQ` | 3 | `0x0100` | 0x0100 member of a repeated table |
| 82 | `MCP` | 13 | `0x0000` | — |
| 86 | `MIN_FREQ` | 3 | `0x0100` | 0x0100 member of a repeated table |
| 87 | `MODEL_NUMBER` | 2 | `0x0100` | 0x0100 member of a repeated table |
| 88 | `MODEL_NUMBERS` | 10 | `0x0000` | — |
| 89 | `MODEL_NUMBER_IDENTIFIER` | 1 | `0x0000` | — |
| 90 | `MODULATION_ATTENUATION` | 13 | `0x0000` | — |
| 95 | `MPT_DEVIATION` | 1 | `0x0000` | — |
| 138 | `PA_BIAS_VOLTAGE` | 1 | `0x0000` | — |
| 139 | `PA_VOLTAGE_LIMIT` | 13 | `0x0000` | — |
| 151 | `RADIO_FREQUENCY_BASE` | 1 | `0x0000` | — |
| 153 | `REFERENCE_ATTENUATOR` | 1 | `0x0000` | — |
| 154 | `REFERENCE_OSCILLATOR_WARP` | 1 | `0x0000` | — |
| 157 | `RSSI_MARGIN_LEVEL_LM1` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 158 | `RSSI_MARGIN_LEVEL_LM2` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 159 | `RSSI_MARGIN_LEVEL_LM3` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 160 | `RSSI_MARGIN_LEVEL_LM4` | 1 | `0x8000` | 0x8000 radio-wide/system |
| 161 | `RSSI_THRESHOLD_L0` | 1 | `0x0000` | — |
| 162 | `RSSI_THRESHOLD_L1` | 1 | `0x0000` | — |
| 163 | `RSSI_THRESHOLD_L2` | 1 | `0x0000` | — |
| 168 | `SQUELCH_ATTENUATOR` | 13 | `0x0000` | — |
| 189 | `TX_HIGH_POWER` | 13 | `0x0000` | — |
| 190 | `TX_HIGH_POWER_COARSE` | 1 | `0x0000` | — |
| 192 | `TX_LOW_POWER` | 13 | `0x0000` | — |
| 193 | `TX_LOW_POWER_COARSE` | 1 | `0x0000` | — |
| 194 | `VCO_ATTENUATION` | 13 | `0x0000` | — |
