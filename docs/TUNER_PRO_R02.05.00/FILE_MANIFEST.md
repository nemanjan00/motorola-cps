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

### Serial Port Configuration (from binary RE)

| Parameter | Value |
|-----------|-------|
| Baud rate | 9600 (`0x2580`) |
| Data bits | 8 |
| Parity | None (0) |
| Stop bits | 1 (`ONESTOPBIT` = 0) |
| Flow control | None |
| Port format | `COM%u` (COM1-COM4) |
| Config file | `com.ini` |

### Enhanced SBEP Frame Format (fully reversed from `tuner32.exe`)

The tuner has its own built-in Enhanced SBEP stack (no external DLLs).

**Frame header builder** at `0x0041c25b(buf, opcode, data_count)`:

```
Short frame, opcode < 0x0F:
  [(opcode<<4) | (data_count+1)] [data_0] ... [data_N] [checksum]
  
Short frame, opcode >= 0x0F:
  [0xF0 | (data_count+1)] [opcode] [data_0] ... [data_N] [checksum]
  
Long frame (data_count+1 >= 0x0F), opcode < 0x0F:
  [(opcode<<4) | 0x0F] [len_hi] [len_lo] [data_0] ... [data_N] [checksum]
  
Long frame, opcode >= 0x0F:
  [0xFF] [opcode] [len_hi] [len_lo] [data_0] ... [data_N] [checksum]
```

**Checksum** at `0x0041ceda`: `checksum = 0xFF - sum(all_preceding_bytes)`
- Sums all bytes from frame start through last data byte
- Appended as final byte of frame

**Frame size calculator** at `0x0041ce4c(opcode, data_count)`:
- Returns header overhead: 0 (bare opcode), 1 (short+low), 3 (short+high or long+low), 4 (long+high)

### SBEP Opcode Map (22 message types, all opcodes from binary RE)

**Key:** Opcodes reversed from `fcn.0041c25b` and `fcn.0041cd57` call sites.

> **NOTE: Tuner vs CPS naming differences.** The Tuner and CPS send the same opcode bytes
> to the same radio firmware, but two independent teams named the operations differently:
> - `0x1b`: CPS calls it `TUNE_PARAMS`, Tuner calls it `TestMode` (requesting tuning params IS entering test/alignment mode)
> - `0x21`: CPS calls it `CHANNEL`, Tuner calls it `SoftpotRW` (softpots are channel-level RF parameters)
> - `0x22`: CPS calls it `TESTMODE`, Tuner calls it `AutoTune` (auto-tune requires/triggers test mode)
> - `0x28`: Tuner calls it `ChannelRequest` (extended channel steering during alignment; not registered in CPS ESBEP map but may still be supported by radio firmware)
> The radio has ONE opcode map — these are naming differences, not protocol differences.

#### Request Opcodes (sent by Tuner to Radio)

| Opcode | Data Bytes | Message Class | Payload Format | Function |
|--------|-----------|---------------|----------------|----------|
| `0x10` | 0 | `SBEPRadioPowerUpRequest` | (none) | `0x4189a6` via `0x41bc9d` |
| `0x11` | 4 | `SBEPReadRequest` | `[addr_hi] [addr_lo] [len_hi] [len_lo]` | `0x41aaac` |
| `0x17` | N+3 | `SBEPWriteRequest` | `[addr_hi] [addr_lo] [data...]` | `0x41e1e8` |
| `0x18` | 11 | `SBEPWriteSerialNoRequest` | `[0x00] [serial_byte_0..9]` | `0x417cd4` |
| `0x19` | 0 | `SBEPDekeyRequest` | (none) | `0x418911` via `0x41bd97` |
| `0x19` | 1 | `SBEPKeyUpRequest` | `[key_param]` | `0x41887c` via `0x41bd97` |
| `0x1b` | 0 | `SBEPTestModeRequest` | (none) | `0x41862b` via `0x41bd97` |
| `0x20` | 3 | `SBEPSoftpotRequest` | `[sub_cmd] [param_hi] [param_lo]` | `0x41a449` |
| `0x20` | N+2 | `SBEPSoftpotRequest` (long) | `[sub_cmd] [param_hi] [data...]` | `0x41a687`/`0x41a78d` |
| `0x21` | 3 | `SBEPSoftpotReadRequest` | `[rw_flag<<7] [addr_hi] [addr_lo]` | `0x41d95c` |
| `0x21` | 5 | `SBEPSoftpotWriteRequest` | `[rw_flag<<7 \| commit<<6] [addr_hi] [addr_lo] [val_hi] [val_lo]` | `0x41da9a` |
| `0x22` | 3 | `SBEPAutoTuneRequest` | `[param_0] [param_1] [param_2]` | `0x417474` |
| `0x23` | 0 | `SBEPRadioModelNoRequest` | (none) | `0x41875b` via `0x41bd97` |
| `0x23` | 1 | `SBEPRadioSerialNoRequest` | `[query_type]` | `0x4186c3` via `0x41bd97` |
| `0x23` | 5 | `SBEPResetRequest` / Query | `[sub_cmd] [p0] [p1] [p2] [p3]` | `0x418080` via `0x41bd97` |
| `0x28` | 2 | `SBEPChannelRequest` (query) | `[sub_cmd] [channel]` | `0x417210` |
| `0x28` | 3 | `SBEPChannelRequest` (set) | `[sub_cmd] [param_hi] [param_lo]` | `0x416c30` |

