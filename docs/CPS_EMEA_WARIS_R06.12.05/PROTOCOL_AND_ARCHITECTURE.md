# Motorola Professional Radio CPS - Protocol & Architecture

> Reverse engineering documentation for the Waris/Professional Series CPS (GP300/GM300 family)
> Based on: CPS_EMEA_WARIS_R06.12.05 (MDC variant)

## Radio Family

The "Professional" or "Waris" series is a separate radio family from the Commercial Series (CM/CP).

| Model | Type | RF Bands | Signaling |
|-------|------|----------|-----------|
| GP320 | Portable | LB1, LB2, VHF, UHF1, UHF2 | 5-Tone |
| GP330 | Portable | LB1, LB2, VHF, UHF1, UHF2 | 5-Tone |
| GP340 | Portable | LB1, LB2, LB3, 300, 330, VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GP344 | Portable | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GP360 | Portable | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GP366 | Portable | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GP380 | Portable | LB1, LB2, LB3, 300, 330, VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF, Quik-Call II |
| GP388 | Portable | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GM340 | Mobile | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GM360 | Mobile | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF |
| GM380 | Mobile | VHF, UHF1, UHF2 | 5-Tone, MDC, DTMF, Quik-Call II |

**ATEX variants**: GP340/GP380 have ATEX (explosion-proof) variants for hazardous environments.

**Internal model types** (from ProRadio.exe at offset 0x3D6C40):
- "Waris Portable" — GP3xx portables (original)
- "Waris Mobile" — GM3xx mobiles (original)
- "Waris Portable New" — updated portable variant (mcomProRadNew.dll)
- "Waris Mobile New" — updated mobile variant (mcomProRadMobnew.dll)

**RF Bands** (from string table, `UHF / VHF / Low Band / 220 / 700`):
- Low = Low Band (29-66 MHz, split into LB1/LB2/LB3 sub-bands)
- VHF (136-174 MHz)
- UHF (403-527 MHz, split into UHF1/UHF2)
- 220 MHz band
- 700 MHz band (700MHz Reband capable models)
- 800 MHz band (referenced in `is800MhzRadio`)
- 900 MHz band (referenced but "not currently supported" per error string)

**Supported regions** (from string table at offset 0x3C0750):
- North America
- Latin America
- EMEA
- Asia
- Federal (US government)
- China Ministry of Rail
- Japan

**Codeplug versions supported** (from version table at offset 0x3D6BB0):
- 0.00, 1.00, 2.00, 3.00, 4.00, 5.00, 6.00, 7.00, 8.00, 9.00, 10.00, 11.00
- Also "03.00" (with leading zero, may be a distinct format variant)

**Band frequency encoding** (from function names):
- `PackFrequencyWith5KHzStep` / `UnpackFrequencyWith5KHzStep` — 5 kHz frequency step size
- `PackBaseFreq` / `UnpackBaseFreq` — LVRIS Base Frequency reference
- `frequency_IndexToVal` — index-to-frequency lookup table
- `frequency_IsValInRange` — range validation
- Channel bandwidths: 12.5 kHz and 20/25 kHz

---

## Software Architecture

### Overview

The Professional Radio CPS uses a **C++/MFC + ADK 5.1 framework** architecture with COM-based protocol and radio abstraction layers. ProRadio.exe is a native C++/MFC application (imports MFC42.DLL, standard C++ entry point), **not** VB6 as initially assumed. The GP300 CPS (gp300.exe) was VB6; the Waris evolution rewrote the main app in C++/MFC while keeping the same ADK 5.1 DLL framework.

```
┌─────────────────────────────────────────────┐
│         ProRadio.exe (C++/MFC GUI)          │
│  MDI interface, MFC document/view, Amulet   │
└────────────┬────────────────────────────────┘
             │ COM interfaces
┌────────────┴────────────────────────────────┐
│         ADK 5.1 DLL Framework (C++/MFC)     │
│                                             │
│  Rdb41.dll    Radio Database (Amulet)       │
│  Rui41.dll    Radio UI components           │
│  Rcg41.dll    Codeplug Generator (Ccg*)     │
│  Rud41.dll    DB-UI Exchange (tree/tables)   │
│  UdcDr41.dll  UI↔DB↔CG Driver Exchange     │
│  Fh41.dll     File Handler (encrypt/save)   │
│  Prn41.dll    Print/Report generation       │
└────────────┬────────────────────────────────┘
             │ COM interfaces
┌────────────┴────────────────────────────────┐
│      Radio Abstraction Layer (COM)          │
│                                             │
│  mcomProRad.dll     Radio.Motorola.Waris    │
│  mcomProRadMob.dll  Radio.Motorola.WarisMobile │
│  mcomUnknown.dll    Radio.Motorola.Unknown  │
└────────────┬────────────────────────────────┘
             │ COM interfaces
┌────────────┴────────────────────────────────┐
│      Protocol Layer (COM Servers)           │
│                                             │
│  VComSbep.dll   Protocol.Motorola.Sbep      │
│  VComESbp.dll   Protocol.Motorola.ESbep     │
│  VcomSb96.dll   Protocol.Motorola.Sb9600    │
└────────────┬────────────────────────────────┘
             │ Win32 serial API / VxD driver
┌────────────┴────────────────────────────────┐
│          Serial Port / RIB Box              │
│  COM1-COM4, RS-232                          │
│  SB9600: \\.\Commsb96 VxD driver            │
└─────────────────────────────────────────────┘
```

### DLL Naming Convention

DLLs have a numeric suffix indicating the radio family:
- **30** = GP300 Series (older, R03.x CPS versions)
- **41** = Waris/Professional Series (R06.x CPS, same radio family but rebranded)

The 30→41 transition consolidated several DLLs:
- GP300 had: `pip30.dll`, `udc30.dll`, `udcX30.dll`, `udcrX30.dll`, `ruiX30.dll`
- Waris merged these into the 41-series core DLLs

### ADK 5.1 Framework

All DLLs are built on Motorola's "Application Development Kit" version 5.1. Key components:
- **Amulet** constraint framework in Rdb41.dll (from CMU — `Am_Object`, `Am_Slot`, `Am_Value`, `Am_Constraint`)
- **Ccg** codeplug framework in Rcg41.dll (pack/unpack, field layout, block structure)
- **CFh** file handling in Fh41.dll (archive format, S-Record, encryption)

### RSS Launcher

A "Motorola Shortcut Bar" (`RSS_LAUNCHER.HLP`) provides a unified launcher for all RSS (Radio Service Software) applications. It can:
- **Open** any valid archive file and auto-find the correct RSS
- **Read Device** from serial port with auto-detection
- **Service Tool** for alignment/tuning

---

## Communication Protocols

The Waris radios support **three** serial protocols (vs one for Commercial Series).

**Serial configuration**: 9600/8/N/1, no flow control, echo mode (radio echoes each byte back before responding).

**Baud rates observed** (from CWinSerial::Write branch conditions): 9600 (0x2580), 19200 (0x4B00), 38400 (0x9600). Echo-mode write is used at these standard baud rates; non-echo bulk write at other rates.

### 1. SBEP (Serial Bus Extension Protocol) -- Primary

**COM Server**: `Protocol.Motorola.Sbep` (`VComSbep.dll`)
**Driver**: `\\.\Commsbep` (Win32) or `\\.\Vcomsbep.vxd` (Win9x VxD)

#### SBEP Wire Format (from Commpatch.dll decompilation)

Two frame types, determined by payload size:

**Short Frame** (data count 1-13 bytes, i.e. opcode + 0..12 data bytes):
```
Byte 0:    [0xF0 | N]     Header byte. N = (data_len + 1) & 0x0F.
                           Low nibble 0x01..0x0E. High nibble always 0xF.
Byte 1:    [opcode]        Command/response opcode
Byte 2..N: [data...]       Payload bytes (0 to 12)
Byte N+1:  [checksum]      0xFF - sum(bytes 0..N)
```
Total frame length = N + 2 bytes (header + N payload bytes + checksum).

**Long Frame** (data count > 13 bytes, low nibble == 0x0F):
```
Byte 0:    [0xFF]          Header byte (0xF0 | 0x0F). Signals long frame.
Byte 1:    [opcode]        Command/response opcode
Byte 2:    [len_hi]        Data length high byte (big-endian)
Byte 3:    [len_lo]        Data length low byte. Length = opcode+data count.
Byte 4..N: [data...]       Payload bytes
Byte N+1:  [checksum]      0xFF - sum(bytes 0..N)
```
Total frame length = length_field + 4 bytes (0xFF + opcode + len_hi + len_lo + data + checksum).

