# EEPROM Address Map — Complete Programming Reference

> Every block address needed to read/write a Motorola Commercial Series radio.
> Extracted from all sample codeplugs and validated against VECT_BLOCK contents.

---

## How Radio Programming Works

1. **Read S5_CFG_BLOCK or RRW_BLOCK** at fixed offset 642 — this tells you where VECT_BLOCK lives
2. **Read VECT_BLOCK** — contains 16-bit LE offsets for every data block
3. **Read TC_BLOCK** — bit flags telling which blocks are present (VECT offset=0 means absent)
4. **Read/write each block** at its VECT offset via `ReadDeviceVirtualAddress` / `WriteDeviceVirtualAddress`

**Addresses are NOT hardcoded.** A programmer MUST read VECT_BLOCK first. The tables below show the addresses observed in sample codeplugs — they are stable within a layout family but shift between codeplug versions and model classes.

---

## Fixed Offsets (All Models)

| Offset | Hex | Contents |
|--------|-----|----------|
| 0-641 | 0x0000-0x0281 | Calibration/alignment data (not via VECT) |
| **642** | **0x0282** | **First codeplug block (RI_BLOCK or S5_CFG_BLOCK)** |

---

## ELP_ELM Format (CM140, CM160, CP040, CP140, CP160, CP180)

### Bootstrap Sequence

```
1. Read RI_BLOCK at fixed offset 642 (86 bytes) → radio info, model number
2. Read MDF_BLOCK at fixed offset 728 (48 bytes) → capabilities, max channels
3. Read RRW_BLOCK header at offset 767 (mobile) or 759 (portable):
   - RRW_RGNSIZE   → total RRW region size
   - RRW_TYPECTRLBLKVECT → offset of TC_BLOCK (10 bytes)
   - RRW_VECTBLKVECT     → offset of VECT_BLOCK (114 bytes)
4. Read TC_BLOCK → which blocks exist (bit flags)
5. Read VECT_BLOCK → 56 × 16-bit LE offsets
6. Read/write each present block at its VECT offset
```

### VECT Index to Block Name (56 entries, all models)

