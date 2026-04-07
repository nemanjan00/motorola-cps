# CPS Reverse Engineering Process Guide

> Step-by-step procedures for identifying, triaging, diffing, and reversing
> new CPS versions. Written so any RE can pick up where the last session left off.

---

## Table of Contents

1. [Version Identification](#1-version-identification)
2. [Binary Inventory & Hashing](#2-binary-inventory--hashing)
3. [Cross-Version Diffing](#3-cross-version-diffing)
4. [Plaintext Diffing (Reports/XSL)](#4-plaintext-diffing-reportsxsl)
5. [Codeplug Sample Diffing](#5-codeplug-sample-diffing)
6. [Binary RE of Changed DLLs](#6-binary-re-of-changed-dlls)
7. [Documenting Results](#7-documenting-results)
8. [Tool Reference](#8-tool-reference)

---

## 1. Version Identification

When a new CPS folder lands in `triage/`, the first task is to identify exactly what it is.

### Step 1a: Identify the radio family

Two distinct families exist with completely different architectures:

| Indicator | Commercial Series (CM/CP) | Professional/Waris (GP/GM) |
|-----------|--------------------------|---------------------------|
| Main EXE | `cps.exe` (C++/MFC) | `ProRadio.exe` or `gp300.exe` (C++/MFC) |
| File format | `.cps` (XOR 0x95 → XML) | `.cpg` (LCG stream cipher → binary) |
| Codeplug | XML (ELP_ELM / S5T) | Binary (Ccg framework) |
| Protocols | ESBEP only | SBEP + ESBEP + SB9600 |
| DLL naming | No suffix | `*30.dll` (GP300) or `*41.dll` (Waris) |
| Installer | InstallShield (data1.cab) | InstallShield or self-extracting EXE |

### Step 1b: Read PE version info

**Commercial Series:**
```bash
r2 -qc "iV" triage/<folder>/cps.exe
```

**Professional/Waris Series:**
```bash
# May be ProRadio.exe, gp300.exe, or inside an installer
r2 -qc "iV" triage/<folder>/ProRadio.exe    # Waris
r2 -qc "iV" triage/<folder>/gp300.exe       # GP300
```

If the triage folder contains an InstallShield installer (data1.cab), extract first:
```bash
# Build unshield if needed
cd /tmp && git clone https://github.com/twogood/unshield.git && cd unshield && cmake -B build . && cmake --build build -j$(nproc)
# Extract
/tmp/unshield/build/src/unshield -d /tmp/extract/<name> x triage/<folder>/data1.cab
```

If the triage folder contains self-extracting EXEs (e.g., GP300_Application_EMEA_EN.exe):
```python
# Find embedded InstallShield cabs by ISc( signature
python3 -c "
data = open('file.exe','rb').read()
pos = 0
while True:
    pos = data.find(b'ISc(', pos)
    if pos == -1: break
    print(f'ISc( at 0x{pos:x}')
    pos += 1
"
# Extract the largest segment, then use unshield on it
```

Look for these fields:

| Field | What it tells you | Example |
|-------|-------------------|---------|
| `ProductVersion` | CPS release version | `R05.15`, `R06.12.05` |
| `FileVersion` | Build number | `05.15`, `6.5.3.0` |
| `InternalName` | Region/variant | `CPS EMEA`, `CPS NA` |
| `Comments` | Platform tag | `ELP/ELM CPS` |
| `LegalCopyright` | Date range | `2002-2011` |

### Step 1b: Determine region

The `InternalName` field usually says `CPS EMEA`, `CPS NA`, etc. If it doesn't, check strings:

```bash
r2 -qc "iz~EMEA\|North America\|Latin\|APAC\|Japan" triage/<folder>/cps.exe
```

Or look at the readme.htm if present — it often states the region explicitly.

### Step 1c: Check for sub-versions in language DLLs

Language DLLs sometimes have newer versions than the main exe (patched independently):

```bash
for f in triage/<folder>/language/gui*.dll triage/<folder>/language/rm*.dll; do
  echo "=== $(basename $f) ==="; r2 -qc "iV" "$f" 2>/dev/null | grep -i version
done
```

### Step 1d: Assign the canonical name

```
CPS_{REGION}_{VERSION}              — Commercial Series (family omitted)
CPS_{REGION}_{FAMILY}_{VERSION}     — Professional/Waris
TUNER_{TYPE}_{VERSION}              — Tuner tools
```

Use the `ProductVersion` from the main EXE. Examples:
- `CPS_EMEA_R05.15` — Commercial Series
- `CPS_EMEA_GP300_R03.11.16` — Professional/GP300 Series
- `CPS_EMEA_WARIS_R06.12.05` — Professional/Waris Series
- `TUNER_PRO_R02.05.00` — Professional Tuner

If the ProductVersion has both R and D prefixed DLLs, use the cps.exe version as the canonical name.

---

## 2. Binary Inventory & Hashing

### Step 2a: Hash everything

```bash
cd triage/<folder>
sha256sum *.exe *.dll 2>/dev/null | sort -k2 > /tmp/new_hashes.txt
sha256sum language/*.dll 2>/dev/null | sort -k2 >> /tmp/new_hashes.txt
sha256sum reports/*.xsl reports/*.mot 2>/dev/null | sort -k2 >> /tmp/new_hashes.txt
```

### Step 2b: Get file sizes and PE info in one pass

```bash
for f in *.exe *.dll; do
  SIZE=$(stat -c%s "$f")
  VER=$(r2 -qc "iV" "$f" 2>/dev/null | grep ProductVersion | head -1 | awk '{print $NF}')
  echo "$f  $SIZE  $VER  $(sha256sum "$f" | cut -c1-16)"
done
```

### Step 2c: Identify new/removed files

Compare the file list against the closest known version:

```bash
# List files in new version
ls *.exe *.dll language/*.dll reports/* 2>/dev/null | sort > /tmp/new_files.txt

# List files from known version
ls /path/to/processed/CPS_EMEA_R05.15/files/*.exe \
   /path/to/processed/CPS_EMEA_R05.15/files/*.dll \
   /path/to/processed/CPS_EMEA_R05.15/files/language/*.dll \
   /path/to/processed/CPS_EMEA_R05.15/files/reports/* 2>/dev/null \
   | xargs -I{} basename {} | sort > /tmp/old_files.txt

diff /tmp/old_files.txt /tmp/new_files.txt
```

New files = new functionality. Removed files = deprecated features.

---

## 3. Cross-Version Diffing

### Step 3a: Hash-based triage

Compare SHA-256 hashes to instantly identify identical, changed, and new files:

```bash
# Extract just "hash  filename" from both versions
# Assumes FILE_MANIFEST.md has raw hashes at bottom, or regenerate from bins:
sha256sum processed/CPS_EMEA_R05.15/files/*.exe processed/CPS_EMEA_R05.15/files/*.dll \
  | awk '{print $1, $2}' | sed 's|.*/||' | sort -k2 > /tmp/old_hashes.txt

sha256sum triage/<folder>/*.exe triage/<folder>/*.dll \
  | awk '{print $1, $2}' | sed 's|.*/||' | sort -k2 > /tmp/new_hashes.txt

# Three-way diff: identical / changed / new
join -j2 /tmp/old_hashes.txt /tmp/new_hashes.txt | awk '{
  if ($2 == $3) print "IDENTICAL:", $1
  else print "CHANGED:", $1
}'

# Files only in new version
comm -13 <(awk '{print $2}' /tmp/old_hashes.txt) <(awk '{print $2}' /tmp/new_hashes.txt)

# Files only in old version (removed)
comm -23 <(awk '{print $2}' /tmp/old_hashes.txt) <(awk '{print $2}' /tmp/new_hashes.txt)
```

**If a file's hash matches, it is byte-identical. Do not re-analyze it.**

### Step 3b: PE version comparison for changed files

For each changed DLL, compare version info:

```bash
echo "=== OLD ===" && r2 -qc "iV" processed/CPS_EMEA_R05.15/files/elpelmcpservices.dll
echo "=== NEW ===" && r2 -qc "iV" triage/<folder>/elpelmcpservices.dll
```

### Step 3c: Export diffing

Exports rarely change, but when they do it means new API surface:

```bash
r2 -qc "iE" processed/CPS_EMEA_R05.15/files/elpelmcpservices.dll | sort > /tmp/old_exports.txt
r2 -qc "iE" triage/<folder>/elpelmcpservices.dll | sort > /tmp/new_exports.txt
diff /tmp/old_exports.txt /tmp/new_exports.txt
```

### Step 3d: Import diffing

New imports reveal new OS/library API usage:

```bash
r2 -qc "ii" old.dll | awk '{print $NF}' | sort > /tmp/old_imports.txt
r2 -qc "ii" new.dll | awk '{print $NF}' | sort > /tmp/new_imports.txt
diff /tmp/old_imports.txt /tmp/new_imports.txt
```

### Step 3e: String diffing

The fastest way to find new features, field names, error messages:

```bash
r2 -qc "iz" old.dll | awk -F' ' '{$1=$2=$3=""; print substr($0,4)}' | sort > /tmp/old_strings.txt
r2 -qc "iz" new.dll | awk -F' ' '{$1=$2=$3=""; print substr($0,4)}' | sort > /tmp/new_strings.txt
diff /tmp/old_strings.txt /tmp/new_strings.txt
```

New strings often directly name new features: new block names, new field names, new radio models, new error messages.

### Step 3f: Binary-level diffing with radare2

For a changed DLL where you need to understand _what code changed_:

```bash
# Generate function list with sizes from both versions
r2 -qc "aaa; afl" old.dll > /tmp/old_functions.txt
r2 -qc "aaa; afl" new.dll > /tmp/new_functions.txt

# Compare function counts
echo "Old: $(wc -l < /tmp/old_functions.txt) functions"
echo "New: $(wc -l < /tmp/new_functions.txt) functions"

# r2 binary diff mode — compares two binaries function-by-function
r2 -qc "aaa" -AA old.dll
# Then in r2: `radiff2 -AA old.dll new.dll` for function-level diff
```

Using `radiff2` (ships with radare2):

```bash
# Byte-level diff (noisy, but catches everything)
radiff2 old.dll new.dll

# Function-level diff (more useful)
radiff2 -AA old.dll new.dll

# Show only changed functions
radiff2 -AA -C old.dll new.dll
```

### Step 3g: Section size comparison

Quick check for major structural changes:

```bash
r2 -qc "iS" old.dll | grep -E "\.text|\.data|\.rdata|\.rsrc"
r2 -qc "iS" new.dll | grep -E "\.text|\.data|\.rdata|\.rsrc"
```

A significantly larger `.text` section = new code. Larger `.rdata` = new strings/constants. Larger `.rsrc` = new resources (dialogs, icons, string tables).

---

## 4. Plaintext Diffing (Reports/XSL)

The report templates and pretransform files are **plaintext XML/XSL** and are the
easiest source of data model changes. Always diff these first.

### Step 4a: Pretransform files

These define computed fields and value mappings — new fields show up here:

```bash
diff processed/CPS_EMEA_R05.15/files/reports/pretransform.mot \
     triage/<folder>/reports/pretransform.mot

diff processed/CPS_EMEA_R05.15/files/reports/s5pretransform.mot \
     triage/<folder>/reports/s5pretransform.mot
```

Look for:
- New `<xsl:variable>` or `<xsl:template>` definitions = new fields
- New `<xsl:when>` cases in existing templates = new enum values
- Changed frequency tables = new band support
- New `X_` prefixed fields = new computed display values

### Step 4b: Report XSL templates

```bash
diff processed/CPS_EMEA_R05.15/files/reports/"Detailed Report.xsl" \
     triage/<folder>/reports/"Detailed Report.xsl"

diff processed/CPS_EMEA_R05.15/files/reports/"s5detailed report.xsl" \
     triage/<folder>/reports/"s5detailed report.xsl"
```

New `<xsl:value-of select="...">` paths directly reveal new XML data model fields.

### Step 4c: String tables

```bash
diff processed/CPS_EMEA_R05.15/files/reports/reportenglish.mot \
     triage/<folder>/reports/reportenglish.mot
```

New `^NNNN^` entries = new localized field labels. The token number range hints at
which section the field belongs to (see FILE_MANIFEST.md for range map).

### Step 4d: Picture list

```bash
diff processed/CPS_EMEA_R05.15/files/reports/picturelist.mot \
     triage/<folder>/reports/picturelist.mot
```

New entries = new radio models with product images.

---

## 5. Codeplug Sample Diffing

### Step 5a: Decode .cps files

All .cps files are XOR'd with `0x95`. Decode to XML:

```python
#!/usr/bin/env python3
import sys
with open(sys.argv[1], 'rb') as f:
    data = f.read()
sys.stdout.buffer.write(bytes(b ^ 0x95 for b in data))
```

Save as `decode_cps.py`, then:

```bash
python3 decode_cps.py "triage/<folder>/Sample CM340 UHF1.cps" > /tmp/new_cm340.xml
python3 decode_cps.py "processed/CPS_EMEA_R05.15/files/Sample CM340 UHF1.cps" > /tmp/old_cm340.xml
diff /tmp/old_cm340.xml /tmp/new_cm340.xml
```

### Step 5b: What to look for in codeplug diffs

- New XML elements = new data blocks or fields
- Changed `ENTRY_SIZE` / `ENTRY_QUANTITY` = block structure changed
- New block presence flags in `TC_BLOCK` / `S5_TYPE_CONTROL_BLOCK`
- New vectors in `VECT_BLOCK` / `S5_VECTOR_BLOCK` = new EEPROM regions
- Changed ID attributes = field renumbering (important for protocol compat)
- New `TYPE="1"` fields = new user-configurable settings

### Step 5c: Compare across same model, different versions

If both CPS versions ship the same sample radio (e.g., "Sample CM340 UHF1.cps"),
diffing the decoded XML gives you a precise changelog of the data model.

If the new version has samples for models that didn't exist before, those are
entirely new radio support — decode and document from scratch.

---

## 6. Binary RE of Changed DLLs

Only do full RE on files that actually changed (hash mismatch) and where the
plaintext diffs don't fully explain the changes.

### Priority order

| Priority | File | Why |
|----------|------|-----|
| 1 | `elpelmcpservices.dll` | Largest, most complex — all block/field definitions |
| 2 | `cps.exe` | New views = new radio models or feature UIs |
| 3 | `xmlxslhandler.dll` / `s5xmlxslhandler.dll` | XML schema handling changes |
| 4 | `language/rmenglish.dll` | New field name strings and enum values |
| 5 | `cpscontroller.dll` | Rarely changes — new exports = new operations |
| 6 | `esbepservices_dllpackage.dll` | Protocol changes (very rare) |
| 7 | `serialcomm_dllpackage.dll` | Almost never changes |
| 8 | `filehandle.dll` | Only if new file format support added |

### Step 6a: Targeted string analysis

Start with strings — they're the fastest path to understanding changes:

```bash
# Extract strings from changed DLL
r2 -qc "iz" new.dll | sort > /tmp/new_strings.txt

# Diff against old version strings
diff /tmp/old_strings.txt /tmp/new_strings.txt | grep "^>" | head -50
```

New strings containing `BLOCK`, `_BLOCK`, field-name patterns (UPPER_SNAKE_CASE) =
new data model additions. Search for these in the decompiled code.

### Step 6b: Function-level analysis with Ghidra decompiler

```bash
# Open in r2 with full analysis
r2 -AA new.dll

# Inside r2:
afl                          # List all functions
afl~new_func_name            # Search for specific function
s <address>                  # Seek to function
pdg                          # Ghidra decompile current function
pdf                          # r2 disassembly (if pdg fails)
```

### Step 6c: Focus on new/changed functions

If you have function lists from both versions (step 3f), focus decompilation on:

1. Functions that exist in new but not old = entirely new code
2. Functions at same name/export but different size = modified logic
3. Functions near new strings (use `axt` to find xrefs to string addresses)

```bash
# In r2, find where a new string is referenced:
iz~NEW_FIELD_NAME            # Find string address
axt @addr                    # Find code that references it
s @xref_addr                 # Seek to referencing function
pdg                          # Decompile
```

### Step 6d: COM interface changes (elpelmcpservices.dll)

This DLL exposes `ICPServices` via COM. If the vtable changed:

```bash
# Look for new method names in strings
r2 -qc "iz~Get\|Set\|Add\|Delete\|Query\|Read\|Write" new_elpelmcpservices.dll
```

New `GetFieldAt` / `SetFieldAt` targets = new block names that can be accessed via
the COM interface.

### Step 6e: Protocol changes (esbepservices_dllpackage.dll)

Only needed if this DLL's hash changed (rare). Look for:

```bash
# New opcodes
r2 -qc "iz~0x" new_esbepservices.dll

# New IoControl command strings
r2 -qc "iz~QUERY\|SET\|RESET" new_esbepservices.dll
```

Compare against known commands (documented in PROTOCOL_AND_STRUCTS.md).

---

## 7. Documenting Results

### For a new version with minor changes

Create `docs/CPS_{REGION}_{VERSION}/` with:

- `FILE_MANIFEST.md` — full hash table (always, even if most files are identical)
- `DELTA.md` — what changed vs. the closest known version:
  - Which files changed (hash mismatches)
  - New/removed files
  - New fields, blocks, radio models discovered
  - Any protocol changes
  - New enum values or field ranges

Don't duplicate the full PROTOCOL_AND_STRUCTS.md unless the changes are extensive.
Reference the closest version's docs for unchanged parts.

### For a new version with major changes (new platform, new region)

Create full documentation set:

- `FILE_MANIFEST.md`
- `PROTOCOL_AND_STRUCTS.md` (or `DELTA.md` if mostly inherited)
- `CPS_VERSIONS_AND_RADIOS.md` (if new radio models)

### Template for DELTA.md

```markdown
# CPS_{REGION}_{VERSION} — Delta from CPS_{BASE_REGION}_{BASE_VERSION}

## Version Info
- Product Version: ...
- File Version: ...
- Region: ...
- Copyright: ...

## File Changes

### Identical (hash match)
- cpscontroller.dll
- serialcomm_dllpackage.dll
- ...

### Changed
| File | Old Hash (first 16) | New Hash (first 16) | Old Ver | New Ver |
|------|---------------------|---------------------|---------|---------|
| elpelmcpservices.dll | 95240e6759... | abcdef0123... | 05.13 | 05.14 |

### New Files
- newfile.dll — description

### Removed Files
- oldfile.dll — was: description

## Data Model Changes

### New Blocks
- `NEW_BLOCK` (ID=NNN) — description, fields: ...

### New Fields in Existing Blocks
- `CP_BLOCK.CP_NEWFIELD` (ID=NNN) — description, type, range

### New Enum Values
- `CP_TXSIGTYPE` now includes "NewSignaling" option

## Protocol Changes
(if any — usually "None")

## New Radio Models
| Model | Part Numbers | Band |
|-------|-------------|------|
| CM999 | M50KNC9AA3AN | VHF2 |
```

---

## 8. Tool Reference

### radare2 commands used in this workflow

| Command | Purpose |
|---------|---------|
| `r2 -qc "iV" file` | PE version info (product version, file version, copyright) |
| `r2 -qc "iE" file` | List exports |
| `r2 -qc "ii" file` | List imports |
| `r2 -qc "iS" file` | List sections (sizes reveal structural changes) |
| `r2 -qc "iz" file` | List strings (fastest RE technique) |
| `r2 -qc "aaa; afl" file` | Full analysis + function list |
| `r2 -AA file` then `pdg` | Ghidra decompile current function |
| `r2 -AA file` then `axt @addr` | Find cross-references to address |
| `radiff2 -AA old new` | Function-level binary diff |
| `radiff2 -C old new` | Show only changed functions |

### Python one-liners

```python
# Decode Commercial Series .cps file (XOR 0x95 → XML)
python3 -c "import sys; d=open(sys.argv[1],'rb').read(); sys.stdout.buffer.write(bytes(b^0x95 for b in d))" file.cps > file.xml

# Encode XML back to .cps
python3 -c "import sys; d=open(sys.argv[1],'rb').read(); sys.stdout.buffer.write(bytes(b^0x95 for b in d))" file.xml > file.cps

# Decode Professional/Waris .cpg file (LCG stream cipher)
python3 << 'PYEOF'
import sys

def decrypt_cpg(path):
    with open(path, "rb") as f:
        data = f.read()
    # MotHeader is 800 bytes (0x320)
    header = data[:0x320]
    model = header[0x1C:0x30].decode('ascii', errors='replace').strip()
    encrypted = data[0x320:]
    if len(encrypted) < 10:
        return header, model, b""
    # LCG: next = (state * 85 + 25) & 0xFF
    def lcg(s): return (s * 85 + 25) & 0xFF
    # Key from 9-byte random padding
    key_seed = (encrypted[5] + encrypted[6] - encrypted[8]) & 0xFF
    state = lcg(key_seed)
    xor_key = state
    decrypted = bytearray()
    i, escape = 9, False
    while i < len(encrypted):
        b = encrypted[i]; i += 1
        if escape:
            escape = False
            pt = (0x1A if b == 0xE5 else 0x1B) ^ xor_key
            ro = lcg(state); state = ro; xor_key = (pt + ro + xor_key) & 0xFF
            decrypted.append(pt & 0xFF)
        elif b == 0x1B: escape = True
        else:
            pt = b ^ xor_key
            ro = lcg(state); state = ro; xor_key = (pt + ro + xor_key) & 0xFF
            decrypted.append(pt & 0xFF)
    return header, model, bytes(decrypted)

header, model, codeplug = decrypt_cpg(sys.argv[1])
print(f"Model: {model}, Codeplug: {len(codeplug)} bytes", file=sys.stderr)
sys.stdout.buffer.write(codeplug)
PYEOF

# Compare two .cps files as XML
python3 -c "
import sys
def dec(f): return bytes(b^0x95 for b in open(f,'rb').read())
a,b = dec(sys.argv[1]), dec(sys.argv[2])
if a == b: print('IDENTICAL')
else:
    for i,(x,y) in enumerate(zip(a,b)):
        if x != y: print(f'First diff at byte {i}: {x:#x} vs {y:#x}'); break
    print(f'Size: {len(a)} vs {len(b)}')
" old.cps new.cps
```

### Shell one-liners

```bash
# Quick hash comparison between two CPS directories
diff <(cd old_dir && sha256sum *.dll *.exe | sort -k2) \
     <(cd new_dir && sha256sum *.dll *.exe | sort -k2)

# Count changed files
diff <(cd old_dir && sha256sum *.dll *.exe | sort -k2) \
     <(cd new_dir && sha256sum *.dll *.exe | sort -k2) | grep "^[<>]" | wc -l

# Extract all field-like strings (UPPER_SNAKE_CASE) from a DLL
r2 -qc "iz" file.dll | grep -oE '[A-Z][A-Z0-9_]{3,}' | sort -u
```

---

## Appendix A: Files That Almost Never Change (Commercial Series)

These can usually be skipped entirely unless their hash changes:

- All Xalan/Xerces DLLs (third-party Apache libraries, version-locked)
- `bonk.wav`, `ok.wav`, `splash.wav` (sound effects)
- `Apache Software License.txt`
- `serialcomm_dllpackage.dll` (very stable serial layer)
- `esbepservices_dllpackage.dll` (protocol rarely changes)
- `language/cps.exe` (always identical to main `cps.exe`)

## Appendix B: Professional/Waris Series RE Notes

### Architecture differences from Commercial Series

- **No XML** — codeplug is pure binary, uses Ccg framework (Rcg41.dll/Rcg30.dll)
- **Amulet framework** — Rdb41.dll is a pure database engine (Carnegie Mellon Am_* classes), NOT a radio database. Radio model data is in ProRadio.exe, Rcg41.dll, and mcom*.dll.
- **Rud41.dll** is UI framework (tree views, property sheets), NOT upload/download logic. Pack/unpack transforms are in ProRadio.exe (90+ functions) registered via CudcDbCgXchg::Add in udc41.dll.
- **DLL suffix 30 vs 41** — GP300 CPS uses *30.dll, Waris uses *41.dll. Same API, evolved internals.
- **COM radio abstraction** — `Radio.Motorola.Waris` (portable), `Radio.Motorola.WarisMobile` (mobile)

### Key formulas (decompiled)

- **Frequency**: `freq_MHz = (LVRIS_base * 5 + cp_value) / 200.0`
- **Base frequency**: `base_freq_MHz = cp_value * 0.025`
- **CTCSS tone**: `cp_value = tone_freq * 10.0`
- **Step sizes**: {2.5, 3.125, 5.0, 6.25} kHz indexed 0-3

### Codeplug structure

EEPROM base address `0x0280`. Decrypted .cpg data IS raw EEPROM from this address.
- Config Info: 2 bytes (byte 0 bits 7-4 = version index, bit 0 = config length)
- Type Control Block: bit array of present blocks
- Vector Block: near END of codeplug (not start like Commercial), 52-54 BE uint16 entries
- Global checksum: `sum(all_bytes) mod 256 = 0x0E` (verified across 658 Waris samples)

### Part number encoding (from .cpg MotHeader, offset 0x1C)

```
H 25 KD C 9 AN 3
│ │  │  │ │ │  └─ Model tier (0=GP320...9=GP388)
│ │  │  │ │ └──── Market (AN=GP300 EMEA, AA=Waris EMEA)
│ │  │  │ └────── Channel capacity (4/6/9 = 4/6/16ch)
│ │  │  └──────── Feature level (A=basic...N=LS Trunking)
│ │  └─────────── Band (BE=LB1, CE=LB2, KD=VHF, RD=UHF1, SD=UHF2, UC=800MHz)
│ └────────────── Chassis (25=main, 38=old mobile, 55=display)
└──────────────── Form (H=Portable, M=Mobile)
```

### Open questions

- **Tuner vs CPS opcode naming**: Both send same bytes to radio, but use different names for opcodes 0x1b (CPS=TUNE_PARAMS, Tuner=TestMode), 0x21 (CPS=CHANNEL, Tuner=SoftpotRW), 0x22 (CPS=TESTMODE, Tuner=AutoTune). Radio firmware not reversed — exact per-opcode behavior unknown.
- **Tuner opcode 0x28** (ChannelRequest): Used by tuner for channel steering during alignment, not registered in CPS ESBEP opcode map. May be supported by radio firmware but not exposed through CPS.
