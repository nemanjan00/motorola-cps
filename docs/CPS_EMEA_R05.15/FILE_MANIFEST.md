# Motorola Commercial Series CPS R05.15 - File Manifest

> SHA-256 hashes for all files. Use this to identify identical files across CPS versions
> and avoid re-reversing unchanged binaries.

## CPS Version: R05.15 (EMEA)

---

## Core Binaries (Reverse Engineered)

| File | SHA-256 | Size | Description | Status |
|------|---------|------|-------------|--------|
| `cps.exe` | `d246fe85...4350ea44` | 3,141,632 | Main MFC GUI application | REVERSED |
| `cpscontroller.dll` | `ed3d29bb...36ecdbff` | 139,264 | Controller/mediator layer (16 exports) | REVERSED |
| `elpelmcpservices.dll` | `95240e67...62230ec` | 1,785,856 | Core COM business logic (ICPServices) | REVERSED |
| `esbepservices_dllpackage.dll` | `62e2333a...242b4edc` | 98,304 | ESBEP radio protocol | REVERSED |
| `serialcomm_dllpackage.dll` | `da3f5be9...a33653a3` | 110,592 | Serial port abstraction | REVERSED |
| `filehandle.dll` | `85fee831...4899f58b` | 126,976 | CPS/ADK file I/O | REVERSED |
| `xmlxslhandler.dll` | `6ecfac6e...c98be455` | 258,048 | ELP_ELM XML/XSL handler | REVERSED |
| `s5xmlxslhandler.dll` | `a8edafa6...fc0774c6` | 262,144 | S5T XML/XSL handler | REVERSED |
| `resourcemanager.dll` | `589d65a2...67dda15a` | 139,264 | Localization/resource manager | REVERSED |
| `xmlservices.dll` | `889b057e...ff9d34d8` | 131,072 | XML COM services | REVERSED |

## Third-Party Libraries (Not Reversed - Apache Xalan/Xerces)

| File | SHA-256 | Size | Library |
|------|---------|------|---------|
| `xerces-c_1_6_0.dll` | `863c3732...2b65f518` | 1,597,440 | Apache Xerces-C 1.6.0 |
| `XSLT.dll` | `4bda6950...fc12ba5c8` | 675,840 | Xalan XSLT |
| `XPath.dll` | `b2178c66...e5a5ddb` | 389,120 | Xalan XPath |
| `XMLSupport.dll` | `8645734b...d418bb4c` | 126,976 | Xalan XML Support |
| `XercesParserLiaison.dll` | `c61c5598...8481c9a5f8c` | 196,608 | Xalan-Xerces liaison |
| `PlatformSupport.dll` | `5a975608...87f90ce7` | 217,088 | Xalan Platform Support |
| `XalanSourceTree.dll` | `71801d1e...3541278e` | 143,360 | Xalan Source Tree |
| `XalanTransformer.dll` | `92c75731...689e97a7` | 81,920 | Xalan Transformer |
| `Harness.dll` | `58d6c757...ede6e77e` | 102,400 | Xalan Harness |
| `XalanDOM.dll` | `0c9533cc...cce008fe` | 49,152 | Xalan DOM |
| `DOMSupport.dll` | `7617ecde...5a53b0412` | 49,152 | Xalan DOM Support |
| `XalanExtensions.dll` | `3f58937b...a9f99cfe` | 32,768 | Xalan Extensions |
| `XPathCAPI.dll` | `b9daf7bb...4898168a` | 20,480 | Xalan XPath C API |
| `XPathWrapper.dll` | `8e7fc998...e57b8f99` | 28,672 | Xalan XPath Wrapper |
| `ICUBridge.dll` | `f2ef9352...93ba581` | 40,960 | Xalan ICU Bridge |

## Language/Localization DLLs

| File | SHA-256 | Size | Description |
|------|---------|------|-------------|
| `language/cps.exe` | `d246fe85...4350ea44` | 3,141,632 | **IDENTICAL to main cps.exe** |
| `language/guienglish.dll` | `e0eb8eb8...730a0f91` | - | GUI strings (English) |
| `language/guifrench.dll` | `f3d2c17c...275c0998` | - | GUI strings (French) |
| `language/guigerman.dll` | `27e5c97c...df3275f2` | - | GUI strings (German) |
| `language/guiitalian.dll` | `db522bc7...6446d739` | - | GUI strings (Italian) |
| `language/guirussian.dll` | `87134a66...ecc2933d` | - | GUI strings (Russian) |
| `language/guispanish.dll` | `86195b49...5ca4f121` | - | GUI strings (Spanish) |
| `language/rmenglish.dll` | `7d0e6f40...f987e4c2` | - | Resource manager (English) - **field names/enums** |
| `language/rmfrench.dll` | `a76fd94b...63167b70` | - | Resource manager (French) |
| `language/rmgerman.dll` | `8655b9c8...8f0965e3` | - | Resource manager (German) |
| `language/rmitalian.dll` | `07e4d01e...899b2ef3` | - | Resource manager (Italian) |
| `language/rmrussian.dll` | `6aee4279...f99afcc3` | - | Resource manager (Russian) |
| `language/rmspanish.dll` | `f57c4cab...782992e3` | - | Resource manager (Spanish) |

