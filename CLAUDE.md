# Motorola CPS Reverse Engineering Project

## Goal

Reverse engineer Motorola CPS (Customer Programming Software) for legacy radio families to document protocols, file formats, and data structures for open-source reimplementation. These are abandonware radios that Motorola no longer supports.

Covers two distinct radio families:
- **Commercial Series** (CM/CP 040-380) — C++/MFC architecture, XML codeplug, ESBEP protocol
- **Professional/Waris Series** (GP/GM 300) — C++/MFC + ADK 5.1 architecture, binary codeplug, SBEP/ESBEP/SB9600 protocols

## Project Structure

```
/work/project/
  CLAUDE.md
  .gitignore
  docs/                          ← git tracked (RE documentation only)
    REVERSING_GUIDE.md           ← process doc for new CPS versions
    MOTOROLA_PUBLIC_KNOWLEDGE.md ← community reference with crosscheck flags
    CPS_EMEA_R05.15/             ← Commercial Series CPS
      PROTOCOL_AND_STRUCTS.md    ← full ESBEP protocol, XML schema, field catalog
      DATA_PIPELINE.md           ← GUI↔binary↔EEPROM pipeline, byte maps, encoding
      EEPROM_ADDRESS_MAP.md      ← every block address, bootstrap sequence, pseudocode
      CPS_VERSIONS_AND_RADIOS.md ← version history, 211 part numbers
      FILE_MANIFEST.md           ← SHA-256 hashes for cross-version dedup
    CPS_EMEA_GP300_R03.11.16/    ← Professional/GP300 Series CPS
      FILE_MANIFEST.md           ← hashes, R03.09.03 vs R03.11.16 diff
    CPS_EMEA_WARIS_R06.12.05/   ← Professional/Waris Series CPS (evolved GP300)
      PROTOCOL_AND_ARCHITECTURE.md ← SBEP/ESBEP/SB9600, Ccg codeplug, encryption
      FILE_MANIFEST.md           ← hashes, cross-version comparison
    TUNER_PRO_R02.05.00/         ← Professional Tuner (RF alignment tool)
      FILE_MANIFEST.md           ← overview, softpot tuning capabilities
  processed/                     ← gitignored (never committed)
    CPS_EMEA_R05.15/files/       ← Commercial Series binaries
    CPS_EMEA_GP300_R03.09.03/files/  ← GP300 CPS R03.09.03
    CPS_EMEA_GP300_R03.11.16/files/  ← GP300 CPS R03.11.16 (last version)
    CPS_EMEA_WARIS_R06.12.05/files/  ← Waris CPS R06.12.05
    TUNER_PRO_R02.05.00/files/       ← Professional Tuner
  triage/                        ← gitignored (drop new CPS versions here)
```

### About processed/

`processed/` is **never committed to git**. When someone clones this repo they get only
`docs/` and need to supply their own CPS binaries to run further RE. This keeps
the repo clean legally — we document the protocol, we don't redistribute Motorola software.

## Naming Convention

```
CPS_{REGION}_{FAMILY}_{VERSION}   or   CPS_{REGION}_{VERSION}
TUNER_{TYPE}_{VERSION}
```

Used consistently in both `docs/` and `processed/`. Examples:

- `CPS_EMEA_R05.15` — Commercial Series (family omitted for historical reasons)
- `CPS_EMEA_GP300_R03.11.16` — Professional/GP300 Series
- `CPS_EMEA_WARIS_R06.12.05` — Professional/Waris Series
- `TUNER_PRO_R02.05.00` — Professional Tuner

Region matters because EMEA and NA CPS can differ — different frequency ranges,
different feature entitlements baked in, and potentially protocol differences.

Version prefixes observed so far:
- **R** = Release version (e.g., R05.15, R06.12.05)
- **D** = Delta/patch update (e.g., D05.33)

## Workflow for New CPS Versions

