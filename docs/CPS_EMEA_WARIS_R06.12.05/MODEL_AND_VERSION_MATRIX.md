# Radio Model & Codeplug Version Compatibility Matrix

> Part number decoding, model-to-band mapping, codeplug version analysis
> Sources: 839 .cpg samples (658 Waris, 181 GP300), ProRadio.exe, Rcg41.dll, gp300.exe

## Part Number Encoding Scheme

Motorola part numbers for the Professional/Waris series follow a fixed positional encoding:

```
Format: [T][SS][BB][F][C][RR][N][suffix]

Example: H 25 KD C 9 AA 3
         |  |  |  | |  |  |
         |  |  |  | |  |  +-- N: Feature tier number
         |  |  |  | |  +----- RR: Market/certification
         |  |  |  | +-------- C: Channel capacity
         |  |  |  +---------- F: Feature/signaling level
         |  |  +------------- BB: Frequency band code
         |  +---------------- SS: Product series
         +------------------- T: Product type
```

### Position 0: Product Type (T)

| Code | Meaning |
|------|---------|
| H | Handheld/Portable (GP3xx series) |
| M | Mobile (GM3xx series) |

### Positions 1-2: Product Series (SS)

| Code | Meaning | Radio Chassis |
|------|---------|---------------|
| 25 | Main series | Standard portable (H25) or new mobile (M25) |
| 38 | Extended series | Mobile/vehicle mount (H38 only) |
| 55 | Display series | Display-equipped models (H255, M255) |

Note: H25 = GP portable, H38 = GM mobile (old chassis), M25 = GM mobile (new Waris chassis). The H/M prefix indicates the internal model database classification, not always the physical form factor.

### Positions 3-4: Frequency Band (BB)

#### Portable Band Codes (H25/H38)

| Code | Band | Frequency Range | Era |
|------|------|-----------------|-----|
| BE | LB1 | 29-36 MHz | GP300/Waris |
| CE | LB2 | 36-42 MHz | GP300/Waris |
| ED | LB3 | 49-54 MHz | GP300 only |
| KC | VHF | 136-174 MHz | GP300 only |
| KD | VHF | 136-174 MHz | Waris |
| ND | 300 MHz | ~300-350 MHz | Waris only |
| PD | 330 MHz | ~330-400 MHz | Waris only |
| RC | UHF1 | 403-470 MHz | GP300 only |
| RD | UHF1 | 403-470 MHz | Waris |
| SD | UHF2 | 450-527 MHz | Waris |
| TD | Unknown | Unknown | GP300 only |
| UC | 800 MHz | ~806-870 MHz | Waris only |
| 5C | VHF (display) | 136-174 MHz | Display models (GP344/GP366) |

#### Mobile Band Codes (M25)

| Code | Band | Frequency Range |
|------|------|-----------------|
| BK | LB1 | 29-36 MHz |
| CK | LB2 | 36-42 MHz |
| DK | LB3 | 49-54 MHz |
| KH | VHF (low power) | 136-174 MHz |
| KK | VHF (high power) | 136-174 MHz |
| MH | VHF (variant) | 136-174 MHz |
| RH | UHF1 (low power) | 403-470 MHz |
| RK | UHF1 (high power) | 403-470 MHz |
| SH | UHF2 (low power) | 450-527 MHz |
| SK | UHF2 (high power) | 450-527 MHz |
| 5H | VHF (display mobile) | 136-174 MHz |

Band code evolution: GP300 used xC (KC, RC) for VHF/UHF. Waris changed to xD (KD, RD, SD). Mobile Waris uses xH/xK instead. The second letter encodes the hardware generation, not the band.

### Position 5: Feature/Signaling Level (F)

| Code | Feature Set | Corresponding Models |
|------|-------------|---------------------|
| A | Basic (no signaling) | GP320, GM339 |
| C | Standard conventional (5-Tone decode) | GP320, GP330, GP340 |
| D | Mid-tier conventional (5-Tone + MDC decode) | GM340, GM360 |
| F | Full signaling (5-Tone + MDC + DTMF, non-display) | GP380, GM380 |
| G | Mid-tier with signaling (GP360/GM360 class) | GP360, GM360 |
| H | Full + phone interconnect | GP380, GM380 (with phone) |
| N | LS Trunking capable (Quik-Call II + LTR) | Trunking-capable variants |

### Position 6: Channel Capacity (C)

| Code | Channels |
|------|----------|
| 4 | 4 channels |
| 6 | 6 channels |
| 9 | 16 channels |

### Positions 7-8: Market/Certification (RR)

