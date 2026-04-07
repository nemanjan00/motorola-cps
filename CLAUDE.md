# Motorola Commercial Series CPS Reverse Engineering Project

## Goal

Reverse engineer Motorola CPS (Customer Programming Software) for legacy Commercial Series radios to document protocols, file formats, and data structures for open-source reimplementation. These are abandonware radios that Motorola no longer supports.

## Project Structure

```
/work/project/
  CLAUDE.md
  .gitignore
  docs/                          ← git tracked (RE documentation only)
    CPS_EMEA_R05.15/
      PROTOCOL_AND_STRUCTS.md
      CPS_VERSIONS_AND_RADIOS.md
      FILE_MANIFEST.md           ← hashes only, no bins
  bins/                          ← gitignored (never committed)
    CPS_EMEA_R05.15/
      files/                     ← actual DLLs/EXEs
  triage/                        ← gitignored (drop new CPS versions here)
```

### About bins/

`bins/` is **never committed to git**. When someone clones this repo they get only
`docs/` and need to supply their own CPS binaries to run further RE. This keeps
the repo clean legally — we document the protocol, we don't redistribute Motorola software.

## Naming Convention

```
CPS_{REGION}_{VERSION}
```

Used consistently in both `docs/` and `bins/`. Examples:

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
9. **Move bins to `bins/CPS_{REGION}_{VERSION}/files/`**
10. **Create `docs/CPS_{REGION}_{VERSION}/`** with RE docs (PROTOCOL, VERSIONS, MANIFEST)
11. **Document deltas** against closest known version — no need to repeat unchanged info

## Key Findings (Universal Across Versions)

### .cps File Format
- **XOR obfuscation with key `0x95`** — decode: `byte ^ 0x95` for every byte = XML
- Two XML variants: `ELP_ELM_CODEPLUG` (CM140/CM160/CP0xx) and `S5T_CODEPLUG` (CM340/CM360)

### ESBEP Serial Protocol
- RS-232, default 9600/8/N/1, no flow control
- Max transfer size: 40 bytes per frame
- Checksum: one's complement (`0xFF - sum_of_bytes`)
- Read opcode: `0x11`, Write opcode: `0x17`
- ACK: `0x84`, NACK: `0x85`
- Echo mode: radio echoes sent bytes before responding

### Architecture
- Win32 MFC app, COM-based DLL architecture
- `cpscontroller.dll` → `elpelmcpservices.dll` (ICPServices COM) → `esbepservices_dllpackage.dll` → `serialcomm_dllpackage.dll`
- XML/XSL report generation via Xalan-C / Xerces-C 1.6.0

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
