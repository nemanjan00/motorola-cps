# DPS EMEA 600 Series — Overview

**Software**: Dealer Programming Software (DPS), post-R00.03.02 (binaries 1999-04-06)
**Radios**: GP600 (MPT1327 trunked portable), GM600 (MPT1327 trunked mobile)
**Predecessor data**: GP1200 / GM1200 (GVN6007) RSS "OLD" format files readable
**Region**: EMEA (MPT1327/RegioNet43/Dutch PTT networks; EN/DE/FR languages)

This is a **pre-RSS/pre-CPS generation** programmer — the oldest Motorola software
family in this archive. No relation to the Commercial Series CPS (CM/CP) or the
GP/GM300 Waris CPS other than vendor. Different radio family, different protocol,
different file formats.

## Software Components

Two install variants ship in the archive:

| Variant | Target radios | Contents |
|---------|---------------|----------|
| DPSWNP | 600 series **without data panel** | Network Programmer (`WDPS_NP.EXE`) + Dealer Programmer resources (`W_DEALER.*`) |
| DPSWDP | 600 series **with data panel** | Dealer Programmer (`WDPS_DP.EXE`) |

Roles (from the bundled user manual, `NET_MAN.PRN` / `DPSUMN`/`DPSUMD`):

- **Dealer Programmer** — configures radio features; reads/writes radios over serial;
  service windows (tuning: bias voltage, alignment) are password protected.
- **Network Programmer** — offline editor for Radio Network Data (`.net` files);
  cannot talk to a radio directly. Combined network+personality saves as `.rad`.

Architecture: 16-bit Windows 3.1 (NE) GUI executables built with **Zinc Application
Framework 4.0** (Zinc Software Inc., 1990–1995). `W_DEALER.*`, `DPSHLP_*`, `DPSUM*`
are Zinc "Data File Version 4.0" compiled resource/UI files. `WSERIAL.EXE` is a DOS
MZ serial helper (31,516 bytes, identical in both variants). DOS counterparts
(`ddps_np`, `ddps_dp`) referenced by READMEs but **not present** in this archive.

Default install path: `c:\mrss\mpt\dpswnp` / `c:\mrss\mpt\dpswdp` (from DPS.CFG).

## File Types

| Extension | Content |
|-----------|---------|
| `.net` | Network data (Network Programmer) |
| `.per` | Personality data (Dealer Programmer) |
| `.rad` | Combined radio data = network + personality (Dealer Programmer) |
| `.cfg` | DPS configuration (plaintext header + binary body) |

File dialog templates in the binaries: `%s\%4.4X.net`, `%s\%4.4X.per`,
`%s\%4.4X.rad`, `%s\dps.net` (hex-numbered filenames).

Two on-disk formats exist: **OLD** (GP1200/GM1200 RSS GVN6007 era — fewer fields,
DPS supplies defaults for missing ones) and **NEW** (DPS native).

## Supported Models

28 model numbers embedded in both `WDPS_NP.EXE` (offset ~0x229F0) and `WDPS_DP.EXE`.
Pattern: `M08{BAND}H{TIER}{CH}CK{REV}` (+`BN` suffix variants):

```
M08EHA4CK1 M08EHA6CK1 M08EHE4CK2 M08EHE6CK2 M08EHF4CK3 M08EHF6CK3
M08KHA4CK1 M08KHA6CK1 M08KHE4CK2 M08KHE6CK2 M08KHF4CK3 M08KHF6CK3
M08NHA4CK1 M08NHA6CK1 M08NHE4CK2 M08NHE6CK2 M08NHF4CK3 M08NHF6CK3
M08PHE4CK2 M08PHF6CK3
M08RHA4CK1 M08RHA6CK1 M08RHE4CK2 M08RHE6CK2 M08RHE8CK2 M08RHF4CK3
M08RHF6CK3 M08RHF8CK3   (+ BN-suffixed variants of 4 R-models)
```

- `M08` = 600 series family prefix (mobiles; GM600). GP600 portable numbers not
  found in these binaries.
- Band letters observed: E, K, N, P, R.
- Tier letters: A / E / F (feature tiers; BN = "Band N"? variant suffix on R only).
- Channel digit: 4 / 6 / 8.

Also present: `P94VJA05N1/N2`, `P94VJB05N1/N2` (accessory or panel part numbers).

## Network Data Field Catalog (from bundled manual)

The Network Programmer edits these sections (Edit menu). Ranges/defaults are
documented in `processed/.../files/DPSWNP/NET_MAN_UTF8.txt` (CP437→UTF-8 conversion
of NET_MAN.PRN):

- **MPT Network Specific** — Network Type (Regional/National), Dialling Plan
  (RegioNet43 / MPT1343 / Dutch PTT), Registration Info, Home Zone, Control
  Category (A–D), Network Operator ID, Area/Zone sub-field lengths, channel number
  bounds (1..1023), voting params (NVote, LMVote, TVote)
- **Hunt Options** — comprehensive/background/preferential hunt, channel voting
  timer, RSSI margins LM1–LM4 (0..42 dB, 6 dB steps)
- **Radio Flags** — registration on power-up, short PABX addressing, Tx timer
  clear-down, sync pattern (MPT1327 / PAA 1382), de/pre-emphasis (MPT1327 /
  PAA1328), conventional mode, Radio Config Bytes 1–2
- **Preferential NDD Data** — up to 6 entries (priority 1–10, field length,
  sub-field), NDD sample duration. NOTE: DPS R00.02.21→R00.03.02 fixed reversed
  NDD priority (now 1 = highest)
- **Access Authorization** — up to 8 entries (identity + class Area/Full/Zone)
- **Control Channel List** — up to 32 entries (channel, time-shared, home channel)
- **Channel Frequency Plan** — entry 0 = trunked base Rx/Tx (nominal channel 0);
  up to 15 flexible channels; frequencies in integer multiples of 1250 Hz
- **Counters** — NC1/NC2/NV/NX1/NX2 (continuous + time-shared), NZ1, NZ2, ND1, ND2,
  NE, NI, NR, NS, NT, NW
- **Timers** — TA, TB, TC, TD, TH, TI, TJ, TL, TN, TP, TS, TT, TW

Frequency granularity: 1250 Hz (1.25 kHz) — distinct from the 5 kHz Waris system.

## Known Behaviors / Quirks

- Serial number registered at install, shown in Start Up window.
- Service (tuning) windows password-protected; second bias-voltage window only for
  models with two bias levels.
- Model number of loaded data can be changed (Edit menu) since R00.03.02; data can
  be programmed into a different but compatible model.
- Status bar shows data source; `.rad` save sets Format = "Radio".