1. **User drops a new CPS folder into `triage/`**
2. **Identify version**: `r2 -qc "iV" triage/<folder>/cps.exe` to get Product Version
3. **Identify region**: Check strings for "EMEA", "NA", "LAM", etc. or infer from model list
4. **Hash all binaries**: `cd triage/<folder> && sha256sum *.exe *.dll language/*.dll | sort -k2`
5. **Diff hashes** against existing `docs/*/FILE_MANIFEST.md` to find changed files
6. **Only reverse changed files** — skip anything with matching hashes
7. **Focus analysis on** (priority order):
   - `elpelmcpservices.dll` — new blocks/fields (most likely to change)
   - `cps.exe` — new radio models/features
   - `reports/pretransform.mot` / `s5pretransform.mot` — plaintext, easy diff
   - `reports/*.xsl` — data model in plaintext
   - `language/rmenglish.dll` — field names and enums
   - XML handler DLLs — schema changes
   - Protocol DLLs — only if protocol changed (rare)
8. **Decode sample .cps files**: XOR every byte with `0x95`, diff XML against known versions
9. **Move bins to `processed/CPS_{REGION}_{VERSION}/files/`**
10. **Create `docs/CPS_{REGION}_{VERSION}/`** with RE docs (PROTOCOL, VERSIONS, MANIFEST)
11. **Document deltas** against closest known version — no need to repeat unchanged info

## Key Findings — Commercial Series (CM/CP)

### .cps File Format
- **XOR obfuscation with key `0x95`** — decode: `byte ^ 0x95` for every byte = XML
- Two XML variants: `ELP_ELM_CODEPLUG` (CM140/CM160/CP0xx) and `S5T_CODEPLUG` (CM340/CM360)

### ESBEP Serial Protocol (fully reversed)
- RS-232, default 9600/8/N/1, no flow control
- Frame: `byte[0] = 0xF0 | payload_len`, then payload, then `0xFF - sum` checksum
- 6 command opcodes: `0x10` reset, `0x11` read, `0x13` query max, `0x17` write, `0x18` set, `0x23` query info
- 6 response opcodes: `0x05`/`0x06` ACK/NAK, `0x82` max transfer, `0x84`/`0x85` read OK/ERR, `0x8B` query response
- Query sub-commands: 0x00=model, 0x01=serial, 0x02=ESN, 0x03=FW ver, 0x04=CP ver, 0x07=CP size, 0x08=password check, 0x09=battery, 0x0A=last programmed, 0x0F=UUID, 0x10=region
- Echo mode: radio echoes sent frame before responding
- Max transfer: 40 bytes default, configurable

### Binary Encoding (not 1:1 — serialization layer)
- XML field values (strings) are packed into compact binary via bitmasks, enum lookup tables, atof/ftol
- ELP_ELM block header: `[Flags 1B][EntrySize 1B][EntryQty 1B][Reserved 1B]` (4 bytes; 5 for list blocks)
- S5T block header: `[ChecksumType 1B][EntrySize uint16 LE][EntryQty uint16 LE]` (5 bytes)
- Frequency encoding: ELP_ELM = ref field `atof(str)/1.5`, channel field `atof(str)/0.25`; S5T = `VRIS_BASE*0.05 + increment*step`
- CP_BLOCK: 27 bytes per channel, 51 XML fields packed via bitmasks — fully mapped

### EEPROM Addressing
- All codeplug data starts at fixed offset 642 (0x0282)
- VECT_BLOCK contains 16-bit LE offsets for every data block — must read VECT first
- ELP_ELM: 56 vectors; S5T: 32 vectors
- Addresses stable within layout family, shift between codeplug versions (v03 vs v06)
- Password: no security — stored plaintext, CPS compares client-side after full codeplug read

### Architecture
- Win32 MFC app, COM-based DLL architecture
- `cpscontroller.dll` → `elpelmcpservices.dll` (ICPServices COM) → `esbepservices_dllpackage.dll` → `serialcomm_dllpackage.dll`
- XML/XSL report generation via Xalan-C / Xerces-C 1.6.0
- Evolved from SB9600/SBEP protocol family (US Patent 5,551,068)