**Frame building pseudocode** (from `fcn.100067c0` in Commpatch.dll):
```c
void BuildFrame(SbepMessage *msg, uint8_t opcode, uint8_t *data, uint8_t data_len, int force_long) {
    msg->opcode = opcode;
    msg->data_len = data_len;

    // Auto-select long frame if data_len > 13 (0x0D)
    if (force_long == 0 && data_len > 0x0D)
        force_long = 2;  // long frame mode

    if (force_long <= 1) {
        // SHORT FRAME
        msg->buf[0] = 0xF0 | ((data_len + 1) & 0x0F);  // header
        msg->buf[1] = opcode;                             // opcode at offset 1
        memcpy(&msg->buf[2], data, data_len);             // data at offset 2
        msg->header_size = 2;
        msg->total_len = data_len + 3;                    // header + opcode + data + checksum
    } else {
        // LONG FRAME
        msg->buf[0] = 0xFF;                               // long frame marker
        msg->buf[1] = opcode;                              // opcode at offset 1
        msg->buf[2] = 0;                                   // len_hi (big-endian)
        msg->buf[3] = (data_len + 1) & 0xFF;              // len_lo
        memcpy(&msg->buf[4], data, data_len);              // data at offset 4
        msg->header_size = 4;
        msg->total_len = data_len + 5;                     // 0xFF + opcode + len_hi + len_lo + data + checksum
    }
    msg->checksum = Checksum(msg->buf, msg->total_len);
    msg->buf[msg->total_len - 1] = msg->checksum;
}
```

**Checksum algorithm** (from `fcn.10006a70`):
```c
uint8_t Checksum(uint8_t *buf, uint16_t total_len) {
    uint8_t sum = 0;
    for (int i = 0; i < total_len - 1; i++)
        sum += buf[i];
    return 0xFF - sum;
}
```

**Checksum verification** (from `fcn.10006950`):
```c
bool VerifyChecksum(uint8_t *frame) {
    uint16_t len;
    if ((frame[0] & 0x0F) == 0x0F)
        len = ((frame[2] << 8) | frame[3]) + 4;  // long frame total
    else
        len = (frame[0] & 0x0F) + 2;              // short frame total
    uint8_t expected = Checksum(frame, len);
    return frame[len - 1] == expected;
}
```

**NAK byte**: `0x60` (from `fcn.10006520`: compares received byte against 0x60).

**Good Write Reply**: `0x84` (RPY_GOOD_WR, from `fcn.100063f0`).

**Good Read Reply**: `0x80` (RPY_RD_DATA, from `fcn.100055d0`).

**Update Serial Number Reply**: `0x87` (RPY_WR_SERNUM, from `fcn.10005960`).

#### SBEP Opcode Map (from VComSbep.dll `fcn.10006ab0` decompilation)

Registration signature: `RegisterOpcode(name, opcode_byte, sub_cmd, ioctl_type, handler_fn)`

| Opcode | Byte | Sub-cmd | Type | Description |
|--------|------|---------|------|-------------|
| `RESET` | `0x10` | n/a | Request | Reset radio to normal mode |
| `REQ_RD_DATA` | `0x11` | n/a | Request | Read data from address |
| `REQ_CHECKSUM` | `0x12` | n/a | Request | Request codeplug checksum |
| `REQ_CONFIG` | `0x13` | n/a | Request | Request configuration |
| `REQ_STATUS` | `0x14` | n/a | Request | Request radio status |
| `REQ_ERASE_FLASH` | `0x15` | n/a | Request | Erase flash memory |
| `REQ_ZERO_FLASH` | `0x16` | n/a | Request | Zero flash memory |
| `REQ_WR_DATA` | `0x17` | n/a | Request | Write data to address |
| `RPY_RD_DATA` | `0x80` | n/a | Response | Read data response |
| `RPY_CHECKSUM` | `0x81` | n/a | Response | Checksum response |
| `RPY_CONFIG` | `0x82` | n/a | Response | Configuration response |
| `RPY_STATUS` | `0x83` | n/a | Response | Status response |
| `RPY_GOOD_WR` | `0x84` | n/a | Response | Write success |
| `RPY_BAD_WR` | `0x85` | n/a | Response | Write failure |
| `RPY_UNSUPPORTED` | `0x86` | n/a | Response | Unsupported opcode |

**Request opcode range**: `0x10`-`0x17` (8 opcodes).
**Response opcode range**: `0x80`-`0x86` (7 opcodes).

#### SBEP Read Data Transaction

From `fcn.100055d0` (CSbepBroker::ReadData):
```
Request frame payload: [opcode=0x11] [addr_hi] [addr_mid] [addr_lo] [length]
  - 3-byte address (big-endian, 24-bit)
  - 1-byte length (max transfer size)

Response frame: [opcode=0x80] [addr_hi] [addr_mid] [addr_lo] [data...]
  - First 3 bytes of response data are the echoed address
  - Remaining bytes are the requested data
  - Actual data starts at response_data[3], length = response_data_len - 3
```

#### SBEP Write Data Transaction

From `fcn.100063f0` (CSbepComm write path):
```
Request frame payload: [opcode=0x17] [addr_hi] [addr_mid] [addr_lo] [data...]
Response: [opcode=0x84] (RPY_GOOD_WR) or [opcode=0x85] (RPY_BAD_WR)
```

### 2. ESBEP (Extended SBEP) -- Full-featured

**COM Server**: `Protocol.Motorola.ESbep` (`VComESbp.dll`)

ESBEP is a strict superset of SBEP. Same wire format, additional opcodes.

#### ESBEP Opcode Map (from VComESbp.dll `fcn.10006aa0` decompilation)

All SBEP opcodes are present (same byte values). Additional opcodes:

| Opcode | Byte | Sub-cmd | Type | Description |
|--------|------|---------|------|-------------|
| *SBEP base opcodes 0x10-0x17, 0x80-0x86 -- same as above* | | | | |
| `REQ_WR_SERNUM` | `0x18` | n/a | Request | Write serial number |
| `REQ_RADIO_KEY` | `0x19` | n/a | Request | Radio key/password check |
| `REQ_TUNE_PARAMS` | `0x1B` | n/a | Request | Query tuning parameters |
| `REQ_BUTTON_TST` | `0x1C` | n/a | Request | Button test mode |
| `REQ_AUTOTUNE` | `0x1F` | n/a | Request | Auto-tune alignment |
| `REQ_SOFTPOT` | `0x20` | n/a | Request | Soft potentiometer adjust |
| `REQ_CHANNEL` | `0x21` | n/a | Request | Query current channel |
| `REQ_TESTMODE` | `0x22` | n/a | Request | Enter test mode |
| `REQ_RADSTAT` | `0x23` | n/a | Request | Radio status / query base |
| `REQ_MODEL_NO` | `0x23` | `0x00` | Query | Query model number |
| `REQ_SERIAL_NO` | `0x23` | `0x01` | Query | Query serial number |
| `REQ_ESERIAL_NO` | `0x23` | `0x02` | Query | Query electronic serial (ESN) |
| `REQ_SW_VER` | `0x23` | `0x03` | Query | Query firmware version |
| `REQ_CP_VER` | `0x23` | `0x04` | Query | Query codeplug version |
| `REQ_POWUP_STAT` | `0x23` | `0x05` | Query | Query power-up status |
| `REQ_SIG_DET` | `0x23` | `0x06` | Query | Signal detect |
| `REQ_CP_SIZE` | `0x23` | `0x07` | Query | Query codeplug size |
| `REQ_PWD_CHK` | `0x23` | `0x08` | Query | Password check |
| `REQ_LOW_BAT_CHK` | `0x23` | `0x09` | Query | Low battery check |
| `REQ_LAST_PROG` | `0x23` | `0x0A` | Query | Last programmed date |
| `REQ_CP_PART_NO` | `0x23` | `0x0B` | Query | Codeplug part number |
| `REQ_FW_PART_NO` | `0x23` | `0x0C` | Query | Firmware part number |
| `REQ_TEST_ENV` | `0x23` | `0x0D` | Query | Test environment |
| `REQ_IC_VER` | `0x23` | `0x0E` | Query | IC version numbers |
| `REQ_UUID` | `0x23` | `0x0F` | Query | UUID |
| `REQ_KEYPAD` | `0x24` | n/a | Request | Keypad query |
| `REQ_FRAC_N_FREQ` | `0x25` | n/a | Request | Fractional-N frequency |
| `REQ_INVOKE` | `0x26` | n/a | Request | Invoke operation |
| `REQ_CHAN_STEER` | `0x27` | n/a | Request | Channel steering |
| `RPY_WR_SERNUM` | `0x87` | n/a | Response | Write serial number reply |
| `RPY_SOFTPOT` | `0x8A` | n/a | Response | Soft potentiometer reply |
| `RPY_RADSTAT` | `0x8B` | n/a | Response | Radio status reply |
| `RPY_OP_COMPLETE` | `0x8C` | n/a | Response | Operation complete |
| `RPY_TUNE_PARAMS` | `0x8D` | n/a | Response | Tuning parameters reply |
| `RPY_BUTTON_TST` | `0x8E` | n/a | Response | Button test reply |

