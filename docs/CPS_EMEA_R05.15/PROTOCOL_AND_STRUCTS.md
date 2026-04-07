# Motorola Commercial Series CPS - Reverse Engineering Documentation

> Reverse engineered from Motorola Commercial Series CPS R05.15 (elpelmcpservices.dll R05.05, copyright 2002-2011).
> Covers radios: CM140, CM160, CM340, CM360, CP040, CP140, CP160, CP180, CP340, CP360, CP380.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [CPS File Format (.cps)](#2-cps-file-format)
3. [Codeplug XML Schema - ELP_ELM Variant](#3-codeplug-xml-schema---elp_elm-variant)
4. [Codeplug XML Schema - S5T Variant](#4-codeplug-xml-schema---s5t-variant)
5. [ESBEP Serial Protocol](#5-esbep-serial-protocol)
6. [Serial Port Configuration](#6-serial-port-configuration)
7. [Radio Model Identification](#7-radio-model-identification)
8. [Frequency & Signaling Tables](#8-frequency--signaling-tables)
9. [Field Enumerations](#9-field-enumerations)
10. [Implementation Notes](#10-implementation-notes)

---

## 1. Architecture Overview

### Software Stack

```
+-----------------------------------------------------------+
|  cps.exe (3.1MB) - MFC MDI GUI Application                |
|  ~40+ CFormView classes (CConvPersView, CGenSetView, ...) |
+-----------------------------------------------------------+
         |                          |
+------------------+    +---------------------------+
| cpscontroller.dll|    | resourcemanager.dll        |
| (mediator layer) |    | (i18n, field labels/enums) |
+------------------+    +---------------------------+
         |
+-----------------------------------------------------------+
| elpelmcpservices.dll (1.7MB) - COM Business Logic         |
| ICPServices interface                                      |
| CLSID: {5974E7BB-89E2-11D6-BFA5-00C04F6B8C5D} (ELP_ELM) |
| CLSID: {D7A9F2B0-F27B-4F0B-A2FC-680CBE33BAA9} (S5)      |
+-----------------------------------------------------------+
    |              |               |
+----------+ +------------+ +-------------------+
|filehandle| |xmlxslhandler| |s5xmlxslhandler.dll|
|.dll      | |.dll (ELP)   | |(S5T format)       |
|(.cps I/O)| +------------+ +-------------------+
+----------+       |
                   +-- Xalan-C XSLT + Xerces-C 1.6.0 XML
    |
+-----------------------------------------------------------+
| esbepservices_dllpackage.dll - ESBEP Protocol Layer       |
+-----------------------------------------------------------+
    |
+-----------------------------------------------------------+
| serialcomm_dllpackage.dll - RS-232 Serial I/O             |
+-----------------------------------------------------------+
    |
  [COM Port] --> [RIB/Programming Cable] --> [Radio]
```

### Controller API (cpscontroller.dll exports)

```c
OpenController(...)
CloseController(...)
ReadDevice(...)           // Read codeplug from radio
WriteDevice(...)          // Write codeplug to radio
ReadCPFile(...)           // Open .cps file
WriteCPFile(...)          // Save .cps file
CreateReport(...)         // Generate HTML report
CloneDevice(...)          // Clone radio-to-radio
CloneCPServices(...)
GetDeviceType(...)        // Identify connected radio
GetCPFileType(...)        // Identify file format
ListInterfaces(...)       // Enumerate COM ports
CloseCPServices(...)
```

### CPServices COM Interface (elpelmcpservices.dll)

```c
interface ICPServices {
    ReadDevice(handle)
    WriteDevice(handle)
    GetErrorMsg(code) -> string
    GetBlockData(blockName) -> data
    SetBlockData(blockName, data)
    GetFieldAt(block, entry, field) -> value
    SetFieldAt(block, entry, field, value)
    GetSubFieldAt(block, entry, field, subfield) -> value
    SetSubFieldAt(block, entry, field, subfield, value)
    GetRangeInfo(block, field) -> (min, max, step)
    GetCurrentListQuantity(block) -> count
    AddList(block) / DeleteList(block, index)
    AddListMember(block, index) / DeleteListMember(block, index, member)
    MoveList(block, from, to) / MoveListMember(block, list, from, to)
    CloneDevice(srcHandle, dstHandle)
    ImportOBD(...)
    Copy(src, dst)
    ResetDevice(handle)
    GetValidAliasCharSet(block) -> charset
    ValidateAlias(block, alias) -> bool
}
```

---

## 2. CPS File Format

### Encoding: Single-Byte XOR Obfuscation

**The entire `.cps` file is XOR'd with key `0x95` (149 decimal).**

```
decoded_byte = raw_byte ^ 0x95
```

No compression, no padding, no binary sections. The decoded result is well-formed XML.

### Decoding Example (Python)

```python
def decode_cps(data: bytes) -> str:
    return bytes(b ^ 0x95 for b in data).decode('utf-8')

def encode_cps(xml: str) -> bytes:
    return bytes(b ^ 0x95 for b in xml.encode('utf-8'))
```

### Decoded XML Structure

Two format variants exist, determined by radio model family:

| Variant | Root Element | Radios | File Sizes |
|---------|-------------|--------|------------|
| **ELP_ELM** | `<ELP_ELM_CODEPLUG VERSION="1.0">` | CM140, CM160, CP040, CP140, CP160, CP180 | 27-50 KB |
| **S5T** | `<S5T_CODEPLUG VERSION="1.0">` | CM340, CM360, CP340, CP360, CP380 | 78-101 KB |

Both variants start with:
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<!DOCTYPE ELP_ELM_Codeplug>
```

### Legacy Format

`filehandle.dll` also supports `.cpg` files (ADK format) via `ADK2CP()`, `ADK_Open()`, `ADK_Close()`, `GetADKModel()` exports.

---

## 3. Codeplug XML Schema - ELP_ELM Variant

Used by: CM140, CM160, CP040, CP140, CP160, CP180

### Top-Level Structure

```xml
<ELP_ELM_CODEPLUG VERSION="1.0">
  <RRO>  <!-- Read-Only Region (factory-set) -->
    <MDF_BLOCK>...</MDF_BLOCK>    <!-- Model Definition -->
    <RI_BLOCK>...</RI_BLOCK>      <!-- Radio Information -->
  </RRO>
  <RRW>  <!-- Read-Write Region (user-configurable) -->
    <RRW_BLOCK>...</RRW_BLOCK>    <!-- Region header -->
    <TI_BLOCK>...</TI_BLOCK>      <!-- Tracking Info -->
    <TC_BLOCK>...</TC_BLOCK>      <!-- Type Control (block presence flags) -->
    <VECT_BLOCK>...</VECT_BLOCK>  <!-- Vector Table (EEPROM offsets) -->
    <RC_BLOCK>...</RC_BLOCK>      <!-- Radio Configuration -->
    <CP_BLOCK>...</CP_BLOCK>      <!-- Channel Personalities -->
    <PA_BLOCK>...</PA_BLOCK>      <!-- Personality Assignment -->
    <DR_BLOCK>...</DR_BLOCK>      <!-- Dynamic Radio State -->
    <CB_BLOCK>...</CB_BLOCK>      <!-- Control Buttons -->
    <AC_BLOCK>...</AC_BLOCK>      <!-- Accessory Connector -->
    <SM_BLOCK>...</SM_BLOCK>      <!-- Scan Mode -->
    <SLI_BLOCK>...</SLI_BLOCK>    <!-- Scan List -->
    <SC_BLOCK>...</SC_BLOCK>      <!-- Signaling Config -->
    <MDC_BLOCK>...</MDC_BLOCK>    <!-- MDC1200 -->
    <QC_BLOCK>...</QC_BLOCK>      <!-- Quik-Call II -->
    <DTMF_BLOCK>...</DTMF_BLOCK>  <!-- DTMF Signaling -->
    <SLA_BLOCK>...</SLA_BLOCK>    <!-- Scan List Assignment -->
    <MDCA_BLOCK>...</MDCA_BLOCK>  <!-- MDC Assignment -->
    <QCA_BLOCK>...</QCA_BLOCK>    <!-- QC Assignment -->
    <DTMFA_BLOCK>...</DTMFA_BLOCK><!-- DTMF Assignment -->
    <!-- Optional blocks (present when TC_BLOCK flag = 1): -->
    <ZA_BLOCK/>     <!-- Zone Alias -->
    <PN_BLOCK/>     <!-- Phone -->
    <PNA_BLOCK/>    <!-- Phone Assignment -->
    <PS_BLOCK/>     <!-- Phone System -->
    <MENU_BLOCK/>   <!-- Programmable Menu -->
    <OBC_BLOCK/>    <!-- Option Board Config -->
    <DVS_BLOCK/>    <!-- Digital Voice Storage -->
    <EM_BLOCK/>     <!-- Emergency -->
    <CALL_BLOCK/>   <!-- Call List -->
    <MDCC_BLOCK/>   <!-- MDC Call Entries -->
    <QCC_BLOCK/>    <!-- QC Call Entries -->
    <DTMFC_BLOCK/>  <!-- DTMF Call Entries -->
    <OT_BLOCK/>     <!-- One-Touch -->
    <EMDC_BLOCK/>   <!-- Emergency MDC -->
    <LG_BLOCK/>     <!-- LTR Group -->
    <LGA_BLOCK/>    <!-- LTR Group Assignment -->
    <LUID_BLOCK/>   <!-- LTR UID -->
    <LS_BLOCK/>     <!-- LTR Site -->
    <LRF_BLOCK/>    <!-- LTR Repeater Freq -->
    <ATIS_BLOCK/>   <!-- ATIS (Japan) -->
    <SDT_BLOCK/>    <!-- SDT (Japan) -->
  </RRW>
</ELP_ELM_CODEPLUG>
```

### ENTRY_INFO Header (per block)

Each data block contains an `<ENTRY_INFO>` element:

```xml
<BLOCK_NAME ID="block_id" TYPE="type">
  <ENTRY_INFO>
    <ENTRY_HEADER  ID="46"  TYPE="2">128</ENTRY_HEADER>  <!-- 128=single, 192=list+alias -->
    <ENTRY_SIZE    ID="47"  TYPE="2">N</ENTRY_SIZE>       <!-- field count per entry -->
    <ENTRY_QUANTITY ID="48" TYPE="2">M</ENTRY_QUANTITY>   <!-- entry count -->
    <!-- For list blocks: -->
    <LIST_HEADER        ID="49"  TYPE="2">132</LIST_HEADER>
    <ALIAS_LIST_SIZE    ID="464" TYPE="2">8</ALIAS_LIST_SIZE>
    <ALIAS_ENTRY_HEADER ID="465" TYPE="2">...</ALIAS_ENTRY_HEADER>
  </ENTRY_INFO>
  <ENTRY_DATA>
    <FIELD_NAME ID="field_id" TYPE="0|1|2">value</FIELD_NAME>
    ...
  </ENTRY_DATA>
</BLOCK_NAME>
```

### TYPE Attribute Semantics

| TYPE | Meaning |
|------|---------|
| `0` | Read-only (factory-set, not programmable) |
| `1` | Read-write (user-configurable) |
| `2` | Structural/metadata (block headers, sizes, offsets) |

### Block Details

#### MDF_BLOCK (ID=2) - Model Definition (Read-Only)

| Field | ID | Description | Example Values |
|-------|-----|-------------|----------------|
| `MDF_MAXZONE` | | Max zones | 1-16 |
| `MDF_MAXCNV` | | Max conventional channels | 2-16 |
| `MDF_RADTYPE` | | Radio type | "Portable", "Mobile" |
| `MDF_MODELTYPE` | | Internal model codename | "Guppy", "PNK", "PLK", "PFK", "Marlin", "Marlin+" |
| `MDF_ERGOTYPE` | | Ergonomic type | Keypad/display variant |
| `MDF_DISPTYPE` | | Display type | "None", others |
| `MDF_CNV` | | Conventional capable | 0/1 |
| `MDF_DTMF` | | DTMF capable | 0/1 |
| `MDF_QCII` | | Quik-Call II capable | 0/1 |
| `MDF_MDCCNV` | | MDC1200 conventional | 0/1 |
| `MDF_LTR` | | LTR trunking capable | 0/1 |
| `MDF_SDT` | | SDT capable | 0/1 |
| `MDF_TONGTAGGING` | | Tone tagging capable | 0/1 |
| `MDF_VOICESCRAMBLING` | | Voice scrambling | 0/1 |
| `MDF_ARTS` | | ARTS capable | 0/1 |
| `MDF_LONEWOKER` | | Lone Worker | 0/1 |
| `MDF_RADIOLOCK` | | Radio Lock | 0/1 |
| `MDF_RADIONAME` | | Radio name feature | 0/1 |
| `MDF_TXINHIBITOVERRIDE` | | TX inhibit override | 0/1 |
| `MDF_MDCEMERGYBUTTON` | | MDC emergency button | 0/1 |
| `MDF_DATAOPERTRIDENT` | | Data operation | 0/1 |
| `MDF_CHANBW12POINT5ONLYEN` | | 12.5 kHz only | 0/1 |
| `MDF_MAXLTRGROUP` | | Max LTR groups | integer |

#### RI_BLOCK (ID=3) - Radio Information (Read-Only)

| Field | ID | Description | Example |
|-------|-----|-------------|---------|
| `RI_SERIALNUM` | | Serial number | string |
| `RI_MODELNUM` | | 16-char Motorola part number | "M50KNC9AA2AN" |
| `RI_ORIGCPVER` | | Original codeplug version | string |
| `RI_ORIGPROGSRC` | | Original programming source | string |
| `RI_ORIGDATE` | | Original programming date | string |
| `RI_ORIGTIME` | | Original programming time | string |
| `RI_BANDSEL` | | Band selection | "VHF"/"UHF" |
| `RI_BANDMINFREQ` | | Band minimum frequency (MHz) | "146.000000" |
| `RI_BANDMAXFREQ` | | Band maximum frequency (MHz) | "174.000000" |
| `RI_LVRISBASEFREQ` | | VRIS base frequency | decimal |
| `RI_CPPARTNUM` | | CP part number | string |
| `RI_PROGCPSIZE` | | Programmed codeplug size | integer |
| `RI_MINTXPWR` | | Min TX power (W) | decimal |
| `RI_MAXTXPWR` | | Max TX power (W) | decimal |
| `RI_REGID` | | Regional identifier | string |

#### CP_BLOCK (ID=38) - Channel Personality

**This is the most important block - defines each channel's configuration.**

| Field | ID | Description | Example |
|-------|-----|-------------|---------|
| `CP_RXFREQ` | 455 | RX frequency (MHz) | "151.625000" |
| `CP_TXFREQ` | 456 | TX frequency (MHz) | "151.625000" |
| `CP_RXREFFREQ` | | RX reference frequency | decimal |
| `CP_CHBWSEL` | 386 | Channel bandwidth (kHz) | "25", "12.5" |
| `CP_TXDEV` | 387 | TX deviation (kHz) | "5.0" |
| `CP_TXPWRLEVSEL` | 410 | TX power level | "High", "Low" |
| `CP_TXSQCODESEL` | 396 | TX squelch code type | "CSQ", "PL", "DPL" |
| `CP_RXSQCODESEL` | 397 | RX squelch code type | "CSQ", "PL", "DPL" |
| `CP_TXENCDATA` | 391 | TX PL/DPL encode data | 0-511 |
| `CP_RXDECDATA` | 392 | RX PL/DPL decode data | 0-511 |
| `CP_TOT` | 405 | Timeout timer (seconds) | 0-180, "Infinite" |
| `CP_TOTTYPE` | | TOT type | string |
| `CP_TALKAROUNDEN` | 402 | Talkaround enable | 0/1 |
| `CP_AUTOSCANEN` | 403 | Auto-scan enable | 0/1 |
| `CP_RXONLY` | | Receive-only | 0/1 |
| `CP_TXSIGTYPE` | 415 | TX signaling type | "None", "MDC", "Quik-Call II", "DTMF" |
| `CP_RXSIGTYPE` | 416 | RX signaling type | "None", "MDC", "Quik-Call II", "DTMF" |
| `CP_COMPANDINGST` | 412 | Companding state | "Disabled", "Full Companding" |
| `CP_COMPTYPE` | | Companding type | "AGC", etc. |
| `CP_TXADMITCRITERIA` | | TX admit criteria | string |
| `CP_REVBURSTTOCEN` | | Reverse burst TOC | 0/1 |
| `CP_NONSTDREVBURST` | | Non-standard reverse burst | 0/1 |
| `CP_WHISPERMODEEN` | | Whisper mode | 0/1 |
| `CP_FLATTXAUDIOEN` | | Flat TX audio | 0/1 |
| `CP_ARTSEN` | | ARTS enable | 0/1 |
| `CP_LONEWOKEREN` | | Lone worker enable | 0/1 |
| `CP_DATAREVERTPERINDEX` | | Data revert personality index | integer |
| `ALIAS` | 424 | Channel name (max 8 chars) | "Pers1" |

#### RC_BLOCK (ID=5) - Radio Configuration

| Field | Description | Example |
|-------|-------------|---------|
| `RC_LONGPRESSDUR` | Long press duration (ms) | integer |
| `RC_BUSYLEDEN` | Busy LED enable | 0/1 |
| `RC_PWRUPLEDTESTEN` | Power-up LED test | 0/1 |
| `RC_TXLOWBATLEDEN` | TX low battery LED | 0/1 |
| `RC_HEADSETEN` | Headset enable | 0/1 |
| `RC_MICGAIN` | Mic gain (dB) | decimal |
| `RC_ACCMICGAIN` | Accessory mic gain (dB) | decimal |
| `RC_VOXMICGAIN` | VOX mic gain (dB) | decimal |
| `RC_TXLOWPWR` | TX low power (W) | decimal |
| `RC_TXHIGHPWR` | TX high power (W) | decimal |
| `RC_RADIONAME` | Radio name string | string |
| `RC_ARTSMODE` | ARTS mode | string |
| `RC_SELCHANLOCK` | Selected channel lock | 0/1 |
| `RC_PRIOCHANLOCK` | Priority channel lock | 0/1 |
| `RC_HOMEREVPERINDEX1` | Memory channel 1 index | integer |
| `RC_HOMEREVPERINDEX2` | Memory channel 2 index | integer |
| `RC_HOMEREVPERTYPE1` | Memory channel 1 type | "Conventional"/"LS Trunking" |

#### MDC_BLOCK (ID=41) - MDC1200 Signaling

| Field | Description |
|-------|-------------|
| `MDC_PRIMARYID` | Primary MDC ID |
| `MDC_GRPID` | Group MDC ID |
| `MDC_PTTIDEN` | PTT ID enable |
| `MDC_PRETIME` | Pre-time |
| `MDC_DECODEEN` | Decode enable |

#### SC_BLOCK (ID=40) - Signaling Configuration

| Field | Description |
|-------|-------------|
| `SC_EMTYPE` | Emergency type |
| `SC_EMREVPERSINDEX` | Emergency revert channel index |
| `SC_EMREVPERSTYPE` | Emergency revert type |
| `SC_EMSTREVEN` | Emergency sticky revert |
| `SC_EMLEDEN` | Emergency LED |
| `SC_EMALERTEN` | Emergency alert |
| `SC_EMACKALERTEN` | Emergency ACK alert |
| `SC_EMLONGPRESSDUR` | Emergency long press duration (sec) |
| `SC_IMPEMALARMRET` | Impolite emergency retries |
| `SC_POLEMALARMRET` | Polite emergency retries |
| `SC_OPENMICDUR` | Open mic duration (sec) |

#### CB_BLOCK (ID=15) - Control Buttons

**Mobile buttons (CBM_ prefix):**
- `CBM_P1SHORTPRESS`, `CBM_P1LONGPRESS` through `CBM_P4SHORTPRESS`, `CBM_P4LONGPRESS`
- `CBM_MICASHORTPRESS`, `CBM_MICALONGPRESS` (Mic button A)
- `CBM_MICBSHORTPRESS`, `CBM_MICBLONGPRESS` (Mic button B)
- `CBM_MICCSHORTPRESS`, `CBM_MICCLONGPRESS` (Mic button C)
- IR remote buttons: `CBM_MK1SHORTPRESS`...`CBM_MK4LONGPRESS`

**Portable buttons (CBP_ prefix):**
- `CBP_SIDE1SHORTPRESS`, `CBP_SIDE1LONGPRESS`
- `CBP_SIDE2SHORTPRESS`, `CBP_SIDE2LONGPRESS`
- `CBP_FRONT1SHORTPRESS`, `CBP_FRONT1LONGPRESS`
- `CBP_FRONT3SHORTPRESS`, `CBP_FRONT3LONGPRESS`

#### TC_BLOCK (ID=453) - Type Control

Contains presence flags (1=present, 0=absent) for every possible data block, plus `BLOCK_SIZE` for each.

#### VECT_BLOCK (ID=454) - Vector Table

Maps block names to EEPROM byte offsets in the radio's memory. `VECT_QUANTITY` typically 56 vectors.

---

## 4. Codeplug XML Schema - S5T Variant

Used by: CM340, CM360, CP340, CP360, CP380

### Top-Level Structure

```xml
<S5T_CODEPLUG VERSION="1.0">
  <RRO/>  <!-- Empty in S5T -->
  <RRW>
    <S5_CFG_BLOCK>...</S5_CFG_BLOCK>
    <S5_TYPE_CONTROL_BLOCK>...</S5_TYPE_CONTROL_BLOCK>
    <S5_VECTOR_BLOCK>...</S5_VECTOR_BLOCK>
    <S5_RADIO_INFO_BLOCK>...</S5_RADIO_INFO_BLOCK>
    <S5_RADIO_OPTION_BLOCK>...</S5_RADIO_OPTION_BLOCK>
    <S5_EMERGENCY_BLOCK>...</S5_EMERGENCY_BLOCK>
    <S5_CONTACT_LIST_BLOCK>...</S5_CONTACT_LIST_BLOCK>
    <S5_ENCODER_STATUS_LIST_BLOCK>...</S5_ENCODER_STATUS_LIST_BLOCK>
    <S5_DECODER_STATUS_LIST_BLOCK>...</S5_DECODER_STATUS_LIST_BLOCK>
    <S5_MULTICALL_CFG_BLOCK>...</S5_MULTICALL_CFG_BLOCK>
    <S5_SEL5_SIG_SYS_LIST_BLOCK>...</S5_SEL5_SIG_SYS_LIST_BLOCK>
    <S5_ENCODER_SEQ_LIST_BLOCK>...</S5_ENCODER_SEQ_LIST_BLOCK>
    <S5_SEL5_DECODER_LIST_BLOCK>...</S5_SEL5_DECODER_LIST_BLOCK>
    <S5_SEL5_DTMF_ENCODER_TG_LIST_BLOCK>...</S5_SEL5_DTMF_ENCODER_TG_LIST_BLOCK>
    <S5_AUTO_ACK_LIST_BLOCK>...</S5_AUTO_ACK_LIST_BLOCK>
    <S5_DTMF_SIG_SYS_LIST_BLOCK>...</S5_DTMF_SIG_SYS_LIST_BLOCK>
    <S5_SCAN_LIST_BLOCK>...</S5_SCAN_LIST_BLOCK>
    <S5_PERSONALITY_LIST_BLOCK>...</S5_PERSONALITY_LIST_BLOCK>
    <S5_CHANNEL_LIST_BLOCK>...</S5_CHANNEL_LIST_BLOCK>
    <S5_ALPHANUM_CH_ALIAS_BLOCK>...</S5_ALPHANUM_CH_ALIAS_BLOCK>
    <S5_USER_DEF_SIG_LIST_BLOCK>...</S5_USER_DEF_SIG_LIST_BLOCK>
    <S5_BUTTON_DEFINITION_BLOCK>...</S5_BUTTON_DEFINITION_BLOCK>
    <S5_ALERT_BLOCK>...</S5_ALERT_BLOCK>
    <S5_OPTION_BOARD_BLOCK>...</S5_OPTION_BOARD_BLOCK>
    <S5_GENERAL_IO_BLOCK>...</S5_GENERAL_IO_BLOCK>
    <S5_USER_COMMENT_BLOCK>...</S5_USER_COMMENT_BLOCK>
    <S5_DYNAMIC_RADIO_BLOCK>...</S5_DYNAMIC_RADIO_BLOCK>
    <S5_RADIO_FEATURE_DEFINITION_BLOCK>...</S5_RADIO_FEATURE_DEFINITION_BLOCK>
  </RRW>
</S5T_CODEPLUG>
```

### S5T ENTRY_INFO Header

```xml
<ENTRY_INFO>
  <S5_CHECKSUM_LAYOUT_HEADER     ID="2030" TYPE="2">2</S5_CHECKSUM_LAYOUT_HEADER>
  <S5_DIMENSION_HERDER           ID="2031" TYPE="2">0</S5_DIMENSION_HERDER>
  <S5_ENTRY_SIZE_UNIT_HEADER     ID="2032" TYPE="2">0</S5_ENTRY_SIZE_UNIT_HEADER>
  <S5_ENTRY_SIZE_FIELD_LEN_HEADER ID="2033" TYPE="2">1</S5_ENTRY_SIZE_FIELD_LEN_HEADER>
  <S5_ENTRY_SIZE_HEADER          ID="2034" TYPE="2">N</S5_ENTRY_SIZE_HEADER>
  <S5_ENTRY_QUANTITY_HEADER      ID="2035" TYPE="2">M</S5_ENTRY_QUANTITY_HEADER>
</ENTRY_INFO>
```

### S5T Block Details

#### S5_CFG_BLOCK (ID=2002) - Configuration

| Field | Description |
|-------|-------------|
| `S5_CFG_CP_SIZE` | Codeplug size in bytes |
| `S5_CFG_TCB_VEC` | Type control block vector offset |
| `S5_CFG_VB_VEC` | Vector block offset |

#### S5_RADIO_INFO_BLOCK (ID=2003)

| Field | Description |
|-------|-------------|
| `S5_RI_SERIAL_NO` | Serial number (hex-encoded) |
| `S5_RI_MODELNUM` | Model number string |
| `S5_RI_MAJOR_CP_VER` | Codeplug version (major) |
| `S5_RI_MINOR_CP_VER` | Codeplug version (minor) |
| `S5_RI_PROG_DATE` | Last programmed date |
| `S5_RI_PROG_TIME` | Last programmed time |
| `S5_RI_VRIS_BASE_FREQ` | VRIS base frequency |
| `S5_RI_MIN_RF_POWER` | Min RF power (W) |
| `S5_RI_MAX_RF_POWER` | Max RF power (W) |
| `S5_RI_FIRMWARE_VER` | Firmware version |
| `S5_RI_RSS_PWD` | Programming password |

#### S5_CHANNEL_LIST_BLOCK (ID=2018) - Channel Definition

**Key difference from ELP_ELM: frequencies stored as increments from VRIS base.**

| Field | Description |
|-------|-------------|
| `S5_CLB_TX_FREQ_INCREMENT` | TX freq offset from VRIS base |
| `S5_CLB_RX_FREQ_INCREMENT` | RX freq offset from VRIS base |
| `S5_CLB_TX_FREQ_STEP_SIZE` | TX freq step size (e.g., "5.00KHz") |
| `S5_CLB_RX_FREQ_STEP_SIZE` | RX freq step size |
| `S5_CLB_TX_REF_FREQ` | TX reference frequency |
| `S5_CLB_RX_REF_FREQ` | RX reference frequency |
| `S5_CLB_BANDWIDTH` | Bandwidth (12.5/25 kHz) |
| `S5_CLB_PL_DPL_MODE` | PL/DPL mode |
| `S5_CLB_PL_DPL_CODE` | PL/DPL code |
| `S5_CLB_POWER_LEVEL` | TX power level |
| `S5_CLB_TALKAROUND` | Talkaround enable |
| `S5_CLB_SCAN_EN` | Scan enable |
| `S5_CLB_PERSONALITY_INDEX` | Personality index |
| `S5_CLB_ALIAS_INDEX` | Alias string index |

**Frequency Calculation:**
```
actual_freq_MHz = VRIS_BASE_FREQ + (FREQ_INCREMENT * STEP_SIZE_kHz / 1000)
```

Example: VRIS base = 7500, increment = 100, step = 5.00 kHz
```
freq = 7500 + (100 * 5.00 / 1000) = 7500.5 MHz  (not realistic - values need scaling)
```

The VRIS base values observed: 7500 (UHF), 2060 (VHF). These are likely encoded as 10x kHz or similar radio-internal units.

#### S5_PERSONALITY_LIST_BLOCK (ID=2017) - Per-Channel Settings

| Field | Description |
|-------|-------------|
| Pre/de-emphasis | Audio emphasis settings |
| Squelch mode | CSQ/PL/DPL |
| Companding | Audio companding settings |
| AGC | Automatic gain control |
| Power level | High/Low |
| TOT | Timeout timer |
| PTT keyup mode | PTT behavior |
| Encoder/decoder config | Signaling assignments |

#### S5_RADIO_OPTION_BLOCK (ID=2004) - 199 Fields

| Field | Description |
|-------|-------------|
| `S5_RO_POWER_ON_CH` | Power-on channel |
| `S5_RO_MEM_CH1_CH_IDX` | Memory channel 1 |
| `S5_RO_MEM_CH2_CH_IDX` | Memory channel 2 |
| `S5_RO_LANGUAGE_SEL` | Language selection |
| `S5_RO_RADIO_ON_MSG` | Power-on message |
| `S5_RO_DEFAULT_TXT_MSG` | Default display text |
| `S5_RO_BACKLIGHT_MODE` | Backlight mode |
| `S5_RO_INTERNAL_MIC_GAIN` | Internal mic gain (dB) |
| `S5_RO_WHISPER_MODE_INTERNAL_MIC_GAIN` | Whisper mic gain (dB) |
| `S5_RO_CH_LOW_POWER_LEVEL` | TX low power (W) |
| `S5_RO_CH_HIGH_POWER_LEVEL` | TX high power (W) |
| `S5_RO_BUSY_LED_EN` | Busy LED enable |
| `S5_RO_TX_LOW_BATT_LED_EN` | TX low battery LED |
| `S5_RO_TX_LED_EN` | TX LED enable |
| `S5_RO_RADIO_MIN_VOL` | Minimum volume (%) |
| `S5_RO_VARIABLE_ALERT_VOL` | Variable alert volume offset (%) |
| `S5_RO_FIXED_ALERT_VOL` | Fixed alert volume (%) |
| `S5_RO_INCOMING_RINGING_TONE` | Ring tone type |
| `S5_RO_MISSED_CALL_LIST_MODE` | Missed call list mode |
| `S5_RO_VOICE_STORAGE_MODE` | Voice storage mode |
| `S5_RO_TEST_MODE_DISABLE` | Test mode disable |

#### S5_VECTOR_BLOCK (ID=2028) - EEPROM Offset Table

32 vectors mapping block names to radio memory addresses:
- `S5_V_RADIO_INFO_VEC`, `S5_V_CH_LIST_VEC`, `S5_V_PERSONALITY_VEC`, etc.

#### S5_TYPE_CONTROL_BLOCK (ID=2027)

Presence flags (1/0) for each data block plus `S5_TC_SIZE_OF_TCB`.

---

## 5. ESBEP Serial Protocol

**ESBEP = Enhanced SB9600 Extended Protocol**

### Connection Object

```c
struct ESBEPConnection {
    HANDLE mutex;               // offset 0x00
    DWORD  max_transfer_size;   // offset 0x04 - default 0x28 (40 bytes)
    DWORD  serial_handle;       // offset 0x08
    IUnknown* serial_manager;   // offset 0x0C
    WORD   session_marker;      // offset 0x10 - 0xFFFF = no active session
};
```

### Frame Format

Two frame types, distinguished by first byte:

#### Short Frame (`(byte[0] & 0xF0) == 0xF0`)

```
+--------+--------+--------+---...---+--------+
| Length  | Opcode | Addr/  | Payload | Chksum |
| 0xF0|n |        | Flags  |         |        |
+--------+--------+--------+---...---+--------+
```

- Byte 0: `0xF0 | (payload_length + overhead)`
- Byte 1: Opcode
- Byte 2+: Address/flags and payload
- Last byte: One's complement checksum

#### Extended Frame (`(byte[0] & 0x0F) == 0x0F`)

```
+--------+--------+--------+--------+--------+---...---+--------+
| Length  | Opcode | Addr   | Addr   | Len/   | Payload | Chksum |
| (lo=0F)| High   | High   | Low    | Flags  |         |        |
+--------+--------+--------+--------+--------+---...---+--------+
```

### Checksum Algorithm

**One's complement sum:**

```c
uint8_t calculate_checksum(uint8_t* frame, int length) {
    uint8_t sum = 0;
    for (int i = 0; i < length - 1; i++) {
        sum += frame[i];
    }
    return 0xFF - sum;  // equivalently: ~sum & 0xFF
}

// Verification: sum all bytes including checksum == 0xFF
```

### Read Command

```
Request (7 bytes):
+------+------+------+------+------+------+------+
| 0xF5 | 0x11 | Addr | Addr | Len  | Flag | Csum |
|      |      | Hi   | Lo   |      |      |      |
+------+------+------+------+------+------+------+

  Addr: Big-endian 16-bit target memory address
  Len:  Number of bytes to read
  Flag: 0x00 = virtual address, 0x80 = absolute address
```

```
Response:
+------+------+------+---...---+------+
| Len  | 0x80 | DLen | Data    | Csum |
+------+------+------+---...---+------+

  0x80 = read response opcode
  DLen = data length
  Data = requested bytes
```

### Write Command

**Small write (data + 4 < 16, fits in short frame):**

```
Request:
+----------+------+------+------+------+---...---+------+
| 0xF0|len | 0x17 | Flag | Addr | Addr | Data    | Csum |
|          |      |      | Hi   | Lo   |         |      |
+----------+------+------+------+------+---...---+------+

  Total length: data_length + 6 bytes
```

**Large write (extended frame):**

```
Request:
+------+------+------+------+------+------+------+---...---+------+
| 0x17 | 0xFF | Addr | Addr | Ext  | Ext  | Ext  | Data    | Csum |
|      |      | Hi   | Lo   | addr | addr | len  |         |      |
+------+------+------+------+------+------+------+---...---+------+
```

**Write Response:**

```
Response byte[1]:
  0x84 = ACK (success)
  0x85 = NACK (failure)
```

### Chunked Transfers

For large reads/writes exceeding `max_transfer_size`:
- **Read chunks**: `max_transfer_size - 8` bytes per frame
- **Write chunks**: `max_transfer_size - 4` bytes per frame
- Default `max_transfer_size` = 40 bytes (0x28)

### Frame Header Encoding (fully reversed)

```
byte[0] = 0xF0 | payload_length
```

The low nibble of byte[0] is the number of payload bytes (opcode + data).
Total frame size = 1 (header) + payload_length + 1 (checksum).

| byte[0] | Payload bytes | Total frame | Used by |
|---------|--------------|-------------|---------|
| `0xF1` | 1 | 3 | RESETRADIO, QUERYMAXTRANSFERSIZE |
| `0xF2` | 2 | 4 | All QUERY commands (opcode + sub-cmd) |
| `0xF3` | 3 | 5 | QUERYRADIOPASSWORDCHECK (+ password byte) |
| `0xF5` | 5 | 7 | Read memory (opcode + addr + len + flags) |
| `0xF7` | 7 | 9 | SETRADIOELECTRONICSERIALNUMBER |
| `0xFC` | 12 | 14 | SETRADIOSERIALNUMBER |
| `0xFE` | 14 | 16 | SETRADIOLASTPROGRAMMEDTIME |

**Response frame opcode extraction:**
- If `byte[0] & 0xF0 == 0xF0`: opcode = `byte[1]` (extended frame)
- If `byte[0] & 0xF0 != 0xF0`: opcode = `byte[0] >> 4` (short frame, high nibble)

**Data length extraction:**
- If `byte[0] & 0x0F != 0x0F`: length = `byte[0] & 0x0F` (low nibble)
- If low nibble == 0x0F: length = `ntohs(byte[2..3])` (extended length)

### Complete Opcode Table

#### Commands (PC → Radio)

| Opcode | Function | Sub-Cmd | Description |
|--------|----------|---------|-------------|
| `0x10` | RESETRADIO | — | Reboot radio. Frame: `F1 10 FE` |
| `0x11` | READ | — | Read memory. Frame: `F5 11 AddrH AddrL Len Flags Csum` |
| `0x13` | QUERYMAXTRANSFER | — | Query max transfer size. Frame: `F1 13 FB` |
| `0x17` | WRITE | — | Write memory. Frame: `F0\|len 17 Flags AddrH AddrL Data... Csum` |
| `0x18` | SET data | 0x00 | Set serial number. Frame: `FC 18 00 [10 bytes] Csum` |
| `0x18` | SET data | 0x01 | Set ESN. Frame: `F7 18 01 [5 bytes] Csum` |
| `0x18` | SET data | 0x03 | Set last programmed time. Frame: `FE 18 03 [12 bytes] Csum` |
| `0x23` | QUERY info | 0x00 | Query model number. Frame: `F2 23 00 EA` |
| `0x23` | QUERY info | 0x01 | Query serial number. Frame: `F2 23 01 E9` |
| `0x23` | QUERY info | 0x02 | Query ESN. Frame: `F2 23 02 E8` |
| `0x23` | QUERY info | 0x03 | Query firmware version. Frame: `F2 23 03 E7` |
| `0x23` | QUERY info | 0x04 | Query codeplug version. Frame: `F2 23 04 E6` |
| `0x23` | QUERY info | 0x07 | Query codeplug size. Frame: `F2 23 07 E3` |
| `0x23` | QUERY info | 0x08 | Query password check. Frame: `F3 23 08 00 E1` |
| `0x23` | QUERY info | 0x09 | Query low battery. Frame: `F2 23 09 E1` |
| `0x23` | QUERY info | 0x0A | Query last programmed time. Frame: `F2 23 0A E0` |
| `0x23` | QUERY info | 0x0F | Query UUID. Frame: `F2 23 0F DB` |
| `0x23` | QUERY info | 0x10 | Query regional ID. Frame: `F2 23 10 DA` |

#### Responses (Radio → PC)

| Opcode | Function | Description |
|--------|----------|-------------|
| `0x05` | ACK | General acknowledgment (success) |
| `0x06` | NAK | Negative acknowledgment (error) |
| `0x82` | MAX_TRANSFER_RESP | Max transfer size: `ntohs(byte[2..3])` = uint16 |
| `0x84` | READ_OK | Read data response (success), payload follows |
| `0x85` | READ_ERR | Read data response (error/NACK) |
| `0x8B` | QUERY_RESP | Query info response, sub-cmd at byte[4] (extended) or byte[2] (short) |

#### QUERY Response Sub-Commands (opcode 0x8B)

| Sub-Cmd | Response Data | Size |
|---------|--------------|------|
| 0x00 | Model number string | 16 bytes |
| 0x01 | Serial number | 10 bytes |
| 0x02 | Electronic serial number (ESN) | 5 bytes |
| 0x03 | Firmware version string | Variable, null-terminated |
| 0x04 | Codeplug version string | Variable, null-terminated |
| 0x07 | Codeplug size | Variable |
| 0x08 | Password check result | 1 byte (0=fail, 1=pass) |
| 0x09 | Battery status | Variable |
| 0x0A | Last programmed timestamp | 12 bytes |
| 0x0F | UUID | 32 bytes (hex-encoded nibble pairs) |
| 0x10 | Regional identifier | Variable |

#### All Valid Opcodes in Switch Table

| Range | Used | Reserved/Unknown |
|-------|------|-----------------|
| 0x05-0x06 | ACK/NAK | — |
| 0x10-0x1C | 0x10, 0x11, 0x13, 0x17, 0x18 | 0x12, 0x14-0x16, 0x19-0x1C |
| 0x1F-0x27 | 0x23 | 0x1F-0x22, 0x24-0x27 |
| 0x2D-0x39 | (none observed in CPS) | All — possibly other radio families |
| 0x80-0x87 | 0x82, 0x84, 0x85 | 0x80, 0x81, 0x83, 0x86, 0x87 |
| 0x89-0x90 | 0x8B | 0x89, 0x8A, 0x8C-0x90 (note: 0x88 absent/invalid) |

#### IoControl Commands — Local Only (no wire traffic)

| Command | Function |
|---------|----------|
| `SETECHOFROMRADIO` | Sets echo flag in DLL state |
| `QUERYECHOFROMRADIO` | Reads echo flag from DLL state |
| `SETMAXIMUMTRANSFERSIZE` | Sets max transfer size in DLL state (default 0x28 = 40) |

### Key DLL Functions (esbepservices_dllpackage.dll)

| Address | Function |
|---------|----------|
| `0x61102a70` | IoControl — main entry |
| `0x61102fc0` | GetIoControlRequest — string-to-ID dispatcher (19 commands) |
| `0x61104530` | Command switch — ID-to-handler |
| `0x611043f0` | PutIoControlResponse — writes result to VARIANT |
| `0x61101130` | Opcode validator — switch table for all known opcodes |
| `0x611010e0` | Checksum builder — `0xFF - sum(preceding)` |
| `0x61101090` | Checksum verifier |
| `0x611076d0` | Read memory frame builder |
| `0x61107ab0` | Write memory frame builder |
| `0x61101360` | ACK/NAK reader |
| `0x611013e0` | Response frame parser |

### Protocol State Machine

```
1. Open COM port (serialcomm)
2. Create ESBEP session (max_transfer_size = 40)
3. Configure echo mode (SETECHOFROMRADIO)
4. Query radio identity:
   - QUERYRADIOMODELNUMBER
   - QUERYRADIOSERIALNUMBER
   - QUERYRADIOCODEPLUGVERSION
   - QUERYRADIOCODEPLUGSIZE
5. Verify password (QUERYRADIOPASSWORDCHECK)
6. Read codeplug:
   - ReadDeviceVirtualAddress(addr, len) for each block
   - Using VECT_BLOCK offsets to know where each block lives
7. [Modify in CPS GUI]
8. Write codeplug:
   - WriteDeviceVirtualAddress(addr, len, data) for each block
   - Radio responds ACK (0x84) or NACK (0x85)
9. Set timestamp (SETRADIOLASTPROGRAMMEDTIME)
10. Reset radio (RESETRADIO)
11. Close session
```

### Echo Mode

When echo is enabled, the radio echoes back the exact bytes sent before responding. The CPS verifies the echo byte-by-byte before processing the response.

### Retry Logic

On communication failure:
1. Flush bus: read up to 101 bytes to clear garbage
2. Sleep briefly
3. Retry the command once

### Timeout Calculation

```
timeout_ms = frame_size * 250
```

---

## 6. Serial Port Configuration

### Default Parameters

| Parameter | Value |
|-----------|-------|
| Baud Rate | 9600 (configurable: 110-115200) |
| Data Bits | 8 |
| Parity | None |
| Stop Bits | 1 |
| Flow Control | None |
| RX/TX Buffer | 1024 bytes each |
| Mode | Overlapped I/O with Write-Through |

### Supported Baud Rates

110, 300, 600, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200

### Port Enumeration

COM ports are enumerated from Windows registry: `HKLM\Hardware\DeviceMap\SerialComm`

### IoControl Commands (Serial Layer)

| Command | Description |
|---------|-------------|
| `SETBAUDRATE` / `QUERYBAUDRATE` | Baud rate |
| `SETPARITY` / `QUERYPARITY` | Parity (0=None, 1=Odd, 2=Even, 3=Mark, 4=Space) |
| `SETDATABITS` / `QUERYDATABITS` | Data bits (5, 6, 7, 8) |
| `SETSTOPBITS` / `QUERYSTOPBITS` | Stop bits (0=1, 1=1.5, 2=2) |
| `SETHARDWAREFLOWCONTROL` / `QUERYHARDWAREFLOWCONTROL` | Flow (0=HW, 1=XON/XOFF, 2=None) |
| `FLUSHBUFFERS` | Flush (TXBUFFER, RXBUFFER, TXANDRXBUFFER) |

---

## 7. Radio Model Identification

### Part Number Format

```
[H|M]  [50|65]  [Band]  [Type]  [Channels]  [9|4]  A  [Region]  [Variant]
  |      |        |       |        |           |     |     |        |
  |      |        |       |        |           |     |     |        +-- AN, etc.
  |      |        |       |        |           |     |     +-- Region code
  |      |        |       |        |           |     +-- Fixed
  |      |        |       |        |           +-- Power variant
  |      |        |       |        +-- Channel config
  |      |        |       +-- DC/NC/QC = basic, DF/NF/QF = plus, DH = full keypad
  |      |        +-- Band letter (see below)
  |      +-- Platform (50=standard, 65=Piranha)
  +-- H=Portable, M=Mobile
```

### Band Codes

| Letter | Band | Frequency Range |
|--------|------|-----------------|
| F | Lowband | 66-88 MHz |
| J | VHF1 | 136-162 MHz |
| K | VHF2 | 146-174 MHz |
| N | 350 MHz | 350-380 MHz |
| Q | UHF1 | 403-440 MHz |
| R | UHF2 | 438-470 MHz |
| S | UHF3 | 465-495 MHz |
| T | UHF4 | 490-527 MHz |
| X | UHF (403) | 403-445 MHz |

### Internal Codenames to Products

| Codename | Radio Models | Type | Format |
|----------|-------------|------|--------|
| Guppy | CP040 | Portable, no display | ELP_ELM |
| G2W | CP040 (2W variant) | Portable | ELP_ELM |
| PNK (Piranha No Keypad) | CP140 | Portable, display | ELP_ELM |
| PLK (Piranha Limited Keypad) | CP160 | Portable, limited keypad | ELP_ELM |
| PFK (Piranha Full Keypad) | CP180 | Portable, full keypad | ELP_ELM |
| Marlin | CM140 | Mobile, basic | ELP_ELM |
| Marlin+ / MPLUS | CM160 | Mobile, display | ELP_ELM |
| (S5T platform) | CM340 | Mobile, basic | S5T |
| (S5T platform) | CM360 | Mobile, display | S5T |
| ELT_Ninja | Japan variants | Region-specific | ELP_ELM |
| ELT_MOR | Japan variants | Region-specific | ELP_ELM |

### Prefix to Model Mapping

| Prefix | Models |
|--------|--------|
| H50 | CP040 (Guppy) |
| H65 | CP140, CP160, CP180 (Piranha) |
| M50 | CM140, CM160 (Marlin), CM340, CM360 (S5T) |

---

## 8. Frequency & Signaling Tables

### CTCSS/TPL Code Table

| Freq (Hz) | Code | | Freq (Hz) | Code |
|---:|:---|---|---:|:---|
| 67.0 | XZ | | 151.4 | 5Z |
| 69.3 | WZ | | 156.7 | 5A |
| 71.9 | XA | | 162.2 | 5B |
| 74.4 | WA | | 167.9 | 6Z |
| 77.0 | XB | | 173.8 | 6A |
| 79.7 | WB | | 179.9 | 6B |
| 82.5 | YZ | | 186.2 | 7Z |
| 85.4 | YA | | 192.8 | 7A |
| 88.5 | YB | | 203.5 | M1 |
| 91.5 | ZZ | | 206.5 | 8Z |
| 94.8 | ZA | | 210.7 | M2 |
| 97.4 | ZB | | 218.1 | M3 |
| 100.0 | 1Z | | 225.7 | M4 |
| 103.5 | 1A | | 229.1 | 9Z |
| 107.2 | 1B | | 233.6 | M5 |
| 110.9 | 2Z | | 241.8 | M6 |
| 114.8 | 2A | | 250.3 | M7 |
| 118.8 | 2B | | 254.1 | 0Z |
| 123.0 | 3Z | | | |
| 127.3 | 3A | | | |
| 131.8 | 3B | | | |
| 136.5 | 4Z | | | |
| 141.3 | 4A | | | |
| 146.2 | 4B | | | |

### Channel Step Sizes (kHz)

1.25, 2.100, 2.225, 2.400, 2.500, 3.125, 5.000, 6.25, 6.250, 12.5

---

## 9. Field Enumerations

### Squelch Code Types
`CSQ` (Carrier Squelch), `TPL`/`PL` (Tone Private Line / CTCSS), `DPL` (Digital Private Line / DCS)

### Power Level
`Low`, `High`

### Channel Bandwidth
`12.5` kHz (narrowband), `20` kHz, `25` kHz (wideband)

### Companding Mode
`Disabled`, `Full Companding`, `Full Expansion`, `AGC mode`, `Low-level Expansion`, `Full Compression`

### Signaling Types
`None`, `MDC` (MDC1200), `Quik-Call II`, `DTMF`

### Emphasis Selection
`None`, `De-Emphasis`, `Pre-Emphasis`, `De-Emphasis and Pre-Emphasis`

### Unmute/Mute Rules
`Std Unmuting, Std Muting`, `And Unmuting, Std Muting`, `And Unmuting, Or Muting`

### Squelch Setting
`Normal`, `Tight`

### Busy Channel Lockout
`Disabled`, `On Busy Channel`, `On Busy Channel With Wrong PL Code`

### Talkaround Mode
`Auto`, `Repeater`, `Talkaround`

### Button Functions (Programmable)
- Unassigned
- Emergency On/Off
- Monitor / Sticky Permanent Monitor
- Volume Set
- Battery Indicator
- Toggle System Scan On/Off
- Nuisance Delete
- Toggle High/Low Power
- Toggle Keypad Lock On/Off
- Toggle Repeater/Talkaround
- Toggle Tight/Normal Squelch
- Toggle Option Board On/Off
- Phone Mode / Phone Speed Dial
- Radio Call
- All Group Scan
- Voice Storage (Exit/Record/Playback/Delete)
- Light / Backlight Control
- Status / Message
- One Touch 1-8
- Channel Down / Direct Channel / Home Channel / Zone
- Open Squelch
- External Alarm Toggle
- Display Clock
- Toggle Voice Operated Tx (VOX)
- Call Stack
- Toggle Answer Mode
- Scan List Edit
- Tx Inhibit Quick Key Override
- Radio Lock
- Voice Scrambling Option Interface
- Call Alert Tone Tag
- Selective Call Tone Tag
- Flat Tx Audio

### Quik-Call II Call Formats
`A-B`, `A-B/A-C`, `A-B/C-B`, `A-B/Long B`, `A-B/Long C`, `A-B/A-C/Long C`, `A-B/Long B/Long C`, `A-B/A-C/Long B/Long C`, `A-B/A-D/C-D`, `A-B/C-D`

### Option Board Types
`Disabled`, `Simple Decoder`, `Simple Option Interface`, `Advanced Option Interface`, `Voice Storage`, `Advanced and Voice Storage`

### Time-Out Timer Values
0 (Disabled), 15-180 seconds (in steps), "Infinite"

---

## 10. Implementation Notes

### Reading a .cps File (Pseudocode)

```python
def read_cps_file(path: str) -> dict:
    # Step 1: Decode XOR obfuscation
    with open(path, 'rb') as f:
        raw = f.read()
    xml_str = bytes(b ^ 0x95 for b in raw).decode('utf-8')

    # Step 2: Parse XML
    root = parse_xml(xml_str)

    # Step 3: Determine variant
    if root.tag == 'ELP_ELM_CODEPLUG':
        return parse_elp_elm(root)
    elif root.tag == 'S5T_CODEPLUG':
        return parse_s5t(root)

def parse_elp_elm(root):
    codeplug = {}
    # Read-only region
    rro = root.find('RRO')
    codeplug['model_def'] = parse_block(rro, 'MDF_BLOCK')
    codeplug['radio_info'] = parse_block(rro, 'RI_BLOCK')

    # Read-write region
    rrw = root.find('RRW')
    codeplug['channels'] = parse_list_block(rrw, 'CP_BLOCK')
    codeplug['radio_config'] = parse_block(rrw, 'RC_BLOCK')
    codeplug['buttons'] = parse_block(rrw, 'CB_BLOCK')
    # ... etc for all blocks
    return codeplug

def parse_s5t(root):
    codeplug = {}
    rrw = root.find('RRW')
    codeplug['radio_info'] = parse_block(rrw, 'S5_RADIO_INFO_BLOCK')
    codeplug['channels'] = parse_list_block(rrw, 'S5_CHANNEL_LIST_BLOCK')
    codeplug['personalities'] = parse_list_block(rrw, 'S5_PERSONALITY_LIST_BLOCK')
    # ... etc
    return codeplug
```

### Programming a Radio (Pseudocode)

```python
def program_radio(port: str, codeplug: dict):
    # Step 1: Open serial port
    serial = open_serial(port, baud=9600, bits=8, parity='N', stop=1)

    # Step 2: Create ESBEP session
    esbep = ESBEPSession(serial, max_transfer=40)

    # Step 3: Identify radio
    model = esbep.io_control('QUERYRADIOMODELNUMBER')
    serial_num = esbep.io_control('QUERYRADIOSERIALNUMBER')
    cp_size = esbep.io_control('QUERYRADIOCODEPLUGSIZE')

    # Step 4: Verify password
    esbep.io_control('QUERYRADIOPASSWORDCHECK', password)

    # Step 5: Write codeplug blocks using vector offsets
    for block_name, offset in codeplug['vectors'].items():
        data = serialize_block(codeplug[block_name])
        esbep.write_virtual_address(offset, len(data), data)
        # Expect ACK (0x84), retry on NACK (0x85)

    # Step 6: Update timestamp
    esbep.io_control('SETRADIOLASTPROGRAMMEDTIME', now())

    # Step 7: Reset radio
    esbep.io_control('RESETRADIO')
    esbep.close()

def build_read_frame(address: int, length: int, absolute: bool = False) -> bytes:
    frame = bytearray(7)
    frame[0] = 0xF5
    frame[1] = 0x11
    frame[2] = (address >> 8) & 0xFF  # addr high (big-endian)
    frame[3] = address & 0xFF         # addr low
    frame[4] = length
    frame[5] = 0x80 if absolute else 0x00
    frame[6] = (0xFF - sum(frame[:6])) & 0xFF  # one's complement checksum
    return bytes(frame)

def build_write_frame(address: int, data: bytes) -> bytes:
    if len(data) + 4 < 16:  # Short frame
        total = len(data) + 6
        frame = bytearray(total)
        frame[0] = 0xF0 | (len(data) + 4)
        frame[1] = 0x17
        frame[2] = 0x00  # flags
        frame[3] = (address >> 8) & 0xFF
        frame[4] = address & 0xFF
        frame[5:5+len(data)] = data
        frame[-1] = (0xFF - sum(frame[:-1])) & 0xFF
        return bytes(frame)
    else:  # Extended frame
        # ... extended frame construction
        pass

def verify_checksum(frame: bytes) -> bool:
    return sum(frame) & 0xFF == 0xFF
```

### Key Differences: ELP_ELM vs S5T

| Feature | ELP_ELM | S5T |
|---------|---------|-----|
| Radios | CM140, CM160, CP0xx | CM340, CM360 |
| RRO section | MDF_BLOCK + RI_BLOCK | Empty |
| Block ID range | 1-743 | 2002-2866 |
| Frequency storage | Absolute MHz strings | VRIS base + increment |
| Entry headers | ENTRY_HEADER/SIZE/QUANTITY | Checksum/Dimension/Size |
| Channel block | CP_BLOCK (ID 38) | S5_CHANNEL_LIST_BLOCK (ID 2018) |
| Vector count | 56 | 32 |
| Typical file size | 27-50 KB | 78-101 KB |
| XML handler DLL | xmlxslhandler.dll | s5xmlxslhandler.dll |

### Localization System

Report templates use `^NNNN^` token substitution. Tokens are defined in `reportenglish.mot` (and language variants):

| Range | Category |
|-------|----------|
| 0000-0099 | Common (Enabled/Disabled, buttons, fields) |
| 0100-0199 | Customer Handout |
| 0200-0299 | Summary Report |
| 0300-0399 | Personalities Summary |
| 0400-0599 | Detailed Report |
| 0600-0699 | Logic choices |
| 0700 | Decimal separator |
| 0800-0899 | LTR fields |
| 0900-0999 | ATIS/SDT (Japan) |
| 2000-2004 | S5 common |
| 3000-3268 | S5 detailed report |

Fields prefixed with `X_` (e.g., `X_MODEL`, `X_CP_RXONLY`) are computed display fields created by the pretransform XSL, not raw codeplug data.

---

## License Note

This document is the result of clean-room reverse engineering of abandoned Motorola software for interoperability purposes. The Motorola Commercial Series radios documented here are legacy/EOL products. This documentation is provided for the purpose of creating open-source tools to maintain and program these radios.
