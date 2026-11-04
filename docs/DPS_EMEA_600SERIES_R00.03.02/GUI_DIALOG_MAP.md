# GM600 DPS (WDPS_DP.EXE) — Complete GUI Dialog Map

Full inventory of every dialog in the Dealer Programmer menu tree, captured live against
radio serial `807IYA0903` (model `M08RHF4CK3`, "GM600 with display", Codeplug Version 02.03,
SW R03.03.21). Data Source = Network/Personality = Radio. Pairs the GUI with the codeplug
bindings in [CODEPLUG_BITMAP.md](CODEPLUG_BITMAP.md) and the Kaitai spec `gm600_codeplug.ksy`.

## Which dialogs can edit radio data (→ write-contrastable) vs not

| Dialog | Editable? | Nature | Codeplug binding |
|---|---|---|---|
| Edit → Trunking → MPT Personality Data | **edit** | trunking personality | bound: packed BE16 number table @0x0F08 |
| Edit → Trunking → Call Timers | **edit** | trunking personality | partly bound (0x0F16/0x0F18/0x0F1C/0x0F26-28) |
| Edit → Trunking → Call Enable | **edit** | trunking personality | bound region: Call Enable mask @0x0F1A-1B |
| Edit → Trunking → Own Group Numbers | **edit** (Add/Del) | trunking personality | bound: 15×4B list @0x0F2B-0x0F66 |
| Edit → Trunking → Shortform Dialling | **edit** | trunking personality | bound: BCD buffer @0x0F83 |
| Edit → Conventional Personality Data | **edit** (Add/Del) | **conventional / radio-wide** | bound: channel table @0x0F67 (+ options byte +6) |
| Edit → Common Radio Parameters | **edit** | **radio-wide** | partly bound (power 0x0F1E/1F, acoustic 0x0F23, etc.) |
| Edit → Change Model Number | **edit** | model select | model index |
| View → Network → * (all 9) | **view-only** | MPT network/system | network block 0x0E13-0x0F07 (OUT OF SCOPE) |
| View → Radio Info | info only | radio-wide | serial/version display |
| Service → Transmitter/Receiver Alignment → * | **password-gated** | RF alignment | alignment block 0x0D80-0x0E12 (read-only) |
| Options → Configure | edit (app) | DPS app config | not radio data |

**Answer to "is anything non-trunking missing?":** No. The only editable non-trunking radio-data
dialogs are **Conventional Personality Data** and **Common Radio Parameters**, both already mapped.
Every network/system dialog is **view-only** in WDPS_DP (authored in WDPS_NP); every alignment
dialog is service-password-gated. Nothing else editable exists in the tree.

**The three "ham" fields** (Registration On Power Up, De/Pre-emphasis, Conventional Mode) live only
in the **view-only** View → Network → Radio Flags dialog, packed into **Radio Config Byte1/Byte2**
(both `0x00` on this radio) in the network block — so they are NOT bindable by the WDPS_DP
write-contrast method. See the Radio Flags entry below.

## Edit menu (editable radio data)

### MPT Personality Data  (trunking)
Display: Own Prefix 43, Own Ident 124. Own No. Prefix=243, Own Fleet Indv.=2001, Own Unit=322,
Indv. Dial Digits=3, Highest Unit=899, Lowest Callable=200, Highest Callable=799, Own Fleet
Group=5500, Highest Group=979, Group Dial Digits=3. Tx Power Level=High; Imitate OACSU=No;
Alert Tones in NPD=off; MAINT Telegrams in NPD=off; LNR Enable=on.

### Call Timers  (trunking)
Limit Normal Call=on 05:00; Limit Emergency Call=on 00:30; Counter Direction=Down; Call in
Absence=on, Delay 10 s; External Alarm=on, Duration 1 s; Emergency Call Activation Delay=3 s;
Normal Call Activation Delay=2 s.

### Call Enable  (trunking)
Enabled: Interprefix, Interfleet, Interfleet Group, Broadcast, Priority, NPD, PABX, Status, Group,
Call Diversion, Emergency. Disabled: PSTN. (Enabled = marked X.)

### Own Group Numbers  (trunking)
Display: Group Prefix 43, Group Ident 7007. Table [No.Prefix|Fleet Group|Group|Talkgroup Enable]:
243|5500|907|No ; 243|5500|908|No. Group range 900-998.

### Shortform Dialling  (trunking, scrollable)
Base Call=306; A/B/C = Allocated (Conventional Channel / Call In Absence / External Alarm, greyed);
D=400; Ext Line=*; 1=320; 2=321; 3=323; 4=324; … Percentage space used 13 %.

