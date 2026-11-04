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

## Byte-coverage map (what's reversed vs. remaining)

Occupancy of the 640 bytes (`.`=`00`, `f`=`FF`, `X`=data) with region status:

```
0x0D80 XXXXXXXXXXXXXXXX  Radio/alignment block (READ-ONLY). serial @0x0D88 ✓;
0x0D90 XXXXXXXXXXXXXXXX    tuning/softpot + band-cal grid @0x0DDA (freq formula) — UNMAPPED
0x0DA0..0x0E12 XXXX...      (factory alignment; needs the Tuner tool; not host-editable)
0x0E13 XXXXXX.X.XXX.X.X  NETWORK block (MPT system params) — UNMAPPED (edited by WDPS_NP.EXE)
0x0E20..0x0E4F  data        dense system data
0x0E50..0x0E6F  sparse      small-value list @0x0E5F–0x0E6C (0C 09 05 0B 03 07 02 0A ...)
0x0E70..0x0EAE  00          empty/reserved on this radio
0x0EB0 XXX.XXXXX.XXXXX.   likely system/control-channel frequencies (0x3778→446.0, 0xACFE→446.99)
0x0EC0..0x0EFF  00          empty
0x0F00..0x0F07  Network tail (0x0F06–07 in Network checksum domain)
0x0F08..0x0F32  PERSONALITY config — MAPPED: MPT numbers, Call Timers, power, options, group list
0x0F33..0x0F66  "00 00 00 80" ×13 table — UNMAPPED meaning (not per-channel options)
0x0F67..0x0F82  conventional channel table (4×7B) — MAPPED (freq/PL/+6 options); exactly 4 entries
0x0F83..0x0F99  Shortform Dialling buffer — MAPPED (BCD-nibble dial strings, 0xF-terminated)
0x0FA0..0x0FF3  FF           unused padding
0x0FF4         personality checksum (additive) ✓ ; 0x0FF5–0x0FFB DPS-cleared field
```

Large `00`/`FF` runs are genuinely unused on this radio (nothing to decode there). The real
remaining work for "every bit": the **Network block** (`0x0E13`–`0x0F07`, via WDPS_NP), the two
personality tables (`0x0F33`, `0x0F83`), the alignment/tuning region (via Tuner), and the leftover
small config bytes in `0x0F15`–`0x0F29`.

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

Radio `0x0F67`, array of **7-byte records**, terminated by the first record whose **Tx
frequency word = `0xFFFF`** (the `.per` field help: "Tx frequency 0 ends the entries"):

| Offset in record | Field | Encoding | Status |
|---|---|---|---|
| +0 | Rx frequency | BE16, formula above | **confirmed** |
| +2 | Tx frequency | BE16, formula above (==Rx for simplex); `0xFFFF` = end | **confirmed** |
| +4 | Tx PL tone | TPL list index (0 = none); CH4 = `0x13`=19 matches `.per`/GUI | **confirmed** |
| +5 | Rx PL tone | RPL list index (0 = none); `0x00` here = "Disabled" in GUI | **confirmed** |
| +6 | per-channel options | bit0 Data, bits2:1 Tx Inhibit, bit3 Tx Power(1=High), bit4 Monitor (see bitfield below) | **bound** |

This radio: 4 records at `0x0F67/0x0F6E/0x0F75/0x0F7C`, then `0x0F83` has Tx word `0xFFFF`
(table end). GUI columns (Edit → Conventional Personality) confirm all four: Rx/Tx MHz, Tx Power,
Tx Inhibit, Rx PL, Tx PL, Monitor, Data — ch4 shows `Tx PL = 3Z 123.0` (= native `+4` `0x13`).

### `+6` byte = per-channel options; Monitor = bit4 (contrast-confirmed 2026-11-04)

