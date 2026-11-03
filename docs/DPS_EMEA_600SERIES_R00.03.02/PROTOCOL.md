# DPS 600 Series — Serial Protocol (SBEP variant)

Reversed from `WDPS_DP.EXE` (Dealer Programmer, 68-segment NE image).
Addresses given as `seg:offset` with file offset in parentheses. Relocation-chain
resolution via custom NE parser (raw NE far-call selector words are chain links).

## Architecture

- Serial I/O uses the **Windows 3.1 COMM API** (USER ordinals 200–215: OpenComm,
  SetCommState, ReadComm, WriteComm, CloseComm, SetCommEventMask, SetCommBreak,
  ClearCommBreak, BuildCommDCB, EscapeCommFunction, FlushComm…). No direct UART
  register banging, no VxD.
- Byte I/O layer is **Greenleaf CommLib** (`..\source\greenlf.cpp`, seg6; debug
  strings "Port type: MS Windows DCB Id:…", "CE_BREAK:%d").
- Stack: Greenleaf `Port` → `sbep.cpp` framing (seg3) → command methods
  (sbep.cpp/softpot.cpp) → `dsiradio.cpp` buffered block read/write + codeplug
  region model (seg3, ~file 0x25900–0x27c12) → `c_radio.cpp` UI handlers (seg4).
- `WSERIAL.EXE` is **not comms** — it's Motorola's dealer serializer: patches
  dealer identity, serial number and the service-mode password into the DPS EXE
  (`WSERIAL <exe> [-S<serial>] [-K<key>] [-U<user>] [-C<company>] [-E<ident>]
  [-P<service password>]`). The password gates the tuning menus (password.cpp).

## Serial parameters

- **9600 baud, 8N1, no flow control** — the only baud rate in the binary
  (`push 0x2580` at the single Port-construction site, file 0x16823).
- COM1–COM4 selectable in UI (`WFI_COMPORT`).
- **RIB-less, single-wire half-duplex**: `send_message` transmits byte-by-byte,
  then immediately reads back its own echo (timeout `(datalen+100)*5` ms) before
  returning. The host literally hears itself — confirms the shared-bus TTL
  interface on the accessory connector, same physical style as GM1200/GP300.
  A USB-UART + diode (TX pulls down only) + series resistor on RX is the correct
  adapter. No RIB mention anywhere in docs/help.

## Wire framing (sbep.cpp)

Frame builder `send_message` = seg3:0x26cc (file 0x1b4ac); receiver = seg3:0x2a52
(file 0x1b832); checksum = seg3:0x2cf8 (file 0x1bad8).

Byte 0 = `opcode<<4 | length`, where length counts bytes following byte 0
**including the checksum** (datalen+1). 0xF-nibble escapes:

| Case | Layout |
|------|--------|
| opcode ≤ 0xE, datalen = 0 | `[opcode<<4]` (single byte, no checksum) |
| opcode ≤ 0xE, 1 ≤ datalen ≤ 0xE | `[(opcode<<4)\|(len+1)] [data…] [cks]` |
| escaped opcode (>0xE), datalen ≤ 0xE | `[0xF0\|(len+1)] [ext_opcode] [data…] [cks]` |
| opcode ≤ 0xE, datalen > 0xE | `[(opcode<<4)\|0xF] [(len+1)>>8] [(len+1)&0xFF] [data…] [cks]` |
| both escaped | `[0xFF] [ext_opcode] [(len+1) BE16] [data…] [cks]` |

Checksum: `cks = 0xFF − Σ(all preceding frame bytes)`; sum over whole frame
including checksum ≡ 0xFF (mod 256) — matches the project's ESBEP finding.
Max message buffer: 261 bytes (receiver check `> 0x105`).

Constructed examples:
- Enter programming mode (0x10): `F1 10 FE`
- ACK (0x05, no data): single byte `50`; NAK (0x06): `60`
- Read identity string #1 (0x23, data `[01]`): `F2 23 01 E9`
- Read 32 bytes @ 0 (0x11, data `[20 00 00 00]`): `F5 11 20 00 00 00 D9`

All observed commands use the extended-opcode form (opcode > 0xE → byte0 = 0xF0|(len+1)).

Replies come as **ACK frame first, then data frame** (e.g. read replies arrive as
opcode 0x80/0x8a/0x8b frames after the ACK).

`receive_message` return codes: 0 OK · 2 nothing received (MSG_NO_RESPONSE_FROM_RADIO) ·
3 incomplete (MSG_INCOMPLETE_RADIO_RESPONSE) · 4 overflow · 5 checksum fail
(MSG_BAD_CHECKSUM_IN_RX_MESSAGE). DGROUP statics: retry count 3 (+0x3c), ACK 0x05
(+0x3e), NAK 0x06 (+0x3f), error opcode 0x86 (+0x40), opcode list `19 20 21 22 23 10`,
timeouts 500/100/100/100 ms (file 0xaaef0).

## Command set

