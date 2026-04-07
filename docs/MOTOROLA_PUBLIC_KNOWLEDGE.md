# Motorola GM/CM Series — Public Knowledge Reference v2
> Updated with ESBEP/SBEP protocol family disambiguation.
> Your RE confirmed: Commercial Series CPS uses ESBEP (evolved from SB9600/SBEP), NOT the
> older MaxTrac/GM300 SCI/RIB protocol. Both families documented here for crosscheck.

---

## PROTOCOL FAMILY MAP

```
Radio Family        Protocol        Baud    Framing   Notes
─────────────────────────────────────────────────────────────────
GM300 / MaxTrac     SCI/RIB         ~950    7E1       Nibble-encoded, DOS RSS
GP300 / GM350       SCI/RIB         ~950    7E1       Same family
CM140/160/340/360   ESBEP           9600    8N1       Evolved from SBEP
CM200/300/PM400     ESBEP           9600    8N1       Your primary target
CP150/200/PR400     ESBEP           9600    8N1       Same CPS (RVN4191)
CDM750/1250/1550    SBEP            9600    8N1       Closely related
ASTRO / XTS series  CBEP over SBEP  9600    8N1       Needs SmartRIB for flash
```

**Key insight from RE session:** `serialcommport.dll` implements ESBEP, not the old
SCI nibble-encoded protocol. The MaxTrac Secrets public doc covers the OLDER family
and serves as a structural reference only — opcodes and framing differ.

---

## 1. ESBEP / SBEP Protocol (Commercial Series — your target)

### Physical Layer
- **Single-wire half-duplex** (BUS+ line, ANDed RX/TX)
- **9600 baud, 8N1** (8 data bits, no parity, 1 stop bit)
- Level: 0/5V TTL, logic 1 = idle, logic 0 = active
- On CM200/300 mic connector: **J802-2 = SCI (BUS+)**

### SBEP Message Frame Format
Documented from CDM-750/1250/1550 RE (closely related to CM series):

```
[ Byte 1: OpCd-Len ] [ Byte 2: Ext Opcode or data ] [ Byte 3: Ext Len or data ] { data } [ CRC ]
```

**Byte 1 structure:**
```
bits 7:4 = Opcode    (if 0xF → use Byte 2 as extended opcode)
bits 3:0 = DataLen   (if 0xF → use Byte 3 as extended length, includes CRC byte)
```

**Extended opcodes only observed** in CM/CDM series (all messages use extended opcode form).

**CRC:** Appended at end of each message. CRC algorithm reverse-engineered and
published at github.com/sganz/SB9600-CRC-Gen.

**Based on US Patent 5,551,068** (Aug 27, 1996) — "Method and Apparatus for
Communication Variable Length Messages Between Register Modeled Radio Devices"

### SBEP Mode Entry/Exit
- Radio normally runs SB9600 bus protocol
- SBEP is entered for high-speed bulk data transfer (codeplug read/write)
- Entry/exit handshaking documented in SB9600 protocol manual (Motorola p/n FL08-RQMT-85A001)
- CM series: HOOK pin (J802-6) triggers programming mode entry

### S5T Block Format (from your RE session)
- **5-byte overhead per block** confirmed
- Likely structure: `[opcode 1B][address 2B][length 1B][checksum/CRC 1B] + data`
- Memory-mapped: address space read/written in blocks (same pattern as CBEP)
- `GetFieldNameCS` function maps GUI field names → codeplug memory offsets

---

## 2. SCI/RIB Protocol (GM300/MaxTrac — older family, reference only)

### Physical Layer
- Single-wire half-duplex via RIB (RLN4008)
- **Initial: ~950 baud, 7E1** (nibble-encoded)
- **Fast mode: ~7,600 baud** (8× speed-up after handshake)
- 950 baud derived from: 7.776 MHz / 4 / 128 / 16 = 949.22 baud

### Message Format
```
[Lead-in 1B raw] [Header nibble-encoded] [Data nibble-encoded] [Checksum nibble-encoded]
```
- Lead-in `0x04` = PC→Radio, `0x1C` = Radio→PC (raw binary, not nibble-encoded)
- Each 8-bit byte encoded as two 4-bit nibbles with 0x30 added (values 0x30–0x3F)
- Checksum: negated 8-bit sum of all bytes except lead-in; sum incl. checksum = 0x00

**Header bytes (5, nibble-encoded):**
| Byte | Field | |
|------|-------|-|
| 1 | Null | Always 0x00 |
| 2 | Function | 0x21=ping, 0x40=read, 0x41=write |
| 3 | Byte Count | Includes leading null data byte |
| 4 | Address High | MSB of 16-bit address |
| 5 | Address Low | LSB of 16-bit address |