## Key Findings — Professional/Waris Series (GP/GM 300)

### .cpg File Format
- **LCG stream cipher** — seeded from `time()`, 9-byte random padding header
- LCG: `next = (state * 85 + 25) & 0xFF` (multiplier=0x55, increment=0x19)
- Key derivation: `key = (padding[5] + padding[6] - padding[8]) & 0xFF`
- Escape sequences for 0x1A/0x1B in output stream
- Underlying data is **binary codeplug image** (NOT XML like Commercial Series)
- Also supports **.srec** (Motorola S-Record) format
- **MotHeader** (800 bytes / 0x320): signature(6B) + FileType(1B) + pad(5B) + GUID(16B) + ModelNo(20B) + SerialNo(20B) + checksum(1B) + copyright + QuickInfo(300B)
- Decryption verified against 839+ sample .cpg files from GP300 and Waris CPS

### Serial Protocols (fully decompiled from Commpatch.dll, VComSbep.dll, VComESbp.dll, VcomSb96.dll)
- **SBEP** (primary): `Protocol.Motorola.Sbep` via `\\.\Commsbep` driver
  - Short frame: `[0xF0|N] [opcode] [data...] [checksum]` (N = opcode+data count, ≤14; threshold at data_len > 0x0D)
  - Long frame: `[0xFF] [opcode] [len_hi] [len_lo] [data...] [checksum]` (big-endian length = opcode+data count)
  - 8 request opcodes (0x10-0x17) + 7 response opcodes (0x80-0x86), NAK=0x60
  - Read: opcode 0x11, 4 data bytes. CPS sends [len][addr_hi][addr_mid][addr_lo] (3-byte address); Tuner sends [addr_hi][addr_lo][len_hi][len_lo] (2-byte address)
  - Write: opcode 0x17, address + data; reply 0x84 (good) or 0x85 (bad)
- **ESBEP** (extended): `Protocol.Motorola.ESbep` — same wire format, additional opcodes
  - Superset of SBEP, adds opcodes 0x18-0x27 + responses 0x87-0x8E
  - Query sub-commands on opcode 0x23 (16 sub-types: 0x00=model through 0x0F=UUID)
  - Tuning: 0x1B (TUNE_PARAMS), 0x1F (AUTOTUNE), 0x20 (SOFTPOT)
  - Test: 0x1C (BUTTON_TST), 0x22 (TESTMODE), 0x24 (KEYPAD)
- **SB9600** (legacy): `Protocol.Motorola.Sb9600` via `\\.\Commsb96` VxD driver
  - 5 opcodes: EPREQ(0x06), MEMWRITE(0x07), MEMACS(0x08), TSTMOD(0x40), MEMREAD(0x87)
  - Fixed 5-byte frames at driver level
  - MEMREAD/MEMWRITE: [addr_hi][addr_lo][data][frame_len] -- 16-bit address, 1-byte data
  - EPREQ/MEMACS: [0x00][device_id][(block<<5)|(addr&0x1F)][frame_len] -- 3-bit block + 5-bit addr
  - TSTMOD: [(block<<5)|(addr&0x1F)][data0][data1][frame_len]
- Serial config: 9600/8/N/1, echo mode, checksum = `0xFF - sum(bytes)`
- Echo mode: TransmitCommChar one byte at a time, ReadFile every 5 bytes, verify match
- IOCTL codes to \\.\Commsbep: 0x220007 (send), 0x22000B (send alt), 0x22000F (config), 0x220013 (transact), 0x220017 (write cfg), 0x22001F (reset), 0x220023 (read bulk), 0x220027 (enum ports)
- Commpatch.dll: standalone SBEP stack bypassing driver, exports `_WriteToRadio@16`
  - Classes: CSbepBroker > CSbepComm > CSbepMessage + CWinSerial
  - Error codes: 0=success, 1=NAK, 4=checksum error, 5=timeout

