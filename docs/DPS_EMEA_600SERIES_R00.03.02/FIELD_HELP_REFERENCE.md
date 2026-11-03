# GM600 / 600-Series DPS — Field Help Reference

> Per-field context help extracted from DPS `DPSHLP_D.EN` (Dealer) + `DPSHLP_N.EN` (Network)
> and `W_DEALER.EN` resource strings (DPS R00.05.04 / R00.03.02, EMEA). 158 fields cataloged.
> Pairs with the decoded `.per`/`.rad` layout (`FIELD_MAP.md`) and the native codeplug bit map (`CODEPLUG_BITMAP.md`).

## PL / TPL tone index table

Transmit/Receive PL (TPL/CTCSS). Codeplug index 0 = Disabled; index N = Nth tone below. Both a 2-char code and the tone in Hz are shown. **Example: Tx PL index 19 = `3Z` = 123.0 Hz.**

| idx | code | Hz | idx | code | Hz |
|--|--|--|--|--|--|
| 1 | XZ | 67.0 | 21 | 3B | 131.8 |
| 2 | WZ | 69.3 | 22 | 4Z | 136.5 |
| 3 | XA | 71.9 | 23 | 4A | 141.3 |
| 4 | WA | 74.4 | 24 | 4B | 146.2 |
| 5 | XB | 77.0 | 25 | 5Z | 151.4 |
| 6 | WB | 79.7 | 26 | 5A | 156.7 |
| 7 | YZ | 82.5 | 27 | 5B | 162.2 |
| 8 | YA | 85.4 | 28 | 6Z | 167.9 |
| 9 | YB | 88.5 | 29 | 6A | 173.8 |
| 10 | ZZ | 91.5 | 30 | 6B | 179.9 |
| 11 | ZA | 94.8 | 31 | 7Z | 186.2 |
| 12 | ZB | 97.4 | 32 | 7A | 192.8 |
| 13 | 1Z | 100.0 | 33 | M1 | 203.5 |
| 14 | 1A | 103.5 | 34 | 8Z | 206.5 |
| 15 | 1B | 107.2 | 35 | M2 | 210.7 |
| 16 | 2Z | 110.9 | 36 | M3 | 218.1 |
| 17 | 2A | 114.8 | 37 | M4 | 225.7 |
| 18 | 2B | 118.8 | 38 | M5 | 233.6 |
| 19 | 3Z | 123.0 | 39 | M6 | 241.8 |
| 20 | 3A | 127.3 | 40 | M7 | 250.3 |

(0 = Disabled. Codes marked uncertain where the resource text had an obvious typo, e.g. idx17 shown as `1A` but 114.8 Hz = standard `2A`.)

## Conventional Personality  (29)

**Battery Threshold** — The Value fields displays the current setting of Tx High and Tx Low voltage. The values displayed are view only. On selection of the Toggle PTT button the appropriate communication will take place to key or de-key the radio. When the radio is transmitting, it is not possible to : change the selected frequency. select either the Program or Cancel buttons. For a GP600 radio the display is change to show 'Rx Low'.

**Channel Frequency Plan Table** — Entry 0 in the table will always be present, details of which are presented below : Channel. This field is not selectable and will be greyed out. 'Rx Freq. Trunked mode base receive frequency. This is the frequency of nominal channel 0. This is used by the radio to calculate a channels frequency. A valid frequency will always be an integer multiple of 1250Hz. If a frequency is entered that is not a multiple of 1250Hz then the frequency will be rounded to the nearest multiple and the Frequency Ro

**Conventional Mode** — Determines the Conventional mode inhibit. Field Value = Inhibit The field Conventional Mode is set to Conventional channels not allowed Field Value = Dealer The field Conventional Mode is set to Conventional channels enabled and entered by Dealer Programmer Field Value = Customer The field Conventional Mode is set to Conventional channels enabled and entered by Dealer or Customer Field Value = RegioNet43 The field Conventional Mode is set to Only a single frequency simplex 420mhz conventional is

**Conventional Overdialling** — This field can only be edited on models with a keypad. Determines whether DTMF Overdialling on conventional channels is enabled. This field will not be selectable and will be greyed out if the current Model Number indicates that the radio does not have a keypad. Field Value = Blank The field Conventional Overdialling is set to disabled Field Value = X The field Conventional Overdialling is set to enabled Default Field Value = Blank This field is dependent upon the Radio Configuration Data Field:

**Conventional Personality Table** — A maximum of 4 entries will be allowed in the table. Valid entries are located consecutively, starting from entry 1 for GM600, and counting down from 16 for GP600. Unused entries will be displayed as blank lines, but the Radio Configuration Data fields will be set to 0.

**Data Channel Option** — If enabled non-prescribed data is permitted and audio is routed to external port. If disabled then calls to any group number in the table will be received. Default : Disabled

**Format** — This selection is only available if Network data is to be Saved. It is possible to save Network Data in either the file format used by the previous RSS software e.g selecting 'Old', or the new file format by selecting 'New'. When saving Network Data in the file format used by the previous RSS software, version GP1200/GM1200 (GVN6007), a confirmation message will be displayed, indicating that some of the data will be lost. The data which is not saved in the previous RSS file format is listed belo

**Keypad Lock** — When enabled this field prevents any operations being performed from the Keypad. It overrides 'Conventional DTMF Enable', 'DTMF Overdialling', and all call barring fields. Field Value = Blank The field Keypad Lock is set to disabled Field Value = X The field Keypad Lock is set to enabled Default Field Value = Blank

**Modulation Attenuation** — On entering the window the Modulation Attenuation field and slider bar will be set to their current values. It will then be possible to change a value by typing in a specific number in the Modulation Attenuation field or by moving the slider bar. On selection of the Program button the appropriate SBEP communication will take place to program the current values into the radio and the window will be closed. On selection of the Toggle PTT button the appropriate communication will take place to key 