---

## 3. CM200/CM300 Connector — Programming Pinout

### Microphone Connector J802 (RJ45 8-pin)
| Moto Pin | RJ45 | Signal | Function |
|----------|------|--------|----------|
| 1 | 8 | RX_AUDIO | Also used for HOOK jumper |
| 2 | 7 | SCI/BUS+ | **Programming data line** |
| 3 | 6 | MIC_PTT | |
| 4 | 5 | MIC_AUDIO | +8V mic preamp supply |
| 5 | 4 | GND | |
| 6 | 3 | HOOK | µP mic/SCI type detection |
| 7 | 2 | BOOT_RES | **Firmware flash mode trigger** |
| 8 | 1 | 9.3V | |

**Programming mode requirement:**
- HOOK (pin 6/RJ45-3) must be jumpered to RX_AUDIO (pin 1/RJ45-8)
- Without jumper: radio ignores SCI → no comms
- This is why standard GM300 cables fail on CM series

**Flash mode:**
- Assert BOOT_RES (pin 7/RJ45-2) during power-up
- No SmartRIB needed for CM series — RPi GPIO can control directly
- SmartRIB only required for ASTRO series firmware flashing

### RPi HAT Pin Requirements
```
GPIO → BOOT_RES  (J802-7 / RJ45-2)  firmware flash mode
GPIO → HOOK      (J802-6 / RJ45-3)  programming mode enable (or hardwire jumper)
SCI  ↔ BUS+     (J802-2 / RJ45-7)  data (level shift 3.3V ↔ 5V TTL)
GND  → GND      (J802-5 / RJ45-4)
+8V from MIC    (J802-4 / RJ45-5)  optional HAT power source
```

---

## 4. GM300 Codeplug Memory Map (public, for reference)

| Address | Contents |
|---------|----------|
| B600h–B609h | Serial number (ASCII, 10 chars) |
| B60Ah | Panel Number |
| B60Bh–B60Ch | Model Index (little-endian, from .MDF) |
| B60Dh | Software Version |
| B60Eh–B610h | Reserved |
| B611h | **Checksum** (covers B600h–B610h) |

**Checksum:** Recalculated every power-up. Mismatch → Error 53/58.
Maxtrac Lab "Correct Checksum" does NOT work on GM300 — different algorithm.

### Known Error Codes
| Code | Meaning |
|------|---------|
| 2 / 22 | Blank board, needs initialization |
| 7 | Invalid opcode (timing/speed mismatch) |
| 51–58 | Codeplug data errors |
| 53 | Header checksum mismatch |
| 58 | Corrupt codeplug (channel count vs model mismatch) |

---

## 5. Codeplug Format — Known Transforms

**Password:**
- Read-only lock only — write still works without password
- Stored in plaintext RAM while CPS runs (WinHex process memory scan)
- On-wire: transmitted as plain Unicode in SBEP stream (Wireshark-visible)
- Location: near serial number and model number fields

**Frequency encoding:**
- NOT stored as plain Hz
- Encoded as scaled/offset integer (formula from `filehandle.dll` RE)
- Community known: hex-editing saved .cps files can stretch frequency bounds

**Block structure:**
- S5T format: 5-byte block overhead (confirmed by RE)
- Data transferred in addressed blocks
- Checksum/CRC per block

**Write postprocessing chain (from RE):**
```
GUI field value
→ XML serialization (XSL transform layer)
→ GetFieldNameCS() field→offset mapping
→ VECT_BLOCK struct population
→ Frequency/value encoding
→ Checksum calculation
→ S5T block framing
→ ESBEP frames via serialcommport.dll
→ Radio EEPROM
```

---

## 6. CPS Version History

| Version | Notes |
|---------|-------|
| R02.04 | Early, limited model support |
| R05.05 | RE'd version (D05.33) — your primary target |
| R05.16 | Last with per-channel wide/narrow selection |
| R05.17 | Narrowband-only (wideband entitlement required) |
| R05.18NA | North America, last widely-used ham version |

**CPS identifier:** RVN4191 (commercial series)
**Supported models:** CM140, CM160, CM200, CM300, CM340, CM360, CP040, CP140,
CP160, CP180, CP200, CP200XLS, PM400, PR400, EP450, EM200, EM400,
GM3188, GM3688, GM3189, GM3689

---

## 7. Firmware Flashing

