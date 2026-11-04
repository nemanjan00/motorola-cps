meta:
  id: gm600_codeplug
  title: Motorola GM600 native codeplug (68HC11 internal EEPROM, radio 0x0D80-0x0FFF)
  file-extension: bin
  endian: be
doc: |
  Native on-air/EEPROM codeplug of a Motorola GM600 (600-series, MPT1327), as read
  from the radio over SBEP (opcode 0x11) at radio address 0x0D80-0x0FFF (640 bytes).
  File offset 0 = radio 0x0D80, so (radio address - 0x0D80) = offset here.

  Every NAMED field here is bound to the bit against ground truth (undecoded spans are
  kept as labelled raw regions, and a few config bytes — 0x0F15, 0x0F20-0x0F22, 0x0F24,
  0x0F29 — are not yet bound): a live DPS
  "Read Radio" of radio serial 807IYA0903 (model M08RHF4CK3, UHF R-band) plus a
  large set of DPS write-contrasts (change one field in DPS -> Write Radio -> diff
  the dump). Values cited in docs are this reference radio's. See CODEPLUG_BITMAP.md,
  FIELD_HELP_REFERENCE.md, LIVE_CAPTURE.md.

  640-byte block map (all bytes accounted for):
    0x000-0x092  alignment_block  radio 0x0D80-0x0E12  READ-ONLY factory cal (serial, softpot, band grid)
    0x093-0x187  network_block    radio 0x0E13-0x0F07  MPT1327 *system* data (mostly not byte-bound; out of scope)
    0x188-0x1AA  personality cfg  radio 0x0F08-0x0F2A  MPT numbers, call timers, power, flags (bound)
    0x1AB-0x1E6  own_groups[15]   radio 0x0F2B-0x0F66  Own Group Numbers list
    0x1E7-0x202  channels[4]      radio 0x0F67-0x0F82  conventional channel table
    0x203-0x219  shortform        radio 0x0F83-0x0F99  Shortform Dialling buffer (BCD nibbles)
    0x21A-0x273  personality_tail radio 0x0F9A-0x0FF3  remaining personality (not byte-bound)
    0x274        pers checksum    radio 0x0FF4         additive personality checksum
    0x275-0x27B  trailing_field   radio 0x0FF5-0x0FFB  factory/firmware marker
    0x27C-0x27F  final_tail       radio 0x0FFC-0x0FFF  DPS leaves untouched

