# DPS 600 Series — Codeplug Read ("Read Radio") Sequence

Static reverse of `WDPS_DP.EXE` (Dealer Programmer, 16-bit NE). Goal: reproduce a full
codeplug dump over BUS+ without DPS. Addresses are `seg:offset` with file offset in parens.

Companion to `PROTOCOL.md` (wire framing) and `~/rib/FIRMWARE.md` (radio side).

## Summary of what is and isn't recoverable statically

- **Byte-confirmed from code**: the `0x11` read frame format, the `0x21` set-address frame
  format, the alignment block's address/length, the personality region's length, and the
  chunking math in the buffered read loop.
- **Not static**: the absolute radio start addresses of the 10 main codeplug regions and the
  personality. DPS holds them in C++ objects populated at load time (NE relocations + ctors),
  **not** as code immediates. **No** region's absolute address is a code immediate — not even the
  alignment block (its `0xD80` address is known only from the radio's firmware/EEPROM map, not DPS).
- **Needs live capture**: the per-region start addresses, and whether the codeplug reads use
  `0x21` paging or direct 24-bit addressing (evidence below points to **direct addressing**).

## `0x11` read frame — byte-confirmed

Builder at `seg3:0x47fc` (file `0x1d5dc`). The 4-byte payload is assembled as:

| Payload byte | Source | Meaning |
|---|---|---|
| 0 | arg `[bp+0xe]` | **length** (bytes to read) |
| 1 | arg `[bp+0x12]` low byte | **addr bits 23-16** (a_hi) |
| 2 | `(addr >> 8)` via shift helper | **addr bits 15-8** (a_mid) |
| 3 | arg `[bp+0x10]` low byte | **addr bits 7-0** (a_lo) |

So `0x11` payload = `[len, a_hi, a_mid, a_lo]` — a 24-bit big-endian address after the length.
This matches `PROTOCOL.md`. Frame on the wire: `F5 11 <len> <a_hi> <a_mid> <a_lo> <cks>`.

## `0x21` set-address frame — byte-confirmed

One emit site at `seg3:0x33e4` (file `0x1c1c4`): `push 0x21; <3-byte buf>; push 3; <send>`.
Payload = `[0x00, hi, lo]`, the 16-bit address coming from the caller's arg `[bp+0xa]`.
Frame: `F4 21 00 <hi> <lo> <cks>`.

**`0x21` is emitted inline from several sites, not one shared function** (push-0x21 at files
`0x1c1c4`, `0x2712c`, `0x282a2`, `0x3158a`, `0x543e3`, `0x6e79a`); there are **zero** calls to a
single setaddr routine. The `0x2712c` site sits in the tuning/softpot flow (next to `push 0x20`);
the seg4/seg5 sites build other command structs. None of them is on the codeplug read path (see
next section).

## Alignment block — length byte-confirmed, NO 0x21; address from firmware side

Handler `seg3:0xe1d6` (file `0x26fb6`):

- Reads **`0x280` (640) bytes** — `push 0x280` at file `0x27003`, a confirmed immediate length.
  (A second read in the same handler uses length `0xd80` at file `0x26fda`.)
- **Correction to an earlier draft:** the read *address* is **not** a hardcoded `0x00:0x0D80`
  immediate. Both reads push the address from **object fields** `[es:di+0x4]` (low word) and
  `[es:di+0x6]` (high word) — a runtime 32-bit address, same pattern as the personality region.
  The `0xd80` immediate near the call is a *length* argument, not the address; it is a confusing
  coincidence that it equals the known alignment address.
- Read is a direct block read via the radio object's `vtable+0x8`; a verify read via `vtable+0x0`
  checks the returned length == `0x280`. **No `0x21` set-address precedes it.**
- We nonetheless know the alignment block really is at `0x0D80` (640 bytes): that is proven from
  the **radio side**, not DPS — `0x0D80`–`0x0FFF` is the 68HC11 internal EEPROM in the default map
  (see `~/rib/FIRMWARE.md`, cross-checked against the actual radio dump). A plain `0x11` read of
  that range works with no paging. So the address is confirmed, but by the firmware, not the DPS
  static image — **no region's absolute address is recoverable from DPS statics**.

Wire: read 640 bytes from `0x000D80` in `0x11` chunks (≤ radio max, ≤ 0x100), e.g.
`F5 11 40 00 0D 80 ..` then advance by the chunk size.

## Personality region — length byte-confirmed, address NOT static

Handler `seg3:0xe060` (file `0x26e40`):

- Reads **`0x7F1` bytes (NEW) / `0x799` (OLD)** — the `.per` body size — via the radio object's
  `vtable+0x4` (`push 0x7F1` at file `0x26e62`; the `0x799` twin at file `0x26f7e`).
- The radio address is pushed from **object fields**: `[obj+0x6]` (high word) and `[obj+0x4]`
  (low word) — a 32-bit address stored in the object, set at runtime. **Not an immediate**, so the
  personality's radio start address is not readable from the static image.

## Buffered read loop (chunking) — confirmed

`read_buffered` `seg3:0x460a` (file `0x1d3ea`):

- First queries max block (`0x13`), then per read: `chunk = clamp( min(total/20, radio_max),
  0x20, 0x100 )` (the `/20` is `idiv 0x14`; floors at `0x20`, ceils at `0x100`).
- Address counter is a 32-bit field in the object at `+0x10f / +0x111`, **incremented by the
  chunk size each iteration** (file `0x1d4b3`). Progress callback at `obj+0x109`.
- So within a region, DPS walks addresses upward with `0x11` reads; it does **not** re-send an
  address command per chunk — consistent with direct 24-bit addressing, not `0x21` paging.

## Master read order ("Read all") — structure confirmed, addresses not static

`seg3:0xcb20` (file `0x25900`) runs in this order:

1. **10 region objects**, at object offsets `0x1e8d, 0x1ea9, 0x1ec5, 0x1ee1, 0x1efd, 0x1f19,
   0x1f35, 0x1f51, 0x1f6d, 0x1f89` (stride `0x1c`), each read via its `vtable+0xc` (the
   per-region buffered read). Each object carries its own radio address + length.
2. **15 × 3 small records** at `obj+0x1fa5` via `vtable+0x8` (nested loop: outer 0..0xF, inner
   0..3).
3. **4 × 7 records** at `obj+0x20b3` via `vtable+0x8`.
4. **17 × 33-byte records** starting `obj+0x2151`.

Per-datatype read helpers compute `address = base_field(obj+0x72) + region_offset`, where the
region offsets are a stride-`0x1c` table in a data segment (e.g. one helper at file `0x52600`
reads three sub-regions at field offsets `0x4c5, 0x4e1, 0x4fd`, length `0x112` = 274 each). The
base and offsets live in the relocated DGROUP data, not in code, so the absolute radio addresses
cannot be read out statically.

## Proposed dump sequence (what we can do now)

1. `F1 10 FE` — enter programming mode; wait for the radio to reset and come back.
2. `F2 23 01 ..` — read serial (and `23 00/03/04` for model/fw/cp version).
3. `F1 13 FB` — get max block size.
4. **Alignment block** (proven): `0x11` reads covering `0x000D80`–`0x000FFF` (640 bytes), chunked.
5. **Everything else**: `0x11` reads over the codeplug address ranges — **but those start
   addresses are only known once captured from DPS** (see below). The radio reads the full
   68HC11 logical space via `0x11` (top address byte ignored), so a brute 64 KB sweep
   (`0x0000`–`0xFFFF`) is also possible to grab the live image, with the caveat that the
   personality may be paged and not visible in the default map.

## Unresolved / needs live capture

- **Absolute radio start addresses** of the 10 main regions and the personality (`0x7F1`/`0x799`)
  — held in runtime C++ objects, not code immediates.
- **Whether codeplug reads use `0x21` or direct 24-bit addressing.** Static evidence favours
  **direct**: the alignment and personality handlers push a full address into the read call with
  no `0x21`, the buffered loop auto-increments a 32-bit address, and no `0x21` site is on the read
  path. But this should be confirmed on the wire.
- **The `0x21` values** (if any) used for the codeplug — the `0x21` sites found are tuning/other
  flows, not codeplug reads.

To settle all three: run `WDPS_DP.EXE` under 86Box with COM1 → the Glasgow RIB applet in `sniff`
or `pty`, do one "Read Radio", and record the exact `0x11` addresses (and any `0x21`) it emits.
The region order above tells you how to group the captured addresses into regions.

## Citations (file offset = seg:offset)

- `0x11` builder: file `0x1d5dc` = `seg3:0x47fc`
- `0x21` emit: file `0x1c1c4` = `seg3:0x33e4`
- Alignment handler: file `0x26fb6` = `seg3:0xe1d6` (addr `0xD80` @ `0x26fda`, len `0x280` @ `0x27003`)
- Personality handler: file `0x26e40` = `seg3:0xe060` (len `0x7F1` @ `0x26e62`, `0x799` @ `0x26f7e`)
- `read_buffered`: file `0x1d3ea` = `seg3:0x460a`
- Read-all master: file `0x25900` = `seg3:0xcb20`
