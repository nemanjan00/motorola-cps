# Motorola Professional Radio CPS R06.12.05 (Waris) - File Manifest

> SHA-256 hashes for all files. Use this to identify identical files across CPS versions
> and avoid re-reversing unchanged binaries.

## CPS Version: R06.12.05 (EMEA, MDC variant)

**Product**: Professional Radio - Customer Programming Software
**Supported Radios**: GP320, GP330, GP340, GP344, GP360, GP366, GP380, GP388, GM340, GM360, GM380
**Platform**: Win32, C++/MFC (ProRadio.exe + ADK 5.1 framework DLLs)

---

## Main Application

| File | SHA-256 | Description | Version |
|------|---------|-------------|---------|
| `ProRadio.exe` | `85311f99d941b7dd0d88f5f195fac089dd037a003dae77bcc6326cdf288081c8` | C++/MFC main GUI application (not VB6) | R06.12.05 |
| `Commpatch.dll` | `7172d0253528e5c0ae427341e03bc85543fc177ce86278d31b4d2159a35e89e3` | Communication patch | ? |

## Core ADK 5.1 DLLs (C++/MFC)

| File | SHA-256 | Description | FileVersion | ProductVersion |
|------|---------|-------------|-------------|----------------|
| `Fh41.dll` | `eb2185d6fde256febb5e917dd51072be1eea07eeb1c7ecd94332635da84d40e6` | File Handler (CFhFileHandler, CFhEncrypt) | R07.00.00.00 | R05.00.01.00 |
| `Prn41.dll` | `b36b649e8b2899708e0dc092770fb24bf05c841b7388a3e5d5c05779ddd60887` | Print/Report generation (ADK 5.1-SP1) | R07.00.01.00 | ADK 5.1 |
| `Rcg41.dll` | `a8a53f537487174a291ba67652754d6c007c6002f7ff256ba9f054ae04b65fbe` | Codeplug Generator (Ccg* framework) | R08.00.00.00 | R05.00.01.00 |
| `Rdb41.dll` | `ef1cbc68ba8efbece4d047db01a88f987751c03f5f82b01261a26c357f1c1647` | Radio Database (Amulet constraint model) | R07.00.01.00 | R05.00.01.00 |
| `Rud41.dll` | `bf6c4553d405f5dc26933e5b40644849d1e51600e877abee729c1277bc92ea30` | DB-UI Exchange (label says "Debug version") | R07.00.02.00 | R05.00.02.00 |
| `Rui41.dll` | `758d1d5195bc588062c60c3019a1dcad0450e84ba3f1991180828a3470548b1c` | Radio UI components (ADK 5.1 SP1) | R07.00.01.00 | R05.00.01.00 |
| `UdcDr41.dll` | `0abbd2872c22115aedcb0826d0bcf84092df9fbfa3962922908907b202a8e6eb` | UI-DB-CG Driver Exchange (ADK 5.1 SP1) | R06.00.01.00 | R05.00.01.00 |
| `pip41.dll` | `85e5e8a8c47227a4d9e0428711bdc58d12109afda6045b5edf6722950775d85a` | Object Instance Programming (ADK 5.1 SP4) | R07.00.01.00 | R05.01.04.00 |
| `udc41.dll` | `7243f43f6140f8a137c60e2a14ae83efa8d4dd20101ad4c6a330bfe00c713e9e` | UI-DB-CG Exchange (ADK 5.1 SP5) | R07.00.02.00 | R05.00.01.00 |

## Communication DLLs (COM Servers)