A clean DPS write-contrast settled this (see [LIVE_CAPTURE.md](LIVE_CAPTURE.md) → "Option-bit
write-probe"): set **ch1 Monitor = Yes** in DPS, Write Radio, read the radio back, diff vs the
baseline dump → **exactly two bytes changed**:

| radio addr | baseline → mod | meaning |
|---|---|---|
| `0x0F6D` (ch1 `+6`) | `08 → 18` | **Monitor = `+6` bit4 (`0x10`)**, Yes=1 |
| `0x0FF4` | `E6 → F6` | personality checksum byte (additive; `+0x10` data → `+0x10` here) |

So the `+6` byte **does** hold the per-channel options (not a separate `0x0F33` table — the earlier
guess here was wrong). Full bitfield, each bit bound by its own 1-write DPS contrast:

| `+6` bit | mask | field | values |
|---|---|---|---|
| 0 | `0x01` | Data | 1=Yes (Data=Yes → `08→09`) |
| 2:1 | `0x06` | Tx Inhibit | 0 Disabled, 1 On BUSY (`08→0A`), 2 Unless PL (needs Tx PL) |
| 3 | `0x08` | Tx Power | 1=High, 0=Low (Power=Low → `08→00`) |
| 4 | `0x10` | Monitor | 1=Yes (Monitor=Yes → `08→18`) |
| 7:5 | `0xE0` | unknown | not yet bound |

Default `0x08` = Power High, rest off. Driving DPS is now automated headlessly (`mouse_ctl.py`,
closed-loop mouse via the QEMU monitor after `WIN.INI MouseSpeed=0` + paced commands).

DPS validation constraints: **Tx Inhibit is incompatible with Tx PL**; frequencies must stay on the
channel step grid (off-step → "Personality data is invalid").

## MPT Personality Data — packed BE16 number table @ `0x0F08`

Edit → Trunking → MPT Personality Data. Located by matching the DPS dialog values against the
baseline dump (six known values appear in the dialog's order — not coincidence). Packed big-endian
16-bit, byte-contiguous (fields start at odd offsets):

| radio addr | field | value on ref radio |
|---|---|---|
| `0x0F08` bits0-5 | Own Prefix (MPT1327 format) | 43 (`0x2B`); bit7 = **LNR Enable** (inverted: set=off), bit6 spare |
| `0x0F09` BE16 | Own Fleet Indv. No. | 2001 (`0x07D1`) |
| `0x0F0B` BE16 | Own Unit No. (= radio identity) | 322 (`0x0142`) |
| `0x0F0D` BE16 | Highest Unit No. | 899 (`0x0383`) |
| `0x0F0F` BE16 | Lowest Callable No. | 200 (`0x00C8`) |
| `0x0F11` BE16 | Highest Callable No. | 799 (`0x031F`) |
| `0x0F13` BE16 | Own Fleet Group No. | 5500 (`0x157C`) |

**Call Timers** (Edit → Trunking → Call Timers), packed in this area:
- `0x0F16` BE16 = Limit Normal Call Duration (300 s = 05:00)
- `0x0F18` BE16 = Limit Emergency Call Duration (30 s = 00:30)
- `0x0F1C` u8 = Call in Absence Delay (seconds; `CA`→`CF` for 10→15 s)
- `0x0F26` u8 = Emergency Call Activation Delay (**0.25 s units**: 3 s=`0C`, 1 s=`04`)
- `0x0F27` u8 = Normal Call Activation Delay (0.25 s units; `08`=2 s — inferred, same pair)
- `0x0F28` u8 = External Alarm Duration (seconds; `01`→`05` for 1→5 s)
(All contrast-confirmed except `0x0F27`; checksum `0x0FF4` tracked each.)

**MPT flags** (contrast): `0x0F1D` bits 4,5 = Alert Tones in NPD / MAINT Telegrams in NPD (one
each, order TBD); `0x0F08` bit7 = LNR Enable (inverted). Still TBD here: Imitate OACSU, MPT Tx
Power Level combo (likely mirrors per-channel `+6` bit3), Highest Group No., Indv/Group Dial Digits.

### Network block structure (`0x0E13`–`0x0F07`, from WDPS_NP)

The Network block is the MPT1327 *system* definition, authored as a `.net` file in the separate
**Network Programmer (WDPS_NP.EXE)** and merged into the radio codeplug at programming time (WDPS_NP
has no Read-Radio — File→Open `.net` only). Its editors (= the block's sections):
**MPT Network Specific, Hunt Options, Radio Flags, Preferential NDD Data, Access Authorisation,
Control Channel List, Channel Frequency Plan, Counters, Timers.**

Correlated to the radio dump (the sample `dps.net` has *different* values, so only structure matches):
- `0x0E5F`–`0x0E6C` = **Control Channel List** — 8 entries (radio: channel numbers `0C 09 05 0B 03 07
  02 0A`; dps.net sample had 58/62/64/77/…), with Time-shared / Home-Channel flag bits.
- `0x0EB0`–`0x0EBD` = **Channel Frequency Plan** frequencies (`0x3778`→446.00, `0xACFE`→446.99,
  `0xA9DE`→441.99 via the freq formula) — the number→MHz map.
- `0x0E13`–`0x0E4F` = dense MPT-network/hunt/flags/NDD/access/counter/timer fields (per the editors).

To byte-map the radio's actual network values — **the `.rad`-export path does NOT work**: tried it
(WDPS_DP Read Radio → File→Save, Format=Radio → `RAD1`, 3025 B NEW `.rad`), and the embedded `.net`
section decodes to **KEY9 filler** (`F6 39 2B A8 0D 51 C7 4D C2` repeat = empty), i.e. WDPS_DP does
not expose the live network data as `.net`. So binding network bytes needs the **native→`.net`
transform reversed from WDPS_NP.EXE** (its 9 editors + the `dseg54` descriptor table), then applied
to `native-eeprom.bin`. **Not yet done.**

All three quick contrast avenues are blocked (verified): (1) WDPS_NP has no Read-Radio; (2) WDPS_DP's
`.rad` export decodes to KEY9 filler (network not exposed); (3) opening a foreign `.net` (dps.net)
in WDPS_DP is refused — *"Network data is incompatible with Personality data"* (the personality's
fleet 5500 / groups 907-908 cross-validate against the network). So a network write-contrast needs a
`.net` authored from scratch in WDPS_NP to match THIS radio's personality, then merged+written — a
substantial task — or the merge transform reversed statically.

Format note (new): a **`.rad` from this DPS is XOR-encoded** with the repeating 7-byte key
`5D 29 EA 64 B3 7F 1C` (phase 0) — RAD1 magic `C6 1E 18 D5 7A 21 86 1D 34` ⊕ key = the plaintext
`9B 37 F2 B1 C9 5E 9A 40 1D`. (The `.per` saved by this same DPS is plaintext — so `.per` plaintext
but `.rad` XOR'd in R00.05.04; see [FILE_FORMAT.md](FILE_FORMAT.md).)

**Block boundary:** the checksum-domain probe puts `0x0F06`–`0x0F07` in the **Network** block and
`0x0F08`+ in the **Personality** block. So MPT *Personality* Data / Call Timers / Common Radio
params are all personality; the ~240-byte **Network** block (`0x0E13`–`0x0F07`, MPT system params)
is the separate "Network" data source edited by **`WDPS_NP.EXE`** — still essentially unmapped (its
field layout is the 60-record descriptor table at NP file `0x9B9E0` / IDA `dseg54`).

**Derived (not stored):** Group Ident 7007, Highest Group No. 979, Own No. Prefix 243, Own Ident 124
are absent from the dump in any BE16/LE16/BCD form — they are computed MPT1327 address values
(prefix/ident decomposition of the stored fleet-group/group numbers), not codeplug bytes.

**`0x0F33`–`0x0F66` = 13 × 4-byte slots**, all `00 00 00 80` on this radio (only the 4th byte, a
`0x80` empty/disabled marker, is set). An empty list (scan or call/phone list) — needs a populated
entry (DPS contrast) to decode its fields. (`0x0F83`–`0x0F99` is the Shortform Dialling buffer —
see its own section, now decoded.)

Still TBD in/after the number table: Indv./Group Dial Digits (3/3),
Own No. Prefix (243), Indv./Group Dial Digits (3/3), Imitate OACSU, and the NPD/LNR flags & Tx Power
combo (Tx Power here likely overlaps the per-channel `+6` bit3). The `2B 15 7C 87 / 2B 15 7C 88`
run at `0x0F2B`–`0x0F32` is the **Own Group Numbers** list (Edit → Trunking → Own Group Numbers):
2 entries × 4 bytes = `[Group Prefix u8 = 0x2B=43][Fleet Group BE16 = 0x157C=5500][Group u8]`, with
`0x87`/`0x88` = displayed groups 907/908 (group = byte + 0x304; MPT group-address offset). Talkgroup
Enable (No/No) isn't in these 4 bytes — a flag elsewhere. Preceding byte `0x0F2A` = 0x00.

## Common Radio Parameters — personality config region `0x0F00`–`0x0F32`

DPS's Edit → Common Radio Parameters (radio-wide settings) are stored in this region of the
personality block (inside the `0x0FF4` checksum domain). Bound by write-contrast:

| radio addr | field | encoding |
|---|---|---|
| `0x0F1A`–`0x0F1B` | **Call Enable** bitmask | 12+ call-type flags (`BF FF` = all on); Edit→Trunking→Call Enable. Toggling flags cleared bits in `0x0F1A`; exact bit→flag order TBD |
| `0x0F1E` | **Low Power level** | calibrated byte, not raw W (5 W = `0x2D`, 8 W = `0x39`; ~+4/W here) |
| `0x0F1F` | **High Power level** | calibrated byte (25 W = `0x64`, 24 W = `0x62`; ~−2/W here) |
| `0x0F23` bit6 (`0x40`) | **Acoustic Feedback** | 1 = enabled |
| `0x0F25` | **Alert Tone Volume Offset** | linear (0 → `0x00`, 4 → `0x04`) |
| `0x0F2A` bit7 (`0x80`) | **Telephone Type Handset** | 1 = enabled |

Still to bind here: Minimum Volume Level, Display Backlight Mode (enum), DTMF tone durations /
overdialing flags, Keypad Lock, and the `b0 2b 07 d1 …` / `15 7c 87` data near `0x0F0C`–`0x0F32`
(signaling/timers). Power levels being calibration bytes means a host can't set watts directly
without the cal curve.

## Shortform Dialling buffer — `0x0F83`–`0x0F99` (contrast-confirmed)

DTMF dial strings (Edit → Trunking → Shortform Dialling), **BCD-nibble packed, `0xF`-terminated**,
one variable-length string per position, in fixed order. Nibble `0xB` = `*`. Bound by contrast
(Base Call 306→999 → `0x0F83 30→99`, `0x0F84 6F→9F`; checksum `0x0FF4 E6→7F` = +0x99 = the data
delta). Reference-radio bytes `30 6F FF FF FF 40 0F BF 32 0F 32 1F 32 3F 32 4F 32 5F 32 6F 32 7F 32`
decode as:

| position | nibbles | value |
|---|---|---|
| Base Call | `306|` | 306 |
| A / B / C | `FF FF FF` | allocated (Conv Chan / Call-in-Absence / External Alarm) |
| D | `400|` | 400 |
| Ext Line | `B|` | `*` |
| 1,2,3,4,… | `320| 321| 323| 324| 325| 326| 327|…` | 320,321,323,324,… |

This region was previously mis-labelled a "ch5 end-marker / scan table"; it is the shortform buffer.
The conventional channel table is therefore **exactly 4 entries** (`0x0F67`–`0x0F82`); `0x0F83` begins
this buffer.

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

## Checksum — ADDITIVE; personality byte @ `0x0FF4` found

DPS validates per-block checksums on read (`Radio / Network / Personality Data Checksum Failure`).
The checksum is **additive, stored (not `0xFF−sum`)**: the Monitor write-contrast changed one data
byte by `+0x10` and byte **`0x0FF4`** by `+0x10` (`E6 → F6`) — so `0x0FF4` is the **personality
checksum byte** and it tracks the data sum with the same sign (`checksum = Σ(data) & 0xFF`). A host
editing the personality must recompute it (`+= Σ of its data-byte deltas`).

Summed range is still being pinned (candidate `~0x0F1D–0x0FE0`, sums to `0xE6` on baseline). The
NETWORK block has its own checksum domain (`0x0F06` is in it — changing it → `Network Data Checksum
Failure`); its checksum byte/range are not yet located. `sum(all 640) & 0xFF = 0xB0` (per-block, not
whole-image). An earlier `0xFF−sum` claim here was wrong (caught by a pre-write-dump cross-check).

## DPS clears a 7-byte field on write

Diffing the pre-write dump against DPS's captured write: DPS changed exactly **7 bytes**,
`0x0FF5`–`0x0FFB`, from `20 00 00 00 00 11 DC` (factory) to `FF FF FF FF FF FF FF` — the only change
outside re-writing data. Likely a programming-history / flag / counter field (`11 DC` ~ a value),
cleared on each write. `native-eeprom.bin` is the **pre-write** image and holds the factory bytes;
replaying the captured write (`sbep_write.py --restore`) restores the post-DPS state, not factory.

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

## Native option-flag bindings — attempted, UNRESOLVED (needs contrast)

Goal was to bind the per-channel option fields (Tx Power, Tx Inhibit, Rx/Tx PL, Monitor, Data,
Transmit Timeout) to native byte/bit positions. Two GUI-free angles were tried:

**Angle 1 — DP static bit-layout tables.** `WDPS_DP.EXE` has three 14-byte-record tables:
`0xa9060` (34 recs) and `0xa93e0` (10 recs) are ASCII char-maps (fid = letter/digit code — noise);
`0xa9de0` (31 recs, fids 1001–1155) is the **network (.net)** block bit-layout (mirror of NP
seg54), mapping to the 0x00–0x70 network block, followed by `0x000d`-kind enum records. **No
personality/conventional-channel option bit-table exists** in DP in this form.

**Angle 2 — RAM dump.** In `dpsram.bin` the native codeplug buffer is resident at `0x62ED0A`, and
DPS's decoded channel objects are at `~0x6AAFF8` (each channel's Rx/Tx Hz as LE32, e.g. 446068750).
But every channel on the reference radio carries identical options, so the dump gives no contrast
either, and the native byte6→option decode is pack/unpack code, not stored metadata.

**Confirmed native channel record (radio 0x0F67, 7 bytes/entry, 4 entries):**

| +off | field | notes |
|------|-------|-------|
| +0 | Rx BE16 | freq formula |
| +2 | Tx BE16 | freq formula |
| +4 | Tx PL index | u8; CH4 = 0x13 (19 = 123.0 Hz), others 0 — **confirmed** |
| +5 | Rx PL index | u8; 0 on all channels — **inferred** |
| +6 | flags/marker | u8; **constant 0x08** on all 4 channels |

The per-channel options (power/inhibit/monitor/data) are **not individually locatable**: all four
channels are Power=High / Inhibit=Off / Monitor=No / Data=No, so there is no value contrast; byte+5
and byte+6 are the only non-freq/PL per-channel bytes and are constant (`00`, `08`). Whether `+6`
packs those flags (so `0x08` = the all-default encoding) or is a record marker with options bit-packed
elsewhere could not be decided from static data or the no-contrast RAM.

**To finish:** a write-contrast capture — change one option in DPS, Write Radio, diff the native
`0x17` payload against `native-eeprom.bin` — or read a radio whose channels have differing options.
That is the only way to assign these bits.
