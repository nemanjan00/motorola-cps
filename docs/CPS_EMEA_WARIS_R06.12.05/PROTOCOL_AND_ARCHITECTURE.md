# Motorola Professional Radio CPS - Protocol & Architecture

> Reverse engineering documentation for the Waris/Professional Series CPS (GP300/GM300 family)
> Based on: CPS_EMEA_WARIS_R06.12.05 (MDC variant)

## Radio Family

The "Professional" or "Waris" series is a separate radio family from the Commercial Series (CM/CP).

| Model | Type | RF Bands | Signaling |
|-------|------|----------|-----------|
| GP320 | Portable | LB1, LB2, VHF, UHF1, UHF2 | 5-Tone |
| GP330 | Portable | LB1, LB2, VHF, UHF1, UHF2 | 5-Tone |
| GP340 | Portable | LB1, LB2, LB3, 300, 330, VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GP344 | Portable | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GP360 | Portable | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GP366 | Portable | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GP380 | Portable | LB1, LB2, LB3, 300, 330, VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF, Quik-Call II |
| GP388 | Portable | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GM340 | Mobile | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GM360 | Mobile | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GM380 | Mobile | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF, Quik-Call II |

**ATEX variants**: GP340/GP380 have ATEX (explosion-proof) variants for hazardous environments.

**Internal model types** (from ProRadio.exe at offset 0x3D6C40):
- "Waris Portable" — GP3xx portables (original)
- "Waris Mobile" — GM3xx mobiles (original)
- "Waris Portable New" — updated portable variant (mcomProRadNew.dll)
- "Waris Mobile New" — updated mobile variant (mcomProRadMobnew.dll)

**RF Bands** (from string table, `UHF / VHF / Low Band / 220 / 700`):
- Low = Low Band (29-66 MHz, split into LB1/LB2/LB3 sub-bands)
- VHF (136-174 MHz)
- UHF (403-527 MHz, split into UHF1/UHF2)
- 220 MHz band
- 700 MHz band (700MHz Reband capable models)
- 800 MHz band (referenced in `is800MhzRadio`)
- 900 MHz band (referenced but "not currently supported" per error string)

**Supported regions** (from string table at offset 0x3C0750):
- North America
- Latin America
- EMEA
- Asia
- Federal (US government)
- China Ministry of Rail
- Japan

**Codeplug versions supported** (from version table at offset 0x3D6BB0):
- 0.00, 1.00, 2.00, 3.00, 4.00, 5.00, 6.00, 7.00, 8.00, 9.00, 10.00, 11.00
- Also "03.00" (with leading zero, may be a distinct format variant)

**Band frequency encoding** (from function names):
- `PackFrequencyWith5KHzStep` / `UnpackFrequencyWith5KHzStep` — 5 kHz frequency step size
- `PackBaseFreq` / `UnpackBaseFreq` — LVRIS Base Frequency reference
- `frequency_IndexToVal` — index-to-frequency lookup table
- `frequency_IsValInRange` — range validation
- Channel bandwidths: 12.5 kHz and 20/25 kHz

---

## Software Architecture

### Overview

Unlike the Commercial Series CPS (C++/MFC monolith with COM DLLs), the Professional Radio CPS uses a **VB6 + ADK framework** architecture with COM-based protocol and radio abstraction layers.

```
┌─────────────────────────────────────────────┐
│           ProRadio.exe (VB6 GUI)            │
│  Forms, MDI interface, VB6 event handlers   │
└────────────┬────────────────────────────────┘
             │ COM interfaces
┌────────────┴────────────────────────────────┐
│         ADK 5.1 DLL Framework (C++/MFC)     │
│                                             │
│  Rdb41.dll    Radio Database (Amulet)       │
│  Rui41.dll    Radio UI components           │
│  Rcg41.dll    Codeplug Generator (Ccg*)     │
│  Rud41.dll    Radio Upload/Download         │
│  UdcDr41.dll  UI↔DB↔CG Driver Exchange     │
│  Fh41.dll     File Handler (encrypt/save)   │
│  Prn41.dll    Print/Report generation       │
└────────────┬────────────────────────────────┘
             │ COM interfaces
┌────────────┴────────────────────────────────┐
│      Radio Abstraction Layer (COM)          │
│                                             │
│  mcomProRad.dll     Radio.Motorola.Waris    │
│  mcomProRadMob.dll  Radio.Motorola.WarisMobile │
│  mcomUnknown.dll    Radio.Motorola.Unknown  │
└────────────┬────────────────────────────────┘
             │ COM interfaces
┌────────────┴────────────────────────────────┐
│      Protocol Layer (COM Servers)           │
│                                             │
│  VComSbep.dll   Protocol.Motorola.Sbep      │
│  VComESbp.dll   Protocol.Motorola.ESbep     │
│  VcomSb96.dll   Protocol.Motorola.Sb9600    │
└────────────┬────────────────────────────────┘
             │ Win32 serial API / VxD driver
┌────────────┴────────────────────────────────┐
│          Serial Port / RIB Box              │
│  COM1-COM4, RS-232                          │
│  SB9600: \\.\Commsb96 VxD driver            │
└─────────────────────────────────────────────┘
```