**Request opcode range**: `0x10`-`0x27` (note gaps: no `0x1A`, `0x1D`, `0x1E`).
**Response opcode range**: `0x80`-`0x8E` (note gaps: no `0x88`, `0x89`).

**Query sub-commands**: Opcode `0x23` (REQ_RADSTAT) doubles as a query base. When sent with a sub-command byte as the first data byte, it queries specific radio info (16 sub-types: 0x00-0x0F). This matches the Commercial Series ESBEP query opcode `0x23`.

**Comparison with Commercial Series ESBEP**: The Waris ESBEP has significantly more commands -- adds diagnostic/alignment capabilities (AUTOTUNE, SOFTPOT, TESTMODE, BUTTON_TST, KEYPAD, FRAC_N_FREQ, etc.) that the Commercial Series lacks. The Commercial Series ESBEP has only 6 command + 6 response opcodes.

### Commpatch.dll -- Standalone SBEP Implementation

`Commpatch.dll` is a self-contained SBEP stack with direct Win32 serial access, bypassing the `\\.\Commsbep` driver. It exports a single function: `_WriteToRadio@16`.

**Class hierarchy** (from RTTI):
- `CSbepBroker` -- High-level operations (ReadData, WriteData, UpdateSerialNumber)
- `CSbepComm` -- Send/receive with retry loop, NAK handling
- `CSbepMessage` -- Frame construction and parsing (short/long frame)
- `CWinSerial` -- Win32 serial port (CreateFile, ReadFile, TransmitCommChar)
- `CSbepError` / `CCommError` / `CGenError` -- Exception hierarchy

**Echo-mode write** (from `fcn.10008200` / `fcn.10008070`):
```c
// CWinSerial::Write sends one byte at a time using TransmitCommChar()
// At baud rates 9600/19200/38400, echo verification is enabled:
for (int i = 0; i < frame_len; i++) {
    TransmitCommChar(hPort, frame[i]);  // send one byte

    // Every 5 bytes (or at end of frame), read back echoed bytes
    if ((i + 1) % 5 == 0 || i + 1 == frame_len) {
        int echo_count = (i + 1 == frame_len) ? frame_len % 5 : 5;
        if (echo_count == 0) echo_count = 5;
        ReadFile(hPort, echo_buf + (i + 1 - echo_count), echo_count, ...);
    }
}

// After all bytes sent, verify echo buffer matches transmitted data
for (int i = 0; i < frame_len; i++) {
    if (echo_buf[i] != frame[i]) {
        // "CWinSerial::Write: Echo byte %d does not match transmitted character"
        throw error;
    }
}
```

**Retry logic** (from `fcn.100061e0` / CSbepComm::SendAndReceive):
- Configurable retry count stored at `this+0x438`
- On each attempt: send frame, wait for NAK check, then receive response
- After send, reads 1 byte; if `0x60` (NAK): "Receive Negative Ack from external device"
- On success, calls `fcn.100063f0` to read full response frame
- Timeout-based retry with configurable delay between attempts

**Error handling** (from `fcn.10005ee0`):
- Return code 0: success
- Return code 1: NAK received ("Received NACK from external device")
- Return code 4: checksum error ("Reply from external device contained checksum error")
- Return code 5: timeout ("Timeout occurred while sending SBEP command")
- Opcode `0x86` (RPY_UNSUPPORTED): "Received Unsupported Opcode reply from external device"

### 3. SB9600 -- Legacy

**COM Server**: `Protocol.Motorola.Sb9600` (`VcomSb96.dll`)
**Driver**: `\\.\Commsb96` (Win32) or `\\.\Vcomsb96.vxd` (Win9x VxD)

SB9600 is the oldest protocol, from the Saber/MTS2000 era (US Patent 5,551,068). It uses a VxD kernel driver due to strict timing requirements.

#### SB9600 Opcode Map (from VcomSb96.dll `fcn.10008850` decompilation)

| Opcode | Byte | Type | Description |
|--------|------|------|-------------|
| `EPREQ` | `0x06` | Command | EEPROM request (simple read/write) |
| `MEMWRITE` | `0x07` | Command | Memory write |
| `MEMACS` | `0x08` | Command | Memory access (read/write control) |
| `TSTMOD` | `0x40` | Command | Test mode |
| `MEMREAD` | `0x87` | Response | Memory read response |

#### SB9600 Wire Format (from handler decompilation)

SB9600 uses a fixed 5-byte frame at the driver level. The COM server translates between a structured representation and the wire bytes.

**MEMREAD/MEMWRITE** (`fcn.10008b00`):
```
Wire format (5 bytes to/from driver):
  Byte 0: address_hi (address >> 8)
  Byte 1: address_lo (address & 0xFF)
  Byte 2: data byte
  Byte 3: frame length (always 5 at this level)

Structured representation (COM layer):
  Field 1: 16-bit address (big-endian: byte0 << 8 | byte1)
  Field 2: data byte (byte2)
```

**EPREQ/MEMACS** (`fcn.10008c90`):
```
Wire format (5 bytes to/from driver):
  Byte 0: 0x00 (fixed)
  Byte 1: device_id
  Byte 2: (block << 5) | (address & 0x1F)   -- packed block+address
  Byte 3: frame length (always 5)

Structured representation (COM layer):
  Field 1: device_id (byte1)
  Field 2: block number (byte2 >> 5)      -- 3-bit block ID
  Field 3: address within block (byte2 & 0x1F) -- 5-bit address
```

**TSTMOD** (`fcn.10008950`):
```
Wire format (5 bytes to/from driver):
  Byte 0: (block << 5) | (address & 0x1F)  -- packed block+address
  Byte 1: data[0]
  Byte 2: data[1]
  Byte 3: frame length (always 5)

Structured representation (COM layer):
  Field 1: block number (byte0 >> 5)
  Field 2: address (byte0 & 0x1F)
  Field 3: 2 data bytes
```

### IOCTL Interface (\\.\Commsbep driver)

The `VComSbep.dll` communicates with the `\\.\Commsbep` kernel driver via `DeviceIoControl()`. All IOCTL codes use device type `0x0022` (FILE_DEVICE_UNKNOWN).

**IOCTL codes** (from VComSbep.dll disassembly):

| IOCTL Code | Function | In Size | Out Size | Description |
|------------|----------|---------|----------|-------------|
| `0x220007` | 0x001 | 0x24 (36) | 0 | Send SBEP frame to radio |
| `0x22000B` | 0x002 | 0x24 (36) | 0 | Send frame (alternate path) |
| `0x22000F` | 0x003 | 4 | 0 | Set baud rate / port config |
| `0x220013` | 0x004 | 4 | 4 | Send and receive (transact) |
| `0x220017` | 0x005 | 4 | 0 | Write configuration |
| `0x22001B` | 0x006 | var | 0 | Bulk data send |
| `0x22001F` | 0x007 | 4 | 0 | Reset/clear state |
| `0x220023` | 0x008 | 0x14 (20) | var | Read bulk data |
| `0x220027` | 0x009 | 4 | 0 | Enumerate serial ports |
| `0x22002B` | 0x00A | 4 | 0 | Close/cleanup |
| `0x220037` | 0x00D | var | var | Extended transact |

**IOCTL code formula**: `CTL_CODE(0x22, func, METHOD_BUFFERED, FILE_ANY_ACCESS)` = `(0x22 << 16) | (func << 2) | 3`.