| Code | Market | CPS Version |
|------|--------|-------------|
| AA | EMEA standard | Waris CPS (R06.12.05) |
| AN | EMEA standard | GP300 CPS (R03.11.16) |
| DP | Display model certification | Waris CPS (GP344/GP366/GP388) |
| DU | Duty cycle / special certification | Waris CPS |
| PW | Power Worker certification | Waris CPS |

### Position 9: Feature Tier Number (N)

| Code | Radio Model | Description |
|------|-------------|-------------|
| 0 | GP320 / GM339 | Basic, no signaling |
| 1 | GP330 | Basic with 5-Tone |
| 2 | GP340 / GM340 | Conventional, limited channels |
| 3 | GP340 / GM340 | Conventional, standard 16ch |
| 4 | GP360 / GM360 | Mid-tier with signaling |
| 5 | GP380 / GM380 | Full features, non-display |
| 6 | GP380 / GM380 | Full features, display |
| 7 | GP344 | Display portable (DP certification) |
| 8 | GP380 + LTR | Quik-Call II / LS Trunking capable |
| 9 | GP388 | Display + all features (DP certification) |

### Suffix (Position 10+)

| Suffix | Meaning |
|--------|---------|
| (none) | Standard EMEA |
| A | Waris mobile standard suffix |
| AN | EMEA with additional variant |

---

## Model Inventory from Samples

### Waris CPS R06.12.05 (658 samples, 158 unique part numbers)

#### Portable Models (H25xxx) - 60 unique part numbers

| Band | Tier 0 | Tier 2 | Tier 3 | Tier 4 | Tier 5 | Tier 6 | Tier 8 |
|------|--------|--------|--------|--------|--------|--------|--------|
| LB1 (BE) | - | - | H25BEC9AA3 | H25BEG9AA4 | H25BEF9AA5 | H25BEH9AA6 | - |
| LB2 (CE) | - | - | H25CEC9AA3 | H25CEG9AA4 | H25CEF9AA5 | H25CEH9AA6 | - |
| VHF (KD) | - | H25KDC9AA2 | H25KDC9AA3, H25KDC4AA3 | H25KDG9AA4 | H25KDF9AA5 | H25KDH9AA6, H25KDH4AA6 | H25KDN9AA8 |
| 300 (ND) | - | - | - | - | - | H25NDH4AA6 | - |
| 330 (PD) | - | - | H25PDC9AA3 | - | - | H25PDH9AA6 | - |
| UHF1 (RD) | - | H25RDC9AA2 | H25RDC9AA3, H25RDC4AA3 | H25RDG9AA4 | H25RDF9AA5 | H25RDH9AA6, H25RDH4AA6 | H25RDN9AA8 |
| UHF2 (SD) | - | H25SDC9AA2 | H25SDC9AA3, H25SDC4AA3 | H25SDG9AA4 | H25SDF9AA5 | H25SDH9AA6, H25SDH4AA6 | H25SDN9AA8 |
| 800 (UC) | - | - | H25UCC6DU3 | - | - | H25UCH6DU6 | - |

Plus Display (DP) and Duty-cycle (DU) variants with additional part numbers.

#### Mobile Models - Old Chassis (H38xxx) - 38 unique part numbers

| Band | Tier 2 | Tier 3 | Tier 5 | Tier 6 |
|------|--------|--------|--------|--------|
| VHF (KD) | H38KDC9AA2 | H38KDC9AA3, H38KDC4AA3 | - | H38KDH9AA6, H38KDH4AA6 |
| 330 (PD) | - | H38PDC9AA3 | - | H38PDH9AA6 |
| UHF1 (RD) | H38RDC9AA2 | H38RDC9AA3, H38RDC4AA3 | - | H38RDH9AA6, H38RDH4AA6 |
| UHF2 (SD) | H38SDC9AA2 | H38SDC9AA3, H38SDC4AA3 | - | H38SDH9AA6, H38SDH4AA6 |

Plus DU variants for VHF, UHF1, UHF2.

#### Mobile Models - New Chassis (M25xxx) - 60 unique part numbers