### DLL Naming Convention

DLLs have a numeric suffix indicating the radio family:
- **30** = GP300 Series (older, R03.x CPS versions)
- **41** = Waris/Professional Series (R06.x CPS, same radio family but rebranded)

The 30→41 transition consolidated several DLLs:
- GP300 had: `pip30.dll`, `udc30.dll`, `udcX30.dll`, `udcrX30.dll`, `ruiX30.dll`
- Waris merged these into the 41-series core DLLs

### ADK 5.1 Framework

All DLLs are built on Motorola's "Application Development Kit" version 5.1. Key components:
- **Amulet** constraint framework in Rdb41.dll (from CMU — `Am_Object`, `Am_Slot`, `Am_Value`, `Am_Constraint`)
- **Ccg** codeplug framework in Rcg41.dll (pack/unpack, field layout, block structure)
- **CFh** file handling in Fh41.dll (archive format, S-Record, encryption)

### RSS Launcher

A "Motorola Shortcut Bar" (`RSS_LAUNCHER.HLP`) provides a unified launcher for all RSS (Radio Service Software) applications. It can:
- **Open** any valid archive file and auto-find the correct RSS
- **Read Device** from serial port with auto-detection
- **Service Tool** for alignment/tuning

---

## Communication Protocols

The Waris radios support **three** serial protocols (vs one for Commercial Series):

### 1. SBEP (Serial Bus Extension Protocol) — Primary

**COM Server**: `Protocol.Motorola.Sbep` (`VComSbep.dll`)

SBEP is the primary protocol for Waris portables and mobiles. It's the "middle" protocol between SB9600 (simple) and ESBEP (extended).

**SBEP Opcodes** (from string analysis):

| Opcode | Type | Description |
|--------|------|-------------|
| `RESET` | Request | Reset radio |
| `REQ_CHECKSUM` | Request | Request codeplug checksum |
| `RPY_CHECKSUM` | Reply | Checksum response |
| `REQ_CONFIG` | Request | Request configuration |
| `RPY_CONFIG` | Reply | Configuration response |
| `REQ_STATUS` | Request | Request status |
| `RPY_STATUS` | Reply | Status response |
| `REQ_RD_DATA` | Request | Read data block |
| `RPY_RD_DATA` | Reply | Data read response |
| `REQ_WR_DATA` | Request | Write data block |
| `RPY_GOOD_WR` | Reply | Write success |
| `RPY_BAD_WR` | Reply | Write failure |
| `REQ_ERASE_FLASH` | Request | Erase flash memory |
| `REQ_ZERO_FLASH` | Request | Zero flash memory |
| `RPY_UNSUPPORTED` | Reply | Operation not supported |

### 2. ESBEP (Extended SBEP) — Full-featured

**COM Server**: `Protocol.Motorola.ESbep` (`VComESbp.dll`)

ESBEP is the extended protocol with additional commands for diagnostics and alignment.

**ESBEP-only Opcodes** (superset of SBEP):

