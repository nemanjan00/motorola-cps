# Motorola CPS — Open Source Radio Programming

Open-source reimplementation of Motorola Customer Programming Software for legacy Commercial Series radios (CM/CP 040-380). These are abandonware radios that Motorola no longer supports.

## What This Does

- **Read/write .cps codeplug files** — the XOR-obfuscated XML format used by Motorola CPS
- **Program radios over serial** — ESBEP protocol via WebSerial (browser) or Node.js serialport
- **Edit all radio parameters** — channels, frequencies, PL/DPL tones, power, signaling, scan lists
- **Tuner functions** — softpot read/write, autotune, test mode
- **Validate codeplugs** — type checking, range validation, enum verification

## Supported Radios

### Commercial Series (ELP_ELM format)
| Radio | Type | Bands |
|-------|------|-------|
| CP040 | Portable | VHF, UHF |
| CP140 / CP160 / CP180 | Portable | VHF, UHF |
| CM140 / CM160 | Mobile | VHF, UHF |

### Commercial Series (S5T format)
| Radio | Type | Bands |
|-------|------|-------|
| CP340 / CP360 / CP380 | Portable | VHF, UHF |
| CM340 / CM360 | Mobile | VHF, UHF, Multi-Band |

## Quick Start

### Web App
```bash
cd app
npm install
npm run dev
# Opens at http://localhost:5173
```

Open a `.cps` file or connect a radio via WebSerial (Chrome/Edge 89+).

### Deploy to Render.com
Static site — build command: `cd app && npm install && npm run build`
Publish directory: `app/dist`

### Library (Node.js)
```js
import { readCpsFile, parseCodeplugXml, getFieldDef } from './lib/index.js';

// Read a .cps file
const xml = await readCpsFile('radio.cps');
const codeplug = parseCodeplugXml(xml);

// Get channel info
const rxFreq = codeplug.getField('CP_BLOCK', 'CP_RXFREQ');
console.log('RX Frequency:', rxFreq);

// Get field metadata with help text
const fieldDef = getFieldDef('CP_RXFREQ');
console.log(fieldDef.label);      // "Rx Frequency (MHz)"
console.log(fieldDef.inputType);   // "frequency"
console.log(fieldDef.help);        // "Selects a designated frequency..."
```

### Talk to a Radio (Browser)
```js
import { createWebSerialTransport, ESBEPSession, RadioSession } from './lib/index.js';

const port = await navigator.serial.requestPort();
const transport = await createWebSerialTransport(port);
const esbep = new ESBEPSession(transport);
const session = new RadioSession(esbep);

const info = await session.identify();
console.log('Model:', info.model, 'Serial:', info.serial);

const codeplug = await session.readCodeplug(info, (read, total) => {
  console.log(`${read}/${total} bytes`);
});
```

## Project Structure

```
lib/                    — JS library (pure ESM, zero dependencies)
  codeplug/             — Codeplug model, .cps file I/O, XML parser
  protocol/             — ESBEP serial protocol, WebSerial/Node transport
  binary/               — Binary codecs (CP_BLOCK fully mapped)
  data/                 — Field definitions, labels, help text, enums
app/                    — Vue 3 web app (dark theme, Vite)
docs/                   — Reverse engineering documentation
  CPS_EMEA_R05.15/      — Commercial Series protocol & data docs
  CPS_EMEA_GP300_R03.11.16/  — Professional/GP300 Series
  CPS_EMEA_WARIS_R06.12.05/  — Professional/Waris Series
```

## Technical Details

### .cps File Format
Every byte XOR'd with `0x95` = XML. Two XML schemas:
- `ELP_ELM_CODEPLUG` — CP040-CP180, CM140-CM160
- `S5T_CODEPLUG` — CP340-CP380, CM340-CM360

### ESBEP Serial Protocol
- RS-232: 9600/8/N/1, no flow control
- Frame: `[0xF0|len] [opcode] [data...] [checksum]`
- Checksum: `0xFF - sum(bytes)`
- Echo mode: radio echoes each byte before responding
- 6 command opcodes, 6 response opcodes, 16 query sub-commands

### EEPROM Layout
- Codeplug starts at offset 642
- VECT_BLOCK contains offsets for all data blocks
- ELP_ELM: 56 block types, 4/5-byte headers
- S5T: 32 block types, 5-byte headers

### Field Data
- 1368 field definitions (598 ELP_ELM + 770 S5T)
- 1214 verified Motorola labels (from reportenglish.mot)
- 144 fields with help text (from CPS CHM)
- 383 fields with observed enum values
- 30 CP_BLOCK fields with verified binary encoding

## Legal

This project documents protocols and file formats of abandonware radio software through clean-room reverse engineering. No Motorola binaries are distributed. Protocol specifications are functional facts not subject to copyright.

## License

MIT
