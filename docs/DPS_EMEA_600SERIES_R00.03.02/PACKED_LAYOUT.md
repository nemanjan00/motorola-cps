> **Partially superseded by `LIVE_CAPTURE.md` + `CODEPLUG_BITMAP.md`.** A live DPS read/write
> later confirmed the GM600 codeplug is the resident 640-byte EEPROM (no paging), and the
> native field/frequency encoding was solved against ground truth. This file is kept as the
> pre-capture static-RE record.

# GM600 packed codeplug — decompiler pass (supersedes earlier draft)

Second pass with a working decompiler (r2 6.2.2 + Ghidra `pdg`, NE-loaded with
`bin.relocs.apply=true`; IDA Pro 9.4 available as backup). Goal was to crack the packed
field layout and decode THIS radio's codeplug (identity "322", UHF) from the 64 KB dump
`~/rib/docs/gm600-807IYA0903-2026-11-03-cpu64k.bin`. Mixed result — one solid confirmation,
one corrected assumption, channels still unproven. Marked byte-confirmed vs inferred vs
speculative throughout.

## Byte-confirmed

### Identity = 322, resident in EEPROM
- On-screen identity "322" is stored as **BE16 `0x0142` at EEPROM offset `0x0F0B`**
  (bytes `… 2b 07 d1 | 01 42 | 03 83 …` at `0x0F08`).
- This region (`0x0D80`–`0x0FFF`) is the 68HC11 internal EEPROM: resident in the dump, reads
  with plain `0x11`, no paging, no reboot ambiguity. **This is a validated ground-truth anchor.**
- Caveat: `0x0142` is not a rare value; "`0x0F0B` is *the* identity field" is strongly supported
  by the ground-truth match but proven only by a live read after an ident change (or the
  volatile/stable experiment). The preceding `2b 07 d1` (prefix 0x2B=43, 0x07D1=2001) is an
  adjacent field, NOT part of the displayed identity — the user confirms only "322" is on screen.

## Corrected from the earlier draft

### The 14-byte "record tables" are UI field descriptors, not codeplug bit maps
- Decompiled the walker `0x795B4` and its callee `0x7F7D0` (NE-loaded). `0x795B4` iterates the
  14-byte records (stride 7 words, `0xFFFF/0xFFEE` sentinel) and then makes a series of vtable
  calls with data-segment **string/label pointers** (`0xa64d`, `0xa67d`, `0xa698`, …) — i.e. it
  **renders a field list to the UI/report**, it does not extract bits from a codeplug image.
- `0x7F7D0` decompiles as rectangle/bounds clipping (min/max of four coordinates, vtable `+0x30`
  / `+0x50`) — a drawing helper, not a bit extractor.
- So the `field_id / p6 / width / byte_off / p11` records are **UI metadata** (field id + screen
  layout), consistent with FIELD_MAP.md's note that offset binding lives in the field
  constructors (`c_field.cpp`/`c_new.cpp`), not these tables. **The earlier "p6/p11 = codeplug bit
  position" reading was wrong.** The real codeplug bit-binding was NOT located this pass.

## Speculative (UNVERIFIED — needs a known channel to confirm or refute)

### Candidate channel table in EEPROM ~`0x0F67`
After a run of empty `00 00 00 80` slots (`~0x0F30`–`0x0F66`), there are 7-byte records:

| Offset | Bytes | BE16 first word | ×10 kHz |
|---|---|---|---|
| `0x0F67` | `ac 6b ac 6b 00 00 08` | 44139 | **441.39 MHz** |
| `0x0F6E` | `ac 75 ac 75 00 00 08` | 44149 | **441.49 MHz** |
| `0x0F75` | `ac 6f ac 6f 00 00 08` | 44143 | **441.43 MHz** |
| `0x0F7C` | `31 b5 2b c5 13 00 08` | 12725 | 127.25 MHz (breaks pattern) |

- Under **BE16 × 10 kHz**, the first three land at ~441.4 MHz — inside the UHF band (403–470) and
  tightly clustered, which *looks* like a 3-channel fleet (first two bytes repeated = Rx==Tx,
  i.e. simplex). This would make "322" a UHF taxi radio on ~441 MHz.
- **But this is not proven:** the 10 kHz step is non-standard (Motorola uses 5/6.25/12.5/25 kHz),
  the 4th record does not fit, there is no ground-truth channel frequency to anchor against, and
  these records may instead be tuning/softpot reference points, not user channels.
- **How to confirm:** if the user knows any actual channel frequency the radio uses, compare it to
  441.39/441.43/441.49 MHz. A match confirms the table and the encoding in one step (exactly how
  "322" confirmed the identity).

## Not achieved this pass

- **The packed field→bit layout.** The record tables are UI, not the bit map; the binding is in
  the field constructors, not reversed here.
- **A definitive frequency formula.** Not isolated from DPS; the ~441 MHz reading above is an
  empirical guess, not from the conversion code.
- **Full personality / channel list.** Only the EEPROM is confirmed resident. Whether the full
  conventional personality (`.per` 4×32B channels) is resident in the readable 64 KB, or paged,
  is still open (the base address is set at runtime in DPS C++ objects, not a code constant).

## Concrete next targets

1. **Ask the user for one known channel frequency** — cheapest confirm/refute of the `0x0F67`
   table and the frequency step. Highest value, zero RE.
2. **68HC11 firmware synthesizer routine** — the code that turns a stored channel value into the
   PLL divider gives the exact native frequency formula (firmware dump has it; HC11 has no
   Hex-Rays but disassembly + the 441 MHz hypothesis as a check should crack it).
3. **DPS field constructors** (`c_field.cpp`/`c_new.cpp`) — for the real codeplug bit-binding, if
   the full personality turns out to be needed from a radio read.
4. **Live DPS "Read Radio" capture** — still the unambiguous way to get the base address and the
   full personality; defer unless 1–3 stall.