The transact IOCTL (`0x220013`) sends an SBEP frame and receives the response in a single call, with retry logic and 250ms (0xFA) sleep between retries. On failure with error code `0xECEC0007` and response opcode < `0x80` (not a response), it falls back to a reset-and-retry path.

### Radio Abstraction Commands

The `mcom*.dll` radio abstraction layer translates high-level operations into protocol commands:

| Command | Description | Used By |
|---------|-------------|---------|
| `REQ_MODEL_NO` | Get radio model | All |
| `REQ_SERIAL_NO` | Get serial number | All |
| `REQ_RADIO_KEY` | Get/check radio key | All |
| `REQ_UUID` | Get UUID | All |
| `REQ_TUNE_PARAMS` | Get tuning parameters | Portable + Mobile |
| `REQ_RD_DATA` | Read codeplug data | Portable + Mobile |
| `REQ_WR_DATA` | Write codeplug data | Portable + Mobile |
| `RPY_GOOD_WR` | Write confirmation | Portable + Mobile |
| `RPY_RADSTAT` | Radio status | All |
| `RPY_RD_DATA` | Read data response | Portable + Mobile |

**Unknown radio handler** (`mcomUnknown.dll`): Only queries `REQ_UUID` and `RPY_RADSTAT` via either `Esbep` or `Sb9600WithSbep` protocol — used for radio identification when model is not recognized.

---

## File Formats

### .cpg Archive Format

The Waris CPS uses **`.cpg`** files (not `.cps` like Commercial Series).

**Structure**:
1. **Header**: 800 bytes (0x320) — `MotHeader` struct
2. **Post-header data**: Optional metadata
3. **Encrypted payload**: Codeplug binary data

**MotHeader Layout** (verified from disassembly of CFhFileHeader constructors at Fh41.dll offsets 0x3340 and 0x3500):

```
Offset  Size   Field
0x000   4      Signature DWORD (from global constant at runtime)
0x004   2      Signature WORD (from global constant)
0x006   1      FileType enum (internal: 1-5)
0x007   1      Reserved (zero)
0x008   1      Reserved (zero)
0x009   3      Padding
0x00C   16     UUID (GUID, 128-bit)
0x01C   20     Model Number (ASCII, null-padded, max 20 chars)
0x030   20     Serial Number (ASCII, null-padded, max 20 chars)
0x044   1      Checksum byte (0xFF - sum(all_header_bytes))
0x045   ~70    Copyright: "Requires MOTOROLA Radio Service Software. COPYRIGHT 1996-1997 MOTOROLA"
0x08B   ...    Padding (zeroed)
0x10D   300    Quick Info string (description, null-padded, max 0x12C chars)
0x239   230    Reserved (zeroed)
----
Total: 0x320 = 800 bytes
```

**GetHeaderSize** returns constant 0x320 (verified: `mov eax, 0x320; ret` at offset 0x2920).

**File types supported** (from `CFhFileHandler::GetFileType` and `IsFileTypeSupported`):
- Valid range: 1-5 inclusive
- Type 1: Archive (`.cpg`) — encrypted codeplug archive
- Type 2: S-Record (`.srec`) — Motorola S-Record format (plaintext hex)
- Types 3-5: Unknown (possibly binary image, template, device temporary)

**File dialog filter**: `Archive Files (*.cpg)|*.cpg|(*.srec)|*.srec||`

### .cpg Encryption (CFhEncrypt)

The .cpg file encryption uses a **seeded LCG stream cipher** — significantly more sophisticated than Commercial Series' simple XOR 0x95.

**Algorithm** (verified from disassembly at Fh41.dll offset 0x1580):

```
Linear Congruential Generator (LCG):
  next_state = (state * 85 + 25) & 0xFF
  (multiplier=0x55, increment=0x19, modulus=256)

Disassembly of randomGenerator():
  call getRandomValue       ; eax = state
  mov ecx, eax
  shl ecx, 4               ; ecx = state * 16
  add ecx, eax             ; ecx = state * 17
  lea esi, [ecx+ecx*4+0x19] ; esi = 5 * (state*17) + 25 = 85*state + 25
  and esi, 0xFF            ; mask to byte
  call putRandomValue(esi) ; store new state
  return esi
```

**CFhEncrypt object** (verified): single DWORD field at offset 0 = LCG state (initialized to 0).

**Encryption process**:
1. Generate seed from `time()` → `seed = time() & 0xFF`
2. Initialize LCG with seed via `putRandomValue(seed)`
3. Write 9 bytes of random LCG output as **padding** to output
4. Derive encryption key:
   - `key_seed = (padding[5] + padding[6] - padding[8]) & 0xFF`
   - Initialize LCG with `key_seed`
   - Generate first state byte
5. For each plaintext byte:
   - `encrypted = plaintext XOR state`
   - If result is `0x1A` or `0x1B`: insert escape sequence (`0x1B` + modified byte)
   - Advance LCG state: `state = randomGenerator()`
   - State also feeds back from encrypted output

**Decryption process** (decryptChar at offset 0x1390):
1. Read first 9 bytes (random padding)
2. Extract `padding[5]`, `padding[6]`, `padding[8]`
3. Compute: `key_seed = (padding[5] + padding[6] - padding[8]) & 0xFF`
4. Initialize LCG with `key_seed`, generate first state
5. For each encrypted byte:
   - Handle escape: `0x1B` prefix means next byte is escaped
   - `plaintext = encrypted XOR state`
   - Advance state with feedback: `new_state = (decrypted + randomGenerator() + old_state) & 0xFF`

**LCG sequence example** (seed=0): 25, 102, 247, 28, 101, 162, 227, 120, 241, 30, 15, 20, 189, ...

**Key differences from Commercial Series**:
- Commercial Series: fixed XOR key `0x95`, deterministic, same plaintext → same ciphertext
- Waris: time-seeded LCG, random padding, same plaintext → different ciphertext each save
- Waris has escape sequences for `0x1A`/`0x1B` (which are control characters in the stream)
- Waris: underlying data is binary codeplug image, NOT XML

### S-Record Format

The CPS can also save/load codeplug data as Motorola S-Records (`.srec`). Functions:
- `ReadSRecFile`, `ReadSRLine`, `ReadSRByte` — read S-Record files
- `WriteSRecFile`, `SaveSRecord`, `SaveSRLine`, `SaveSRByte`, `SaveSREnd` — write S-Record files
- `SplitBootAndCpData` — separate boot block from codeplug data

---

## Codeplug Structure (Ccg Framework)

The Waris codeplug uses the **Ccg** (Codeplug Generator) framework from `Rcg41.dll`, which is significantly more structured than the Commercial Series.

### Memory Layout

```
┌──────────────────────────┐
│    Config Info            │ ← CcgCpConfigInfo (model/version ID)
├──────────────────────────┤
│    Type Control Block     │ ← CcgTypeControlBlock (bit flags for present blocks)
├──────────────────────────┤
│    Vector Block           │ ← CcgVectorBlock (offsets to data blocks)
├──────────────────────────┤
│                           │
│    Read-Only Region       │ ← CcgRegionLayout (fixed blocks)
│                           │
├──────────────────────────┤
│                           │
│    Read-Write Region      │ ← CcgRegionLayout (variable blocks)
│                           │
└──────────────────────────┘
```

### Config Info

At the start of the codeplug image. Contains:
- Model index
- Version index
- Codeplug layout standard version
- Config byte sequence

### Type Control Block

A **bit array** where each bit indicates whether a specific data block is present in the codeplug.
- Functions: `GetFirstBitEqualsOne`, `GetNextBitEqualsOne`, `GetSetOrder`
- Minimum size: `GetMinimumSizeOfTypeCtrlBlock()`
- Used to handle radios with different feature sets (a GP320 has fewer blocks than a GP380)

### Vector Block

Similar concept to Commercial Series — contains **offsets** pointing to each data block.
- Functions: `GetVector(blockID, &address)`, `GetNumberOfNonNullVectors`
- Config determines vector size: `GetVectorSizeInBytes()` (2 or 4 bytes per vector)
- Fixed or variable position: `IsFixedVectorBlk()`

### Data Blocks

Two types:
- **OneDimBlock** (1D): Simple array of entries (like Commercial Series blocks)
  - `CcgOneDimBlockLayout`: block ID, entry layout, format, unit type, multi-entry flag, name
  - Entry description: checksum type, dimension-to-follow byte, entry size, fill byte
  
- **TwoDimBlock** (2D): List of lists (e.g., scan lists, zone channel assignments)
  - `CcgTwoDimBlockLayout`: adds max list items, inner entry description
  - Outer dimension: number of lists
  - Inner dimension: entries per list