| Idx | Block | Binary Header | Entry Size | Description |
|-----|-------|--------------|------------|-------------|
| 0 | RI_BLOCK | 4 | 82 | Radio Info (serial, model, band, freq range) |
| 1 | MDF_BLOCK | 4 | 10 | Model Definition (features, max channels) |
| 2 | TI_BLOCK | 4 | 9 | Tool Info (last programmed date/source) |
| 3 | RC_BLOCK | 4 | 58 | Radio Configuration (general settings) |
| 4 | PA_BLOCK | 4 | varies | Personality Assignment (zone→channel map) |
| 5 | ZA_BLOCK | 4 | varies | Zone Assignment |
| 6 | DR_BLOCK | 4 | 14 | Dynamic Radio (runtime state, **password**) |
| 7 | PN_BLOCK | 4 | varies | Personality (per-channel settings) |
| 8 | PNA_BLOCK | 4 | varies | Personality Name Aliases |
| 9 | PS_BLOCK | 4 | varies | Personality Settings |
| 10 | SM_BLOCK | 4 | varies | Scan Member list |
| 11 | SLI_BLOCK | 4 | varies | Scan List Info |
| 12 | CB_BLOCK | 4 | 15-30 | Control Buttons |
| 13 | MENU_BLOCK | 4 | varies | Menu configuration |
| 14 | OBC_BLOCK | 4 | varies | Option Board Config |
| 15 | DVS_BLOCK | 4 | varies | Digital Voice Storage |
| 16 | AC_BLOCK | 4 | varies | Accessory Configuration |
| 17 | AUXC_BLOCK | 4 | varies | Auxiliary Configuration |
| 18 | CHD_BLOCK | 4 | varies | Channel Data |
| 19 | EM_BLOCK | 4 | 10 | Emergency |
| 20 | SLA_BLOCK | 4 | varies | Scan List Alias |
| 21 | MDCA_BLOCK | 4 | varies | MDC Alias |
| 22 | QCA_BLOCK | 4 | varies | QC Alias |
| 23 | CALL_BLOCK | 5 | varies | Call lists |
| 24 | MDCC_BLOCK | 5 | varies | MDC Call |
| 25 | QCC_BLOCK | 5 | 16 | QC Call |
| 26 | DTMFC_BLOCK | 5 | varies | DTMF Call |
| 27 | MDCM_BLOCK | 4 | varies | MDC Monitor |
| 28 | MDCST_BLOCK | 4 | varies | MDC Status |
| 29 | OT_BLOCK | 4 | varies | One-Touch |
| 30 | EMDC_BLOCK | 4 | varies | Emergency MDC |
| 31 | LRA_BLOCK | 4 | varies | LTR Repeater Alias |
| 32 | LG_BLOCK | 4 | varies | LTR Group |
| 33 | LGA_BLOCK | 4 | varies | LTR Group Alias |
| 34 | LUID_BLOCK | 4 | varies | LTR User ID |
| 35 | LUIDA_BLOCK | 4 | varies | LTR User ID Alias |
| 36 | LRF_BLOCK | 4 | varies | LTR Repeater Freq |
| 37 | LS_BLOCK | 4 | varies | LTR Settings |
| 38 | LSA_BLOCK | 4 | varies | LTR Settings Alias |
| 39 | CP_BLOCK | 5 | 27 | **Channel Parameters (frequencies, PL/DPL, power)** |
| 40 | CPA_BLOCK | 5 | varies | Channel Parameters Alias |
| 41 | SC_BLOCK | 4 | 16 | Signaling Configuration |
| 42 | MDC_BLOCK | 4 | 30 | MDC1200 Configuration |
| 43 | QC_BLOCK | 4 | 19 | Quik-Call II Configuration |
| 44 | DTMF_BLOCK | 4 | 22 | DTMF Configuration |
| 45 | CS_BLOCK | 4 | varies | Call Settings |
| 46 | DTMFA_BLOCK | 4 | varies | DTMF Alias |
| 47 | PSA_BLOCK | 4 | varies | Personality Settings Alias |
| 48-55 | (spare) | — | — | Reserved, always 0 |

### Layout A: Mobile v03 (CM140, CM160)

RRW start=767, RRW_RGNSIZE=2202, TC_VEC=2845, VB_VEC=2855

| Block | Offset | Hex | Size | Present (CM140) | Present (CM160) |
|-------|--------|-----|------|-----------------|-----------------|
| RI_BLOCK | 642 | 0x0282 | 86 | Y | Y |
| MDF_BLOCK | 728 | 0x02D8 | 48 | Y | Y |
| TI_BLOCK | 776 | 0x0308 | 13 | Y | Y |
| RC_BLOCK | 789 | 0x0315 | 62 | Y | Y |
| EM_BLOCK | 851 | 0x0353 | 11 | N | Y |
| PA_BLOCK | 862 | 0x035E | 87 | Y | Y |
| DR_BLOCK | 949 | 0x03B5 | 18 | Y | Y |
| PN_BLOCK | 967 | 0x03C7 | 302 | N | Y |
| PNA_BLOCK | 1269 | 0x04F5 | 215 | N | Y |
| PS_BLOCK | 1484 | 0x05CC | 56 | N | Y |
| SM_BLOCK | 1540 | 0x0604 | 40 | Y | Y |
| SLI_BLOCK | 1580 | 0x062C | 80 | Y | Y |
| CB_BLOCK | 1660 | 0x067C | 34 | Y | Y |
| MENU_BLOCK | 1694 | 0x069E | 104 | N | Y |
| CALL_BLOCK | 1798 | 0x0706 | 35 | N | Y |
| QCC_BLOCK | 1833 | 0x0729 | 21 | N | Y |
| DTMFC_BLOCK | 1854 | 0x073E | 57 | N | Y |
| OT_BLOCK | 1911 | 0x0777 | 479 | N | Y |
| CP_BLOCK | 2390 | 0x0956 | 111 | Y | Y |
| CPA_BLOCK | 2501 | 0x09C5 | 46 | Y | Y |
| SC_BLOCK | 2547 | 0x09F3 | 20 | Y | Y |
| MDC_BLOCK | 2567 | 0x0A07 | 34 | Y | Y |
| QC_BLOCK | 2601 | 0x0A29 | 23 | Y | Y |
| EMDC_BLOCK | 2624 | 0x0A40 | 15 | N | Y |
| DTMF_BLOCK | 2639 | 0x0A4F | 39 | Y | Y |
| AC_BLOCK | 2678 | 0x0A76 | 25 | Y | Y |
| AUXC_BLOCK | 2703 | 0x0A8F | 46 | N | Y |
| SLA_BLOCK | 2749 | 0x0ABD | 15 | Y | Y |
| MDCA_BLOCK | 2764 | 0x0ACC | 15 | Y | Y |
| QCA_BLOCK | 2779 | 0x0ADB | 15 | Y | Y |
| DTMFA_BLOCK | 2794 | 0x0AEA | 15 | Y | Y |
| PSA_BLOCK | 2809 | 0x0AF9 | 15 | N | Y |
| OBC_BLOCK | 2824 | 0x0B08 | 21 | N | Y |
| TC_BLOCK | 2845 | 0x0B1D | 10 | Y | Y |
| VECT_BLOCK | 2855 | 0x0B27 | 114 | Y | Y |

