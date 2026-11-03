# Programming a GM600 Today — Practical Setup Guide

Everything below is verified against the DPS binaries (see PROTOCOL.md) or the
bundled user manuals.

## 1. What you need

- **The radio**: GM600 mobile (or GP600 portable), MPT1327 trunked, 600 series.
- **The software**: this archive (`DPSWDP` = data-panel radios, `DPSWNP` =
  no-panel radios). The Dealer Programmer (`WDPS_DP.EXE`) does radio read/write;
  the Network Programmer (`WDPS_NP.EXE`) edits `.net` files offline only.
- **A programming cable**: RIB-less — see §3.
- **A machine to run it on**: 16-bit Windows 3.1 software — see §2.

## 2. Running 16-bit DPS in 2026

`WDPS_DP.EXE` / `WDPS_NP.EXE` are Windows 3.1 (NE) binaries using the Win3.1 COMM
API. Options, best first:

1. **Windows 3.11 in 86Box/PCem** with the emulated serial port mapped to your
   host's USB-UART device (86Box: Settings → Ports → COM1 → "Host serial port").
   Most faithful to what the software expects (real COMM API + real timing).
2. **Windows 95/98 VM** (86Box/PCem/VMware) — Win16 apps run fine; map COM1 to
   the USB-UART. Timing is less authentic but COMM API behaves the same.
3. **Windows 3.11 under DOSBox** — possible but DOSBox serial passthrough
   (`serial1=directserial realport:/dev/ttyUSB0`) has historically flaky timing;
   the protocol is timing-sensitive (121 ms inter-byte gap limit, 200 ms ACK
   timeout). Try only if 1–2 are unavailable.

Note: real 32-bit Windows (XP era) could run Win16 via NTVDM, but on any modern
64-bit Windows there is no Win16 subsystem at all.

Install layout the software expects: `c:\mrss\mpt\dpswnp` / `c:\mrss\mpt\dpswdp`
(from DPS.CFG). Copy the appropriate variant folder there. The first-run Start Up
window shows version + dealer serial/registration (patched in by WSERIAL.EXE at
Motorola; the shipped copy is pre-serialized).

## 3. The cable (RIB-less, single-wire)

The software reads back its own echo after every frame → **single-wire
half-duplex bus**, 9600 8N1, 5V TTL, open-collector style. Same physical scheme
as the GM1200 (documented publicly at paulbanks.org/projects/sb9600).

```
USB-UART (5V-tolerant RX)                 GM600 accessory/mic connector

TX ──|>|──┬────────────────────────── BUS+ (data)
   1N4148 │                              (anode at UART TX)
RX ──[1k]─┘
GND ──────────────────────────────── GND
optional: +5V ──[4.7k]── BUS+  (only if bus doesn't idle high by itself)
```

- The diode lets the host only pull the bus **low**; the radio's pull-up drives
  it high — no contention. Schottky (BAT85) gives extra noise margin.
- CP2102/FT232 both fine (RX must tolerate 5V; TX level irrelevant through diode).
- **Everything you send echoes back** — that's normal, not a fault.
- Pinout: BUS+/GND are on the radio's accessory/mic connector (exact pin TBD —
  trace the mic connector's data line; on GM1200 it is the "BUS+" pin of the
  10-pin accessory/mic header).

## 4. First contact checklist

1. Wire cable, confirm bus idles ~5V when radio is on.
2. In DPS: set the right COM port (COM1–4 in the UI), 9600 8N1 is fixed.
3. Radio on → **Read Radio**. The DPS sends opcode 0x10 (`F1 10 FE`) up to 3
   times expecting an ACK byte `50` within 200 ms, then reads identity strings.
4. If no response: verify echo first (loopback: short BUS to itself → you must
   see your own bytes), then check diode direction, then ground.
5. Read pulls the whole codeplug (personality regions 0x7F1/0x799 bytes +
   0x280-byte alignment block @ radio address 0xD80) with a progress bar.

## 5. Safety notes

- **Read before write, always.** Keep the first `.rad` dump untouched as your
  golden backup. Files decode with the 7-byte XOR in FILE_FORMAT.md — you can
  inspect/verify a dump offline.
- Write checks the radio's **serial number** against memory — if you read radio
  A and try to write to radio B it will refuse.
- Service/tuning menus are **password protected** (password patched into the EXE
  by WSERIAL.EXE). Softpot writes (opcode 0x20) touch alignment — don't poke
  without test equipment; a bad softpot write can detune the radio.
- The "Program Default Radio Configuration Data" menu requires Motorola's
  **dongle** — without it the option is hidden (not needed for normal use).
- Alignment block at 0xD80 is also mirrored in archive files at offset 0xD80.

## 6. File cheat sheet

| Ext | Holds | Size (NEW) | Made by |
|-----|-------|-----------|---------|
| .net | Network data | 1213 B | Network Programmer |
| .per | Personality | ~2033 B | Dealer Programmer |
| .rad | Network+personality | 3025 B | Dealer Programmer |

All XOR `5D 29 EA 64 B3 7F 1C` repeating; checksums per FILE_FORMAT.md.