### Block Layout Details

```
CcgBlockLayout:
  - BlockID (16-bit: byte offset + bit number)
  - EntryLayout (array of field layouts)
  - BlockFmt (format enum)
  - UnitType (byte/bit)
  - StartAddress (fixed address blocks)
  - Name (human-readable block name)

CcgEntryDescLayout:
  - CheckSumLayout (None, Individual, Total)
  - Length byte
  - DimToFollow byte
  - FillByte
  - SizeLength (bytes for size field)
  - MaxPossibleEntrySize

CcgFieldLayout:
  - ByteOffset (within entry)
  - MsbStart (bit position)
  - LengthInBits
```

### Field Types

- **CcgNumField**: Numeric field (integer, bitmask) — `GetValue() → uint`
- **CcgCharField**: Character field (single char, with CharType) — `GetValue() → char`
- **CcgStrField**: String field (multi-char) — `GetValue() → CString`

### Checksum

Two checksum modes per block:
- **Individual**: Each entry has its own checksum (`IsIndividualCheckSum`)
- **Total**: One checksum for the entire block (`IsTotalCheckSum`)

Validation: `ValidataIndividualEntryCheckSum`, `ValidataTotalBlockCheckSum`
Algorithm: `0xFF - sum(bytes)` (same as file header and protocol)

### Pack/Unpack Operations

- **Unpack** (read from radio): `CcgRdkUp::FullUnpack(rawBytes, ...)` → structured blocks
- **Pack** (write to radio): `CcgRdkPk::FillImage(cpLayout, rdkImage, ...)` → raw bytes
- Import/export between radios: `CcgRdkImportInfo`, `CcgRdkExportInfo`
- Space management: `CcgCpSpace` tracks free/used space, fragmentation

### Pack/Unpack Transform Functions

The following transform functions convert between UI values and binary codeplug representation (from ProRadio.exe string analysis):

**Frequency encoding**:
- `PackFrequencyWith5KHzStep` / `UnpackFrequencyWith5KHzStep` — main frequency fields (5 kHz resolution)
- `PackBaseFreq` / `UnpackBaseFreq` — LVRIS base frequency reference
- `PackBandFreq` / `UnpackBandFreq` — band-specific frequency
- `PackFreqB` — secondary frequency field
- `PackToneFreq` — PL/CTCSS tone frequency
- `unpackDivideByStepIntoDouble` — step-based frequency conversion

**Signaling**:
- `PackSigType` / `UnpackSigType` — signaling system type (MDC, DTMF, QC-II, None)
- `PackMdcCallId` / `UnpackMdcCallId` — MDC1200 call ID encoding
- `PackAckDigit` / `UnpackAckDigit` — acknowledgment digit
- `PackAckType` / `UnpackAckType` — acknowledgment type
- `PackToneTag` / `UnpackToneTag` — tone tag assignment
- `PackVariableID` / `UnpackVariableID` — variable-length ID field

**Numeric transforms**:
- `PackNumericMultiple` / `UnpackNumericMultiple` — multiply/divide by constant
- `PackNumericDivide` / `UnpackNumericDivide` — divide/multiply by constant
- `PackNumericDivideMinus1` — divide minus 1
- `PackNumericMinus` / `UnpackNumericPlus` — subtract/add offset
- `PackDoubleMultiple` — floating-point multiply
- `PackDoubleMultipliedByNumIntoInt` / `UnpackIntDividedByNumIntoDouble` — float-to-int conversion
- `PackOppositeOfUI` / `UnpackOppositeOfCp` — boolean inversion
- `PackListToIndex` — convert list selection to index

**Power/Audio**:
- `packPowerLevel` — transmit power level encoding
- `packVolOffset` — volume offset encoding
- `AccGainUnpack` / `EmerMicGainUnpack` — microphone gain fields

**Date/Time**:
- `PackDateDay` / `PackDateMonth` / `PackDateYear` — date fields
- `PackTimeHour` / `PackTimeMinute` — time fields

**Custom range fields** (with special sentinel values):
- `PackStrFor255CustomRange` / `PackStrForZeroCustomRange` — disabled-at-boundary
- `PackAuxCtrlMomDurCustomRange` — auxiliary control momentary duration
- `PackDosAutoMuteDurCustomRange` — DOS auto-mute duration
- `PackEmerOpenMicDurCustomRange` — emergency open mic duration
- `PackEmerTxCycDelCustomRange` — emergency tx cycle delay

**Buttons/UI**:
- `PackFctButton` — function button assignment
- `PackLSP1FctButton` through `PackLSP4FctButton` — LS trunking button assignment
- `PackRefToCnvPer` / `UnpackRefToCnvPer` — conventional personality reference
- `PackRegionalId` / `UnpackRegionalId` — regional identifier

**Constants**:
- `AlwaysPackOne` / `AlwaysUnpackOne` — fixed value 1
- `AlwaysPackZero` / `AlwaysUnpackZero` — fixed value 0
- `PackZeroForBoolIfNonapplicable` — conditional zero
- `PackZeroForListInfoIfNonapplicable` — conditional zero for lists

---

## CPS Features (from Help TOC)

### GP300 CPS (R03.x — 5-Tone variant)

```
Radio Information
Per Radio:
  - Button Definitions (Portable / Smart Microphone / Mobile)
  - Alerts (3 pages + Volume + Button + Mobile Buttons)
  - Miscellaneous (Global, Battery, Power-Up, Mic, Timers, VOX, Prefix, Display/Keypad)
  - Signalling Definition
  - Menu Items
  - RF TX/RX
  - Scan (List, Options, Switches)
  - Emergency (2 pages)
  - GP I/O Lines
  - Contact List
  - Status Decode/Encode
  - Configuration Bytes (raw hex)
  - Auto Telegram
Per Channel:
  - RX/TX frequencies
  - PL/DPL codes
  - Display
  - Miscellaneous
Per Personality:
  - TX/RX
  - Squelch
  - Misc
  - Audio
  - PTT
  - S5 Encode/Decode (5-Tone)
Signaling:
  - Encoder Sequences
  - Encoder Telegrams
  - Multicall (Address, Status)
  - Decoder Definitions (Seq+Masks, Options)
  - Auto Acknowledge
  - Select 5 Signalling System
  - User Defined Signalling (custom tones)
  - DTMF Signalling System
```

### Waris CPS (R06.12.05 — MDC variant)

```
Productivity Tools:
  - Custom Print
  - Drag and Drop
  - Modified/Invalid Fields
  - CPS Search
  - Option Board Import
  - Personality Assignment Wizard
  - Tree View
  - Trunking Site File Export/Import
Radio Information / Configuration
Controls and Menus:
  - One Touch Setup
  - Conventional Buttons (Portable / Mobile)
  - LS Trunking Buttons (Portable / Mobile)
Conventional Personality
LS Trunking:
  - LS Trunking Personality
  - LS Universal ID List
  - LS Trunking Site
Signaling:
  - Signaling Configuration
  - MDC System
  - Quik-Call II System
  - DTMF System
Call Lists:
  - MDC Call
  - Quik-Call II Call
  - DTMF Call
MDC Message and Status
Phone (telephone interconnect)
Scan Lists
Personality Assignment to Zone
```

**Key differences**:
- GP300 CPS focuses on **5-Tone (Select 5)** signaling with user-defined tone systems
- Waris CPS adds **MDC**, **Quik-Call II**, **LS Trunking**, **Phone**, **Zones**
- GP300 has raw **Configuration Bytes** (direct EEPROM editing) — removed in Waris
- Waris adds **Option Board** support (expansion modules)

---

## Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| R03.09.03 | ~2003 | GP300 CPS, 5-Tone, basic radios |
| R03.11.16 | 2012-01-07 | Last GP300 release, added Win7 x64 support |
| R06.12.05 | ~2010 | Rebranded as "Professional Radio CPS", added Win7 x64 |

### GP300 R03.09.03 → R03.11.16 Changes

Only `gp300.exe` changed (hash differs). All DLLs are **identical**. New files added:
- `CommPatch.dll` — communication compatibility patch
- `DrvInstall.dll` — driver installer for Win7
- `commsbepx64_setup.exe` — SBEP driver for 64-bit Windows

### GP300 R03.x → Waris R06.12.05 Changes