### Layout B: Portable v03 (CP040, CP140, CP160, CP180)

RRW start=759, RRW_RGNSIZE=1902, TC_VEC=2537, VB_VEC=2547

| Block | Offset | Hex | Size |
|-------|--------|-----|------|
| RI_BLOCK | 642 | 0x0282 | 86 |
| MDF_BLOCK | 728 | 0x02D8 | 48 |
| TI_BLOCK | 776 | 0x0308 | 13 |
| RC_BLOCK | 789 | 0x0315 | 62 |
| EM_BLOCK | 851 | 0x0353 | 25 |
| PA_BLOCK | 876 | 0x036C | 59 |
| DR_BLOCK | 935 | 0x03A7 | 18 |
| PN_BLOCK | 953 | 0x03B9 | 215 |
| PNA_BLOCK | 1168 | 0x0490 | 215 |
| PS_BLOCK | 1383 | 0x0567 | 28 |
| SM_BLOCK | 1411 | 0x0583 | 40 |
| SLI_BLOCK | 1451 | 0x05AB | 31 |
| CB_BLOCK | 1482 | 0x05CA | 19 |
| MENU_BLOCK | 1501 | 0x05DD | 92 |
| CALL_BLOCK | 1593 | 0x0639 | 29 |
| QCC_BLOCK | 1622 | 0x0656 | 21 |
| DTMFC_BLOCK | 1643 | 0x066B | 508 |
| CP_BLOCK | 2151 | 0x0867 | 32 |
| CPA_BLOCK | 2183 | 0x0887 | 15 |
| SC_BLOCK | 2198 | 0x0896 | 20 |
| MDC_BLOCK | 2218 | 0x08AA | 34 |
| QC_BLOCK | 2252 | 0x08CC | 162 |
| DTMF_BLOCK | 2414 | 0x096E | 41 |
| SLA_BLOCK | 2455 | 0x0997 | 15 |
| MDCA_BLOCK | 2470 | 0x09A6 | 15 |
| QCA_BLOCK | 2485 | 0x09B5 | 15 |
| DTMFA_BLOCK | 2500 | 0x09C4 | 15 |
| PSA_BLOCK | 2515 | 0x09D3 | 15 |
| OBC_BLOCK | 2530 | 0x09E2 | 7 |
| TC_BLOCK | 2537 | 0x09E9 | 10 |
| VECT_BLOCK | 2547 | 0x09F3 | 114 |

### Layout Shifts: v03 → v06

Codeplug version 06.xx adds fields to CP_BLOCK and MDC_BLOCK, shifting later blocks.

| | Mobile v03→v06 | Portable v03→v06 |
|---|---|---|
| RRW_RGNSIZE | 2202 → 2244 (+42) | 1902 → 1978 (+76) |
| Stable through | CB_BLOCK (1660) | CB_BLOCK (1482) |
| CP_BLOCK shift | +10 | +10 |
| SC_BLOCK shift | +42 | +42 |
| TC_VEC | 2845 → 2887 | 2537 → 2613 |
| VB_VEC | 2855 → 2897 | 2547 → 2623 |