| Opcode | Type | Description |
|--------|------|-------------|
| `REQ_MODEL_NO` | Request | Query model number |
| `REQ_SERIAL_NO` | Request | Query serial number |
| `REQ_ESERIAL_NO` | Request | Query electronic serial number (ESN) |
| `REQ_UUID` | Request | Query UUID |
| `REQ_SW_VER` | Request | Query software/firmware version |
| `REQ_FW_PART_NO` | Request | Query firmware part number |
| `REQ_CP_VER` | Request | Query codeplug version |
| `REQ_CP_PART_NO` | Request | Query codeplug part number |
| `REQ_CP_SIZE` | Request | Query codeplug size |
| `REQ_IC_VER` | Request | Query IC version numbers |
| `REQ_LAST_PROG` | Request | Query last programmed date |
| `REQ_POWUP_STAT` | Request | Query power-up status |
| `REQ_LOW_BAT_CHK` | Request | Battery check |
| `REQ_RADIO_KEY` | Request | Radio key/password check |
| `REQ_PWD_CHK` | Request | Password verification |
| `REQ_RADSTAT` | Request | Radio status |
| `RPY_RADSTAT` | Reply | Radio status response |
| `REQ_CHANNEL` | Request | Query current channel |
| `REQ_CHAN_STEER` | Request | Channel steering (change channel) |
| `REQ_FRAC_N_FREQ` | Request | Fractional-N frequency query |
| `REQ_TUNE_PARAMS` | Request | Query tuning/alignment parameters |
| `RPY_TUNE_PARAMS` | Reply | Tuning parameters response |
| `REQ_AUTOTUNE` | Request | Auto-tune alignment |
| `REQ_SOFTPOT` | Request | Soft potentiometer adjustment |
| `RPY_SOFTPOT` | Reply | Soft potentiometer response |
| `REQ_TESTMODE` | Request | Enter test mode |
| `REQ_TEST_ENV` | Request | Test environment query |
| `REQ_BUTTON_TST` | Request | Button test |
| `RPY_BUTTON_TST` | Reply | Button test response |
| `REQ_KEYPAD` | Request | Keypad query |
| `REQ_INVOKE` | Request | Invoke operation |
| `REQ_SIG_DET` | Request | Signal detect |
| `REQ_WR_SERNUM` | Request | Write serial number |
| `RPY_WR_SERNUM` | Reply | Write serial number response |
| `RPY_OP_COMPLETE` | Reply | Operation complete |

**Comparison with Commercial Series ESBEP**: The Waris ESBEP has significantly more commands — adds diagnostic/alignment capabilities (AUTOTUNE, SOFTPOT, TESTMODE, BUTTON_TST, KEYPAD, FRAC_N_FREQ, etc.) that the Commercial Series lacks. The Commercial Series ESBEP has only 6 command + 6 response opcodes.

### Commpatch.dll — Communication Patch Layer

`Commpatch.dll` provides a secondary SBEP implementation with direct serial access (`CSbepBroker`, `CSbepComm`, `CWinSerial`). Key details from string analysis:

- **Echo verification**: `CWinSerial::Write: Echo byte %d does not match transmitted character` — confirms echo-back mode
- **SBEP operations**: Read, Write, Erase Flash, Zero Flash, Softpot, Testmode, Tune Parameters, Channel Frequency, Update Serial Number, Radio Status
- **S-Record support**: `SRecord::WriteSrec` / `SRecord::WriteSrecData` — can write codeplug as S-Record
- **Codeplug list access**: `CCodeplug::ReadCpList` — reads structured list blocks from codeplug
- **Serial port**: `CWinSerial::Open` opens `com%u` ports (COM1-COM4)

### 3. SB9600 — Legacy

**COM Server**: `Protocol.Motorola.Sb9600` (`VcomSb96.dll`)

SB9600 is the oldest protocol, from the Saber/MTS2000 era (US Patent 5,551,068). It uses a VxD kernel driver (`\\.\Commsb96` or `\\.\Vcomsb96.vxd`) due to strict timing requirements.

**SB9600 Opcodes**: `MEMREAD`, `MEMWRITE` (direct memory access)

SB9600 is much simpler — it provides raw memory read/write without the structured command set of SBEP/ESBEP.

### Radio Abstraction Commands

The `mcom*.dll` radio abstraction layer translates high-level operations into protocol commands:

| Command | Description | Used By |
|---------|-------------|---------|
| `REQ_MODEL_NO` | Get radio model | All |
| `REQ_SERIAL_NO` | Get serial number | All |
| `REQ_RADIO_KEY` | Get/check radio key | All |
| `REQ_UUID` | Get UUID | All |
| `REQ_TUNE_PARAMS` | Get tuning parameters | Portable + Mobile |
| `REQ_RD_DATA` | Read codeplug data | Portable + Mobile |
| `REQ_WR_DATA` | Write codeplug data | Portable + Mobile |
| `RPY_GOOD_WR` | Write confirmation | Portable + Mobile |
| `RPY_RADSTAT` | Radio status | All |
| `RPY_RD_DATA` | Read data response | Portable + Mobile |

**Unknown radio handler** (`mcomUnknown.dll`): Only queries `REQ_UUID` and `RPY_RADSTAT` via either `Esbep` or `Sb9600WithSbep` protocol — used for radio identification when model is not recognized.

---

## File Formats

### .cpg Archive Format

The Waris CPS uses **`.cpg`** files (not `.cps` like Commercial Series).

**Structure**:
1. **Header**: 800 bytes (0x320) — `MotHeader` struct
2. **Post-header data**: Optional metadata
3. **Encrypted payload**: Codeplug binary data

**MotHeader Layout** (verified from disassembly of CFhFileHeader constructors at Fh41.dll offsets 0x3340 and 0x3500):

```
Offset  Size   Field
0x000   4      Signature DWORD (from global constant at runtime)
0x004   2      Signature WORD (from global constant)
0x006   1      FileType enum (internal: 1-5)
0x007   1      Reserved (zero)
0x008   1      Reserved (zero)
0x009   3      Padding
0x00C   16     UUID (GUID, 128-bit)
0x01C   20     Model Number (ASCII, null-padded, max 20 chars)
0x030   20     Serial Number (ASCII, null-padded, max 20 chars)
0x044   1      Checksum byte (0xFF - sum(all_header_bytes))
0x045   ~70    Copyright: "Requires MOTOROLA Radio Service Software. COPYRIGHT 1996-1997 MOTOROLA"
0x08B   ...    Padding (zeroed)
0x10D   300    Quick Info string (description, null-padded, max 0x12C chars)
0x239   230    Reserved (zeroed)
----
Total: 0x320 = 800 bytes
```

**GetHeaderSize** returns constant 0x320 (verified: `mov eax, 0x320; ret` at offset 0x2920).

**File types supported** (from `CFhFileHandler::GetFileType` and `IsFileTypeSupported`):
- Valid range: 1-5 inclusive
- Type 1: Archive (`.cpg`) — encrypted codeplug archive
- Type 2: S-Record (`.srec`) — Motorola S-Record format (plaintext hex)
- Types 3-5: Unknown (possibly binary image, template, device temporary)

**File dialog filter**: `Archive Files (*.cpg)|*.cpg|(*.srec)|*.srec||`

### .cpg Encryption (CFhEncrypt)

The .cpg file encryption uses a **seeded LCG stream cipher** — significantly more sophisticated than Commercial Series' simple XOR 0x95.

**Algorithm** (verified from disassembly at Fh41.dll offset 0x1580):

```
Linear Congruential Generator (LCG):
  next_state = (state * 85 + 25) & 0xFF
  (multiplier=0x55, increment=0x19, modulus=256)

Disassembly of randomGenerator():
  call getRandomValue       ; eax = state
  mov ecx, eax
  shl ecx, 4               ; ecx = state * 16
  add ecx, eax             ; ecx = state * 17
  lea esi, [ecx+ecx*4+0x19] ; esi = 5 * (state*17) + 25 = 85*state + 25
  and esi, 0xFF            ; mask to byte
  call putRandomValue(esi) ; store new state
  return esi
```

**CFhEncrypt object** (verified): single DWORD field at offset 0 = LCG state (initialized to 0).

**Encryption process**:
1. Generate seed from `time()` → `seed = time() & 0xFF`
2. Initialize LCG with seed via `putRandomValue(seed)`
3. Write 9 bytes of random LCG output as **padding** to output
4. Derive encryption key:
   - `key_seed = (padding[5] + padding[6] - padding[8]) & 0xFF`
   - Initialize LCG with `key_seed`
   - Generate first state byte
5. For each plaintext byte:
   - `encrypted = plaintext XOR state`
   - If result is `0x1A` or `0x1B`: insert escape sequence (`0x1B` + modified byte)
   - Advance LCG state: `state = randomGenerator()`
   - State also feeds back from encrypted output

