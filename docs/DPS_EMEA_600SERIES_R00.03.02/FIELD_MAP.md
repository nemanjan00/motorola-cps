# DPS 600 Series — .RAD / .NET Field Map

Extends FILE_FORMAT.md (container + crypto). All offsets are post-decryption file
offsets. Verified against bundled samples + descriptor tables in
`WDPS_NP.EXE`/`WDPS_DP.EXE`. Frequencies are **plain LE 32-bit Hz**.

## .NET body (0xDC–0x4BB) — also the network block embedded in .RAD

Dword index n ↔ offset 0xDC+4n. Section boundaries from the "create default .NET"
function's field-count loops (66 singles, then 6×3, 32×3, 8×2, then freq plan).

| Offsets | n | Group | Encoding |
|---------|---|-------|----------|
| 0x0DC–0x1E3 | 0–65 | 66 single fields (MPT Network Specific, Hunt Options, Radio Flags, Counters NC1..NW, Timers TA..TW; order not name-mapped) | LE dwords |
| 0x1E4–0x22B | 66–83 | Preferential NDD: 6 × 3 dwords (Priority [11=empty], Field Length, Sub-field) | dwords |
| 0x22C–0x3AB | 84–179 | Control Channel List: 32 × 3 dwords (Channel 1..1023, Time-shared, Home) | dwords |
| 0x3AC–0x3EB | 180–195 | Access Authorization: 8 × 2 dwords (Ident, Class 0=Area/1=Full/2=Zone) | dwords |
| 0x3EC–0x4AB | 196–243 | Channel Frequency Plan: 16 × 3 dwords (Channel, Rx Hz, Tx Hz); entry 0 = base | int + Hz |
| 0x4AC–0x4BB | 244–247 | Tail (Lowest/Highest System Channel, LMVote, TVote — or Radio Config Bytes + NVote; see caveat) | dwords |

Sample anchors: freq plan entry 0 = (0, 420000000, 410000000) → 0x3F0/0x3F4 are
Rx/Tx base Hz. **The frequency plan is 15 records and the tail is 7 dwords at 0x4A0**
(RadioCfg1, RadioCfg2, NVote, LowestSys, HighestSys, LMVote, TVote) — verified on `rad1.rad`
(DPS read of the bench GM600): HighestSys = 80 and the plan holds channels 0, 1, 80; slots past
the used ones hold filler garbage, not zeros. Sample `DPS.NET` tail = (0xE7, 0, 4, 1, 1023, 18, 5).

### The 66 single fields = EEPROM network block, packed (verified, 2026-11-12)

Comparing `rad1.rad` with the same radio's EEPROM (`native-eeprom.bin`), the single-field dwords
appear in order from radio `0x0E13`, packed by size — 35 consecutive values match:

| EEPROM | singles | packing |
|---|---|---|
| `0x0E13` | #0–#1 | bits, unresolved (`0x80` for 1, 0) |
| `0x0E14` | #2, #3 | nibbles (`0x45` = 4, 5) |
| `0x0E15`–`0x0E25` | #4–#20 | one byte each |
| `0x0E26`–`0x0E27` | #21 | BE16 (515) |
| `0x0E28`–`0x0E2E` | #22–#28 | one byte each |
| `0x0E2F` | #29, #30 | nibbles (`0xAA` = 10, 10) |
| `0x0E30`–`0x0E32` | #31–#33 | one byte each |
| `0x0E33`–`0x0E36` | #34–#37 | unclear; `0x0E35` = #36, `0x0E36` = #37 |
| `0x0E37`– | #38+ | nibble pair `0x11`, then BE16 words, not 1:1 in order |

The Control Channel List (`rad1.rad`: 12, 9, 5, 11, 3, 7, 2, 10) is radio `0x0E5D`–`0x0E6C`,
8 × 2-byte entries, channel in the low byte (earlier notes said `0x0E5F`, 2 bytes late).
Names of the singles are still unmapped (one NP edit → DPS write → EEPROM diff per field).

### Radio Flags — single-field dwords (live WDPS_NP contrast)

Three of the "66 single fields" are name-mapped by a live WDPS_NP `.net` write-contrast (edit
one field in View→/Edit→Radio Flags, Save, XOR-decode, diff vs baseline `DPS.NET`; 2026-11-04).
Header bytes 0xD5/0xD7–0xDB and the trailing file checksum change on every save — ignore them.

| field | body dword | file off | values |
|---|---|---|---|
| Registration On Power Up | #46 | 0x0194 | 0=off / 1=on |
| De/Pre-emphasis | #48 | 0x019C | 0=MPT1327 / 1=PAA1382 |
| Conventional Mode | #51 | 0x01A8 | 0=Inhibit, 1=Dealer, 2=All, 3=RegioNet43 |

**RETRACTED (2026-11-12):** an earlier version decoded these as bits of a "packed Radio Config
Byte1 @ 0x4A0" (bit7 registration inverted, bits[6:5] conventional mode, bit4 de-emphasis). The
files contradict it: `DPS.NET` has Conventional Mode = 2 but 0xE7 has bits[6:5] = 3; `rad1.rad`
has Registration = 0 but 0x1A has bit7 = 0. 0x4A0 is the first tail dword (RadioCfg1), meaning
unidentified. Where the three flags land in the radio network block is unknown.

## .RAD personality section (0x4BD–0xBCF; identical layout to .PER body)