**All addresses before CP_BLOCK are unchanged between v03 and v06.**

---

## S5T Format (CM340, CM360)

### Bootstrap Sequence

```
1. Read S5_CFG_BLOCK at fixed offset 642 (9 bytes):
   - S5_CFG_CP_SIZE     → total codeplug size
   - S5_CFG_TCB_VEC     → offset of TYPE_CONTROL_BLOCK
   - S5_CFG_VB_VEC      → offset of VECTOR_BLOCK
2. Read S5_TYPE_CONTROL_BLOCK (7 bytes) → block presence flags
3. Read S5_VECTOR_BLOCK (65 bytes) → 1 byte count + 32 × 16-bit LE offsets
4. Read/write each present block at its VECT offset
```

### VECT Index to Block Name (32 entries)

| Idx | Block | Header | Entry Size | Description |
|-----|-------|--------|------------|-------------|
| 0 | S5_RADIO_INFO_BLOCK | 5 | 67 | Radio info, model, **password at byte +53** |
| 1 | S5_RADIO_OPTION_BLOCK | 5 | 199 | Radio options (199 settings) |
| 2 | S5_EMERGENCY_BLOCK | 5 | 15 | Emergency config |
| 3 | S5_CONTACT_LIST_BLOCK | 5 | 29 | Address book |
| 4 | S5_ENCODER_STATUS_LIST_BLOCK | 5 | 17 | Encoder status |
| 5 | S5_DECODER_STATUS_LIST_BLOCK | 5 | 17 | Decoder status |
| 6 | S5_MULTICALL_CFG_BLOCK | 5 | 50 | Multi-call config |
| 7 | S5_SEL5_SIG_SYS_LIST_BLOCK | 5 | 27 | Select-5 signaling |
| 8 | S5_ENCODER_SEQ_LIST_BLOCK | 5 | 17 | Encoder sequences |
| 9 | S5_SEL5_DECODER_LIST_BLOCK | 5 | 56 | Select-5 decoder |
| 10 | S5_SEL5_DTMF_ENCODER_TG_LIST_BLOCK | 5 | 6 | DTMF encoder TG |
| 11 | S5_AUTO_ACK_LIST_BLOCK | 5 | 6 | Auto-acknowledge |
| 12 | S5_DTMF_SIG_SYS_LIST_BLOCK | 5 | 12 | DTMF signaling |
| 13 | S5_SCAN_LIST_BLOCK | 5 | 25 | Scan lists |
| 14 | S5_PERSONALITY_LIST_BLOCK | 5 | 26 | Channel personality |
| 15 | S5_CHANNEL_LIST_BLOCK | 5 | 15 | **Channel frequencies** |
| 16 | S5_ALPHANUM_CH_ALIAS_BLOCK | 5 | 14 | Channel aliases (UHF4 only) |
| 17 | S5_USER_DEF_SIG_LIST_BLOCK | 5 | 38 | User-defined signaling |
| 18-19 | (spare) | — | — | Reserved |
| 20 | S5_BUTTON_DEFINITION_BLOCK | 5 | 24 | Programmable buttons |
| 21 | S5_ALERT_BLOCK | 5 | 15 | Alert tones |
| 22 | S5_OPTION_BOARD_BLOCK | 5 | 1 | Option board |
| 23 | S5_GENERAL_IO_BLOCK | 5 | 17 | General I/O |
| 24 | S5_USER_COMMENT_BLOCK | 5 | 1 | User comment |
| 25-30 | (spare) | — | — | Reserved |
| 31 | S5_DYNAMIC_RADIO_BLOCK | 5 | 296 | Runtime state |

### Layout E: Standard S5T (CM340/CM360, all bands except UHF4)

CP_SIZE=1211, TCB_VEC=1780, VB_VEC=1787

