# GM350/GM600/GM900 — 16-pin accessory connector (hardware reference)

Pinout of the rear 16-pin accessory connector (from Motorola service documentation).
Relevant to the programming cable, the flat-audio/repeater path, and firmware-access questions.

| Pin | Name | Type | Notes |
|---|---|---|---|
| 1 | SPKR- | Analog O/P | bridge PA, min 3.2 Ω load (with pin 16) |
| 2 | Ext. Mic Audio | Analog I/P | 80 mV = 60% dev; common with mic-connector mic |
| 3 | GP1 | Digital I/P | codeplug-assignable; primary = external PTT |
| 4 | GP2 | Digital O/P | codeplug-assignable; primary = external alarm |
| **5** | **Flat TX Audio** | Analog I/P | **unfiltered TX path inject (e.g. modem), 150 mVRMS = 60% dev, >25 kΩ** |
| **6** | **BUS+** | Digital I/O | **radio SCI serial bus — programming & tuning (= SBEP). Also mic-conn pin 7** |
| 7 | GND | Ground | analog + digital ground |
| 8 | GP3 | Digital O/P | **shared with the serial-bus DATA line**; overridden by serial when prog lead plugged |
| 9 | GP4 | Digital I/P | codeplug-assignable; **grounding forces radio ON** (usually emergency) |
| 10 | Ignition Sense | Digital I/P | ignition auto-on; R0423 (4.7k, not fitted) = permanent-on |
| 11 | **RX Audio** | Analog O/P | **continuous discriminator (flat/unfiltered) RX audio, 330 mVRMS = 60% dev, 600 Ω** |
| 12 | GP5 | Digital I/O | codeplug-assignable |
| 13 | SW B+ Sense | Analog O/P | solder-link configurable (SWB+ default); R0455=0 Ω, max 300 mA — fuse it |
| **14** | **Hook** | Digital I/P | 0=on-hook,1=off-hook; pull-up to +5 V. (Rig note: ~9 V here enables programming mode.) |
| 15 | RSSI | Analog O/P | buffered RSSI voltage |
| 16 | SPKR+ | Analog O/P | PA positive (with pin 1) |

Digital I/P: 4.7k pull-up to +5 V; low ≤0.6 V, high ≥3.0 V.
Digital O/P: 4.7k pull-up to +5 V; low ≤0.5 V @10 mA. High-current O/P (pin4): pull-up to B+, ≤200 mA.

Microphone connector (8-pin): 3=Mic Hook, 4=GND, 5=Mic Audio, 6=Mic PTT, 7=**BUS+**, 8=Handset.

## Implications

- **Programming / codeplug (what we use):** SCI serial on **BUS+ (pin 6)** (single-wire SBEP; also mic
  pin 7). **HOOK (pin 14)** at ~9 V enables programming mode (our rig). Pin 8 (GP3) is the shared
  serial data line.
- **Flat audio for repeater/data (the user's goal) — available in HARDWARE, no codeplug flag needed:**
  **Pin 5 = Flat TX Audio** (unfiltered TX inject, bypasses pre-emphasis/processing) and
  **Pin 11 = RX discriminator** (continuous, de-emphasis-free RX). A repeater/data setup can use these
  directly regardless of the De/Pre-emphasis codeplug bit (which is the *internal* path selector).
- **Firmware (68HC11) bootstrap:** the accessory connector exposes the SCI programming bus and the
  HOOK prog-enable, but **no dedicated bootstrap-control pin**. 68HC11 native bootstrap (XMODEM loader
  for flash) is entered via the CPU MODA/MODB pins at reset, which are **on the PCB, not this
  connector** — so firmware dump/flash via HC11 bootstrap likely needs opening the radio and strapping
  MODA/MODB, not just an accessory-connector lead. (Contrast: the 26-pin Waris radios expose a boot
  pin on their connector.)