Complete rewrite of core DLLs (30→41 suffix), main EXE (gp300.exe→ProRadio.exe), consolidated extra DLLs, added "New" radio variants (mcomProRadNew, mcomProRadMobnew). Communication drivers remain partially shared.

---

## Comparison: Professional vs Commercial Series CPS

| Aspect | Commercial Series | Professional/Waris Series |
|--------|------------------|--------------------------|
| **Main EXE** | cps.exe (C++/MFC) | ProRadio.exe (C++/MFC) |
| **Framework** | COM DLLs, Xalan/Xerces | ADK 5.1, Amulet constraints |
| **File format** | .cps (XOR 0x95 → XML) | .cpg (LCG stream cipher → binary) |
| **Also supports** | — | .srec (S-Record) |
| **Protocols** | ESBEP only | SBEP + ESBEP + SB9600 |
| **ESBEP commands** | 6 req + 6 rsp | 30+ req + 10+ rsp |
| **Codeplug format** | XML (ELP_ELM / S5T) | Binary (Ccg framework) |
| **Memory layout** | Flat, vector table at offset 642 | RO/RW regions, type control block |
| **Block types** | 1D only | 1D + 2D |
| **Signaling** | PL/DPL only | 5-Tone, MDC, DTMF, Quik-Call II |
| **Trunking** | No | LS Trunking |
| **Radios** | CP040-CP380, CM140-CM360 | GP320-GP388, GM340-GM380 |
| **SB9600 support** | No | Yes (via VxD driver) |

---

## UI Field Reference (from ProRadio.exe string analysis)

### Conventional Personality Fields

| Field | UI Label | Type |
|-------|----------|------|
| Frequency | Frequency (MHz) | 5 kHz step encoded |
| Tx Offset | Tx Offset Frequency (MHz) | Offset from Rx |
| Channel Bandwidth | Channel Bandwidth (kHz) | 12.5 / 20 / 25 kHz |
| Tx Power Level | Tx Power Level | Enum |
| Tx High Power | Tx High Power (Watts) | Numeric |
| Tx Low Power | Tx Low Power (Watts) | Numeric |
| Squelch Type | Squelch Type | Enum (PL/DPL/None/...) |
| DPL Code | DPL Code | Numeric |
| Signaling Squelch | Signaling Squelch | Bool |
| Companding | Companding | Bool |
| Busy Channel Lockout | Busy Channel Lockout | Bool |
| Scan Priority | Scan Priority | Enum |
| DTMF System | DTMF System | Reference |
| MDC System | MDC System | Reference |
| QC-II System | Quik-Call II System | Reference |
| Phone System | Phone System | Reference |

### Radio Configuration Fields

| Field | UI Label | Type |
|-------|----------|------|
| Model Number | Model Number | Read-only |
| Firmware Version | Firmware Version | Read-only |
| Codeplug Version | Codeplug Version | Read-only |
| Regional Identifier | Regional Identifier | Encoded |
| CPS Password | CPS Password | String |
| Rotary Control | Rotary Control | Enum |
| Display Type | Display Type | Enum |
| Time-Out Timer | Time-Out Timer (sec) | Custom range |
| Auto Power Mode | Auto Power Mode | Bool |
| Emergency Mode Type | Emergency Mode Type | Enum |
| Emergency Type | Emergency Type | Enum |
| Option Board Type | Option Board Type | Enum |
| Edit Mode | Edit Mode | Multi-field |
| LVRIS Base Frequency | LVRIS Base Frequency | Reference freq |
| Reference Frequency | Reference Frequency (MHz) | Calibration |

### Signaling Systems

| System | UI Section | Key Fields |
|--------|-----------|------------|
| MDC1200 | MDC System | MDC Call ID, PTT ID, Emergency, Decode, Call Alert |
| DTMF | DTMF System | DTMF Call ID, Sidetone Type, Tone Span |
| Quik-Call II | Quik-Call II System | Tone A/B/C/D Frequencies, Threshold |
| LS Trunking | LS Trunking | Site, Repeaters, Universal ID List, Personality |

### Emergency Fields

| Field | UI Label |
|-------|----------|
| Emergency Mode | Emergency Mode Type |
| Emergency Type | Emergency Type |
| Emergency Tx Cycles | Emergency Tx Cycles |
| Emergency Tx Cycles Delay | Emergency Tx Cycles Delay |
| Emergency Open Mic Duration | Emergency Open Mic Duration (sec) |
| Emergency Mic Gain | Emergency Mic Gain (dB) |
| Emergency Remote Monitor | Emergency Remote Monitor |
| Emergency Remote Monitor Time | Emergency Remote Monitor Time (sec) |
| Emergency Revert | Emergency Revert Personality |
| Emergency Sticky Revert | Emergency Sticky Revert |
| Emergency PTT ID | Emergency PTT ID Enable |
| Emergency LED | Emergency LED |
| Emergency Siren | Emergency Siren On/Off |

### Source Code Path

Build path found in PDB reference at offset 0x44A033:
`D:\tpdh36_static_view\static_view2\Waris_CPS1\Code\Release\ProRadio.pdb`

---

## Pack/Unpack Transform Functions (Rud41.dll / Rcg41.dll / ProRadio.exe)

The CPS uses a three-layer architecture for converting between GUI field values and binary codeplug data:

1. **ProRadio.exe** — Contains 90+ application-specific pack/unpack transform functions
2. **udc41.dll** (CudcDbCgXchg) — Orchestrates the registration of transforms and block packing/unpacking
3. **Rcg41.dll** (Ccg framework) — Core bit-level extraction/insertion engine

### DLL Roles

| Binary | Size | Role | Key Classes |
|--------|------|------|-------------|
| ProRadio.exe | 4,497,496 B | App-specific transforms, frequency tables, enum maps | N/A (global functions) |
| udc41.dll | 196,608 B | Pack/unpack orchestration, DB-to-codeplug bridge | CudcDbCgXchg, CudcCgToDb, CudcDbToCg, CudcRdkDbToImage |
| Rcg41.dll | 131,072 B | Core codeplug framework, bit extraction, block parsing | CcgRdkUp, CcgRdkPkCp, CcgNumField, CcgFieldLayout |
| Rud41.dll | 536,576 B | UI framework (tree views, property sheets, drag-drop) | CudTreeVw, CudTblDlg, CudPage |

### Transform Registration Pattern

Transforms are registered via `CudcDbCgXchg::Add()` during initialization:

```
CudcDbCgXchg::Add(
    slot_id,            // Amulet slot ID for the GUI field
    block_id,           // Ccg block ID (16-bit)
    pack_func_ptr,      // Function pointer: DB value -> codeplug binary
    unpack_func_ptr,    // Function pointer: codeplug binary -> DB value
    pack_name_str,      // Debug name (e.g., "PackFrequencyWith5KHzStep")
    unpack_name_str,    // Debug name (e.g., "UnpackFrequencyWith5KHzStep")
    flags               // Options
)
```

Two exchange types:
- `cgDbXchgStraight` — Direct value transfer (IsTransform() returns 0)
- `cgDbXchgTransform` — Uses pack/unpack function pointers (IsTransform() returns 1)

### Bit-Level Field Extraction (Rcg41.dll)

The core bit extraction function at Rcg41.dll+0x64E0:

```c
// Extract N bits starting at MSB position from a byte
uint32_t extract_bits(uint8_t byte_value, uint8_t msb_start, uint8_t num_bits) {
    return (byte_value >> (msb_start - num_bits + 1)) & ((1 << num_bits) - 1);
}
```

Multi-byte extraction (Rcg41.dll `GetBytes`): reads bytes MSB-first, concatenates, and extracts the requested bit range. Maximum 32 bits per field.

### Config Info Byte (First Byte of Codeplug)

```
Byte 0 of codeplug image (from CcgCpConfigInfo::InitFromFirstByte):
  Bit 0: configInfoLength (0 = 2-byte config info, 1 = 4-byte config info)
  Bit 1: isFixedVectorBlk (inverted: 0 = fixed, 1 = variable)
  Bit 2: isImageRWCs (per-entry RW checksums)
  Bits 4-7: cpStdVersion layout version index (extracted as MSB=7, length=4)
```

The vector size (2 or 4 bytes) determines how block addresses are stored in the Vector Block.

---

### Complete Pack/Unpack Function Catalog

#### Frequency Transforms