### Conventional Personality Data  (CONVENTIONAL / radio-wide)
Transmit Timeout=on, Duration 10 s. Channel table [Chan|Rx|Tx|TxPower|TxInhibit|RxPL|TxPL|Monitor|Data]:
1: 446.068750/446.068750/High/Disabled/Disabled/Disabled/No/No
2: 446.131250/446.131250/High/Disabled/Disabled/Disabled/No/No
3: 446.093750/446.093750/High/Disabled/Disabled/Disabled/No/No
4: 438.625000/431.025000/High/Disabled/Disabled/3Z 123.0/No/No

### Common Radio Parameters  (radio-wide)
DTMF Tones (greyed here): Trunked/Conventional Overdialing on, Min/Max/Inter tone 0.1/0.5/0.05 s.
Keypad Lock (greyed). Telephone Type Handset=off; Acoustic Feedback=on. Low Power=5 W, High
Power=25 W. Minimum Volume Level=0; Alert Tone Volume Offset=0; Display Backlight Mode=Period.
(Still-unbound editable fields: Minimum Volume Level, Display Backlight Mode.)

### Change Model Number
Current M08RHF4CK3; selectable table of PTX600/GP600 variants (AZP93VJ*, 146-174 MHz, 12.5/25 kHz, 1-5 W).

## View → Network (all VIEW-ONLY; MPT1327 system data, network block)

- **MPT Network Specific:** Network Type=National; Dialling Plan=MPT 1343; Registration Info=80;
  Home Zone=0; Control Category=A; Network Operator ID=00; Nvote=2, Tvote=10 s, LMvote=6; Length of
  Area Sub Field=4, Zone=5; Lowest/Highest Channel=1/80; Lowest/Highest System Channel=1/80.
- **Hunt Options:** Comprehensive Hunt=off; Background Hunt=on; Preferential Hunt=None; Channel
  Voting Timer=10 min; RSSI margins LM1=6, LM2=6, LM3=0, LM4=0.
- **Radio Flags:** Registration On Power Up=off; Short Addressing PABX Calls=on; Tx Timer Clear
  Down=off; Ignore LAB Subfield=on; Synch. Pattern Type=MPT 1327; **De/Pre-emphasis=MPT 1327**;
  **Conventional Mode=All**; Radio Config Byte1=0x00, Byte2=0x00. ← the three "ham" fields pack here.
- **Preferential NDD Data:** NDD Sample Duration=1 s; [Entry|Priority|Field Length|Sub-field] = 1|1|9|5.
- **Access Authorisation:** [#|Identity|Class] = 1|000000000|Zone (Identity range 0-31).
- **Control Channel List:** [Entry|Channel|Time-shared|Home]: 1:12, 2:9, 3:5, 4:11, 5:3, 6:7, 7:2, …
  (matches radio bytes 0C 09 05 0B 03 07 02 … at 0x0E5F).
- **Channel Frequency Plan:** [Entry|Channel|Rx|Tx]: 0 → 440.993750/445.993750; 1 → 441.000000/
  446.000000; 80 → 441.987500/446.987500. Range 403-470 MHz, step 5 / 6.25 kHz.
- **Counters:** Continuous NC1=20,NC2=20,NV=1,NX1=2,NX2=10; Time-Shared NC1=0,NC2=0,NV=1,NX1=0,NX2=0;
  NZ1=1,NZ2=20,ND1=3,ND2=5,NE=16,NI=4,NR=8,NS=2,**NT=515**,NW=5. (NT exceeds the generic 0-255 hint.)
- **Timers:** TA=60,TB=2,TC=60 s; TD=5 m; TH=5 slots; TI=2,TJ=20,TL=10,TN=10,TP=5,TS=10,TT=60,TW=60 s.

## View → Radio Info  (info only)
Model M08RHF4CK3; Serial 807IYA0903; ESN 002/05/032746; Codeplug Version 02.03; Software R03.03.21;
"GM600 with display."; TX/RX 403-470 MHz; Power 5-25 W; Channel Spacing shown as `1250000` (display
artifact for 12.5 kHz).

## Service (all PASSWORD-GATED — "Please enter the service password")
- Transmitter Alignment: Bias 1/2 Voltage Tuning, RF Power Tuning, Transmit Low/High Power, Battery
  Threshold, Reference Oscillator, Voltage Limit, Modulation Attenuation, Reference Attenuation,
  VCO Attenuation, Signalling Deviation.
- Receiver Alignment: Front End Filter, Rated Volume, Squelch Attenuation, RSSI.

## Options → Configure  (DPS app config, not radio data)
COM Port=COM1; Language=English; Data File Path=`c:\mrss\mpt\dpswdp\archive`. (Update Codeplug greyed.)