| Block | Offset | Hex | Size |
|-------|--------|-----|------|
| S5_CFG_BLOCK | 642 | 0x0282 | 9 |
| S5_RADIO_INFO_BLOCK | 651 | 0x028B | 72 |
| S5_RADIO_OPTION_BLOCK | 723 | 0x02D3 | 204 |
| S5_EMERGENCY_BLOCK | 927 | 0x039F | 20 |
| S5_CONTACT_LIST_BLOCK | 947 | 0x03B3 | 34 |
| S5_ENCODER_STATUS_LIST | 981 | 0x03D5 | 22 |
| S5_DECODER_STATUS_LIST | 1003 | 0x03EB | 22 |
| S5_MULTICALL_CFG_BLOCK | 1025 | 0x0401 | 55 |
| S5_SEL5_SIG_SYS_LIST | 1080 | 0x0438 | 32 |
| S5_ENCODER_SEQ_LIST | 1112 | 0x0458 | 22 |
| S5_SEL5_DECODER_LIST | 1134 | 0x046E | 61 |
| S5_SEL5_DTMF_ENC_TG | 1195 | 0x04AB | 11 |
| S5_AUTO_ACK_LIST | 1206 | 0x04B6 | 11 |
| S5_DTMF_SIG_SYS_LIST | 1217 | 0x04C1 | 17 |
| S5_SCAN_LIST_BLOCK | 1234 | 0x04D2 | 30 |
| S5_PERSONALITY_LIST | 1264 | 0x04F0 | 31 |
| S5_CHANNEL_LIST_BLOCK | 1295 | 0x050F | 20 |
| S5_USER_DEF_SIG_LIST | 1315 | 0x0523 | 81 |
| S5_BUTTON_DEFINITION | 1396 | 0x0574 | 29 |
| S5_ALERT_BLOCK | 1425 | 0x0591 | 20 |
| S5_OPTION_BOARD_BLOCK | 1445 | 0x05A5 | 6 |
| S5_GENERAL_IO_BLOCK | 1451 | 0x05AB | 22 |
| S5_USER_COMMENT_BLOCK | 1473 | 0x05C1 | 6 |
| S5_DYNAMIC_RADIO_BLOCK | 1479 | 0x05C7 | 301 |
| S5_TYPE_CONTROL_BLOCK | 1780 | 0x06F4 | 7 |
| S5_VECTOR_BLOCK | 1787 | 0x06FB | 65 |

**CM340 and CM360 share identical addresses.** Band does not affect addresses (VHF1 = UHF1 = UHF2 = UHF3 = MB). Only UHF4 differs.

### Layout F: S5T UHF4 (CM340 UHF4, CM360 UHF4)

CP_SIZE=1275, TCB_VEC=1844, VB_VEC=1851. ALPHANUM_CH_ALIAS_BLOCK is present, inserting 19 bytes and shifting all blocks after CHANNEL_LIST by +19, then additional shifts from larger CP_SIZE.

---

## Password Location

### ELP_ELM: DR_BLOCK

| Field | XML Name | ID | Description |
|-------|----------|-----|-------------|
| Password | DR_RADLOCKPSWD | 202 | 4-digit numeric, BCD encoded (2 bytes) |
| Enable | DR_RADLOCKEN | 203 | 0=disabled, 1=enabled |
| Valid flag | DR_VALIDPSWD | 204 | Runtime state |
| Attempts | DR_PSWDENTRYATTEMPT | 200 | Runtime counter |

**EEPROM location:** `VECT[6] + 4 + byte_offset_within_DR_BLOCK`
- Mobile v03: `949 + 4 = 953` (DR_BLOCK data start)
- Portable v03: `935 + 4 = 939` (DR_BLOCK data start)

DR_BLOCK is 14 bytes, heavily bit-packed. Password is ~2 bytes BCD near byte 10-11 of the 14-byte entry.

### S5T: S5_RADIO_INFO_BLOCK

| Field | XML Name | ID | Description |
|-------|----------|-----|-------------|
| Password | S5_RI_RSS_PWD | 2058 | 1 byte, 0=disabled, 1-255=password |

**EEPROM location:** `VECT[0] + 5 + 53 = 651 + 5 + 53 = **709 (0x2C5)**`

### How Password Check Works

`QUERYRADIOPASSWORDCHECK` (frame `F3 23 08 00`) does NOT send or verify the password. It only asks the radio "do you have a password set?" (returns 0=no, nonzero=yes).

