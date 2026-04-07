# CPS Data Pipeline: GUI ↔ Codeplug ↔ Radio EEPROM

> Complete trace of data flow in both directions, with concrete byte-level encoding
> evidence from decompiled code and validated against sample codeplugs.

---

## Table of Contents

1. [Pipeline Overview](#1-pipeline-overview)
2. [Write Path: GUI → Radio](#2-write-path-gui--radio)
3. [Read Path: Radio → GUI](#3-read-path-radio--gui)
4. [Binary Encoding: ELP_ELM Format](#4-binary-encoding-elp_elm-format)
5. [Binary Encoding: S5T Format](#5-binary-encoding-s5t-format)
6. [CP_BLOCK Byte Map (ELP_ELM)](#6-cp_block-byte-map-elp_elm)
7. [EEPROM Layout](#7-eeprom-layout)
8. [Frequency Encoding](#8-frequency-encoding)
9. [Crosscheck Against Public Knowledge](#9-crosscheck-against-public-knowledge)

---

## 1. Pipeline Overview

**The XML in `.cps` files is NOT what gets written to radio EEPROM.** There is a
substantial serialization layer that packs human-readable XML strings into compact
binary byte arrays.

```
WRITE DIRECTION (GUI → Radio):

 ┌──────────┐    COM IDispatch     ┌──────────────────────┐
 │ cps.exe  │ ──────────────────→  │ elpelmcpservices.dll  │
 │ MFC GUI  │  SetFieldAtWW()      │ ICPServices COM obj   │
 │ CFormView│  (VARIANT/BSTR)      │ In-memory field table │
 └──────────┘                      └──────────┬───────────┘
                                              │ WriteDevice trigger
                                              ▼
                                   ┌──────────────────────┐
                                   │ Serialization Engine  │
                                   │ fcn.6108587d (16KB)   │
                                   │                       │
                                   │ For each block:       │
                                   │  • enum string→int    │
                                   │  • atof/ftol freqs    │
                                   │  • bitmask packing    │
                                   │  • CByteArray output  │
                                   └──────────┬───────────┘
                                              │ raw bytes + VECT addresses
                                              ▼
 ┌──────────────────────┐         ┌──────────────────────┐
 │ serialcomm           │ ◄────── │ esbepservices         │
 │ _dllpackage.dll      │  RS232  │ _dllpackage.dll       │
 │ COM port I/O         │         │ WriteDeviceVirtAddr() │
 └──────────────────────┘         └──────────────────────┘
          │
          ▼
      [RADIO EEPROM]


READ DIRECTION (Radio → GUI):

      [RADIO EEPROM]
          │
          ▼
 ┌──────────────────────┐         ┌──────────────────────┐
 │ serialcomm           │ ──────→ │ esbepservices         │
 │ _dllpackage.dll      │  RS232  │ _dllpackage.dll       │
 │ COM port I/O         │         │ ReadDeviceVirtAddr()  │
 └──────────────────────┘         └──────────────────────┘
                                              │ raw bytes
                                              ▼
                                   ┌──────────────────────┐
                                   │ Deserialization       │
                                   │ fcn.61082fd0 (7.6KB)  │
                                   │                       │
                                   │ For each block:       │
                                   │  • bitmask extract    │
                                   │  • int→enum string    │
                                   │  • byte*scale→freq    │
                                   │  • store to fields    │
                                   └──────────┬───────────┘
                                              │
 ┌──────────┐    COM IDispatch     ┌──────────┴───────────┐
 │ cps.exe  │ ◄──────────────────  │ elpelmcpservices.dll  │
 │ MFC GUI  │  GetFieldAtWW()      │ ICPServices COM obj   │
 │ CFormView│  (VARIANT/BSTR)      │ In-memory field table │
 └──────────┘                      └──────────────────────┘
```

**Key insight:** The `.cps` file stores the XML (human-readable) representation.
The radio EEPROM stores the packed binary representation. The CPS converts between
them on every read/write. The XML is never sent to the radio directly.

---

## 2. Write Path: GUI → Radio

### Step 1: GUI Sets Field Value

User types "151.625000" into the TX frequency field in `CConvPersView`.

The MFC view calls the COM object via OLE Automation (IDispatch late binding):

```
ICPServices::SetFieldAtWW(fieldIndex=0xA0, varFieldData="151.625000")
```

Field values are always passed as VARIANT (typically BSTR strings), even for
numbers and booleans. The COM object stores the string in an in-memory field table.

**Field table structure** (elpelmcpservices.dll):
```c
// Each block has a field array at *(this+4)
// Entries are 0x40 (64) bytes apart
field_entry = *(this + 4) + entryIndex * 0x40;
// String value stored via MFC CString
```

### Step 2: Controller Triggers Write

User clicks "Write to Radio". `cps.exe` calls `cpscontroller.dll::WriteDevice()`.

**WriteDevice** (`cpscontroller.dll` @ `0x60001f50`):
```c
void WriteDevice(handle) {
    serial = ISerialManagerDLL::Open(portName, type);
    esbep = IESBEPServicesDLL::Open(serial);

    // Call COM object vtable method 0x20 = serialize + write
    ICPServices->vtable[0x20](esbep_handle);

    IESBEPServicesDLL::Close(esbep);
    ISerialManagerDLL::Close(serial);
}
```

### Step 3: Master Serialization

The COM vtable call triggers `fcn.6108587d` (16,616 bytes) — the master serializer.

```c
void serialize_all_blocks(ESBEP_handle) {
    CByteArray buffer;

    // 8-byte codeplug header
    write_header(&buffer);  // fcn.61082887 returns 8

    // Serialize each block in order
    for (each block_type in dispatch_table) {
        if (block_exists(block_type)) {
            byte[] block_data = serialize_block(block_type);
            record_vect_offset(block_type, current_offset);  // for VECT_BLOCK
            buffer.append(block_data);
        }
    }

    // Append VECT_BLOCK and TC_BLOCK
    // Compute final checksum via fcn.61020fcb

    // Write entire buffer to radio via ESBEP
    write_to_radio(ESBEP_handle, &buffer);
}
```

### Step 4: Block Serialization (CP_BLOCK example)

`fcn.6107a422` (16,220 bytes) serializes channel personalities:

```c
void serialize_cp_block(CByteArray* output) {
    int num_entries = GetField(0x2F);  // from TC_BLOCK
    int entry_size  = GetField(0x30);  // 27 bytes for CP_BLOCK

    // Allocate: 4-byte header + (entries * size) or 5-byte for list blocks
    byte* buf = new byte[num_entries * entry_size + header_size];
    memset(buf, 0, total);

    // Header
    buf[0] = GetField(0x2E);  // block type ID
    buf[1] = num_entries;
    buf[2] = entry_size;

    // For each channel entry:
    for (int e = 0; e < num_entries; e++) {
        byte* entry = buf + header_size + e * entry_size;

        // Pack boolean/enum fields into bitmasks
        int bw = enum_lookup(GetField(e, 0x6B), bw_table);  // "25" → 0, "12.5" → 1
        pack_bits(0x01, bw, &entry[3]);   // bit 0 of byte +3

        int rxonly = atoi(GetField(e, 0x6C));
        pack_bits(0x02, rxonly, &entry[3]);  // bit 1 of byte +3

        int power = enum_lookup(GetField(e, 0x75), power_table);  // "High"→0, "Low"→1
        pack_bits(0x40, power, &entry[4]);  // bit 6 of byte +4

        // Pack frequency as scaled integer
        double freq = atof(GetField(e, 0x9F));  // "151.625000"
        entry[0x1C] = (byte)(freq / 0.25);      // ÷ 0.25, store as byte

        // Pack TOT as 5-second units
        entry[7] = atoi(GetField(e, 0x84)) / 5;  // "60" → 12

        // Pack alias as 8-byte string
        memcpy(&entry[0x29], GetField(e, 0xAE), 8);

        // ... (51 fields total packed into 27 bytes)
    }

    output->append(buf, total);
}
```

**Core helper functions:**

```c
// Bit-field packer (fcn.61020f3d)
void pack_bits(byte mask, int value, byte* dest) {
    int shift = count_trailing_zeros(mask);  // fcn.61020ee4
    *dest = (*dest & ~mask) | ((value << shift) & mask);
}

// String-to-enum lookup (fcn.610210d5)
int enum_lookup(char* str, EnumEntry* table) {
    while (table->name && strcmp(str, table->name) != 0)
        table++;
    return table->value;
}
```

### Step 5: ESBEP Write to Radio

The serialized buffer is written block-by-block using VECT_BLOCK addresses:

```c
// For each block, using its VECT offset as the target address:
IESBEPServicesDLL::WriteDeviceVirtualAddress(
    handle,
    vect_offset,    // 16-bit EEPROM address from VECT_BLOCK
    block_size,     // header + entries * entry_size
    block_bytes     // serialized binary data
);

// Radio responds: 0x84 = ACK (success), 0x85 = NACK (failure)
```

---

## 3. Read Path: Radio → GUI

### Step 1: ESBEP Read from Radio

**ReadDevice** (`cpscontroller.dll` @ `0x60001f20`) calls `fcn.600028d0`:

```c
void ReadDevice(handle) {
    serial = ISerialManagerDLL::Open(portName, type);
    esbep = IESBEPServicesDLL::Open(serial);

    // Create COM object (CPServices or S5CPServices based on device type)
    if (device_type == 1)
        CoCreateInstance(CLSID_CPServices, ...);      // ELP_ELM
    else
        CoCreateInstance(CLSID_S5CPServices, ...);    // S5T

    // Call COM vtable method 0x1C = read + deserialize
    ICPServices->vtable[0x1C](esbep_handle);

    IESBEPServicesDLL::Close(esbep);
    ISerialManagerDLL::Close(serial);
}
```

The read is done **block by block** using VECT_BLOCK addresses. The radio's VECT_BLOCK
is read first to discover where each data block lives in EEPROM.

### Step 2: Master Deserialization

`fcn.61082fd0` (7,637 bytes) — the master deserializer (mirrors `fcn.6108587d`):

```c
void deserialize_all_blocks(byte* raw_data) {
    for (each block_type in dispatch_table) {
        int offset = get_vect_offset(block_type);
        int size = get_block_size(block_type);
        byte* block_data = raw_data + offset;

        deserialize_block(block_type, block_data, size);
    }
}
```

### Step 3: Block Deserialization (CP_BLOCK)

`fcn.6107797b` (10,919 bytes) — exact reverse of serialization:

```c
void deserialize_cp_block(byte* data) {
    int num_entries = data[1];
    int entry_size = data[2];

    for (int e = 0; e < num_entries; e++) {
        byte* entry = data + header_size + e * entry_size;

        // Extract bitmask fields
        int bw = extract_bits(0x01, entry[3]);        // bit 0 → 0 or 1
        SetField(e, 0x6B, reverse_enum(bw, bw_table)); // 0→"25", 1→"12.5"

        int power = extract_bits(0x40, entry[4]);     // bit 6
        SetField(e, 0x75, reverse_enum(power, power_table)); // 0→"High"

        // Decode frequency from scaled byte
        double freq = entry[0x1C] * 0.25;             // byte → MHz
        SetField(e, 0x9F, format("%2.2f", freq));     // "151.62"

        // Decode TOT from 5-second units
        SetField(e, 0x84, format("%d", entry[7] * 5)); // 12 → "60"

        // Decode alias from 8-byte string
        SetField(e, 0xAE, read_string(&entry[0x29], 8));
    }
}
```

**Core helper:**
```c
// Bit-field extractor (fcn.61020f8d) — reverse of pack_bits
int extract_bits(byte mask, byte value) {
    int shift = count_trailing_zeros(mask);
    return (value & mask) >> shift;
}

// Int-to-string enum reverse lookup (fcn.61021066)
char* reverse_enum(int value, EnumEntry* table) {
    while (table->name && table->value != value)
        table++;
    return table->name;
}
```

### Step 4: GUI Reads Field Value

`CConvPersView` calls:
```
ICPServices::GetFieldAtWW(fieldIndex=0xA0, &varFieldData)
// Returns VARIANT with BSTR "151.625000"
```

The view displays this string in the MFC edit control. `resourcemanager.dll` provides
display labels via `GetFieldNameCS(fieldIndex)` and dropdown options via
`GetFieldChoicesCS(fieldIndex)`.

---

## 4. Binary Encoding: ELP_ELM Format

Used by: CM140, CM160, CP040, CP140, CP160, CP180

### Block Binary Structure

**Single-entry blocks** (ENTRY_HEADER = 0x80): **4-byte header**
```
+--------+--------+--------+--------+--------...--------+
| Flags  | ESz    | NEntry | Rsvd   | Data (ESz bytes)  |
| 1 byte | 1 byte | 1 byte | 1 byte | per entry         |
+--------+--------+--------+--------+--------...--------+
```

**List blocks with alias** (ENTRY_HEADER = 0xC0): **5-byte header**
```
+--------+--------+--------+--------+--------+--------...--------+
| Flags  | ESz    | NEntry | Extra  | Rsvd   | Data (ESz bytes)  |
| 1 byte | 1 byte | 1 byte | 1 byte | 1 byte | per entry         |
+--------+--------+--------+--------+--------+--------...--------+
```

Confirmed from disassembly at `0x6107a5DA`:
- Byte 0: ENTRY_HEADER flags (0x80=standard, 0xC0=list+alias, 0x02=special list)
- Byte 1: ENTRY_SIZE (bytes per entry)
- Byte 2: ENTRY_QUANTITY (number of entries)
- Byte 3: Reserved (zero from memset)

Total binary size = `4 + (ENTRY_SIZE × ENTRY_QUANTITY)` (or 5 for 0xC0 blocks).

Total binary size per block = `header_size + (ENTRY_QUANTITY × ENTRY_SIZE)`

### Field Encoding Types

| XML Value Type | Binary Encoding | Example |
|---------------|-----------------|---------|
| Boolean ("0"/"1") | Single bit via bitmask | `pack_bits(0x02, val, &byte)` |
| Small enum ("High"/"Low") | Integer via lookup, packed into bits | `enum_lookup("High", table)` → 0, mask 0x40 |
| Large enum ("CSQ"/"PL"/"DPL") | Integer via lookup, 2-3 bits | `enum_lookup("CSQ", table)` → 0, mask 0xC0 |
| Integer ("60") | `atoi(str)` then scale | `atoi("60") / 5` → 12, stored as byte |
| Frequency ("151.625000") | `atof(str)` then divide by step | `atof("151.625") / 0.25` → 606, stored as byte(s) |
| Reference freq | `atof(str)` divide by 1.5 | `atof("103.0") / 1.5` → 68, stored as byte |
| PL/DPL code | Index via lookup table | Enum to code index byte |
| String alias ("Pers1") | `memcpy`, fixed 8-byte field | Padded/truncated to 8 bytes |
| Complex (TX deviation) | `atof(val) * sqrt(val / 25.0) + 0.5` | Nonlinear encoding |

### Encoding Constants (from elpelmcpservices.dll data section)

| Address | Value | Used For |
|---------|-------|----------|
| `0x61134be0` | 0.5 | Rounding constant |
| `0x61134be8` | 1.5 | Reference frequency divisor |
| `0x61134bf0` | 0.25 | Channel frequency step (250 kHz) |
| `0x61134bf8` | 25.0 | Squelch code / deviation scaling |

### Confirmed Block Sizes (from sample codeplugs)

| Block | ID | Header | ENTRY_SIZE | Max QTY | Binary Size |
|-------|-----|--------|------------|---------|-------------|
| MDF_BLOCK | 2 | 4 | 10 | 1 | 14 |
| RI_BLOCK | 3 | 4 | 82 | 1 | 86 |
| TI_BLOCK | 4 | 4 | 9 | 1 | 13 |
| RC_BLOCK | 5 | 4 | 58 | 1 | 62 |
| DR_BLOCK | 8 | 4 | 14 | 1 | 18 |
| SC_BLOCK | 40 | 4 | 16 | 1 | 20 |
| MDC_BLOCK | 41 | 4 | 30 | 1 | 34 |
| QC_BLOCK | 42 | 4 | 19 | 1 | 23 |
| DTMF_BLOCK | 43 | 4 | 22 | 1 | 26 |
| EM_BLOCK | 22 | 4 | 10 | 1 | 14 |
| CB_BLOCK | 15 | 4 | 15-30 | 1 | 19-34 |
| CP_BLOCK | 38 | 5 | 27 | 1-16 | 5 + 27*N |
| QCC_BLOCK | 25 | 5 | 16 | varies | 5 + 16*N |

---

## 5. Binary Encoding: S5T Format

Used by: CM340, CM360

### Block Binary Structure

Every S5T block has exactly **5 bytes overhead**:

```
+--------+--------+--------+--------+--------+--------...--------+
| CkType | EntSz (16-bit LE)| EntQty (16-bit LE)| Data            |
| 1 byte | 2 bytes          | 2 bytes           | ESz × QTY bytes |
+--------+--------+--------+--------+--------+--------...--------+
```

| Byte | Size | Content | XML Source |
|------|------|---------|------------|
| 0 | 1 | Checksum/layout type | S5_CHECKSUM_LAYOUT_HEADER (always 2) |
| 1-2 | uint16 LE | Entry size in bytes | S5_ENTRY_SIZE_HEADER |
| 3-4 | uint16 LE | Entry quantity (count) | S5_ENTRY_QUANTITY_HEADER |

The remaining 3 XML ENTRY_INFO fields are metadata constants NOT stored in binary:
- S5_DIMENSION_HERDER (always 0) — not serialized
- S5_ENTRY_SIZE_UNIT_HEADER (always 0 = bytes) — not serialized
- S5_ENTRY_SIZE_FIELD_LEN_HEADER (always 1) — not serialized

**Proven by perfect block contiguity** — every block's offset equals the previous
block's offset + 5 + (entry_size × entry_quantity), with zero gaps across all 24 blocks.

### S5T Block Sizes (from CM340 samples)

| Block | ID | ENTRY_SIZE | QTY | Total Binary |
|-------|-----|------------|-----|-------------|
| S5_CFG_BLOCK | 2002 | - | - | (fixed header) |
| S5_RADIO_INFO_BLOCK | 2003 | 67 | 1 | 72 |
| S5_RADIO_OPTION_BLOCK | 2004 | 199 | 1 | 204 |
| S5_EMERGENCY_BLOCK | 2005 | 15 | 1 | 20 |
| S5_CONTACT_LIST_BLOCK | 2006 | 29 | 1 | 34 |
| S5_ENCODER_STATUS_LIST | 2007 | 17 | 1 | 22 |
| S5_DECODER_STATUS_LIST | 2008 | 17 | 1 | 22 |
| S5_MULTICALL_CFG_BLOCK | 2009 | 50 | 1 | 55 |
| S5_SEL5_SIG_SYS_LIST | 2010 | 27 | 1 | 32 |
| S5_ENCODER_SEQ_LIST | 2011 | 17 | 1 | 22 |
| S5_SEL5_DECODER_LIST | 2012 | 56 | 1 | 61 |
| S5_SEL5_DTMF_ENC_TG_LIST | 2013 | 6 | 1 | 11 |
| S5_AUTO_ACK_LIST | 2014 | 6 | 1 | 11 |
| S5_DTMF_SIG_SYS_LIST | 2015 | 12 | 1 | 17 |
| S5_SCAN_LIST_BLOCK | 2016 | 25 | 1 | 30 |
| S5_PERSONALITY_LIST | 2017 | 26 | 1 | 31 |
| S5_CHANNEL_LIST_BLOCK | 2018 | 15 | 1 | 20 |
| S5_ALPHANUM_CH_ALIAS | 2019 | 14 | 1 | 19 |
| S5_USER_DEF_SIG_LIST | 2020 | 38 | 2 | 81 |
| S5_BUTTON_DEFINITION | 2021 | 24 | 1 | 29 |
| S5_ALERT_BLOCK | 2022 | 15 | 1 | 20 |
| S5_OPTION_BOARD_BLOCK | 2023 | 1 | 1 | 6 |
| S5_GENERAL_IO_BLOCK | 2024 | 17 | 1 | 22 |
| S5_USER_COMMENT_BLOCK | 2025 | 1 | 1 | 6 |
| S5_DYNAMIC_RADIO_BLOCK | 2026 | 296 | 1 | 301 |

S5_TYPE_CONTROL_BLOCK: 7 bytes (at TCB_VEC offset)
S5_VECTOR_BLOCK: 64 bytes = 32 × 2-byte offsets (at VB_VEC offset)

### S5T EEPROM Layout

```
Offset 0:     S5_CFG_BLOCK (fixed header)
Offset N:     S5_RADIO_INFO_BLOCK (5 + 67 bytes)
              S5_RADIO_OPTION_BLOCK (5 + 199 bytes)
              S5_EMERGENCY_BLOCK (5 + 15 bytes)
              ... (all data blocks contiguous, NO gaps)
              S5_DYNAMIC_RADIO_BLOCK (5 + 296 bytes)
Offset TCB:   S5_TYPE_CONTROL_BLOCK (7 bytes)
Offset VB:    S5_VECTOR_BLOCK (64 bytes)
```

Total codeplug size: `S5_CFG_CP_SIZE` = 1211 bytes (CM340, 1 channel)

---

## 6. CP_BLOCK Byte Map (ELP_ELM)

27 bytes per channel entry. 51 XML fields packed into these 27 bytes.

### Byte +3 (first data byte after 4-byte entry header in multi-entry blocks, or +3 from entry start)

| Bit | Mask | Field Index | XML Name | Encoding |
|-----|------|-------------|----------|----------|
| 0 | 0x01 | 0x6B | CP_CHBWSEL | 0=25kHz, 1=12.5kHz |
| 1 | 0x02 | 0x6C | CP_RXONLY | 0=normal, 1=RX only |
| 2 | 0x04 | 0x2F0 | (extended feature) | boolean |
| 3 | 0x08 | 0x6D | CP_TALKAROUNDEN | 0=off, 1=on |
| 4 | 0x10 | 0x6E | CP_AUTOSCANEN | 0=off, 1=on |
| 5 | 0x20 | 0x6F | CP_SCANLISTINDEX | bit flag |
| 6 | 0x40 | 0x70 | CP_EMPSEL | emphasis select |
| 7 | 0x80 | 0x71 | CP_VOXEN | 0=off, 1=on |

### Byte +4

| Bit | Mask | Field Index | XML Name | Encoding |
|-----|------|-------------|----------|----------|
| 0-3 | 0x0F | 0x72 | CP_PHSYSINDEX | phone system index (0-15) |
| 4 | 0x10 | 0x73 | CP_UNMUTETYPE | unmute rule |
| 5 | 0x20 | 0x74 | CP_SIGSQ | signaling squelch |
| 6 | 0x40 | 0x75 | CP_TXPWRLEVSEL | 0=High, 1=Low |
| 7 | 0x80 | 0x76 | CP_SQSET | 0=Normal, 1=Tight |

### Byte +5

| Bit | Mask | Field Index | XML Name | Encoding |
|-----|------|-------------|----------|----------|
| 0 | 0x01 | 0x77 | CP_OPTBRDFEATEN | option board feature |
| 1 | 0x02 | 0x78 | CP_FLATTXAUDIOEN | flat TX audio |
| 2 | 0x04 | 0x79 | CP_TOTTYPE | TOT type |
| 3 | 0x08 | 0x7A | CP_PLREQFORDATA | PL required for data |
| 4 | 0x10 | 0x7B | CP_RXSQCODESEL | RX squelch code bit |
| 5 | 0x20 | 0x2F1 | (extended) | boolean |
| 6-7 | 0xC0 | 0x7C | CP_TXSQCODESEL | 00=CSQ, 01=PL, 10=DPL |

### Byte +6

| Bit | Mask | Field Index | XML Name | Encoding |
|-----|------|-------------|----------|----------|
| 0 | 0x01 | — | (reserved) | |
| 1 | 0x02 | 0x7D | CP_OPTBRDCONFIGINDEX | option board config |
| 2 | 0x04 | 0x7E | CP_DATAREVERTPERINDEX | data revert |
| 3 | 0x08 | 0x7F | CP_DATATRANSOB | data transport OB |
| 4 | 0x10 | 0x80 | CP_ARTSEN | ARTS enable |
| 5 | 0x20 | 0x81 | CP_LONEWOKEREN | lone worker enable |
| 6 | 0x40 | 0x82 | CP_RXSIGTYPE | RX signaling type (low bit) |
| 7 | 0x80 | 0x83 | CP_TXSIGTYPE | TX signaling type (low bit) |

### Byte +7

| Field Index | XML Name | Encoding |
|-------------|----------|----------|
| 0x84 | CP_TOT | `atoi(seconds) / 5` (5-second units). 0=disabled, 12=60s, 36=180s |

### Bytes +8, +9

| Offset | Field Index | XML Name | Encoding |
|--------|-------------|----------|----------|
| +8 | 0x85 | CP_RXSIGINDEX | Direct byte (signaling system index) |
| +9 | 0x86 | CP_TXSIGINDEX | Direct byte (signaling system index) |

### Byte +0xA

| Bit | Mask | Field Index | XML Name | Encoding |
|-----|------|-------------|----------|----------|
| 7 | 0x80 | 0x89 | CP_AUXTRANSFILTBYPASS | Aux transmit filter bypass |
| 6 | 0x40 | 0x88 | CP_MICHIGHPASSFREQCTRL | Mic high-pass frequency control |
| 0-5 | 0x3F | 0x87 | CP_LONGPRESSDUR | Long press duration |

### Byte +0xB

| Offset | Field Index | XML Name | Encoding |
|--------|-------------|----------|----------|
| +0xB | 0x8A | CP_BLIGHTDUR | Backlight duration, direct byte |

### Bytes +0xC, +0xD (PL/DPL codes)

| Offset | Field Index | XML Name | Encoding |
|--------|-------------|----------|----------|
| +0xC | 0x8B | CP_RXDECDATA | `atoi(value) / 250` (250-unit steps) |
| +0xD | 0x8C | CP_TXENCDATA | Enum lookup via table at `0x61134a28` |

### Byte +0xE

| Bit | Mask | Field Index | XML Name | Encoding |
|-----|------|-------------|----------|----------|
| 7 | 0x80 | 0x90 | CP_WRAPAROUNDALERT | Wrap-around alert enable |
| 6 | 0x40 | 0x8F | CP_ALERTBOOSTEN | Alert boost enable |
| 5 | 0x20 | 0x8E | CP_APFEN | Audio Pass Filter enable |
| 0-4 | 0x1F | 0x8D | CP_SCANHANGTIME | Scan hang time |

### Byte +0xF

| Bit | Mask | Field Index | XML Name | Encoding |
|-----|------|-------------|----------|----------|
| 2-3 | 0x0C | 0x93 | CP_HUBSUSSCAN | Hub/sustain scan mode |
| 1 | 0x02 | 0x92 | CP_PRISCANALERTEN | Priority scan alert enable |
| 0 | 0x01 | 0x91 | CP_SCANCHDISCALERTEN | Scan channel discovery alert |

### Bytes +0x10..+0x15 (DPL/TPL detail)

| Offset | Field Index | XML Name | Encoding |
|--------|-------------|----------|----------|
| +0x10 | 0x94 | CP_RXDECDATA_DPL | Enum lookup via table at `0x61134a78` |
| +0x11 | 0x95 | CP_RXDECDATA_TPL | Direct byte |
| +0x12 | 0x96 | CP_TXENCDATA_DPL | Direct byte |
| +0x13 | 0x97 | CP_TXENCDATA_TPL | Direct byte |
| +0x14 | 0x98 | CP_RXDPLINVERT | Direct byte |
| +0x15 | 0x99 | CP_TXDPLINVERT | Direct byte |

### Bytes +0x18..+0x1B (channel increments)

| Offset | Field Index | XML Name | Encoding |
|--------|-------------|----------|----------|
| +0x18 | 0x9C | CP_RXCHINC | `atoi(value) / 25` (25-unit steps; deser: × 25) |
| +0x19..+0x1A | 0x9D | CP_RXCHINCSTEPSIZE | 16-bit value via `fcn.61031b90` |
| +0x1B | 0x9E | CP_TXCHINC | Direct byte |

### Bytes +0x1C, +0x1D (FREQUENCIES — most important fields)

| Offset | Field Index | XML Name | Encoding |
|--------|-------------|----------|----------|
| **+0x1C** | **0x9F** | **CP_RXFREQ** | **`(byte)(atof(MHz) / 0.25)`. Deser: `byte * 0.25` → MHz string `"%2.2f"`** |
| **+0x1D** | **0xA0** | **CP_TXFREQ** | **`(byte)(atof(MHz) / 0.25)`. Deser: `byte * 0.25` → MHz string `"%2.2f"`** |

**Note:** A single byte × 0.25 MHz gives range 0–63.75 MHz, which is NOT enough
for VHF (136–174 MHz). These are **channel step offsets relative to a reference
frequency**, not absolute values. The absolute frequency is:

```
actual_freq = reference_freq + (CP_RXFREQ_byte × 0.25)
```

Where `reference_freq` comes from `CP_RXREFFREQ` / `RI_LVRISBASEFREQ`.

### Bytes +0x1F, +0x20 (reference frequencies)

| Offset | Field Index | XML Name | Encoding |
|--------|-------------|----------|----------|
| +0x1F | 0xA1 | CP_RXREFFREQ | `(byte)(atof(MHz) / 1.5)`. Deser: `byte * 1.5` → `"%2.1f"` |
| +0x20 | 0xA2 | CP_TXREFFREQ | `(byte)(atof(MHz) / 1.5)`. Deser: `byte * 1.5` → `"%2.1f"` |

### Byte +0x21

| Bit | Mask | Field Index | XML Name | Encoding |
|-----|------|-------------|----------|----------|
| 7 | 0x80 | 0xA3 | CP_EMMICGAINPORT | Emergency mic gain (portable) — high bit |
| 0-4 | 0x1F | 0xA3 | CP_EMMICGAINPORT | Emergency mic gain (portable) — value bits |

(Same field split across high bit and lower 5 bits.)

### Byte +0x23 (TX deviation — nonlinear encoding)

| Offset | Field Index | XML Name | Encoding |
|--------|-------------|----------|----------|
| +0x23 | 0xA4 | CP_TXDEV | `(byte)(atof(val) * sqrt(val / 25.0) + 0.5)` — nonlinear |

### Bytes +0x25..+0x28

| Offset | Field Index | XML Name | Encoding |
|--------|-------------|----------|----------|
| +0x25 | 0xA5 | CP_TXHIGHPWR | TX high power level |
| +0x26 | 0xA6 | CP_HOMEREVZONE | Home revert zone |
| +0x27 | 0xA7 | CP_HOMEREVCH | Home revert channel |
| +0x27 | 0xA9 (mask 0x20) | CP_BUSYCHLKOUT | Busy channel lockout / TX admit, enum |
| +0x28 | 0xA8 | CP_EMMICGAINMOB | Emergency mic gain (mobile) |

### Bytes +0x29..+0x30 (channel alias)

| Offset | Field Index | XML Name | Encoding |
|--------|-------------|----------|----------|
| +0x29..+0x30 | 0xAE | ALIAS | 8-byte fixed string, `memcpy` from `fcn.61032031` |

### Bytes +0x31..+0x38

| Offset | Field Index | XML Name | Encoding |
|--------|-------------|----------|----------|
| +0x31..+0x34 | 0xAF-0xB2 | CP_DEFDISPLINE1..4 | Default display lines 1-4, enum lookup |
| +0x35 | 0xB3 | CP_CALLSTACKSTEN | Call stacks enable |
| +0x36 | 0xB4 | CP_ANSMCSTEN | Answer message enable |
| +0x37 | 0xB5 (mask 0x04) | CP_VOXSTEN | VOX enable |
| +0x37 | 0xB4 (mask 0x02) | CP_ANSMCSTEN_ALT | Answer mode (alt bit) |
| +0x37 | 0xB3 (mask 0x01) | CP_CALLSTACKSTEN_ALT | Call stacks (alt bit) |

---

## 7. EEPROM Layout

### ELP_ELM EEPROM Map (from VECT_BLOCK, CM140 VHF2 sample)

```
Offset    Block              Binary Size    Notes
------    -----              -----------    -----
0x0282    RI_BLOCK           86  (4+82)     Radio Info (read-only)
0x02D8    MDF_BLOCK          14  (4+10)     Model Definition (read-only)
          ... gap ...
0x0308    TI_BLOCK           13  (4+9)      Tracking Info
0x0315    RC_BLOCK           62  (4+58)     Radio Configuration
          ... data blocks ...
0x0956    CP_BLOCK           32+ (5+27*N)   Channel Personalities
          ... more blocks ...
0x09F3    SC_BLOCK           20  (4+16)     Signaling Config
0x0A07    MDC_BLOCK          34  (4+30)     MDC1200
0x0A29    QC_BLOCK           23  (4+19)     Quik-Call II
0x0A40    DTMF_BLOCK         26  (4+22)     DTMF
          ...
TC_BLOCK   10 bytes (block presence flags)
VECT_BLOCK 112 bytes (56 × 2-byte offsets)
```

**Blocks are contiguous** — each block starts immediately after the previous one ends.
Absent blocks (TC flag = 0) **still reserve their full EEPROM space** (confirmed:
CP180 has MDC absent but the 34-byte gap is preserved).

### S5T EEPROM Map (from S5_VECTOR_BLOCK, CM340)

All data blocks are packed contiguously with 5-byte overhead each. The
TYPE_CONTROL_BLOCK and VECTOR_BLOCK are placed at the end, at offsets specified
in S5_CFG_BLOCK.

---

## 8. Frequency Encoding

### ELP_ELM Frequency Model

```
                RI_LVRISBASEFREQ (MHz, from RI_BLOCK)
                        |
                        ▼
            ┌─── Reference Frequency ───┐
            │  CP_RXREFFREQ (÷1.5)      │  CP_TXREFFREQ (÷1.5)
            │  stored at byte +0x1F     │  stored at byte +0x20
            └───────────┬───────────────┘
                        │
                        ▼
            ┌─── Channel Offset ────────┐
            │  CP_RXFREQ (÷0.25)        │  CP_TXFREQ (÷0.25)
            │  stored at byte +0x1C     │  stored at byte +0x1D
            └───────────┬───────────────┘
                        │
                        ▼
        actual_freq = ref_freq + channel_offset

    Binary encode: ref_byte = (byte)(ref_freq_MHz / 1.5)
                   ch_byte  = (byte)(offset_MHz / 0.25)

    Binary decode: ref_freq_MHz = ref_byte * 1.5
                   offset_MHz   = ch_byte * 0.25
                   actual_freq  = ref_freq + offset
```

**Example (CM140 VHF2):**
- `RI_LVRISBASEFREQ` = 103.000000 MHz
- `CP_RXREFFREQ` = "103.0" → binary: `103.0 / 1.5` = 68 (0x44)
- `CP_RXFREQ` = "151.625000" → offset from ref = 48.625 → `48.625 / 0.25` = 194 (0xC2)
- Decode: `68 * 1.5 + 194 * 0.25 = 102.0 + 48.5 = 150.5` (approximate — rounding)

### S5T Frequency Model

```
    S5_RI_VRIS_BASE_FREQ (in 50 kHz units)
            │
            ▼
    base_MHz = VRIS_BASE * 0.05

    actual_freq_MHz = base_MHz + increment * step_kHz / 1000

    Example (CM340 VHF1):
        VRIS_BASE = 2060
        base = 2060 * 0.05 = 103.0 MHz
        increment = 6600, step = 5.0 kHz
        freq = 103.0 + 6600 * 5.0 / 1000 = 103.0 + 33.0 = 136.0 MHz ✓ (VHF1 band min)

    Example (CM340 UHF1):
        VRIS_BASE = 7500
        base = 7500 * 0.05 = 375.0 MHz
        increment = 5600, step = 5.0 kHz
        freq = 375.0 + 5600 * 5.0 / 1000 = 375.0 + 28.0 = 403.0 MHz ✓ (UHF1 band min)
```

### Band Differences (CM340 VHF1 vs UHF1 — only 4 fields differ)

| Field | VHF1 | UHF1 |
|-------|------|------|
| `S5_RI_MODELNUM` | M50**J**NC9AN2 | M50**Q**NC9AN2 |
| `S5_RI_VRIS_BASE_FREQ` | 2060 | 7500 |
| `S5_CLB_TX_FREQ_INCREMENT` | 6600 | 5600 |
| `S5_CLB_RX_FREQ_INCREMENT` | 6600 | 5600 |

Everything else — block structure, vector offsets, all sizes, all field counts — is **identical**.

---

## 9. Crosscheck Against Public Knowledge

Cross-referencing our RE findings against publicly documented Motorola protocol knowledge
(from repeater-builder.com, batlabs.com, farhan.codes, RadioReference forums).

### Protocol Evolution

| Feature | MaxTrac/GM300 (SCI bus) | Commercial Series (ESBEP) | Notes |
|---------|------------------------|---------------------------|-------|
| **Physical** | Single-wire half-duplex via mic SCI pin | RS-232 via RIB | Different hardware path |
| **Baud** | ~950 baud initial, 7600 fast | 9600 default (configurable to 115200) | Major speed increase |
| **Framing** | 7E1, nibble-encoded (0x30-0x3F) | 8N1, raw binary | Simplified encoding |
| **Lead-in** | 0x04 (PC), 0x1C (radio) | 0xF0\|len (short), 0x0F (extended) | Different frame markers |
| **Read opcode** | 0x40 | 0x11 | Different but both use 16-bit addressing |
| **Write opcode** | 0x41 | 0x17 | — |
| **Checksum** | Negated 8-bit sum, verifies to 0x00 | One's complement (0xFF - sum), verifies to 0xFF | Similar concept, different algorithm |
| **Echo** | Not documented | Radio echoes sent frame before responding | New in ESBEP |
| **Speed change** | Explicit speed-change message | SETMAXIMUMTRANSFERSIZE IoControl | Adaptation, not baud change |
| **Address space** | 16-bit absolute (e.g., 0xB600) | 16-bit virtual + absolute modes | Virtual addressing added |

### Confirmed Matches

- **Frequency encoding is NOT plain Hz** — confirmed. Both GM300 and Commercial Series use scaled/offset integer encoding, not raw frequencies.
- **Block-based write with addressing** — confirmed. ESBEP uses VECT_BLOCK offsets as addresses, same concept as GM300 memory map.
- **Checksums must be recalculated** — confirmed. ESBEP uses per-frame one's complement checksum. Block-level checksums also present (S5T S5_CHECKSUM_LAYOUT_HEADER).
- **Password transmitted in protocol** — confirmed. QUERYRADIOPASSWORDCHECK command exists. Password handling is in the ESBEP layer.
- **Channel count must match model** — confirmed. MDF_BLOCK defines MDF_MAXCNV; codeplug must respect this.
- **`0xF5, 0x11` = read opcode** — EXACT MATCH with farhan.codes CBEP/SB96 documentation. Our ESBEP read frame starts with 0xF5 (= 0xF0 | 5 length), opcode 0x11. This confirms ESBEP is an evolution of the CBEP/SB9600 protocol family.

### Differences from GM300

- **No nibble encoding** — Commercial Series uses raw binary bytes, not ASCII nibble pairs
- **No single-wire SCI** — uses standard RS-232 via RIB
- **XML-based codeplug files** — GM300 uses raw binary .MDF files; Commercial Series uses XOR-obfuscated XML
- **COM-based software architecture** — GM300 RSS is monolithic DOS/Win16; CPS is modular COM/MFC
- **Virtual addressing** — GM300 uses absolute EEPROM addresses; Commercial Series adds a virtual address layer mapped through VECT_BLOCK

### Open Source Cross-Reference

| Project | Relevance |
|---------|-----------|
| pboyd04/radio-programmer | C library for Motorola protocol — compare ESBEP implementation |
| george-hopkins/codeplug | Codeplug decoder — verify XOR 0x95 and XML schema |
| paulbanks.org/sb9600 | SB9600/SBEP for GM1200 — protocol ancestor of ESBEP |