## Help Files

| File | SHA-256 | Size |
|------|---------|------|
| `language/elp_elm_cpsenglish.chm` | `4d9ff5ab...4e1d88ec` | - |
| `language/elp_elm_cpsfrench.chm` | `976b9af6...3b27271b` | - |
| `language/elp_elm_cpsgerman.chm` | `b9e7d865...d48fa7e9` | - |
| `language/elp_elm_cpsitalian.chm` | `af77352d...cbbdfb7d` | - |
| `language/elp_elm_cpsrussian.chm` | `cf84f4a6...ec037071` | - |
| `language/elp_elm_cpsspanish_emea.chm` | `7a16e817...39ecd14b` | - |

## Report Templates (Plaintext - Data Model Source)

| File | SHA-256 | Description |
|------|---------|-------------|
| `reports/pretransform.mot` | `9de95166...80009c76` | ELP_ELM pre-transform XSLT (field mappings) |
| `reports/s5pretransform.mot` | `d94b9903...814d3ebdfc` | S5T pre-transform XSLT |
| `reports/Detailed Report.xsl` | `78f08ed3...fca08cef` | ELP_ELM detailed report template |
| `reports/s5detailed report.xsl` | `01f13fae...73053b3c` | S5T detailed report template |
| `reports/Customer Handout.xsl` | `b42ff23d...97f31bce` | ELP_ELM customer handout |
| `reports/s5customer handout.xsl` | `3dbcd456...63557bf1` | S5T customer handout |
| `reports/Personalities Summary.xsl` | `3e3e198a...ca15e270` | ELP_ELM personalities summary |
| `reports/s5personalities summary.xsl` | `81311912...871fcd86` | S5T personalities summary |
| `reports/reportenglish.mot` | `9a9e828a...54b59111` | English string table |
| `reports/reportfrench.mot` | `7605d473...8cb00e86` | French string table |
| `reports/reportgerman.mot` | `680efc1b...d5d5013f` | German string table |
| `reports/reportitalian.mot` | `8345e3d2...bcd925c` | Italian string table |
| `reports/reportrussian.mot` | `dc8f5e8b...58339d101` | Russian string table |
| `reports/reportspanish_emea.mot` | `84463bca...fb1bb21b` | Spanish string table |
| `reports/picturelist.mot` | `99653b66...ddccc4dd` | Radio image path list |

## Documentation & Media

| File | SHA-256 | Description |
|------|---------|-------------|
| `readme.htm` | `6d6f40b9...584c237c` | Release notes (version history, supported OS) |
| `Apache Software License.txt` | `c141d323...81b3cdd3` | Xalan/Xerces license |
| `MOTOROLA_PAS_LEGAL_NOTICES_EULA_FILE-CPS.txt` | `d1dea11c...ef10caca` | EULA |
| `bonk.wav` | `b3213b2d...98be455` | Error sound |
| `ok.wav` | `aff481a5...8f19451` | Success sound |
| `splash.wav` | `71e8fe79...df0c993e` | Startup sound |

---

## Quick Hash Reference for Cross-Version Comparison

When you get a new CPS version, run:
```bash
sha256sum *.exe *.dll language/*.dll | sort -k2
```

Then diff against this file. Files with matching hashes are **identical** and don't need re-analysis.

### Priority Order for Changed Files

If a file's hash differs from this manifest, analyze in this order:

1. **elpelmcpservices.dll** - Most likely to have new blocks/fields (largest, most complex)
2. **cps.exe** - New GUI views = new radio models or features
3. **reports/pretransform.mot** + **s5pretransform.mot** - Plaintext, easy to diff, reveals new fields
4. **reports/*.xsl** - Plaintext, shows data model changes
5. **language/rmenglish.dll** - New field name strings and enumerations
6. **xmlxslhandler.dll** / **s5xmlxslhandler.dll** - XML schema changes
7. **cpscontroller.dll** - Rarely changes
8. **esbepservices_dllpackage.dll** - Protocol changes (rare)
9. **serialcomm_dllpackage.dll** - Almost never changes
10. **filehandle.dll** - Only if new file format support added

### Files That Are Almost Certainly Identical Across Versions

- Xalan/Xerces DLLs (third-party, version-locked to 1.6.0)
- `bonk.wav`, `ok.wav`, `splash.wav`
- `Apache Software License.txt`

### Notable: language/cps.exe == cps.exe

Hash `d246fe8516a72dae9f25dae96b5281098934b21a8de982b138fde71f4350ea44` is **shared** between `cps.exe` and `language/cps.exe` - they are identical copies.
