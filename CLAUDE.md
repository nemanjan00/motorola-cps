# Motorola Commercial Series CPS Reverse Engineering Project

## Goal

Reverse engineer Motorola CPS (Customer Programming Software) for legacy Commercial Series radios to document protocols, file formats, and data structures for open-source reimplementation. These are abandonware radios that Motorola no longer supports.

## Project Structure

```
/work/project/
  CLAUDE.md
  .gitignore
  docs/                          ← git tracked (RE documentation only)
    REVERSING_GUIDE.md           ← process doc for new CPS versions
    MOTOROLA_PUBLIC_KNOWLEDGE.md ← community reference with crosscheck flags
    CPS_EMEA_R05.15/
      PROTOCOL_AND_STRUCTS.md    ← full ESBEP protocol, XML schema, field catalog
      DATA_PIPELINE.md           ← GUI↔binary↔EEPROM pipeline, byte maps, encoding
      EEPROM_ADDRESS_MAP.md      ← every block address, bootstrap sequence, pseudocode
      CPS_VERSIONS_AND_RADIOS.md ← version history, 211 part numbers
      FILE_MANIFEST.md           ← SHA-256 hashes for cross-version dedup
  processed/                          ← gitignored (never committed)
    CPS_EMEA_R05.15/
      files/                     ← actual DLLs/EXEs
  triage/                        ← gitignored (drop new CPS versions here)
```

### About processed/

`processed/` is **never committed to git**. When someone clones this repo they get only
`docs/` and need to supply their own CPS binaries to run further RE. This keeps
the repo clean legally — we document the protocol, we don't redistribute Motorola software.

## Naming Convention

```
CPS_{REGION}_{VERSION}
```

Used consistently in both `docs/` and `processed/`. Examples:

- `CPS_EMEA_R05.15`
- `CPS_NA_R05.16`
- `CPS_NA_D05.33`

Region matters because EMEA and NA CPS can differ — different frequency ranges,
different feature entitlements baked in, and potentially protocol differences.

Version prefixes observed so far:
- **R** = Release version (e.g., R05.15)
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

## Key Findings (Universal Across Versions)

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
- Frequency encoding: ELP_ELM = `ref_freq/1.5 + offset/0.25`; S5T = `VRIS_BASE*0.05 + increment*step`
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

## Tools Available

- `r2` (radare2 6.1.2) with Ghidra decompiler (`pdg` command)
- Standard Unix tools (`xxd`, `hexdump`, `strings`, `diff`)
- Python for scripting

## Supported Radios (known so far)

| Radio | Type | Format | Since |
|-------|------|--------|-------|
| CP040 | Portable | ELP_ELM | R01.00 |
| CM140 | Mobile | ELP_ELM | R01.00 |
| CP140/CP160/CP180 | Portable | ELP_ELM | R02.00 |
| CM160 | Mobile | ELP_ELM | R02.00 |
| CM340/CM360 | Mobile | S5T | R04.00 |
| CP340/CP360/CP380 | Portable | S5T | R04.00+ |

## Regional Variants

| Region | Status | Notes |
|--------|--------|-------|
| **EMEA** | Analyzed: R05.15 | Europe, Middle East, Africa |
| **NA** | Not yet | North America — references CM200, CM300, CP150, CP200, CP200XLS, PR400 |
| **LAM** | Not yet | Latin America |
| **APAC** | Not yet | Asia Pacific |
| **Japan** | Not yet | ELT_Ninja / ELT_MOR codenames, ATIS/SDT signaling |

## Versions Analyzed

| Version | Region | Location | Date Analyzed |
|---------|--------|----------|---------------|
| R05.15 | EMEA | `docs/CPS_EMEA_R05.15/` | 2026-04-07 |
