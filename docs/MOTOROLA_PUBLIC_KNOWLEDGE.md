# Motorola GM/CM Series — Public Knowledge Reference
> Compiled from publicly documented community sources for crosscheck against RE findings.
> Sources: repeater-builder.com, batlabs.com/batboard, farhan.codes RE blog, RadioReference forums.

---

## 1. Serial Protocol (MaxTrac/GM300 family — SCI bus)

### Physical Layer
- **Single-wire half-duplex** serial bus via microphone connector SCI pin
- RIB (Radio Interface Box RLN4008) handles RS-232 ↔ radio level conversion
- **Initial baud rate: ~950 baud** (7.776 MHz crystal / 4 / 128 / 16 = 949.22 baud)
  - PC uses 115200/121 = 952.1 baud (< 1% error, close enough)
- **Fast mode: ~7,600 baud** (8× speed-up after initial handshake)
- **Serial framing: 7 data bits, even parity, 1 stop bit (7E1)**
- Each 8-bit byte is encoded as **two 4-bit ASCII nibbles** (values 0x30–0x3F)
  - Exception: Lead-in byte is sent as raw binary

### Message Format
```
[Lead-in] [Header×2] [Data×2] [Checksum×2]
                               (all except lead-in are nibble-encoded)
```

**Lead-in byte (raw binary, not nibble-encoded):**
- `0x04` — message from programming computer (RSS/CPS)
- `0x1C` — message from radio (CPU response)

**Header (5 bytes, nibble-encoded):**
| Byte | Field         | Notes |
|------|---------------|-------|
| 1    | Null          | Always 0x00, required |
| 2    | Function      | Operation code (read/write/ping etc.) |
| 3    | Byte Count    | Number of data bytes incl. leading null |
| 4    | Address High  | MSB of 16-bit memory address |
| 5    | Address Low   | LSB of 16-bit memory address |

**Data bytes:** First data byte must always be null (0x00), counted in Byte Count.
- To write 1 byte: Byte Count = 0x02, data = [0x00, your_byte]