**Monitor** — Determines the monitor button operation. Field Value = No The field Monitor is set to disabled Field Value = Yes The field Monitor is set to Carrier Squelch Default Field Value = Disabled

**PA Voltage Limit** — On entering the window the PA Voltage Limit field and slider bar will be set to their current values. It will then be possible to change a value by typing in a specific number in the PA Voltage Limit field or by moving the slider bar. On selection of the Program button the appropriate SBEP communication will take place to program the current values into the radio and the window will be closed. On selection of the Toggle PTT button the appropriate communication will take place to key or de-key th

**RF Power Tuning** — Selection of this item will display the RF Power Tuning window. The RF Power Tuning field displays the current setting of the RF Power for the test frequency. This window will only be displayed if the Radio Configuration Data being edited is for a GM600 radio. On selection of the Toggle PTT button the appropriate communication will take place to key or de-key the radio. The Status Bar field Transmitter will be updated to reflect whether the radio is transmitting or not. When the radio is transmi

**Receive Frequency** — Receive frequency. Range: Dependent on Model Number Default Field Value = 0 This field is dependent upon the Radio Configuration Data Field: Model Number, Radio Frequency Base Please refer to section 5 of MPT1343 for more information.

**Reference Attenuation** — Selection of this item will display the Reference Attenuation window. The Reference Attenuation field displays the current setting of the Reference Attenuation for the test frequency. On selection of the Toggle PTT button the appropriate communication will take place to key or de-key the radio. The Status Bar field Transmitter will be updated to reflect whether the radio is transmitting or not. When the radio is transmitting, the currently selected frequency will be displayed on the Status Bar. 

**Reference Oscillator** — On entering the window the Reference Oscillator field and slider bar will be set to their current values. It will then be possible to change a value by typing in a specific number in the Reference Oscillator field or by moving the slider bar. On selection of the Program button the appropriate SBEP communication will take place to program the current values into the radio and the window will be closed. On selection of the Toggle PTT button the appropriate communication will take place to key or d

**Rx Freq** — Receive frequency. A valid frequency will always be an integer multiple of 1250Hz. If a frequency is entered that is not a multiple of 1250Hz then the frequency will be rounded to the nearest multiple and the Frequency Rounded dialog box will be displayed. Frequencies must be unique within the table, and not equal to the Rx Base Channel. Range: Dependent on Model Number Default Field Value = Rx Base Channel Frequency + 1 This field is dependent upon the Radio Configuration Data Field: Model Numb

**Rx PL** — The TPL code to be received. It is possible to set this field by typing in either the two character code or by typing in the numerical code. Both the character and numeric codes will be displayed. Range : Disabled XZ 67.0 WZ 69.3 to M7 250.3 Default Field Value = Disabled Please refer to section 5 of MPT1343 for more information.

**Shortform Dialling Number** — The 'Percentage Space Used' field is updated with the percentage of space used. The field 'Characters Available' is updated to display the set of valid characters that may be entered into a Shortform dial string. The valid characters that may be entered into a Shortform dial string are: '0' '1' '2' '3' '4' '5' '6' '7' '8' '9' ' ' '*' '#'' 'S' Each string has a maximum of 20 characters. A maximum number of 17 string numbers will be stored. Unused entries will be displayed as blank lines. Unavaila

**Shortform Dialling Table** — The 'Percentage Space Used' field is updated with the percentage of space used. The field 'Characters Available' is updated to display the set of valid characters that may be entered into a Shortform dial string. The valid characters that may be entered into a Shortform dial string are: '0' '1' '2' '3' '4' '5' '6' '7' '8' '9' ' ' '*' '#'' 'S' Each string has a maximum of 20 characters. A maximum number of 17 string numbers will be stored. Unused entries will be displayed as blank lines. Unavaila

**Signaling Deviation** — Selection of this item will display the Signaling Deviation window. The Signaling Deviation field displays the current setting of the Signaling Deviation for the test frequency. On selection of the Toggle PTT button the appropriate communication will take place to key or de-key the radio. The Status Bar field Transmitter will be updated to reflect whether the radio is transmitting or not. When the radio is transmitting, the currently selected frequency will be displayed on the Status Bar. Whilst

**Transmit Frequency** — Note: A value of 0 in this field indicates the end of conventional personality entries. Range: Dependent on Model Number Default Field Value = 0 This field is dependent upon the Radio Configuration Data Field: Model Number, Radio Frequency Base Please refer to section 4 of MPT1343 for more information.

**Transmit High Power** — On entering the window the Transmit High Power field and slider bar will be set to their current values. It will then be possible to change the value of Transmit High Power by typing in a specific number or by moving the slider bar. On selection of the Program button the appropriate SBEP communication will take place to program the current values into the radio and the window will be closed. The Transmit High Power field and the slider bar relating to the Coarse value will only be displayed if t

**Transmit Low Power** — On entering the window the Transmit Low Power field and slider bar will be set to their current values. It will then be possible to change the value of Transmit Low Power by typing in a specific number or by moving the slider bar. On selection of the Program button the appropriate SBEP communication will take place to program the current values into the radio and the window will be closed. The Value field and the slider bar relating to the Coarse value will only be displayed if the Radio Configu

**Transmit Timeout** — Determines whether the transmit time-out has been enabled. Field Value = Blank The field Transmit Timeout is set to disabled Field Value = X The field Transmit Timeout is set to enabled Default Field Value = Blank Please refer to section 4 of MPT1343 for more information.

**Transmit Timeout Duration** — Transmit time-out for conventional channels. This field will be greyed out if the Transmit Time-out is disabled. Range: 1..255 Default Field Value = 1 Please refer to section 4 of MPT1343 for more information.

**Tx Freq** — Transmit frequency. A valid frequency will always be an integer multiple of 1250Hz. If a frequency is entered that is not a multiple of 1250Hz then the frequency will be rounded to the nearest multiple and the Frequency Rounded dialog box will be displayed. Frequencies must be unique within the table, and not equal to the Tx Base Channel. Range: Dependent on Model Number Default Field Value = Tx Base Channel Frequency + 1 This field is dependent upon the Radio Configuration Data Field: Model Num

