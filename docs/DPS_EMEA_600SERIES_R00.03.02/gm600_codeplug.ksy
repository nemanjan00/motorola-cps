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
  807IYA0903 (model M08RHF4CK3) and the DPS-decoded .per. Frequency formula and channel
  table confirmed on all four channels; most per-channel option bits are not yet bound
  (every channel on the reference radio has identical options, so there is no contrast).
  See CODEPLUG_BITMAP.md and FIELD_HELP_REFERENCE.md.

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
    doc: MPT1327 own number (BE16), e.g. 322 (radio 0x0F0B).
  channels:
    pos: 0x1e7
    type: channel
    repeat: expr
    repeat-expr: 4
    doc: |
      Conventional personality table at radio 0x0F67. 7-byte records; max 4 entries
      on a GM600. A record is valid while `marker` == 0x08 (the DPS field help notes
      Tx frequency 0 also marks end-of-entries).

types:
  channel:
    seq:
      - id: rx_raw
        type: u2
        doc: Rx frequency word (see rx_hz).
      - id: tx_raw
        type: u2
        doc: Tx frequency word (see tx_hz).
      - id: tx_pl_index
        type: u1
        doc: Tx PL (CTCSS) tone index; 0 = disabled. See FIELD_HELP_REFERENCE.md tone table.
      - id: rx_pl_index
        type: u1
        doc: Rx PL (CTCSS) tone index; 0 = disabled (inferred; 0 on reference radio).
      - id: marker
        type: u1
        doc: 0x08 for a present entry; table ends when != 0x08.
    instances:
      rx_hz:
        value: '375000000 + (rx_raw & 0x7fff) * (((rx_raw & 0x8000) != 0) ? 6250 : 5000)'
        doc: |
          Frequency in Hz. f = 375.000 MHz + (word & 0x7FFF) * step, where
          step = 6.25 kHz if bit15 set, else 5 kHz. Reference 375.000 MHz.
      tx_hz:
        value: '375000000 + (tx_raw & 0x7fff) * (((tx_raw & 0x8000) != 0) ? 6250 : 5000)'
      is_simplex:
        value: rx_raw == tx_raw
