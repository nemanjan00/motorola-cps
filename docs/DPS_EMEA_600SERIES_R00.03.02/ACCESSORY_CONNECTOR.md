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

## Repeater / squelch signals (from the CNTL GM600 schematic, sheet 8402626Y08)

Controller board = **MCU U0101** (PROC350, 68HC11-class, 5195136A02) + **ASFIC U0201** (35U45,
audio/signalling filter). The squelch logic is on the ASFIC:

- **`SQDET` = ASFIC U0201 pin H1** — Squelch Detect (noise/carrier COS): the radio's carrier-operated
  squelch status, i.e. a repeater COR.
- **`CHACT` = pin H2** — Channel Activity.
- **`PLLIM` = ASFIC U0201 pin A4** — PL Limiter output: the RECEIVED PL (CTCSS) sub-audible tone after
  the ASFIC's PL bandpass filter + hard limiter, as a clean logic square wave. This is what the MCU
  captures to decode PL — tap it to read the actual received tone (measure period / compare to your
  expected PL in the controller, or feed a tone decoder). Input side: `PLIN`. `RXLIMOUT` (pin G4) is
  the main RX-audio limiter (data/discriminator path); `RXAUDOUT` = J4.
  (Pin designators verified against the page-9 schematic at high zoom: column reads UPCLK=D1,
  XTALOUT=E2, PLLIM=A4, RXLIMOUT=G4, RXAUDOUT=J4, … SQDET=H1, CHACT=H2.)
- The valid-tone *decision* is firmware (MCU), so there is no "PL valid" pin — but `PLLIM` gives the
  raw filtered+limited tone to do the compare yourself.

ASFIC general-control-bit outputs drive the GP/alarm functions: `GCB0→AUDIO_PA_ENABLE`,
`GCB1→EXTERNAL_ALARM`, `GCB2→B+_CONTROL`, `GCB3→GPO1` (hence EXTERNAL_ALARM exists in HW even though
GM600 firmware greys it out).

**SQDET/CHACT/PLLIM run ASFIC→MCU; they are NOT on the accessory connector.** Note **U0201 is a BGA**
(the A4/H1 grid designators = ball grid), so its pads are untappable. Tap at the **QFP MCU U0101**
instead: **PLLIM lands on U0101 pin 10 = `PA1_IC2`** (a 68HC11 Input-Capture pin — the MCU measures
the PLLIM square-wave period to decode PL), confirmed by tracing the page-9 schematic. Pin 10 is in
the Port-A capture cluster (…pin9=`PA2_IC1`, pin10=`PA1_IC2`, pin11=`PA0_IC3`). It's an MCU input, so
tapping is read-only/benign; use fine wire + strain relief, buffer (74HC14) for a long run.

Repeater hookup options:
- **PL-gated COR straight off the board (best):** `SQDET` (U0201 H1, carrier) + `PLLIM` (U0201 A4,
  received PL tone). Gate on SQDET AND a PLLIM period match = proper tone squelch, no external decoder.
- **Carrier squelch (COS) only:** `SQDET` (H1); or threshold **RSSI** (buffered as `RSSI_BUF` via
  R0210 1k → connector **pin 15**) externally.
- **Tone squelch without a board tap:** feed **`FLT_RX_AUDIO`** (flat/discriminator RX, continuous,
  U0202-2 MC3403 unity gain → connector **pin 11**) into an external CTCSS decoder. (`RX_AUDIO`,
  de-emphasized via U0202-4, is also on the connector.)
- **TX side:** `FLAT_TX_AUDIO` inject (**pin 5**), external PTT on GP1 (**pin 3**).