### Codeplug Structure (Ccg Framework)
- Binary format with RO (Read-Only) and RW (Read-Write) memory regions
- **Config Info** at start: model index + version index + layout version
- **Type Control Block**: bit array flagging which blocks are present
- **Vector Block**: offsets to data blocks (2 or 4 bytes per vector)
- **1D blocks** (simple entry array) and **2D blocks** (list of lists)
- Field types: NumField, CharField, StrField — positioned by byte offset + MSB start + length-in-bits
- Per-entry or per-block checksums: `0xFF - sum(bytes)`
- Codeplug versions: 0.00 through 11.00 observed
- Frequency encoding: 5 kHz step size, LVRIS Base reference system
- 90+ pack/unpack transform functions in ProRadio.exe (registered via CudcDbCgXchg::Add in udc41.dll)
- Rud41.dll is UI framework only; Rcg41.dll is core codeplug framework; transforms are in ProRadio.exe
- Amulet constraint framework (Carnegie Mellon) for radio parameter validation
- Frequency formula: `freq_MHz = (LVRIS_base * 5 + cp_value) / 200.0` (constant=200.0 at 0x6BDBF8)
- Base frequency stored in 25 kHz units: `base_freq_MHz = cp_value * 0.025`
- Power level enum: 0=Low, 1=High, 2=Auto
- Signaling type enum: 1=MDC, 2=Quik-Call II, 3=DTMF
- CTCSS tone: `cp_value = tone_freq * 10.0`
- Config Info byte: bit0=configInfoLength(0=2B,1=4B), bit1=isFixedVectorBlk(inverted), bit2=isImageRWCs, bits7-4=layout_version_index
- All observed samples use byte 0x80 = layout version index 8 = "8.00"
- Version table at ProRadio.exe+0x3D6BB8: "0.00" through "11.00" plus "03.00" (GP300 compat)
- Step sizes: {2.5, 3.125, 5.0, 6.25} kHz (index 0-3)
- Part number encoding: [T=H/M][SS=25/38][BB=band][F=feature][C=channels][RR=market][N=tier][suffix]
- 226 unique part numbers across 839 samples (158 Waris, 68 GP300, zero overlap)
- Model matrix documented in `docs/CPS_EMEA_WARIS_R06.12.05/MODEL_AND_VERSION_MATRIX.md`

### Architecture
- Win32 C++/MFC app (ProRadio.exe) + C++/MFC ADK 5.1 DLLs (GP300 gp300.exe was VB6; Waris rewrote in C++)
- DLL suffix `30` = GP300 era, `41` = Waris era
- COM-based radio abstraction: `Radio.Motorola.Waris` (portable), `Radio.Motorola.WarisMobile` (mobile)
- `RSS_LAUNCHER` provides unified radio auto-detection and RSS launching
- Signaling: 5-Tone (Select 5), MDC1200, DTMF, Quik-Call II
- Trunking: LS Trunking (Logic Trunked Radio)
- Phone interconnect via DTMF

## Tools Available

- `objdump`, `strings`, `readelf`, `nm` — binary analysis
- Python with `pefile` library — PE file parsing
- Standard Unix tools (`xxd`, `hexdump`, `diff`)
- Python for scripting

### Tools that need rebuilding each session (sandbox — only /work/project persists)

- **radare2**: `cd /tmp && git clone --depth 1 https://github.com/radareorg/radare2.git && cd radare2 && sys/install.sh --prefix=/work/.local` then `r2pm -U && r2pm -ci r2ghidra` for Ghidra decompiler (`pdg`)
- **unshield**: `cd /tmp && git clone https://github.com/twogood/unshield.git && cd unshield && cmake -B build . && cmake --build build -j$(nproc)` — binary at `build/src/unshield`
- **pip packages**: `pip install pefile capstone` (pefile may already be installed)

## Supported Radios (known so far)

### Commercial Series (CPS)