| File | SHA-256 | COM ProgID | Description | FileVersion |
|------|---------|-----------|-------------|-------------|
| `VComSbep.dll` | `967fc313f957f383564cd2f2999098dcc3d5cef63948c0e6f72a9aa339aec0f7` | Protocol.Motorola.Sbep | SBEP Virtual Protocol Driver Extension | R05.00.01.00 |
| `VComESbp.dll` | `e91bb9aa7b783b07c6e7e4460f1af203f91d558412e371217da3ea5e978b2f81` | Protocol.Motorola.ESbep | ESBEP Virtual Protocol Driver Extension | R05.00.00.00 |
| `VcomSb96.dll` | `10cceb229a78951c128e992759efd9910c53bee6ce0fae18e5c297a896bb0b44` | Protocol.Motorola.Sb9600 | SB9600 Virtual Protocol Driver Extension | R05.00.02.00 |
| `mcomProRad.dll` | `0baf19bd43bb49b361b9f4615542b497e98cd907b23cfc771a62c2326344da2e` | Radio.Motorola.Waris | Waris Portable VirtualRadio (MOTdotCOMM) | R01.00.02 |
| `mcomProRadMob.dll` | `9dc05d36a9e0793c6dd94b52fcd9abed988823434ee3c8baa6bf2e1b5f6e8ed1` | Radio.Motorola.WarisMobile | Waris Mobile VirtualRadio (MOTdotCOMM) | R01.00.01 |
| `mcomProRadNew.dll` | `4fcb8b80b8717c60d022849f07a5e8391bd659c3019c2ab5263dbcf5a0f80002` | Radio.Motorola.Waris | Updated Portable VirtualRadio (MOTdotCOMM) | R01.00.02 |
| `mcomProRadMobnew.dll` | `0b713db2e6ec379fff4a4f03a66dc97236694c2c067986d4ee36b3aa87881c02` | Radio.Motorola.WarisMobile | Updated Mobile VirtualRadio (MOTdotCOMM) | R01.00.01 |
| `mcomUnknown.dll` | `291ff025367a632a4a50f80527f036815629fc1ff5e0c6cca0a52fbc4d5aca90` | (unknown) | Unknown VirtualRadio (fallback handler) | R03.00.00.00 |

## Win64 Support

| File | SHA-256 | Description |
|------|---------|-------------|
| `DrvInstall.dll` | `c804cb2372ba474a3d6d6c4f4fa5b942d027e897bd1126998b3cdbb7fce17da5` | Driver installer |
| `commsbepx64_setup.exe` | `0ba924aa08c0a9c54eb4a7cae42c8e7f022c27de336aaca3e145ed2436262e2d` | SBEP x64 driver setup |

## RDK Extension DLLs (extracted from "RDK DLLS" InstallShield group)

| File | SHA-256 | Description |
|------|---------|-------------|
| `ruiX41.dll` | `e447b048af03b5eee8f6d1f19cec71492d3a325d19d9d8ac1e9b49fc322e630f` | RDK UI extension — file dialogs (CUiFileDlg, CUiPortDlg, strUiFileDlgInfo) |
| `udcrX41.dll` | `7d130341202fbac37ed4e58d89416a6e856a76c6bdc7e0054bb02eedfec6ef5d` | RDK UDC driver extension — device UUID, port selection, temp file creation |
| `udcX41.dll` | `a52ce79ed46d5e7e8bb88d172643f4a9e7e2021dc8919b7300b87f11b3f59f24` | RDK UDC extension — file dialogs with codeplug metadata (CudcRdkFileDlg) |

## Additional ADK DLLs

Note: `pip41.dll` and `udc41.dll` are in the main files directory (not a separate "Incompatible" subfolder as initially expected). They are core ADK components:
- `pip41.dll` = Object Instance Programming DLL (ADK 5.1 SP4)
- `udc41.dll` = UI-DB-CG Exchange DLL (ADK 5.1 SP5)

---

## Cross-Version Hash Comparison

### Files shared with GP300 CPS R03.09.03 / R03.11.16 (identical hashes)

| Waris R06.12.05 | GP300 R03.x | Implication |
|-----------------|-------------|-------------|
| `mcomProRad.dll` | `mcomProRad.dll` | Same portable radio protocol since R03.09.03 |
| `mcomProRadMob.dll` | `mcomProRadMob.dll` | Same mobile radio protocol since R03.09.03 |
| `commsbepx64_setup.exe` | (R03.11.16 only) | Identical x64 driver |
| `DrvInstall.dll` | (R03.11.16 only) | Identical driver installer |

### Files unique to Waris R06.12.05

- `ProRadio.exe` (renamed from `gp300.exe`)
- All `*41.dll` files (upgraded from `*30.dll` series)
- `mcomProRadNew.dll`, `mcomProRadMobnew.dll` (new radio variants)
- `Commpatch.dll`

### GP300 "Extra" DLLs — NOT removed, still present as 41-series

GP300 had: `pip30.dll`, `udc30.dll`, `udcX30.dll`, `udcrX30.dll`, `ruiX30.dll`

These evolved to 41-series equivalents still imported by ProRadio.exe:
- `pip30.dll` → `pip41.dll` (captured in Incompatible_Waris_DLLs)
- `udc30.dll` → `udc41.dll` (captured in Incompatible_Waris_DLLs)
- `udcX30.dll` → `udcX41.dll` (extracted from "RDK DLLS" InstallShield group)
- `udcrX30.dll` → `udcrX41.dll` (extracted from "RDK DLLS" InstallShield group)
- `ruiX30.dll` → `ruiX41.dll` (extracted from "RDK DLLS" InstallShield group)