**Decryption process** (decryptChar at offset 0x1390):
1. Read first 9 bytes (random padding)
2. Extract `padding[5]`, `padding[6]`, `padding[8]`
3. Compute: `key_seed = (padding[5] + padding[6] - padding[8]) & 0xFF`
4. Initialize LCG with `key_seed`, generate first state
5. For each encrypted byte:
   - Handle escape: `0x1B` prefix means next byte is escaped
   - `plaintext = encrypted XOR state`
   - Advance state with feedback: `new_state = (decrypted + randomGenerator() + old_state) & 0xFF`

**LCG sequence example** (seed=0): 25, 102, 247, 28, 101, 162, 227, 120, 241, 30, 15, 20, 189, ...

**Key differences from Commercial Series**:
- Commercial Series: fixed XOR key `0x95`, deterministic, same plaintext → same ciphertext
- Waris: time-seeded LCG, random padding, same plaintext → different ciphertext each save
- Waris has escape sequences for `0x1A`/`0x1B` (which are control characters in the stream)
- Waris: underlying data is binary codeplug image, NOT XML

### S-Record Format

The CPS can also save/load codeplug data as Motorola S-Records (`.srec`). Functions:
- `ReadSRecFile`, `ReadSRLine`, `ReadSRByte` — read S-Record files
- `WriteSRecFile`, `SaveSRecord`, `SaveSRLine`, `SaveSRByte`, `SaveSREnd` — write S-Record files
- `SplitBootAndCpData` — separate boot block from codeplug data

---

## Codeplug Structure (Ccg Framework)

The Waris codeplug uses the **Ccg** (Codeplug Generator) framework from `Rcg41.dll`, which is significantly more structured than the Commercial Series.

### Memory Layout

```
┌──────────────────────────┐
│    Config Info            │ ← CcgCpConfigInfo (model/version ID)
├──────────────────────────┤
│    Type Control Block     │ ← CcgTypeControlBlock (bit flags for present blocks)
├──────────────────────────┤
│    Vector Block           │ ← CcgVectorBlock (offsets to data blocks)
├──────────────────────────┤
│                           │
│    Read-Only Region       │ ← CcgRegionLayout (fixed blocks)
│                           │
├──────────────────────────┤
│                           │
│    Read-Write Region      │ ← CcgRegionLayout (variable blocks)
│                           │
└──────────────────────────┘
```

### Config Info

At the start of the codeplug image. Contains:
- Model index
- Version index
- Codeplug layout standard version
- Config byte sequence

### Type Control Block

A **bit array** where each bit indicates whether a specific data block is present in the codeplug.
- Functions: `GetFirstBitEqualsOne`, `GetNextBitEqualsOne`, `GetSetOrder`
- Minimum size: `GetMinimumSizeOfTypeCtrlBlock()`
- Used to handle radios with different feature sets (a GP320 has fewer blocks than a GP380)

### Vector Block

Similar concept to Commercial Series — contains **offsets** pointing to each data block.
- Functions: `GetVector(blockID, &address)`, `GetNumberOfNonNullVectors`
- Config determines vector size: `GetVectorSizeInBytes()` (2 or 4 bytes per vector)
- Fixed or variable position: `IsFixedVectorBlk()`

### Data Blocks

Two types:
- **OneDimBlock** (1D): Simple array of entries (like Commercial Series blocks)
  - `CcgOneDimBlockLayout`: block ID, entry layout, format, unit type, multi-entry flag, name
  - Entry description: checksum type, dimension-to-follow byte, entry size, fill byte
  
- **TwoDimBlock** (2D): List of lists (e.g., scan lists, zone channel assignments)
  - `CcgTwoDimBlockLayout`: adds max list items, inner entry description
  - Outer dimension: number of lists
  - Inner dimension: entries per list

### Block Layout Details

```
CcgBlockLayout:
  - BlockID (16-bit: byte offset + bit number)
  - EntryLayout (array of field layouts)
  - BlockFmt (format enum)
  - UnitType (byte/bit)
  - StartAddress (fixed address blocks)
  - Name (human-readable block name)

CcgEntryDescLayout:
  - CheckSumLayout (None, Individual, Total)
  - Length byte
  - DimToFollow byte
  - FillByte
  - SizeLength (bytes for size field)
  - MaxPossibleEntrySize

CcgFieldLayout:
  - ByteOffset (within entry)
  - MsbStart (bit position)
  - LengthInBits
```

