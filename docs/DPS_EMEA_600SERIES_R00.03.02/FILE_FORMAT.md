# DPS 600 Series — File Format (.NET / .PER / .RAD)

**Status: fully decoded and verified** against the bundled samples `DPS.NET`
(1213 bytes) and `DPS.RAD` (3025 bytes). All offsets below are post-decryption.

## 1. Obfuscation — static 7-byte XOR

The whole file is XORed with a repeating **static 7-byte key**, phase 0 at file
offset 0:

```
KEY7 = 5D 29 EA 64 B3 7F 1C        plain[i] = cipher[i] ^ KEY7[i % 7]
```

- No key derivation, no random padding header, no escape sequences. Same key for
  .NET, .PER, .RAD, OLD and NEW formats.
- Not an LCG (the Waris `.cpg` scheme does not apply here) — keystream period in
  zero-regions is exactly 7.
- Key hardcoded twice in `WDPS_NP.EXE`: file offset **0x95BDA** (seg19:0x1A,
  network-file code) and **0x998C0** (seg29:0, radio-file code).
- Cipher routine (symmetric encrypt/decrypt): file **0x15FBC** (seg2:0xE77C);
  second copy at file 0x4884E (seg6). Loop: `al = key[i%7]; buf[i] ^= al`.

A second constant, **KEY9 = F6 39 2B A8 0D 51 C7 4D C2** (EXE 0x95BE2 / 0x998C8),
is **not crypto** — it is Motorola's buffer-init filler, memset into new data
buffers (init loops at file 0x17B31, 0x1842F). It survives on disk in unused
areas (header reserved field, empty list slots).

## 2. Container layout

| Offset | Size | Content |
|--------|------|---------|
| 0x00 | 9 | magic `9B 37 F2 B1 C9 5E 9A 40 1D` (EXE seg18, file 0x95BA0; verified by validate fn at file 0x15EA2) |
| 0x09 | 2 | LE word **type**: 0=.NET, 1=.PER, 2=.RAD |
| 0x0B | 1 | 0x00 |
| 0x0C–0xD2 | 199 | reserved (KEY9 filler in untouched files) |
| 0xD3 | 2 | LE word **format**: 0x0200=OLD (GP1200/GM1200 RSS GVN6007), 0x0300=NEW (DPS) |
| 0xD6–0xDA | 5 | partially unidentified; 0xD6=0x05 in both samples, 0xD7 differs per file, 0xD8–0xDA=`4A 9C 33` |
| 0xDB | 1 | **header checksum** = `(sum(bytes 0x00..0xDA) − 0x55) & 0xFF` (routine at file 0x15E1E; verified RAD=0xEA, NET=0xF7) |
| 0xDC … EOF−2 | — | body: fixed-layout little-endian 32-bit field table |
| EOF−1 | 1 | **trailing checksum** = `sum(all preceding decoded bytes) & 0xFF` (sum8 at file 0x15FEC seg2:0xE7AC, copy at 0x488EC; verified NET=0x1C, RAD=0x7F) |

## 3. Fixed file sizes

| File | NEW (DPS) | OLD (RSS GVN6007) |
|------|-----------|-------------------|
| .NET | 1213 (0x4BD) | 1189 (0x4A5) |
| .PER | ~2033 (0x7F1) | ~1945 (0x799) |
| .RAD | 3025 (0xBD1) | 2913 (0xB61) |

(.PER sizes from read-path constants, not sample-verified.)

Read flow (NEW .NET, file 0x16F1A): read fixed size → cipher7 → sum8 check of all
but last byte → validate header (magic, type, header checksum) → parse. OLD path
(file 0x165B2) identical with smaller size; its error string is
`"RSS format network file."` (EXE 0x95BC0). Save computes both checksums, then
ciphers (RAD save at file 0x4FCBD).

## 4. Body structure (.RAD sample)

- Bytes **0x000–0x4BC**: embedded network block, byte-identical in structure to a
  standalone .NET file.
- Bytes **0x4BD–0xBD0**: radio personality (1812 bytes).
- Readable content in sample: ASCII serial `"1234567890"` at **0x4C0**; unit ID
  `"01234567890123"` at **0x957**; unit/call list `"205"…"209"`, `"90"…"93"`
  (NUL-terminated ASCII in KEY9-filled slots) ~0x9D6–0xB85.
- Tables of LE 32-bit values fill both sections; the timer/counter dword table
  starts at 0xDC (values 3,4,3,30,…,1023@0x180, 206@0x130, 231@0x4A0 — matching
  the manual's counter/timer defaults).
- Per-field offset map not yet fully traced — fields serialize via a
  descriptor-table framework; anchor values above + the manual's defaults list
  are the entry points for a full map.

## 5. OLD vs NEW

Same container, crypto and checksums. OLD bodies are shorter (NET −24, RAD −112,
PER −88 bytes) — they lack fields added by DPS; DPS supplies defaults for missing
fields (per user manual). Distinguish by format word at 0xD3 and by file size.

## 6. Verified Python decryptor

```python
KEY7  = bytes.fromhex('5d29ea64b37f1c')    # static XOR key, i%7, phase 0 at offset 0
KEY9  = bytes.fromhex('f6392ba80d51c74dc2')# unused-area filler (not crypto)
MAGIC = bytes.fromhex('9b37f2b1c95e9a401d')

def decrypt(buf):   # symmetric
    return bytes(b ^ KEY7[i % 7] for i, b in enumerate(buf))

def parse(d):
    assert d[0:9] == MAGIC
    assert (sum(d[0:0xdb]) - 0x55) & 0xFF == d[0xdb]   # header checksum
    assert (sum(d[:-1]) & 0xFF) == d[-1]               # trailing checksum
    ftype = int.from_bytes(d[9:11], 'little')          # 0=.NET 1=.PER 2=.RAD
    fmt   = int.from_bytes(d[0xd3:0xd5], 'little')     # 0x200=OLD/RSS 0x300=NEW/DPS
    return ftype, fmt, d[0xdc:]
```

Verified output: `DPS.NET: type=0, format=0x0300, hdr_ck=0xF7 OK, tail_ck=0x1C OK`;
`DPS.RAD: type=2, format=0x0300, hdr_ck=0xEA OK, tail_ck=0x7F OK`.

## 7. Loose ends

- `DPS.CFG` is **not** key7-ciphered: plaintext `"DPS CONFIG FILE - DPS.CFG\0"`,
  language `"en"`, install path `"c:\mrss\mpt\dpswnp"`, then raw 16-bit x86 code
  (`int 21h`/`int 2fh`, 386 `movzx`) from ~0x38 — purpose TBD (possibly a
  serialized config blob with executable hooks; worth a separate look).
- Two near-identical code families in the EXE: seg2/seg3 (network/personality;
  key copies seg19 @0x1A/0x22) and seg6 (radio; key copies seg29 @0x0/0x8).
