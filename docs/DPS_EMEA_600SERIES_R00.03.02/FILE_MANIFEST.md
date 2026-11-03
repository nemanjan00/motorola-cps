# DPS EMEA 600 Series R00.03.02 — File Manifest

Source: `triage/600_old_wdp_wnp.rar` (899,340 bytes, RAR 1.5, dated 2005-09-29 archive /
contents 1996–2005, key binaries 1999-04-06).

Version: **post-R00.03.02** (READMEs list enhancements "since R00.02.21" and
"since R00.03.02"; no exact version string found in binaries). Binaries dated 1999-04-06.

Archive contains two parallel installs:

- **DPSWNP** — for 600 series radios **without data panel** (Network Programmer +
  Dealer Programmer)
- **DPSWDP** — for 600 series radios **with data panel** (Dealer Programmer only)

All apps are 16-bit Windows 3.1 (NE format) GUI binaries built with the Zinc
Application Framework 4.0, plus DOS counterparts. Languages: EN/DE/FR.

## SHA-256 Hashes

### DPSWNP (no data panel)

| SHA-256 | File | Size | Notes |
|---------|------|------|-------|
| 50d1e2452c78d9ef4402dd6e9b33b8d93cbed2ba538bf92764cdfd054cbb8af2 | WDPS_NP.EXE | 648,864 | Network Programmer (Win 3.1 NE) |
| 40fdc2785d38a1e51a373047577b9393e08c5176c1635d4fca332f9838badab3 | WSERIAL.EXE | 31,516 | DOS serial helper (MZ) |
| 9b144d0a7b636fe71c67050407bcaa3e5580ee0b501d87f483106548618f21f1 | W_DEALER.EN | 175,360 | Zinc data file (UI resources, EN) |
| 4d292b36daefe7c4ad0e2d70b314b0a29ee146dc52ed07a3ba0ab19b4c5afe78 | W_DEALER.DE | 150,784 | same, DE |
| 6231f8fc7ac605df924c8e2793d65e20d89e2ca3ac70b37af77473def0b9c622 | W_DEALER.FR | 215,808 | same, FR |
| a9a847053165115ac2c2583de0c9fc121b233b63a354c2ccf95fac35bf0d1dcc | DPSHLP_N.EN | 63,488 | Help (EN) |
| eb5153050d073dd95e0302fb716bb6d0e4889b5d5388058b56c483e340cfb80f | DPSHLP_N.DE | 28,928 | Help (DE) |
| cdb3f5693d22e6636941b93393242a72900ef02ec4db85514ac852686e14c9ff | DPSHLP_N.FR | 86,016 | Help (FR) |
| 9764f1d4798f83ead56439f10f187e3843acf371496ecfe7bd3ff35ee65e77c2 | DPSUMN.EN | 51,968 | User manual, Zinc-compiled (EN) |
| a93b26edd5cf21f28d6880f803f9c5033e7dcff2b75f778c9a0fa3ed02bf8552 | DPSUMN.DE | 30,976 | same (DE) |
| f4453b0baefdf9ab5a600e5dac5bd2814d6793e29edf13f89294e62a2ebb0515 | DPSUMN.FR | 59,136 | same (FR) |
| e53021eb6485f7b1cc0e7223f2d37f3dc431a8e9e048f0e6cc7812f8e73e68db | NET_MAN.PRN | 35,548 | User manual, plaintext (CP437) |
| 1feb2ff958f79489ddd40026153aa4f4f62adc391ad3e10945b62d8e7ce38e63 | READ_ME.EN | 2,998 | |
| 863db23174559d8f16fa34884527c8eb7b81378d9648529ac629ae461d91d7a2 | READ_ME.DE | 3,748 | |
| 809d7f1271fd4f27e4a698bf733cdcf2cb5498a4b149e549f688a9cf88be7c46 | DPS.CFG | 295 | Config (plaintext header + binary) |
| 4557a0496e7d68ef75bbee0d7621187617a46c9ac5bd5302e763edf01c5bff0c | DPS.NET | 1,213 | Sample network data file (encrypted) |
| 0b4a56ead3e9b9f7bbacd9b245a2c3b24e10a98b67f4bb71ea6bce67547296ac | DPS.RAD | 3,025 | Sample radio data file (encrypted) |
| 4eea7dbc0d0b724bcb73bb1d25f5ed5e660184ef74ff96c61a67e952e7317059 | END.BAT | 822 | Install cleanup batch |

### DPSWDP (with data panel)

| SHA-256 | File | Size | Notes |
|---------|------|------|-------|
| 4e1c36676cb90bc53f85fef025ca29648a35b2838e1565234d0d901de6557ed9 | WDPS_DP.EXE | 708,896 | Dealer Programmer (Win 3.1 NE) |
| 40fdc2785d38a1e51a373047577b9393e08c5176c1635d4fca332f9838badab3 | WSERIAL.EXE | 31,516 | identical to DPSWNP copy |
| 339c6971d84eb7a0ba02dea3e2ad89e5f89ed69788f81833004bf67b17643c4c | DPSHLP_D.EN | 125,184 | Help (EN) |
| 79ddf852c5be64416f2fa5777589110e68621ce3bb7221d0dda14b2855ff089f | DPSHLP_D.DE | 188,416 | Help (DE) |
| d9e160964d3f5bd908cc61b9d636a5f4e14d31c3444ebff0718cec9d37b95260 | DPSHLP_D.FR | 180,480 | Help (FR) |
| 32f16c2e3add725d925d23ec361b7b1b5bd195552fa947b6f7682d4f0a92c094 | DPSUMD.EN | 79,104 | User manual, Zinc-compiled (EN) |
| 0f03da1e5ad7e2aed69d5827293030157811071306398ed821ee3d24f576978f | DPSUMD.DE | 137,984 | same (DE) |
| ea7e5afe1ea23f92f74a28a26bb3dda75ca5fa4620810607fa8b9850a4d7ef8d | DPSUMD.FR | 134,912 | same (FR) |
| fd1aa25e9cb4702a3fe9c9b3f169a7706567e0334458be11c0532ccc4b97984a | READ_ME.EN | 4,342 | |
| 4a5c4afd9244425144517391e2ba18dcf59bce6e2814d3be74184b1473f9aa4d | READ_ME.DE | 5,427 | |
| c95b1c94c9c24ee8e6ebaaff89e304eaf39646b018ad43f91213125676304ee3 | DPS.CFG | 295 | Config |

`W_DEALER.{EN,DE,FR}`, `WSERIAL.EXE`, `END.BAT` are byte-identical between DPSWNP
and DPSWDP (same hashes).

## Cross-family notes

- First non-CPS software in the archive: this is **DPS**, the predecessor
  generation to RSS/CPS, for the MPT1327 trunked 600 series.
- OLD data format is shared with GP1200/GM1200 RSS (GVN6007); NEW format is DPS-native.