### Field Types

- **CcgNumField**: Numeric field (integer, bitmask) — `GetValue() → uint`
- **CcgCharField**: Character field (single char, with CharType) — `GetValue() → char`
- **CcgStrField**: String field (multi-char) — `GetValue() → CString`

### Checksum

Two checksum modes per block:
- **Individual**: Each entry has its own checksum (`IsIndividualCheckSum`)
- **Total**: One checksum for the entire block (`IsTotalCheckSum`)

Validation: `ValidataIndividualEntryCheckSum`, `ValidataTotalBlockCheckSum`
Algorithm: `0xFF - sum(bytes)` (same as file header and protocol)

### Pack/Unpack Operations

- **Unpack** (read from radio): `CcgRdkUp::FullUnpack(rawBytes, ...)` → structured blocks
- **Pack** (write to radio): `CcgRdkPk::FillImage(cpLayout, rdkImage, ...)` → raw bytes
- Import/export between radios: `CcgRdkImportInfo`, `CcgRdkExportInfo`
- Space management: `CcgCpSpace` tracks free/used space, fragmentation

### Pack/Unpack Transform Functions

The following transform functions convert between UI values and binary codeplug representation (from ProRadio.exe string analysis):

**Frequency encoding**:
- `PackFrequencyWith5KHzStep` / `UnpackFrequencyWith5KHzStep` — main frequency fields (5 kHz resolution)
- `PackBaseFreq` / `UnpackBaseFreq` — LVRIS base frequency reference
- `PackBandFreq` / `UnpackBandFreq` — band-specific frequency
- `PackFreqB` — secondary frequency field
- `PackToneFreq` — PL/CTCSS tone frequency
- `unpackDivideByStepIntoDouble` — step-based frequency conversion

**Signaling**:
- `PackSigType` / `UnpackSigType` — signaling system type (MDC, DTMF, QC-II, None)
- `PackMdcCallId` / `UnpackMdcCallId` — MDC1200 call ID encoding
- `PackAckDigit` / `UnpackAckDigit` — acknowledgment digit
- `PackAckType` / `UnpackAckType` — acknowledgment type
- `PackToneTag` / `UnpackToneTag` — tone tag assignment
- `PackVariableID` / `UnpackVariableID` — variable-length ID field

**Numeric transforms**:
- `PackNumericMultiple` / `UnpackNumericMultiple` — multiply/divide by constant
- `PackNumericDivide` / `UnpackNumericDivide` — divide/multiply by constant
- `PackNumericDivideMinus1` — divide minus 1
- `PackNumericMinus` / `UnpackNumericPlus` — subtract/add offset
- `PackDoubleMultiple` — floating-point multiply
- `PackDoubleMultipliedByNumIntoInt` / `UnpackIntDividedByNumIntoDouble` — float-to-int conversion
- `PackOppositeOfUI` / `UnpackOppositeOfCp` — boolean inversion
- `PackListToIndex` — convert list selection to index

**Power/Audio**:
- `packPowerLevel` — transmit power level encoding
- `packVolOffset` — volume offset encoding
- `AccGainUnpack` / `EmerMicGainUnpack` — microphone gain fields

**Date/Time**:
- `PackDateDay` / `PackDateMonth` / `PackDateYear` — date fields
- `PackTimeHour` / `PackTimeMinute` — time fields

**Custom range fields** (with special sentinel values):
- `PackStrFor255CustomRange` / `PackStrForZeroCustomRange` — disabled-at-boundary
- `PackAuxCtrlMomDurCustomRange` — auxiliary control momentary duration
- `PackDosAutoMuteDurCustomRange` — DOS auto-mute duration
- `PackEmerOpenMicDurCustomRange` — emergency open mic duration
- `PackEmerTxCycDelCustomRange` — emergency tx cycle delay

**Buttons/UI**:
- `PackFctButton` — function button assignment
- `PackLSP1FctButton` through `PackLSP4FctButton` — LS trunking button assignment
- `PackRefToCnvPer` / `UnpackRefToCnvPer` — conventional personality reference
- `PackRegionalId` / `UnpackRegionalId` — regional identifier

