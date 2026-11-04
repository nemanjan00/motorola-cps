meta:
  id: gm600_codeplug
  title: Motorola GM600 native codeplug (68HC11 internal EEPROM, radio 0x0D80-0x0FFF)
  file-extension: bin
  endian: be
  bit-endian: be
doc: |
  Native on-air/EEPROM codeplug of a Motorola GM600 (600-series, MPT1327), as read
  from the radio over SBEP (opcode 0x11) at radio address 0x0D80-0x0FFF (640 bytes).
  Offsets here are relative to the start of that 640-byte block (file offset 0 = radio 0x0D80).

  Reverse engineered against ground truth: a live DPS "Read Radio" of radio serial
  807IYA0903 (model M08RHF4CK3) and the DPS-decoded .per. Frequency formula, channel
  table, PL tone indices and per-channel option bits are all bound by live DPS
  write-contrast. See CODEPLUG_BITMAP.md, FIELD_HELP_REFERENCE.md.

  Not modeled here (out of scope / not byte-bound): the MPT1327 network/trunking block
  (radio ~0x0E13-0x0F07, fields enumerated in FIELD_DICTIONARY.md but offsets not pinned),
  the factory RF-alignment grid (radio 0x0D80-0x0E12, read-only), and Transmit Time-out
  (known in GUI, personality block, exact offset not yet bound).

instances:
  serial:
    pos: 0x08
    type: str
    size: 12
    encoding: ASCII
    doc: Radio serial + suffix, e.g. "807IYA0903CG" (radio 0x0D88).
  identity:
    pos: 0x18b
    type: u2
    doc: MPT1327 own number / Own Unit Number (BE16), e.g. 322 (radio 0x0F0B).
  channels:
    pos: 0x1e7
    type: channel
    repeat: expr
    repeat-expr: 4
    doc: |
      Conventional personality table at radio 0x0F67. 7-byte records; exactly 4 entries
      on a GM600 (0x0F67-0x0F82). 0x0F83 onward is the Shortform Dialling buffer
      (BCD-nibble dial strings), not a channel record. See CODEPLUG_BITMAP.md.
  personality_checksum:
    pos: 0x274
    type: u1
    doc: |
      Personality-block checksum byte (radio 0x0FF4). Additive: stored low byte of a
      running sum of the personality data (NOT 0xFF-sum). A host writing a modified
      personality must recompute this (+= sum of its data-byte deltas). Summed range
      ends before 0x0FF4; candidate extent ~radio 0x0F1D-0x0FE0 (not pinned exactly).
  trailing_field:
    pos: 0x275
    size: 7
    doc: |
      Factory/firmware-owned trailing field (radio 0x0FF5-0x0FFB). Factory value
      20 00 00 00 00 11 DC; DPS blanks it to FF FF FF FF FF FF FF on write. Not a
      checksum, not present in the decoded .per, not written by WSERIAL.EXE. Likely a
      production/alignment/runtime marker; positive decode needs firmware RE.

types:
  channel:
    seq:
      - id: rx_raw
        type: u2
        doc: Rx frequency word (see rx_hz).
      - id: tx_raw
        type: u2
        doc: Tx frequency word (see tx_hz). 0xFFFF marks the end of the channel table.
      - id: tx_pl
        type: u1
        enum: pl_tone
        doc: Tx PL (CTCSS) tone; disabled = none.
      - id: rx_pl
        type: u1
        enum: pl_tone
        doc: Rx PL (CTCSS) tone; disabled = none.
      - id: options
        type: u1
        doc: |
          Per-channel options byte (radio +6, default 0x08). Decoded fields below
          (data_channel, tx_inhibit, tx_power, monitor); bits 7:5 = opt_reserved.
    instances:
      rx_hz:
        value: '375000000 + (rx_raw & 0x7fff) * (((rx_raw & 0x8000) != 0) ? 6250 : 5000)'
        doc: |
          Frequency in Hz. f = 375.000 MHz + (word & 0x7FFF) * step, where
          step = 6.25 kHz if bit15 set, else 5 kHz.
      tx_hz:
        value: '375000000 + (tx_raw & 0x7fff) * (((tx_raw & 0x8000) != 0) ? 6250 : 5000)'
      is_simplex:
        value: rx_raw == tx_raw
      data_channel:
        value: options & 0x01
        enum: yes_no
        doc: Data channel (options bit0).
      tx_inhibit:
        value: (options >> 1) & 0x03
        enum: tx_inhibit_mode
        doc: Tx inhibit (options bits 2:1). 'unless_pl' requires a Tx PL tone.
      tx_power:
        value: (options >> 3) & 0x01
        enum: tx_power_level
        doc: Tx power (options bit3).
      monitor:
        value: (options >> 4) & 0x01
        enum: yes_no
        doc: Monitor / carrier squelch (options bit4).
      opt_reserved:
        value: (options >> 5) & 0x07
        doc: Options bits 7:5 — not yet bound (always 0 on reference radio).

enums:
  yes_no:
    0: no
    1: yes
  tx_power_level:
    0: low
    1: high
  tx_inhibit_mode:
    0: disabled
    1: on_busy
    2: unless_pl
  pl_tone:
    # CTCSS/PL tone index. 0 = Disabled; names are <Motorola code>_<Hz>.
    # Source: FIELD_HELP_REFERENCE.md (confirmed idx 19 = 3Z = 123.0 Hz on ch4).
    0: disabled
    1: pl_xz_67_0
    2: pl_wz_69_3
    3: pl_xa_71_9
    4: pl_wa_74_4
    5: pl_xb_77_0
    6: pl_wb_79_7
    7: pl_yz_82_5
    8: pl_ya_85_4
    9: pl_yb_88_5
    10: pl_zz_91_5
    11: pl_za_94_8
    12: pl_zb_97_4
    13: pl_1z_100_0
    14: pl_1a_103_5
    15: pl_1b_107_2
    16: pl_2z_110_9
    17: pl_2a_114_8
    18: pl_2b_118_8
    19: pl_3z_123_0
    20: pl_3a_127_3
    21: pl_3b_131_8
    22: pl_4z_136_5
    23: pl_4a_141_3
    24: pl_4b_146_2
    25: pl_5z_151_4
    26: pl_5a_156_7
    27: pl_5b_162_2
    28: pl_6z_167_9
    29: pl_6a_173_8
    30: pl_6b_179_9
    31: pl_7z_186_2
    32: pl_7a_192_8
    33: pl_m1_203_5
    34: pl_8z_206_5
    35: pl_m2_210_7
    36: pl_m3_218_1
    37: pl_m4_225_7
    38: pl_m5_233_6
    39: pl_m6_241_8
    40: pl_m7_250_3