| Band | Tier 0 | Tier 1 | Tier 2 | Tier 5 | Tier 6 | Tier 8 |
|------|--------|--------|--------|--------|--------|--------|
| LB1 (BK) | M25BKA9AA0A | M25BKC9AA1A | M25BKD9AA2A | M25BKF9AA5A | - | - |
| LB2 (CK) | M25CKA9AA0A | M25CKC9AA1A | M25CKD9AA2A | M25CKF9AA5A | - | - |
| LB3 (DK) | M25DKA9AA0A | M25DKC9AA1A | M25DKD9AA2A | M25DKF9AA5A | - | - |
| VHF (KH) | M25KHA9AA0A | M25KHC9AA1A | M25KHD9AA2A | M25KHF9AA5A | M25KHF9DU6A | M25KHN9AA8A |
| VHF (KK) | M25KKA9AA0A | M25KKC9AA1A | M25KKD9AA2A | M25KKF9AA5A | M25KKF9DU6A | M25KKN9AA8A |
| UHF1 (RH) | M25RHA9AA0A | M25RHC9AA1A | M25RHD9AA2A | M25RHF9AA5A | - | M25RHN9AA8A |
| UHF1 (RK) | M25RKA9AA0A | M25RKC9AA1A | M25RKD9AA2A | M25RKF9AA5A | - | M25RKN9AA8A |
| UHF2 (SH) | M25SHA9AA0A | M25SHC9AA1A | M25SHD9AA2A | M25SHF9AA5A | - | M25SHN9AA8A |
| UHF2 (SK) | M25SKA9AA0A | M25SKC9AA1A | M25SKD9AA2A | M25SKF9AA5A | - | M25SKN9AA8A |

Plus DP, DU, and PW variants.

### GP300 CPS R03.11.16 (181 samples, 68 unique part numbers)

All GP300 samples use market code AN (older EMEA certification). Band codes use the older xC/xD scheme.

Unique band prefixes in GP300 that do NOT appear in Waris samples: KC, RC, TD, ED.

### Models Added in Waris (Not in GP300)

158 models in Waris vs 68 in GP300, with **zero overlap** in part numbers (different market codes AA vs AN, different band code generations).

Key additions in Waris CPS:
- **Display models**: GP344 (tier 7), GP366R, GP388 (tier 9) -- all with DP market code
- **800 MHz band**: UC band code (H25UCC, H25UCH)
- **300/330 MHz bands**: ND and PD band codes
- **New mobile chassis**: Entire M25 family (GM3xx Waris Mobile New)
- **LS Trunking**: Tier 8 models (N feature code) with Quik-Call II
- **DU/PW variants**: Duty-cycle and Power Worker certifications
- **LB3 band portables**: Missing in GP300 samples (only ED in GP300)

---

## Codeplug Version Analysis

### Config Info Structure (CcgCpConfigInfo)

The first byte of the binary codeplug image encodes the layout configuration:

```
Bit 7-4: Layout version index (0-15)
Bit 2:   isImageRWCs (per-entry RW checksums)
Bit 1:   isFixedVectorBlk (inverted: 0=fixed, 1=variable)
Bit 0:   configInfoLength (0=2 bytes, 1=4 bytes)
```

The extraction function at Rcg41.dll+0x2F70 (`CcgCpConfigInfo::InitFromFirstByte`) uses a bit-field extractor at Rcg41.dll+0x64E0: `extract(value, msb=7, num_bits=4)` to get the layout version index from the top nibble.

### Layout Version Strings (ProRadio.exe @ 0x3D6BB8)

The Waris CPS contains a version table supporting 13 layout versions:

| Index | Version String | Status |
|-------|---------------|--------|
| 0 | "0.00" | Legacy |
| 1 | "1.00" | Legacy |
| 2 | "2.00" | Legacy |
| 3 | "3.00" | Legacy |
| 4 | "4.00" | Legacy |
| 5 | "5.00" | Legacy |
| 6 | "6.00" | GP300 era |
| 7 | "7.00" | GP300 era |
| 8 | "8.00" | Current (all samples) |
| 9 | "9.00" | Reserved/future |
| 10 | "10.00" | Reserved/future |
| 11 | "11.00" | Reserved/future |
| - | "03.00" | Special (GP300 legacy string with leading zero) |

The GP300 CPS (gp300.exe) only contains the string "03.00" -- it does not have a version table. The Waris CPS includes "03.00" for backward compatibility.

### Sample Analysis Results

**All 839 analyzed .cpg files (both GP300 and Waris) have first byte = 0x80:**
- Layout version index = 8 (top nibble)
- isFixedVectorBlk = true
- isImageRWCs = false
- configInfoLength = 2 bytes

This means every sample uses layout version "8.00". The codeplug data version (which differs between samples) is stored in a data block accessed via the Type Control Block and Vector Block, not in the Config Info header.

### GP300 Filename Suffixes

GP300 samples use numeric suffixes (_6, _7, _8) that represent the **CPS revision compatibility tier**, not the layout version:

| Suffix | GP300 CPS Support | Model Coverage | Avg Decrypted Size |
|--------|-------------------|----------------|-------------------|
| _6 | R03.09.03+ | 45 samples, original models | ~1268 bytes |
| _7 | R03.11.16+ | 68 samples, adds newer models | ~1282 bytes |
| _8 | R03.11.16 | 68 samples, latest firmware | ~1283 bytes |

