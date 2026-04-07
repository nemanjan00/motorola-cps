# Motorola Professional Radio CPS (Waris) - Serial Protocol Documentation

> Reverse engineered from CPS R06.12.05 communication DLLs.
> Covers radios: GP320, GP330, GP340, GP344, GP360, GP366, GP380, GP388, GM340, GM360, GM380.
> These are "Waris" platform radios (portables = GP3xx, mobiles = GM3xx).

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Protocol Stack](#2-protocol-stack)
3. [SBEP Protocol (Primary for Waris)](#3-sbep-protocol)
4. [ESBEP Protocol (Shared with Commercial Series)](#4-esbep-protocol)
5. [SB9600 Protocol (Legacy)](#5-sb9600-protocol)
6. [Commpatch.dll - Wire-Level Implementation](#6-commpatchdll---wire-level-implementation)
7. [Radio Abstraction Layer (mcom DLLs)](#7-radio-abstraction-layer)
8. [Protocol Negotiation and Identification](#8-protocol-negotiation-and-identification)
9. [Codeplug Read/Write Sequence](#9-codeplug-readwrite-sequence)
10. [Cross-Reference with Commercial Series](#10-cross-reference-with-commercial-series)

---

## 1. Architecture Overview

### Software Stack (Waris CPS R06.12.05)

```
+----------------------------------------------------------+
|  ProRadio.exe - C++/MFC GUI (CWarisDoc, CWarisView)     |
+----------------------------------------------------------+
         |
+----------------------------------------------------------+
|  ADK 5.1 SP1 Framework DLLs (*41.dll series)            |
|  Rcg41.dll (Codeplug Generator)                          |
|  Rdb41.dll (Radio Database / Amulet)                     |
|  Rud41.dll (Radio Upload/Download)                       |
|  Rui41.dll (Radio UI)                                    |
|  UdcDr41.dll (UI-DB-CG exchange)                         |
|  Fh41.dll (File Handler, CFhEncrypt)                     |
+----------------------------------------------------------+
         |
+----------------------------------------------------------+
|  mcomProRad.dll  (Radio.Motorola.Waris)      - Portable  |
|  mcomProRadMob.dll (Radio.Motorola.WarisMobile) - Mobile |
|  mcomUnknown.dll (Radio.Motorola.Unknown) - Fallback     |
+----------------------------------------------------------+
         |  (COM: uses CoGetClassObject to load protocol DLL)
+----------------------------------------------------------+
|  VComSbep.dll  (Protocol.Motorola.Sbep)    - PRIMARY     |
|  VComESbp.dll  (Protocol.Motorola.ESbep)   - Commercial  |
|  VcomSb96.dll  (Protocol.Motorola.Sb9600)  - Legacy      |
+----------------------------------------------------------+
         |  (DeviceIoControl to kernel driver)
+----------------------------------------------------------+
|  \\.\Commsbep  (Win9x: \\.\Vcomsbep.vxd)                |
|  \\.\Commsb96  (Win9x: \\.\Vcomsb96.vxd)                |
|  commsbepx64_setup.exe (64-bit driver installer)         |
+----------------------------------------------------------+
         |
    [COM port] --> [RIB cable] --> [Radio]
```

### Key Observation: Driver-Mediated Architecture

Unlike the Commercial Series CPS (which calls `SetCommState`/`ReadFile`/`WriteFile`
directly), the Waris CPS uses a **kernel-mode driver** (`Commsbep` / `Commsb96`)
accessed via `DeviceIoControl`. The VCom DLLs are thin COM wrappers that translate
high-level opcode maps into IOCTL calls to the driver.

The **actual serial framing** is implemented in **`Commpatch.dll`**, which is an
MFC DLL containing `CSbepBroker`, `CSbepComm`, `CSbepMessage`, `CWinSerial`, and
`CCodeplug` classes. This DLL directly calls `SetCommState`, `ReadFile`, `WriteFile`,
`PurgeComm`, and `TransmitCommChar`.

---

## 2. Protocol Stack

Three protocols are supported. The Waris CPS selects protocol based on radio model:

| Protocol | DLL | Device Driver | Used By |
|----------|-----|---------------|---------|
| **SBEP** | VComSbep.dll | `\\.\Commsbep` | GP3xx/GM3xx (Waris) - **primary** |
| **ESBEP** | VComESbp.dll | `\\.\Commsbep` | CM1xx/CM3xx/CP0xx (Commercial) |
| **SB9600** | VcomSb96.dll | `\\.\Commsb96` | Legacy radios |

The `mcomUnknown.dll` fallback handler references `Sb9600WithSbep`, suggesting some
radios negotiate between SB9600 and SBEP.

---

## 3. SBEP Protocol

**Source**: VComSbep.dll (R05.01.00, ADK 5.1 SP1) + Commpatch.dll

SBEP = Serial Bus Extension Protocol. This is the primary protocol for Waris radios.

### 3.1 Physical Layer

- RS-232, **9600 baud**, 8 data bits, no parity, 1 stop bit (8N1)
- No hardware flow control
- **Echo mode**: Radio echoes each byte sent by the host before responding
  (`CWinSerial::Write: Echo byte %d does not match transmitted character`)

### 3.2 Frame Format

Two frame formats exist, selected by payload length:

#### Short Frame (payload <= 14 bytes)

```
+--------+--------+------------------+----------+
| Header | Opcode | Data (0-13 B)    | Checksum |
| 1 byte | 1 byte | N bytes          | 1 byte   |
+--------+--------+------------------+----------+

Header byte: 0xF0 | N
  - Low nibble (bits 3-0): N = 1 (opcode) + data_byte_count (range 1..14)
  - High nibble (bits 7-4): always 0xF
  - When low nibble == 0x0F, this is a long frame (see below)

Total frame size: N + 2 bytes (header + N payload bytes + checksum)
Max data bytes: 13 (header = 0xFE = 0xF0 | 14, meaning opcode + 13 data)
```

#### Long Frame (data > 13 bytes)

```
+--------+--------+----------+---------+-----------+----------+
| Header | Opcode | Len High | Len Low | Data      | Checksum |
| 0xFF   | 1 byte | 1 byte   | 1 byte  | M bytes   | 1 byte   |
+--------+--------+----------+---------+-----------+----------+

Header byte: always 0xFF (detected by low nibble == 0x0F)
Opcode: command/response byte (IMMEDIATELY after header)
Len High: upper 8 bits of (data_byte_count + 1)
Len Low:  lower 8 bits of (data_byte_count + 1)

Total frame size: (len_field_value) + 4 bytes
                = data_byte_count + 5 bytes
```

**Key difference from some documentation**: In the long frame, the opcode byte
appears BEFORE the 16-bit length field, not after. The length field encodes
`data_byte_count + 1` (NOT including the opcode). To parse:
`data_byte_count = (len_high << 8 | len_low) - 1`.

#### Checksum Algorithm

```c
uint8_t sbep_checksum(uint8_t *frame, uint16_t frame_len) {
    // Sum all bytes EXCEPT the last (checksum) byte
    uint8_t sum = 0;
    for (int i = 0; i < frame_len - 1; i++) {
        sum += frame[i];
    }
    return 0xFF - sum;
}
```

This is identical to the ESBEP checksum: `0xFF minus the sum of all preceding bytes`.
The checksum is stored as the **last byte** of the frame, AND also stored separately
in the message structure at a fixed position (byte offset +9 in the CSbepMessage object).

#### Frame Detection and Validation (from `ValidateMessage` at 0x10006950)

```c
uint16_t sbep_frame_length(uint8_t *frame) {
    if ((frame[0] & 0x0F) != 0x0F) {
        // Short frame: low nibble = payload byte count
        return (frame[0] & 0x0F) + 2;  // + header + checksum
    } else {
        // Long frame: length at byte[2]:byte[3] (after opcode at byte[1])
        return ((frame[2] << 8) | frame[3]) + 4;  // + header + opcode + len_field + checksum
    }
}

bool validate_sbep_message(uint8_t *frame) {
    uint16_t frame_len = sbep_frame_length(frame);
    uint8_t computed = sbep_checksum(frame, frame_len);
    return (frame[frame_len - 1] == computed);
}
```

### 3.3 SBEP Opcodes

The first byte of the payload is the opcode.

#### Request Opcodes (Host -> Radio)

| Opcode | Name | Description |
|--------|------|-------------|
| `0x10` | RESET | Reset radio to normal mode |
| `0x11` | REQ_RD_DATA | Read data from EEPROM |
| `0x12` | REQ_CHECKSUM | Request codeplug checksum |
| `0x13` | REQ_CONFIG | Request configuration / max transfer size |
| `0x14` | REQ_STATUS | Request radio status |
| `0x15` | REQ_ERASE_FLASH | Erase flash memory region |
| `0x16` | REQ_ZERO_FLASH | Zero flash memory region |
| `0x17` | REQ_WR_DATA | Write data to EEPROM |

#### Response Opcodes (Radio -> Host)

| Opcode | Name | Description |
|--------|------|-------------|
| `0x50` | ACK | Acknowledged (see note) |
| `0x60` | NAK | Negative acknowledge |
| `0x80` | RPY_RD_DATA | Read data response (contains requested bytes) |
| `0x81` | RPY_CHECKSUM | Checksum response |
| `0x82` | RPY_CONFIG | Configuration response (max transfer size) |
| `0x83` | RPY_STATUS | Status response |
| `0x84` | RPY_GOOD_WR | Write succeeded |
| `0x85` | RPY_BAD_WR | Write failed |
| `0x86` | RPY_UNSUPPORTED | Command not supported by this radio |

**Note on ACK/NAK**: The NAK byte `0x60` is checked explicitly in the ACK handler
at `0x10006548`. When received, the error "Receive Negative Ack from external device"
is raised. The ACK mechanism appears to use the response opcode itself (0x80-0x86)
as the acknowledgement, rather than a separate ACK byte.

### 3.4 Request Flags

Each opcode is registered with a flags field:

| Flags Value | Meaning |
|-------------|---------|
| `0x00040400` | Command type 0 (reset/control, no response data expected) |
| `0x01040400` | Command type 1 (data transfer, response data expected) |

RESET uses type 0; all other commands use type 1.

### 3.5 SBEP Read Data Request

```
Short frame example (read request):
  [0xF0|len] [0x11] [addr_high] [addr_low] [length] [checksum]

Payload:
  byte 0: 0x11 (REQ_RD_DATA)
  byte 1-2: 16-bit address (big-endian)
  byte 3: number of bytes to read

Response (RPY_RD_DATA = 0x80):
  [0xF0|len or 0xFF hh ll] [0x80] [data...] [checksum]
```

### 3.6 SBEP Write Data Request

```
Payload:
  byte 0: 0x17 (REQ_WR_DATA)
  byte 1-2: 16-bit address (big-endian)
  byte 3+: data bytes to write

Response: RPY_GOOD_WR (0x84) or RPY_BAD_WR (0x85)
```

### 3.7 Special Message Types

Two special message constructors were identified:

**Reset message** (at `0x10006900`):
```
  Header: 0xF1 (short frame, payload_len = 1)
  Payload: [opcode]
  Checksum: computed
  Total: 3 bytes
```

**Query message with sub-command** (at `0x100068B0`):
```
  Header: 0xF2 (short frame, payload_len = 2)
  Payload: [opcode] [sub_command]
  Checksum: computed
  Total: 4 bytes
```

---

## 4. ESBEP Protocol

**Source**: VComESbp.dll (R05.00.00, ADK 5)

ESBEP = Extended Serial Bus Extension Protocol. Used by Commercial Series radios.
This is a **superset** of SBEP with additional query sub-commands and tuning opcodes.

### 4.1 Frame Format

**Identical to SBEP** (section 3.2). Same short/long frame formats, same checksum.

### 4.2 ESBEP Opcodes

#### Request Opcodes (Host -> Radio)

| Opcode | Sub | Name | Description |
|--------|-----|------|-------------|
| `0x11` | - | REQ_RD_DATA | Read data from EEPROM |
| `0x12` | - | REQ_CHECKSUM | Request codeplug checksum |
| `0x13` | - | REQ_CONFIG | Request configuration |
| `0x14` | - | REQ_STATUS | Request status |
| `0x15` | - | REQ_ERASE_FLASH | Erase flash memory |
| `0x16` | - | REQ_ZERO_FLASH | Zero flash memory |
| `0x17` | - | REQ_WR_DATA | Write data to EEPROM |
| `0x18` | - | REQ_WR_SERNUM | Write serial number |
| `0x19` | - | REQ_RADIO_KEY | Request radio key |
| `0x1B` | - | REQ_TUNE_PARAMS | Request tuning parameters |
| `0x1C` | - | REQ_BUTTON_TST | Button test mode |
| `0x1F` | - | REQ_AUTOTUNE | Auto-tune radio |
| `0x20` | - | REQ_SOFTPOT | Software potentiometer |
| `0x21` | - | REQ_CHANNEL | Set channel frequency |
| `0x22` | - | REQ_TESTMODE | Enter test mode |
| `0x23` | - | REQ_RADSTAT | Request radio status (no sub-command) |
| `0x24` | - | REQ_KEYPAD | Keypad input |
| `0x25` | - | REQ_FRAC_N_FREQ | Fractional-N frequency control |
| `0x26` | - | REQ_INVOKE | Invoke function |
| `0x27` | - | REQ_CHAN_STEER | Channel steering |

#### Query Sub-Commands (opcode 0x23 with sub-command byte)

| Sub-Cmd | Name | Description |
|---------|------|-------------|
| `0x00` | REQ_MODEL_NO | Query model number |
| `0x01` | REQ_SERIAL_NO | Query serial number |
| `0x02` | REQ_ESERIAL_NO | Query electronic serial number (ESN) |
| `0x03` | REQ_SW_VER | Query firmware version |
| `0x04` | REQ_CP_VER | Query codeplug version |
| `0x05` | REQ_POWUP_STAT | Query power-up status |
| `0x06` | REQ_SIG_DET | Query signal detect |
| `0x07` | REQ_CP_SIZE | Query codeplug size |
| `0x08` | REQ_PWD_CHK | Password check |
| `0x09` | REQ_LOW_BAT_CHK | Battery voltage check |
| `0x0A` | REQ_LAST_PROG | Query last programmed date |
| `0x0B` | REQ_CP_PART_NO | Query codeplug part number |
| `0x0C` | REQ_FW_PART_NO | Query firmware part number |
| `0x0D` | REQ_TEST_ENV | Query test environment |
| `0x0E` | REQ_IC_VER | Query IC version |
| `0x0F` | REQ_UUID | Query UUID |

#### Response Opcodes (Radio -> Host)

| Opcode | Name | Description |
|--------|------|-------------|
| `0x80` | RPY_RD_DATA | Read data response |
| `0x81` | RPY_CHECKSUM | Checksum response |
| `0x82` | RPY_CONFIG | Configuration response |
| `0x83` | RPY_STATUS | Status response |
| `0x84` | RPY_GOOD_WR | Write succeeded |
| `0x85` | RPY_BAD_WR | Write failed |
| `0x86` | RPY_UNSUPPORTED | Unsupported command |
| `0x87` | RPY_WR_SERNUM | Serial number write response |
| `0x8A` | RPY_SOFTPOT | Softpot response |
| `0x8B` | RPY_RADSTAT | Radio status response |
| `0x8C` | RPY_OP_COMPLETE | Operation complete |
| `0x8D` | RPY_TUNE_PARAMS | Tuning parameters response |
| `0x8E` | RPY_BUTTON_TST | Button test response |

### 4.3 ESBEP vs SBEP Comparison

| Feature | SBEP | ESBEP |
|---------|------|-------|
| Frame format | Same | Same |
| Checksum | Same (0xFF - sum) | Same (0xFF - sum) |
| Echo mode | Yes | Yes |
| Core opcodes (0x10-0x17) | Yes | Yes |
| Query sub-commands (0x23) | No | Yes (16 sub-commands) |
| Tuning opcodes (0x1B-0x27) | No | Yes |
| Serial number write (0x18) | No | Yes |
| Response 0x87-0x8E | No | Yes |
| Max response opcodes | 0x86 | 0x8E |

**The core read/write/erase protocol is identical.** ESBEP extends SBEP with
query, tuning, and diagnostic commands used by the CPS for radio identification
and alignment.

---

## 5. SB9600 Protocol

**Source**: VcomSb96.dll (R05.01.00.00, ADK 5.1 SP1)

SB9600 is the oldest protocol in the family, derived from US Patent 5,551,068.

### 5.1 Physical Layer

- RS-232, **9600 baud** (hence the name)
- Device driver: `\\.\Commsb96` (Win9x: `\\.\Vcomsb96.vxd`)

### 5.2 SB9600 Opcodes

Only 5 opcodes are registered:

| Opcode | Name | Flags | Description |
|--------|------|-------|-------------|
| `0x06` | EPREQ | `0x00040400` | EEPROM request |
| `0x07` | MEMWRITE | `0x00040400` | Memory write |
| `0x08` | MEMACS | `0x00040400` | Memory access/acknowledge |
| `0x40` | TSTMOD | `0x00040400` | Test mode |
| `0x87` | MEMREAD | `0x00040401` | Memory read response |

SB9600 uses address-based routing (device addresses on the bus) and a different
framing structure than SBEP. The `0x87` (MEMREAD) has flags `0x00040401` indicating
it expects response data, while the others use `0x00040400` (no response data).

### 5.3 SB9600 vs SBEP

SB9600 is significantly simpler:
- No query sub-commands
- No flash erase/zero commands (EEPROM only)
- Memory operations: EPREQ, MEMREAD, MEMWRITE, MEMACS
- Test mode: TSTMOD
- Different framing (not the F0|len format)

---

## 6. Commpatch.dll - Wire-Level Implementation

**Source**: Commpatch.dll (MFC DLL, copyright 1997-2000)

This DLL contains the actual serial communication implementation.

### 6.1 Class Hierarchy

```
CSerial (abstract serial port)
  └── CWinSerial (Win32 serial port using CreateFile/ReadFile/WriteFile)

CSbepMessage (SBEP frame builder/parser)

CSbepComm (SBEP communication session)

CSbepBroker (high-level SBEP operations: read/write/erase/tune)

CCodeplug (codeplug buffer management, SRecord I/O)

CTimerCtrl (timeout management)
```

### 6.2 Serial Port Configuration

From `CWinSerial::OpenPort`:
1. `CreateFileA("COM%u", ...)` - Open serial port
2. `GetCommState(handle, &dcb)` - Get current settings
3. `SetCommState(handle, &dcb)` - Configure: 9600/8/N/1
4. `SetCommTimeouts(handle, &timeouts)` - Set read/write timeouts

Baud rate: **9600** (constant `0x2580` pushed at offset `0x00614e`)

`CWinSerial::SetBaud` allows runtime baud rate changes via `SetCommState`.

### 6.3 Echo Mode

The radio echoes every byte the host sends. The CPS verifies each echo:

```
CWinSerial::Write flow:
  for each byte in frame:
    WriteFile(port, &byte, 1, ...)
    ReadFile(port, &echo, 1, ...)   // read echo back
    if (echo != byte):
      throw "Echo byte %d does not match transmitted character"
```

### 6.4 Retry Mechanism

The send/receive function (`CSbepComm::SendAndReceive` at `0x100061e0`) implements retries:
- Configurable retry count stored at object offset `+0x438`
- On failure, retries the entire send-receive cycle
- Between retries, calls `Sleep(1000)` (1 second delay)
- Error handling uses structured exception handling (SEH)

### 6.5 Response Validation

Expected response opcodes for different operations:

| Operation | Expected Response | Error if different |
|-----------|------------------|--------------------|
| Read data | `0x80` (RPY_RD_DATA) | "Did not received Read Data Reply" |
| Write data | `0x84` (RPY_GOOD_WR) | "Did not received Good Write Reply" |
| Erase flash | `0x84` (RPY_GOOD_WR) | "Did not received Good Write Reply for Erase Flash" |
| Serial num write | `0x87` (RPY_WR_SERNUM) | "Did not receive good Update Serial Number reply" |
| Radio status | `0x8B` (RPY_RADSTAT) | "Did not receive good Radio Status reply" |
| Test mode | `0x8C` (RPY_OP_COMPLETE) | "Did not receive Operation Complete reply for Testmode" |
| Softpot | `0x8A` (RPY_SOFTPOT) | "Did not receive correct Radio Softpot reply" |
| Softpot confirm | `0x8C` (RPY_OP_COMPLETE) | "Did not receive Operation Complete reply for Softpot" |
| Tune params | `0x8D` (RPY_TUNE_PARAMS) | "Did not receive Tuning Parameter reply" |
| Channel freq | `0x8C` (RPY_OP_COMPLETE) | "Did not receive Operation Complete for Channel Freq" |

### 6.6 Error Handling

Serial port errors detected via `ClearCommError`:

| Error | Message |
|-------|---------|
| Break | "Break detected while accessing communication port" |
| Framing | "Framing error detected while accessing communication port" |
| Overrun | "Overrun detected while accessing communication port" |
| Parity | "Parity error detected while accessing communication port" |
| Buffer overflow (RX) | "Communication port input buffer overflow" |
| Buffer overflow (TX) | "Communication port output buffer overflow" |

---

## 7. Radio Abstraction Layer

### 7.1 mcomProRad.dll (Portable Radios)

- **COM ProgID**: `Radio.Motorola.Waris`
- **Description**: "Motorola ProRadio VirtualRadio"
- **Radios**: GP320, GP330, GP340, GP344, GP360, GP366, GP380, GP388

Opcodes used: REQ_RD_DATA, REQ_WR_DATA, REQ_MODEL_NO, REQ_SERIAL_NO,
REQ_TUNE_PARAMS, REQ_UUID, REQ_RADIO_KEY, RPY_RD_DATA, RPY_GOOD_WR, RPY_RADSTAT

### 7.2 mcomProRadMob.dll (Mobile Radios)

- **COM ProgID**: `Radio.Motorola.WarisMobile`
- **Description**: "Motorola Waris VirtualRadio"
- **Radios**: GM340, GM360, GM380

Uses the same opcodes as portable version.

### 7.3 mcomProRadNew.dll / mcomProRadMobnew.dll

Functionally identical to the non-"new" variants. Only difference: **COM CLSIDs**
(16 bytes at offset `0x0F8F8` / `0x0F1C0`). This allows both old and new COM
registrations to coexist. The "new" variants were likely introduced for
updated radio firmware that needed different COM registration.

### 7.4 mcomUnknown.dll (Fallback)

- **COM ProgID**: `Radio.Motorola.Unknown`
- **Description**: "Unknown Virtual Radio"
- References string `Sb9600WithSbep` - suggests protocol negotiation
- Only uses REQ_UUID and RPY_RADSTAT
- Likely used for initial radio detection before the correct mcom DLL is loaded

---

## 8. Protocol Negotiation and Identification

### 8.1 Startup Sequence (inferred)

1. CPS opens COM port via `CWinSerial::Open("COM%u")`
2. Configures 9600/8/N/1
3. Uses `mcomUnknown.dll` to attempt radio identification:
   - Sends SBEP query for UUID or model
   - If SB9600 radio, falls back via "Sb9600WithSbep" bridge
4. Based on model number response, loads appropriate mcom DLL
5. Portable models (GP3xx) -> `mcomProRad.dll` or `mcomProRadNew.dll`
6. Mobile models (GM3xx) -> `mcomProRadMob.dll` or `mcomProRadMobnew.dll`

### 8.2 Password Security

From error messages and code flow:
- REQ_PWD_CHK (ESBEP opcode 0x23, sub 0x08) sends password to radio
- CPS archive password stored in codeplug file
- "CPS password verification failed when write radio" (from Readme.txt)
- Password is checked **before** write operations, not reads
- Same weak security model as Commercial Series: password stored in codeplug,
  full codeplug can be read without authentication

---

## 9. Codeplug Read/Write Sequence

### 9.1 Read Codeplug

```
1. Query model number (REQ_MODEL_NO / 0x23 sub 0x00)
   -> Verify radio type matches CPS expectations
2. Query codeplug size (REQ_CP_SIZE / 0x23 sub 0x07)
   -> Determine total bytes to read
3. Query codeplug version (REQ_CP_VER / 0x23 sub 0x04)
   -> Verify compatibility
4. Loop: Read blocks
   REQ_RD_DATA (0x11) with address and length
   <- RPY_RD_DATA (0x80) with data bytes
   Increment address, repeat until complete
5. Verify checksum
   REQ_CHECKSUM (0x12)
   <- RPY_CHECKSUM (0x81)
   Compare with computed checksum
```

### 9.2 Write Codeplug

```
1. Verify password if required (REQ_PWD_CHK)
2. Erase flash (REQ_ERASE_FLASH / 0x15)
   <- RPY_GOOD_WR (0x84) confirmation
3. Loop: Write blocks
   REQ_WR_DATA (0x17) with address and data
   <- RPY_GOOD_WR (0x84) confirmation
   On failure: RPY_BAD_WR (0x85)
4. Verify checksum after write
   REQ_CHECKSUM (0x12)
   "Codeplug image has checksum error, program anyway?"
5. Reset radio (RESET / 0x10)
```

### 9.3 Block Size

- Default maximum transfer controlled by REQ_CONFIG (0x13)
- Response RPY_CONFIG (0x82) returns max block size
- Typical values: 32-64 bytes per transfer
- The `CSbepMessage` object has a `0x21C`-byte buffer (540 bytes), supporting
  the long frame format for larger transfers

---

## 10. Cross-Reference with Commercial Series

### 10.1 Protocol Compatibility Matrix

| Feature | Commercial (ESBEP) | Waris SBEP | Waris ESBEP |
|---------|-------------------|------------|-------------|
| Frame format | F0\|len + checksum | Same | Same |
| Checksum | 0xFF - sum | Same | Same |
| Read (0x11) | Yes | Yes | Yes |
| Write (0x17) | Yes | Yes | Yes |
| Erase (0x15) | Yes | Yes | Yes |
| Config (0x13) | Yes | Yes | Yes |
| Reset (0x10) | Yes | Yes | Yes |
| Query (0x23) | Yes (16 subs) | No | Yes (16 subs) |
| Tuning opcodes | Some | No | Yes (full set) |

### 10.2 VCom DLL IOCTL Map

The VCom DLLs communicate with the Commsbep driver via these IOCTLs:

| IOCTL Code | Function | Description |
|------------|----------|-------------|
| `0x00220007` | Func 0x001 | Write frame to driver |
| `0x0022000B` | Func 0x002 | Read frame from driver |
| `0x00220013` | Func 0x004 | Send opcode command |
| `0x00220017` | Func 0x005 | Write data transfer |
| `0x0022001B` | Func 0x006 | Check status |
| `0x0022001F` | Func 0x007 | Get response |
| `0x00220023` | Func 0x008 | Data transfer |
| `0x00220027` | Func 0x009 | Open connection |
| `0x0022002B` | Func 0x00A | Close/cleanup |
| `0x00220037` | Func 0x00D | Set configuration |

All IOCTLs use DeviceType=0x0022, Method=3 (METHOD_NEITHER), Access=0 (FILE_ANY_ACCESS).

### 10.3 Mutex

All protocol DLLs use the named mutex `McomProtocolMutex` to serialize access
to the COM port, preventing concurrent communication from multiple DLL instances.

---

## Appendix A: CSbepMessage Object Layout

From reverse engineering of Commpatch.dll:

| Offset | Size | Field | Description |
|--------|------|-------|-------------|
| +0x04 | 2 | header_size | Frame header size (2 for short, 4 for long) |
| +0x06 | 2 | frame_length | Total frame length including header + checksum |
| +0x08 | 1 | data_length | Data byte count (payload excluding opcode) |
| +0x09 | 1 | checksum | Computed checksum value |
| +0x0A | 1 | opcode | Command/response opcode byte |
| +0x0B | 540 | raw_frame | Raw frame buffer (header + opcode + data + checksum) |
| +0x0C | 1 | (raw byte 1) | For short: opcode; for long: opcode |
| +0x0D | 1 | (raw byte 2) | For short: data[0]; for long: len_hi |
| +0x0E | 1 | (raw byte 3) | For short: data[1]; for long: len_lo |
| +0x0F | ... | (raw byte 4) | For long: data[0] |
| +0x212 | 2 | transfer_count | Number of transfers for multi-block operations |
| +0x218 | 4 | frame_format | 1 = short frame, 2 = long frame |

## Appendix B: CSbepBroker Object Layout

| Offset | Size | Field | Description |
|--------|------|-------|-------------|
| +0x04 | ptr | serial_port | Pointer to CWinSerial / CSerial object |
| +0x08 | 2 | block_size | Default transfer block size |
| +0x0A | 2 | header_size | Current header size |
| +0x0C | 4 | bytes_transferred | Running byte counter |
| +0x10 | ... | rx_buffer | Receive message buffer (CSbepMessage) |
| +0x21C | ... | tx_buffer | Transmit message buffer (CSbepMessage) |
| +0x438 | 4 | retry_count | Number of retries on failure |
| +0x43C | 4 | timeout_ms | Read timeout in milliseconds |
| +0x440 | 4 | wait_time_ms | Wait time between operations |
| +0x444 | 4 | progress_interval | Bytes between progress callbacks |
| +0x44C | 4 | operation_type | 1=send, 2=receive_ack, 3=receive_response |
| +0x450 | 4 | last_error | Error code from last operation |
| +0x468 | ... | work_buffer | Working message buffer for building frames |
