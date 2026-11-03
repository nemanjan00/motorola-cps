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
Rx/Tx base Hz. Tail caveat: if freq plan is 15 records, tail is 7 dwords at 0x4A0
= (RadioCfg1=0xE7, RadioCfg2=0, NVote=4, LowestSys=1, HighestSys=1023, LMVote=18,
TVote=5); either reading keeps 0x3F0/0x3F4 solid.

## .RAD personality section (0x4BD–0xBCF; identical layout to .PER body)

- **0x4BD**: word `02 00` (section tag); **0x4C0**: radio serial, ASCII 10+NUL
- **0x4CB–~0x650**: Radio Service Data tuning tables — 7-point band-calibration
  grid; reference 375.000 MHz @ 0x623, band edges 403.625/418.625/431.625/
  439.625/450.625/460.625/469.625 MHz @ 0x633–0x64B. **Do not touch** (alignment).
- 0x7F7–0x8D6: 14 × 16-byte records, (200,0,0,0) — probable shortform-dial/button
  number table [low confidence]
- **0x8D7–0x956: Conventional Personality — 4 entries × 32 bytes (VERIFIED)**.
  Order confirmed via field-dependency pair table (NP seg24, file 0x993C0+):

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
- NP seg54 (file 0x9B9E0): 59 × 14-byte records mapping fields to **radio
  codeplug bit positions** (nibble/bit packing, reader at file 0x795B4) — the
  on-air/EEPROM layout, for future radio-I/O work.