**Checksum:**
- 8-bit sum of ALL bytes EXCEPT the lead-in
- Negated (two's complement) and appended
- Verification: sum of all bytes including checksum (excl. lead-in) = 0x00

**Known Function Codes (MaxTrac/GM300):**
| Code | Direction | Function |
|------|-----------|----------|
| 0x21 | PC→Radio  | Ping / "are you alive?" |
| 0x40 | PC→Radio  | Read memory (confirmed: 0xF5,0x01,0x02,0x01,0x40) |
| 0x41 | PC→Radio  | Write memory |
| Speed-change msg | PC→Radio | Switch to 7600 baud |
| Reset msg | PC→Radio | Return to 950 baud + radio reset |

**Note on CBEP/SB96 protocol (XTS3000 and similar newer radios):**
- Uses `VcomSB96.dll` / `Commsbep.sys` kernel driver
- `0xF5, 0x11` = read opcode; followed by `0x20` divider, 3-byte address, checksum
- Memory-mapped: no API abstraction, raw address reads/writes
- Checksum verified: `0xF5,0x11,0x20,0x00,0x00,0x00` → checksum `0xD9`
- Password transmitted in **plain Unicode text** shortly after radio name in serial stream

---

## 2. CM200/CM300/PM400 Connector Pinout

### Microphone Connector J802 (RJ45, 8-pin)
| Motorola Pin | RJ45 Pin | Signal      | Notes |
|-------------|----------|-------------|-------|
| 1           | 8        | RX_AUDIO    | |
| 2           | 7        | SCI         | Bi-directional serial comm |
| 3           | 6        | MIC_PTT     | |
| 4           | 5        | MIC_AUDIO   | +8V for mic preamp |
| 5           | 4        | GND         | |
| 6           | 3        | HOOK        | Informs µP of mic/SCI type |
| 7           | 2        | BOOT_RES    | |
| 8           | 1        | 9.3V        | |

**Critical CM200/300 programming quirk:**
- HOOK line (pin 6/RJ45-3) must be jumpered to RX_AUDIO (pin 1/RJ45-8)
- Without this jumper, radio will NOT enter programming mode
- GM300/Maxtrac cables don't have this jumper → won't work on CM series without mod
- Add jumper: RJ45 pin 8 ↔ RJ45 pin 6 (Motorola pins 1 ↔ 3)

**RIB DB25 cable wiring (GTF374 cable):**
```
DB25 pin 1  → RJ45 pin 4 (GND)
DB25 pin 12 → RJ45 pin 1 (SW_A+ / RX_AUDIO)
DB25 pin 15 → RJ45 pin 7 (BUS+ / SCI)
DB25 pin 25 → RJ45 pin 6 (BOOT_CTRL / HOOK)
DB25 pin 16 → RJ45 pin 3 (tie point)
Jumper DB25 pins 4 ↔ 13 (at RIB end)
1kΩ resistor between DB25 pins 12 ↔ 16
```

---

## 3. GM300 Codeplug Memory Map (publicly documented)

### Header Block: 0xB600 – 0xB62F
| Address | Contents |
|---------|----------|
| B600h–B609h | Serial number (ASCII) |
| B60Ah       | Panel Number |
| B60Bh–B60Ch | Model Index (little-endian, from .MDF file) |
| B60Dh       | Software Version |
| B60Eh–B610h | Unknown/reserved |
| B611h       | **Checksum** for block B600h–B610h |

**Checksum algorithm for header block:**
- Calculated every power-up over bytes B600h–B610h
- Stored at B611h
- Mismatch → codeplug error tone + Error 53/58 on read
- NOTE: Maxtrac Lab RSS "Correct Checksum" function does NOT work on GM300 (different structure)

### Model Index
- Sourced from GM300.MDF file (binary model definition file)
- Typical prefix bytes: `1Bh`, `20h`, `21h`, or `29h`
- Used to validate radio model on read/write

### Known Error Codes
| Code | Meaning |
|------|---------|
| 2    | Blank logic board (needs initialization) |
| 7    | Invalid opcode (CPU speed/timing issue) |
| 22   | Blank board — initialize required |
| 51–58 | Codeplug data errors |
| 53   | Checksum mismatch |
| 58   | Corrupt codeplug (often: channel count mismatch with model) |

---

## 4. .MDF File Format (Model Definition File)

- Binary file shipped with RSS/CPS
- Defines valid model numbers and their capabilities
- **Checksum-16** covers entire file (Hex Workshop "Generate Checksum" tool)
- Modifying channel count bytes (e.g. 8→16 ch) requires recalculating and patching checksum
- GM300 supports: 8ch (masked board), 16ch (expanded board), up to 40ch (hacked MDF)
- Masked board = 2-layer PCB, no EPROM socket, limited NVRAM
- Expanded board = 4-layer PCB, socketed EPROM, external NVRAM, supports MDC1200

---

## 5. CPS Version History (Commercial Series RVN4191)

| Version  | Notes |
|----------|-------|
| R02.04   | Early, limited model support |
| R05.05   | Stable widely-used version |
| R05.06   | Current as of ~2007 |
| R05.07   | Was "latest" for a period |
| R05.10+  | Superseded R05.07 |
| R05.16   | **Last version with per-channel wide/narrow selection** |
| R05.17   | Narrowband-only unless wideband entitlement key present |
| R05.18NA | North America, widely used for ham reprogramming |

**Supported radio models (from CPS help files):**
CP150, CP200, CP200XLS, PR400 (portables)
CM200, CM300, PM400 (mobiles)
EP450, EM200, EM400, GM3188, GM3688, GM3189, GM3689 (and more)

**CPS file identifier:** RVN4191 (EMEA variant may differ)

---

## 6. Codeplug File Format Notes

- `.cps` files are binary codeplug archives
- Password protection = read-only lock; **write is still possible without password**
- Password stored in plain RAM while CPS runs (visible via WinHex process memory scan)
- Location in memory: near serial number and model number fields
- On-wire: password transmitted in plain Unicode in serial stream (Wireshark-visible)
- Codeplug version incompatibility: "codeplug too new" error if version mismatch
- Sample codeplugs (125 models) shipped with CPS R05.07+

### Postprocessing on write (known transforms):
- Frequency values are NOT stored as plain Hz — encoded as scaled/offset integers
- Channel count field must match model definition
- Checksums must be recalculated after any manual edits
- Block-based write: data transferred in blocks with addressing

---

## 7. Open Source / Prior Art

| Project | URL | Notes |
|---------|-----|-------|
| pboyd04/radio-programmer | github.com/pboyd04/radio-programmer | C library, Windows7+Linux, Motorola protocol impl |
| george-hopkins/codeplug | github.com/george-hopkins/codeplug | Motorola codeplug decoder/builder |
| paulbanks.org/projects/sb9600 | paulbanks.org/projects/sb9600 | SB9600/SBEP open source (GM1200) |
| farhan.codes RE blog | blog.farhan.codes/2017/12/04/... | CBEP protocol RE (XTS3000), checksum reversed |
| Radio Doctor | (abandoned, v1.3.0) | Windows-based GM300 programmer, Motorola legal threats |
| repeater-builder.com | repeater-builder.com/motorola | Comprehensive reference, WA6ILQ/WA1MIK |
| batlabs.com / Batboard | batboard.batlabs.com | Community forum, codeplug hacking, MDF editing |

---

## 8. Crosscheck Flags for RE Output

Cross-reference your `PROTOCOL_AND_STRUCTS.md` against these known facts:

- [ ] Lead-in bytes: 0x04 (PC) and 0x1C (radio) — confirm or note difference for CM series
- [ ] Nibble encoding: each byte as two 0x30-0x3F characters — confirm present
- [ ] Checksum: negated 8-bit sum, verifies to 0x00 — confirm algorithm match
- [ ] Initial baud: ~950 baud (7E1) then speed-up — confirm CM300 uses same
- [ ] CM300 HOOK pin requirement — confirm documented in HAT design notes
- [ ] Memory map: B600h-B611h header block — confirm GM300 vs CM300 differences
- [ ] Frequency encoding formula — document the actual formula found in filehandle.dll
- [ ] Password location in codeplug memory — document exact offset
- [ ] .MDF checksum algorithm — confirm Checksum-16 vs other

---

*Sources: repeater-builder.com (WA1MIK, WA6ILQ), batlabs.com, batboard.batlabs.com,
blog.farhan.codes, RadioReference forums, ManualsLib GM300 Series Selling Manual.*
*All information from public community documentation. No proprietary Motorola materials reproduced.*