**Tx Inhibit** — The method of inhibiting the transmission. 'Unless PL' can only be selected if PL decode is enabled. Field Value = Disabled The field Tx Inhibit is set to disabled Field Value = On Busy The field Tx Inhibit is set to On Busy Field Value = Unless PL The field Tx Inhibit is set to On Busy Unless PL Default Field Value = Disabled

**Tx PL** — The TPL code to be transmitted. It is possible to set this field by typing in either the two character code or by typing in the numerical code. Both the character and numeric codes will be displayed. Range : Disabled XZ 67.0 WZ 69.3 to M7 250.3 Default Field Value = Disabled Please refer to section 4 of MPT1343 for more information.

**VCO Attenuation** — On entering the window the VCO Attenuation field and slider bar will be set to their current values. It will then be possible to change the value of VCO Attenuation by typing in a specific number or by moving the slider bar. On selection of the Program button the appropriate SBEP communication will take place to program the current values into the radio and the window will be closed. On selection of the Toggle PTT button the appropriate communication will take place to key or de-key the radio. T

## MPT1327 Identity & Numbering  (29)

**Class** — Class indicator for access authorization identity. Field Value = Area The field Class is set to Area Field Value = Full The field Class is set to Full Field Value = Zone The field Class is set to Zone Default Field Value = Area Please refer to section 9.3 of MPT1343 for more information.

**Fleet Group** — The fleet group number. Range: 2001..6050 Default Field Value = 2001 Please refer to section 8.2 of MPT1343 for more information. GROUP_GROUPv

**Group** — Determines group number within a block of group numbers. Range: If Two/Three Digit Group Dialling = Two Digit Dialling 90..99 If Two/Three Digit Group Dialling = Three Digit Dialling 900..998 If Network Dialling Plan = MPT1343 / Dutch PTT 900..999 If Network Dialling Plan = RegioNet43 Default Field Value = 90 or 900 Please refer to section 8.2 of MPT1343 for more information.

**Highest Callable Number** — The radio's highest callable infleet individual number. Range: If Two/Three Individual Dialling = Two Digit Dialling 20..89 If Network Dialling Plan = MPT1343 / Dutch PTT 20..79 If Network Dialling Plan = RegioNet43 If Two/Three Individual Dialling = Three Digit Dialling 200..899 If Network Dialling Plan = MPT1343 / Dutch PT 200..799 If Network Dialling Plan = RegioNet43 Default Field Value = 20 or 200 This field is dependent upon the Radio Configuration Data Field: Network Dialling Plan, Two/Th

**Highest Group Number** — The highest group number in the fleet, and hence the number of groups in the fleet. Range: If Two/Three Group Dialling = Two Digit Dialling 90..99 If Two/Three Group Dialling = Three Digit Dialling 900..998 If Network Dialling Plan = MPT1343 / Dutch PTT 900..999 If Network Dialling Plan = RegioNet43 Default Field Value = 90 or 900 This field is dependent upon the Radio Configuration Data Field: Network Dialling Plan, Two/Three Group Dialling Please refer to section 8.2 of MPT1343 for more inform

**Highest Unit Number** — The highest unit number within a fleet, and hence the size of the fleet. Range: If Two/Three Individual Dialling = Two Digit Dialling 20..89 If Network Dialling Plan = MPT1343 / Dutch PTT 20..79 If Network Dialling Plan = RegioNet43 If Two/Three Individual Dialling = Three Digit Dialling 200..899 If Network Dialling Plan = MPT1343 / Dutch PTT 200..799 If Network Dialling Plan = RegioNet43 Default Field Value = 20 or 200 This field is dependent upon the Radio Configuration Data Field: Network Dia

**Identity Decimal** — Indicates Access authorization identity. This field is displayed, and can be edited, in both decimal and binary. Range: If AADClass = Area 0..Length Of Area If AADClass = Zone 0..Length Of Zone Otherwise 0..15 If Network Type = 0 (Regional network) 0..511 If Network Type = 1 (National network) This field is dependent upon the Radio Configuration Data Field : AADClass Length Of Area Length Of Zone Network Type Default Field Value = 0 Please refer to section 9.3 of MPT1343 for more information. Id

**Ignore LAB Sub-field** — Enabling this field causes the radio to ignore the LAB sub-field part of radiated system identity codes when trying to acquire a control channel. This field is available only from version 2 onwards. Default Field Value : Disabled

**Interfleet Calls** — Determines whether the radio can make outgoing Interfleet calls. Please refer to section 9. of MPT1343 for more information. Field Value = Blank The field Interfleet Calls is set to disabled Field Value = X The field Interfleet Calls is set to enabled Default Field Value = Disabled

**Interfleet Group Calls** — Determines whether the radio can make outgoing inter fleet group calls. Please refer to section 9. of MPT1343 for more information. Field Value = Blank The field Interfleet Group Calls is set to disabled Field Value = X The field Interfleet Group Calls is set to Enabled Default Field Value = Disabled

**Interprefix Calls** — Determines whether the radio can make outgoing inter prefix calls. When enabled reference should be made to section 5. of MPT1327 for supporting information. Field Value = Blank The field Interprefix Calls is set to disabled Field Value = X The field Interprefix Calls is set to enabled Default Field Value = Blank

**Length of Area Sub Field** — Length of area sub-field to be used when checking SYS identities. Range: 0..4 If Network Type = 0 (Regional network) 0..9 If Network Type = 0 (National network) Default Field Value = 0 Please refer to section 8. of MPT1343 for more information.

**Length of Zone Sub Field** — Length of zone sub-field to be used when checking SYS identities. Range: 0..4 If Network Type = 0 (Regional network) 0..9 If Network Type = 0 (National network) Default Field Value = 0 This field is dependent upon the Radio Configuration Data Field: Network type. Please refer to section 8. of MPT1343 for more information.

