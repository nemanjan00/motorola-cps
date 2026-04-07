# Motorola Commercial Series CPS - Version History & Supported Radios

> This document tracks CPS versions, supported radio models, and version compatibility
> to guide reimplementation efforts across multiple CPS versions.

---

## CPS Version Analyzed

| Field | Value |
|-------|-------|
| **Product** | Commercial Series Customer Programming Software |
| **Internal Name** | CPS EMEA |
| **Product Version** | R05.15 |
| **File Version** | 05.15 |
| **Copyright** | 2002-2011 Motorola Inc. |
| **Build Path** | `D:\work\CCB430\CPS_EMEA_R05.15\` |
| **Comments** | ELP/ELM CPS |

---

## DLL Component Versions

| DLL | File Ver | Product Ver | Copyright | Notes |
|-----|----------|------------|-----------|-------|
| **cps.exe** | 05.15 | R05.15 | 2002-2011 | Main MFC GUI |
| **cpscontroller.dll** | 05.02 | R05.03 | 2002-2004 | Controller layer |
| **elpelmcpservices.dll** | 05.13 | R05.05 | 2002-2007 | Core COM business logic |
| **esbepservices_dllpackage.dll** | 05.01 | R05.03 | 2002-2004 | ESBEP protocol |
| **serialcomm_dllpackage.dll** | 05.01 | R05.03 | 2002-2004 | Serial I/O |
| **filehandle.dll** | 05.00 | R05.03 | 2004 | CPS/ADK file I/O |
| **xmlxslhandler.dll** | 05.04 | R05.03 | 2002-2005 | ELP_ELM XML handler |
| **s5xmlxslhandler.dll** | 05.01 | R05.04 | 2002-2005 | S5T XML handler |
| **resourcemanager.dll** | 05.04 | R05.04 | 2002-2005 | Localization |
| **xmlservices.dll** | 05.00 | R05.03 | 2002-2004 | XML COM services |

### Language DLLs

| DLL | File Ver | Product Ver | Copyright |
|-----|----------|------------|-----------|
| guienglish.dll | 05.33 | D05.33 | 2002-2010 |
| guifrench.dll | 05.38 | D05.38 | 2002-2010 |
| guigerman.dll | 05.38 | D05.38 | 2002-2010 |
| guiitalian.dll | 05.09 | R05.09 | 2002-2009 |
| guirussian.dll | 05.09 | R05.09 | 2002-2009 |
| guispanish.dll | 05.09 | R05.09 | 2002-2009 |
| rmenglish.dll | 05.33 | D05.33 | 2002-2010 |
| rmfrench.dll | 05.09 | R05.09 | 2002-2009 |
| rmgerman.dll | 05.38 | D05.38 | 2002-2010 |
| rmitalian.dll | 05.09 | R05.09 | 2002-2009 |
| rmrussian.dll | 05.09 | R05.09 | 2002-2009 |
| rmspanish.dll | 05.09 | R05.09 | 2002-2009 |

### Version Prefix Convention

- **R** prefix (e.g., R05.15) = Release version
- **D** prefix (e.g., D05.33, D05.38) = Delta/patch update (post-R05.09 language updates)

---

## CPS Release History

| Version | Key Changes | Radio Support Added |
|---------|-------------|-------------------|
| **R01.00** | Initial release | CP040, CM140 |
| **R01.01** | 2.5 kHz synth step sizes (12.5 kHz narrowband); per-user preferences | -- |
| **R01.02** | New serial number format from factory; improved error handling | -- |
| **R02.00** | Drag-and-drop, cloning between codeplug versions | **CP140, CP160, CP180, CM160** |
| **R02.01** | Modified TX power calculation for CM140/CM160 | -- |
| **R02.04** | Fixed cloning issues; additional freq bands for CM140/CM160 | -- |
| **R02.05** | Designated power-up channel | -- |
| **R04.00** | Phase 4 - S5T codeplug format | **CM340, CM360** |
| **R05.00** | Phase 5 upgrade | -- |
| **R05.01** | 'P' pause char for CP ver 03.xx+; 100 personalities on CM340; 12.5 kHz fix CM340/CM360; auto-modify codeplug mismatches for FW R02.00.xx and prior | -- |
| **R05.02** | UI bug fixes | -- |
| **R05.03** | Same as R05.02 | -- |
| **R05.04** | Radio ID, Vote Scan, MDC Call Alert features | -- |
| **R05.05** | Talk Around fix; scroll bar feature | -- |
| **R05.06** | Russian, French, German, Italian, Spanish languages | -- |
| **R05.07** | Selected Channel Lock, Priority Channel 1 Lock | -- |
| **R05.08** | Self Test Report feature | -- |
| **R05.09** | Russian input feature | -- |
| **R05.13** | Same as R05.09 | -- |
| **R05.15** | Same as R05.13 (this version) | -- |

### Codeplug Version Compatibility Strings (embedded in cps.exe)

These are used internally for backward-compatibility detection when opening older `.cps` files:

```
"Commercial Series Customer Programming Software Version R03.xx (5 Tone Version)"
"Commercial Series Customer Programming Software Version R03.xx"
"Commercial Series Customer Programming Software Version R02.xx(Chinese Edition)"
"Commercial Series Customer Programming Software Version R02.xx"
"Commercial Series Customer Programming Software Version R01.xx"
```

### Firmware Compatibility

- CPS automatically modifies codeplug values when reading archives from radios with firmware **R02.00.xx and prior**
- Codeplug version 03.xx+ supports 'P' as pause character in DTMF sequences

---

## Supported Radio Models

### By Product Family

| Product | Type | Internal Codename | Codeplug Format | CPS Support Since |
|---------|------|-------------------|-----------------|-------------------|
| **CP040** | Portable, no display | Guppy / G2W | ELP_ELM | R01.00 |
| **CP140** | Portable, display, no keypad | Piranha PNK | ELP_ELM | R02.00 |
| **CP160** | Portable, limited keypad | Piranha PLK | ELP_ELM | R02.00 |
| **CP180** | Portable, full keypad | Piranha PFK | ELP_ELM | R02.00 |
| **CP340** | Portable, S5-series | (S5T) | S5T | R04.00+ |
| **CP360** | Portable, S5-series | (S5T) | S5T | R04.00+ |
| **CP380** | Portable, S5-series | (S5T) | S5T | R04.00+ |
| **CM140** | Mobile, basic | Marlin | ELP_ELM | R01.00 |
| **CM160** | Mobile, display | Marlin+ / MPLUS | ELP_ELM | R02.00 |
| **CM340** | Mobile, S5-series | (S5T) | S5T | R04.00 |
| **CM360** | Mobile, S5-series | (S5T) | S5T | R04.00 |

Also referenced (NA/LAM market, possibly for cross-compatibility): CM200, CM300, CP150, CP200, CP200XLS, PR400.

### Part Number Prefix to Model

| Prefix | Models |
|--------|--------|
| **H50** | CP040 (Guppy/G2W portables) |
| **H65** | CP140, CP160, CP180, CP340, CP360, CP380 (Piranha portables) |
| **M50** | CM140, CM160, CM340, CM360 (mobiles) |

### Part Number Format

```
[H|M] [50|65] [Band] [Type] [Chan] [9|4] A [Suffix]
```

| Position | Field | Values |
|----------|-------|--------|
| 1 | Platform | H=Portable, M=Mobile |
| 2-3 | Family | 50=standard, 65=Piranha |
| 4 | Band | F=Lowband, J=VHF1, K=VHF2, N=350, Q=UHF1, R=UHF2, S=UHF3, T=UHF4, U=?, X=UHF(403) |
| 5-6 | Type | CC=Guppy2W, DC=no keypad, DF=limited keypad, DH=full keypad, DJ=MOR, DK=MOR, NC=basic mobile, NF=plus mobile, PC/PF=hi-power, QC/QF=alt, RC/RF=alt, TC/TF=alt |
| 7 | Power/gen | 9=standard, 4=variant |
| 8 | Fixed | A |
| 9-10 | Variant | A1=gen1, A2=gen2, A3=gen3, A4/A5/A6=higher, J2/J3/J4=Japan, L2=?, N2/N3/N4=?, U2/U3=? |
| 11-12 | Region | AN=standard EMEA, AP=variant, (blank)=some early models |

### Frequency Bands

| Code | Band Name | Min (MHz) | Max (MHz) |
|------|-----------|-----------|-----------|
| F | Lowband | 66.000 | 88.000 |
| J | VHF1 | 136.000 | 162.000 |
| K | VHF2 | 146.000 | 174.000 |
| N | 350 MHz | 350.000 | 380.000 |
| Q | UHF1 | 403.000 | 440.000 |
| R | UHF2 | 438.000 | 470.000 |
| S | UHF3 | 465.000 | 495.000 |
| T | UHF4 | 490.000 | 527.000 |
| X | UHF (403) | 403.000 | 445.000 |

---

## Complete Hardware Model Number List

### H50 Series - CP040 Portables (46 part numbers)

```
H50JDC9AA1AN  H50JDC9AA2    H50JDC9AA2AN  H50JDC9AJ2    H50JDC9AL2
H50JDF9AA5AN  H50JDH9AA6AN  H50KCC9AA1AN  H50KCC9AA2AN  H50KDC4AA2AN
H50KDC9AA1AN  H50KDC9AA2    H50KDC9AA2AN  H50KDC9AA2AP  H50KDC9AJ2AN
H50KDC9AL2AN  H50KDF9AA5AN  H50KDH9AA6AN  H50QDC9AA1AN  H50QDC9AA2
H50QDC9AA2AN  H50QDC9AJ2AN  H50QDC9AL2AN  H50QDF9AA5AN  H50QDH9AA6AN
H50RCC9AA1AN  H50RCC9AA2AN  H50RDC4AA2AN  H50RDC9AA1AN  H50RDC9AA2
H50RDC9AA2AN  H50RDC9AA2AP  H50RDC9AJ2AN  H50RDC9AL2AN  H50RDF9AA5AN
H50RDH9AA6AN  H50SDC9AA1AN  H50SDC9AA2AN  H50SDC9AJ2AN  H50SDC9AL2AN
H50SDF9AA5AN  H50SDH9AA6AN  H50TDC9AA1AN  H50TDC9AA2AN  H50TDC9AJ22
H50UDC9AJ2AN
```

### H65 Series - CP140/CP160/CP180/CP340/CP360/CP380 Portables (78 part numbers)

```
H65JDC9AA2AN  H65JDC9AJ2    H65JDC9AL2AN  H65JDC9AN2    H65JDC9AU2AN
H65JDF9AA3AN  H65JDF9AJ3    H65JDF9AN3    H65JDF9AU3AN  H65JDH9AA4AN
H65JDH9AJ4    H65JDH9AL4AN  H65JDH9AN4    H65JDH9AU4AN  H65JDJ9AJ2
H65KDC4AA2AN  H65KDC9AA2AN  H65KDC9AJ2AN  H65KDC9AL2AN  H65KDC9AN2
H65KDF4AA3AN  H65KDF9AA3    H65KDF9AA3AN  H65KDF9AJ3AN  H65KDF9AN3
H65KDH4AA4AN  H65KDH4AN4    H65KDH9AA4AN  H65KDH9AJ4AN  H65KDH9AL4AN
H65KDH9AN4    H65KDJ9AJ2    H65QDC9AA1AN  H65QDC9AA2AN  H65QDC9AJ2AN
H65QDC9AL2AN  H65QDC9AN2    H65QDF9AA3AN  H65QDF9AJ3AN  H65QDF9AJ5AN
H65QDF9AL5AN  H65QDF9AN3    H65QDH9AA1AN  H65QDH9AA4AN  H65QDH9AJ4AN
H65QDH9AL4AN  H65QDH9AN4    H65QDJ9AJ2    H65QDK9AJ2    H65RDC4AA2AN
H65RDC9AA2AN  H65RDC9AJ2AN  H65RDC9AL2AN  H65RDC9AN2    H65RDF4AA3AN
H65RDF9AA3    H65RDF9AA3AN  H65RDF9AJ3AN  H65RDF9AN3    H65RDH4AA4AN
H65RDH4AN4    H65RDH9AA4AN  H65RDH9AJ4AN  H65RDH9AL4AN  H65RDH9AN4
H65RDJ9AJ2    H65RDK9AJ2    H65SDC9AA2AN  H65SDC9AJ2AN  H65SDC9AN2
H65SDF9AA3AN  H65SDF9AJ3AN  H65SDF9AN3    H65SDH9AA4AN  H65SDH9AJ4AN
H65SDH9AN4    H65TCC9AA2AN  H65TDC9AA2AN  H65TDF9AA3AN  H65TDH9AA4AN
H65TDH9AJ4
```

### M50 Series - CM140/CM160/CM340/CM360 Mobiles (87 part numbers)

```
M50FNC9AN2    M50FNF4AN2    M50FNF9AN2    M50JNC9AA1AN  M50JNC9AA2
M50JNC9AA2AN  M50JNC9AN2    M50JNF9AA1AN  M50JNF9AA2AN  M50JNF9AN2
M50JQC9AA1AN  M50JQC9AA2AN  M50JQF9AA1AN  M50JQF9AA2AN  M50KNC9AA1AN
M50KNC9AA2    M50KNC9AA2AN  M50KNC9AN2    M50KNF4AA2AN  M50KNF9AA1AN
M50KNF9AA2    M50KNF9AA2AN  M50KNF9AA3AN  M50KNF9AN2    M50KNF9AU3AN
M50KQC9AA1AN  M50KQC9AA2AN  M50KQF9AA1AN  M50KQF9AA2AN  M50KQF9AA3AN
M50KQF9AU3AN  M50NNF9AA2AN  M50QNC9AA1AN  M50QNC9AA2    M50QNC9AA2AN
M50QNC9AN2    M50QNF9AA1AN  M50QNF9AA2AN  M50QNF9AN2    M50QPC9AA1AN
M50QPC9AA2AN  M50QPF9AA1AN  M50QPF9AA2AN  M50RNC9AA1AN  M50RNC9AA2
M50RNC9AA2AN  M50RNC9AN2    M50RNF9AA1AN  M50RNF9AA2    M50RNF9AA2AN
M50RNF9AA3AN  M50RNF9AA4AN  M50RNF9AN2    M50RNF9AU3AN  M50RPC9AA1AN
M50RPC9AA2AN  M50RPF9AA1AN  M50RPF9AA2AN  M50RPF9AA3AN  M50RQF9AU3AN
M50SNC9AA1AN  M50SNC9AA2AN  M50SNC9AN2    M50SNF9AA1AN  M50SNF9AA2AN
M50SNF9AN2    M50SPC9AA1AN  M50SPC9AA2AN  M50SPF9AA1AN  M50SPF9AA2AN
M50SPF9AA3AN  M50SQF9AU3AN  M50TPC9AA1AN  M50TPC9AA2AN  M50TPF9AA1AN
M50TPF9AA2AN  M50TRC9AA1AN  M50TRC9AA2AN  M50TRC9AN2    M50TRF9AA1AN
M50TRF9AA2AN  M50TRF9AN2    M50UNC9AA2AN  M50UNF9AA2AN  M50UPC9AA2AN
M50XNC9AA2AN  M50XNF9AA2AN
```

---

## Supported Operating Systems

(Per readme.htm for CPS R05.15)

- Windows 98 SE
- Windows ME
- Windows NT 4.0 (SP5+, **excluding SP6**, SP6a supported)
- Windows 2000 Professional
- Windows XP Home/Professional
- Windows 7

---

## Notes for Multi-Version Reverse Engineering

### What Changes Between CPS Versions

1. **Codeplug format version** - embedded in `TI_BLOCK`/`S5_RADIO_INFO_BLOCK` as CP version
2. **Block availability** - newer versions add blocks (e.g., R05.04 added Radio ID, Vote Scan)
3. **Field additions** - new fields within existing blocks
4. **Model support table** - hardcoded part number lists grow with each release
5. **Backward compatibility** - CPS auto-migrates older codeplug formats

### Key Files to Compare Across CPS Versions

| File | What Changes |
|------|-------------|
| `cps.exe` | GUI views, model lists, version string |
| `elpelmcpservices.dll` | Block definitions, field lists, validation |
| `cpscontroller.dll` | Usually stable (low version) |
| `esbepservices_dllpackage.dll` | Protocol rarely changes |
| `serialcomm_dllpackage.dll` | Protocol rarely changes |
| `xmlxslhandler.dll` / `s5xmlxslhandler.dll` | XML schema handling |
| `language/rmenglish.dll` | Field name strings, enumerations |
| `reports/pretransform.mot` | Computed field definitions |
| `reports/*.xsl` | Data model visible through report templates |

### Differencing Strategy

When you get a new CPS version:

1. **Decode all .cps samples**: XOR with 0x95, diff the XML against known versions
2. **Extract strings**: `r2 -qc "iz" elpelmcpservices.dll` - diff against known field lists
3. **Check PE version info**: `r2 -qc "iV" cps.exe` for version identification
4. **Compare exports**: `r2 -qc "iE" *.dll` - new exports = new capabilities
5. **Diff report XSLs**: These are plaintext and reveal new/changed fields
6. **Diff pretransform.mot**: Shows new computed fields and value mappings
7. **Check model number list**: Search for H50/H65/M50 patterns in elpelmcpservices.dll

### Version String Location

At runtime, CPS reads its own version via: `\StringFileInfo\%04x%04x\ProductVersion`

---

## Regional Variants

| Region Code | Market |
|-------------|--------|
| EMEA | Europe, Middle East, Africa (this version) |
| NA | North America |
| LAM | Latin America |
| APAC | Asia Pacific |

NA/LAM models referenced but not fully supported in EMEA CPS: CM200, CM300, CP150, CP200, CP200XLS, PR400. These likely use a different CPS build.

### Japan-Specific Features

Internal codenames: **ELT_Ninja**, **ELT_MOR**
- Kani/Ippan mode (`RC_KANIIPPANMODE`)
- ATIS signaling (`ATIS_BLOCK`)
- SDT signaling (`SDT_BLOCK`)
- Model suffixes: DJ, DK (e.g., H65QDJ9AJ2, H65RDK9AJ2)
