# GM600 native codeplug — bit-level map

Field-level map of the radio's **native** codeplug (the 640-byte internal 68HC11 EEPROM at radio
address `0x0D80`–`0x0FFF`), derived by correlating it against a DPS-decoded `.per` of the **same
radio** (serial `807IYA0903`, model `M08RHF4CK3`, UHF R-band).

This is the format the radio actually stores and the wire read returns — distinct from the
plain-Hz `.per`/`.rad` *file* format in [FIELD_MAP.md](FIELD_MAP.md). DPS transforms this native
block into the `.per` on read.

**Ground truth** (both captured this session, byte-verified against each other and the firmware
dump): `processed/.../captures/native-eeprom.bin` (the 640 native bytes) and `.../radio.per` (the
DPS decode). Offsets below are **radio addresses**; subtract `0x0D80` for the file offset into
`native-eeprom.bin`.

## Frequency encoding — CONFIRMED (all 4 channels, 6 values)

A frequency is a **big-endian 16-bit** value. Bit 15 selects the channel step; the low 15 bits
are a count from a fixed 375.000 MHz reference:

```
step   = 6.25 kHz  if (v & 0x8000)   else   5 kHz
f_MHz  = 375.000 + (v & 0x7FFF) * step
```

| Channel | stored BE16 | bit15 | step | → MHz | `.per` |
|---|---|---|---|---|---|
| CH1 Rx/Tx | `AC6B` | 1 | 6.25 kHz | 446.0688 | 446.0688 ✓ |
| CH2 Rx/Tx | `AC75` | 1 | 6.25 kHz | 446.1313 | 446.1313 ✓ |
| CH3 Rx/Tx | `AC6F` | 1 | 6.25 kHz | 446.0938 | 446.0938 ✓ |
| CH4 Rx | `31B5` | 0 | 5 kHz | 438.6250 | 438.6250 ✓ |
| CH4 Tx | `2BC5` | 0 | 5 kHz | 431.0250 | 431.0250 ✓ |

Reference `375.000 MHz` matches the band-cal reference documented in FIELD_MAP.md. (This is the
radio-side encoding; the firmware's own synth routine that confirms the reference/step constants
lives in a flash bank not present in the dump, but the formula is proven from data.)

## Channel table — CONFIRMED

Radio `0x0F67`, array of **7-byte records**, terminated when byte 6 ≠ `0x08`:

| Offset in record | Field | Encoding | Status |
|---|---|---|---|
| +0 | Rx frequency | BE16, formula above | **confirmed** |
| +2 | Tx frequency | BE16, formula above (==Rx for simplex) | **confirmed** |
| +4 | Tx PL tone | TPL list index (0 = none); CH4 = `0x13`=19 matches `.per` | **confirmed** |
| +5 | (unknown) | `0x00` in all 4 records here | inferred: flags |
| +6 | record marker | `0x08` = channel present; ≠`0x08` ends the table | **confirmed** |

This radio: 4 records at `0x0F67/0x0F6E/0x0F75/0x0F7C`, then `0x0F83` has byte6=`0x0F` (table end).

**Not locatable from this radio** (every channel here has the same value, so there is no contrast
to bind them): Rx PL, Tx power (all High), Tx-inhibit, monitor, data-channel. Needs a radio whose
channels differ in these to place them. The `.per` carries them as separate 32-bit fields.

## Identity & info block — CONFIRMED

| Radio addr | Field | Encoding |
|---|---|---|
| `0x0D88` | Serial number | ASCII, `807IYA0903CG` (10 + 2-char suffix) |
| `0x0F0B` | **Radio identity** | **BE16 = 322** (`0x0142`) — the number shown on the display |
| `0x0D80`–`0x0D87` | header / config | `02 50 7F EA 4E B4 02 09` — block type/version (not decoded) |

## Regions (coarse)

| Radio range | Contents | Status |
|---|---|---|
| `0x0D80`–~`0x0E60` | Radio Service Data / tuning softpots (VCO, dev, power cal) | not decoded — alignment, do not edit |
| ~`0x0E60`–`0x0F66` | config / MPT network params incl. identity `0x0F0B` | partially mapped |
| `0x0F67`–`0x0F82` | **conventional channel table** (4×7 bytes) | **confirmed** |
| `0x0F83`–`0x0FFF` | padding / trailing (`FF`-filled tail, trailing bytes) | not decoded |

## Checksum — UNRESOLVED

`sum(all 640) & 0xFF = 0xB0`; no clean whole-block `0xFF−sum` relationship. The EEPROM likely uses
per-sub-block checksums (consistent with the project's per-block `0xFF−sum` note); the exact
block boundaries were not pinned down this pass.

## Validated decoder

`processed/DPS_EMEA_600SERIES_R00.03.02/captures/decode_native.py` reads `native-eeprom.bin` and
reproduces the ground truth **exactly** (identity 322; all 4 channels incl. the 5 kHz duplex and
the TxPL index). Core:

```python
def freq_mhz(v):                       # v = BE16 as stored
    step = 0.00625 if (v & 0x8000) else 0.005
    return 375.0 + (v & 0x7FFF) * step
# channel table: 7-byte records at radio 0x0F67 while byte6 == 0x08
#   +0 Rx BE16, +2 Tx BE16, +4 TxPL index
# identity: BE16 at radio 0x0F0B ; serial: ASCII at 0x0D88
```

## Unresolved / next

- Per-channel Tx power / Rx PL / inhibit / monitor bit positions (need a radio that varies them).
- Checksum block layout.
- The `0x0D80`–`0x0E60` tuning softpot encoding (needs the Tuner tool's field map or more pairs).
- Confirm the reference/step constants in DPS's unpack transform (`WDPS_DP.EXE`) for independent
  proof — the formula is data-proven but not yet traced in code.