| Pack Function | Unpack Function | Address (Pack) | Address (Unpack) | Description |
|---|---|---|---|---|
| PackFrequencyWith5KHzStep | UnpackFrequencyWith5KHzStep | 0x492430 | 0x4925F0 | Main channel frequency with 5 kHz step |
| packCnvFreq | unpackCnvFreq | 0x468B40 | 0x468DC0 | Conventional personality frequency |
| PackBaseFreq | UnpackBaseFreq | 0x61BDE0 | 0x61BD20 | LVRIS base frequency |
| PackBandFreq | UnpackBandFreq | 0x61C090 | 0x61BE90 | Band frequency offset |
| PackFreqB | (shared unpack) | 0x5C6140 | 0x680EF0 | Frequency variant B |
| PackToneFreq | (shared unpack) | 0x5D7490 | 0x680EF0 | CTCSS/tone frequency |
| packLtrFreq | unpackLtrRxFreq | 0x4EA9A0 | 0x4EAEA0 | LTR (trunking) frequency |
| — | unpackLtrTxFreq | — | 0x4EAEA0+offset | LTR TX frequency |

#### Squelch/Signaling Transforms

| Pack Function | Unpack Function | Address (Pack) | Description |
|---|---|---|---|
| packSqCode | (paired) | 0x469310 | PL/DPL squelch code (CTCSS/DCS) |
| packDplInvert | (paired) | 0x468A20 | DPL code inversion flag |
| PackSigType | UnpackSigType | 0x425D20 / 0x425E30 | Signaling type enum |
| PackToneTag | UnpackToneTag | 0x683260 / 0x6831B0 | Tone tag identifier |
| PackMdcCallId | UnpackMdcCallId | 0x509450 / 0x509370 | MDC1200 call ID |
| PackAckDigit | UnpackAckDigit | — | MDC acknowledgment digit |
| PackAckType | UnpackAckType | — | MDC acknowledgment type |
| packDtmfPrimaryID | unpackDtmfPrimaryID | — | DTMF primary ID packing |
| packDtmfTxTone | unpackDtmfTxTone | — | DTMF TX tone enable |
| packDtmfResetDur | unpackDtmfResetDur | — | DTMF reset duration |

#### Power/Channel Transforms

| Pack Function | Unpack Function | Address (Pack) | Description |
|---|---|---|---|
| packPowerLevel | (paired) | 0x469C00 | TX power level (Low/High/Auto) |
| packChanBwSel | unpackChanBwSel | — | Channel bandwidth selection |
| packChanPerType | unpackChanPerType | — | Channel personality type |
| packTalkaroundEn | — | — | Talkaround enable flag |
| packTalkaroundState | — | — | Talkaround state |
| packTxInhOnBusy | — | — | TX inhibit on busy |
| packVolOffset | unpackVolOffset | — | Volume offset |

#### Button/UI Transforms

| Pack Function | Unpack Function | Description |
|---|---|---|
| PackFctButton | — | Function button assignment |
| packButtons | unpackFrontBtn{1-3}{Short,Long}Buttons | Front button short/long press |
| packLSP{1-4}FctButton | — | Side button function assignment (4 slots) |
| packRotaryBtn | unpackRotaryBtn | Rotary knob function |
| packPinFunc | UnpackPinFunc | Accessory pin function |
| packKeypadCfg | unpackKeypadCfg | Keypad configuration |
| packMobileKeypadCfg | unpackMobileKeypadCfg | Mobile keypad configuration |

#### LTR Trunking Transforms

| Pack Function | Unpack Function | Description |
|---|---|---|
| packLtrFreq | unpackLtrRxFreq / unpackLtrTxFreq | LTR Rx/Tx frequency |
| packLtrButtons | unpackLtr{Front,Side,Top}Btn{1-3}{Short,Long}Buttons | LTR button assignments |
| packLtrHomeRptr | unpackLtrHomeRptr | LTR home repeater |
| packLtrPerOptionBoardCfgIndex | unpackOptionBoardCfgIndex | LTR option board config |

#### Generic Arithmetic Transforms

| Pack Function | Unpack Function | Description |
|---|---|---|
| packIntDivideByInt | unpackIntMultiplyByInt | Integer divide/multiply pair |
| PackDoubleMultiple | UnpackIntDividedByNumIntoDouble | Double multiply/divide pair |
| PackDoubleMultipliedByNumIntoInt | unpackDivideByStepIntoDouble | Step-based conversion |
| PackNumericDivide | UnpackNumericDivide | Numeric division |
| PackNumericMultiple | UnpackNumericMultiple | Numeric multiplication |
| PackNumericMinus | UnpackNumericPlus | Numeric subtract/add pair |
| — | UnpackNumericPlus1Multiple | Plus-one then multiply |
| PackNumericDivideMinus1 | — | Divide then subtract 1 |

#### Index/Lookup Transforms

| Pack Function | Unpack Function | Description |
|---|---|---|
| PackListToIndex | UnpackIntInc | List selection to codeplug index |
| packListIndex | unpackListIndex1ForZero | List index with zero mapping |
| packListIndexOr255ForDisabled | unpackListIndexOrDisabledFor255 | 0xFF = disabled sentinel |
| packList_Index1ForCP255 | unpackList_Index1ForCP255 | Special CP 255 mapping |
| packIndexMinusOne | unpackIndexMinusOne | Index offset by -1 |
| packIndexPlusOne | — | Index offset by +1 |
| packRecCgValFromIndex | unpackRecCgValToIndex | Record codeplug value lookup |
| packNRecCgValFromIndex | unpackNRecCgValToIndex | N-record lookup |
| packRecCgValFromZoneIndex | — | Zone index lookup |
| packChildRecCgValFromIndex | — | Child record lookup |
| packChildRecIntMinusOneToCgVal | — | Child record with offset |

#### Boolean/Enum Transforms

| Pack Function | Unpack Function | Description |
|---|---|---|
| PackOppositeOfUI | UnpackOppositeOfCp | Boolean inversion (UI vs CP polarity) |
| PackZeroForBoolIfNonapplicable | UnpackBool | Bool with N/A handling |
| PackZeroForListInfoIfNonapplicable | — | List with N/A handling |
| packZeroForNonApplBool | unpackToBool | Non-applicable bool |
| packArtsEnable | — | ARTS feature enable |
| packDisableAlerts | unpackDisableAlerts | Disable alerts flag |

#### Custom Range Transforms

| Pack Function | Unpack Function | Description |
|---|---|---|
| PackStrFor255CustomRange | UnpackInfiniteFor255CustomRange | 255 = infinite sentinel |
| PackStrForZeroCustomRange | UnpackDisabledForZeroCustomRange | 0 = disabled sentinel |
| PackAuxCtrlMomDurCustomRange | UnpackAuxCtrlMomDurCustomRange | Aux control momentary duration |
| PackDosAutoMuteDurCustomRange | UnpackDosAutoMuteDurCustomRange | DOS auto-mute duration |
| PackEmerOpenMicDurCustomRange | UnpackEmerOpenMicDurCustomRange | Emergency open mic duration |
| PackEmerTxCycDelCustomRange | UnpackEmerTxCycDelCustomRange | Emergency TX cycle delay |

#### Date/Time Transforms

| Pack Function | Description |
|---|---|
| PackDateDay | Day of month packing |
| PackDateMonth | Month packing |
| PackDateYear | Year packing |
| PackTimeHour | Hour packing |
| PackTimeMinute | Minute packing |

#### Miscellaneous Transforms

| Pack Function | Unpack Function | Description |
|---|---|---|
| PackVariableID | UnpackVariableID | Variable ID field |
| PackRegionalId | UnpackRegionalId | Regional identification |
| PackRefToCnvPer | UnpackRefToCnvPer | Reference to conventional personality |
| packExpansionType | unpackExpansionType | Expansion module type |
| packOpnBoardType | unpackOpnBoardType | Option board type |
| packCnvPerOptionBoardCfgIndex | unpackOptionBoardCfgIndex | Option board config index |
| packExtAlarmCfg | UnpackExtAlarmCfg | External alarm configuration |
| packDialTypeField | — | Dial type field |
| packRecHssSys | unpackRecHssSys | HSS (high-speed signaling) system |
| packRevBurstToc | unpackRevBurstToc | Reverse burst TOC |
| packRxLowBattAlert | unpackRxLowBattAlert | Low battery alert |
| packUnmuteMuteType | unpackUnmuteMuteType | Mute/unmute type |
| — | unpackCpNumberPlusOneAndStoreValue | CP number + 1 |

---

### Decompiled Transform Formulas