instances:

  # ---- 0x000-0x092 : alignment / factory block (read-only) ----
  alignment_block:
    pos: 0x00
    size: 0x93
    doc: |
      Radio/alignment block (radio 0x0D80-0x0E12), READ-ONLY (DPS never rewrites it).
      Holds the serial (below), tuning/softpot values, and the band-calibration grid
      at radio 0x0DDA (file 0x5A). Internals not byte-decoded (needs TUNER_PRO).
  serial:
    pos: 0x08
    type: str
    size: 12
    encoding: ASCII
    doc: Radio serial + 2-char suffix, e.g. "807IYA0903CG" (radio 0x0D88).

  # ---- 0x093-0x187 : MPT1327 network/system block (out of scope) ----
  network_block:
    pos: 0x93
    size: 0xF5
    doc: |
      MPT1327 *system* definition (radio 0x0E13-0x0F07, ~240 B): network specific,
      hunt options, radio flags, preferential NDD, access authorisation, control
      channel list, channel frequency plan, counters, timers. Authored as a .net in
      WDPS_NP.EXE and merged at programming time. Fields fully enumerated in
      FIELD_DICTIONARY.md; per-byte binding intentionally OUT OF SCOPE (not needed for
      conventional use). Two sub-regions are offset-correlated (below). 0x0F06-0x0F07
      are in the Network checksum domain.

      Inside this block is a packed "Radio Config Byte1" (the Radio Flags). Its bit
      layout is DECODED (live WDPS_NP .net write-contrast, see FIELD_MAP.md), though its
      exact offset within this block is not yet pinned (needs the .net->radio merge):
        bit7 (0x80) = Registration On Power Up (inverted: 1 = disabled)
        bits[6:5] (0x60) = Conventional Mode (0=Inhibit,1=Dealer,2=All,3=RegioNet43)
        bit4 (0x10) = De/Pre-emphasis (0=MPT1327, 1=PAA1382)
        bits[3:0] = Short Addressing PABX / Tx Timer Clear Down / Ignore LAB Subfield /
                    Synch Pattern Type (not individually bound)
      In the .net file this packed byte is at decoded offset 0x4A0 (value 0xE7 in the
      sample DPS.NET). The "Radio Config Byte1/Byte2" shown in the Radio Flags dialog
      (0x00) are a separate spare pair, NOT this packed byte.
  control_channel_list:
    pos: 0xDF
    size: 14
    doc: |
      Control Channel List (radio 0x0E5F-0x0E6C): 8 entries, radio channel numbers
      (ref: 0C 09 05 0B 03 07 02 0A) with Time-shared / Home-Channel flag bits. Offset
      correlated, exact per-entry layout not pinned.
  channel_frequency_plan:
    pos: 0x130
    size: 14
    doc: |
      Channel Frequency Plan (radio 0x0EB0-0x0EBD): trunked channel-number -> frequency
      map as BE16 words using the same freq formula as the conventional channels
      (0x3778->446.00, 0xACFE->446.99, 0xA9DE->441.99 MHz). Offset correlated.

  # ---- 0x188-0x1AA : personality config (MPT numbers / timers / power / flags) ----
  own_prefix_flags:
    pos: 0x188
    type: prefix_flags
    doc: radio 0x0F08. bits0-5 Own Prefix (MPT1327 fmt), bit7 LNR Enable (inverted).
  own_fleet_indv_no:
    pos: 0x189
    type: u2
    doc: Own Fleet Indv. No. (radio 0x0F09), e.g. 2001.
  own_unit_no:
    pos: 0x18b
    type: u2
    doc: Own Unit No. = displayed radio identity (radio 0x0F0B), e.g. 322.
  highest_unit_no:
    pos: 0x18d
    type: u2
    doc: Highest Unit No. (radio 0x0F0D), e.g. 899.
  lowest_callable_no:
    pos: 0x18f
    type: u2
    doc: Lowest Callable No. (radio 0x0F0F), e.g. 200.
  highest_callable_no:
    pos: 0x191
    type: u2
    doc: Highest Callable No. (radio 0x0F11), e.g. 799.
  own_fleet_group_no:
    pos: 0x193
    type: u2
    doc: Own Fleet Group No. (radio 0x0F13), e.g. 5500.
  limit_normal_call_s:
    pos: 0x196
    type: u2
    doc: Limit Normal Call Duration, seconds (radio 0x0F16), e.g. 300 = 05:00.
  limit_emergency_call_s:
    pos: 0x198
    type: u2
    doc: Limit Emergency Call Duration, seconds (radio 0x0F18), e.g. 30 = 00:30.
  call_enable_mask:
    pos: 0x19a
    type: u2
    doc: |
      Call Enable bitmask (radio 0x0F1A-0x0F1B), 12+ call-type flags; BF FF = all on
      (Edit->Trunking->Call Enable). Exact bit->call-type order TBD.
  call_in_absence_delay_s:
    pos: 0x19c
    type: u1
    doc: Call in Absence Delay, seconds (radio 0x0F1C).
  group_count_flags:
    pos: 0x19d
    type: group_count_flags
    doc: radio 0x0F1D. low bits = Own Group count; bit4/bit5 = NPD flags.
  low_power_level:
    pos: 0x19e
    type: u1
    doc: |
      Low Power level (radio 0x0F1E), CALIBRATED byte (not raw watts): 5 W=0x2D,
      8 W=0x39 (~+4/W). Host can't set watts without the cal curve.
  high_power_level:
    pos: 0x19f
    type: u1
    doc: High Power level (radio 0x0F1F), calibrated byte (25 W=0x64, 24 W=0x62, ~-2/W).
  acoustic_feedback_byte:
    pos: 0x1a3
    type: u1
    doc: radio 0x0F23; bit6 (0x40) = Acoustic Feedback enabled (see acoustic_feedback).
  alert_tone_vol_offset:
    pos: 0x1a5
    type: u1
    doc: Alert Tone Volume Offset (radio 0x0F25), linear (0->0x00, 4->0x04).
  emergency_call_activation_delay:
    pos: 0x1a6
    type: u1
    doc: Emergency Call Activation Delay (radio 0x0F26), 0.25 s units (3 s=0x0C, 1 s=0x04).
  normal_call_activation_delay:
    pos: 0x1a7
    type: u1
    doc: Normal Call Activation Delay (radio 0x0F27), 0.25 s units (0x08 = 2 s, inferred).
  external_alarm_duration_s:
    pos: 0x1a8
    type: u1
    doc: External Alarm Duration, seconds (radio 0x0F28), 0x01->0x05 = 1->5 s.
  telephone_handset_byte:
    pos: 0x1aa
    type: u1
    doc: radio 0x0F2A; bit7 (0x80) = Telephone Type Handset enabled (see telephone_type_handset).
  # derived bit flags (reference the raw bytes above)
  acoustic_feedback:
    value: (acoustic_feedback_byte & 0x40) != 0
    doc: Acoustic Feedback enabled (0x0F23 bit6).
  telephone_type_handset:
    value: (telephone_handset_byte & 0x80) != 0
    doc: Telephone Type Handset fitted (0x0F2A bit7).

  # ---- 0x1AB-0x1E6 : Own Group Numbers list ----
  own_groups:
    pos: 0x1ab
    type: own_group
    repeat: expr
    repeat-expr: 15
    doc: |
      Own Group Numbers (radio 0x0F2B-0x0F66), up to 15 entries x 4 bytes
      (Edit->Trunking->Own Group Numbers). Empty entry = 00 00 00 80.

  # ---- 0x1E7-0x202 : conventional channel table ----
  channels:
    pos: 0x1e7
    type: channel
    repeat: expr
    repeat-expr: 4
    doc: |
      Conventional personality table (radio 0x0F67-0x0F82). 7-byte records, exactly 4
      on a GM600 (a fixed count for this model). 0x0F83 onward is the Shortform Dialling
      buffer, not channels — its 0xF-nibble padding happens to read as 0xFFFF, which only
      *coincidentally* looks like a table terminator (it breaks once a dial string grows).

  # ---- 0x203-0x219 : Shortform Dialling buffer ----
  shortform_dialling:
    pos: 0x203
    size: 0x17
    doc: |
      Shortform Dialling buffer (radio 0x0F83-0x0F99). DTMF dial strings, BCD-nibble
      packed, 0xF-terminated, one variable-length string per position in fixed order
      (nibble 0xB = '*'). Ref bytes decode to Base Call 306, etc.

  # ---- 0x21A-0x273 : remaining personality (not byte-bound) ----
  personality_tail:
    pos: 0x21a
    size: 0x5a
    doc: |
      Remaining personality bytes (radio 0x0F9A-0x0FF3): more signalling/timers and
      undecoded config inside the 0x0FF4 checksum domain. Not byte-bound.

  # ---- 0x274 / 0x275 / 0x27C : checksum + trailers ----
  personality_checksum:
    pos: 0x274
    type: u1
    doc: |
      Personality checksum byte (radio 0x0FF4). ADDITIVE: stored low byte of a running
      sum of the personality data (NOT 0xFF-sum). A host writing a modified personality
      must recompute it (+= sum of its data-byte deltas). Tracked across every contrast
      (e.g. Monitor=Yes moved data +0x10 and this byte E6->F6). Summed extent ends before
      0x0FF4; NOT pinned — inclusive 0x0F1D-0x0FE0 sums to 0xE5 (!= stored 0xE6) and
      0x0F1D-0x0FDF sums to 0xE6, but 0x0FE0-0x0FF3 is all 0xFF so the sum cannot pin the
      boundary in that run; 0x0FDF is only a candidate. Settle it with a contrast write to
      a byte just inside vs just outside 0x0FDF and see which moves 0x0FF4.
  trailing_field:
    pos: 0x275
    size: 7
    doc: |
      Factory/firmware-owned trailing field (radio 0x0FF5-0x0FFB). Factory value
      20 00 00 00 00 11 DC; DPS blanks it to FF..FF on write. Not a checksum, not in the
      decoded .per, not written by WSERIAL.EXE. Positive decode needs firmware RE.
  final_tail:
    pos: 0x27c
    size: 4
    doc: Radio 0x0FFC-0x0FFF. DPS's write leaves these untouched.

