# Motorola GP300 Series CPS R03.11.16 - File Manifest

> SHA-256 hashes for all files. Final release of GP300 CPS.
> Also documents R03.09.03 as a baseline for comparison.

## CPS Version: R03.11.16 (EMEA English, 5-Tone, last version)

**Kit Number**: ENVN4005Z (EMEA English) / ENLN4115U (multi-language)
**Product**: Professional GP300/GM300 Series CPS
**Supported Radios**: GP320, GP329(+), GP330, GP339(+), GP340, GP344, GP360, GP366R, GP380, GP388, GM340, GM360, GM380, GM339, GM399, PRO5250, PRO7250
**Platform**: Win32, VB6 + C++/MFC DLLs (ADK 5.1 framework)

---

## Main Application

| File | SHA-256 | R03.09.03 Match | Description |
|------|---------|-----------------|-------------|
| `gp300.exe` | `9c2c3c2f910125d51f44a38c218e94a471f83eae13fd4b30bc0c79896d6a642f` | **CHANGED** (was `d6720b...`) | Main CPS application |
| `ComTool.exe` | `c5d9f0edd388a49a7528e3d4255b0ff6a045e37eb212b837cc5917bffd1448f5` | Same | Serial comm diagnostic tool |
| `CpsHelp.dll` | `4d9d1931d7408d76a994bf95dd47233ac7e007c045a638a47f5cea960dc3119b` | Same | Help system |

## New in R03.11.16 (not in R03.09.03)

| File | SHA-256 | Description |
|------|---------|-------------|
| `CommPatch.dll` | `91e829443cd8cd821c475f5043255c3fb5f3b075f86682eb12c909dd2945bf82` | Communication compatibility patch |
| `DrvInstall.dll` | `c804cb2372ba474a3d6d6c4f4fa5b942d027e897bd1126998b3cdbb7fce17da5` | Driver installer (Win7 support) |
| `commsbepx64_setup.exe` | `0ba924aa08c0a9c54eb4a7cae42c8e7f022c27de336aaca3e145ed2436262e2d` | SBEP driver for 64-bit Windows |

## Core DLLs (ADK 5.1, "30" series — ALL IDENTICAL between R03.09.03 and R03.11.16)

| File | SHA-256 | Description |
|------|---------|-------------|
| `Fh30.dll` | `aec19e86d684c4b25cd3ea64081e9f142212bc67e956a70d2bfa3aa4dbc66127` | File Handler |
| `Prn30.dll` | `6b49ba4bf3ec4be339765d01f1c4548aeb5fabb8f8a8d7c98f6c5baa357b6dbf` | Print/Report |
| `Rcg30.dll` | `a0fb1ae71ed748f1862511e76beb239e60d125c49c2ac32c123729b18ec01880` | Codeplug Generator |
| `Rdb30.dll` | `bc25b745c691c4faf6b6db7ad98129e2c615ea5a2f8de85854d16c8e2b5c8a84` | Radio Database |
| `Rud30.dll` | `0d3ab72e73e13d46d15778e3aa5dc87887ae83e2ab9a7a320396d12716912b25` | Radio Upload/Download |
| `Rui30.dll` | `aa67d84e7c4df90c1255d59c4211f9bde2edffb2ca5229116075f95afe2193a0` | Radio UI |
| `UdcDr30.dll` | `792274432f83c3483490818fa27534655b5638b90ec6168382cc14c63f35ecd8` | UI-DB-CG Exchange |
| `pip30.dll` | `d2415c41a39b0c654c4297c4837f0eba073662822c77fd4400b661715cd94b5c` | (consolidated into 41 series) |
| `udc30.dll` | `2dd757a7aea5511990bb0069d90c358db2242928dd1f0ab16b3a372690ddb538` | UDC handler |
| `udcX30.dll` | `286ab14e645dbb72c0a9bb09c020d0579cbb1ae9ecaddd2cc93dd1b8c99a2b92` | UDC extension |
| `udcrX30.dll` | `7fd25780b524e1dd9d0aaf4a4f7728d8f696012514cf8a711ecf90e984063561` | UDC read extension |
| `ruiX30.dll` | `ec973c24fe8cfa7f0e03eb1341c9ad95783197de7310d5b332e27821ec1712d8` | UI extension |

## Communication DLLs (ALL IDENTICAL between R03.09.03 and R03.11.16)

| File | SHA-256 | Description |
|------|---------|-------------|
| `VComESbp.dll` | `fd0787237c444781fd7b4914694867dfa82bd2d705084a5764126b85597ee084` | ESBEP protocol |
| `VComSbep.dll` | `42c4ac29be7fadbb2cdaffba08c5633e60e9ae585d4d0b151e62bc28f063c8bd` | SBEP protocol |
| `VcomSb96.dll` | `d93d5b0973d24903d464db6a2ca0b5722eb9160faef659ae5100376fd1178085` | SB9600 protocol |
| `mcomEmeaWaris.dll` | `31ec284717baa95c83f2eab49cdde7c8e370644cc4912ceedf35b388c4042297` | EMEA Waris radio (unique to GP300) |
| `mcomProRad.dll` | `0baf19bd43bb49b361b9f4615542b497e98cd907b23cfc771a62c2326344da2e` | Portable radio (**same as Waris R06.12.05**) |
| `mcomProRadMob.dll` | `9dc05d36a9e0793c6dd94b52fcd9abed988823434ee3c8baa6bf2e1b5f6e8ed1` | Mobile radio (**same as Waris R06.12.05**) |
| `mcomUnknown.dll` | `a2945faf89fd5d0c840b03f361195d47f4daa652dce8f59912d38a498aaa1a3e` | Fallback radio (different from Waris!) |

## Other Files

| File | SHA-256 | Description |
|------|---------|-------------|
| `pvdt60.ocx` | `ac87a2a0a867d21e171f61d0995a6863c1b0ce64dbf859d35c5ff3f9e383ac86` | VideoSoft data grid control |

---

## Notable Observations

1. **GP300 R03.09.03 → R03.11.16**: Only `gp300.exe` was recompiled. All DLLs are byte-identical. The Win7/x64 support was achieved by adding CommPatch.dll + driver installer, not by changing core protocol code.

2. **GP300 has `mcomEmeaWaris.dll`** not present in Waris R06.12.05 — this was replaced by `mcomProRadNew.dll`/`mcomProRadMobnew.dll` in the newer version.

3. **Protocol DLL hashes differ** between GP300 and Waris R06.12.05, meaning the protocol implementations were updated (even though the API is the same).

4. **mcomProRad.dll and mcomProRadMob.dll** are byte-identical across GP300 R03.09.03, R03.11.16, AND Waris R06.12.05 — the radio abstraction layer has been unchanged since at least 2003.