| Opcode | Function | Request data | Radio reply | Evidence (seg3 / file) |
|--------|----------|--------------|-------------|------------------------|
| 0x10 | **Enter programming mode** ("connect") | none | ACK | 0x2d6e / 0x1bb4e; ≤3 retries, 21 ms settle |
| 0x11 | **Read memory block** | `[len] [addr23-16] [addr15-8] [addr7-0]` — **24-bit address** | ACK, then 0x80 frame: `[3-byte hdr][payload]` (len = req+3) | 0x47fc / 0x1d5dc |
| 0x13 | **Query transfer capability** | none | ACK, then 0x82 frame w/ BE16 = radio max block size | 0x4520 / 0x1d300 |
| 0x17 | **Write memory block** | `[addr23-16] [addr15-8] [addr7-0] [payload…]` | ACK, then 0x84 = OK / 0x85 = fail (→ error 0x19) | 0x491a / 0x1d6fa |
| 0x19 | Mode switch (1=on/0=off), 101 ms settle | `[01]` / `[00]` | ACK | 0x2e2b / 0x1bc0b (no static callers in DP) |
| 0x20 | **Parameter read/write** (softpots, tuning) | read `[param, 0]`; write `[param, 1|2, val…]` (two write flavors, likely RAM vs permanent); val 1–3 bytes | read: ACK then 0x8a + value; write: ACK | 0x2fab / 0x1bd8b; 0x31ae; 0x32b3 |
| 0x21 | Set 16-bit value (address/register preset) | `[0x00, hi, lo]` | ACK, 101 ms settle | 0x33bd / 0x1c19d |
| 0x22 | Two-byte parameter write (softpot/tuning) | `[b1, b2]` | ACK, 101 ms settle | 0x3486 / 0x1c266; many callers |
| 0x23 | **Read identity string**, index 0/1/3/4 (Radio Info, model, serial) | `[index]` | ACK, then 0x8b w/ ≤13-char NUL-terminated string | 0x3551 / 0x368e / 0x37ce / 0x390e; idx 1 read at connect (file 0x188e9) |

Note: framing is the same SBEP family as Commercial-series/Waris (nibble header,
0xF escapes), but the 600-series command set is its own — notably the **24-bit
address** in read/write (vs 3-byte `[len][addr]` order in later SBEP).

## Buffered transfer layer (dsiradio.cpp)

- `read_buffered` seg3:0x460a (file 0x1d3ea), write twin seg3:0x46eb (0x1d4cb):
  query capability (0x13) → chunk = clamp(min(total/20, radio_max), min 0x20,
  max 0x100) → loop read_block/write_block over auto-incrementing 32-bit address
  counter (dsi +0x10f) → progress callback (dsi +0x109, `done*100/total`).
- Codeplug integrity: regions of size **0x7F1 and 0x799** — exactly the .PER
  NEW/OLD body sizes, i.e. **the radio's personality region IS the .per body** —
  are checksummed locally (fn seg3:0x3f82) → MSG_RADIO_BLOCK_CSUM_FAIL.
- Alignment data ("Portable Alignment Data"): **0x280 bytes at radio address
  0xD80** (fn seg3:0xe1d6, file 0x26fb6); mirrored at offset 0xD80 in archive files.
- "Read all" fn at file 0x25900 iterates 10 region objects (dsi +0x1e8d, stride
  0x1c) + 15×3 + 4×7 small items + 17× 33-byte records.

## Session flow ("Read Radio")

1. Create `Port`(COMx, 9600).
2. `enter_mode` (0x10) on static SBEP radio object (far-BSS seg20:0), ≤3 retries,
   200 ms ACK timeout (file 0x18894, 0x2bc1c).
3. Read identity strings via 0x23 (serial = idx 1 at file 0x188e9). On write, the
   radio's serial number is checked against memory ("…does not match…" guard).
4. Per codeplug region: set address (0x21), chunked read_block (0x11) w/ progress bar.
5. Read 0x280-byte alignment block @ 0xD80.
6. Verify block checksums.

Write path symmetric: 0x17 writes (+ 0x84/0x85 result frames), 0x20/0x22 for
tuning parameters. No "exit programming mode" call found in DP — radio drops out
on timeout/power cycle.

## Timeouts & retries (ms)

- ACK/reply timeout per command: 200
- Echo readback inside send: (datalen+100)*5; inter-byte gap limit: 121
- Write block: first ACK within len+1000; result frame within len*12+1000
- Settle after 0x10: 21; after 0x19/0x21/0x22: 101
- Command retry count: 3

## Open items

- Exact semantics of opcode 0x19 (no callers in DP).
- Which 0x23 index = model vs serial (idx 1 read at connect — likely serial).
- 0x80 reply 3-byte header: `[addr_hi,mid,lo]` vs `[len,addr_hi,mid]`.
- `WDPS_NP.EXE` has dsiradio.cpp but **not** sbep.cpp — the Network Programmer
  programs over the MPT1327 network (OTAP-style), not the serial bus.
- Mapped for follow-up: Zinc vtables seg3:0x3b4a/0x3b5a/0x3b6a/0x4b4a, static
  SBEP object seg20:0.
