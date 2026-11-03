# GM600 — Live DPS "Read Radio" Capture (ground truth)

First live capture of real DPS reading a real GM600 (serial `807IYA0903`, model
**M08RHF4CK3**, UHF R-band). This settles — with wire evidence — the codeplug location and
read sequence that the static RE could only guess at, and yields a fully decoded codeplug.

Captured 2026-11-03. Artifacts in `../../processed/DPS_EMEA_600SERIES_R00.03.02/captures/`
(gitignored): `native-eeprom.bin` (640 B radio codeplug), `radio.per` (DPS-decoded, 2033 B),
`sniff-readall.log` (raw wire), `dpsram.bin` (64 MB guest RAM, on host `lab`).

## Headline findings

- **DPS "Read All" reads only `0x0D80`–`0x0FFF` — the 640-byte internal EEPROM.** The full
  wire sequence is: `23 00`, `23 04` (model/CP-version strings), `13` (max block), then **20×
  `0x11` reads of 32 bytes** stepping `0x0D80 → 0x0FE0`. Then "Successfully completed."
- **No `0x21`, no page-select, no separate `0x7F1` personality region on this model.** The
  entire codeplug *is* that 640-byte block — which we already had in the firmware dump. The long
  "where is the personality / runtime base address" hunt was chasing a region that does not
  exist on this GM600. (The `0x7F1` personality region seen in DPS static RE applies to other
  models in DPS's range — PTX600/GP600 etc.)
- DPS **expands** those 640 native (packed) bytes into the standard 2033-byte `.per` structure
  (plain LE32 Hz). The native→`.per` transform is DPS's codeplug codec; the bit-level map of the
  native format is in [CODEPLUG_BITMAP.md](CODEPLUG_BITMAP.md).

## Wire protocol confirmations

- ACK = `50`. Enter/reset not used for the read (reads work in the radio's normal answering
  state; `0x10` is a separate reset).
- `0x11` read frame: `F5 11 <len> <a_hi> <a_mid> <a_lo> <cks>` (e.g. `F5 11 20 00 0D 80 4C` =
  read 32 B @ `0x000D80`).
- `0x11` reply: `FF 80 00 24 00 <a_hi> <a_mid> <a_lo> <32 data bytes> <cks>` (long frame; length
  `0x24` = opcode + 3 addr + 32 data).
- `0x13` reply: `F4 82 00 20 00 69` — the `00 20 00` is a **constant** (matches the firmware
  finding), not a real transfer ceiling.
- `0x23` replies (8B frames): index 0 → `02 09` (model code), index 4 → `"02.03"` (codeplug
  version string).

## Read and Write sequences (captured, byte-verified)

Full ordered opcode sequence from the two captures (`sniff-readall.log`, `sniff-write.log`):

- **Read:** `23 23 13` (model + CP-version strings, max block) → `11 × 20` (32-byte reads over
  `0x0D80`–`0x0FFF`). Done.
- **Write:** `23 23 13` (re-query) → **`17 × 17`** write-blocks (mostly 32-byte; the last two are 7 B @`0x0FF5` and 2 B @`0x0FF3`), each answered `0x84` OK → a final `10`. **There is no `0x19`.** `0x10` appears only at the *end* (a reset/exit),
  not the start.
- **Write covers only `0x0E13`–`0x0FFB`.** The first `0x17` is at `0x000E13`; `0x0D80`–`0x0E12`
  (serial `807IYA0903CG` + alignment/softpot data) is **read-only and never rewritten**. So the
  radio-writable codeplug is the ~`0x1ED`-byte region `0x0E13`–`0x0FFF` (channels, identity,
  options); the lower part is factory alignment.
- `0x17` write frame: `FF 17 00 24 00 <a_hi> <a_mid> <a_lo> <32 data> <cks>` (long frame, like the
  `0x80` read reply); result `0x84` = OK (`0x85` = fail).

## Decoded codeplug (this radio)

Model **M08RHF4CK3**, identity **322**. Conventional channels (from `radio.per`):

| Ch | Rx (MHz) | Tx (MHz) | Power | Notes |
|----|----------|----------|-------|-------|
| 1 | 446.0688 | 446.0688 | High | simplex |
| 2 | 446.1313 | 446.1313 | High | simplex |
| 3 | 446.0938 | 446.0938 | High | simplex |
| 4 | 438.6250 | 431.0250 | High | duplex (−7.6 MHz), Tx PL index 19 |

Band-cal grid decodes exactly (`403.625…469.625 MHz`), confirming the `.per` decode and the
R-band. (Earlier "~441 MHz" guesses from the raw EEPROM were wrong; the real channels are the
446 MHz band plus one 438/431 duplex.)

## The capture rig (reproducible, headless)

All on host `lab` (x86_64, Arch/CachyOS), no Windows media needed:

1. **Win3.11 image**: pulled `albrechtloh/qemu-dos-win31` cross-arch (`--platform linux/arm64`,
   no run), `docker cp`'d `/var/vm/msdos.disk` out (it's a plain x86 QCOW1), `qemu-img convert
   -O raw`.
2. **Inject DPS**: loop-mount the FAT16 partition (offset 32256) and copy `DPSWDP` to
   `C:\DPSWDP` and `C:\MRSS\MPT\DPSWDP`; add `run=C:\DPSWDP\WDPS_DP.EXE` to `WIN.INI [windows]`
   so DPS auto-launches.
3. **Run**: `qemu-system-i386 -m 64 -drive file=msdos.raw,format=raw -vga std -display none
   -vnc 127.0.0.1:1 -monitor unix:/tmp/qmon,server,nowait -serial tcp:127.0.0.1:2323,nodelay`.
4. **Serial bridge + sniff**: applet `glasgow run rib -V 5 --bus A0 socket tcp:127.0.0.1:2324`
   → `socat -x TCP-LISTEN:2323 TCP:127.0.0.1:2324 2>sniff.log` → qemu COM1. 9 V on HOOK.
5. **Drive the GUI headlessly** via the qemu monitor: `sendkey` for keystrokes, `screendump`
   for state. Dismiss splash, `File → Read Radio` (Alt+F, R), `All`, Read (Alt+R).
6. **Save/extract**: `File → Save` writes a `.per` into `C:\MRSS\MPT\DPSWDP\ARCHIVE`; `pmemsave
   0 0x4000000 "/tmp/dpsram.bin"` dumps guest RAM; `quit` cleanly; loop-mount to copy the file.

This rig reads/decodes any GM600/GP600 DPS supports, and captures the exact protocol — the
authoritative way to validate the reverse-engineered format for new radios/versions.

## Supersedes

- `DUMP_SEQUENCE.md` open items ("absolute region addresses", "direct vs 0x21"): **answered** —
  for the GM600, direct `0x11` over `0x0D80`–`0x0FFF`, no `0x21`.
- `PACKED_LAYOUT.md` "not resident / paging possible": **resolved** — fully resident, no paging.