**Opcode 0x20 sub-commands** (from `0x41bfce` and callers):

| Sub-cmd | Direction | Purpose |
|---------|-----------|---------|
| `0x19` | Read | Read softpot current value |
| `0x1a` | Write | Write softpot value |

**Opcode 0x23 sub-commands** (from callers of `0x41bd97`):

| Sub-cmd (byte 0) | Data Len | Purpose |
|-------------------|----------|---------|
| `0x00` | 0 | Query model number |
| `0x01` | 1 | Query serial number |
| `0x05` | 5 | FW version / reset query |

**Opcode 0x28 sub-commands** (from callers of `0x417210`):

| Sub-cmd (byte 0) | Purpose | Caller |
|-------------------|---------|--------|
| `0x00` | Channel query/set | `0x4182ce` |
| `0x02` | Frequency set | `0x41835c` |
| `0x05` | Power level | `0x418240` |
| `0x08` | Bandwidth | `0x418478` |
| `0x0A` | Deviation | `0x4183ea` |

#### Response/Reply Handling

| Class | Description |
|-------|-------------|
| `SBEPReply` | Generic reply parser (destructor at `0x417bfc`) |

**Response opcodes** follow standard ESBEP convention (high bit set):
- ACK, NAK, data response, error codes

#### BBO Protocol (Baseband Offset)

| Class | Opcode | Description | Function |
|-------|--------|-------------|----------|
| `SBEPReadBBORequest` | variable | Read BBO from radio | `0x41b006` (generic builder) |
| `SBEPWriteBBORequest` | variable | Write BBO to radio | `0x41b006` (same builder) |

BBO messages use `fcn.0041b006` which accepts the opcode as a parameter (not hardcoded),
suggesting BBO read/write reuses the generic ESBEP read (0x11) and write (0x17) opcodes
with BBO-specific address ranges. The `bbo.cfg` file provides per-model/band templates
that map to specific EEPROM addresses.

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
| `SBEPReadRequest` / `SBEPWriteRequest` | Generic EEPROM read/write |
| `SBEPReadBBORequest` / `SBEPWriteBBORequest` | Baseband Offset data |
| `SBEPSoftpotReadRequest` / `SBEPSoftpotWriteRequest` | Softpot values (opcode 0x21) |
| `SBEPSoftpotRequest` | Softpot command (opcode 0x20) |
| `SBEPReadRSSIRequest` | Live RSSI measurement |
| `SBEPReadTuneRequest` | Current tuning data |
| `SBEPAutoTuneRequest` | Initiate automatic tuning (opcode 0x22) |
| `SBEPTempCompRequest` | Temperature compensation |

**Errors:** `BadReply`, `MessageNotAcknowledged`, `RadioProtocolError`, `UnsupportedMessage`, `CommunicationError`, `PortInUseError`, `BaudRateSettingError`

### Additional Parameters (from agent analysis)

**Signaling Deviation Tuning:**
- MDC1200, MPT1327, Select 5, High Speed Trunking (HSS)

**Baseband Offsets:**
- CSQ (Carrier Squelch), DPL/MDC/QCII, TPL Range 1-4, LTR Low/Med/High Deviation

**Data format:** `.sfp` files (Softpot Files) for saving/loading calibration data

### Detailed Softpot Parameters (from RTTI class analysis)

**Transmit:**
| Parameter | Class | Range | Notes |
|-----------|-------|-------|-------|
| TX High Power | `TTransmitHighPowerWindow` | 0-255 | 7 freq points |
| TX Low Power | `TTransmitLowPowerWindow` | 0-255 | 7 freq points |
| TX DAC | `TTransmitDACWindow` | — | DAC 1+2, Low Band Mobile only |
| PA Voltage Limit | `TPAVoltageLimitWindow` | 0-511 | Auto-tune supported |
| PA Bias High | `TPABiasHighVoltageWindow` | 0-127 | Bias 2,3 = 0-255 |
| PA Bias Low | `TPABiasLowVoltageWindow` | 0-127 | Same structure |
| Mod Balance | `TModulationAttnWindow` | 0-63 | |
| VCO Attn 25kHz | `TVCOAttnWindow` | 0-31 | |
| VCO Attn 20kHz | `TVCOAttn20KHzWindow` | 0-31 | |
| VCO Attn 12.5kHz | `TVCOAttn125KHzWindow` | 0-31 | |