**Lowest Callable Number** — The radio's lowest callable infleet individual number. Range: If Two/Three Individual Dialling = Two Digit Dialling 20..89 If Network Dialling Plan = MPT1343 / Dutch PTT 20..79 If Network Dialling Plan = RegioNet43 If Two/Three Individual Dialling = Three Digit Dialling 200..899 If Network Dialling Plan = MPT1343 / Dutch PTT 200..799 If Network Dialling Plan = RegioNet43 Default Field Value = 20 or 200 This field is dependent upon the Radio Configuration Data Field: Network Dialling Plan, Two/Th

**MPT1327 Format Group Ident** — The radio's group ident number in MPT 1327 format This field is for information only and can not be edited. Range : 2..8100 Default : 2 Algothrim : (Fleet Group Number - 2000) * 2 Please refer to section 8.2 of MPT1343 for more information.

**MPT1327 Format Group Prefix** — The radio's group number prefix in MPT 1327 format This field is for information only and can not be edited. Range : 0..127 Default : 0 Please refer to section 8.2 of MPT1343 for more information.

**Network Operator ID Binary** — National Network Number or Regional Operator Identify depending on type of network. This field is displayed, and can only be edited, in binary. Range: 0..127 If Network Type = 0 (Regional network) 0..3 If Network Type = 0 (National network) Default Field Value = 0 This field is dependent upon the Radio Configuration Data Field: Network type. Please refer to section 8. of MPT1343 for more information.

**Network Operator ID Hex** — National Network Number or Regional Operator Identify depending on type of network. This field is displayed, and can only be edited, in hex Range: 0..127 If Network Type = 0 (Regional network) 0..3 If Network Type = 0 (National network) Default Field Value = 0 This field is dependent upon the Radio Configuration Data Field: Network type. Please refer to section 8. of MPT1343 for more information.

**Network Type** — Determines whether the network type has a National or Regional format system identify. Field Value = 0 The field Network Type is set to Regional Field Value = 1 The field Network Type is set to National Default Field Value = Regional Please refer to section 8. of MPT1343 for more information.

**Number Prefix** — The number prefix. This field can be edited as shown but will also be displayed in MPT1327 format. Range: 200..327 Default Field Value = 200 Please refer to section 8.2 of MPT1343 for more information.

**Own Fleet Group Number** — The radio's fleet group number. Range: 2001..6050 Default Field Value = 2001 Please refer to section 8.2 of MPT1343 for more information.

**Own Fleet Indiv. Number** — The radio's own fleet individual number. Range: 2001..6050 Default Field Value = 2001 Please refer to section 8.2 of MPT1343 for more information.

**Own Group Numbers Table** — A maximum of 15 entries are allowed. Valid entries are located consecutively, starting from entry 1. Please refer to section 8.2 of MPT1343 for more information.

**Own Ident** — The radio's own ident in MPT 1327 format This field is for information only and can not be edited. Range : 2.8100 Default : 2 Please refer to section 8.2 of MPT1343 for more information.

**Own Number Prefix** — The radio's own number prefix. This field can be edited as shown below but will also be displayed in MPT1327 format. Range: 200..327 Default Field Value = 200 Please refer to section 8.2 of MPT1343 for more information.

**Own Prefix** — The radio's prefix in MPT 1327 format This field is for information only and can not be edited. Range : 0..127 Default : 0 Please refer to section 8.2 of MPT1343 for more information. LP_MPT1327_OWN_IDENT

**Own Unit Number** — The radio's own unit number. Range: If Two/Three Individual Dialling = Two Digit Dialling 20..89 If Network Dialling Plan = MPT1343 / Dutch PTT 20..79 If Network Dialling Plan = RegioNet43 If Two/Three Individual Dialling = Three Digit Dialling 200..899 If Network Dialling Plan = MPT1343 / Dutch PTT 200..799 If Network Dialling Plan = RegioNet43 Default Field Value = 20 or 200 This field is dependent upon the Radio Configuration Data Field: Network Dialling Plan, Two/Three Individual Dialling Pl