**Constants**:
- `AlwaysPackOne` / `AlwaysUnpackOne` — fixed value 1
- `AlwaysPackZero` / `AlwaysUnpackZero` — fixed value 0
- `PackZeroForBoolIfNonapplicable` — conditional zero
- `PackZeroForListInfoIfNonapplicable` — conditional zero for lists

---

## CPS Features (from Help TOC)

### GP300 CPS (R03.x — 5-Tone variant)

```
Radio Information
Per Radio:
  - Button Definitions (Portable / Smart Microphone / Mobile)
  - Alerts (3 pages + Volume + Button + Mobile Buttons)
  - Miscellaneous (Global, Battery, Power-Up, Mic, Timers, VOX, Prefix, Display/Keypad)
  - Signalling Definition
  - Menu Items
  - RF TX/RX
  - Scan (List, Options, Switches)
  - Emergency (2 pages)
  - GP I/O Lines
  - Contact List
  - Status Decode/Encode
  - Configuration Bytes (raw hex)
  - Auto Telegram
Per Channel:
  - RX/TX frequencies
  - PL/DPL codes
  - Display
  - Miscellaneous
Per Personality:
  - TX/RX
  - Squelch
  - Misc
  - Audio
  - PTT
  - S5 Encode/Decode (5-Tone)
Signaling:
  - Encoder Sequences
  - Encoder Telegrams
  - Multicall (Address, Status)
  - Decoder Definitions (Seq+Masks, Options)
  - Auto Acknowledge
  - Select 5 Signalling System
  - User Defined Signalling (custom tones)
  - DTMF Signalling System
```

### Waris CPS (R06.12.05 — MDC variant)

```
Productivity Tools:
  - Custom Print
  - Drag and Drop
  - Modified/Invalid Fields
  - CPS Search
  - Option Board Import
  - Personality Assignment Wizard
  - Tree View
  - Trunking Site File Export/Import
Radio Information / Configuration
Controls and Menus:
  - One Touch Setup
  - Conventional Buttons (Portable / Mobile)
  - LS Trunking Buttons (Portable / Mobile)
Conventional Personality
LS Trunking:
  - LS Trunking Personality
  - LS Universal ID List
  - LS Trunking Site
Signaling:
  - Signaling Configuration
  - MDC System
  - Quik-Call II System
  - DTMF System
Call Lists:
  - MDC Call
  - Quik-Call II Call
  - DTMF Call
MDC Message and Status
Phone (telephone interconnect)
Scan Lists
Personality Assignment to Zone
```

**Key differences**:
- GP300 CPS focuses on **5-Tone (Select 5)** signaling with user-defined tone systems
- Waris CPS adds **MDC**, **Quik-Call II**, **LS Trunking**, **Phone**, **Zones**
- GP300 has raw **Configuration Bytes** (direct EEPROM editing) — removed in Waris
- Waris adds **Option Board** support (expansion modules)

---

## Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| R03.09.03 | ~2003 | GP300 CPS, 5-Tone, basic radios |
| R03.11.16 | 2012-01-07 | Last GP300 release, added Win7 x64 support |
| R06.12.05 | ~2010 | Rebranded as "Professional Radio CPS", added Win7 x64 |

### GP300 R03.09.03 → R03.11.16 Changes

Only `gp300.exe` changed (hash differs). All DLLs are **identical**. New files added:
- `CommPatch.dll` — communication compatibility patch
- `DrvInstall.dll` — driver installer for Win7
- `commsbepx64_setup.exe` — SBEP driver for 64-bit Windows

### GP300 R03.x → Waris R06.12.05 Changes

Complete rewrite of core DLLs (30→41 suffix), main EXE (gp300.exe→ProRadio.exe), consolidated extra DLLs, added "New" radio variants (mcomProRadNew, mcomProRadMobnew). Communication drivers remain partially shared.

---

## Comparison: Professional vs Commercial Series CPS