types:
  prefix_flags:
    seq:
      - id: raw
        type: u1
    instances:
      own_prefix:
        value: raw & 0x3f
        doc: Own Prefix in MPT1327 format (bits 0-5), e.g. 43.
      lnr_enabled:
        value: (raw & 0x80) == 0
        doc: LNR Enable (bit7 INVERTED - set means OFF). bit6 spare.

  group_count_flags:
    seq:
      - id: raw
        type: u1
    instances:
      own_group_count:
        value: raw & 0x0f
        doc: Number of populated Own Group entries (low bits), e.g. 2.
      alert_tones_npd:
        value: (raw & 0x10) != 0
        doc: Alert Tones in NPD Calls (bit4; bit4/bit5 pairing with MAINT order TBD).
      maint_telegrams_npd:
        value: (raw & 0x20) != 0
        doc: MAINT Telegrams in NPD Calls (bit5).

  own_group:
    seq:
      - id: prefix
        type: u1
        doc: Group Prefix (e.g. 0x2B = 43).
      - id: fleet_group
        type: u2
        doc: Fleet Group number BE16 (e.g. 0x157C = 5500).
      - id: group_raw
        type: u1
        doc: Group byte; 0x80 on an empty slot.
    instances:
      is_empty:
        value: prefix == 0 and group_raw == 0x80
      group_number:
        value: group_raw + 0x304
        doc: |
          Displayed group, INFERRED from two adjacent samples (0x87->907, 0x88->908) as
          group_raw + 0x304 — a 2-point fit, not a verified MPT1327 encoding; it may
          differ for other values.
        -ke-write-expr: _value - 0x304
        -ke-write-target: group_raw

  channel:
    seq:
      - id: rx_raw
        type: u2
        doc: Rx frequency word (see rx_hz).
      - id: tx_raw
        type: u2
        doc: Tx frequency word (see tx_hz). GM600 has a fixed 4 entries; there is NO reliable 0xFFFF terminator (see the channels doc).
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
          Per-channel options byte (radio +6, default 0x08). Decoded below:
          data_channel/tx_inhibit/tx_power/monitor; bits 7:5 = opt_reserved.
    instances:
      rx_hz:
        value: '375000000 + (rx_raw & 0x7fff) * (((rx_raw & 0x8000) != 0) ? 6250 : 5000)'
        doc: f = 375.000 MHz + (word & 0x7FFF) * step; step = 6.25 kHz if bit15 else 5 kHz.
        # kaitai-editor extension (ignored by ksc): pick the 6.25 kHz grid (set
        # bit15) when the value lands on it, else the 5 kHz grid.
        -ke-write-expr: '((_value - 375000000) % 6250 == 0) ? (round((_value - 375000000) / 6250) | 0x8000) : round((_value - 375000000) / 5000)'
        -ke-write-target: rx_raw
      tx_hz:
        value: '375000000 + (tx_raw & 0x7fff) * (((tx_raw & 0x8000) != 0) ? 6250 : 5000)'
        -ke-write-expr: '((_value - 375000000) % 6250 == 0) ? (round((_value - 375000000) / 6250) | 0x8000) : round((_value - 375000000) / 5000)'
        -ke-write-target: tx_raw
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
        doc: Options bits 7:5 - not yet bound (0 on reference radio).

