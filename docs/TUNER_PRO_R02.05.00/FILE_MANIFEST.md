# Motorola Professional Tuner R02.05.00 - File Manifest & Overview

> RF alignment/tuning tool for Professional Series radios (GP/GM 300)

## Version: R02.05.00
**Product**: Professional Tuner
**Purpose**: RF alignment, calibration, and tuning of GP300/GM300 series radios

---

## Files

| File | SHA-256 | Description |
|------|---------|-------------|
| `tuner32.exe` | `4860e44bd8a137a9e13132a5faaeda216e9b13ba7715201eed43a49b5d73e506` | Main tuner application (Borland C++ / OWL, by Motorola Penang, 1.4MB) |
| `tuner32.hlp` | — | Help file |
| `bbo.cfg` | — | Baseband Offset configuration (binary, per-band calibration data) |
| `mobilesetup.bmp` | — | Mobile radio alignment setup diagram |
| `portablesetup.bmp` | — | Portable radio alignment setup diagram |

---

## Tuning Capabilities

The Professional Tuner communicates with radios via **Enhanced SBEP** (`EnhancedSBEP` string found) to adjust software-defined alignment parameters ("softpots").

### Alignment Operations

| Operation | Description | Softpot Range |
|-----------|-------------|---------------|
| **Reference Oscillator Warp** | VCXO frequency calibration | — |
| **Transmit High Power** | TX high power level adjustment | Per frequency point (F1-F7) |
| **Transmit Low Power** | TX low power level adjustment | Per frequency point |
| **Auto Squelch 12.5kHz** | Squelch threshold for 12.5 kHz channels | — |
| **Auto Squelch 20kHz** | Squelch threshold for 20 kHz channels | — |
| **Auto Squelch 25kHz** | Squelch threshold for 25 kHz channels | — |
| **Front End Filter** | RX front-end filter alignment | — |
| **DAC Softpots** | Digital-to-Analog converter calibration | 0-255 (8-bit) |
| **Mobile K & M Softpots** | Mobile-specific RF parameters | — |
| **RSSI Thresholds** | Received Signal Strength calibration | — |
| **PA Voltage Limit** | Power Amplifier voltage limiting | Auto-tune supported |
| **Baseband Offset** | Baseband frequency offset compensation | Per-band config in bbo.cfg |
| **DTMF Deviation** | DTMF signaling frequency deviation | — |
| **DTMF Signalling Deviation** | DTMF signal level | — |
| **High Speed Trunking Signalling Deviation** | LTR trunking signal deviation | — |
| **LTR High Deviation Offset** | LTR deviation offset | — |

### Softpot Value Ranges

Different parameters use different bit widths:
- 5-bit: 0-31
- 6-bit: 0-63 or 1-63
- 7-bit: 0-127
- 8-bit: 0-255
- 9-bit: 0-511

### Frequency Points

The tuner calibrates at up to **7 frequency points** (F1-F7) across the band. Each point represents a specific frequency in MHz where power and alignment are measured and adjusted.

### SBEP Message Types (22 distinct, from RTTI analysis)

**Radio Identity/Control:**
| Message Class | Purpose |
|---|---|
| `SBEPRadioPowerUpRequest` | Power up / initialize radio |
| `SBEPRadioModelNoRequest` | Query radio model number |
| `SBEPRadioSerialNoRequest` | Query serial number |
| `SBEPWriteSerialNoRequest` | Program serial number |
| `SBEPResetRequest` | Reset radio |
| `SBEPKeyUpRequest` | Key up (transmit) for alignment |
| `SBEPDekeyRequest` | Dekey (stop transmit) |
| `SBEPChannelRequest` | Set channel/frequency |
| `SBEPTestModeRequest` | Enter test/alignment mode |

**Data Read/Write:**
| Message Class | Purpose |
|---|---|
| `SBEPReadRequest` / `SBEPWriteRequest` | Generic read/write |
| `SBEPReadBBORequest` / `SBEPWriteBBORequest` | Baseband Offset data |
| `SBEPSoftpotReadRequest` / `SBEPSoftpotWriteRequest` | Softpot values |
| `SBEPReadRSSIRequest` | Live RSSI measurement |
| `SBEPReadTuneRequest` | Current tuning data |
| `SBEPAutoTuneRequest` | Initiate automatic tuning |
| `SBEPTempCompRequest` | Temperature compensation (4 bytes) |

**Errors:** `BadReply`, `MessageNotAcknowledged`, `RadioProtocolError`, `UnsupportedMessage`, `CommunicationError`, `PortInUseError`, `BaudRateSettingError`

### Additional Parameters (from agent analysis)

**Signaling Deviation Tuning:**
- MDC1200, MPT1327, Select 5, High Speed Trunking (HSS)

**Baseband Offsets:**
- CSQ (Carrier Squelch), DPL/MDC/QCII, TPL Range 1-4, LTR Low/Med/High Deviation

**Data format:** `.sfp` files (Softpot Files) for saving/loading calibration data

### Configuration

- `Tuner32.ini`: Application settings
- `com.ini`: COM port configuration (COM1-COM4)
- `bbo.cfg`: Binary config (24 records, 4-field global header, per-model/band/power calibration templates)
  - 5 unique radio type identifiers
  - Standard records: 6 tuning blobs (4-point radios)
  - Extended records: 9 tuning blobs (7-point radios)