**Receive:**
| Parameter | Class | Range | Notes |
|-----------|-------|-------|-------|
| Auto Squelch 25kHz | `TAutoSquelch25KHzWindow` | 0-127 | |
| Auto Squelch 20kHz | `TAutoSquelch20KHzWindow` | 0-127 | |
| Auto Squelch 12.5kHz | `TAutoSquelch125KHzWindow` | 0-127 | |
| RSSI Thresholds | `TRSSIWindow` | 0-210 dBm | |
| Front End Filter | `TFrontEndFilterWindow` | 1-63 | |
| Rated Volume | `TRatedVolumeWindow` | 0-127 | CSQ environment |
| Rated Volume HearClear | `TRatedVolumeHearClearWindow` | 0-127 | |
| Battery Voltage | `TBatteryVoltageWindow` | — | Mobile only |

**Signaling Deviation:**
| Parameter | Class |
|-----------|-------|
| DTMF | `TDTMFWindow` |
| MDC1200 | `TMDC1200Window` |
| MPT1327 | `TMPT1200Window` |
| Select 5 | `TSelect5Window` |
| HSS (High Speed Trunking) | `THSSWindow` |

**Other:**
| Parameter | Class |
|-----------|-------|
| Reference Oscillator Warp | `TRefOscWarpWindow` |
| Baseband Update | `TBasebandUpdateWindow` |
| Serial Number Program | `TSerialProgramWindow` |

### Alignment Workflow (from protocol RE)

1. **COM port open**: `CreateFileA("COM%u", GENERIC_READ|GENERIC_WRITE)`, 9600/8/N/1
2. **Power up**: opcode `0x10` (SBEPRadioPowerUpRequest), no payload
3. **Query model**: opcode `0x23` sub=0x00, radio returns model string
4. **Query serial**: opcode `0x23` sub=0x01, radio returns serial number
5. **Enter test mode**: opcode `0x1b` (SBEPTestModeRequest), no payload
6. **Set channel/frequency**: opcode `0x28` sub=0x02 (freq), sub=0x05 (power), sub=0x08 (BW)
7. **Key up**: opcode `0x19` with 1-byte param (SBEPKeyUpRequest)
8. **Read softpot**: opcode `0x21` with `[rw_flag<<7, addr_hi, addr_lo]`
9. **Write softpot**: opcode `0x21` with `[rw_flag<<7|commit<<6, addr_hi, addr_lo, val_hi, val_lo]`
10. **Auto-tune**: opcode `0x22` with 3 parameter bytes
11. **Read RSSI**: opcode `0x20` sub-command for live measurement monitoring
12. **Dekey**: opcode `0x19` with 0-byte payload (SBEPDekeyRequest)
13. **Reset**: opcode `0x23` sub=0x05 with parameters

**Echo mode**: Radio echoes each sent frame before responding (standard SBEP behavior).
**Max transfer**: Chunked reads/writes in `fcn.00418c48` loop with configurable block size at `this+0x08`.

### Key Internal Functions (addresses in tuner32.exe)

| Address | Function | Purpose |
|---------|----------|---------|
| `0x0041c25b` | Frame header builder | Writes `[hdr_byte(s)][opcode]` based on opcode/length |
| `0x0041cd57` | Frame size calculator | Returns total frame size for opcode + data_count |
| `0x0041ce4c` | Header overhead calc | Returns 0/1/3/4 bytes of header overhead |
| `0x0041cebb` | Byte sum | Sums buffer bytes for checksum |
| `0x0041ceda` | Checksum compute | `0xFF - sum(frame_bytes)` |
| `0x004169a9` | Big-endian store | Stores 16-bit value as `[hi][lo]` in buffer |
| `0x0041e674` | Pre-send init | Called before every message send |
| `0x004167d0` | Post-send cleanup | Called after every message send |
| `0x00408dc1` | Main constructor | Opens COM port, sets 9600/8/N/1 |
| `0x004b039c` | EnhancedSBEP init | Initializes 21x21 state matrix |
| `0x005000b0` | Serial write | `WriteFile(handle_array[port], buf, len)` |
| `0x005017f8` | Serial read | `ReadFile` with timeout |
| `0x00501888` | Serial config | `SetCommTimeouts` |

### Signaling System Detection

Radio's primary signaling read and displayed: Conventional, Tone Signalling, Privacy Plus, LTR, Passport, MPT, 5T Prime

### Configuration

- `Tuner32.ini`: Application settings
- `com.ini`: COM port configuration (COM1-COM4)
- `bbo.cfg`: Binary config (24 records, 4-field global header, per-model/band/power calibration templates)
  - 5 unique radio type identifiers
  - Standard records: 6 tuning blobs (4-point radios)
  - Extended records: 9 tuning blobs (7-point radios)
- `.sfp` files: Softpot Files for saving/loading calibration data