| Radio | Type | Format | Since |
|-------|------|--------|-------|
| CP040 | Portable | ELP_ELM | R01.00 |
| CM140 | Mobile | ELP_ELM | R01.00 |
| CP140/CP160/CP180 | Portable | ELP_ELM | R02.00 |
| CM160 | Mobile | ELP_ELM | R02.00 |
| CM340/CM360 | Mobile | S5T | R04.00 |
| CP340/CP360/CP380 | Portable | S5T | R04.00+ |

### Professional/Waris Series (GP300/GM300 CPS)

| Radio | Type | Bands | Signaling |
|-------|------|-------|-----------|
| GP320 | Portable | LB1-2, VHF, UHF1-2 | 5-Tone |
| GP329/GP329+ | Portable | LB1-2, VHF, UHF1-2 | 5-Tone |
| GP330 | Portable | LB1-2, VHF, UHF1-2 | 5-Tone |
| GP339/GP339+ | Portable | LB1-2, VHF, UHF1-2 | 5-Tone |
| GP340 | Portable | LB1-3, 300, 330, VHF, UHF1-2 | 5-Tone, MDC, DTMF |
| GP344 | Portable | VHF, UHF1-2 | 5-Tone, MDC, DTMF |
| GP360 | Portable | VHF, UHF1-2 | 5-Tone, MDC, DTMF |
| GP366 | Portable | VHF, UHF1-2 | 5-Tone, MDC, DTMF |
| GP380 | Portable | LB1-3, 300, 330, VHF, UHF1-2 | 5-Tone, MDC, DTMF, Quik-Call II |
| GP388 | Portable | VHF, UHF1-2 | 5-Tone, MDC, DTMF |
| GM340 | Mobile | VHF, UHF1-2 | 5-Tone, MDC, DTMF |
| GM339/GM399 | Mobile | VHF, UHF1-2 | 5-Tone, MDC, DTMF |
| GM360 | Mobile | VHF, UHF1-2 | 5-Tone, MDC, DTMF |
| GM380 | Mobile | VHF, UHF1-2 | 5-Tone, MDC, DTMF, Quik-Call II |
| PRO5250 | Portable | VHF, UHF1-2 | 5-Tone |
| PRO7250 | Mobile | VHF, UHF1-2 | 5-Tone |

## Regional Variants

| Region | Status | Notes |
|--------|--------|-------|
| **EMEA** | Analyzed: R05.15 (Commercial), R03.11.16/R06.12.05 (Professional) | Europe, Middle East, Africa |
| **NA** | Not yet | North America — Commercial: CM200, CM300, CP150, CP200, CP200XLS, PR400 |
| **LAM** | Not yet | Latin America |
| **APAC** | Not yet | Asia Pacific |
| **Federal** | Not yet | US government (found in Waris CPS strings) |
| **China MoR** | Not yet | China Ministry of Rail (found in Waris CPS strings) |
| **Japan** | Not yet | ELT_Ninja / ELT_MOR codenames, ATIS/SDT signaling |

## Versions Analyzed

### Commercial Series

| Version | Region | Location | Date Analyzed |
|---------|--------|----------|---------------|
| R05.15 | EMEA | `docs/CPS_EMEA_R05.15/` | 2026-04-07 |

### Professional/Waris Series

| Version | Region | Location | Date Analyzed |
|---------|--------|----------|---------------|
| R03.09.03 | EMEA | `docs/CPS_EMEA_GP300_R03.11.16/` (hashes in manifest) | 2026-04-07 |
| R03.11.16 | EMEA | `docs/CPS_EMEA_GP300_R03.11.16/` | 2026-04-07 |
| R06.12.05 | EMEA | `docs/CPS_EMEA_WARIS_R06.12.05/` | 2026-04-07 |

### Tools

| Version | Location | Date Analyzed |
|---------|----------|---------------|
| Professional Tuner R02.05.00 | `docs/TUNER_PRO_R02.05.00/` | 2026-04-07 |

### Rejected / No New Data

| Item | Reason |
|------|--------|
| CM300 SERIES ARO HACK R05.15 | Identical binaries to CPS_EMEA_R05.15 (same SHA-256). "Hack" is repackaging only. |