enums:
  yes_no:
    0: "no"
    1: "yes"
  tx_power_level:
    0: low
    1: high
  tx_inhibit_mode:
    0: disabled
    1: on_busy
    2: unless_pl
  pl_tone:
    # CTCSS/PL tone index. 0 = Disabled; labels are "<Hz> (<Motorola code>)".
    # Source: FIELD_HELP_REFERENCE.md (confirmed idx 19 = 3Z = 123.0 Hz on ch4).
    0:
      id: disabled
      doc: Disabled
    1:
      id: xz
      doc: 67.0 Hz (XZ)
    2:
      id: wz
      doc: 69.3 Hz (WZ)
    3:
      id: xa
      doc: 71.9 Hz (XA)
    4:
      id: wa
      doc: 74.4 Hz (WA)
    5:
      id: xb
      doc: 77.0 Hz (XB)
    6:
      id: wb
      doc: 79.7 Hz (WB)
    7:
      id: yz
      doc: 82.5 Hz (YZ)
    8:
      id: ya
      doc: 85.4 Hz (YA)
    9:
      id: yb
      doc: 88.5 Hz (YB)
    10:
      id: zz
      doc: 91.5 Hz (ZZ)
    11:
      id: za
      doc: 94.8 Hz (ZA)
    12:
      id: zb
      doc: 97.4 Hz (ZB)
    13:
      id: t1z
      doc: 100.0 Hz (1Z)
    14:
      id: t1a
      doc: 103.5 Hz (1A)
    15:
      id: t1b
      doc: 107.2 Hz (1B)
    16:
      id: t2z
      doc: 110.9 Hz (2Z)
    17:
      id: t2a
      doc: 114.8 Hz (2A)
    18:
      id: t2b
      doc: 118.8 Hz (2B)
    19:
      id: t3z
      doc: 123.0 Hz (3Z)
    20:
      id: t3a
      doc: 127.3 Hz (3A)
    21:
      id: t3b
      doc: 131.8 Hz (3B)
    22:
      id: t4z
      doc: 136.5 Hz (4Z)
    23:
      id: t4a
      doc: 141.3 Hz (4A)
    24:
      id: t4b
      doc: 146.2 Hz (4B)
    25:
      id: t5z
      doc: 151.4 Hz (5Z)
    26:
      id: t5a
      doc: 156.7 Hz (5A)
    27:
      id: t5b
      doc: 162.2 Hz (5B)
    28:
      id: t6z
      doc: 167.9 Hz (6Z)
    29:
      id: t6a
      doc: 173.8 Hz (6A)
    30:
      id: t6b
      doc: 179.9 Hz (6B)
    31:
      id: t7z
      doc: 186.2 Hz (7Z)
    32:
      id: t7a
      doc: 192.8 Hz (7A)
    33:
      id: m1
      doc: 203.5 Hz (M1)
    34:
      id: t8z
      doc: 206.5 Hz (8Z)
    35:
      id: m2
      doc: 210.7 Hz (M2)
    36:
      id: m3
      doc: 218.1 Hz (M3)
    37:
      id: m4
      doc: 225.7 Hz (M4)
    38:
      id: m5
      doc: 233.6 Hz (M5)
    39:
      id: m6
      doc: 241.8 Hz (M6)
    40:
      id: m7
      doc: 250.3 Hz (M7)