#### Frequency Encoding (5 kHz Step)

**UnpackFrequencyWith5KHzStep** (ProRadio.exe @ 0x4925F0):
```c
// LVRIS_base is a global variable set per band type (at 0x7D97B8)
// cp_value = numeric value from codeplug field
// Divisor constant at 0x6BDBF8 = 200.0

double freq_MHz = (double)(LVRIS_base * 5 + cp_value) / 200.0;
```

**PackFrequencyWith5KHzStep** (ProRadio.exe @ 0x492430):
```c
// Reverse of unpack
int cp_value = (int)(freq_MHz * 200.0) - LVRIS_base * 5;
```

The LVRIS (Low-VHF Reference Index System) base value is band-dependent and loaded at runtime based on the radio's band selection. The base represents a frequency offset in 5 kHz units.

**Frequency step sizes** (from unpackCnvFreq step table at ProRadio.exe):

| Index | Step Size (MHz) | Step Size (kHz) |
|-------|----------------|-----------------|
| 0 | 0.0025 | 2.5 |
| 1 | 0.003125 | 3.125 |
| 2 | 0.005 | 5.0 |
| 3 | 0.00625 | 6.25 |

#### Base Frequency Encoding

**UnpackBaseFreq** (ProRadio.exe @ 0x61BD20):
```c
// Constant at 0x6BCA60 = 0.025 (MHz per step)
double base_freq_MHz = codeplug_value * 0.025;
```

**PackBaseFreq** (ProRadio.exe @ 0x61BDE0):
```c
int codeplug_value = (int)(freq_MHz / 0.025);
// i.e., codeplug stores frequency in 25 kHz units
```

#### Conventional Frequency Encoding

**unpackCnvFreq** (ProRadio.exe @ 0x468DC0):
```c
// Reads two field values and a step size index
int field1 = GetNumFieldValue(entry, field_layout_1);  // main frequency offset
int field2 = GetNumFieldValue(entry, field_layout_2);  // fine offset
int step_idx = GetNumFieldValue(radio_info_block, 0x23B2);  // step size index

// step_table = {0.0025, 0.003125, 0.005, 0.00625}  (MHz)
// Constant at 0x6BCA60 = 0.025

double freq = fStack * step_table[field1 * 8 + 4] + field2 * 0.025;
```

#### Squelch Code (CTCSS/DCS) Encoding

**packSqCode** (ProRadio.exe @ 0x469310):

The squelch code packing handles three types:
1. **Type 1**: No squelch (code = 0x38B value)
2. **Type 2**: CTCSS tone — `cp_value = tone_frequency * 10.0` (constant at 0x6BCA68 = 10.0)
3. **Type 3**: DCS code — iterates through DCS code list, converts via `atoi()`, multiplies by `8.0` (0x40200000)

Error string: "Error packing Conv Pers Squelch Code. Aborting pack."

#### Power Level Encoding

**packPowerLevel** (ProRadio.exe @ 0x469C00):

String comparison against three values:
```c
if (strcmp(value, "Low") == 0)   return 0;
if (strcmp(value, "High") == 0)  return 1;
if (strcmp(value, "Auto") == 0)  return 2;
// else: "Invalid TX Power Level" error
```

Strings at: 0x74963C="Low", 0x749640="High", 0x749648="Auto"

#### Signaling Type Encoding

**PackSigType** (ProRadio.exe @ 0x425D20):

String comparison:
```c
if (strcmp(value, "MDC") == 0)          return 1;
if (strcmp(value, "Quik-Call II") == 0) return 2;
if (strcmp(value, "DTMF") == 0)         return 3;
// else: "Invalid Signaling Type in DB" error
```

Strings at: 0x737044="MDC", 0x737048="Quik-Call II", 0x737058="DTMF"

---

### Upload/Download Sequence (Codeplug Read)

The full unpack pipeline in Rcg41.dll:

```
CcgRdkUp::FullUnpack(byte_array, flags, size, import_map, ...)
  |
  +-> OnInitRdkUp(byte_array, flags, size)
  |     |
  |     +-> Create CcgRdkImage from raw bytes
  |     +-> Read Config Info byte (first byte)
  |     +-> Determine vector size (2 or 4 bytes)
  |     +-> UnpackTypeCtrlAndVectorBlocks()
  |           +-> Parse Type Control Block (bit array of present blocks)
  |           +-> Parse Vector Block (offsets to each data block)
  |
  +-> InitAppVersionInfo(flags, size)
  |     +-> Determine CcgCpLayout based on model/version
  |     +-> Virtual call to app: AppCreateCpLayoutForUUID()
  |
  +-> ImageToDbTransfer(layout, flags, import_map)
        |
        +-> Log "UNPACKING" or "IMPORTING"
        +-> GetNumberOfNonNullVectors()
        +-> For each block in layout:
        |     +-> Check TypeControlBlock if block is present
        |     +-> Get block address from VectorBlock
        |     +-> Create CcgUpOneDimBlock or CcgUpTwoDimBlock
        |     +-> For each entry in block:
        |           +-> For each field in entry layout:
        |                 +-> CcgNumField / CcgCharField / CcgStrField
        |                 +-> GetFieldStartByte(offset, entry_num, layout)
        |                 +-> GetFieldStartMsb(msb, offset, layout)
        |                 +-> GetBytes(start_byte, msb, num_bits, &value)
        |                 +-> Apply unpack transform function
        |                 +-> Store in Amulet Am_Object database
        |
        +-> DoSecondPassOfUnpack(model, version)
              +-> Handle cross-block dependencies
              +-> Validate constraints
```

### Codeplug Write (Pack) Sequence

```
CudcRdkDbToImage::DbToFile(layout, size, filename, filetype, ...)
  |
  +-> DbToPackCpDb(layout, benchmark, export_map)
  |     |
  |     +-> Log "PACKING"
  |     +-> For each block in layout:
  |           +-> CudcRdkDoc::CgDbXchg(block_id, layout, PACK, ...)
  |           +-> CudcDbToCg::CreateBlockForDbObject(...)
  |                 +-> CreateOneDimBlock() or CreateTwoDimBlock()
  |                 +-> For each record in DB:
  |                       +-> CreatePkEntry(db_object, ...)
  |                       +-> For each field:
  |                             +-> CreatePackField(am_value, field_id)
  |                             +-> Apply pack transform function
  |                             +-> CcgPkField stores packed value
  |           +-> AddToPackCpDb(block_id, packed_block)
  |
  +-> PackCpDbToArr(byte_array, layout, size, ...)
        +-> Write Config Info byte
        +-> Build Type Control Block
        +-> Build Vector Block with block offsets
        +-> Serialize all packed blocks to byte array
        +-> Compute checksums (per-entry or per-block)
```

### Codeplug Version Handling

Version management uses virtual methods on CudcRdkDoc:

| Method | Address (udc41.dll) | Purpose |
|--------|---------------------|---------|
| AppVersionIndexToVersionStr | 0x1000E9E0 | Convert version index (char) to string |
| AppVersionStrToVersionIndex | 0x10004250 | Convert version string to index (char) |
| AppFilterIndexToVersionIndex | 0x1000E200 | Map filter index to version index |
| GetVersionModelFromUser | 0x1000EAE0 | Interactive version/model selection |
| GetSaveAsVersionIndex | 0x1000BDD0 | Get version for save operation |
| GetSaveAsModelIndex | 0x1000BDE0 | Get model for save operation |

Version indices are stored as `char` values (0-11, corresponding to versions 0.00 through 11.00).

The `AppCreateCpLayoutForUUID()` virtual method creates the appropriate `CcgCpLayout` object containing all block definitions, field layouts, and pack/unpack option flags for a specific radio model and codeplug version combination.

### Key Global Variables (ProRadio.exe)

| Address | Type | Name | Description |
|---------|------|------|-------------|
| 0x7D97B8 | int | LVRIS_base | Current band's LVRIS base value (set at runtime) |
| 0x7DAE28 | rdkIndexToValue | frequency_IndexToVal | Frequency index-to-value converter object |
| 0x7DAEC0 | rdkIsValueInRange | frequency_IsValInRange | Frequency range validator object |
| 0x6BDBF8 | double | — | Constant 200.0 (frequency divisor for 5 kHz step) |
| 0x6BCA60 | double | — | Constant 0.025 (MHz per base frequency unit) |
| 0x6BCA68 | double | — | Constant 10.0 (CTCSS tone frequency multiplier) |