| Radio | Storage | Method | SmartRIB? |
|-------|---------|--------|-----------|
| GM300 masked board | Mask ROM | Not flashable | N/A |
| GM300 expanded board | Socketed EPROM | Pull + TL866/T48 programmer | No |
| GM350 | Mask programmed | Not flashable | N/A |
| CM200/CM300/PM400 | Internal flash | BOOT_RES + SCI stream | **No** |
| ASTRO/XTS | Internal flash | SmartRIB buffers image | **Yes** |

CM series flash procedure: assert BOOT_RES pin at power-up → stream firmware
over BUS+/SCI at 9600 baud. No SmartRIB buffer MCU required — host can
handle timing directly (RPi more than capable).

---

## 8. Open Source / Prior Art

| Project | URL | Notes |
|---------|-----|-------|
| pboyd04/radio-programmer | github.com/pboyd04/radio-programmer | C, Win7+Linux, Motorola protocol |
| george-hopkins/codeplug | github.com/george-hopkins/codeplug | Codeplug decoder/builder |
| paulbanks.org/sb9600 | paulbanks.org/projects/sb9600 | Python SB9600/SBEP lib, GM1200 |
| sganz/SB9600-CRC-Gen | github.com/sganz/SB9600-CRC-Gen | **CRC algorithm RE'd and published** |
| farhan.codes RE blog | blog.farhan.codes/2017/12/04/... | CBEP RE (XTS3000), checksum |
| Radio Doctor | abandoned v1.3.0 | Windows GM300 programmer |
| repeater-builder.com | repeater-builder.com/motorola | WA6ILQ/WA1MIK reference |
| batlabs.com/batboard | batboard.batlabs.com | Community forum, codeplug hacking |
| SB9600 patent | US5551068 | Physical protocol basis |

---

## 9. Crosscheck Flags for RE Output

### Protocol layer
- [x] ESBEP framing: byte[0] high nibble = 0xF for all command frames. Low nibble = payload length. **CONFIRMED.**
- [ ] CRC algorithm — sganz/SB9600-CRC-Gen may cover SB9600 layer, not ESBEP. Our RE found one's complement (0xFF - sum). Pending cross-reference.
- [x] 9600 8N1 confirmed. Default from serialcomm_dllpackage.dll. **CONFIRMED.**
- [ ] BOOT_RES pin behavior — firmware flash, not in CPS scope
- [ ] SBEP mode entry sequence — CPS assumes radio already in programming mode, no handshake found
- [x] S5T block overhead: **5 bytes = [ChecksumType 1B][EntrySize uint16 LE][EntryQty uint16 LE]**. **CONFIRMED** — perfect contiguity across all 24 blocks.

### Codeplug layer
- [x] Frequency encoding: ELP_ELM = ref_freq÷1.5 + offset÷0.25 (byte). S5T = VRIS_BASE×0.05 + increment×step. **CONFIRMED.**
- [x] Field name registry: xmlxslhandler.dll table at rdata 0x25990, index+68 = field ID. All CP_BLOCK fields mapped. **CONFIRMED.**
- [x] VECT_BLOCK: 56 × 2-byte LE offsets (ELP_ELM) or 32 × 2-byte LE offsets (S5T). **CONFIRMED.**
- [ ] Password offset: QUERYRADIOPASSWORDCHECK opcode exists (F3 23 08), exact EEPROM location TBD
- [x] Checksum: per-frame one's complement (0xFF - sum). S5T blocks have S5_CHECKSUM_LAYOUT_HEADER=2. **CONFIRMED.**
- [x] XML schema: both ELP_ELM (51 blocks) and S5T (27 blocks) fully documented. **CONFIRMED.**

### Sanity checks against sample .cps files
- [x] S5T freq: VRIS=2060, incr=6600, step=5kHz → 136.0 MHz = VHF1 band min. **VERIFIED.**
- [x] S5T freq: VRIS=7500, incr=5600, step=5kHz → 403.0 MHz = UHF1 band min. **VERIFIED.**
- [x] S5T block boundaries: all 24 blocks contiguous, zero gaps. **VERIFIED.**
- [x] VHF1 vs UHF1 diff: only 4 fields change (model, VRIS, TX/RX increments). **VERIFIED.**
- [ ] CRC vs sganz — pending (different protocol layer)

---

*Sources: repeater-builder.com (WA1MIK/WA6ILQ), batlabs.com, batboard.batlabs.com,
CDM SBEP RE post (batboard t=97109), wiki.w9cr.net, paulbanks.org, sganz/SB9600-CRC-Gen,
US Patent 5551068, farhan.codes, ManualsLib GM300/CM200 service manuals.*
*No proprietary Motorola materials reproduced.*