Models introduced at tier 7 (not present in tier 6): H25KDC4, H25KDC9xx2, H25KDH4, H25ND*, H25RDC4, H25RDC9xx2, H25RDH4, H25SDC4, H25SDH4, H25TD*, H38PD*, H38TD*, M25KHF4, M25RHF4, M25SHF4.

### Waris Codeplug Size Clusters

Decrypted codeplug sizes vary by model feature tier and firmware generation:

| Feature Tier | Band | Size Range (older FW) | Size Range (newer FW) |
|-------------|------|----------------------|----------------------|
| Tier 0 (basic) | VHF/UHF | 558-567 | N/A |
| Tier 1 (5-Tone) | VHF/UHF | 690-700 | N/A |
| Tier 2 (limited) | VHF/UHF | 592-600 (port) / 1110-1122 (mob) | 1437-1446 (mob) |
| Tier 3 (standard) | VHF/UHF | 665-677 (port) | 957-971 (port, newer FW) |
| Tier 4 (mid) | VHF/UHF | 778-790 | N/A |
| Tier 5/6 (full) | VHF/UHF | 1406-1420 (port) / 1540-1555 (mob) | 1741-1760 (port) / 1867-1880 (mob) |
| Tier 7 (display) | VHF | 1804-1825 | N/A |
| Tier 8 (LTR) | VHF/UHF | 1678-1682 | 2020-2030 |
| Tier 9 (display+) | VHF | 1827-1837 | N/A |
| Display portable (DP5) | VHF | 1750-1761 | N/A |
| Display portable (DP6) | VHF | 1751-1760 | N/A |
| Display mobile | VHF | 1999-2027 | N/A |

The "newer FW" column corresponds to firmware codes with higher numbers (PMUD22xx+ for VHF, PMUE27xx+ for UHF), which add additional codeplug blocks for new features.

---

## CPS Version Compatibility

### GP300 CPS (R03.09.03 and R03.11.16)

- Layout version: "03.00" (single version, no upgrade path)
- 68 unique model part numbers supported
- Market code: AN (EMEA GP300 certification)
- Band codes: KC (VHF), RC (UHF1), plus BE, CE, ED (low bands), KD, RD, SD, TD
- Maximum codeplug versions: 6, 7, 8

### Waris CPS (R06.12.05)

- Layout versions supported: "0.00" through "11.00" plus "03.00"
- 158 unique model part numbers supported (from samples; actual supported count likely higher)
- Market codes: AA, DP, DU, PW
- All GP300 band codes supported plus: ND, PD, UC, and new mobile codes (xH, xK)
- Radio abstraction layer: 4 COM objects (Waris Portable, Waris Mobile, Waris Portable New, Waris Mobile New)

### Version Migration

The Waris CPS can open and upgrade GP300-era codeplugs because:
1. It supports layout version "03.00" for backward compatibility
2. Layout version 8 is used by all current-generation firmware
3. The `GetVersionModelFromUser` function (ProRadio.exe) handles version/model selection during upgrade
4. The `GetSaveAsVersionIndex` / `GetSaveAsModelIndex` functions handle format conversion during save

---

## GUID Analysis

Two distinct GUIDs appear across all samples:

| GUID | Usage |
|------|-------|
| `e0abc1c663cad11181b700a024deba0e` | All GP300 samples (181 files) |
| `20ac91bc4d21dd4894b57dc2995a87ab` | Most Waris samples (standard models) |
| `8384e50bcaedad4c8de77537f16dda8e` | Some Waris samples (display DP models, newer DP firmware, LB2/LB3 mobiles) |

The GUID identifies the radio abstraction COM object used to create the codeplug file. The GP300 GUID corresponds to the older `Radio.Motorola.GP300` COM server, while the Waris GUIDs correspond to `Radio.Motorola.Waris` / `Radio.Motorola.WarisMobile` COM servers.

---

## Firmware Code Naming

Waris sample filenames include firmware codes in the format `PMxx####R`:

| Prefix | Meaning |
|--------|---------|
| PMUB | Portable Module, LB1/LB2 band firmware |
| PMUD | Portable Module, VHF band firmware |
| PMUE | Portable Module, UHF1/UHF2 band firmware |
| PMUF | Portable Module, Display/800MHz firmware |
| IMUB | Installation Module (mobile), LB band |
| IMUD | Installation Module (mobile), VHF band |
| IMUE | Installation Module (mobile), UHF band |

The numeric portion is a unique firmware build number. The trailing letter (A, B, C, D, E, F) is the firmware revision within that build -- each revision may have a different codeplug block configuration, resulting in different decrypted sizes.