**Sub-field** — Value to identify preferential system identity codes. Range: Dependent upon the value of Preferential NDD Field Length. Range is determined by the field width in bits. For example if Preferential NDD Field Length = 2 then range is 0..3 Default Field Value = 0 This field is dependent upon the Radio Configuration Data Field: Preferential NDD Field Length. Please refer to section 9. of MPT1343 for more information. NDD Sample Duration( NDD Sample Duration (s) Value to identify the NDD Sample Durati

**Talkgroup Enable** — If entry in table is selected with talkgroup enable then only group calls to the selected group number will be received. If disabled then calls to any group number in the table will be received. This field is available only from stage 2 onwards.

## MPT1327 Network / Trunking  (32)

**Access Authorization Table** — A maximum number of 8 entries is allowed. Valid entries are located consecutively, starting from entry 1. Unused entries will be displayed as blank lines.

**Background Hunt** — Controls whether the background hunt feature is enabled. Field Value = Blank The field Background Hunt is set to disabled Field Value = X The field Background Hunt is set to enabled Default Field Value = Blank Please refer to section 9.3 of MPT1343 for more information.

**Comprehensive Hunt** — Controls whether the suppression of comprehensive hunt is enabled. Field Value = Blank The field Comprehensive Hunt is set to disabled Field Value = X The field Comprehensive Hunt is set to Enabled Default Field Value = Disabled Please refer to section 9.3 of MPT1343 for more information.

**Continuous NV** — Number of consecutive CCSC's to select a value of SYS for verification on a continuous control channel. Range : 1..16 Default Field Value = 1 Please refer to section 8 of MPT1327 for more information.

**Continuous NX1** — Error codeword limit prior to confirmation on a continuous control channel. Range : Disabled, 1..255 Default Field Value = 8 Please refer to section 8 of MPT1327 for more information.

**Continuous NX2** — Error codeword limit after confirmation on a continuous control channel. Range : Disabled, 1..255 Default Field Value = 8 Please refer to section 8 of MPT1327 for more information.

**Control Category** — The control channel category used by the radio. Field Value = A The field Control Category is set to A Field Value = B The field Control Category is set to B Field Value = C The field Control Category is set to C Field Value = D The field Control Category is set to D Default Field Value = A Please refer to section 8. of MPT1343 for more information.

**Control Channel Table** — A maximum of 32 entries is allowed. Valid entries are located consecutively, starting from entry 1. All channel numbers entered must be unique within the table. Unused entries are displayed as blank lines.

**Dialling Plan** — Dialling plan for network relating to current personality. Field Value = 0 The field Dialling Plan is set to RegioNet43 Field Value = 1 The field Dialling Plan is set to MPT1343 Field Value = 2 The field Dialling Plan is set to Dutch PTT Default Field Value = RegioNet43 Please refer to section 8. of MPT1343 for more information.

**File Save** — On entering this window, the 'File Name' box will default to the name of the file that was last accessed through either the File Open or File Save commands. If a file has not been accessed then this field will be blank. The drive and the directory path to search for files must be selected. The names of all files that are of the type listed in 'List Files Of Type' box, in the drive and directory path specified will be displayed in the 'Files' list box. The 'List Files Of Type' box and the 'Save' 

**Group Dial Digits** — Determines whether the radio uses two or three digit dialling for group calls. Field Value = 2 The field Group Dial Digits is set to Two Digit Group Dialling Field Value = 3 The field Group Dial Digits is set to Three Digit Group Dialling Default Field Value = 2 Please refer to section 8.2 of MPT1343 for more information.

**Highest Channel Number** — Highest channel number for comprehensive hunting. Range: 1..1023 Default Field Value = 1023 This field is dependent upon the Radio Configuration Data Field: Lowest Channel Number Please refer to section 8. of MPT1343 for more information.

**Highest System Channel Number** — If the radio receives a telegram instruction to tune to a channel which falls above the highest system channel number, then the instruction will be ignored.This field is available only from stage 2 onwards, and must be greater than or equal to the Lowest System Channel Number. Range : 1..1023 Default Field Value = 1023

**Home Channel** — Determines if the control channel is used for home channel hunt. Field Value = No The field Home Channel is set to Not home channel Field Value = Yes The field Home Channel is set to Home channel Default Field Value = No Please refer to section 9 of MPT1343 for more information. Channel (Control channel scanning) Channel Used for control channel scanning Range : 1..1023 Default Field Value = 1 This field is dependent upon the Radio Configuration Data Field : Lowest Channel Number Highest Channel

**Home Zone** — Used to determine the action of the radio when an ALHF or BCAST registration parameters telegram is received. Range: 0..15 If Network Type = 0 (Regional network). 0..511 If Network Type = 1 (National network). Default Field Value = 0 Please refer to section 8. of MPT1343 for more information.

**Indiv. Dial Digits** — Determines whether the radio uses two or three digit dialling for individual calls. Field Value = 2 The field Indiv. Dial Digits is set to Two Digit Individual Dialling Field Value = 3 The field Indiv. Dial Digits is set to Three Digit Individual Dialling Default Field Value = 2 Please refer to section 8.2 of MPT1343 for more information.

**Lowest Channel Number** — Lowest channel number for comprehensive hunting. Range: 1..1023 Default Field Value = 1 This field is dependent upon the Radio Configuration Data Field: Highest Channel Number Please refer to section 8. of MPT1343 for more information.

**Lowest System Channel Number** — If the radio receives a telegram instruction to tune to a channel which falls below the lowest system channel number, then the instruction will be ignored.This field is available only from stage 2 onwards, and must be less than or equal to the Highest System Channel Number. Range : 1..1023 Default Field Value = 1 HEST_SYSTEM_CHANNEL_NUMBER

**MAINT Telegrams in NPD Calls** — This determines whether the radio will generate PERIODIC and PRESELL ON/OFF MAINT telegrams when on a traffic channel for an NPD call. Default : Disabled.

**Others NS** — Number of samples. Range : 1..10 Default Field Value = 1 Please refer to section 8 of MPT1327 for more information. TA Time-out for called radio unit following AHY. Range : 10..120 in steps of 10 Default Field Value = 60 Please refer to section 11. of MPT1343 for more information. TB Time radio unit is bared from making an outgoing call following completion of signaling for a previous call. Range : Disabled, 1..60 Default Field Value = 2 Please refer to section 11. of MPT1343 for more informatio

**Preferential Hunt** — Determines the channel hunt procedure to use. Field Value = None The field Preferential Hunt is set to Neither hunt mechanism Field Value = Home Channel The field Preferential Hunt is set to Home Channel hunt enabled Field Value = NDD Subset The field Preferential Hunt is set to Preferential NDD Subset hunt enabled Default Field Value = None Dependencies : The Home Channel hunt option is only available if at least one home channel is specified in the Control Channel List. The NDD Subset option i

**Print** — The 'Section to Print' combo box will allow the user to select one of the following sections of data to be printed: User Manual, Network, Personality, and Alignment. Note : The above selections are only available if the file has been first loaded. It will be possible for the user to type in a comment to be printed in the 'Header / Comment' field of the printout. This feature is not available for the User Manual. The data printed out will be in a form similar to that displayed on the screen. Each

**Priority** — Indicates priority, 1 highest, 10 lowest, in a preferential NDD, preferential sampled, background search sequence type hunts. Range: 1..10 Default Field Value = 1 Please refer to section 9. of MPT1343 for more information.

**Read Radio** — When reading the Radio Configuration Data from a radio, regardless of the data area that is to be updated, all of the Radio Configuration Data will be read. If the operation of reading the data from a radio will overwrite unsaved data held in memory then a confirmation prompt message [Unsaved data will be lost. Do you want to continue ?] will be displayed, allowing the user to cancel the operation. The user will be able to select from All, Network, or Personality the data to be updated. On selec

**Registration Info** — Registration information transmitted by the radio in INFO field of RQR telegram. Range: 0..32767 Default Field Value = 0 Please refer to section 8. of MPT1343 for more information.

**Registration On Power Up** — Enables Registration on power up. Field Value = Blank The field Registration On Power Up is set to disabled Field Value = X The field Registration On Power Up is set to enabled Default Field Value = Blank Please refer to section 8 of MPT1327 for more information. YNCH_PATTERN_TYPE0

**Save** — This item provides the selection as to which type of data is to be saved, either Personality or Network. The Save radio buttons will default to the Personality selection.

**Time Shared NV** — Number of consecutive CCSC's to select a value of SYS for verification on a time-shared control channel. Range : 1..16 Default Field Value = 1 Please refer to section 8 of MPT1327 for more information.

**Time Shared NX1** — Error codeword limit prior to confirmation on a time-shared control channel. Range : Disabled, 1..255 Default Field Value = 8 Please refer to section 8 of MPT1327 for more information.

**Time Shared NX2** — Error codeword limit after confirmation on a time-shared control channel. Range : Disabled, 1..255 Default Field Value = 8 Please refer to section 8 of MPT1327 for more information.

**Time-shared** — Determines if the control channel is time shared Field Value = No The field Time-shared is set to Non time-shared Field Value = Yes The field Time-shared is set to Time-shared Default Field Value = No Please refer to section 9 of MPT1343 for more information. P_CONTROL_CHANNEL_HOMEd

**Trunked Overdialling** — Determines whether the DTMF Overdialling on trunked channels is enabled. This field will not be selectable and will be greyed out if the current Model Number indicates that the radio does not have a keypad. Field Value = Blank The field Trunked Overdialling is set to disabled Field Value = X The field Trunked Overdialling is set to enabled Default Field Value = Blank Please refer to section 8.2 of MPT1343 for more information.

## Calls & Signalling  (22)

**Bias Voltage** — The Value fields display the current setting of Supply Current Quiescent and Supply Current Target. The Status Bar fields will be updated to reflect the range and step value of the Supply Current Target. The Supply Current Quiescent field is view only.

**Broadcast Calls** — Determines whether the radio can make outgoing broadcast calls. When enabled reference should be made to section 9. of MPT1327 for supporting information. Field Value = Blank The field Broadcast Calls is set to disabled Field Value = X The field Broadcast Calls is set to Enabled Default Field Value = Disabled

**Call Diversion** — Determines whether the Call Diversion feature has been enabled. When enabled reference should be made to section 12. of MPT1327 for supporting information. Field Value = Blank The field Call Diversion is set to disabled Field Value = X The field Call Diversion is set to enabled Default Field Value = Blank

**Call in Absence** — Determines whether the Call In Absence feature is enabled. Field Value = Blank The field Call in Absence is set to disabled Field Value = X The field Call in Absence is set to enabled Default Field Value = Blank Please refer to section 9 of MPT1327 for more information. Call in Absence Delay~ Call in Absence Delay (s) This field will be greyed out if Call In Absence is disabled. Determines the duration of radio inactivity that must occur before an incoming call that satisfies the call in absence

**Counter Direction** — This field will be greyed out if the Normal Call and Emergency Call fields are both disabled. Determines whether the call duration counter is to count up or down. Field Value = Up The field Counter Direction is set to Up Field Value = Down The field Counter Direction is set to Down Default Field Value = Up Please refer to section 9 of MPT1327 for more information.

**Display Backlight Mode** — Determines the display backlight behavior during radio operation. This field will not be selectable and will be greyed out if the current Model Number indicates that the radio does not have a display. Field Value = Disabled The field Display Backlight Mode is set to disabled Field Value = Period The field Display Backlight Mode is set to Backlight illuminated for defined period while radio is involved in a call or user presses any key Field Value = Permanent The field Display Backlight Mode is s

**Emergency Calls** — Determines whether the radio can make outgoing emergency calls. When enabled reference should be made to section 10 of MPT1327 for supporting information. Field Value = Blank The field Emergency Calls is set to disabled Field Value = X The field Emergency Calls is set to enabled Default Field Value = Enabled

**External Alarm** — Determines whether the External Alarm feature is enabled. This field will not be selectable and will be greyed out if the current Model Number indicates that the radio is a GM600 radio. Field Value = Blank The field External Alarm is set to disabled The field External Alarm is set to X Field Value = Enabled, and set to External Alarm Duration value Default Field Value = Blank Please refer to section 9 of MPT1327 for more information. External Alarm Duration External Alarm Duration (s) This field

**Group Calls** — Determines whether the radio can make outgoing group calls. When enabled reference should be made to section 9. of MPT1327 for supporting information. Field Value = Blank The field Group Calls is set to disabled Field Value = X The field Group Calls is set to enabled Default Field Value = Blank

**Limit Normal Call (CLIM)** — Determines whether the Normal Call timer is enabled. Field Value = Blank The field Limit Normal Call (CLIM) is set to disabled Field Value = X The field Limit Normal Call (CLIM) is set to enabled, and set to Normal Call Duration value Default Field Value = Enabled Please refer to section 9 of MPT1327 for more information. Normal Call Duration Normal Call Duration (min:sec) This field will be greyed out if Normal Call is disabled. Defines the maximum call duration (CLIM). Range: 1..780 Default Fi

**NPD Alert Enable** — This determines whether the radio will generate alert tones during NPD call set-up. This field is available only from stage 2 onwards. Default : Disabled.

**NPD Calls** — Determines whether the radio can make Non-Prescribed Data calls. When enabled reference should be made to section 5. of MPT1327 for supporting information. Field Value = Blank The field NPD Calls is set to disabled Field Value = X The field NPD Calls is set to enabled Default Field Value = Disabled

**Normal Call Activation Delay** — Length of time a call initiator must be active, before a non - emergency call is initiated by the radio. Range: 0..5 in steps of 0.25 Default Field Value = 0

**Others ND1** — Number of disconnect messages sent by individually called radio unit. Range : Disabled, 1..31 Default Field Value = 3 Please refer to section 8 of MPT1327 for more information.

**Others ND2** — Number of disconnect messages sent by calling radio unit. Range : Disabled, 1..31 Default Field Value = 5 Please refer to section 8 of MPT1327 for more information.

**PABX Calls** — Determines whether the radio can make outgoing PABX calls. When enabled reference should be made to section 9. of MPT1327 for supporting information. Field Value = Blank The field PABX Calls is set to disabled Field Value = X The field PABX Calls is set to enabled Default : Blank

**PSTN Calls** — Determines whether the radio can make outgoing PSTN calls. When enabled reference should be made to section 5. of MPT1327 for supporting information. Field Value = Blank The field PSTN Calls is set to disabled Field Value = X The field PSTN Calls is set to enabled Default Field Value = Blank _ENABLED(

**Priority Calls** — Determines whether the radio can make outgoing priority calls. When enabled reference should be made to section 9. of MPT1327 for supporting information. Field Value = Blank The field Priority Calls is set to disabled Field Value = X The field Priority Calls is set to enabled Default Field Value = Blank

**Short Addressing PABX Calls** — Enables Short Addressing PABX calls. Field Value = Blank The field Short Addressing PABX Calls is set to disabled Field Value = X The field Short Addressing PABX Calls is set to enabled Default Field Value = Blank Please refer to section 11 of MPT1343 for more information.

**Status Calls** — Determines whether the radio can make outgoing status calls. When enabled reference should be made to section 13. of MPT1327 for supporting information. Field Value = Blank The field Status Calls is set to disabled Field Value = X The field Status Calls is set to enabled Default Field Value = Blank

**Tx Time Clear Down** — Determines radio operation if the user transmits for too long. Field Value = Blank The field Tx Time Clear Down is set to Call is cleared as per MPT1343 Field Value = X The field Tx Time Clear Down is set to Transmit is terminated but call is still active Default Field Value = Blank Please refer to section 4 of MPT1343 for more information.

**Voltage Limit** — The Value field displays the current setting of the Power Factor. The Status Bar fields will be updated to reflect the range and step value of the Power Factor.

## Radio-wide / Options  (46)

**Acoustic Feedback** — Determines whether the radio generates a key click when a key is pressed. Field Value = Blank The field Acoustic Feedback is set to disabled Field Value = X The field Acoustic Feedback is set to enabled Default Field Value = Blank ISPLAY_BACKLIGHT_MODE

**Add** — Selection of the 'Add' button will cause a further entry to be added to the table.

**Alert Tone Volume Offset** — An offset value which is added to the radio volume when an alert is being sounded so as to increase the volume. Range: -127..+128 Default Field Value = 0 Please refer to section 8.1.3.9 of MPT1343 for more information.

**Cancel** — When the 'Cancel' button is actioned the currently selected window will be closed with no further action being taken.

**Channel Voting Timer** — Time after which any entries that have not been voted on will be removed from the channel vote list. Range : 1..60 Default Field Value = 5 Please refer to section 9.3 of MPT1343 for more information.

**Continuous NC1** — Size of error check sample prior to confirmation on a continuous channel. Range : Disabled, 1..255 Default Field Value = 40 Please refer to section 8 of MPT1327 for more information.

**Continuous NC2** — Size of error check sample after confirmation on a continuous channel. Range : Disabled, 1..255 Default Field Value = 30 Please refer to section 8 of MPT1327 for more information.

**De/Pre-emphasis** — Determines the audio path configuration Field Value = MPT1327 The field De/Pre-emphasis is set to De/Pre-emphasized speech, flat data. Field Value = PAA1328 The field De/Pre-emphasis is set to De/Pre-emphasized speech and data. Default Field Value = Speech only Please refer to section 9 of MPT1327 for more information.

**Delete** — Selection of the 'Delete' button will remove the selected entry from the table.

**Field Length** — Length of preferred NDD sub-field in bits. Range: 0..9 Default Field Value = 0 Please refer to section 9. of MPT1343 for more information.

**Front End Filter** — On entering the window the Front End Filter field and slider bar will be set to their current values. It will then be possible to change a value by typing in a specific number in the Front End Filter field or by moving the slider bar. On selection of the Program button the appropriate SBEP communication will take place to program the current values into the radio and the window will be closed. On selection of the Cancel button the window will be closed.

**Imitate OACSU** — Determines whether the radio responds to a OACSU AHY (check = 1) by sending an ACK (Q = 0). Field Value = No The field Imitate OACSU is set to OACSU Imitate disabled Field Value = Yes : Off Hook The field Imitate OACSU is set to OACSU enabled while Off Hook Field Value = Yes The field Imitate OACSU is set to OACSU Imitate enabled Default Field Value = Disabled Please refer to section 8.2 of MPT1343 for more information.

**LMVote** — Differential signal strength required to make switch-over decision when voting. This field is available only from stage 2 onwards. Range : 0..7 ( 42dB in 6dB steps ) Default Field Value = 18

**Last Number Redial Enable** — This determines if the Last Number Redial Feature is enabled. Default : Disabled.

**Maxtrac Handset** — This field should be enabled when a Maxtrac handset is fitted to the radio. For operation with this handset the Audio PA should be turned off when the handset is off hook. When off hook the handsets internal speaker is used instead of the radio internal speaker. Field Value = Blank The field Maxtrac Handset is set to disabled Field Value = X The field Maxtrac Handset is set to enabled Default Field Value = Blank

**Minimum Volume Level** — The volume level required when the volume pot on the radio is at its full counter-clockwise position. Range: 0..255 Default Field Value = 70

**NVote** — Number of channel votes required to make switch-over decision when voting. This field is available only from stage 2 onwards. Range : 1..16 Default Field Value = 3

**Others NE** — Maximum number of random access transmissions of RQE. Range : Disabled, 1..31 Default Field Value = 16 Please refer to section 8 of MPT1327 for more information.

**Others NI** — Maximum number of traffic channel transmissions of RQS or RQX. Range : Disabled, 1..31 Default Field Value = 4 Please refer to section 8 of MPT1327 for more information.

**Others NR** — Maximum number of random access transmissions. Range : Disabled, 1..31 Default Field Value = 8 Please refer to section 8 of MPT1327 for more information.

**Others NT** — Maximum TSC response delay to unsolicited traffic channel message. Range : 103..1236 in steps of 103 Default Field Value = 103 Please refer to section 8 of MPT1327 for more information.

**Others NW** — Value of WAIT assumed at start of session. Range : Disabled, 1..60 Default Field Value = 5 Please refer to section 8 of MPT1327 for more information.

**Others NZ1** — Number of contiguous error check samples containing no error events. Range : 1..255 Default Field Value = 1 Please refer to section 8 of MPT1327 for more information.

**Others NZ2** — Number of contiguous error check samples each generating a codeword error event following an initial error event. Range : 1..255 Default Field Value = 2 Please refer to section 8 of MPT1327 for more information.

**Preferential NDD Table** — A maximum of 6 entries will be allowed. Valid entries are located consecutively, starting from entry 1. Please refer to section 9. of MPT1343 for more information.

**Program Default Radio Configuration Data** — The user will be prompted for the Serial Number to be used, and to Preserve the Crystal Data. On selection of the Program button the Radio Configuration Data will be written to the radio, also inserting the Serial Number typed in. The Radio Configuration Data is only available to be written when valid data is held in the DPS. If the Preserve Crystal Data selection was actioned, the existing Crystal Data will not be overwritten by default values. The Radio Transfer dialog box will then be display

**RSSI** — The Value fields display the current setting of the three RSSI levels. The values displayed are view only.

**RSSI Margin Level LM1** — RSSI margins for background search sequence. Range : 0..42 in steps of 6 Default : 0 Please refer to section 9.3 of MPT1343 for more information.

**RSSI Margin Level LM2** — RSSI margins for background search sequence. Range : 0..42 in steps of 6 Default : 0 Please refer to section 9.3 of MPT1343 for more information.

**RSSI Margin Level LM3** — RSSI margins for background search sequence. Range : 0..42 in steps of 6 Default Field Value = 0 Please refer to section 9.3 of MPT1343 for more information.

**RSSI Margin Level LM4** — RSSI margins for background search sequence. Range : 0..42 in steps of 6 Default Field Value = 0 Please refer to section 9.3 of MPT1343 for more information.

**Radio Config Byte 1 (Binary)** — This Byte is provided to control any additional features that may be added to the radio at a future date. Range : Binary number, (0..255)

**Radio Config Byte 1 (Hex)** — This Byte is provided to control any additional features that may be added to the radio at a future date. Range : Hexadecimal number, (0..FF)

**Radio Config Byte 2 (Binary)** — This Byte is provided to control any additional features that may be added to the radio at a future date. Range : Binary number, (0..255) LCDAT_DEALER_R00.05.04

**Radio Config Byte 2 (Hex)** — This Byte is provided to control any additional features that may be added to the radio at a future date. Range : Hexadecimal number, (0..FF) ADIO_CONFIG_BYTE_1_B

**Radio Config Byte 2(Hex)** — This Byte is provided to control any additional features that may be added to the radio at a future date. Range : Hexadecimal number, (0..FF)

**Rated Volume** — On entering the window the Rated Volume field and slider bar will be set to their current values. It will then be possible to change a value by typing in a specific number in the Rated Volume field or by moving the slider bar. On selection of the Program button the appropriate SBEP communication will take place to program the current values into the radio and the window will be closed. On selection of the Cancel button the window will be closed. _LOW_POWER_LEVEL Low Power Levelo Low Power Level 

**Squelch Attenuation** — On entering the window the Squelch Attenuation field and slider bar will be set to their current values. It will then be possible to change a value by typing in a specific number in the Squelch Attenuation field or by moving the slider bar. On selection of the Program button the appropriate SBEP communication will take place to program the current values into the radio and the window will be closed. On selection of the Cancel button the window will be closed.

**Synch. Pattern Type** — Selects the Synchronization Pattern Type Field Value = 0 The field Synch. Pattern Type is set to MPT 1327 Field Value = 1 The field Synch. Pattern Type is set to PAA 1382 Default Field Value = 0 Please refer to section 10 of MPT1343 for more information.

**TVote** — Time after which any entries in the vote list which have not been voted on will be removed from the list. Range : 1..16 minutes Default Field Value = 5

**Text Description for File Open** — This box displays the Text Description of the selected file, which was entered when the file was saved.

**Text Description for File Save** — This box provides the facility to both edit and display the Text Description of the selected file. A text description may be entered into this box before the file is saved to provided a more detailed information on the file and it's contents.

**Time Shared NC1** — Size of error check sample prior to confirmation on a time-shared channel. Range : Disabled, 1..255 Default Field Value = 40 Please refer to section 8 of MPT1327 for more information.

**Time Shared NC2** — Size of error check sample after confirmation on a time-shared channel. Range : Disabled, 1..255 Default Field Value = 30 Please refer to section 8 of MPT1327 for more information.

**Tx Power** — Selects the power level for this channel. Field Value = Low The field Tx Power is set to Low power Field Value = High The field Tx Power is set to High power Default Field Value = Low Please refer to section 8.2 of MPT1343 for more information. CONV_PERS_RX~

**Tx Power Level** — Selects the power level used by the radio in trunked mode. Field Value = Low The field Tx Power Level is set to Low power Field Value = High The field Tx Power Level is set to High power Default Field Value = Low Please refer to section 8.2 of MPT1343 for more information.