- **0x4BD**: word `02 00` (section tag); **0x4C0**: radio serial, ASCII 10+NUL
- **0x4CB–~0x650**: Radio Service Data tuning tables — 7-point band-calibration
  grid; reference 375.000 MHz @ 0x623, band edges 403.625/418.625/431.625/
  439.625/450.625/460.625/469.625 MHz @ 0x633–0x64B. **Do not touch** (alignment).
- 0x7F7–0x8D6: 14 × 16-byte records, (200,0,0,0) — probable shortform-dial/button
  number table [low confidence]
- **0x8D7–0x956: Conventional Personality — 4 entries × 32 bytes (VERIFIED)**.
  Order confirmed via field-dependency pair table (NP seg24, file 0x993C0+), and on `rad1.rad`:
  Rx/Tx Hz, Tx Power = 1 and Tx PL = 19 match the bench radio's EEPROM channel table. In a
  `.per` (plaintext) the same table is at 0x4F7 and the serial at 0x0E0.

| +offset | Field | Encoding |
|---------|-------|----------|
| +0x00 | Rx frequency | LE dword, Hz |
| +0x04 | Tx frequency | LE dword, Hz; **0 = end of entries** |
| +0x08 | Tx Power | 0=Low, 1=High |
| +0x0C | Tx Inhibit | 0=Disabled, 1=On Busy, 2=On Busy Unless PL |
| +0x10 | Rx PL (TPL) | 0=Disabled, else TPL list index |
| +0x14 | Tx PL (TPL) | same |
| +0x18 | Monitor | 0=No, 1=Yes (carrier squelch) |
| +0x1C | Data Channel | 0/1 |

TPL list order (from W_DEALER.EN @ 0x268E5): index 1=XZ 67.0, 2=WZ 69.3,
3=XA 71.9, 4=WA 74.4, 5=XB 77.0, 6=WB 79.7, 7=YZ 82.5, 8=YA 85.4, 9=YB 88.5,
10=ZZ 91.5, 11=ZA 94.8, 12=ZB 97.4, … up to M7 250.3 (standard Motorola set).
Index encoding inferred from list order; sample files have all-zero PL fields,
so confirm once against the GUI dropdown on a live edit.

- 0x957+: dial string (14 chars), KEY9-filled unit/call-list ASCII (~0x9D6+),
  dword 1 @ 0xBCC, file checksum @ 0xBD0.

## Verified editor snippet (round-trip tested)

```python
import struct
KEY7 = bytes.fromhex('5d29ea64b37f1c')
def x7(b): return bytes(x ^ KEY7[i % 7] for i, x in enumerate(b))  # symmetric

def load(path):
    d = bytearray(x7(open(path,'rb').read()))
    assert d[:9] == bytes.fromhex('9b37f2b1c95e9a401d')
    assert (sum(d[:0xdb]) - 0x55) & 0xFF == d[0xdb]
    return d
def store(path, d):
    d[0xdb] = (sum(d[:0xdb]) - 0x55) & 0xFF
    d[-1]   = sum(d[:-1]) & 0xFF
    open(path,'wb').write(x7(bytes(d)))

CONV = 0x8D7   # conv personality; entries at +32*i, i<4
def get_conv(d, i):
    v = struct.unpack('<8I', d[CONV+32*i : CONV+32*i+32])
    return dict(rx_hz=v[0], tx_hz=v[1], tx_power=v[2], tx_inhibit=v[3],
                rx_pl=v[4], tx_pl=v[5], monitor=v[6], data_chan=v[7])
def set_conv(d, i, **kw):
    order = ('rx_hz','tx_hz','tx_power','tx_inhibit','rx_pl','tx_pl','monitor','data_chan')
    cur = get_conv(d, i); cur.update(kw)
    struct.pack_into('<8I', d, CONV+32*i, *(cur[k] for k in order))
```

## Not yet mapped (leads)

- Transmit Time-out enable/duration (field IDs 0x20/0x21), External Alarm
  enable/duration (0x36/0x35), Emergency Call Key Delay (0x34), Normal Call Key
  Delay (0x6E), Conventional Mode (0x1E), Model Number (0x57, stored as index;
  model strings table NP @ 0x2299E interleaved with "GM600"). The shared
  195-field descriptor table (NP seg24 @ 0x974C0, DP seg29 @ 0xA5600, 40-byte
  records) holds UI metadata, not buffer offsets — offset binding lives in
  c_field.cpp/c_new.cpp constructors. Next step: reverse constructor calls or
  diff two real files with known GUI edits.
- 66-single network field order (0xDC–0x1E3): sample not at defaults, can't
  anchor by value.
- NP seg54 (file 0x9B9E0): 59 × 14-byte records — **CORRECTED: these are UI
  field *layout* descriptors, NOT radio bit positions.** The "reader at file
  0x795B4" is `sub_791AC`, a Zinc proportional-geometry layout engine: it walks
  the records (stride 0x0E, 0xFFFF terminator), matches each by a 32-bit field
  key (rec+0/+2) against a field object's `[+46h]`, then computes screen
  x/y/w/h via `__aFlmul`/`__aFldiv` and calls widget setter vtable slots
  (`+44h/+48h/+30h`). `sub_772A0` (its caller) builds the window. So neither the
  14-byte table nor the 40-byte registry encodes EEPROM offsets — offset binding
  is applied in the `c_field`/`c_new` constructors. Earlier "radio bit positions"
  reading was wrong (it matched the stale note in CODEPLUG_BITMAP). See
  [FIELD_DICTIONARY.md](FIELD_DICTIONARY.md) for the full 195-field inventory and
  [PACKED_LAYOUT.md](PACKED_LAYOUT.md).