The actual password is read as part of the normal codeplug read — it's just a field within DR_BLOCK (ELP_ELM) or S5_RADIO_INFO_BLOCK (S5T). CPS reads the entire codeplug, deserializes the password field, and compares it client-side against what the user types. **The password offers no real security — anyone who can read the codeplug can read the password.**

---

## Programming Pseudocode

```python
def read_radio(serial_port):
    serial = open_serial(serial_port, 9600, '8N1')
    esbep = ESBEP(serial, max_transfer=40)

    # Identify radio
    model = esbep.query(0x23, 0x00)   # QUERYRADIOMODELNUMBER
    serial_num = esbep.query(0x23, 0x01)
    cp_version = esbep.query(0x23, 0x04)
    cp_size = esbep.query(0x23, 0x07)

    # Determine format from model prefix
    if model.startswith(('M50J', 'M50K', 'M50Q', 'M50R', 'M50S', 'M50T')) and \
       model[4:6] in ('QC', 'QF', 'PC', 'PF', 'RC', 'RF', 'TC', 'TF'):
        format = 'S5T'  # CM340/CM360
    else:
        format = 'ELP_ELM'

    if format == 'S5T':
        # Read CFG block at fixed offset 642
        cfg = esbep.read(642, 9)
        cp_size = uint16_le(cfg[3:5])
        tcb_vec = uint16_le(cfg[5:7])
        vb_vec = uint16_le(cfg[7:9])

        # Read vector block
        vb_data = esbep.read(vb_vec, 65)
        num_vectors = vb_data[0]  # 32
        vectors = [uint16_le(vb_data[1+i*2:3+i*2]) for i in range(num_vectors)]

        # Read each block
        for idx, offset in enumerate(vectors):
            if offset > 0:
                header = esbep.read(offset, 5)
                entry_size = uint16_le(header[1:3])
                entry_qty = uint16_le(header[3:5])
                data = esbep.read(offset + 5, entry_size * entry_qty)
                blocks[idx] = data

    elif format == 'ELP_ELM':
        # Read RI and MDF at fixed offsets
        ri = esbep.read(642, 86)
        mdf = esbep.read(728, 48)

        # Read RRW header to find TC and VECT
        rrw_header = esbep.read(767, 9)  # mobile; 759 for portable
        rrw_size = uint16_le(rrw_header[...])
        tc_vec = uint16_le(rrw_header[...])
        vb_vec = uint16_le(rrw_header[...])

        # Read TC (10 bytes) and VECT (114 bytes)
        tc = esbep.read(tc_vec, 10)
        vb_data = esbep.read(vb_vec, 114)
        vect_qty = uint16_le(vb_data[0:2])  # 56
        vectors = [uint16_le(vb_data[2+i*2:4+i*2]) for i in range(vect_qty)]

        # Read each present block
        for idx, offset in enumerate(vectors):
            if offset > 0 and tc_flag_set(tc, idx):
                # Read 4 bytes header first
                header = esbep.read(offset, 4)
                flags = header[0]
                entry_size = header[1]
                entry_qty = header[2]
                hdr_size = 5 if (flags & 0x40) else 4
                data = esbep.read(offset + hdr_size, entry_size * entry_qty)
                blocks[idx] = data

    esbep.close()
    return blocks


def write_radio(serial_port, blocks, format):
    serial = open_serial(serial_port, 9600, '8N1')
    esbep = ESBEP(serial, max_transfer=40)

    # Check password
    has_pwd = esbep.query(0x23, 0x08)
    if has_pwd:
        # Password is in the codeplug data we already have
        # Prompt user, compare client-side

    # Write each block at its VECT offset
    for idx, (offset, data) in blocks.items():
        if offset > 0:
            # Rebuild header + data
            block_bytes = build_block_binary(data, format)
            esbep.write(offset, block_bytes)
            # Expect ACK (0x84), retry on NACK (0x85)

    # Update timestamp
    esbep.set(0x18, 0x03, timestamp_bytes)

    # Reset radio
    esbep.send_frame(bytes([0xF1, 0x10, 0xFE]))

    esbep.close()
```