| Aspect | Commercial Series | Professional/Waris Series |
|--------|------------------|--------------------------|
| **Main EXE** | cps.exe (C++/MFC) | ProRadio.exe (VB6) |
| **Framework** | COM DLLs, Xalan/Xerces | ADK 5.1, Amulet constraints |
| **File format** | .cps (XOR 0x95 → XML) | .cpg (LCG stream cipher → binary) |
| **Also supports** | — | .srec (S-Record) |
| **Protocols** | ESBEP only | SBEP + ESBEP + SB9600 |
| **ESBEP commands** | 6 req + 6 rsp | 30+ req + 10+ rsp |
| **Codeplug format** | XML (ELP_ELM / S5T) | Binary (Ccg framework) |
| **Memory layout** | Flat, vector table at offset 642 | RO/RW regions, type control block |
| **Block types** | 1D only | 1D + 2D |
| **Signaling** | PL/DPL only | 5-Tone, MDC, DTMF, Quik-Call II |
| **Trunking** | No | LS Trunking |
| **Radios** | CP040-CP380, CM140-CM360 | GP320-GP388, GM340-GM380 |
| **SB9600 support** | No | Yes (via VxD driver) |

---

## UI Field Reference (from ProRadio.exe string analysis)

### Conventional Personality Fields

| Field | UI Label | Type |
|-------|----------|------|
| Frequency | Frequency (MHz) | 5 kHz step encoded |
| Tx Offset | Tx Offset Frequency (MHz) | Offset from Rx |
| Channel Bandwidth | Channel Bandwidth (kHz) | 12.5 / 20 / 25 kHz |
| Tx Power Level | Tx Power Level | Enum |
| Tx High Power | Tx High Power (Watts) | Numeric |
| Tx Low Power | Tx Low Power (Watts) | Numeric |
| Squelch Type | Squelch Type | Enum (PL/DPL/None/...) |
| DPL Code | DPL Code | Numeric |
| Signaling Squelch | Signaling Squelch | Bool |
| Companding | Companding | Bool |
| Busy Channel Lockout | Busy Channel Lockout | Bool |
| Scan Priority | Scan Priority | Enum |
| DTMF System | DTMF System | Reference |
| MDC System | MDC System | Reference |
| QC-II System | Quik-Call II System | Reference |
| Phone System | Phone System | Reference |

### Radio Configuration Fields

| Field | UI Label | Type |
|-------|----------|------|
| Model Number | Model Number | Read-only |
| Firmware Version | Firmware Version | Read-only |
| Codeplug Version | Codeplug Version | Read-only |
| Regional Identifier | Regional Identifier | Encoded |
| CPS Password | CPS Password | String |
| Rotary Control | Rotary Control | Enum |
| Display Type | Display Type | Enum |
| Time-Out Timer | Time-Out Timer (sec) | Custom range |
| Auto Power Mode | Auto Power Mode | Bool |
| Emergency Mode Type | Emergency Mode Type | Enum |
| Emergency Type | Emergency Type | Enum |
| Option Board Type | Option Board Type | Enum |
| Edit Mode | Edit Mode | Multi-field |
| LVRIS Base Frequency | LVRIS Base Frequency | Reference freq |
| Reference Frequency | Reference Frequency (MHz) | Calibration |

### Signaling Systems

| System | UI Section | Key Fields |
|--------|-----------|------------|
| MDC1200 | MDC System | MDC Call ID, PTT ID, Emergency, Decode, Call Alert |
| DTMF | DTMF System | DTMF Call ID, Sidetone Type, Tone Span |
| Quik-Call II | Quik-Call II System | Tone A/B/C/D Frequencies, Threshold |
| LS Trunking | LS Trunking | Site, Repeaters, Universal ID List, Personality |

### Emergency Fields

| Field | UI Label |
|-------|----------|
| Emergency Mode | Emergency Mode Type |
| Emergency Type | Emergency Type |
| Emergency Tx Cycles | Emergency Tx Cycles |
| Emergency Tx Cycles Delay | Emergency Tx Cycles Delay |
| Emergency Open Mic Duration | Emergency Open Mic Duration (sec) |
| Emergency Mic Gain | Emergency Mic Gain (dB) |
| Emergency Remote Monitor | Emergency Remote Monitor |
| Emergency Remote Monitor Time | Emergency Remote Monitor Time (sec) |
| Emergency Revert | Emergency Revert Personality |
| Emergency Sticky Revert | Emergency Sticky Revert |
| Emergency PTT ID | Emergency PTT ID Enable |
| Emergency LED | Emergency LED |
| Emergency Siren | Emergency Siren On/Off |

### Source Code Path

Build path found in PDB reference at offset 0x44A033:
`D:\tpdh36_static_view\static_view2\Waris_CPS1\Code\Release\ProRadio.pdb`
