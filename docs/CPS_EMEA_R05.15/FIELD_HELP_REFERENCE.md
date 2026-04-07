# Commercial Series CPS — Field Help Reference

> Complete field documentation extracted from `elp_elm_cpsenglish.chm` (CPS R05.15 EMEA)
> 1036 help topics covering all programmable radio parameters

---

## Table of Contents

- [Accessory Configuration](#accessory-configuration) (12 topics)
- [Button Configuration](#button-configuration) (1 topics)
- [Conventional Personalities](#conventional-personalities) (1 topics)
- [Drag and Drop](#drag-and-drop) (1 topics)
- [Editing Operations](#editing-operations) (3 topics)
- [General Field Reference](#general-field-reference) (781 topics)
- [General Radio Settings](#general-radio-settings) (20 topics)
- [Getting Started / How-To](#getting-started---how-to) (4 topics)
- [MDC System Configuration](#mdc-system-configuration) (4 topics)
- [MDC1200 Signaling](#mdc1200-signaling) (2 topics)
- [Multiple Selection](#multiple-selection) (1 topics)
- [Personality (Per-Channel) Settings](#personality-per-channel-settings) (25 topics)
- [Pop-up Tooltips](#pop-up-tooltips) (83 topics)
- [Quik-Call II Signaling](#quik-call-ii-signaling) (2 topics)
- [Quik-Call II System](#quik-call-ii-system) (13 topics)
- [Radio Information](#radio-information) (6 topics)
- [Reports](#reports) (5 topics)
- [Scan List Configuration](#scan-list-configuration) (7 topics)
- [Scan Settings](#scan-settings) (6 topics)
- [Signaling Configuration](#signaling-configuration) (4 topics)
- [Troubleshooting](#troubleshooting) (53 topics)


---

## Accessory Configuration

### Accessory Microphone Gain

*Source: `accessories/accessory_microphone_gain_radio_configuration.htm`*

Accessory Microphone Gain
Selects the Gain for the Accessory Microphone headset. This adjusts
the sensitivity of the microphone.
The Accessory Microphone attaches into the microphone jack of the mobile
radio. The range is from 1.5 dB to 46.5 dB, in increments of 1.5 dB.
Notes
Available
when the radio is a Mobile model.

### Accessory Power Up Delay

*Source: `accessories/accessory_power_up_delay_radio_configuration_.htm`*

Accessory Power Up Delay
(Expert Feature)
Selects the amount of time (during radio power-up) that the Active
Level
of the Accessory
Connector pins are ignored. During this time any functionality associated
with all connector pins is delayed for the duration of the timer. Range
is from 100 ms to 6400 ms, in increments of 100 ms.
Notes
Available
when the radio is a Mobile model.

### Data PTT Audio Source

*Source: `accessories/data_ptt_audio_source_radio_configuration_.htm`*

Data PTT Audio Source
(Expert Feature)
Selects the point of input for audio data, and whether filtering is
applied. Data PTT Audio is generally used with accessories such as a Global
Positioning System (GPS) or Vehicular Radio Modem (VRM).
Choices
Functionality
Disabled:
No audio input enabled.
Flat Tx Audio:
The external microphone is on the partially
programmable Pin #5 of the Accessory Connector, and the
audio is un-filtered.
Ext. Mic Audio:
The external microphone is on the partially
programmable Pin #2 of the Accessory Connector, and the
audio is filtered.
Ext Mic and Flat Tx Audio:
Both inputs are enabled simultaneously.
Notes
Available
when the radio is a Mobile model.

### Data PTT Overrides Voice

*Source: `accessories/data_ptt_overrides_voice_radio_configuration_.htm`*

Data PTT Overrides Voice
(Expert Feature)
When checked, selects PTT
with a data transmission to override a voice transmission. When the radio
is transmitting or receiving a voice transmission, enabling this selection
allows PTT with data to interrupt the voice transmission and begin its
own transmission.
Notes
Available
when the radio is a Mobile model.

### Debounce Duration

*Source: `accessories/debounce_duration_radio_configuration_.htm`*

Debounce Duration
(Expert Feature)
Selects the amount of time that the radio waits before rechecking any
fully programmable Accessory
Connector pin�s Active
Level.
Debounce is the electrical noise usually caused by relays or other mechanical
devices, which can cause misleading readings. Therefore certain Accessory
Connector pins may require a wait time to allow for possible debounce
noise. This applies to Input Lines only.
Range is from 0 ms to 375 ms, in increments of 25 ms.
Notes
Available
when the radio is a Mobile model.

### External PTT Audio Source

*Source: `accessories/ext_ptt_audio_source_radio_configuration_.htm`*

External PTT Audio Source
(Expert Feature)
Selects the point of input, and whether filtering is applied. External
PTT Audio is generally used when the radio and the radio-user are in two
different locations. For example, the radio-user is inside the car and
the radio is in the vehicle�s trunk.
Choices
Functionality
Disabled:
No audio input enabled.
Flat Tx Audio:
The external microphone is on the partially
programmable Pin #5 of the Accessory Connector, and the
audio is un-filtered.
Ext. Mic Audio:
The external microphone is on the partially
programmable Pin #2 of the Accessory Connector, and the
audio is filtered.
Ext Mic and Flat Tx Audio:
Both inputs are enabled simultaneously.
Notes
Available
when the radio is a Mobile model.

### External Alarm Delay

*Source: `accessories/external_alarm_delay_radio_configuration_.htm`*

External Alarm Delay
(Expert Feature)
Selects the amount of time prior to the External Alarm Duration timer.
Once this External Alarm Delay timer expires, the External
Alarm Duration timer begins and the External
Alarm
becomes active. Range is from 0 second to 30 seconds, in increments of
1 second.
Notes
Available
when the radio is a Mobile model.
During
this timer period, any radio-user interaction with the Control Head (other
than volume control) deactivates an impending External Alarm. The External
Alarm then waits in an armed state to be triggered again.

### External Alarm Duration

*Source: `accessories/external_alarm_duration_radio_configuration_.htm`*

External Alarm Duration
Selects the amount of time that the External
Alarm
feature remains active. The External Alarm is activated by an incoming
Call. Range is from 1 second to 20 seconds, in increments of 1 second.
Notes
Available
when the radio is a Mobile model.
Any radio-user
interaction with the Control Head (other than volume control) deactivates
an active External Alarm. The External Alarm then waits in an armed state
to be triggered again.

### Handset

*Source: `accessories/handset_radio_configuration_.htm`*

Handset
When checked, enables the Handset accessory feature. The Handset is
similar to a telephone handset, which allows for speaker privacy.
Notes
Available
when the radio is a Mobile model.

### Headset Sidetone

*Source: `accessories/headset_sidetone.htm`*

Headset Sidetone
When checked, causes voice to be routed to an Accessory Connector external
headset speaker. Headset Sidetone can also be adjusted by adjusting the
Alert Tone
Volume Offset.
Notes
Available
when the radio is a Portable model.
If you
are using RSM (Remote Speaker Microphone), checking this option will cause
the radio to generate some noise while transmitting.
See Also
VOX

### Rx Audio Type

*Source: `accessories/rx_audio_type_radio_configuration_.htm`*

Rx Audio Type
Selects the configuration of the audio output line. The audio output
line uses Pin #11 of the Accessory Connector. Certain external
accessories such as modems or public address systems may require unfiltered
or filtered audio.
Choices available are:
Flat Audio (Unfiltered)
Filtered Audio
Notes
Available
when the radio is a Mobile model.

### VOX Microphone Gain

*Source: `accessories/vox_microphone_gain.htm`*

VOX Microphone Gain
(Expert Feature)
Selects the Gain for the VOX Microphone headset. This adjusts the sensitivity
of the microphone.
The VOX Microphone attaches to the Accessory Connector of a portable
radio. Range is from 1.5 dB to 46.5 dB, in increments of 1.5 dB.
Notes
Available
when the radio is a Portable model.


---

## Button Configuration

### Long Press Duration

*Source: `buttons/long_press_duration_radio_configuration.htm`*

Long Press Duration
Selects the amount of time that the radio-user is required to press
(and hold down) a button, for the press to be interpreted by the radio
as a long press. The radio�s programmable buttons can be assigned unique
long press vs short press functionality. Range is from 500 ms to 16000
ms, in increments of 500 ms.


---

## Conventional Personalities

### Channel Position

*Source: `conventional_personalities/Channel_Position.htm`*

Channel Position
A Personality can be reassigned to any channel
position.
Highlight Channel Position
in the tree view.
Highlight a Personality.
Use the mouse to either
drag and drop or hold the <Ctrl> key while pressing the Up/Down
arrows to reassign the Personality to a different channel position.


---

## Drag and Drop

### Drag And Drop

*Source: `drag_and_drop/drag_and_drop.htm`*

Drag And Drop
Signaling Systems, Personalities, Phone Systems, and Call Systems can
be dragged (copied) from one document and dropped (pasted) into another
document using the mouse (similar to Windows Explorer).
Highlight the folder.
Drag it to the appropriate
folder in the other document. The Signaling System, Personality, Phone
System, or Call System appears in the tree view.
Notes
When
dragging a folder, the CPS "Invalid" cursor appears
whenever the drop location is inappropriate.


---

## Editing Operations

### Copying and Pasting

*Source: `cut__copy__paste__and_rename/copying_and_pasting.htm`*

Copying and Pasting
Signaling Systems, Personalities, Phone Systems, and Call Systems can
be copied from one document and pasted to another document, or pasted
into the same document.
Highlight the item in the tree view.
From the Edit
menu choose Copy; or right mouse
click and choose Copy, or from
the tool bar click
In the document to be copied or pasted into, highlight
the folder.
From the Edit
menu choose Paste, or right mouse
click and choose Paste, or from
the tool bar click
Notes
To
Copy and Paste multiple and consecutive folders, hold down the <Shift>
key while clicking the mouse on the desired items.
Or, hold the <Shift> key down while pressing the Up/Down arrow
keys to select one at a time.
To Copy
and Paste multiple non-consecutive folders, hold down the <Ctrl>
key while clicking the mouse on the desired items.

### Cutting and Pasting

*Source: `cut__copy__paste__and_rename/cutting_and_pasting.htm`*

Cutting and Pasting
Signaling Systems, Personalities, Phone Systems, and Call Systems can
be cut (removed) from one document and pasted to another document.
Highlight the item in
the tree view.
From the Edit
menu choose Cut; or right mouse
click and choose Cut, or from
the tool bar click .
In the document to be
copied or pasted into, highlight the folder.
From the Edit
menu choose Paste, or right mouse
click and choose Paste, or from
the tool bar click
Notes
To
Cut and Paste multiple and consecutive folders, hold down the <Shift>
key while clicking the mouse on the desired items.
Or, hold the <Shift> key down while pressing the Up/Down arrow
keys to select one at a time.
To Cut
and Paste multiple non-consecutive folders, hold down the <Ctrl>
key while clicking the mouse on the desired items.

### renaming

*Source: `cut__copy__paste__and_rename/renaming.htm`*

Renaming
Signaling Systems, Personalities, Scan Lists, Phone
Systems, and Call Systems can all be renamed.
Highlight the item to be renamed in the tree view.
From the Edit
menu choose Rename, or, right
mouse click and choose Rename.
Rename the item.
Notes
A maximum
of 8 characters is allowed. Valid characters are A-Z a-z 123456789 \ #
< > * + _ / -


---

## General Field Reference

### About Auto Acknowledges

*Source: `(root)/About_Auto_Acknowledges.htm`*

About Auto Acknowledges
After transmission of a telegram, the radio may be programmed to expect
various acknowledgement(s), responses from the called radio / called radio
user.
The following Ack Expected options are programmable per telegram:
No Ack Expected
First Ack Only Expected
For each decoder any of the following �Auto-Acks� can be enabled or
disabled:
Auto-Ack
On Decode: ��Auto-Ack�� telegram is sent automatically immediately
on decode.
Call
Forward - An ��Auto-Ack�� telegram is sent if the radio user has enabled
call forward to indicate he/she is away from the vehicle.
The Call Forward telegram will only be sent if the user selects the
Call Forward feature.
For the display models only, Call Forward may be enabled / disabled
from a menu programmed for Call Forward.
If both the ��Auto-Ack�� On Decode and Call Forward ��Auto-Ack�� are
enabled for a given decoder, if the user enables Call Forward and a decode
matching the decoder is received, then the ��Auto-Ack�� telegram, followed
by the Call Forward telegram will be transmitted.
Acknowledge Delay:
Auto acknowledge, call forward. All support two options for determining
when the reply signalling is sent. When the radio receives a call and
establishes that some type of reply is required, the acknowledge timer
will be started, and the reply sent will depend on which of the two options,
listed below, below has been selected.
Notes
Available
when the radio is a Select 5 model.

### About Decoder Definitions

*Source: `(root)/About_Decoder_Definitions.htm`*

About Decoder Definitions
The radio only supports decode using Select 5 signalling systems.
The radio supports 16 parallel decoders, each of which can be enabled/disabled
per personality.
Unlike for encode, the same signalling system is used for each decode
sequence within the telegram, hence signalling systems are assigned per
decoder. This is to avoid problems that arise from signalling systems
that use tone frequencies, which overlap, with tone frequencies used by
other signalling systems. For example, if the radio received a tone of
frequency 1060 Hz, duration 70 ms, the software wouldn't be able to tell
if this was Modified ZVEI tone 2 or French Modified tone 1. In addition
the software wouldn't know which signalling standards decode tolerances
to use when determining whether to accept/reject a tone, for example different
signalling standards use different frequency and duration tolerances.
Tones for reception are again grouped into sequences.
A decode telegram consists of between 1-3 concatenated decode sequences.
Along with the decoders signalling system and decode telegram, each
decoder also specifies various decode actions such as call alert enable/disable,
call led enable/disable, display of calling identity/name.
Notes
Available
when the radio is a Select 5 Display model.

### About Encoder Sequences

*Source: `(root)/About_Encoder_Sequences.htm`*

About Encoder Sequences
Conventional signalling provides a mechanism for selective calling between
radio users operating on the same channel frequency and where privacy
is required during the call.
Both Select 5 and DTMF conventional signalling systems are supported
and the radio is capable of transmitting both Select 5 and DTMF. Only
Select 5 decode is supported.
Up to 32 encoder sequence lists may be programmed into the radio.
If one of the seven supported signalling standard is chosen, the tones
will be pre-defined for frequency, duration and the time interval between
the tones. The radio also offers the option of 2 �User Defined standards�.
A sequence acts in the same manner as a telephone number and under normal
operation a Select 5 telegram, is used to address a specific radio. When
a radio receives its code, its user is alerted to the call by a series
of 5 rapid alert tones and the radio unmutes.
See Also
About
Telegrams
Notes
Available
when the radio is a Select 5 model.

### About Encoder Telegrams

*Source: `(root)/About_Encoder_Telegrams.htm`*

About Encoder Telegrams
In order to make a selective call; the radio can be programmed to send
one, two or three Select 5 sequences in rapid succession, e.g.:
12345, or
12345  34251,
or
12345  34251
87589
Whatever the number and combination of sequences, this is known as a
telegram.
Up to 32 telegrams may be programmed into the radio, each being any
combination of the 32 encode sequences.
Telegrams may be sent in a variety of ways, such as pressing the PTT,
or one of the programmable function buttons which has set to be a call
button. It is also possible to have an external call button.
Telegrams are also used to define the message sent by the Auto-Acknowledge
and Call Forward features.
It is also possible for groups of users to share a group number as well
as having an individual number.
If a sequence has identical sequential digits, the radio will automatically
change some of the digits for �repeat tones.
e.g.   1
2 3 3 3 5.
This will be changed by the radio to:  1
2 3 R 3 5.
This process is used to prevent code corruption during decoding.
See Also
About
Telegrams
Notes
Available
when the radio is a Select 5 model.

### About Multicall Address

*Source: `(root)/About_Multicall_Address.htm`*

About Multicall Address
If �Address Send� is programmed to a button, this button will then have:
An associated telegram
that contains user variable digits.
An �Address� buffer containing the associated
telegram number and address digits.
When a telegram is decoded, and the corresponding
decoder has Call Back enabled, the ID of the
calling radio is entered into the �Address� buffer after the telegram
number. The user is able to call back at a later time by using a single
key press to activate the call (ie to send the associated telegram with
the address digits of the �Address� buffer assigned to the variable digits).
If the radio has been programmed as an Advanced Multicall user, the
Contact List will be used, after successful decode, to determine whether
or not there is a name for the caller that can be displayed. It is also
used to determine which telegram is used for call back using the Address
Send telegram trigger.
Notes
Available
when the radio is a Select 5 Display model.

### About the Contact List

*Source: `(root)/About_the_Contact_List.htm`*

About the Contact List
The Contact List may contain up to 255 entries. Each entry must contain
an address that may have an associated 8 character alphanumeric name and
an associated telegram.
The Contact List allows radios users to select a dial string from the
list without having to enter dial digits.
For Select 5 decode, the Contact List allows the radio to display a
name identifying the caller.
Notes
Available
when the radio is a Select 5 Display model.

### About the Decoder Status List

*Source: `(root)/About_the_Decoder_Status_List.htm`*

About the Decoder Status List
The Decoder Status List allows a called radio to display the callers
status as a name, instead of having to display less meaningful status
digits.
The maximum size of the Decode Status List is 255 entries with associated
aliases.
Notes
Available
when the radio is a Select 5 Display model.
The radio
may be programmed such that there is only one status list which contains
both Encode and Decode Status entries by enabling Use
Decoder Status List. If Use Decoder Status List is selected, the Encode
Status List is disabled and Decode Status List is used for both Encode
and Decode Status.

### About the Encoder Status List

*Source: `(root)/About_the_Encoder_Status_List.htm`*

About the Encoder Status List
Multicall also allows a calling radio unit to send status messages to
the called radio. This status may either be selected from the Status List,
or may be entered directly from the keypad (Direct Entry).
The Encoder Status List allows a radio user to select a status from
a list of names. If an encode telegram containing variable status digits
is transmitted, it will contain the Encode status digits associated with
the list position of the selected alias.
The maximum size of the Encoder Status List is 255 entries.
Notes
Available
when the radio is a Select 5 Display model.
The radio
may be programmed such that there is only one status list which contains
both Encode and Decode Status entries by enabling Use
Decoder Status List. If Use Decoder Status List is selected, the Encode
Status List is disabled and Decode Status List is used for both Encode
and Decode Status.

### Access Code

*Source: `(root)/Access_Code.htm`*

Access Code
Specifies the 8 digit Access Code for the current Phone
System.
The Access Code allows a connection to a telephone line and subsequent
dial tone.
Notes
Available
when the radio is a Display model.
Valid characters available are 0-9,
*, #

### Access/Deaccess Type

*Source: `(root)/Access_Deaccess_Type.htm`*

Access/Deaccess Type
Selects the method used to send the
Access
and Deaccess
codes that are defined for the current Phone
System.
This feature applies while in Phone
Mode
for the current Phone System.
Choices
Functionality
Manual:
Radio-user enters the Access or Deaccess
code from the Keypad. This choice is available only when the radio is
a Display Mobile or a Full Keypad Portable model.
Delayed Auto:
Radio-user presses and releases the PTT
button to automatically send the Access code. The Deaccess code is automatically
sent when the radio exits the Phone Mode.
Immediate Auto:
The Access code is automatically sent when
the radio enters the Phone Mode. The Deaccess code is automatically sent
when the radio exits the Phone Mode.
Notes
Available
when the radio is a Display model.
Manual
is not an available choice for
a Limited Keypad Portable.

### Accessory Package/Pin

*Source: `(root)/Accessory_Package_EMEA.htm`*

Accessory Package/Pin
Selects an accessory connector package. Each package assigns a related
group of default settings to the fully programmable pins of the Accessory
Connector. Once an Accessory Package has been assigned, individual
pin settings may be modified.
The Accessory Pins allow you to view or define the Fully Programmable
Accessory
Connector pin functionality. There are three categories for the 16
Accessory Connector pins: Fully Programmable, Partially Programmable,
and Fixed - Not Programmable.
Choices available are:
Default
Public Address
Remote
Paging Encoder
RICK or i20R Tx (Repeater
Inter-Connect
Kit)
RICK or i20R Rx (Repeater Inter-Connect Kit)
Tel Interconnect
(ZR340) Simplex
Community RPTR (ZR310)
Tx
Community RPTR (ZR310)
Rx
Tel Interconnect (ZR340)
Tx
Tel Interconnect (ZR340)
Rx
Channel Steering
Phone Patch or
i750R
CES Data Terminal
Notes
Available
when the radio is a Mobile model.
The Function
Select,
Data PTT, and PA
Switch,
are mutually exclusive selections. That is, when selecting either one,
the other will not be available.

### Accessory Package/Pin (Select 5)

*Source: `(root)/Accessory_Package_Pin_(Select_5).htm`*

Accessory Package/Pin (Select 5)
Selects an accessory connector package. Each package assigns a related
group of default settings to the fully programmable pins of the Accessory
Connector. Once an Accessory Package has been assigned, individual
pin settings may be modified.
The Accessory Pins allow you to view or define the Fully Programmable
Accessory
Connector pin functionality. There are three categories for the 16
Accessory Connector pins: Fully Programmable, Partially Programmable,
and Fixed - Not Programmable.
Choices available are:
RICK or i20R Tx (Repeater
Inter-Connect
Kit)
RICK or i20R Rx (Repeater
Inter-Connect
Kit)
Tel Interconnect
(ZR340) Simplex
Community RPTR (ZR310)
Tx
Community RPTR (ZR310)
Rx
Tel Interconnect
(ZR340) Tx
Tel Interconnect
(ZR340) Rx
General I/O Package
Notes
Available
when the radio is a Select 5 Mobile model.
The Function
Select,
Data PTT, and PA
Switch,
are mutually exclusive selections. That is, when selecting either one,
the other will not be available.

### Ack Value

*Source: `(root)/Ack_Value.htm`*

Ack Value
(Expert Feature)
Selects the type of acknowledgment that is sent back when the radio
receives a DTMF call, for the current DTMFSignaling
Systems.
Choices
Functionality
None:
Digit:
One DTMF digit is transmitted after the
call. The range is from 0 through 9, * and #.
ID:
The DTMF Primary ID is transmitted
after the call.
Notes
This
feature is only available for radio models equipped with the option board
capability.
To decode
DTMF transmission or DTMF acknowledgement data, a radio must have a Simple
Decoder option board installed. See Option
Board Type.
Available
when DTMF Call Type is not
set to None or Sel
Cal.

### Acknowledge Delay

*Source: `(root)/Acknowledge_Delay.htm`*

Acknowledge Delay
(Expert Feature)
This timer will cause the radio to transmit the reply once the timer
expires, regardless of the state of carrier detect on the channel. If
the timer is programmed as zero then the radio will reply to the call
as fast as possible, but obviously not instantly.
Range is from 0 to 6375 ms, in increments of 25ms.
Notes
Available
when the radio is a Select 5 model.

### Acknowledge Expected

*Source: `(root)/Acknowledge_Expected.htm`*

Acknowledge Expected
Selects the type of acknowledgement expected by the radio.
Choices
Functionality
None:
The radio does not expect an acknowledgement.
ACK 1:
In the called radio, ensure that the Auto Acknowledge telegram in
the Decoder Definitions is enabled and set up as required and Ack1/Authorisation
in set in Decoder Definitions Decoder Type.
This decoder type must have Select
5 Decode Auto Reset Deauthorises Enabled in the Personalities Window
to which these Encode and Decode telegrams are assigned.
The calling radio will
go into receive mode immediately after the telegram transmission and it
will sound the error button alert if the PTT button remains pressed. It
goes into the receive mode because it is expecting an immediate response
(ACK1) from the called radio.
The calling radio will
remain held in the receive mode until either:
1) It receives an ACK1 from the called
radio, in which case the calling radio unmutes and the user can now use
the PTT button.
2) If the radio does not receive an ACK1
response from the called radio, but its Call
Answer Timer times out, the radio will return to normal operation.
Note:
It may also be an acknowledgement from a system/infrastructure and is
allowing the calling radio to transmit on a channel.
ACK1 with Answer:
In the called radio ensure that the Auto
Acknowledge telegram is set to an available Ack and Ack1/Ringing in
set in Decoder Definitions Decoder Type.
This decoder type must have Select
5 Decode Auto Reset Deauthorises disabled in the Personalities Window
to which these Encode and Decode telegrams are assigned.
If this option is programmed, both the following
must happen before the calling radio can transmit:
The calling radio will remain held in the
receive mode until either:
1) It receives an ACK1
from the called radio, in which case the calling radio unmutes and the
user can now use the PTT button.
2) If the radio does
not receive an ACK1 response from the called radio, but its Call
Answer Timer times out, the radio will return to normal operation.
The calling radio�s name
will be displayed on the called radio�s display for the duration of the
call, or until the Call Answer
Timer expires.
The Call
Answer Timer is set to the required time in the Signalling window.
Once the calling radio
unmutes after the called radio answers the call, the Outgoing Ringing
alert will stop.
The calling radio is then
able to answer the call after the called radio has de-keyed.
If the option, First Ack
Expected, Called User Must Answer is programmed, and the calling radio�s
Call Answer Timer expires, the Outgoing Ringing alert will stop and the
Call Failure Alert will be sounded.
Notes
Available
when the radio is a Select 5 model.

### Acknowledge Expected Duration

*Source: `(root)/Acknowledge_Expected_Duration.htm`*

Acknowledge Expected Duration
Sets the time period for an expected reply to a radio's call. Range
is from 1 to 255 seconds, in increments of 1 second.
Notes
Available
when the radio is a Select 5 Display model.

### Acknowledge Telegram

*Source: `(root)/Acknowledge_Telegram.htm`*

Acknowledge Telegram
Specifies which predefined telegram from the telegram list is used for
Auto Acknowledge.
Notes
Available
when the radio is a Select 5 model.
Available
when a Telegram has been defined.

### Active Level (Select 5)

*Source: `(root)/Active_Level_(Select_5).htm`*

Active Level (Select 5)
Selects the voltage level required to activate
an Accessory Connector for either of the pins selected functionality.
Choices available are:
Low
High
Notes
Available
when the radio is a Select 5 Mobile model.
All pins default to Low except Pin #4, which
defaults to High.
See Also
Pin
#3 Function Select
Pin
#4 Function Select
Pin
#8 Function Select
Pin
#9 Function Select
Pin
#12 Function Select
Pin
#14 Function Select

### Active Level

*Source: `(root)/Active_Level_EMEA.htm`*

Active Level
Selects the voltage level required to activate
an Accessory Connector for either of the pins selected functionality.
Choices available are:
Low
High
Notes
Available
when the radio is a Mobile model.
All pins default to Low except Pin #4, which
defaults to High.
See Also
Pin
#3 Function Select
Pin
#4 Function Select
Pin
#6 Function Select
Pin
#8 Function Select
Pin
#9 Function Select
Pin
#12 Function Select
Pin
#14 Function Select

### Adding Auto Acknowledges

*Source: `(root)/Adding_Auto_Acknowledges.htm`*

Adding Auto Acknowledges
There are multiple ways to add Auto Acknowledges.
Highlight Auto Acknowledges  in
the tree view.
Click
the Add Acknowledge button, or
Right mouse
click on Auto Acknowledges and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Auto Acknowledge (Ack) appears in the tree view.
Notes
Available
when the radio is a Select 5 model.
Up to
16 Auto Acknowledges are allowed.

### Adding DTMF Systems

*Source: `(root)/Adding_DTMF_Systems.htm`*

Adding DTMF Systems
There are multiple ways to add DTMF Systems.
Highlight DTMF System in the tree view.
Click
the Add DTMF System button, or
Right mouse
click on DTMF System and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new DTMF System (Sys) appears in the tree view.
Notes
This
feature is only available for radio models equipped with the option board
capability.

### Adding Decoder Definitions

*Source: `(root)/Adding_Decoder_Definitions.htm`*

Adding Decoder Definitions
There are multiple ways to add Decoder Definitions.
Highlight Definitions in the tree view.
Click
the Add Definition button, or
Right mouse
click on Definitions and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Definition (Def) appears in the tree view.
Notes
Available
when the radio is a Select 5 model.
Up to
16 Decoder Definitions are allowed.

### Adding Encoder Sequences

*Source: `(root)/Adding_Encoder_Sequences.htm`*

Adding Encoder Sequences
There are multiple ways to add Encoder Sequences.
Highlight Sequences in the tree view.
Click
the Add Sequence button, or
Right mouse
click on Sequences and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Sequence (Seq) appears in the tree view.
Notes
Available
when the radio is a Select 5 model.
Up to
32 Encoder Sequences are allowed.

### Adding Encoder Telegrams

*Source: `(root)/Adding_Encoder_Telegrams.htm`*

Adding Encoder Telegrams
There are multiple ways to add Encoder Telegrams.
Highlight Telegrams in the tree view.
Click
the Add Telegram button, or
Right mouse
click on Telegrams and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Telegram (Tel) appears in the tree view.
Notes
Available
when the radio is a Select 5 model.
Up to
32 Encoder Telegrams are allowed.

### Adding LTR Sites

*Source: `(root)/Adding_LTR_Sites.htm`*

Adding LTR Sites
There are multiple ways to add LTR Sites.
Highlight LTR Sites in the tree view.
Click
the Add button, or
Right mouse
click on LTR Sites and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new LTR Site (Site) appears in the tree view.
Notes
This
feature is available only on radios that are LTR capable.
Up to
4 sites are allowed for a Non-Display portable radio.
Up to
10 sites are allowed for a Display radio.

### Adding Personalities

*Source: `(root)/Adding_Personalities_(Select5).htm`*

Adding Personalities
There are multiple ways to add Personalities.
Highlight Personalities in the tree view.
Click
the Add Personality button, or
Right mouse
click on Personalities and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Personality (Pers) appears in the tree view.
Notes
Up to
16 Personalities are allowed for Non-Display Portable models.
Up to
32 Personalities are allowed for Limited-Display Portable models.
Up to
64 Personalities are allowed for Full Keypad Portable models.
Up to
100 Personalities are allowed for Mobile models.

### Adding Repeaters

*Source: `(root)/Adding_Repeaters.htm`*

Adding Repeaters
There are multiple ways to add Repeaters to an LTR Site.
Highlight Repeaters in the tree view.
Click
the Add button, or
Right mouse
click on Repeaters and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Repeater (Rep) appears in the tree view.
Notes
This
feature is available only on radios that are LTR capable.
Up to
20 Repeaters are allowed per LTR Site.
A Repeater
Number cannot be duplicated.
When adding
Repeaters using the Copy & Paste, Cut & Paste, or Drag & Drop
methods from other documents, be aware that the Repeater name in the tree
view may not correspond to the actual Repeater Number. You will need to
manually rename the Repeater name in the tree view.

### Adding Select 5 Systems

*Source: `(root)/Adding_Select_5_Systems.htm`*

Adding Select 5 Systems
There are multiple ways to add Select 5 Systems.
Highlight Select 5 Systems in the tree view.
Click
the Add Select 5 System button,
or
Right mouse
click on Select 5 Systems and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Select 5 System (Sys) appears in the tree view.
Notes
Available
when the radio is a Select 5 model.
Up to
eight Select 5 Systems are allowed

### Adding Talk Groups

*Source: `(root)/Adding_Talk_Groups.htm`*

Adding Talk Groups
There are multiple ways to add Talk Groups to an LTR
Site.
Highlight Talk Group in the tree view.
Click
the Add button, or
Right mouse
click on Talk Group and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Talk Group (Group) appears in the tree view.
Notes
This
feature is available only on radios that are LTR capable.
Up to
a combination of 16 Talk Groups and Conventional Personalities are allowed
throughout for Non-Display portable radios.
Up to
100 Talk Groups are allowed throughout all LTR Sites for Display radios.

### Adding Universal IDs

*Source: `(root)/Adding_Universal_IDs.htm`*

Adding Universal IDs
There are multiple ways to add Universal IDs to an LTR
Site.
Highlight Universal ID in the tree view.
Click
the Add button, or
Right mouse
click on Universal ID and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Universal ID (UID) appears in the tree view.
Notes
This
feature is available only on radios that are LTR capable.
A maximum
of 4 Universal IDs are allowed per LTR Site.

### Adding Contacts to the Contact List

*Source: `(root)/Adding_a_Contact_to_the_Contact_List.htm`*

Adding Contacts to the Contact List
Highlight Contact
List in the tree view.
Click the Add
button to add a new row into the Contact List. The Location number indicates
the order that the entry appears in the Contact List.
Click into the Name column and type up to 8 alphanumeric
characters.
Click into the Address column and type up to 8
digits.
Click into the Telegram column and use the scroll
to assign the telegram.
Notes
Available
when the radio is a Select 5 Display model.

### Adding a DTMF Call Entry

*Source: `(root)/Adding_a_DTMF_Call_Entry.htm`*

Adding a DTMF Call Entry
There are multiple ways to add DTMF Call entries.
Open Call in the tree view and highlight DTMF in the tree view.
Click
the Add DTMF Call button, or
Right mouse
click on DTMF and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new DTMF Call (DTMFCL) appears in the tree view.
Notes
Available
when the radio is a Display model.

### Adding a Phone System

*Source: `(root)/Adding_a_Phone_System.htm`*

Adding a Phone System
There are multiple ways to add Phone Systems.
Highlight Phone in the tree view.
Click
the Add Phone System button, or
Right mouse
click on Phone and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Phone System (Sys) appears in the tree view.
Notes
Available
when the radio is a Display model.

### Adding a Quik-Call II Call Entry

*Source: `(root)/Adding_a_Quik-Call_II_Call_Entry.htm`*

Adding a Quik-Call II Call Entry
There are multiple ways to add Quik-Call II Call entries.
Open Call in the tree view and highlight Quik-Call II in the tree view.
Click
the Add Quik-Call II Call button,
or
Right mouse
click on Quik-Call II and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Quik-Call II Call (QCCL) appears in the tree view.
Notes
Available
when the radio is a Display model.

### Adding a Scan List

*Source: `(root)/Adding_a_Scan_List.htm`*

Adding a Scan List
There are multiple ways to add Scan Lists.
Highlight Scan in the tree view.
Click
the Add Scan List button, or
Right mouse
click on Scan and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Scan List (List) appears in the tree view.
Notes
Up to
16 or 32 scan lists are allowed.

### Adding a Status to the Status List

*Source: `(root)/Adding_a_Status_to_the_Status_List.htm`*

Adding a Status to the Status List
Highlight Status
in the tree view.
Click the Add
button to add a new row into the Status List. The Position number indicates
the order that the entry appears in the Status List.
Click into the Name column and type up to 8 alphanumeric
characters.
Click into the Status column and enter the allowed
variable digits.
Notes
Available
when the radio is a Select 5 Display model.

### Adding an MDC Call Entry

*Source: `(root)/Adding_an_MDC_Call_Entry.htm`*

Adding an MDC Call Entry
There are multiple ways to add MDC Call entries.
Open Call in the tree view and highlight MDC in the tree view.
Click
the Add MDC Call button, or
Right mouse
click on MDC and choose Add, or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new MDC appears in the tree view.
Notes
Available
when the codeplug version is equal to or greater than 03.01.
Available
when the radio is a Display model.

### Address

*Source: `(root)/Address.htm`*

Address
This specifies the unique number associated with an entry, it may be
part of a Select 5 number that identifies that radio. This entry can only
be up to a maximum of 8 digits.
Notes
Available
when the radio is a Select 5 Display model.

### Admit Criteria Not Applied in Auto Reset Mode

*Source: `(root)/Admit_Criteria_Not_Applied_in_Auto_Reset_Mode.htm`*

Admit Criteria Not Applied in Auto Reset Mode
(Expert Feature)
When checked, the radio will be able to transmit during the Auto
Reset period.
Notes
Available
when the radio is a Select 5 model.

### Alert On/Off

*Source: `(root)/Alert_On_Off.htm`*

Alert On/Off
When checked, enables the Alert On/Off
feature to be included in the Tones menu. This allows the radio-user to
toggle on and off all Alert Tones.
Notes
Available
when the radio is a Display model.

### Alert Tone Auto Reset (DTMF)

*Source: `(root)/Alert_Tone_Auto_Reset_(DTMF).htm`*

Alert Tone Auto Reset (DTMF)
When checked, causes the radio to generate only one sequence of the
Call
Alert
alert or Call
Alert w/Voice
tone, for the current DTMF
Signaling System.
Notes
This
feature is only available for radio models equipped with the option board
capability.
Available when
the DTMF Call Type is not
set to None or Sel
Cal.

### Alert Tone Auto Reset (MDC)

*Source: `(root)/Alert_Tone_Auto_Reset_(MDC).htm`*

Alert Tone Auto Reset (MDC)
When checked, causes the radio to generate only one sequence of the
Call
Alert
alert  tone,
for the current MDC
Signaling System. Normally, the Call Alert Tone Tag is a repeating alert
tone.
Notes
This
feature is available for Display Mobile models.
Available
when the codeplug version is equal to or greater than 04.00.

### Alert Tone Fixed Volume

*Source: `(root)/Alert_Tone_Fixed_Volume.htm`*

Alert Tone Fixed Volume
(Expert Feature)
When checked, causes all alert tones to remain at a constant volume
level. This constant volume level is equal to the radio�s Midpoint
Volume Setting,
plus or minus the Alert
Tone Volume Offset setting. The audio level for alert tones then remains
constant, even when the radio�s Volume Knob is adjusted.
When not checked, causes all
alert tones volume levels to be adjustable with the radio�s Volume Knob.

### Alert Volume Offset

*Source: `(root)/Alert_Volume_Offset.htm`*

Alert Volume Offset
This option is referenced to the �normal radio volume� which is manually
adjustable using the volume control. The variable alert volume can be
programmed to be at either a higher or lower level than the �normal radio
volume�.
The offset is programmable from -128 to +127, in increments of 10. A
zero entry is normal radio volume.
Notes
Available
when the radio is a Select 5 model.

### Area ID (LTR)

*Source: `(root)/Area_ID_(LTR).htm`*

Area ID (LTR)
Selects the Area ID setting for the current LTR
Site.
When frequencies are the same for two LTR Sites located in close geographical
vicinity to each other, the Area ID can ensure site uniqueness. An Area
ID match determines successful communication between radios and their
proper LTR Site. There are only two possible selections: �0� or �1�.
These settings then become functional for all Talk
Groups
within that LTR Site.
Notes
This
feature is available only on radios that are LTR capable.

### Assert Per Channel Output Line

*Source: `(root)/Assert_Per_Channel_Output_Line.htm`*

Assert Per Channel Output Line
(Expert Feature)
When checked, the GP I/O pin �Per Channel Output Line�, will be asserted
whenever this channel becomes active.
See Also
General
Purpose I/O Functions
Notes
Available
when the radio is a Select 5 Mobile model.
A GP IO
output pin must be programmed to 'Per Channel Output'.

### Authorisation Request Button Function

*Source: `(root)/Authorisation_Request_Button_Function.htm`*

Authorisation Request Button Function
(Expert Feature)
Authorisation enabled prevents users from monitoring or talking on the
channel until the radio is authorised by the infrastructure. To enable
users to request authorisation, the radio must be programmed to send an
authorisation request telegram using the designated authorisation request
call button. A button is designated as authorisation request by programming
authorisation request to one of the following button functions.
Choices available are:
Call 1
Call 2
Call 3
Call 4
PTT
Address Send
Notes
Available
when the radio is a Select 5 model.
'Address
Send' is available for Display models only.

### Authorisation Request Monitor Time

*Source: `(root)/Authorisation_Request_Monitor_Time.htm`*

Authorisation Request Monitor Time
(Expert Feature)
Defines the period of time during which the radio will wait for a reply
to an authorisation request by the user, before closing the squelch and
reverting to its idle state.
It allows the user to determine if the request has been received, by
whether or not a reply (an alert tone or sequence) to the request is heard.
If this feature is enabled and after the authorisation request has been
transmitted, the radio adopts auto reset squelch for the duration period
of the �Authorisation Request Monitor Timer�, after which the radio will
revert to normal operation. The radio is unable to transmit during this
period.
An authorisation request is when a user asks the controller for permission
to transmit on a channel with receive only capabilities; it is initiated
by pressing the Authorisation
Request Button Function that is configured with this option telegram.
If the correct telegram is received, the channel transmit capabilities
are enabled.
Range is from 0 to 32, in increments of 1.
Notes
Available
when the radio is a Select 5 model.

### Auto-Reset Timer Type (DTMF)

*Source: `(root)/Auto-Reset_Timer_Type_(DTMF).htm`*

Auto-Reset Timer Type (DTMF)
(Expert Feature)
Selects a **Timed or *Manual exception to the Signaling
Squelchunmuting
rule
for the current DTMF
Signaling System.
This **Timed or *Manual exception is known as the Release
Squelch State.
The Release Squelch State begins once the radio unmutes
to a Voice
Call.
When Signaling Squelch is set to "And";
and once the radio is in the Release Squelch state, then only
the current Conventional
Personalities
- Unmute
Rules
must be satisfied for unmuting to re-occur, a Voice Call is no longer
required.
When Signaling Squelch is set to "Or";
and once the radio is in the Release Squelch State, only
Carrier
Squelch Detect
is required to unmuting to re-occur, PL and Voice Call are not required.
Choices
Functionality
None:
The radio does not consider a Release Squelch
state.
* Manual:
Short-pressing the programmed Monitor button
ends the Release Squelch state.
**Auto
w/Carrier Override
**Auto
w/o Carrier Override
Notes
This
feature is only available for radio models equipped with the option board
capability.
Available when
the Call Type field has Call
Alert w/Voice
or Sel
Cal
selected.

### Auto-Reset Timer Type (MDC)

*Source: `(root)/Auto-Reset_Timer_Type_(MDC).htm`*

Auto-Reset Timer Type (MDC)
(Expert Feature)
Selects a **Timed or *Manual exception to the Signaling
Squelch unmuting
rule
for the current MDC
Signaling System.
This **Timed or *Manual exception is known as the Release
Squelch State.
The Release Squelch State begins once the radio unmutes
to a Voice Call.
When Signaling Squelch is set to "And";
and once the radio is in the Release Squelch state, then only
the current Conventional
Personalities  - Unmute
Rules
must be satisfied for unmuting to re-occur, a Voice Call is no longer
required.
When Signaling Squelch is set to "Or";
and once the radio is in the Release Squelch State, only
Carrier
Squelch Detect
is required to unmuting to re-occur, PL and Voice Call are not required.
Choices
Functionality
None:
The radio does not consider a Release Squelch
state.
* Manual:
Short-pressing the programmed Monitor button
ends the Release Squelch state.
**Auto
w/Carrier Override
**Auto
w/o Carrier Override
Notes
Available when the codeplug version is
equal to or greater than 03.01.

### Auto Acknowledge (Decoder)

*Source: `(root)/Auto_Acknolwedge_(Decoder).htm`*

Auto Acknowledge (Decoder)
(Expert Feature)
If checked, the radio will automatically send a telegram in response
to a received and decoded individual call sequence.
The name/digits will be displayed on the called radio if it is a display
model.
Choices available are:
None
Available Ack
Notes
Available
when the radio is a Select 5 model.

### Auto Acknowledge (Scan)

*Source: `(root)/Auto_Acknowledge_(Scan).htm`*

Auto Acknowledge (Scan)
(Expert Feature)
When checked, causes the radio to send an ACK when a decode sequence
is received during scan. It is not recommended to assign a 5 Tone decode
to a priority channel as they will most likely be missed due to the time
period between priority channel checks.
Notes
Available
when the radio is a Select 5 model.
Available
when Vote Scan is disabled.

### Auto Reset Mode

*Source: `(root)/Auto_Reset_Mode.htm`*

Auto Reset Mode
This is a feature that is typically associated with signaling squelch
operation but is also applied to coded squelch. On receipt of a selective
call or upon de-keying, the radio will enter auto-reset mode in which
certain squelch requirements are defeated.
Auto-reset timer
On entering into auto-reset mode the auto-reset timer will be started.
The radio will reset to the previous Squelch Mode on expiration of the
auto-reset timer.
The auto-reset mode will be entered for the following reasons:
On dekey of the radio.
If the radio is selectively called. The auto-reset
timer will be started as soon as the selective call has been received.
If the radio detects
the correct PL
for coded squelch only channels. The auto-reset timer will be started
as soon as the PL frequency is detected (detecting PL while in the auto-reset
mode will not restart the timer unless carrier override is specified).
Auto-reset modes
The way in which the radio will reset from the auto-reset mode will
depend on which of the auto-reset modes has been programmed for the channel.
Choices
Functionality
Disabled:
The auto-reset feature is disabled.
Carrier Override:
Detection of carrier within the auto-reset
period will reset the timer, which will start again when the carrier is
lost. Transmission by the radio will similarly reset the timer (e.g. PTT
or Call Button operation).
If the channel has PL decode enabled then
auto-reset will count down while PL is not being detected and will be
reset while PL is detected.
Carrier Independent:
This will differ from auto-reset carrier
override in that the auto-reset timer will not be affected by the presence
of carrier or PL. On expiration of the timer, the radio will auto-reset.
Manual Override:
The radio will remain in the auto-reset
mode until the monitor button is tapped. Manual reset will only be available
if monitor is enabled.
Notes
Available
when the radio is a Select 5 model.

### Auto Reset Start

*Source: `(root)/Auto_Reset_Start.htm`*

Auto Reset Start
(Expert Feature)
A decoder may be programmed such that on receiving and decoding the
correct sequence the radio will enter auto-reset, which activates the
Auto Reset Timer.
Notes
Available
when the radio is a Select 5 model.

### Auto Reset Timer

*Source: `(root)/Auto_Reset_Timer.htm`*

Auto Reset Timer
Defines the time period which the radio will wait before closing its
squelch and returning to its receive squelch state. The time range is
from 1 to 60 seconds, in increments of 1 second.
Notes
Available
when the radio is a Select 5 model.

### Auto Scan (LTR)

*Source: `(root)/Auto_Scan_(LTR).htm`*

Auto Scan (LTR)
When checked, causes the radio to automatically enter the Scan
Mode,
when the radio-user selects (with the Channel Selector) the current Trunking
Personality.
When disabled, the radio-user is able to invoke the Scan Mode operation
through a button short-press while operating on the current Personality.
Notes
This
feature is available only on radios that are LTR capable.
Available
when a Scan List is selected and at
least one Trunking Personality is a Scan List Member.
Available When
Scan List is not set to None.

### Backlight

*Source: `(root)/Backlight.htm`*

Backlight
The backlight can be programmed to one of the following Backlight modes:
Choices
Functionality
Disabled:
In this mode, the backlight is set to permanent
off. It can be switched on by user action if a button is programmed for
Backlight On/Off.
Enabled:
In this mode the backlight will be set permanently
on. It can be switched off by user action if a button is programmed for
Backlight On/Off.
Timed:
In this mode, the backlight will be turned
on for the duration of the Backlight Timeout period for the following
conditions. (It can be switched off by user action if a button is programmed
for Backlight On/Off).
Power On.
Any button pressed, including
Rotary, External PTT or an Invalid Button Press.
Upon text display or
icon update.
The backlight will remain ON for the duration
of a call transaction.
It is possible to select the Backlight
operating mode from the radio�s menu feature, or if the radio has a button
programmed for 'Backlight' to turn On/Off using the Backlight button.
Menu selection can change the 'Backlight' button's
selected operational state, but further user action of the 'Backlight'
button will change the last menu selected state.
A programmed Backlight button gives the user
ultimate On/Off control of the 3 operating modes.
Notes
Available
when the radio is a Select 5 Display model.
The Brightness of the display backlight for a Display
Mobile module is variable by the user and is selected from the �Utilities�
menu option.

### Backlight (Menu)

*Source: `(root)/Backlight_(Menu).htm`*

Backlight (Menu)
When checked, enables the Backlight feature
to be included in the Utilities menu. Enables users to choose between
Off and On (Backlight On mode may be Permanent or Timed).
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Backlight Intensity

*Source: `(root)/Backlight_Intensity.htm`*

Backlight Intensity
When checked, enables the Backlight
Intensity feature to be included in the Utilities menu. Allows the
radio-user to select the brightness level of a mobile radio�s Control
Head.
Choices available are:
Low
Med
High
Notes
Available
when the radio is a Mobile Display model.

### Battery Indicator

*Source: `(root)/Battery_Indicator.htm`*

Battery Indicator
Battery
Indicator
(non-display)
Battery
Indicator
(display)

### Brightness

*Source: `(root)/Brightness.htm`*

Brightness
When checked, enables the Backlight's Brightness
feature to be included in the Utilities menu. Allows the radio-user to
select the brightness level of a mobile radio�s Control Head.
Notes
Available
when the radio is a Select 5 Mobile Display model.

### Busy Channel Lockout (Select 5)

*Source: `(root)/Busy_Channel_Lockout_(Select_5).htm`*

Busy Channel Lockout (Select 5)
When checked, the radio will not transmit under any circumstance if
carrier is detected on the receive frequency.
Notes
Available
when the radio is a Select 5 model.
Available
when PL decode is in use.
Available
when Tx Admit Criteria is set to 'PL/DPL
not detected'.

### Busy Channel Lockout

*Source: `(root)/Busy_Channel_Lockout_EMEA.htm`*

Busy Channel Lockout
(Expert Feature)
Selects a channel lockout rule while
operating on the current Conventional
Personality.
These selections prevent the radio from
transmitting while the chosen "On Busy Channel" condition exists
for the current channel.
In addition, when either of the two "On Busy Channel" selections
are chosen, Monitor
Mode
is not possible for the current
channel.
Choices
Functionality
Disabled:
Allows the user to transmit and monitor
all the time, even when another transmission is detected on the current
personality/channel.
On Carrier:
Prevents transmission when Carrier
Squelch
is detected on the current personality/channel.
On Wrong PL:
Prevents transmission when the Carrier
Squelch is detected with a PL/DPL
code that does not match for the current personality/channel. Rx
Squelch Type must be set to TPL or DPL. The radio is allowed to transmit
when it is in standby mode, or when the radio is receiving the correct
PL/DPL code.
During Carrier Gone Timer:
Prevents transmission unless carrier
is not detected for a programmable duration (Carrier Gone Timer). The
Carrier Gone Timer resets all the time that carrier is received. The radio
is allowed to transmit when it is in standby mode or if the Carrier Gone
Timer duration has expired. The radio will not
transmit if Carrier Gone Timer is not expired and when there is carrier.
Carrier Gone Timer is stared upon a channel change, dekeying, or losing
carrier.
On Correct PL:
Prevents transmission when the PL/DPL
code for the personality/channel is currently being detected. The radio
is allowed to transmit when it is in standby mode or when the radio is
receiving carrier only or carrier with wrong PL/DPL.
On Carrier or PL but No Past PL/DPL:
Prevents transmission when the PL/DPL
code for the personality/channel is not currently being detected but has
been detected since carrier was detected. The radio is allowed to transmit
when the it is in standby mode or when PL/DPL was detected during the
life of the carrier but currently is not being detected.
On PL or Past PL:
Prevents transmission when the PL/DPL
code for the personality/channel is not currently being Prevents transmission
when the PL/DPL code for the personality/channel is not currently being
detected since carrier squelch was detected. The radio is allowed to transmit
when the radio is receiving carrier only or when receiving carrier with
wrong PL/DPL.
Notes
Available
when Receive
Only is unchecked.
On Wrong
PL, On Correct PL, On Wrong Past PL, and On PL or Past PL are available
only when Rx
Squelch Type is not set to
CSQ.

### Button/Keypad Error Alert

*Source: `(root)/Button_Keypad_Error_Alert.htm`*

Button/Keypad Error Alert
An alert is sounded if any button, keypad or menu navigation key is
pressed in error.
Choices Available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Calculating the Configuration Byte Value

*Source: `(root)/Calculating_the_Configuration_Byte_Value.htm`*

Calculating the Configuration Byte Value
The configuration bits represent a 8-bit binary image which has to be
converted to a 2 digit hexadecimal number, which then has to be entered
into the corresponding configuration byte field.
The table below shows all possible settings for the higher digit of
the configuration byte.
Where "0" = cleared, and "1" = set, and "x"
has to replaced by the lower number of the configuration byte.
Bit 7
Bit 6
Bit 5
Bit 4
Hexadecimal
Number
0
0
0
0
0x
0
0
0
1
1x
0
0
1
0
2x
0
0
1
1
3x
0
1
0
0
4x
0
1
0
1
5x
0
1
1
0
6x
0
1
1
1
7x
1
0
0
0
8x
1
0
0
1
9x
1
0
1
0
Ax
1
0
1
1
Bx
1
1
0
0
Cx
1
1
0
1
Dx
1
1
1
0
Ex
1
1
1
1
Fx
The table below shows all possible settings
for the lower digit of the configuration byte.
Where "0" = cleared, and "1"
= set, and "x" has to replaced by the higher number of the configuration
byte.
Bit 3
Bit 2
Bit1
Bit 0
Hexadecimal
Number
0
0
0
0
x0
0
0
0
1
x1
0
0
1
0
x2
0
0
1
1
x3
0
1
0
0
x4
0
1
0
1
x5
0
1
1
0
x6
0
1
1
1
x7
1
0
0
0
x8
1
0
0
1
x9
1
0
1
0
xA
1
0
1
1
xB
1
1
0
0
xC
1
1
0
1
xD
1
1
1
0
xE
1
1
1
1
xF
Configuration Byte Setting
Example:
The squelch switching shall be slowed down,
and when decoding a "Clear Down" sequence the radio shall display
"Call Received". In this case bit 2 and bit 3 of configuration
byte 2 have to be set, the others have to be cleared. This represents
a binary image of "00001100".
According to the tables above, the higher digit
of configuration byte 2 is "0" and the lower digit of configuration
byte 2 is "C". So a "0C" has to entered for configuration
byte 2 in this case.

### Call Alert

*Source: `(root)/Call_Alert.htm`*

Call Alert
When checked, enables the Call
Alert
feature to be included in the Radio
Call
menu. This allows the radio-user the ability to transmit Call Alerts.
Notes
Available
when the radio is a Display model.
See Also
Call
Type (QCII)
Call
Type (DTMF)

### Call Alert LED

*Source: `(root)/Call_Alert_LED_MDC.htm`*

Call Alert LED
When checked, causes the receiving radio to blink its LED when it has
received a Call
Alert
for the current MDC Signaling
System.
The LED double-flashes yellow for a group call.
Notes
This
feature is available for Display Mobile models.
Available
when the codeplug version is equal to or greater than 04.00.

### Call Alert Type

*Source: `(root)/Call_Alert_Type.htm`*

Call Alert Type
Selects the type of Call Alerts that can be received for the current
MDC Signaling
System.
A Call
Alert
allows a transmitting radio to notify (with an alert tone) and leave evidence
of (by flashing the LED) a call on a receiving radio, when the radio user
is away.
The Call Alert LED continues until reset by the user.
Choices available are:
None
Call Alert
Notes
This
feature is available for Display Mobile models.
Available
when the codeplug version is equal to or greater than 04.00.

### Call Answer Timer (Decoder)

*Source: `(root)/Call_Answer_Timer_(Decoder).htm`*

Call Answer Timer (Decoder)
(Expert Feature)
When checked, during decode the radio will start the Signalling Call
Answer Timer (if enabled).
The Signalling Call Answer Timer specifies the time that the user has
to answer an incoming call.
Notes
Available
when the radio is a Select 5 model.

### Call Answer Timer (Signalling)

*Source: `(root)/Call_Answer_Timer_(Signalling).htm`*

Call Answer Timer (Signalling)
(Expert Feature)
Specifies the time that the user has to answer an incoming call. The
call answer timer is reset by any user activity.
The timer range is from 1 to 255 Seconds, in increments of 1 Second.
Notes
Available
when the radio is a Select 5 model.

### Call Back

*Source: `(root)/Call_Back.htm`*

Call Back
When checked, enables a user to reply to a received call after that
call has timed out and the user did not responded and as long as no other
call has been received since.
If the Authorisation
Request Button Function Address Send feature is enabled, then on successful
decode of a received telegram, the callers ID will be entered into the
variable digit positions of the buffered telegram. A single key press
will then initiate Call Back.
Decode Type = Incoming Emergency and a non-priority/emergency call is
received, the emergency call remains active for call back.
If the Decode Type = Priority and a non-priority/emergency call is received,
the priority call remains active for call back.
Notes
Available
when the radio is a Select 5 Display model.

### Call Failed Alert

*Source: `(root)/Call_Failed_Alert.htm`*

Call Failed Alert
(Expert Feature)
Sounded after expiration of the Acknowledge
Expected Duration after maximum number of retries.
Choices
available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Call Format (QCII Call)

*Source: `(root)/Call_Format_(QCII_Call).htm`*

Call Format (QCII Call)
Selects the Call Tone Type for the current Quik-Call
II
(QCII) - Call
List Member.
Choices available are:
Two Tone
Long Tone
Notes
Available
when the radio is a Display model.

### Call Forward

*Source: `(root)/Call_Forward.htm`*

Call Forward
When checked, enables the Call
Forward
feature to be included in the Utilities menu. This allows calls to be
forwarded to another radio. Enters mode whereby an individual call causes
the radio to transmit the call forward telegram.
This feature is used more on mobile radios and it allows the user to
leave the vehicle. If the vehicle receives an individual call, it will
transmit a telegram to the forwarding radio. This radio will open and
assuming both radios have the same PL the call will take place.
A radio can also call forward to a pager and alert the user to the call.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Call Forwarding Acknowledge

*Source: `(root)/Call_Forwarding_Acknowledge.htm`*

Call Forwarding Acknowledge
(Expert Feature)
An �Auto-Ack� telegram is sent if the radio user has enabled call forward
to indicated that the radio is unattended.
If a user has enabled Call Forward in
the Programmable Menu, any calls forwarded will not be placed in the forwarding
radios Missed Calls List.
Call Forward can also be assigned to a (short or long) programmable
button-press.
After Call Forward has been successfully selected by the user, the Forwarded
text indication will replace the default display text until either the
user disables call forward, changes the channel, enters emergency mode,
or turns the radio off.
The Call Forward telegram will only be sent if the user enables the
Call Forward feature.
If both the Auto-Ack On Decode
and Call Forward �Auto-Ack�
are enabled for a decode sequence and Call Forward is enabled, then if
the correct decode sequence is received, the �Auto-Ack� telegram, followed
by the Call Forward telegram will be transmitted.
Choices available are:
None
Available Ack
Notes
Available
when the radio is a Select 5 model.

### Call LED (DTMF)

*Source: `(root)/Call_LED_(DTMF).htm`*

Call LED (DTMF)
When checked, causes the receiving radio to blink its LED when it has
received a Call
Alert
for the current DTMF Signaling System. The radio�s LED double-flashes
yellow for an individual call, and single-flashes yellow for a group call.
Notes
This
feature is only available for radio models equipped with the option board
capability.
When the DTMF
Call Type is not
set to None.

### Call Light (LTR)

*Source: `(root)/Call_Light_(LTR).htm`*

Call Light (LTR)
When checked, causes the radio�s LED
to flash yellow while receiving a call on the current Talk
Group.
This call indicator allows a dispatcher or radio-caller to notify a targeted
radio-user (or group of radios-users) of a missed call. The visual alert
persists until reset by the returning user.
Notes
This
feature is available only on radios that are LTR capable.

### Call Light (LTR ID)

*Source: `(root)/Call_Light_(LTR_ID).htm`*

Call Light (LTR ID)
Causes the radio�s LED
to flash yellow while receiving a call for the current Universal
ID.
This call indicator allows a dispatcher or radio-caller to notify a targeted
radio-user (or group of radios-users) of a missed call. The visual alert
persists until reset by the returning user.
Notes
This
feature is available only on radios that are LTR capable.

### Call List

*Source: `(root)/Call_List.htm`*

Call List
The Call List window allows you to view-only all Call List Members that
exist. The Call List allows the radio-user to select, and transmit to
a specific radio, or group of radios. Only one Call List can exist per
radio.
Call List Members are created, deleted, and defined in the window correlating
with their Signaling System type.

### Call List Assignment Position

*Source: `(root)/Call_List_Assignment_Position.htm`*

Call List Assignment Position
A Call List Member can be reassigned to any channel position.
Highlight Call in the tree view.
In the Call List Assign field, highlight a Call List
Member.
Use the mouse to either drag and drop or hold the
<Ctrl> key while pressing the Up/Down arrows to reassign the Call
List Member to a different channel position.

### Call Reminder Alert (Decoder Definition)

*Source: `(root)/Call_Reminder_Alert_(Decoder_Definition).htm`*

Call Reminder Alert (Decoder Definition)
If checked, enabled a Call Reminder Alert to be sounded every 15 seconds
until the call is actioned. It consists of an interrupted high tone, On
for 650 ms, Off for 150 ms then On for 325 ms.
Notes
Available
when the radio is a Select 5 model.

### Call Reminder Alert (Signalling)

*Source: `(root)/Call_Reminder_Alert_(Signalling).htm`*

Call Reminder Alert (Signalling)
Sounded every 15 seconds after expiration of the Call
Answer Timer.
Choices
available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Call Reminder LED

*Source: `(root)/Call_Reminder_LED.htm`*

Call Reminder LED
If checked, the LED will flash until the Call Reminder Alert is actioned.
Notes
Available
when the radio is a Select 5 model.

### Call Tone Tag

*Source: `(root)/Call_Tone_Tag.htm`*

Call Tone Tag
When checked, enables the Call Tone Tag feature to be included in the
Tones menu. This allows the radio-user to select which tone sounds when
receiving a Call
Alert
or a Selective
Call.
There are several ring tones to choose from.
Notes
Available
when the radio is a Display model.

### Call Type (DTMF)

*Source: `(root)/Call_Type_(DTMF).htm`*

Call Type (DTMF)
Selects the type of Call Alerts that can be received for the current
DTMF
Signaling System. A Call Alert allows a transmitting radio to notify (with
an alert tone) and leave evidence of (by lighting the LED) a call on a
receiving radio while the radio-user is away. The Call
LED persists until reset by the user. A Call Alert w/Voice is a combination
of a Sel Cal and a Call Alert.
Choices available are:
None
Call Alert
Call Alert w/Voice
Sel Cal (Selective Call)
Notes
This
feature is only available for radio models equipped with the option board
capability.

### Carrier Gone Timer

*Source: `(root)/Carrier_Gone_Timer.htm`*

Carrier Gone Timer
(Expert Feature)
Allows the radio to transmit when carrier
has not been detected for a programmable period of time. The timer will
be reset for the duration of the received carrier.
This option is used to prevent operators, currently not involved in
calls, from transmitting over other users who may be active on the channel,
but are de-keyed with their auto-reset timers running. Range is from 0
seconds to 60 seconds, in increments of 1 second.
Notes
Available
when Busy Channel Lockout
is set to 'During Carrier Gone Timer'.

### Carrier Gone Timer (Select 5)

*Source: `(root)/Carrier_Gone_Timer_(select_5).htm`*

Carrier Gone Timer (Select 5)
(Expert Feature)
Allows the radio to transmit when carrier
has not been detected for a programmable period of time. The timer will
be reset for the duration of the received carrier.
This option is used to prevent operators, currently not involved in
calls, from transmitting over other users who may be active on the channel,
but are de-keyed with their auto-reset timers running. Range is from 0
seconds to 60 seconds, in increments of 1 second.
Notes
Available
when the radio is a Select 5 model.
Available
when Tx Admit Criteria is set to 'Carrier
Gone Timer Expired'.

### Carrier Squelch Only

*Source: `(root)/Carrier_Squelch_Only.htm`*

Carrier Squelch Only
(Expert Feature)
When checked, the radio need only detect carrier for it to stop on a
channel and unmute.
Notes
Available
when the radio is a Select 5 model.
Available
when Vote Scan is disabled.

### Changing the Contact Location

*Source: `(root)/Changing_the_Contact_Location.htm`*

Changing the Contact Location
Entries in the Contact List can be reassigned in any order.
Highlight Contact List
in the tree view.
Highlight a Location
number.
Use the mouse to either
drag and drop or hold the <Ctrl> key while pressing the Up/Down
arrows to reassign the Contact to a different location in the Contact
List.
Notes
Available
when the radio is a Select 5 Display model.

### Changing the Status Position

*Source: `(root)/Changing_the_Status_Position.htm`*

Changing the Status Position
Entries in the Status List can be reassigned in any order.
Highlight Status in
the tree view.
Highlight a Position
number.
Use the mouse to either
drag and drop or hold the <Ctrl> key while pressing the Up/Down
arrows to reassign the Status to a different position in the Status List.
Notes
Available
when the radio is a Select 5 Display model.

### Channel

*Source: `(root)/Channel.htm`*

Channel
When checked, enables Channel as a radio-user Top Level Menu feature.
This allows the radio-user to go straight to the Channel List feature.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Channel Bandwidth (LTR)

*Source: `(root)/Channel_Bandwidth_(LTR).htm`*

Channel Bandwidth (LTR)
Selects the radio�s transmit and receive bandwidth
to match the bandwidth of the current repeater.
This repeater is part of the current LTR Site
that can be assigned to a Trunking Personality.
This setting then becomes functional for all Talk Groups
within that Trunking Personality.
Choices
available are:
12.5 kHz
20 kHz
25 kHz
Notes
This
feature is available only on radios that are LTR capable.
India models
can only choose 12.5 kHz.

### Channel Change Squelch Mode

*Source: `(root)/Channel_Change_Squelch_Mode.htm`*

Channel Change Squelch Mode
(Expert Feature)
On changing the channel, the radio can be programmed to either receive
Squelch Mode or Monitor
1 Squelch Mode.
Available
Choices are:
Monitor 1 Squelch Mode
Rx Squelch Mode
Notes
Available
when the radio is a Select 5 model.

### Channel Free

*Source: `(root)/Channel_Free.htm`*

Channel Free
When checked, the radio will transmit the reply as soon as there is
no RF carrier detected on the channel, or when the Acknowledge
Delay Timer expires, which ever occurs first. If the acknowledge Revert Channel option is enabled then the
radio will check for carrier on the Revert
Channel.
Notes
Available
when the radio is a Select 5 model.

### Channel Free Alert

*Source: `(root)/Channel_Free_Alert.htm`*

Channel Free Alert
(Expert Feature)
Indicates that the current channel is free.
Available
choices are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Channel Position

*Source: `(root)/Channel_Position.htm`*

Channel Position
A Conventional Personality or Talk Group can be reassigned to any channel
position.
Highlight Channel Position
in the tree view.
Highlight a Conventional
Personality or Talk Group.
Use the mouse to either
drag and drop or hold the <Ctrl> key while pressing the Up/Down
arrows to reassign the Conventional Personality or Talk Group to a different
channel position.

### Choosing a Language

*Source: `(root)/Choosing_a_Language.htm`*

Choosing a Language
This feature allows the user to choose the language that the CPS will
use.
From
the Edit menu choose Preferences.
Selected the desired
language and click the Save button.
Close the CPS and launch
it again for the language choice to take affect.
Notes
Available
when more than one language of the CPS is installed.

### Cloning Radios

*Source: `(root)/Cloning_Radios_(Select5).htm`*

Cloning Radios
The CPS allows cloning the configuration of one radio into another radio
of the same model.
Open
or Create a file (source radio).
Connect
the destination radio via the programming cable to the COM
Port.
Make sure the RIB
and the radio are powered-up.
From the Device
menu choose Clone, or from the
tool bar click
Notes
The
serial number in the file and the radio cannot be the same.
See Also
Radio
To Radio Cloning

### Comments

*Source: `(root)/Comments.htm`*

Comments
(Expert Feature)
Used to store any comments or notes about the radio's codeplug.
Notes
Available
when the radio is a Select 5 Display model.
A maximum
of 255 characters is allowed.

### Companding

*Source: `(root)/Companding.htm`*

Companding
When checked, enables the Companding feature to be included in the Utilities
menu. The user can enable/disable the Companding feature.
This allows further improvement of voice quality. It compresses your
voice at transmission, and expands it when receiving while simultaneously
reducing extraneous noise. However, to enjoy this benefit, all transmitting
and receiving radios must have this feature activated.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Companding Mode

*Source: `(root)/Companding_Mode.htm`*

Companding Mode
When checked, allows further improvement of voice quality. It compresses
your voice at transmission, and expands it when receiving while simultaneously
reducing extraneous noise. However, to enjoy this benefit, all transmitting
and receiving radios must have this feature activated.

### Companding Mode (LTR)

*Source: `(root)/Companding_Mode_(LTR).htm`*

Companding Mode (LTR)
When checked, allows further improvement of voice quality. It compresses
your voice at transmission, and expands it when receiving while simultaneously
reducing extraneous noise. However, to enjoy this benefit, all transmitting
and receiving radios must have this feature activated.
Notes
This
feature is available only on radios that are LTR capable.

### Companding Mode (Select 5)

*Source: `(root)/Companding_Mode_(Select_5).htm`*

Companding Mode (Select 5)
When checked, allows further improvement of voice quality. It compresses
your voice at transmission, and expands it when receiving while simultaneously
reducing extraneous noise. However, to enjoy this benefit, all transmitting
and receiving radios must have this feature activated.
Companding can also be selected by a radio-user (short or long programmable
button-press) or through the Companding menu
selection.
Notes
Available
when the radio is a Select 5 model.

### Configuration Bytes

*Source: `(root)/Configuration_Bytes.htm`*

Configuration Bytes
(Expert Feature)
These are available in the software to allow for future configuration
requirements of the radio and to enhance the future operational capabilities
of the radio if and when required.
Notes
These
functions will only work with the correct radio firmware.
The usage of
these functions may have undesired side effects.
Byte 1: bit0: set:
Not Used
Byte 1: bit1: set:
A Tx
Time-Out-Timer can be enabled for fast data PTT. The regular Time-Out-Timer
Type is then also valid for fast data PTT.
Byte 1: bit2 set:
No front mic, hook controlled
by GPIO line.
cleared:
Normal operation hook controlled
by front mic.
Byte 2: bit0: set:
Decoder time-out-time (MAX)
limitation to system tone duration + 10 ms.
Byte 2: bit1: set:
Decoder integration time
(MIN) limitation to 0.9 * system tone duration. This deteriorates the
select-5 decoder's sensitivity, but allows to use similar tone systems
on one channel simultaneously (e.g. CCIR70 and CCIR).
Byte 2: bit2: set:
Slower squelch switching
to avoid fluttering in noisy areas.
Byte 2: bit3: set:
When decoding a "Clear
Down" sequence without any address digits and/or status digits the
radio displays "Call Received".
cleared:
When decoding a "Clear
Down" sequence without any address digits and/or status digits the
radio does not display "Call Received".
Byte 2: bit4: set:
Decoded Group Call sequences
which contain variable address digits will not be copied into the Missed
Calls List.
Byte 2: bit5: set:
Fast Data PTT is disabled
if Rekey Inhibit Timer duration is set to a non-zero value.
cleared:
Fast Data PTT is not affected
by rekey inhibit timer duration setting.
Byte 3:
During Vote
Scan, the radio will vote the carrier without unmuting the speaker
and will unmute the speaker if both carrier and the correct PL are present.
The Invalid Channel Marking
feature will be disabled.
Byte 4:
Not Used
Byte 5:
Not Used
See Also
Calculating
the Configuration Byte Value
Notes
Available
when the radio is a Select 5 Mobile model.
Even if
Rekey Inhibit Timer is turned on, it will not apply on Fast Data PTT operation.

### Connector Microphone

*Source: `(root)/Connector_Microphone.htm`*

Connector Microphone
When checked, enables the accessory connector PTT microphone. When unchecked,
enables the accessory connector PTT hand held microphone.
Notes
Available
when the radio is a Select 5 Mobile model.

### Contact List

*Source: `(root)/Contact_List.htm`*

Contact List
When checked, enables the Contact List as a radio-user Top Level Menu
feature. This allows the radio-user to go straight to the Contact List
of the menu.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Copying Rx to Tx

*Source: `(root)/Copying_Rx_to_Tx.htm`*

Copying Rx to Tx
The Copy button located between
Receive and Transmit allows you to copy the receive frequencies, including
Rx Squelch Type, Rx TPL Frequency, Rx TPL Code, Rx DPL Code, and Rx DPL
Invert to their respective Tx counterparts.
See Also
Frequency
Offset
Notes
Available
when Receive
Only is not checked.

### Copying Rx to Tx (LTR)

*Source: `(root)/Copying_Rx_to_Tx_(LTR).htm`*

Copying Rx to Tx (LTR)
The Copy button located between
Receive and Transmit allows you to copy the Receive frequencies to their
respective Transmit counterparts.
See Also
Frequency
Offset
Notes
This
feature is available only on radios that are LTR capable.

### Copying Rx to Tx (Select 5)

*Source: `(root)/Copying_Rx_to_Tx_(Select_5).htm`*

Copying Rx to Tx (Select 5)
The Copy button located between
Receive and Transmit allows you to copy the receive frequencies, including
Rx Squelch Type, Rx TPL Frequency, Rx TPL Code, Rx DPL Code, and Rx DPL
Invert to their respective Tx counterparts.
See Also
Frequency
Offset

### Copying and Pasting (Select 5)

*Source: `(root)/Copying_and_Pasting_(Select5).htm`*

Copying and Pasting (Select 5)
The Contact List, Signaling Systems, Encoders, Decoders, and Personalities
can be copied from one file and pasted to another file, or pasted into
the same file.
Highlight the item in the tree view.
From the Edit
menu choose Copy; or right mouse
click and choose Copy, or from
the tool bar click
In the document to be copied or pasted into, highlight
the folder.
From the Edit
menu choose Paste, or right mouse
click and choose Paste, or from
the tool bar click
Notes
To
Copy and Paste multiple and consecutive folders, hold down the <Shift>
key while clicking the mouse on the desired items.
Or, hold the <Shift> key down while pressing the Up/Down arrow
keys to select one at a time.
To Copy
and Paste multiple non-consecutive folders, hold down the <Ctrl>
key while clicking the mouse on the desired items.

### Copying and Pasting

*Source: `(root)/Copying_and_Pasting_LTR.htm`*

Copying and Pasting
Signaling Systems, Personalities, Phone Systems, Call Systems, Sites,
Repeaters, Talk Groups, and Universal ID's can be copied from one document
and pasted to another document, or pasted into the same document.
Highlight the item in the tree view.
From the Edit
menu choose Copy; or right mouse
click and choose Copy, or from
the tool bar click
In the document to be copied or pasted into, highlight
the folder.
From the Edit
menu choose Paste, or right mouse
click and choose Paste, or from
the tool bar click
Notes
To
Copy and Paste multiple and consecutive folders, hold down the <Shift>
key while clicking the mouse on the desired items.
Or, hold the <Shift> key down while pressing the Up/Down arrow
keys to select one at a time.
To Copy
and Paste multiple non-consecutive folders, hold down the <Ctrl>
key while clicking the mouse on the desired items.

### Creating Files

*Source: `(root)/Creating_Files_(Select5).htm`*

Creating Files
To
create a file you must first Read
a radio.
The radio�s codeplug
file opens.
Notes
Make
sure the radio is connected to the COM
Port
via the programming cable and that the RIB
and radio are powered-up.

### Cue Tone (LTR)

*Source: `(root)/Cue_Tone_(LTR).htm`*

Cue Tone (LTR)
When checked, causes an alert tone to sound just after the radio-user
presses the PTT
button. This indicates to the radio-user that the radio is ready to transmit.
This feature applies while operating on any Talk
Group
for the current Trunking
Personality.
Notes
This
feature is available only on radios that are LTR capable.

### Cumulative Tx Timeout Reset Duration

*Source: `(root)/Cumulative_Tx_Timeout_Reset_Duration.htm`*

Cumulative Tx Timeout Reset Duration
This is the time after which a radio will not be allowed to transmit
after reaching this cumulative total for transmissions, unless reset by
a receive period, with muted speaker, greater than the cumulative TOT
reset duration time.
The cumulative TOT reset duration timer can be set from 1 to 255 seconds,
in increments of 1 second.
Notes
Available
when the radio is a Select 5 model.

### Cutting and Pasting (Select 5)

*Source: `(root)/Cutting_and_Pasting_(Select5).htm`*

Cutting and Pasting (Select 5)
Signaling Systems, Encoders, Decoders, and Personalities can be cut
(removed) from one file and pasted to another file.
Highlight the item in
the tree view.
From the Edit
menu choose Cut; or right mouse
click and choose Cut, or from
the tool bar click .
In the document to be
copied or pasted into, highlight the folder.
From the Edit
menu choose Paste, or right mouse
click and choose Paste, or from
the tool bar click
Notes
To
Cut and Paste multiple and consecutive folders, hold down the <Shift>
key while clicking the mouse on the desired items.
Or, hold the <Shift> key down while pressing the Up/Down arrow
keys to select one at a time.
To Cut
and Paste multiple non-consecutive folders, hold down the <Ctrl>
key while clicking the mouse on the desired items.

### Cutting and Pasting

*Source: `(root)/Cutting_and_Pasting_LTR.htm`*

Cutting and Pasting
Signaling Systems, Personalities, Phone Systems, Call Systems, Sites,
Repeaters, Talk Groups, and Universal ID's can be cut (removed) from one
document and pasted to another document.
Highlight the item in
the tree view.
From the Edit
menu choose Cut; or right mouse
click and choose Cut, or from
the tool bar click .
In the document to be
copied or pasted into, highlight the folder.
From the Edit
menu choose Paste, or right mouse
click and choose Paste, or from
the tool bar click
Notes
To
Cut and Paste multiple and consecutive folders, hold down the <Shift>
key while clicking the mouse on the desired items.
Or, hold the <Shift> key down while pressing the Up/Down arrow
keys to select one at a time.
To Cut
and Paste multiple non-consecutive folders, hold down the <Ctrl>
key while clicking the mouse on the desired items.

### DOS Coast Duration (MDC System)

*Source: `(root)/DOS_Coast_Duration_(MDC).htm`*

DOS Coast Duration (MDC System)
(Expert Feature)
Selects an amount of time that the radio waits muted
once the Carrier
Squelch
signal has been lost. This applies for the current MDC
- Signaling
System.
The range is from 0 ms to 500 ms, in increments of 25 ms.
When MDC Signaling data is detected and then once the Carrier Squelch
signal is lost - this timer begins. While this timer is active the radio
waits muted for Carrier Squelch to be re-detected. If Carrier Squelch
is re-detected while this timer is running; this timer is stopped and
reset, and the DOS
Auto Mute Duration (timer) begins again.
Notes
Available
when DOS
Auto Mute Duration is not
set to 0.
This helps
to prevent temporary loss of DOS in areas of poor signal strength, or
high multi-path distortion.
If you do not
have complete knowledge of the system configuration that this radio will
be operating on, do not attempt to modify
this setting!

### DOS Criteria Type (MDC System)

*Source: `(root)/DOS_Criteria_Type_mdc.htm`*

DOS Criteria Type (MDC System)
(Expert Feature)
Selects the frequency
type used to determine DOS
activation, for the current MDC
- Signaling
System.
Choices available are:
1200 Hz or 1800 Hz
1200 Hz and 1800 Hz
Notes
Available
when DOS
Auto Mute Duration is not
set to 0.
If you do not
have complete knowledge of the system configuration that this radio will
be operating on, do not attempt to modify
this setting!

### DOS Fixed Retry Wait Time (MDC System)

*Source: `(root)/DOS_Fixed_Retry_Wait_Time_mdc.htm`*

DOS Fixed Retry Wait Time (MDC System)
(Expert Feature)
This duration is added to the CPS-calculated
retry-wait-duration for Polite
and Impolite
transmissions. This has the effect of randomly staggering retry attempts,
in an effort to have unsynchronized retry attempts from competing radios.
This applies for the current MDC
- Signaling
System.
The range is from 0 seconds to 17 seconds, in increments of 0.1 seconds.
Notes
Available
when the radio model is capable of transmitting a Call
Alert
or Emergency
Mode.

### DTMF Dialling Mode

*Source: `(root)/DTMF_Dialling_Mode.htm`*

DTMF Dialling Mode
This allows the user to manually send DTMF tones to a PABX/Telephone
Interconnect Unit.
Choices
Functionality
Disabled:
Live Dialling:
The DTMF tones are sent as they are dialled.
Any of the digits 0-9, *, # cause DTMF tones to be transmitted.
Notes
Available
when the radio is a Select 5 model.

### DTMF Keypad

*Source: `(root)/DTMF_Keypad.htm`*

DTMF Keypad
When checked, enables DTMF Keypad to be included in the Utilities menu.
This places the keypad in DTMF mode.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Keypad model.

### DTMF System

*Source: `(root)/DTMF_System.htm`*

DTMF System
Selects the DTMFSignaling
System
to be used by the current DTMF - Call
List Member.
Notes
Available
when the radio is a Display model.
Available
when the radio is capable of transmitting Call
Alerts
or Selective
Calls.

### DTMF System (Encoder Telegram)

*Source: `(root)/DTMF_System_(Encoder_Telegram).htm`*

DTMF System (Encoder Telegram)
DTMF signalling systems encode tone(s), each tone consisting of 2 frequencies
that are generated simultaneously. A DTMF Signalling System will define
the digit duration, inter-digit delay, and pause tone duration for that
Signalling System. Up to two different DTMF systems could be defined.
Notes
Available
when the radio is a Select 5 model.
Available
when DTMF Dialing Mode is enabled.

### Data Deviation 12.5 kHz (LTR)

*Source: `(root)/Data_Deviation_12.5_kHz_(LTR).htm`*

Data Deviation 12.5 kHz (LTR)
(Expert Feature)
Selects the relative deviation setting for the current LTR Site. This
setting allows you to adjust the transmit signal-strength for LTR (Trunking)
data such as, MDC Messages and MDC Statuses. This 12.5 kHz setting applies
for the individual repeaters
of this LTR Site. This is determined by the bandwidth
setting of each individual repeater.
These settings then become functional for all Talk
Groups
within that LTR Site.
Choices available are:
High
Medium
Low
Notes
This
feature is available only on radios that are LTR capable.

### Data Deviation 20 kHz/25 kHz (LTR)

*Source: `(root)/Data_Deviation_20_kHz_25_kHz_(LTR).htm`*

Data Deviation 20 kHz/25 kHz (LTR)
(Expert Feature)
Selects the relative deviation setting for the current LTR Site. This
setting allows you to adjust the transmit signal-strength for LTR (Trunking)
data such as, MDC Messages and MDC Statuses. This 20 kHz/25 kHz setting
applies for the individual repeaters
of this LTR Site. This is determined by the bandwidth
setting of each individual repeater.
These settings then become functional for all Talk
Groups
within that LTR Site.
Choices available are:
High
Medium
Low
Notes
This
feature is available only on radios that are LTR capable.

### Data Invert Receive (LTR)

*Source: `(root)/Data_Invert_Receive_(LTR).htm`*

Data Invert Receive (LTR)
When checked, causes receive data to be inverted by the radio. This
feature applies for the current LTR
Site.
Data Invert must also be enabled for the transmitting radio, and LTR Site,
for successful communication to occur.
These settings then become functional for all Talk
Groups
within that LTR Site.
Notes
This
feature is available only on radios that are LTR capable.

### Data Invert Transmit (LTR)

*Source: `(root)/Data_Invert_Transmit_(LTR).htm`*

Data Invert Transmit (LTR)
When checked, causes transmit data to be inverted just prior to being
transmitted by the radio. This feature applies for the current LTR
Site.
Data Invert Rx must also be
enabled for the receiving radio, and LTR Site, for successful communication
to occur.
These settings then become functional for all Talk
Groups
within that LTR Site.
Notes
This
feature is available only on radios that are LTR capable.

### Data Only (LTR)

*Source: `(root)/Data_Only_(LTR).htm`*

Data Only (LTR)
(Expert Feature)
When checked, causes the radio to not unmute
its speaker to an incoming Talk
Group
call. Therefore call data can be received without any noticeable audio
to the radio-user. This feature applies while operating on the current
Talk Group.
Notes
This
feature is available only on radios that are LTR capable.
Radio
Calls
and PTT
ID's
are not decoded on Data Only enabled
Talk Groups.

### Data Revert Channel

*Source: `(root)/Data_Revert_Channel.htm`*

Data Revert Channel
(Expert Feature)
Selects predefined alternative channels to be designated for the purpose
of transmitting and receiving data. This selection applies while operating
on the current Personality.
Choices available are:
Available Personalities
Notes
Available
when the radio is a Display Mobile model.

### Data Revert Channel

*Source: `(root)/Data_Revert_Channel_(pers).htm`*

Data Revert Channel
(Expert Feature)
Selects predefined alternative channels to be designated for the purpose
of transmitting and receiving data. This selection applies while operating
on the current Personality.
Choices available are:
Available Personalities
Available Talk Groups
Notes
Available
when the radio is a Display Mobile model.

### Data Revert Channel (Talk Groups)

*Source: `(root)/Data_Revert_Channel_(talkgroups).htm`*

Data Revert Channel (Talk Groups)
(Expert Feature)
Selects predefined alternative channels to be designated for the purpose
of transmitting and receiving data. This selection applies while operating
on the current Trunking
Personality.
Notes
This
feature is available only on radios that are LTR capable.
Available
when the radio is a Display Mobile model.

### Deaccess Back Porch Delay

*Source: `(root)/Deaccess_Back_Porch_Delay.htm`*

Deaccess Back Porch Delay
(Expert Feature)
Selects the amount of time the radio remains in Phone
Mode
after sending the Deaccess
code.
This allows the radio a transition time to re-establish normal dispatch
operation. Range is from 0 seconds to 3.5 seconds, in increments of 0.5
seconds.
Notes
Available
when the radio is a Display model.

### Deaccess Code

*Source: `(root)/Deaccess_Code.htm`*

Deaccess Code
Specifies the 8 digit Deaccess Code for the current Phone
System.
The Deaccess Code causes disconnection from a phone call.
Notes
Available
when the radio is a Display model.
Valid characters available are 0-9,
*, #

### Debounce (Select 5)

*Source: `(root)/Debounce_(Select_5).htm`*

Debounce (Select 5)
Input debounce is programmable for each input pin by the CPS and the
time can be set from in the Debounce
Duration from 50 ms to 750 ms in increments of 50 ms. This time defines
how long a key must be pressed before the radio recognises the press as
a valid action prior to implementing a feature, such as an emergency call.
If Debounce is enabled, then the GP I/O lines must remain in the Active Level for the duration of
the time period set in Debounce Duration before the selected function
is activated.
Notes
Available
when the radio is a Select 5 Mobile model.
See Also
Pin
#3 Function Select
Pin
#4 Function Select
Pin
#8 Function Select
Pin
#9 Function Select
Pin
#12 Function Select
Pin
#14 Function Select

### Debounce Duration (Select 5)

*Source: `(root)/Debounce_Duration_(Select_5).htm`*

Debounce Duration (Select 5)
(Expert Feature)
Input Debounce is programmable for each input pin by the CPS and the
time can be set from 50 ms to 750 ms in increments of 50 ms. This time
defines how long a key must be pressed before the radio recognises the
press as a valid action prior to implementing a feature, such as an emergency
call.
If Debounce is enabled, then the
GP I/O lines must remain in the Active
Level for the duration of the time period set in Debounce
Duration before the selected function is activated.
Notes
Available
when the radio is a Select 5 Mobile model.

### Debounce

*Source: `(root)/Debounce_EMEA).htm`*

Debounce
When checked, causes the Debounce
Duration
to be used for an Accessory
Connector. The Debounce Duration is the amount of time that the radio
waits before rechecking a pin�s Active
Level.
Notes
Available
when the radio is a Mobile model.
See Also
Pin
#3 Function Select
Pin
#4 Function Select
Pin
#6 Function Select
Pin
#8 Function Select
Pin
#9 Function Select
Pin
#12 Function Select
Pin
#14 Function Select

### Decoder Group Sequence 1-3

*Source: `(root)/Decoder_Group_Sequence_1-3.htm`*

Decoder Group Sequence 1-3
This option displays 12 check boxes, which represent the 12 available
group digits that may be used in a tone sequence.
For each of the decoder sequence, it is possible to specify which digit
positions in the received 5 tone sequence can be �Group digits�. This
means that if a Group tone is received in that position rather than the
usual number�s tone, the radio will still recognize and decode the call.
Depending on the selected Group Type, the
radio will then generate a Group
Call Alert.
Notes
Available
when the radio is a Select 5 model.

### Decoder LED

*Source: `(root)/Decoder_LED.htm`*

Decoder LED
If checked, enables the decoder LED.
Notes
Available
when the radio is a Select 5 model.

### Decoder Maximum Tone Duration

*Source: `(root)/Decoder_Maximum_Tone_Duration.htm`*

Decoder Maximum Tone Duration
Defines the decoder tone duration threshold. Tones longer than the duration
threshold will be rejected. Range is from 40 ms to 6000 ms, in increments
of 10 ms.
Notes
Available
when the radio is a Select 5 model.

### Decoder Minimum Tone Duration

*Source: `(root)/Decoder_Minimum_Tone_Duration.htm`*

Decoder Minimum Tone Duration
Defines the integration time for decode tones, ie. minimum period for
which the tone must be received before the tone will be detected. The
range is from 10 ms to 6000 ms, in increments of 10 ms.
Notes
Available
when the radio is a Select 5 model.

### Decoder Output Control

*Source: `(root)/Decoder_Output_Control.htm`*

Decoder Output Control
(Expert Feature)
By programming a decoder for output control, it can, on successful decoding
of a telegram sequence, assert or de-assert the output of the GP I/O Decode
Output Control Line on the accessory connector.
Choices available are:
Disabled
Asset
De-assert
See Also
General
Purpose I/O Package
Notes
Available
when the radio is a Select 5 mobile model.
An output
line will be programmed to Decoder Output Control.

### Decoder Sequence 1-3

*Source: `(root)/Decoder_Sequence_1-3.htm`*

Decoder Sequence 1-3
A decode sequence may consist of up to 12 tones. Any of the decoders
signalling systems standard tones may be specified in a sequence and also
the Group/Repeat tones.
The following can be specified:
Calling radios ID positions 1 to 8
Called radios status positions 1 to 3
Called Radio ID digits 1 to 8
The radio supports the following decode telegram configurations illustrated
by the following examples, where Radio A refers to the calling radio and
Radio B refers to the called radio:
Single sequence:
CPS defined decoder = 12(A1A2A3)
Radio B receives 12346
Radio B displays 346
Double sequence,  "Called
- Calling":
CPS defined decoder = 12345   12(A1A2A3)
Radio B receives 12345 12346
Radio B displays 346
Double sequence,  "Calling-Called":
CPS defined decoder = 12(A1A2A3)   12345
Radio B receives 12346 12345
Radio B displays 346
Radio A IDs, Radio B IDs across sequences:
CPS defined decoder = 12( A1A2)    345(A3A4A5)
Radio B receives 1213  345346
Radio B displays 13346
Radio B IDs:
CPS defined Radio ID = 123A
CPS defined decoder = 12(U1U2U3U4)
Radio B receives 12123A
Radio B can decode successfully
Advanced User Telegram Decode:
A decode telegram format may �match� the format of a corresponding telegram
which is used for name display or call back. This field identifies that
telegram number, and is used as follows:
On decode, the radio attempts to find an entry in the contact list where
the decoded ID digits match the ID digits of an entry in the contact list
(by identity, position and number). In addition, the decoders Matching
Encode Telegram must match the Contact List entry telegram.
On decode, if Call Back is enabled, the
current contents of the address buffer get overwritten with both the variable
ID digit and the decoders Matching Encode Telegram.
Basic User Telegram Decode:
For the Basic User the Matching
Encode Telegram field is not used.
On decode, the radio attempts to find an entry in the contact list where
the decoded ID digits match the ID digits of an entry in the contact list
(by identity, position and number).
On decode, if Call Back is enabled, the
current contents of the address buffer gets overwritten with the variable
digit ids.
Advanced or Basic User is defined on the Per Radio Signalling Definition
.
Simultaneous Decode of Status and Address
Digits:
The radio is able to decode both address and status digits from a decode
telegram.
In order to reference variable digits, such as Single Tones, special
characters are used in the sequence fields and mapped to the corresponding
codeplug fields.
Single
Tones - (T1), (T2); Note the radio�s display references Single
Tone T1 as �J� and Single Tone T2 as �K�
Status Digits - (S1) � (S3)
Address Digits - (A1) � (A8)
Radio ID Digits: (U1) ... (U8)
E.g.  (T1)18181
For Select 5 signalling systems only, if the same tone occurs consecutively,
in a sequence, then the decoder will expect a repeat tone.
E.g. 23445 ��.. 234R5
Or 24444 ��.. 24R4R
The radio is able to support decode sequences that have a different
number of tones, where the longest sequence contains the same tones as
the shorter sequence.  E.g.
It must be able to decode 12345 and 123456.
Notes
Available
when the radio is a Select 5 model.
If Call Back and Auto
Acknowledge are enabled, the associated telegrams must use the same
variable digits.
Radio
B ID's and Radio ID are available when the
codeplug version is equal to or higher than 4.00.
The referred
Radio ID is available when the Radio ID digit is defined.
A Radio
ID digit can only be referred once in the Decoder Telegram.

### Decoder Single Tone Enable 1, 2

*Source: `(root)/Decoder_Single_Tone_Enable_1,_2.htm`*

Decoder Single Tone Enable 1, 2
When checked, enables a decoder single tone.
Notes
Available
when the radio is a Select 5 model.

### Decoder Single Tone Frequency 1, 2

*Source: `(root)/Decoder_Single_Tone_Frequency_1,_2.htm`*

Decoder Single Tone Frequency 1, 2
For each Signalling System it is possible to define two Decode Single
Tones.
Decode Single tones are referenced from Decode Sequences in the same
way as standard tones.
The decoder single tone frequency is programmable using the spin control;
the CPS user must be careful not to overlap a single tone frequency with
that of a standard tone.
Notes
Available
when the radio is a Select 5 model.

### Decoder Single Tone Max. Duration

*Source: `(root)/Decoder_Single_Tone_Max._Duration.htm`*

Decoder Single Tone Max. Duration
Defines the maximum duration of a decoder single tone. Range is from
10 ms to 6000 ms, in increments of 10 ms.
Notes
Available
when the radio is a Select 5 model.

### Decoder Single Tone Min. Duration

*Source: `(root)/Decoder_Single_Tone_Min._Duration.htm`*

Decoder Single Tone Min. Duration
Defines the minimum duration of a decoder single tone. Range is from
10 ms to 6000 ms, in increments of 10 ms.
Notes
Available
when the radio is a Select 5 model.

### Decoder Type

*Source: `(root)/Decoder_Type.htm`*

Decoder Type
Determines the type of action taken by the radio on receiving a valid
telegram. They are used to enable features of the radio, from lifting
the squelch and opening the radios audio circuits for an individual call
sequence, to instigating an emergency and they can also be used to display
information if the radio has a display or give alerts.
Choices
Functionality
General:
This is used for decoding own (individual/group)
ID�s. Upon successful decoding, the appropriate alert may be sounded and/or
the ID of the calling unit may be displayed.
Incoming Emergency:
Enabling this feature means that if an emergency
decode is received, any further calls will not interrupt the emergency
call, either during the call or while the call is waiting to be answered.
Note:
The radio emergency can be reset on successful decode of the appropriate
'Emergency Exit' sequence.
The incoming emergency
alert will be sounded.
If Call
Back is enabled, and non-emergency calls are received, the emergency
call remains active for call back.
If the stacker is disabled,
then any further incoming (non-priority, priority & emergency) calls
will be lost.
Emergency Decode using
Status. It is possible to use status messaging for emergency calls. Reception
of a decode telegram with the status digits matching an entry for emergency
in the status list, will cause that entry, indicating emergency, to be
displayed.
Priority:
Enabling this feature means that if a priority
decode is received, any further non priority/priority calls will not interrupt
the priority call, either during the call or while the call is waiting
to be answered. It will be interrupted if an Emergency sequence is decoded.
The incoming priority alert
will be sounded.
If the stacker is disabled,
then any further incoming non- priority/emergency calls will be lost.
If the stacker is disabled
then any further incoming priority/ emergency calls will be lost.
Emergency Exit
If a decoder is programmed with Emergency
Exit and the radio is operating in Emergency Mode, then on receiving this
sequence the radio will exit Emergency Mode.
Stun:
If
a radio has a decoder set up for stun, then on decoding the sequence the
radio will be 'stunned'. All attempts at user activity, except powering
on/off, will be ignored. The radio display will be frozen and the only
received signal action by the radio will be the unstun decode sequence.
Unstun:
If a stunned radio has a decoder programmed
for unstun, then on reception of this tone sequence the radio will revert
to normal operation.
The radio may also be unstunned
by reprogramming the radio.
Clear Down:
On receiving the decoded 'Cleardown' sequence
the radio will stop auto-reset. Auto-reset
must be enabled on the personality for this option to be selected.
Silent Interrogate:
This feature enables the radio to be interrogated
without the user knowing. On decoding the silent interrogate sequence,
the radio will transmit an ACK.
ACK 1 / Ringing:
Enabling this feature means that if an ACK1,
ringing decode is received in response to the transmission of a telegram
with the Acknowledge feature set
to ACK 1 with Answer.
Then the transmitting radio
will display the ringing text, sound the decoders ringing alert and wait
for the receiving radio to answer before being allowed to transmit.
ACK 1 / Authorisation:
Enabling this feature means that if an ACK1,
authorisation decode is received in response to the transmission of a
telegram with the Acknowledge feature
set to ACK 1.
Then the radio will sound
the decoder alert and will 'Authorize' the radio so that the user can
transmit.
Notes
Available
when the radio is a Select 5 model.
If ACK
1 / Ringing, ACK 1 /Authorisation, Incoming Emergency, Stun, or Silent
Interrogate is selected, the Decode
Telegram can not contain variable
digits.
If Silent
Interrogate is selected, an Acknowledge
Telegram must be defined.

### Designated Power Up Channel

*Source: `(root)/Designated_Power_Up_Channel.htm`*

Designated Power Up Channel
The radio can be programmed to always power up on a defined channel.
If not programmed, it will always power up on the last used channel prior
to power down.
Choices available are:
None
Available Channels
Notes
Available
when the radio is a Mobile model.

### Designated Tx Channel

*Source: `(root)/Designated_Tx_Channel.htm`*

Designated Tx Channel
Defines which channel will be the designated transmit channel.
Notes
Available
when the radio is a Select 5 model.
Available
when Tx Mode is set to 'Designated Channel'.

### Designated Tx Personality

*Source: `(root)/Designated_Tx_Personality.htm`*

Designated Tx Personality
When the radio is in Landed
Scan,
selects a transmit Personality
to be used for the current Scan
List
and while operating in Scan
Mode.
Personality selections are CPS
given names. For example; Conventional-1.
Choices available are:
Selected
Available Personality
Notes
Available
when the radio is a Display model.
The 'Selected'
choice causes the radio to transmit on the assigned channel of the radio�s
current Channel Selector position.

### Designated Tx Personality

*Source: `(root)/Designated_Tx_Personality_LTR.htm`*

Designated Tx Personality
When the radio is in Landed
Scan,
selects a transmit Personality
to be used for the current Scan
List
and while operating in Scan
Mode.
Personality selections are CPS
given names. For example; Conventional-1.
Choices available are:
Selected
Last Active
Available Personality
Available Talk Group
Notes
Available
when the radio is a Display model.
The 'Selected'
choice causes the radio to transmit on the assigned channel of the radio�s
current Channel Selector position.

### Dial Type

*Source: `(root)/Dial_Type.htm`*

Dial Type
Selects the method that the radio uses to transmit the DTMF
digits - dialed by the radio-user, while in the Phone
Mode.
This applies for the current Phone
System.
Choices
Functionality
Live Dial:
Automatically keys-up
the radio and sends out DTMF digits as they are dialed.
Buffered Dial
Sends out all DTMF digit input once PTT
is pressed.
Notes
Available
when the radio is a Mobile Display or a Portable Full Keypad model.
If Phone Access/Deaccess Type is set to Delayed Auto then Dial Type
field is disabled and set to Buffered Dial.
If Phone Access/Deaccess
Type is set to Manual then Dial Type field is disabled and set to Live
Dial.

### Disable Alert

*Source: `(root)/Disable_Alert_buttons.htm`*

Disable Alert
(Expert Feature)
If enabled, the alert tone indicates that the programmable feature assigned
to the button has been disabled.
Choices
Available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Disconnect Words (LTR)

*Source: `(root)/Disconnect_Words_(LTR).htm`*

Disconnect Words (LTR)
Selects the number of Disconnect Words that the radio transmits when
the radio-user de-keys the radio. A Disconnect Word warns the receiving
radio to mute
its speaker to avoid unwanted disconnect noise, known as Squelch
Tail.
This feature applies for the current LTR Site.
These settings then become functional for all Talk
Groups
within that LTR Site. Range is from 1 to 4.
Notes
This
feature is available only on radios that are LTR capable.

### Display Text

*Source: `(root)/Display_Text.htm`*

Display Text
If the display is programmed to Display Text, once it is in the idle
state, the Display Text message will be displayed. Thereafter, every time
the radio returns to the idle state, this message is displayed. If the
Display Text field is blank, the radio will display "Channel"
when it is in the idle state.
The text message can contain up to 8 alphanumeric characters.
Notes
Available
when the radio is a Select 5 Display model.

### Display Voted Channel

*Source: `(root)/Display_Voted_Channel.htm`*

Display Voted Channel
(Expert Feature)
When checked, the radio displays the �Home Channel Number� or channel
name, until the PTT is pressed. When the PTT is pressed, the radio will
display the �Voted� channel number/name. Once the call is completed, the
radio resumes scanning and will then revert to displaying the �Home� channel
number/name.
When unchecked (the Default setting), the radio will only display the
�Home� channel number/name.
Notes
Available
when the radio is a Select 5 model.
Available
when Vote Scan is enabled.

### Drag And Drop (Select 5)

*Source: `(root)/Drag_And_Drop_(Select5).htm`*

Drag And Drop (Select 5)
The Contact List, Personalities can be dragged (copied) from one file
and dropped (pasted) into another file using the mouse (similar to Windows
Explorer).
Highlight the Personality.
Drag it to the Personality
folder into the other file. The Personality appears in the tree view.
Notes
When
dragging a folder, the CPS "Invalid" cursor appears
whenever the drop location is inappropriate.

### Drag And Drop

*Source: `(root)/Drag_And_Drop_LTR.htm`*

Drag And Drop
Signaling Systems, Personalities, Phone Systems, Call Systems, Sites,
Repeaters, Talk Groups, and Universal ID's can be dragged (copied) from
one document and dropped (pasted) into another document using the mouse
(similar to Windows Explorer).
Highlight the folder.
Drag it to the appropriate
folder in the other document. The Signaling System, Personality, Phone
System, Call System, Site, Repeater, Talk Group, or Universal ID appears
in the tree view.
Notes
When
dragging a folder, the CPS "Invalid" cursor appears
whenever the drop location is inappropriate.

### E-mailing a Report

*Source: `(root)/E-mailing_a_Report.htm`*

E-mailing a Report
To E-mail the report to a customer:
From the File
menu Choose Reports, or from the
tool bar click
A dialog box appears.
Click on one of the
report types and click the E-mail
button.
Your E-mail browser
appears. The report will automatically be attached to your E-mail.

### Early Unmute

*Source: `(root)/Early_Unmute.htm`*

Early Unmute
(Expert Feature)
When checked, the radio will unmute in Vote before confirmation of the
correct PL.
If the PL is confirmed OK the radio will �Land On�, otherwise the radio
will mute and continue the scan sequence.
Notes
Available
when the radio is a Select 5 model.
Available
when Vote Scan is enabled.

### Editing a Phone Entry

*Source: `(root)/Editing_a_Phone_Entry.htm`*

Editing a Phone Entry
Highlight Phone
in the tree view.
Enter the name that will be associated with the phone
number (up to 8 characters) in the Name column.
Enter the phone number (up to 16 digits) in the Number
column.
Notes
Available
when the radio is a Display model.
Up to 25 Phone
List entries are allowed.
Up to 16 digits
for a Phone Number are allowed.
When the codeplug
version is equal to or greater than 03.00, valid characters available
are 0-9, *, #, -, P (pause character). There may be a need for a pause
when the radio is transmitting a Phone Number entry that is set-up for
one-touch Speed Dialing. The amount of pause time can be defined in the
Pause
Duration field.
When the codeplug
version is less than 03.00, valid characters available are 0-9, *, #,
-.
Up to 8 characters
for a Phone Name are allowed. Valid characters available are A-Z, a-z,
1-9, \, #, < >, *, +, _, /, -.
One-touch Speed
Dialing is only available on Keypad models.

### Emergency Accessory Microphone Gain Offset

*Source: `(root)/Emergency_Accessory_Microphone_Gain_Offset.htm`*

Emergency Accessory Microphone Gain Offset
During emergency transmit operation, an alternative microphone gain
may be used. This feature is intended to increase the microphone sensitivity
and allow it to pick up conversation (etc.), over a larger area.
Range can be set from 0.0 dB to 45.0 dB, in steps of 1.5 dB.
Notes
Available
when the radio is a Select 5 model.
Available
when Microphone Gain is
enabled.

### Emergency Ack Alert

*Source: `(root)/Emergency_Ack_Alert.htm`*

Emergency Ack Alert
When checked, causes the radio to sound an alert tone when an Emergency
Transmission acknowledgement is received. The acknowledgement is sent
back from the receiving radio, confirming a successful Emergency Transmission.
Notes
Available
when the radio is a Mobile Display model.
Available when
Emergency Type is not
set to Disabled.

### Emergency Alert

*Source: `(root)/Emergency_Alert.htm`*

Emergency Alert
When checked, causes the radio to sound an alert tone when the Emergency
Button is pressed initiating the Emergency
Mode.
Notes
Available
when the radio is a Mobile Display model.
Available when
Emergency Type is not
set to Disabled.

### Emergency Cycle Mode

*Source: `(root)/Emergency_Cycle_Mode.htm`*

Emergency Cycle Mode
Controls whether emergency cycles forever or for a limited number of
cycles.
Available
choices are:
None
Forever
Limited Number of Cycles
Notes
Available
when the radio is a Select 5 model.

### Emergency Cycles

*Source: `(root)/Emergency_Cycles.htm`*

Emergency Cycles
Defines and displays the number of times the radio cycles between the
transmit and receive modes before going permanently into the receive mode.
The range is from 1 to 255, in increments of 1.
Notes
Available
when the radio is a Select 5 model.
Available
when Emergency Cycle Mode is set
to 'Limited number of cycles'.

### Emergency Encoder Telegram

*Source: `(root)/Emergency_Encoder_Telegram.htm`*

Emergency Encoder Telegram
Used to select which 1 of the 32 possible telegrams will be sent when
the radio transmits in Emergency
Mode.
Available choices are:
None
Available Telegrams
Notes
Available
when the radio is a Select 5 model.

### Emergency Impolite Retries

*Source: `(root)/Emergency_Impolite_Retries.htm`*

Emergency Impolite Retries
(Expert Feature)
When in Emergency
Mode,
this feature selects the number of times the radio impolitely sends an
Emergency Transmission, even when the channel
is currently busy with other radio traffic. This is known as an Impolite
Transmission.
The range is from 0 to 255, in increments of 1.
Notes
Available
when the radio is a Mobile Display model.
Available when
Emergency Type is not
set to Disabled.

### Emergency LED

*Source: `(root)/Emergency_LED.htm`*

Emergency LED
When checked, causes the transmitting radio�s LED
to continuously light-up during Emergency
Mode.
Notes
Available
when the radio is a Mobile Display model.
Available when
Emergency Type is not
set to Disabled.

### Emergency Lone Worker Pre-Alert

*Source: `(root)/Emergency_Lone_Worker_Pre-Alert_5tone.htm`*

Emergency Lone Worker Pre-Alert
(Expert Feature)
When checked, an alert is sounded at a pre-defined time before the user
must 'call in'. Failure to 'call in' causes the radio to enter Emergency
Mode.
Notes
Available
when the radio is a Select 5 model.

### Emergency Lone Worker Reminder Time

*Source: `(root)/Emergency_Lone_Worker_Reminder_Time_5tone.htm`*

Emergency Lone Worker Reminder Time
(Expert Feature)
This timer is used to set the time period for which the Emergency
Lone Worker Pre-Alert sounds. After this period the radio will go
into the Emergency
Mode
of operation.
This timer range is from 1 to 255 seconds, in increments of 1 second.
If set to 0, this feature is disabled.
Notes
Available
when the radio is a Select 5 model.

### Emergency Lone Worker Response Time

*Source: `(root)/Emergency_Lone_Worker_Response_Time_5tone.htm`*

Emergency Lone Worker Response Time
(Expert Feature)
This timer defines the time period after which the radio sounds the
Emergency Lone Worker
Pre-Alert. The Lone Worker must respond to this alert, by pressing
any button, within the time period set for the Emergency
Lone Worker Reminder Time, otherwise the radio will go into Emergency
Mode.
Once a button is pressed the timer is reset.
This operating mode may be enabled/disabled by the radio user if a button
has been programmed for Lone
Worker
on channel change or via a the Lone Worker
menu selection.
This timer range is from 1 to 255 minutes, in increments of 1 minute.
Notes
Available
when the radio is a Select 5 model.

### Emergency Long Press Duration

*Source: `(root)/Emergency_Long_Press_Duration.htm`*

Emergency Long Press Duration
(Expert Feature)
Selects the amount of time that the radio�s Emergency button must be
continuously pressed to end the Emergency
Mode.
Range is from 0 second to 15 seconds, in 1 second increments.
Notes
Available
when the radio is a Mobile Display model.
Available when
Emergency Type is not
set to Disabled.

### Emergency Long Sidetone

*Source: `(root)/Emergency_Long_Sidetone.htm`*

Emergency Long Sidetone
(Expert Feature)
When checked, causes the transmitting radio to sound an alert tone every
time the Emergency Data Packet is sent during Emergency
Mode.
The Emergency Data Packet contains information as to which radio was the
source of the transmission.
Notes
Available
when the radio is a Mobile Display model.
Available when
Emergency Type is not
set to Disabled.

### Emergency Microphone Gain Offset

*Source: `(root)/Emergency_Microphone_Gain_Offset.htm`*

Emergency Microphone Gain Offset
During emergency transmit operation, an alternative microphone gain
may be used. This feature is intended to increase the microphone sensitivity
and allow it to pick up conversation (etc.), over a larger area.
Range can be set from 0.0 dB to 45.0 dB, in steps of 1.5 dB.
Notes
Available
when the radio is a Select 5 model.
Available
when Microphone Gain is
enabled.

### Emergency Microphone Source

*Source: `(root)/Emergency_Microphone_Source.htm`*

Emergency Microphone Source
The choice in this option box defines the microphone used in Emergency
Mode.
It can be active from either the front microphone control head connection
or through to the rear accessory connector.
Microphones can be programmed to automatically become active during
emergency mode when Secret Emergency
has been enabled.
Choices available are:
Handheld Microphone
Accessory connector
Notes
Available
when the radio is a Select 5 Mobile model.

### Emergency Minimum Volume

*Source: `(root)/Emergency_Minimum_Volume.htm`*

Emergency Minimum Volume
The minimum volume-setting if the radio's power switch is set to the
OFF position.
Range is from 1 to 255, in increments of 1.
Notes
Available
when the radio is a Select 5 model.

### Emergency Mode

*Source: `(root)/Emergency_Mode.htm`*

Emergency Mode
(Expert Feature)
Selects the emergency functionality during the radio�s Emergency
Mode.
Choices
Functionality
Alarm:
An MDC
emergency alarm data packet is repeatedly sent to the base station unit
until the transmission is ended by one of the following four methods:
All
the CPS
defined retries (both polite
and impolite
transmissions) have been exhausted
An acknowledgement
confirming the successful transmission of the emergency data packet is
received back from the base station.
A radio-user
PTT
button press.
A radio-user
long press of the emergency button.
Alarm/Call:
An MDC emergency alarm data packet is repeatedly
sent to the base station. When the Alarm data packet has ceased, then
voice (Call) is able to transmit on the channel.
The alarm data packet ceases to transmit
and voice is able to be transmitted when any one of the following three
conditions is true:
All
the CPS defined retries (both polite and impolite) have been exhausted.
An acknowledgement
confirming the successful transmission of the emergency data packet is
received back from the base station.
A radio-user
PTT button press.
Notes
Available
when the radio is a Mobile Display model.
Available when
Emergency Type is not
set to Disabled.

### Emergency On/Off Switch

*Source: `(root)/Emergency_On_Off_Switch.htm`*

Emergency On/Off Switch
When checked, enables the radio's power ON/OFF switch to operational
during emergency operation. When unchecked, the radio's power ON/OFF switch
is non-operational during emergency operation. If the switch is non-operational,
then the power would have to be physically removed from the radio.
Notes
Available
when the radio is a Select 5 model.

### Emergency Open Mic Duration

*Source: `(root)/Emergency_Open_Mic_Duration.htm`*

Emergency Open Mic Duration
(Expert Feature)
Selects the amount of time that the microphone remains automatically
keyed-up
once the Emergency Alarm data packets have ceased. Emergency Alarm data
packets cease to transmit when all Polite
and Impolite
retries have been exhausted, or an acknowledgement confirming the successful
transmission of the emergency data packets is received. This automatic
Open Microphone broadcast transmits on the same channel
as the Emergency Alarm data packets. The range is from 0 seconds to 140
seconds, in increments of 20 seconds.
Notes
Available
when the radio is a Mobile Display model.
Available when
Emergency Type is not
set to Disabled.

### Emergency PTT ID

*Source: `(root)/Emergency_PTT_ID.htm`*

Emergency PTT ID
(Expert Feature)
Selects a unique PTT
ID
that is transmitted while the radio is operating in an Emergency
Mode.
The range is from 0001 to DFFF.
Notes
Available
when the radio is a Mobile Display model.
Available when
Emergency Type is not
set to Disabled.
Available when
Emergency Mode field is set to Alarm/Call.
If this field
is blank, then Emergency PTT ID will be disabled.

### Emergency Polite Retries

*Source: `(root)/Emergency_Polite_Retries.htm`*

Emergency Polite Retries
(Expert Feature)
When in Emergency
Mode,
this feature selects the number of times the radio politely sends an Emergency
Transmission, even when the channel
is currently busy with other radio traffic. This is known as an Polite
Transmission.
The range is from 0 to 255, in increments of 1.
Notes
Available
when the radio is a Mobile Display model.
Available when
Emergency Type is not
set to Disabled.

### Emergency Revert Channel

*Source: `(root)/Emergency_Revert_Channel_(Select_5).htm`*

Emergency Revert Channel
Selects the Channel to be used during Emergency
Mode.
No matter what channel the radio is currently operating on, the radio
is automatically switched to this channel for an emergency transmission.
Choices available are:
Selected (current channel)
Available Personalities
Notes
Available
when the radio is a Select 5 model.

### Emergency Squelch

*Source: `(root)/Emergency_Squelch.htm`*

Emergency Squelch
Used to select the required signalling squelch mode needed to unmute
the receiver when the radio is in the Emergency
Mode
of operation.
Available choices are:
CSQ
PL
Speaker Closed
Notes
Available
when the radio is a Select 5 model.

### Emergency Switch Debounce Time

*Source: `(root)/Emergency_Switch_Debounce_Time.htm`*

Emergency Switch Debounce Time
(Expert Feature)
This feature is used to prevent accidental operation of the emergency
button by setting a time for which the emergency button must be held pressed
before the radio recognizes it as a valid key press and enters emergency
mode.
The time range can be set from 1000 to 6300 ms, in steps of 100 ms.
Notes
Available
when the radio is a Select 5 model.

### Emergency Tx Cycles

*Source: `(root)/Emergency_Tx_Cycles.htm`*

Emergency Tx Cycles
(Expert Feature)
Selects the number of times that the radio automatically keys-up
for the purpose of sending voice during Emergency
Mode.
The radio automatically transmits for the amount of time defined in the
Emergency Open Mic Duration
field. The range is from 1 to 10 in increments of 1.
Notes
Available
when the radio is a Mobile Display model.
Available when
Emergency Type is not
set to Disabled.
Available when
Emergency Open Mic Duration is not
disabled.

### Emergency Tx Cycles Delay

*Source: `(root)/Emergency_Tx_Cycles_Delay.htm`*

Emergency Tx Cycles Delay
(Expert Feature)
Selects the amount of time between Emergency
Tx Cycles. The Tx Cycles selection defines how many Emergency
Open Mic Durations are initiated during an Emergency
Mode.
The range is from 0 seconds to 60 seconds, in increments of 5 seconds.
Notes
Available
when the radio is a Mobile model.
Available when
Emergency Type is not
set to Disabled.
Available when
Emergency Open Mic Duration is not
disabled.
Available when
the Emergency Tx Cycles is set to
a value greater than 1.

### Emergency Tx/Rx Cycle Time

*Source: `(root)/Emergency_Tx_Rx_Cycle_Time.htm`*

Emergency Tx/Rx Cycle Time
The 3 option boxes, Emergency Tx, Emergency Rx and Emergency
Cycle Mode define how the radio operates during Emergency Mode. The
radio can be set to transmit once and then go into receive, or switch
(cycle) between transmit and receive for a specific number of cycles or
until a de-activation code sequence is received. The radio can also be
put into permanent cycle mode.
The radio will only exit the emergency mode on receipt of a de-activation
code sequence, or until power is removed from the radio. The power ON/OFF
switch can be programmed to be either operational or non-operational during
emergency operation through the Emergency
On/Off Switch feature. If the switch were non-operational, then the
power would have to be physically removed from the radio.
The emergency Tx and Rx option boxes define how long the radio remains
in either the Tx or Rx mode when the �Emergency Cycle Mode� feature has
been selected.
The Tx & Rx periods can be set, independently, from 1 to 255 seconds,
in increments of 1 second.
Notes
Available
when the radio is a Select 5 model.

### Emergency Tx Tone

*Source: `(root)/Emergency_Tx_Tone.htm`*

Emergency Tx Tone
When checked, while in emergency mode and whenever the radio transmits,
a low-level pulsating tone will be transmitted. This 2800 Hz tone is on
for 100 ms, off for 200 ms and is 10 dB below nominal 5 Tone deviation.
This tone is low enough in volume not to interfere with any other audio
received.
Other users on the channel hearing the tone, realize there is an emergency
in progress and, hopefully, not transmit on the channel until the emergency
is cancelled.
Notes
Available
when the radio is a Select 5 model.

### Emergency Voice Message Frequency

*Source: `(root)/Emergency_Voice_Message_Frequency.htm`*

Emergency Voice Message Frequency
(Expert Feature)
Defines the number of transmit cycles after which the radio re-transmits
a recorded Voice message during the emergency mode.
Example:
If Every 2 cycles is selected the radio will go through the following
procedure:
First Tx Cycle � plays recorded emergency voice
message for the duration of the recorded message.
Second Tx Cycle � Allows transmission of the Radio
Users Voice for the Emergency
Tx Cycle Time duration.
The third Tx Cycle � plays recorded emergency
message for the duration of the recorded message.
Choices available are:
Every cycle
Every 2 cycles
Every 3 cycles
Every 4 cycles
Notes
Available
when the radio is a Select 5 model that supports Voice Storage.
Available
when Emergency Cycle Mode is not disabled.

### Emphasis Selection (LTR)

*Source: `(root)/Emphasis_Selection_(LTR).htm`*

Emphasis Selection (LTR)
(Expert Feature)
Selects the type of audio shaping used while operating on the current
repeater.
These selections can enhance audio clarity.
This repeater is part of the current LTR
Site
that can be assigned to a Trunking
Personality.
This setting then becomes functional for all Talk
Groups
within that Trunking Personality.
Choices available are:
None
Pre-Emphasis
De-Emphasis
De-Emphasis and Pre-Emphasis
Notes
This
feature is available only on radios that are LTR capable.

### Enable Alert

*Source: `(root)/Enable_Alert_buttons.htm`*

Enable Alert
(Expert Feature)
If enabled, the alert tone indicates that the programmable feature assigned
to the button has been enabled.
Choices
Available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Encoder Hold Time

*Source: `(root)/Encoder_Hold_Time.htm`*

Encoder Hold Time
(Expert Feature)
This is the period of time for which the radio remains keyed after transmission
of an encode telegram. This hold time is not applied between sequence
concatenations.
The hold time can be programmed from 0 to 2550 ms, in increments of
10 ms.
Notes
Available
when the radio is a Select 5 model.

### Encoder Sequence

*Source: `(root)/Encoder_Sequence.htm`*

Encoder Sequence
In Select 5 signalling systems, tones for transmission are grouped into
sequences. Sequences are transmitted in a telegram and a telegram consists
of 1 to 3 encode sequence(s) concatenated together.
An encode sequence may consist of up to 12 tones.
An encode sequence may contain
Any of the standard
signalling tones (0 - 9, A,B,C,D,E,F)
Group, Repeat
Single Tones (T1), (T2); Note the radios display
references Single Tone T1 as �J� and Single Tone T2 as �K�
Radio B ID positions 1 to 8, (referenced by (A1)
� (A8))
Radio A Status ID positions 1 to 3, (referenced
by (S1) � (S3))
For DTMF sequences [0 - 9, P (pause digit), *,
#].
For Select 5 sequences (U1), (U2) ... (or U8).
Called Radio ID Positions 1 to 8:
If an encode telegram contains any references to another radio�s ID
digits 1-8, then the current digits from the Multicall Address Buffer
will be substituted into the telegram.
This radio�s digit positions may be spread across telegrams e.g. positions
1-4 could be in sequence 1 of the telegram and positions 5-8 could be
in sequence 2 of the telegram.
The called radio�s digit positions in the telegram do not have to be
adjacent and can be specified in any order.
Calling Radio Status IDs 1 to 3:
If an encode telegram contains any references to the calling radio�s
Status Digits 1 to 3, then current digits from the Multicall Status Buffer
will be substituted into the telegram.
The radio�s status ID digits in the telegram do not have to be adjacent
and can be specified in any order. They cannot be spread across telegrams.
If an encode telegram contains less status digits, than the maximum
number of status digits used by all the telegrams, then the status digits
specified by the telegram will be used.
In order to reference variable digits, such as Single Tones special
characters are used in the sequence fields and mapped to the corresponding
codeplug fields.
Single Tones: (T1), (T2); Note
the radio�s display references Single Tone T1 as �J� and Single Tone T2
as �K�
Status Digits: (S1) � (S3)
Address Digits: (A1) � (A8)
Radio ID Digits: (U1) ... (U8)
Every reference definition starts with an opening bracket �(� and ends
with a closing bracket �)�.
E.g.  (T1)18181
Notes
Available
when the radio is a Select 5 model.
An Encoder
Sequence may not be empty.
Radio
ID and Select 5 sequences are available when the codeplug version
is equal to or higher than 4.00.
The referred
Radio ID is available when the Radio ID digit is defined.
A Radio
ID digit can only be referred once in the Encoder Telegram.

### Encoder Sequence Digit Duration

*Source: `(root)/Encoder_Sequence_Digit_Duration.htm`*

Encoder Sequence Digit Duration
This is applied to stored DTMF sequences in the contact list and sequences
associated with call buttons. It is the tone duration used for predefined
DTMF encoder sequences.
Range is from 30 ms to 2540 ms, in increments of 10 ms.
Notes
Available
when the radio is a Select 5 model.

### Encoder Sequence Inter Digit Delay

*Source: `(root)/Encoder_Sequence_Inter_Digit_Delay.htm`*

Encoder Sequence Inter Digit Delay
Specifies the delay between predefined transmitted DTMF tones in sequences.
Range is from 0 to 1000 ms, in increments of 10 ms.
Notes
Available
when the radio is a Select 5 model.

### Encoder Single Tone Duration 1, 2

*Source: `(root)/Encoder_Single_Tone_Duration_1,_2.htm`*

Encoder Single Tone Duration 1, 2
Define the length of time the tone will be transmitted. Range is from
40 ms to 6000 ms, in increments of 10 ms.
Notes
Available
when the radio is a Select 5 model.

### Encoder Single Tone Frequency 1, 2

*Source: `(root)/Encoder_Single_Tone_Frequency_1,_2.htm`*

Encoder Single Tone Frequency 1, 2
For each Signalling System, it is possible to define two Encode Single
Tones.
Encode Single Tones are referenced from Encode Sequences in the same
way as standard tones.
The Frequency and Duration of the Encode Single Tones is programmable
using the spin control and the CPS user must be careful not to overlap
a single tone frequency with that of a standard tone.
Range is from 300 to 3000 Hz, in increments of 1 Hz.
See Also
Select
5 System Table
Notes
Available
when the radio is a Select 5 model.

### Encoder Telegram Sequence 1-3

*Source: `(root)/Encoder_Telegram_Sequence_1-3.htm`*

Encoder Telegram Sequence 1-3
Sequence 1 is always enabled and 2 & 3 can be selected by enabling
2 then 3. Allows any 1 of up to 32 encode sequences to be selected for
each box and up to 32 encoder telegrams can be generated.
Notes
Available
when the radio is a Select 5 model.

### Encoder Tone Duration

*Source: `(root)/Encoder_Tone_Duration.htm`*

Encoder Tone Duration
Defines the length of time the encoder tone will be transmitted. Range
is from 30 ms to 6000 ms, in increments of 10 ms.
Notes
Available
when the radio is a Select 5 model.

### Engaged Alert

*Source: `(root)/Engaged_Alert.htm`*

Engaged Alert
(Expert Feature)
This is sounded if a button is pressed while transmit Tx
Admit Criteria is not satisfied.
Available
choices are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Escalert

*Source: `(root)/Escalert.htm`*

Escalert
When checked, causes the radio to gradually increase the volume of a
repetitive alert tone. This repetitive tone is an alert of an incoming
radio call. Escalert can be selected by a radio-user (short or long programmable
button-press). The radio-user can also make this selection with the Escalert menu feature.
Notes
Available
in Portable radio models that support the Escalert feature.

### Escalert Maximum Volume

*Source: `(root)/Escalert_Maximum_Volume.htm`*

Escalert Maximum Volume
This feature defines the maximum volume for escalating alerts.
Range is from Disabled, or 0 to 255, in increments of 10 .
Notes
Available
when the radio is a Select 5 model.

### Extended 1st Tone Duration

*Source: `(root)/Extended_1st_Tone_Duration.htm`*

Extended 1st Tone Duration
(Expert Feature)
It is possible to specify an extended first tone for each Encode
Sequence.
If a transmitted sequence has an extended first tone, the receiver�s
decoders must know what the duration is (Telegram
1st Tone Duration), otherwise the sequence would be corrupted on decode.
The length of the tone would not be of the correct duration for the standard
used (CCIR, EEA, ZVEI etc).
This may be used with the Telegram Repeat
option for multi-channel systems that use scan.
The duration of the code is programmable from 0 to 2550 ms, in increments
of 10 ms. If set to 0 ms, the option is disabled.
Notes
Available
when the radio is a Select 5 model.

### External Alarm

*Source: `(root)/External_Alarm.htm`*

External Alarm
If the user leaves the vehicle, this feature can be used to alert them
to a received call and can be disabled on their return. The feature asserts
one of the GP/IO lines on decode of a valid call. The line can be used
to activate the horn, lights or other alarm. (Note: this feature is not
legal in all countries.)
External Alarm is selected �per radio� via the CPS. It can be turned
on or off by the radio operator, when:
A button programmed for External
Alarm On/Off
is toggled; or selecting the required option in the menu, if the External
Alarm option has been enabled as part of the menu features. The External
Alarm menu option appears under the 'Utilities' menu heading.
If a radio has external alarm enabled and it has a decoder with external
alarm enabled, then the output will be asserted whenever an individual
and/or a group decode is received.
The output is de-asserted and the alarm disabled when: any button is
pressed; or the radio is stunned; or a time equal to the external alarm
duration has passed since the most recent previous assertion of the output.
For instance, if the external alarm duration is 5 seconds, and two decodes
are received 1 second apart, the alarm will start on receipt of the first
decode, and stop 6 seconds later (i.e., 5 seconds after the second decode).
Choices
Functionality
Always On - Individual Call:
Receipt of a successfully decoded individual
telegram will activate the alarm.
Always On - Ind/Group Call:
Receipt of a successfully decoded individual
or group call telegram will activate the alarm.
Selectable - Individual Call:
Receipt of a successfully decoded individual
telegram will activate the alarm, when 'External Alarm' is enabled by
the radio user via button or menu.
Selectable - Ind/Group Call:
Receipt of a successfully decoded individual
or group call telegram will activate the alarm, when 'External Alarm'
is enabled by the radio user via button or menu.
Notes
Available
when the radio is a Select 5 Mobile model.
It is only
possible to assign this function to Pin #4 of the accessory connector.
Available when
at least one Decoder has External
Alarm enabled and an output line  must
be programmed to the External Alarm. See Accessory Connector.

### External Alarm Duration (Select 5)

*Source: `(root)/External_Alarm_Duration_(Select_5).htm`*

External Alarm Duration (Select 5)
Selects the amount of time that the External
Alarm
feature remains active. The External Alarm is activated by an incoming
Call. Range is from 2 second to 32 seconds, in increments of 1 second.
Notes
Available
when the radio is a Select 5 Mobile model.
Any radio-user
interaction with the Control Head (other than volume control) deactivates
an active External Alarm. The External Alarm then waits in an armed state
to be triggered again.

### External Alarm (Decoder)

*Source: `(root)/External_Alarm_decoder.htm`*

External Alarm (Decoder)
(Expert Feature)
Selecting this option will assert a pre-programmed GP I/O line that
enables the external alarm, if fitted to a vehicle, to alert the user
to a received call when away from the vehicle.
See Also
General
Purpose I/O Package
Notes
Available
when the radio is a Select 5 mobile model.
If Decoder Type is set to Stun, Ack1/Ringing,
Ack1/Authorisation, or Silent Interrogate, External Alarm should be disabled.
This option
is not legal in all countries.

### External Alarm (Menu)

*Source: `(root)/External_Alarm_menu.htm`*

External Alarm (Menu)
When checked, enables the External Alarm
feature to be included in the Utilities menu. If the user leaves the vehicle,
this feature can be used to alert them to a received call and can be disabled
on their return
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Mobile Display model.

### Fast Vote RSSI Level

*Source: `(root)/Fast_Vote_RSSI_Level.htm`*

Fast Vote RSSI Level
(Expert Feature)
During fast vote scan, the radio will look for a channel with an RSSI
level equal to, or greater than the pre-programmed Fast Vote RSS Level.
The level can be set from -70 to -120 dBm, in increments of 1dBms.
The radio will land on the first channel with the RSSI level equal to,
or greater than the pre-programmed Fast Vote RSS Level that meets the
squelch criteria.
Notes
Available
when the radio is a Select 5 model.

### Fist Microphone

*Source: `(root)/Fist_Microphone.htm`*

Fist Microphone
(Expert Feature)
When checked, enables the fist microphone for the selected personality.
When unchecked, the selected personality will not allow the radio to transmit
using the fist microphone, only through an accessory connector's PTT.
Notes
Available
when the radio is a Select 5 Mobile model.

### Fixed Alert Volume

*Source: `(root)/Fixed_Alert_Volume.htm`*

Fixed Alert Volume
(Expert Feature)
This option sets the volume level for all fixed alerts. The volume is
programmable from 0 to 255, in increments of 10.
Notes
Available
when the radio is a Select 5 model.

### Forced Monitor Alert

*Source: `(root)/Forced_Monitor_Alert.htm`*

Forced Monitor Alert
(Expert Feature)
This alert is sounded if the radio is forced to monitor the channel
before transmitting.
Choices available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Forced Monitor Mode

*Source: `(root)/Forced_Monitor_Mode.htm`*

Forced Monitor Mode
(Expert Feature)
Forced Monitor forces the channel to be monitored before keying the
radio. Forced monitor will be applied for all attempts to key the radio.
This may be a PTT press, or by a call button.
Choices
Functionality
Disabled:
Forced monitor is disabled.
Only if Channel Busy:
The channel needs to be monitored only if
the channel is busy.
Always:
The channel needs to be monitored always
before transmitting.
Notes
Available
when the radio is a Select 5 Mobile model.
Available
when Auto Reset Mode is enabled.

### Frequency Offset

*Source: `(root)/Frequency_Offset.htm`*

Frequency Offset
The Frequency Offset adds an offset to the Tx Frequency before copying
from the Rx Frequency to the Tx Frequency. Enter the amount of offset
manually in MHz.

### Frequently Asked Questions (Select 5)

*Source: `(root)/Frequently_Asked_Questions_(5tone).htm`*

Frequently Asked Questions (Select 5)
Q: What are the major differences
between the New Select 5 CPS
and the Original Select 5 CPS?
A:
New Field Name
Old Field Name
Test Mode
Test Mode Disable
Memory Channel
Memory Channel & Modifiable
Revert Channel
Emergency Revert Channel
Revert Channel
Revert Channel (Acknowledge)
Scan List
Include Current Channel
Display Text
Default Radio Display & Default Text Message
General Settings -> Microphone Gain
Mic. Gain (internal)
Accessories -> Microphone Gain
Mic. Gain (external)
General Settings -> Whisper Microphone Gain
Whisper Mic. Gain (internal)
Accessories -> Whisper Microphone Gain
Whisper Mic. Gain (external)
PersN -> Squelch Type (transmit)
Encode PL Type
PerN -> Squelch Type (receive)
Decode PL Type
Accessories
GP I/O
Q. What does CSQ stand for?
A. Carrier Squelch Only.

### Frequently Asked Questions

*Source: `(root)/Frequently_Asked_Questions_EMEA.htm`*

Frequently Asked Questions
Q:
Why is the channel order shown in the tree view different from the order
on the radio's knob?
A: The treeview shows
Personalities in the order in which they were added. The actual channel
'number' or knob position is determined by the order shown in the table
under the Personalities Folder where you can change the Personality
Assignment Position.
Q: Where can I find Transmit Admit Criteria
information?
A: The rules governing when to transmit or
not can be found in the Busy Channel
Lockout control.
Q: How can I print the Date and Time on
the Reports?
A: Follow the following steps:
Open
Internet Explorer.
Go to
File > Page Setup.
Set the
date and time either in the header, footer, or both.
Date
can be set using the "&d" option.
Time
can be set using the "&t" option.

### Group Call Alert (Decoder Definitions)

*Source: `(root)/Group_Call_Alert_(Decoder_Definitions).htm`*

Group Call Alert (Decoder Definitions)
Enables/disables the Group Call alert. The alert is a high continuous
tone equal in duration to the Individual
Call Volume Alert.
Notes
Available
when the radio is a Select 5 model.

### Group Call Volume Alert (Signaling)

*Source: `(root)/Group_Call_Volume_Alert_(Signaling).htm`*

Group Call Volume Alert (Signalling)
Sets the required alert minimum volume.
Choices
available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Group ID (DTMF)

*Source: `(root)/Group_ID_(DTMF).htm`*

Group ID (DTMF)
Selects the unique one to eight digit ID that identifies the radio as
belonging to a unique group while operating (receiving DTMF calls) on
the current DTMF
- Signaling
System.
When receiving a call, the Group ID allows the radio to identify the
incoming call as being addressed to it, as well as being addressed to
other radios in the Group. The Group ID is configured into the Call
List of the transmitting radio with the DTMF Call ID field. Valid
characters are 0 through 9, * and #.
Notes
This
feature is only available for radio models equipped with the option board
capability.

### Group Tone

*Source: `(root)/Group_Tone.htm`*

Group Tone
For each Signalling System, the tone used for group must be defined
as any one of the standard tones 0-9, A-F.
The default tone used for group is the A tone.
Notes
Available
when the radio is a Select 5 model.
The Group
Tone and Repeat Tone should be different.

### Group Type

*Source: `(root)/Group_Type.htm`*

Group Type
Two types of group calls are supported, Standard or Expanded per group
block.
Once the radio has received a group call the group Call
Reminder LED may be programmed. This LED indication starts after the
radio has selectively been called. The reminder indication is cancelled
if one of the radio buttons is pressed.
When the radio receives a group call it may give the group call alert.
This alert may be disabled or enabled.
Choices
Functionality
Standard:
For standard group call, a group position
will be a position(s) in the decode sequence at which the radio will accept
either the group tone or the individual tone. After detection of a valid
group tone, all subsequent tones of the sequence must also be group tones
for the sequence to be recognized as a call for the radio. I.e. Group
tones run consecutively in the sequence from the last tone towards the
first tone.
Note:
Consecutive group tones will be subject to auto �R� insertion.
Standard:
Radio ID is: 1 2 3 4 5.
Group digits: 1 2 3 G G.
Radio
will respond to:
12345 (Individual Call).
123GG (Group of up to 100 radios).
1234G (Sub-Group of 10 radios).
Expanded:
For expanded group call, a group position
will be a position at which the radio will accept either the group tone
or the individual tone. Group tones will not be accepted in positions
other than group positions. Group positions can be random throughout the
sequence.
Expanded:
Radio ID is: 1 2 3 4 5.
Group digits: 1 G 3 4 G.
Radio will
respond to:
12345 (Individual Call).
1G34G (Group of up to 100 radios).
1234G (Sub-Group of 10 radios).
Notes
Available
when the radio is a Select 5 model.

### Handset Audio

*Source: `(root)/Handset_Audio.htm`*

Handset Audio
When checked, the radio�s speaker will be muted if the handset is lifted
�Off hook�.
Notes
Available
when the radio is a Select 5 Mobile model.

### Hang Time

*Source: `(root)/Hang_Time_(Select_5).htm`*

Hang Time
Selects the amount of time that the radio waits on the scanned channel
- in Landed
Scan
mode, before returning to Active
Scan
mode. The timer begins once receive or transmit activity has ceased. While
the timer is counting down, if the radio transmits (PTT
is pressed), or the radio unmutes
its speaker to receive audio, the timer is reset, and the original conditions
again apply. Range is from 2 seconds to 63.75 seconds, in increments of
0.25 seconds.
Notes
Available
when the radio is a Select 5 model.

### Hook Type

*Source: `(root)/Hook_Type.htm`*

Hook Type
The purpose of the Hook feature is to allow the user to take manual
control of the radio when on channel, but not actively making or receiving
a call. Specifically, it takes the radio into auto-reset squelch mode
and overrides the auto-reset timer. Some relevant terms and definitions
are:
Off Hook - this describes the
radio�s state when the Hook feature is currently active.
On Hook - This describes the
radio�s state when the Hook feature is not currently active.
Microphone Hook Switch - this
is a physical switch, on the microphone, that is normally operated when
the microphone is removed from or restored to a stowage hook (hence the
name of the feature).
External Hook Input - this is
a GP I/O line that enables the radio to be taken off hook by an external
accessory.
There are 3 programmable Hook Types:
Choices
Functionality
None:
The Hook feature is completely inactive.
Timed:
The Auto
Reset Timer will be started when the radio goes Off Hook. (Used when
the microphone is left Off Hook, e.g. on the seat beside them.)
Permanent:
The Auto Reset Timer is disabled while the
radio is Off Hook.
Activating/Deactivating Hook
The Hook feature is
ignored when the radio is in either of the following modes:
Emergency
Stunned
On leaving these modes, the Hook feature operates as if the radio has
just been turned on.
Whether the Hook feature is active (microphone Off Hook), or inactive
(microphone On Hook), depends on the Microphone Hook Switch, External
Hook Input and the Auto Reset Timer.
If both the microphone hook switch and external hook input are 'On Hook',
then the radio is 'On Hook'.
If either the microphone hook switch and/or external hook input are
'Off Hook', then the radio will be 'Off Hook'.
The radio will go back 'On Hook' if:
Both the microphone hook switch and external
hook input go back 'On Hook'; or
The auto reset timer expires (timed hook
only); or
The monitor button is pressed.
Note: If the radio powers up
Off Hook, and the Hook Type is Timed, the Auto Reset Timer will not be
started.
Hook in Call
If the Auto Reset Timer is running when the radio goes On Hook, the
Auto Reset Timer is stopped.
If a call is in progress when the radio goes On Hook, the call is terminated.
If the terminated call was a Live Dial call, then Live Dial operating
mode is exited.
If a disconnect telegram has been programmed for call termination, then
the disconnect telegram will be sent.
If a call is in progress when the radio goes Off Hook, and the Hook
Type is Permanent, the call will continue until the radio goes back On
Hook.
If a call is in progress when the radio goes Off Hook, and the Hook
Type is Timed, the Auto Reset Timer is started.
Hook Squelch Modes
If the radio goes Off Hook while on a channel with Busy
Channel Lockout enabled, the squelch mode will be unaffected.
The squelch mode will revert to 'Monitor 1 Squelch Mode' if the radio
goes 'Off Hook'.
When the radio goes back 'On Hook', the squelch mode will be 'Rx Squelch
Mode�.
Other button presses are unaffected by the radio�s Hook state, and are
processed normally.
While the radio is Off Hook, the 'Force Monitor' feature is disabled.
Hook Scan Modes
If the radio goes off-hook during active scan, and hook is programmed
to 'Timed' or 'Permanent' then this will cause the radio to land. The
channel the radio lands on follows the same rules as for transmit during
active scan. If the radio goes off-hook during landed scan, this may or
may not cause the radio to change channel, depending on the "Scan
transmit Mode", and the Talk Back enable/disable option. It follows
the same rules for changing channel as transmit during landed scan.
If Talk Back is enabled, scan will be suspended until the radio goes
back 'Off Hook'.
Notes
Available
when the radio is a Select 5 Mobile model.

### ID (DTMF Call)

*Source: `(root)/ID_(DTMF_Call).htm`*

ID (DTMF Call)
Selects the one to eight digit ID to be transmitted for the current
DTMF
- Call
List Member.
The transmitted ID can target one or several receiving radios. This allows
DTMF transmissions to be made to a specific radio or groups of radios
without disturbing other radios operating on the same channel. Valid characters
are 0 through 9, * and #.
When a Call ID is transmitted with a call, it must be equal to the receiving
radio�s Primary ID or Group
ID for the call to be successful. Call
Alerts,
Call
Alerts w/ Voice
and Sel
Cal's
are possible.
Notes
Available
when the radio is a Display model.

### Importing Option Board Data

*Source: `(root)/Importing_Option_Board_Data.htm`*

Importing Option Board Data
Allows the CPS
user to import third party option board configuration data facilitating
variable Option Board functionality on individual Personalities.
Highlight Option Board in the tree view.
Click the Import
button.
Browse for the .obd file and click the Open
button.
Notes
This
feature is available only on radios that support an option board.

### Incoming Emergency Decode Alert

*Source: `(root)/Incoming_Emergency_Decode_Alert.htm`*

Incoming Emergency Decode Alert
(Expert Feature)
This alert indicates that an Emergency
Decode
is received, any further calls will not interrupt an Emergency call, either
during the call or while the call is waiting to be answered.
Available
choices are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Incoming Ring Tone Alert

*Source: `(root)/Incoming_Ring_Tone_Alert.htm`*

Incoming Ring Tone Alert
Indicates that there is an incoming call. The user will need to answer
the call before the Call
Answer Timer expires and the call clears.
Choices available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.
Available
when Decoder Type is set to 'ACK 1/Ringing'.

### Individual Call Volume Alert (Decoder Definition)

*Source: `(root)/Individual_Call_Volume_Alert_(Decoder_Definition).htm`*

Individual Call Volume Alert (Decoder Definition)
When enabled, this call alert is sounded on receipt of a decoded individual
call sequence.
Choices
Functionality
Disabled:
Individual:
This alert is 5 individual beeps over a
period of 1150 ms.
Ringing:
This alert uses the ringing type defined
in the General Settings window under Ring
Type Alert with the available options: General, English or French.
Priority:
This option enables the priority alert;
its tone sequence is High, Low, High.
Emergency:
This is a high loud escalating alert.
Notes
Available
when the radio is a Select 5 model.

### Individual Call Volume Alert (Signalling)

*Source: `(root)/Individual_Call_Volume_Alert_(Signalling).htm`*

Individual Call Volume Alert (Signalling)
Sets the required alert minimum volume.
Choices
available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Inhibit Channel Selection

*Source: `(root)/Inhibit_Channel_Selection.htm`*

Inhibit Channel Selection
(Expert Feature)
When checked, if a button is programmed for channel selection, selecting
this option prevents that from happening.
It may be that the channel is the emergency channel and can only be
selected from emergency mode.
On low tier radios, a channel can be inhibited from selection. On attempted
selection of an inhibited channel, the button/keypad error alert is sounded
for as long as the inhibited channel is selected.
On the high tier radios, scrolling channels on the display radios will
cause the inhibited channels to be skipped and the next non-inhibited
channel will be displayed for selection as appropriate.
Notes
Available
when the radio is a Select 5 model.

### Inhibit Companding On/Off

*Source: `(root)/Inhibit_Companding_On_Off.htm`*

Inhibit Companding On/Off
(Expert Feature)
When checked, if a button has been programmed for Companding
On/Off
it could override the Personality Companding
Mode option setting.
Enabling this option will prevent the Companding Mode option setting,
for this Personality, being overridden by a programmed button.
Notes
Available
when the radio is a Select 5 model.

### Inhibit Option Board On/Off

*Source: `(root)/Inhibit_Option_Board_On_Off.htm`*

Inhibit Option Board On/Off
(Expert Feature)
When checked, if a programmable button has been programmed for Option
Board On/Off
it could override the Personality Option
Board setting.
Enabling this option prevents the Option Board setting, for this Personality,
being overridden by a programmed button.
Notes
Available
when the radio is a Select 5 model that supports an option board.

### Inhibit Power Selection

*Source: `(root)/Inhibit_Power_Selection.htm`*

Inhibit Power Selection
(Expert Feature)
When checked, If a button is programmed for Channel
Power Toggle
it could override the Personality Tx Power Level
option setting.
Enabling this option will prevent the Tx Power Level option setting,
for this Personality, being overridden by a programmed button.
Notes
Available
when the radio is a Select 5 model.

### Inhibit Talkaround

*Source: `(root)/Inhibit_Talkaround.htm`*

Inhibit Talkaround
When checked, If a button is programmed for Repeater/Talkaround
On/Off
it could override the Personality Talkaround
option setting.
Enabling this option will prevent the Talkaround option setting, for
this Personality, being overridden by a programmed button.
The radio will sound an error tone if an attempt is made to operate
the Repeater Talkaround On/Off button on an inhibited channel.
Notes
Available
when the radio is a Select 5 model.

### Inhibit Whisper

*Source: `(root)/Inhibit_Whisper.htm`*

Inhibit Whisper
(Expert Feature)
When checked, if a button has been programmed for Whisper
On/Off
it could override the Personality Whisper setting.
Enabling this option will prevent the Whisper setting, for this Personality,
being overridden by a programmed button.
Notes
Available
when the radio is a Select 5 Portable model.

### Invalid Channel Marking

*Source: `(root)/Invalid_Channel_Marking.htm`*

Invalid Channel Marking
(Expert Feature)
This feature is used by the radio to �Mark� channels that have wrong
PL/DPL. The radio will not �Land On� a �Marked� channel. Channels can
become unmarked during the Vote process if carrier is no longer present
on a �Marked� channel.
�Marked� refers to the automatic nuisance channel delete/re-instate
feature of the radio when in �Fast Vote Scan�
Notes
Available
when the radio is a Select 5 model.
Available
when Vote Scan is enabled.

### Keypad

*Source: `(root)/Keypad.htm`*

Keypad
When checked, enables the Keypad Tones feature to be included in the
Tones menu. This allows the radio-user to toggle on or off the DTMF
audio tones heard when using the keypad.
Notes
Available
when the radio is a Display model.

### Keypad Acknowledge Alert

*Source: `(root)/Keypad_Acknowledge_Alert.htm`*

Keypad Acknowledge Alert
This is sounded for a valid key press of the keypad and menu navigation
keys.
Choices
available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 Display model.

### Language Set

*Source: `(root)/Language_Set.htm`*

Language Set
When checked, allows the Language Set sub menu to be displayed under
the Utility menu on the radio. This sub menu allows the user to select
the language for both the radio's menu and  prompt
messages.
Notes
Available
when the radio is a Conventional Display model.
Available when
the codeplug supports Russian and the version is equal to or higher than
8.00.

### Lights

*Source: `(root)/Lights.htm`*

Lights
When checked, enables the Lights feature to be included in the Utility
menu. This allows the radio-user the ability to disable a portable radio�s
keypad backlight and display.
Notes
Available
when the radio is a Portable Display model.

### Live Dial Hold Time

*Source: `(root)/Live_Dial_Hold_Time.htm`*

Live Dial Hold Time
(Expert Feature)
To prevent the transmitter from being keyed and dekeyed as the live
dial digits are sent, a transmit hang timer can be enabled. This timer
will continue to key the radio for a programmed time after a DTMF tone
has been sent.
Range is from 0 to 2550 ms, in increments of 10 ms.
Notes
Available
when the radio is a Select 5 Full Keypad model.
Available
when DTMF Dialling Mode is set to
'Live Dialling'.

### Live Dial Inter Digit Delay

*Source: `(root)/Live_Dial_Inter_Digit_Delay.htm`*

Live Dial Inter Digit Delay
(Expert Feature)
Specifies the delay between DTMF tones generated by pressing buttons
on the numeric keypad.
Range is from 0 to 1000 ms, in increments of 10 ms.
Notes
Available
when the radio is a Select 5 Full Keypad model.

### Live Dial Minimum / Maximum Digit Duration

*Source: `(root)/Live_Dial_Minimum__Maximum_Digit_Duration.htm`*

Live Dial Minimum / Maximum Digit Duration
(Expert Feature)
DTMF tones are transmitted for the duration of the key press unless:
The duration is less
than the minimum key press duration in which case the DTMF tones will
be transmitted for the minimum key press duration.
The duration exceeds
the maximum key press duration, in which case the DTMF tones are transmitted
for maximum key press duration.
Min Digit Duration range is from 0 to 2540
ms, in increments of 10 ms.
Max Digit Duration range is from 0 to 6375 ms, in increments of 25 ms.
Notes
Available
when the radio is a Select 5 Full Keypad model.
Available
when DTMF Dialling Mode is set to
'Live Dialling'.

### Live Dial Pretime

*Source: `(root)/Live_Dial_Pretime.htm`*

Live Dial Pretime
(Expert Feature)
Before the Live Dial tones are transmitted, unmodulated carrier will
be transmitted for the length of the pre-time.
The time set in this field is used in repeater operations to allow the
repeater to reach its operating power output before the radio sends its
encode sequences.
Range is from 0 to 2550 ms, in increments of 10 ms.
Notes
Available
when the radio is a Select 5 Full Keypad model.
Available
when DTMF Dialling Mode is set to
'Live Dialling'.

### Local/Base Station

*Source: `(root)/Local_Base_Station.htm`*

Local/Base Station
(Expert Feature)
When checked, the radios inter-modulation behavior will be improved
at the expense of sensitivity. This is required if the radio is used in
a Base Station/Local environment. Receiver gain is reduced in Base Station/Local
mode.
The ability to turn radio-wide functionality on and off can be assigned
to a radio-user (short or long) programmable button-press However, Local/Base
Station functionality only applies
for channels where this Personality feature has been enabled.
Notes
Available
when the radio is a Select 5 Mobile model.

### Lone Worker

*Source: `(root)/Lone_Worker.htm`*

Lone Worker
When Checked, enables Lone Worker for the current Personality.
Selecting this option invokes the �Lone Worker� timing options set in
Emergency features.
Lone Worker can also be selected by a radio-user (short or long programmable
button-press) or through the Lone Worker
menu selection.
Notes
Available
when the radio is a Select 5 model.
When the alert sounds the user must respond to
this alert, by pressing any button, within the time period set in the
Emergency Lone
Worker Reminder Time, otherwise the radio will go into Emergency
Mode.
Once a button is pressed the timer is reset.

### Lone Worker (Menu)

*Source: `(root)/Lone_Worker_menu.htm`*

Lone Worker (Menu)
When checked, enables Lone Worker to be
included in the Utilities menu. This allows the radio to enter emergency
mode if no radio button is pressed within a defined period of time after
the alert.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Long Press (Microphone) (Select 5)

*Source: `(root)/Long_Press_(Microphone_(Select_5).htm`*

Long Press (Select 5)
(Microphone)
Selects the functionality to be assigned to the Long-Press of a microphone.
Selections
Available When
Unassigned
Always available.
Monitor
2 / Call Cancel
Assigned to a Long Press.
Scan
Always available.
Power
Level
Always available.
Repeater/
Talkaround
Always available.
Memory
Channel 1
Always available. Available for Display models
only.
Memory
Channel 2
Always available. Available for Display models
only.
Store
Memory Channel 1
Assigned to a Long Press. Available for Display
models only.
Store
Memory Channel 2
Assigned to a Long Press. Available for Display
models only.
Option
Board
Always available. Available for Display models
only.
Call
1, 2, 3, or 4
Always available.
Call
Forward
Always available.
DTMF
Keypad
Always available. Available for Display models
only.
Nuisance
Delete
Always available.
Nuisance
Delete/Cancel Voice Message
Always available. Available for Display models
only.
XPAND
Always available.
Cancel
Voice Message
Always available. Available for Display models
only.
Voice
Storage Record
Assigned to a Long Press. Available for Display
models only.
Lone
Worker
Always available.
External
Alarm
Always available.
Emergency
This button's Short Press is unassigned.
Backlight
Always available. Available for Display models
only.
Local/Base
Station
Always available.
Missed
Calls
Always available. Available for Display models
only.
Contact
List
Always available. Available for Display models
only.
Contact
Multicall
Always available. Available for Display models
only.
Status
List
Always available. Available for Display models
only.
Status
Multicall
Always available. Available for Display models
only.
Channel
Always available. Available for Display models
only.

### Long Press (Microphone)

*Source: `(root)/Long_Press_(Microphone_NonNag).htm`*

Long Press
(Microphone)
Selects the functionality to be assigned to the Long-Press of a microphone.
Selections
Available
When
Unassigned
Always available.
Open
Squelch
This button's Short Press is set to Sticky
Permanent Monitor.
Nuisance
Delete
This button�s Short Press cannot be set to
Monitor
or Volume
Set.
Toggle High/Low
Power
Always available.
Toggle Local/Distance
Always available.
Toggle Repeater/
Talkaround
Always available.
Toggle Tight
/ Normal Squelch
Always available.
Toggle VOX
Operation
Always available.
Escalert
Always available. Available for Display models
only.
Store
Memory Channel 1
This button's Short Press is assigned to Revert
Memory Channel 1.
Available for Display models only.
Store
Memory Channel 2
This button's Short Press is assigned to Revert
Memory Channel 2.
Available for Display models only.
Radio
Call
Always available. Available for Display models
only.
Phone
Speed Dial
Always available. Available for Display models
only.
Phone
Mode
Always available. Available for Display models
only.
Scan
List Edit
Always available. Available for Display models
only.
External
Alarm
Always available. Available for Display models
only.
Toggle Option
Board On/Off
Always available. Available for Display models
only.

### Long Press (Mobile) (Select 5)

*Source: `(root)/Long_Press_(Mobile)_(Select_5).htm`*

Long Press (Select 5)
(Mobile)
Selects the functionality to be assigned to the Long-Press of a mobile
radio.
Selections
Available When
Unassigned
Always available.
Monitor
2 / Call Cancel
Assigned to a Long Press.
Scan
Always available.
Power
Level
Always available.
Repeater/
Talkaround
Always available.
Memory
Channel 1
Always available. Available for Display models
only.
Memory
Channel 2
Always available. Available for Display models
only.
Store
Memory Channel 1
Assigned to a Long Press. Available for Display
models only.
Store
Memory Channel 2
Assigned to a Long Press. Available for Display
models only.
Option
Board
Always available. Available for Display models
only.
Call
1, 2, 3, or 4
Always available.
Call
Forward
Always available.
DTMF
Keypad
Always available. Available for Display models
only.
Nuisance
Delete
Always available.
Nuisance
Delete/Cancel Voice Message
Always available. Available for Display models
only.
XPAND
Always available.
Cancel
Voice Message
Always available. Available for Display models
only.
Voice
Storage Record
Assigned to a Long Press. Available for Display
models only.
Lone
Worker
Always available.
External
Alarm
Always available.
Emergency
This button's Short Press is unassigned.
Backlight
Always available. Available for Display models
only.
Local/Base
Station
Always available.
Missed
Calls
Always available. Available for Display models
only.
Contact
List
Always available. Available for Display models
only.
Contact
Multicall
Always available. Available for Display models
only.
Status
List
Always available. Available for Display models
only.
Status
Multicall
Always available. Available for Display models
only.
Channel
Always available. Available for Display models
only.

### Long Press (Mobile)

*Source: `(root)/Long_Press_(Mobile_NonNag).htm`*

Long Press
(Mobile)
Selects the functionality to be assigned to the Long-Press of a mobile
radio.
Selections
Available
When
Unassigned
Always available.
Open
Squelch
This button's Short Press is set to Sticky
Permanent Monitor.
Volume
Set
Always available. Hold down this button for
Volume Set.
Nuisance
Delete
This button�s Short Press cannot be set to
Monitor
or Volume
Set
Toggle High/Low
Power
Always available.
Toggle Local/Distance
Always available.
Toggle Repeater/
Talkaround
Always available.
Toggle Tight
/ Normal Squelch
Always available.
Toggle VOX
Operation
Always available.
Escalert
Always available.
Store
Memory Channel 1
This button's Short Press is assigned to Revert
Memory Channel 1.
Available for Display models only.
Store
Memory Channel 2
This button's Short Press is assigned to Revert
Memory Channel 2.
Available for Display models only.
Radio
Call
Always available. Available for Display models
only.
Phone
Speed Dial
Always available. Available for Display models
only.
Phone
Mode
Always available. Available for Display models
only.
Scan
List Edit
Always available. Available for Display models
only.
Menu
Mode
Programmed on the P2 button. When in menu mode,
the P1 button automatically becomes the menu exit button. Available for
Display models only.
External
Alarm
Always available. Available for Display models
only.
Toggle Option
Board On/Off
Always available. Available for Display models
only.

### Long Press (Portable) (Select 5)

*Source: `(root)/Long_Press_(Portable)_(Select_5).htm`*

Long Press (Select 5)
(Portable)
Selects the functionality to be assigned to the Long-Press of a portable
radio.
Selections
Available When
Unassigned
Always available.
Monitor
2 / Call Cancel
Assigned to a Long Press.
Battery
Indicator
This buttons short press is unassigned.
Scan
Always available.
Power
Level
Always available.
Repeater/
Talkaround
Always available.
Whisper
Mode On/Off
Always available.
Memory
Channel 1
Always available. Available for Display models
only.
Memory
Channel 2
Always available. Available for Display models
only.
Store
Memory Channel 1
Assigned to a Long Press. Available for Display
models only.
Store
Memory Channel 2
Assigned to a Long Press. Available for Display
models only.
Option
Board
Always available.
Call
1, 2, 3, or 4
Always available.
Call
Forward
Always available.
DTMF
Keypad
Always available. Available for Full Keypad
models only.
Nuisance
Delete
Always available.
Nuisance
Delete/Cancel Voice Message
Always available. Available for Display models
only.
XPAND
Always available.
Cancel
Voice Message
Always available. Available for Display models
only.
Voice
Storage Record
Assigned to a Long Press. Available for Display
models only.
Emergency
This buttons Short Press is unassigned.
Lone
Worker
Always available.
Light
Always available. Available for Display models
only.
Keypad
Enable On/Off
Always available. Available for Full Keypad
models only.
Missed
Calls
Always available. Available for Display models
only.
Contact
List
Always available. Available for Display models
only.
Contact
Multicall
Always available. Available for Display models
only.
Status
List
Always available. Available for Display models
only.
Status
Multicall
Always available. Available for Display models
only.
Channel
Always available. Available for Display models
only.

### Long Press (Portable)

*Source: `(root)/Long_Press_(Portable)_EMEAConv.htm`*

Long Press
(Portable)
Selects the functionality to be assigned to the Long-Press of a portable
radio.
Selections
Available
When
Unassigned
Always available.
Sticky
Permanent Monitor
This button�s Short Press is set to Monitor.
Volume
Set
Always available. Hold down this button for
Volume Set.
Battery
Indicator
Always available. Hold down this button to
check the Battery Indicator.
Nuisance
Delete
This button�s Short Press cannot be set to
Monitor, Volume
Set,
or Battery
Indicator.
Toggle High/Low
Power
Always available. This feature is not available
for 2 W portable models.
Toggle Repeater/Talkaround
Always available.
Toggle Tight
/ Normal Squelch
Always available.
Toggle VOX
Operation
Always available.
Whisper
Mode
Always
available.
Escalert
Always available.
Store
Memory Channel 1
This button's Short Press is assigned to Revert
Memory Channel 1.
Available for Display models only.
Store
Memory Channel 2
This button's Short Press is assigned to Revert
Memory Channel 2.
Available for Display models only.
Radio
Call
Always available. Available for Display models
only.
Phone
Speed Dial
Always available. Available for Full-Keypad
Display models only.
Phone
Mode
Always available. Available for Display models
only.
Scan
List Edit
Always available. Available for Display models
only.
Menu
Mode
Programmed on the Front P2 button. When in
menu mode, the P1 button automatically becomes the menu exit button. Available
for Display models only.
Toggle Keypad
Lock On/Off
Assigned to a Long Press. Available for Display
models only.
Toggle Lights
On/Off
Always available. Available for Display models
only.
Toggle Option
Board On/Off
Always available.

### Long Tone Duration (Quik-Call II)

*Source: `(root)/Long_Tone_Duration_(Quik-Call_II).htm`*

Long Tone Duration (Quik-Call II)
(Expert Feature)
Selects the time amount used when transmitting (encode) a Quik-Call
II
(QCII) Long Tone, for the current QCII Signaling System. Time is in seconds.
Range is from 3 seconds to 33 seconds, in Increments of 3 seconds.
See Also
Call
Format

### Radio_Calls_GlossPop

*Source: `(root)/MDC radio_calls_glosspop.htm`*

MDC Radio Calls
Signaling System calls: Call Alerts and Sel Cal�s.

### Matching Encode Telegram

*Source: `(root)/Matching_Encode_Telegram.htm`*

Matching Encode Telegram
(Expert Feature)
This field, which is only used if the radio has been programmed as an
Advanced in the Multicall Advanced
User Mode, is used after successful decode to determine whether there
is a name for the caller in the Contact List, hence allowing the name
to be displayed.
It is also used to determine which telegram to use for Call
Back using the Authorisation
Request Button Function Address Send telegram trigger.
Notes
Available
when the radio is a Select 5 Display model.
The variable
digits of the decoder must be the same as the one of this telegram.

### Memory Channel 1 & 2

*Source: `(root)/Memory_Channel_1_&_2.htm`*

Memory Channel 1 & 2
Selects the Personality
that the radio engages (jumps to) when a programmable button-press is
set to �Revert Memory Channel 1� and/or "Revert Memory Channel 2".
Choices available are:
Available Personality
Notes
Available
when the radio is a Display model.

### Memory Channel 1 & 2 (Select 5)

*Source: `(root)/Memory_Channel_1_&_2_Select5.htm`*

Memory Channel 1 & 2 (Select 5)
Allows the user to program channels onto a maximum of two channel select
buttons. A displayed channel is programmed to a button by holding the
button at least 2 seconds.
Notes
Available
when the radio is a Select 5 Display model.

### Microphone Gain (Emergency)

*Source: `(root)/Microphone_Gain_(Emergency).htm`*

Microphone Gain (Emergency)
When checked, enables the Accessory Microphone Gain Offset and Microphone
Gain Offset.
Notes
Available
when the radio is a Select 5 model.

### Microphone Gain (Select 5)

*Source: `(root)/Microphone_Gain_(Select_5).htm`*

Microphone Gain (Select 5)
Selects the Gain for the Accessory Microphone headset. This adjusts
the sensitivity of the microphone.
The Accessory Microphone attaches into the microphone jack of the mobile
radio. The range is from 1.5 dB to 46.5 dB, in increments of 1.5 dB.
Notes
Available
when the radio is a Select 5 Mobile model.

### Minimum Keyup for Telegram Repeat

*Source: `(root)/Minimum_Keyup_for_Telegram_Repeat.htm`*

Minimum Keyup for Telegram Repeat
(Expert Feature)
Allows the user to define the minimum time interval between successive,
automatic, telegram transmissions by the radio. These transmissions will
coincide with the pressing of the PTT button.
The time before sending the first telegram after keyup is defined only
be the Periodic Repeat Time.
The range is from 0 to 255 seconds, in increments of 1 second.
Notes
Available
when the radio is a Select 5 model.
This time
must be less than the Periodic Repeat Time.

### Minimum Radio Volume

*Source: `(root)/Minimum_Radio_Volume.htm`*

Minimum Radio Volume
(Expert Feature)
This is minimum volume level which can be adjusted using the volume
control.
The level is programmable from 0 to 255, in increments of 10.
Notes
Available
when the radio is a Select 5 model.

### Missed Call List

*Source: `(root)/Missed_Call_List.htm`*

Missed Call List
Enables / Disables the Missed Call List per radio.
Available choices are:
Disabled
Don't stack call if list is full
Overwrite oldest entry in the list
This feature enables the caller�s ID, of unanswered calls, to be stored
in the radio for subsequent review by the user. An unanswered call is
one not answered before expiration of the Call
Answer Timer. The specific requirements are:
The
Missed Calls List is only available on radios with displays.
The Missed
Calls List is programmable per radio.
If the Call Answer Time is enabled, an incoming
call is placed in the Missed Calls List upon expiration of the Call Answer
Time.
If the Call Answer Time is disabled, an incoming call will be placed
in the Missed Calls List immediately.
Placing a call in the Missed Calls List consists of storing certain
information about the call.
Basic User - the stored information
is:
Calling
radio ID or name (if defined in Contact List).
Status (or
name as defined in Status list).
Advanced
User - the stored information is:
Calling
radio ID or name (if defined in Contact List).
Status (or
name as defined in Status List).
Telegram number.
For Both
Basic and Advanced Users:
if no
matching ID or name can be found in the Contact List, the ID digits are
displayed.
if no matching
Status name can be found in the Contact List, the Status digits are displayed.
The Missed Calls List can support up to 10
entries and if an unanswered call occurs while the Missed Calls List is
already full, the radio will proceed according to the Missed Call List
Mode setting. The possibilities are:
Discard the oldest
call entry in the Missed Calls List to make room for the new call; or
Do not put the new call in the Missed Calls List.
It is not possible to store more than one
call with the same radio ID in the Missed Calls List.
The Missed Calls feature is programmable as a �per radio� option and
the list can be accessed directly from a button programmed with this option,
or via the Missed Calls menu feature where
it is accessible from the top level of the menu hierarchy.
Through the Missed Calls menu feature, the user can either view or delete
each call in the Missed Calls List. Calls are displayed in the order of
most recent received.
The Missed Calls menu feature is allowed during scan.
Basic and Advanced Users:
The currently selected
Missed Call can be answered using any button programmed as Fixed Telegram.
See Select 5 Encode Call
1, 2, 3, 4. The radio will make the programmed call using the radio
ID stored for that entry.
Advanced Users:
The currently selected
Missed Call can be answered using any button programmed as Address Send.
See Select 5 Encode Call
1, 2, 3, 4. The radio will make the programmed call using the ID and
the telegram number stored in the Contact List for that ID entry.
At this stage, the hash button will serve as an Address Send button
if it has been so programmed.
Note: When the user attempts
to answer the missed call, the radio may now be on a different channel
from the one on which the call was received.
As soon as the radio starts to answer a missed call entry, it will exit
the Missed Calls menu feature and the entry will be deleted from the Missed
Calls List.
All Missed Calls List information is stored in a non-volatile area of
memory, allowing full recovery of stored data if the radio is powered
down.
If a user has enabled the Call Forward
feature, calls will be forwarded and not placed in the forwarding radio's
Missed Calls List.
Notes
Available
when the radio is a Select 5 model.
Missed
Calls menu feature must be
enabled.
If the
Missed Calls List is empty, the Missed Calls menu feature is not accessible
(even if it is enabled in the codeplug).

### Missed Calls

*Source: `(root)/Missed_Calls.htm`*

Missed Calls
When checked, enables the Missed Calls list as a radio-user Top Level
Menu feature. This allows the radio-user to go straight to the Missed
Calls list of the menu.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Monitor 1 Squelch Mode

*Source: `(root)/Monitor_1_Squelch_Mode.htm`*

Monitor 1 Squelch Mode
This is used to defeat the signaling requirements of the receive squelch
sode and if there are no decoders enabled on the channel, then this is
the squelch mode the radio will employ.
This defines how the monitor button function will work. If a function
button has been programmed as a monitor button, a user will have the ability
to override the normal squelch operation of the channel and to listen
to traffic on the channel if the received carrier complies with the criteria
selected with the monitor button.
A quick press of the monitor button enables monitor 1 squelch override
and a long press (greater than 2 seconds) will enable monitor 2 squelch
override. If enabled, an alert will be given for successful entry into
monitor 2 button operation.
In the auto-reset mode, �tapping� the monitor button will cause auto-reset
and put the radio into receive squelch mode of operation. A long press
will put the radio into monitor 2 mode and an alert will sound.
If a monitor mode had been selected prior to transmitting, the radio
will return to that selected monitor mode after the transmission.
Available Choices are:
Carrier Squelch
TPL/DPL Squelch
Notes
Available
when the radio is a Select 5 model.
TPL/DPL
Squelch can only be selected if the associated decoder is in use.

### Monitor Alert

*Source: `(root)/Monitor_Alert.htm`*

Monitor Alert
This alert is sounded while the PTT is pressed when Forced
Monitor is enabled.
Choices available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### More Information about Multicall Address and Multicall Status

*Source: `(root)/More_Information_about_Multicall_Address_and_Multicall_Status.htm`*

More Information about Multicall Address and Multicall Status
Multicall allows a calling radio unit to call other radios, either by
selecting the radio�s call number from the Contact List, or by entering
the call number of the required radio via the keypad (direct entry).
Multicall also allows a calling radio unit to pass status information
to other users. This status may either be selected from the Status List,
or may be entered directly from the keypad (Direct Entry).
From the default display the user can only use Direct Entry Multicall
if the default keypad mode is set to Address.
The only digits a user can enter into telegrams that have variable entry
digit positions are 0 - 9, * (star) or group.
For both Address and Status, the CPS user can specify up to 3 ranges
of allowed variable digits.
The address entered by the user is validated against the range(s) that
have the same number of digits.
For both Address and Status, group digits can be locked out from variable
positions by setting the corresponding bits of a Group Lockout mask.
For both Address and Status, the CPS user can program a digit that can
be locked out from:
All positions.
A specified variable digit position.
Validation against the allowed variable digits
is done on keypad entry.
Numbers in the Contact List/Status List, which are outside the ranges,
can be entered via the CPS.
If an attempt is made to transmit a telegram where not enough Variable
Digits have been entered, the transmission will fail and a button error
alert is sounded.
If an attempt is made to transmit a telegram that contains address digit
positions that have not been filled, then the transmission will fail and
a button error alert is sounded.
Note:
To prevent a user from entering an Address not in the Contact List or
a Status not in the Status List; Multicall
Address Keypad and Multicall
Status Keypad can be disabled via the CPS.
Variable Digits:
Variable digits will be substituted into any transmitted telegram containing
variable Radio B ID digits.
Direct Entry:
Direct Entry is also supported for Address and Status.
Advanced User Telegram Decode:
A decode telegram format may �match� the format of a corresponding telegram
which is used for name display or call back. This field identifies that
telegram number, and is used as follows:
On decode, the radio
attempts to find an entry in the contact list where the decoded ID digits
match the ID digits of an entry in the contact list (by identity, position
and number).  In
addition, the decoders Matching
Encode Telegram must match a Contact List entry telegram.
On decode, if call back is enabled, the current
contents of the address buffer get overwritten with both the variable
digit IDs and the decoders Matching Encode Telegram.
Basic User Telegram Decode:
For the Basic User, the Matching
Encode Telegram field is not used.
On decode, the radio attempts to find an entry in the Contact List where
the decoded ID digits match the ID digits of an entry in the contact list
(by identity, position and number).
On decode, if Call Back is enabled, the
current contents of the address buffer get overwritten with the variable
digit ids.
For Select 5 decode, the decode telegram field should only match encode
telegrams that have the DTMF live dial.
Advanced or Basic User is defined with the option Multicall
Advanced User Mode.
Variable Digit Entry:
For each designated variable position, the following digits may be entered:
0-9, or * for group.
The user will not be able to enter encode single tones 1 and 2 or digits
A-F or Repeat.
For both Address and Status, the CPS user can specify up to 3 ranges
of allowed variable digits. Entered variable digits that fall outside
specified ranges are considered invalid entries. For each range the minimum
and maximum must have the same number of digits.  The
range selected for validation matches the number of variable digits for
the selected telegram.
The address entered by the user will be validated against range(s) that
have the same number of digits.
For both Address and Status, group digits can be lockout from variable
positions by setting the corresponding bits of a Group Lockout mask.
For both Address and Status, the CPS user can program a digit that can
be locked out from all positions.
For both Address and Status, the CPS user can program a digit to lockout
from a specified variable digit position.
Validation against the allowed variable digits gets done on keypad entry.
The CPS is allowed to enter numbers in the Contact List/Status List
that are outside the ranges.
If an attempt is made to transmit a telegram when there are not enough
Variable Digits entered, transmission will fail and the button/keypad
error alert is sounded.
If an attempt is made to transmit a telegram where the telegram contains
address digit positions that have not been entered, transmission will
fail and the button/keypad error alert is sounded.
Base Encode Sequences:
Base encode sequences will not be supported. If variable digits have
not been selected from the Address/Status list or entered by direct entry
then attempts to transmit a Multicall telegram will fail and the button/keypad
error alert is sounded.
Notes
Available
when the radio is a Select 5 Display model.

### Multicall Address General Lockout Digit

*Source: `(root)/Multicall_Address_General_Lockout_Digit.htm`*

Multicall Address General Lockout Digit
Allows digits to be specified that are barred from use in any position
in telegrams that have variable digit positions.
Notes
Available
when the radio is a Select 5 Display model.
Available
when Multicall Address Keypad
is enabled.

### Multicall Address Keypad

*Source: `(root)/Multicall_Address_Keypad.htm`*

Multicall Address Keypad
When checked, enables the keypad and allows digit entry into telegrams
with variable digit positions.
When unchecked, a radio user can only select an address from the Contact
List.
Notes
Available
when the radio is a Select 5 Display model.

### Multicall Address Position Lockout Digit

*Source: `(root)/Multicall_Address_Position_Lockout_Digit.htm`*

Multicall Address Position Lockout Digit
Specifies a digit that  will
be barred from use in positions specified by Position
for Position Lockout Digit in telegrams that have variable digit positions.
Notes
Available
when the radio is a Select 5 Display model.
Available
when Multicall Address Keypad
is enabled.

### Multicall Address Position for Group Lockout Digit

*Source: `(root)/Multicall_Address_Position_for_Group_Lockout_Digit.htm`*

Multicall Address Position for Group Lockout Digit
(Expert Feature)
This feature specifies the position(s), in variable digit telegrams,
where Group Digits cannot be placed.
Notes
Available
when the radio is a Select 5 Display model.
Available
when Multicall Address Keypad
is enabled.

### Multicall Address Position for Position Lockout Digit

*Source: `(root)/Multicall_Address_Position_for_Position_Lockout_Digit.htm`*

Multicall Address Position for Position Lockout Digit
(Expert Feature)
Specifies the position, in variable digit telegrams, where Position
Lockout Digits cannot be placed.
Notes
Available
when the radio is a Select 5 Display model.
Available
when Multicall Address Keypad
is enabled.

### Multicall Address Range 1-3

*Source: `(root)/Multicall_Address_Range_1-3.htm`*

Multicall Address Range 1-3
This feature is used to define the number entry range within the variable
digit telegrams.
Example:
Sequence = 54(A1A2A3), Address Range 1 = 800 to 999. This means for
the variable digits used in Sequence, only numbers between 800 and 999
are allowed.
Notes
Available
when the radio is a Select 5 Display model.
Available
when Multicall Address Keypad
is enabled.
Minimum
and Maximum must have the same number of digits.

### Multicall Advanced User Mode

*Source: `(root)/Multicall_Advanced_User_Mode.htm`*

Basic Multicall User enters
only variable digits into a �Fixed� telegram. A Fixed Telegram button
can be assigned to any of the following buttons, Call 1, Call 2, Call
3, Call 4, PTT, or the # (Hash) button.
It is only possible to
use a Fixed Telegram button to transmit the telegram. The Variable Digit
positions of this CPS programmed telegram, must be substituted for the
correct number of digits by the user, before transmission.
The user must enter the
called radios ID, then select the Fixed telegram. The radio will substitute
the user-entered digits into the telegram and then send it.
Also
the user is able to scroll the Contact List, via the menu, and select
an entry. Pressing the Fixed Telegram button will cause the radio to substitute
the Contact list entry into the 'Fixed' telegram, then transmit it.
Note:
For Basic Multicall Direct Entry the user can only:
1. Enter variable digits that are entered by the radio into the fixed call
telegram.
2. Use a Fixed Telegram button to transmit the telegram
On decode of a received
telegram sequence, the radio will attempt to find an entry in the Contact
List where the decoded ID digits match the ID digits of an entry in the
Contact List. If no match is found then the radio will display the text
"Call Received".
If Call
Back is enabled, the current contents of the variable digits in the
address buffer will be overwritten with the digits from the corresponding
positions of the received telegram.
Live Dial. The user must
first send the set up call sequence for telephone interconnect by using
a call button that has the appropriate telegram attached, then wait for
the dial tone/prompt before entering the digits. Pressing a keypad button
will cause the corresponding DTMF tone to be transmitted. Press and hold
the PTT button and as each digit is entered, the tone is sent. On completion
of the call, the clear down sequence is sent to reset the system if required.
Note:
DTMF Dialling Mode must be set to
'Live Dialing'.
The user must enter the required digits
then select the Fixed Telegram Button. This telegram is set up via the
CPS for its number of variable digits and can be assigned to any of the
following buttons, Call1, Call2, Call3, Call4, or PTT. The radio will
substitute the user-entered digits into the telegram and then send it.
In this operating mode,
the telegram entry field in the Contact List is active.
See Radio Contact List.
The telegram entry in the
Contact List can be scrolled for up to 32 telegrams and this allows the
advanced user more choice of selectable telegrams (as well as the Fixed
call telegrams associated with the Call Buttons)
However if a Fixed Telegram
button is pressed before transmission, then the entered telegram is ignored
and the digits from its corresponding positions will be substituted into
the Variable Digit positions of the Fixed telegram, assigned to that button,
and then transmitted.
Example:
Telegram number entered
= 1  i.e.
45(A1)(A2)(A3)
ID = 123
Final telegram = 45123.
(Press PTT or Address Send button to send the telegram.)
Pressing a Fixed call button
may result in the following telegram being sent instead:
78123.  Where
the telegram has now changed from 1 to 3 (where 3 = 78(A1)(A2)(A3)) and
if the telegram IDs are used to define places, it may well mean that the
calling radios position has been given as Gatwick instead of Heathrow.
The advanced user is also
able to scroll the Contact List, select an entry and press the Address
Send buttons to transmit the associated telegram for that entry.
On selecting the Contact
List option, a contact name will be displayed. The Contact List may be
scrolled through by pressing the up/down button. A short press of P1 will
display the digits associated with each contact name. A long press of
P1 will display the word selected and then return to the list option.
On selecting contact multicall,
a telegram number will be displayed, a short press of P1 will display
the telegram digits with the leftmost digit blinking this can be edited
by the up/down button. A short press of P1 will move to the next digit
to the right which will blink and may be edited if required. A long press
of P1 will display the word selected and then return to the multicall
option.
The telegrams are set up
via the CPS. They can be set up for the required number of variable digits
and can be assigned to any of the following buttons, Call1, Call2, Call3,
Call4, PTT, or the # (Hash) button, in which case they are referred to
as Fixed telegrams.
Note:
For Advanced Multicall
Direct Entry the user:
1. Must type in the telegram number (1
- 9) followed by the variable digits.
2. Can use either the Address Send button
or a Fixed Telegram button to transmit.
3. If the Fixed Telegram button is used
the variable digits are substituted into the fixed telegram then sent.
A decode telegram format
may �match� the format of a corresponding telegram which is used for alias
display or call back, it identifies that telegram number, and is used
as follows:
a) On decode, the radio attempts to
find an entry in the contact list where the decoded ID digits match the
ID digits of an entry in the contact list (by identity, position and number).
In addition, the decoders Matching Encode Telegram must also match the
Contact List entry telegram.
Example:
4123. Successfully checked
against the Contact List may cause the following to be displayed:
�John - Gatwick� where
123 = John, the callers identity and 44 = his location (Gatwick)
If there is no name, the
telegram number and ID will be displayed.
b) On decode, if call back is enabled,
the current contents of the address buffer will be overwritten with both
the variable digit ids and the decoders Matching Encode Telegram.
Live
Dial. The user must first send the telephone interconnect call
set up sequence, which is programmed to one of the call buttons. The keypad
is then in DTMF mode: as each digit (0-9, *, ~) is pressed, the tone is
sent out. The PTT does not need to be pressed whilst the DTMF tones are
sent out.
On completion of the call,
the clear down sequence is sent to reset the system if required.
Call set up and clear down
telegrams/sequences may be assigned to buttons.
To use live dial from the
address keypad, the user has to type in a telegram number that has Live
Dial enabled. After sending the telegram the user must wait for the dial
tone/prompt before entering the required digits.
A DTMF sequence may be
selected from the Contact List and sent using the Address Send Button.
On selecting the Contact List option, the last person contacted will be
displayed and this could be from the Contact List, Call
Back or Direct Entry.
Assume the # (Hash) button
is pressed, the telegram will be sent. When the prompt /dial tone is heard,
the user enters the digits.  As each digit is entered, the tone is
sent.
On completion of the call
the clear down telegram may be sent to reset the system. Dependent upon
the system, Clear Down telegrams may not be required.
Telegrams can be set up
in several different ways with variable digits in different places.
Example:
1. A status telegram can include an address
and have variable digits for the status number.
2. It may have variable digits for both
the address and status number.
3. It may just have variable digits for
the address.
4. It may be a complete telegram with no
variable digits.
Live dial is achieved by
selecting address mode and entering a telegram number. The user is then
prompted to enter the variable digits and the telegram is sent using the
Address Send button.
A programmed Status button
can be used for direct entry into the menu�s Status List, or the user
may enter the menu in the normal way. Once the Status List is entered
the last person contacted will be displayed and this could be from the
Contact List, Call Back or Direct Entry.
A selected entry from the
Status List may be sent (if it does not require direct entry of digits)
by pressing the Address Send button.
Multicall Advanced User Mode
When checked, the user mode is 'Advanced'. When unchecked the user mode
is 'Basic'.  The
radio�s Contact List does not support a telegram entry for the �Basic
User�.
Choices
Functionality
Basic User:
Basic
User Select 5 Calls:
Basic User Telegram Decode:
Basic User DTMF Calls:
Basic User Status Calls:
Advanced User:
Advanced User Select 5 Calls:
Advanced User Telegram Decode.
Advanced User DTMF Telegrams:
Advanced User Status:
Notes
Available
when the radio is a Select 5 Display model.

### Multicall Status General Lockout Digit

*Source: `(root)/Multicall_Status_General_Lockout_Digit.htm`*

Multicall Status General Lockout Digit
Allows digits to be specified that are barred from use in any position
in telegrams that have variable digit positions.
Notes
Available
when the radio is a Select 5 Display model.
Available
when Multicall Status Keypad
is enabled.

### Multicall Status Keypad

*Source: `(root)/Multicall_Status_Keypad.htm`*

Multicall Status Keypad
When checked, enables the keypad and allows digit entry into telegrams
with variable digit positions.
When unchecked, a radio user can only select an address from the Status
List.
Notes
Available
when the radio is a Select 5 Display model.

### Multicall Status Position Lockout Digit

*Source: `(root)/Multicall_Status_Position_Lockout_Digit.htm`*

Multicall Status Position Lockout Digit
Defines digits that will be barred from use in specified positions in
telegrams that have variable digit positions.
Notes
Available
when the radio is a Select 5 Display model.
Available
when Multicall Status Keypad
is enabled.

### Multicall Status Position for Group Lockout Digit

*Source: `(root)/Multicall_Status_Position_for_Group_Lockout_Digit.htm`*

Multicall Status Position for Group Lockout Digit
(Expert Feature)
This feature specifies the position(s), in variable digit telegrams,
where Group Digits cannot be placed.
Notes
Available
when the radio is a Select 5 Display model.
Available
when Multicall Status Keypad
is enabled.

### Multicall Status Position for Position Lockout Digit

*Source: `(root)/Multicall_Status_Position_for_Position_Lockout_Digit.htm`*

Multicall Status Position for Position Lockout Digit
(Expert Feature)
This feature specifies the position, in variable digit telegrams, where
Position Lockout
Digits cannot be placed.
Notes
Available
when the radio is a Select 5 Display model.
Available
when Multicall Status Keypad
is enabled.

### Multicall Status Range 1-3

*Source: `(root)/Multicall_Status_Range_1-3.htm`*

Multicall Status Range 1-3
This feature is used to define the number entry range within the variable
digit telegrams.
Example:
To limit dialling capabilities to own group on a PABX. Sequence 42(S1S2)
Status Range 1 = 10 to 99. This means for the variable digits used in
Sequence, only numbers between 10 and 99 are allowed.
Notes
Available
when the radio is a Select 5 Display model.
Available
when Multicall Status Keypad
is enabled.
Minimum
and Maximum must have the same number of digits.

### Multiple Selection (Select 5)

*Source: `(root)/Multiple_Selection_(Select_5).htm`*

Multiple Selection (Select 5)
Multiple Signaling Systems, Sequences, Telegrams, Definitions, Auto
Acknowledges, and Personalities can be configured at the same time with
the same configurations.
For example, to configure the same Channel Bandwidth for multiple Personalities,
refer to the following steps.
Click the first Personality in the tree view.
Hold the <Shift> key down and click the
last Personality to select all the Personalities.
Or, hold the <Ctrl> key to select any combination of Personalities.
Or, hold the <Shift> key down while pressing the Up/Down arrow
keys to select Personalities one at a time.
Select the Channel Bandwidth, which will be configured
for all the selected Personalities.

### Mute Access/Deaccess Tone

*Source: `(root)/Mute_Access_Deaccess_Tone.htm`*

Mute Access/Deaccess Tone
Causes the DTMF
tones for Access
and Deaccess
codes to be muted
- when the Access/Deaccess Type field is set to Delayed
or Immediate Auto. However, DTMF tones are not muted when the Access/Deaccess
Type is set to Manual. This feature applies while in Phone
Mode
for the current Phone
System.
Notes
Available
when the radio is a Display model.

### Name (Contact List)

*Source: `(root)/Name_(Contact_List).htm`*

Name (Contact List)
Each entry within the Contact List can have a name of up to 8 alphanumeric
characters.
When looking for an address in the Contact List, it is quicker to scroll
the names.
Notes
Available
when the radio is a Select 5 Display model.

### Name (Decoder Status List)

*Source: `(root)/Name_(Decoder_Status_List).htm`*

Name (Decoder Status List)
An name entry in the Status List can be up to 8 characters of alphanumeric
text.
When a telegram is decoded, the ID of the calling radio is entered into
the variable digit positions of the telegram in the �Address� buffer and
the status digits are checked with the Decode Status List for name match.
If a match is found, then the name will be displayed; if not, the received
status digits are displayed.
Notes
Available
when the radio is a Select 5 Display model.

### Name (Encoder Status List)

*Source: `(root)/Name_(Encoder_Status_List).htm`*

Name (Encoder Status List)
Name entries in the Encoder Status List will enable the user to find
an address more quickly. The name can be up to 8 alphanumeric characters
long.
Notes
Available
when the radio is a Select 5 Display model.

### Nuisance Delete (Select 5)

*Source: `(root)/Nuisance_Delete_(Select_5).htm`*

Nuisance Delete (Select 5)
When a Scan
List
Member continually generates unwanted noise, this allows the radio-user
to temporarily remove the channel
from the current Active
Scan.
This feature applies for the current Scan
List.
This is accomplished by the radio-user with a long-press or short-press
button while in Landed
Scan Mode,
and while landed on the member to be removed.
Notes
Switching
to a another channel on the radio�s Channel Selector, or turning the radio
off and then back on, effectively brings that temporarily removed Scan
List member channel back to an actively scanned status.
Nuisance Delete is NOT possible:
For
a Priority #1 Scan List Member
channel.
If the current
Scan List does not contain at least two members before a Nuisance Delete
occurs.

### Nuisance Reset

*Source: `(root)/Nuisance_Reset.htm`*

Nuisance Reset
(Expert Feature)
When checked, nuisance deleted channels are re-instated when the radio
power is cycled. When unchecked, nuisance deleted channels are re-instated
upon entering Scan.
Notes
Available
when the radio is a Select 5 model.
Available
when Vote Scan is disabled.

### Numeric Keypad

*Source: `(root)/Numeric_Keypad.htm`*

Numeric Keypad
The following default keypad modes can be programmed:
Choices
Functionality
Disabled:
Address:
Allows direct entry of Address digits when
the radio is in the idle state and is showing the default display.
Status:
Allows direct entry of Status digits when
the radio is in the idle state and is showing the default display.
Channel:
Allows channel selection by entering the
channel number via the keypad and using the #  button
to enter the selection. This can only be done when the radio is in the
idle condition.
Notes
Available
when the radio is a Select 5 model.
'Address'
is available when Multicall Address
Keypad is enabled.
'Status'
is available when Multicall Status
Keypad is enabled.

### Opening Files

*Source: `(root)/Opening_Files_(Select5).htm`*

Opening Files
From the File
menu choose Open.
Browse for the file and click the Open
button.

### Option Board

*Source: `(root)/Option_Board.htm`*

Option Board
(Expert Feature)
When checked, enables Option Board functionality to be active for the
current Conventional
Personality.
The ability to turn radio-wide option board functionality on and off
can be assigned to a radio-user (short or long) programmable button-press
or through the Option Board
menu selection. However, option board functionality only
applies for channels where this Conventional Personality Option Board
feature has been enabled.
Notes
This
feature is available only on radios that support an option board.
Available
when the Option Board Type is not
set to None.

### Option Board (Menu) (Select 5)

*Source: `(root)/Option_Board_(Menu)_(Select_5).htm`*

Option Board (Menu) (Select 5)
When checked, enables the Option
Board feature to be included in the Utilities menu. This allows the
radio-user the ability to toggle on and off radio-wide Option Board functionality.
Radio-wide functionality applies to Conventional
Personalities
that have Option Board functionality enabled.
Radio-wide Option Board functionality can also be assigned to a (short
or long) programmable button-press.
Notes
Available
when the radio is a Select 5 Display model.
Available
when Option Board Type
is not set to None.

### Option Board (Select 5)

*Source: `(root)/Option_Board_(Select_5).htm`*

Option Board (Select 5)
(Expert Feature)
When checked, enables Option Board functionality to be active for the
current Personality.
The ability to turn radio-wide option board functionality on and off
can be assigned to a radio-user (short or long) programmable button-press
or through the Option Board
menu selection. However, option board functionality only
applies for channels where this Conventional Personality Option Board
feature has been enabled.
Notes
This
feature is available only on Select 5 models that support an option board.
Available
when the Option Board Type is not
set to 'No Option Board'.

### Option Board Configuration Index

*Source: `(root)/Option_Board_Configuration_Index.htm`*

Option Board Configuration Index
(Expert Feature)
Selects the desired �Advanced� only option board functionality for the
current Conventional
Personality.
Advanced option board types allow for unique settings on a per Personality
basis. Option board functionality selections are based on the �Imported� third party option board configuration data that
applies for the selected Option Board Type.
This selected option board functionality is then automatically downloaded
and initiated when the radio-user selects the current channel.
Range is from 0 to 255, in increments of 1.
Notes
This
feature is available only on radios that support an option board.
Available
when Option Board is checked.
Available
when Option
Board Configuration Download is checked.
Available
when Option Board Type
is set to Advanced Option Interface.

### Option Board Configuration Index (Select 5)

*Source: `(root)/Option_Board_Configuration_Index_(Select_5).htm`*

Option Board Configuration Index (Select 5)
(Expert Feature)
Selects the desired �Advanced� only option board functionality for the
current Personality.
Advanced option board types allow for unique settings on a per Personality
basis. Option board functionality selections are based on the �Imported� third party option board configuration data that
applies for the selected Option Board Type.
Range is from 0 to 255, in increments of 1.
Notes
This
feature is available only on Select 5 Models that support an option board.
Available
when Option Board is checked.
Available
when Option Board Type
is set to Advanced Option Interface.

### Option Board Type (Select 5)

*Source: `(root)/Option_Board_Type_(Select_5).htm`*

Option Board Type (Select 5)
Selects the type of option board that has been installed in the current
radio. This prompts the radio to expect certain new functionality.
Choices
Functionality
None:
Transcypt:
Scrambler Plug:
A Motorola proprietary encryption board.
Voice Storage:
Up to 120 seconds of voice storage is available
with this option board.
This feature allows the user to manually
record an incoming call by pressing and holding the voice storage record
button when the radio is unmuted. To finish recording, release the button.
An alert is sounded when the button is first pressed and further alerts
are sounded before the radio is forced to stop recording due to all slots
being full and the recording is using the last storage slot. On hearing
these alerts the user should release the record button.
The voice storage feature allows the user
to record a memo by pressing the record button, waiting for the alert
to sound and then speaking into the mic, when the radio is muted. If the
storage is full, the radio will give an alert, stop recording and the
user should release the record button.
Playback is only possible when the radio
is muted. A short press of the playback button initiates playback. A message
will be played until it is played back or the button is again pressed
and released, in which case the next message is played back.
Pressing the cancel button during playback
will erase the message. An erased message is not replaced by messages
within the stack, i.e. messages within the stack do not move upwards within
the stack to replace erased messages allowing all free space to be at
the bottom of the stack.
Simple:
Supports simple option board commands.
Advanced:
Supports advanced option board commands.
Notes
Available
when the radio is a Select 5 model that supports an option board.
Voice
Storage must be defined.

### Option Board (Menu)

*Source: `(root)/Option_Board_menuNonNag.htm`*

Option Board (Menu)
When checked, enables the Option Board
feature to be included in the Utility menu. This allows the radio-user
the ability to toggle on and off radio-wide Option Board functionality.
Radio-wide functionality applies to Conventional
Personalities
that have Option Board functionality enabled.
Radio-wide Option Board functionality can also be assigned to a (short
or long) programmable button-press.
Notes
Available
when the radio is a Display model.
Available
when Option Board Type
is not set to None.

### Outgoing Ring Tone Alert

*Source: `(root)/Outgoing_Ring_Tone_Alert.htm`*

Outgoing Ring Tone Alert
Indicates, if acknowledge is expected that the call is being connected.
The alert stops when a connection to the called radio has been established.
Choices
available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.
Available
when Acknowledg Expected is set
to 'ACK 1 with Answer'.

### Override Busy Channel Lockout

*Source: `(root)/Override_Busy_Channel_Lockout.htm`*

Override Busy Channel Lockout
(Expert Feature)
When checked, causes the radio to override the Busy
Channel Lockout Rule,
while operating in Phone
Mode,
and for the current Phone
System.
Notes
Available
when the radio is a Display model.

### PL Override

*Source: `(root)/PL_Override.htm`*

PL Override
(Expert Feature)
When checked, overrides the PL/DLP squelch when Auto
Reset Mode is active. This option also affects the PL/DPL Detect GP
I/O feature.
Notes
Available
when the radio is a Select 5 model.
Auto-Reset
Mode PL/DPL Squelch must be in use.

### PL Required

*Source: `(root)/PL_Required.htm`*

PL Required
(Expert Feature)
When checked, causes a Private
Line
(PL) code match to be required on a incoming phone call - while in the
Phone
Mode,
in order for communication to occur. This only applies when the current
Phone
System
is assigned to a Conventional
Personality
that requires Receive
PL.
Notes
Available
when the radio is a Display model.

### PTT Dekey Encode

*Source: `(root)/PTT_Dekey_Encode.htm`*

PTT Dekey Encode
Enables a defined telegram being sent on radio PTT dekey.
Notes
Available
when the radio is a Select 5 model.

### PTT ID Type (DTMF)

*Source: `(root)/PTT_ID_Type_(DTMF).htm`*

PTT ID Type (DTMF)
Selects when the PTT
ID
is sent during a Normal
Dispatch
transmission for the current DTMF
- Signaling
System.
Choices
Functionality
None:
Does not set previous, after, or both.
Pre Only:
Sent previous to a Normal Dispatch transmission.
Post Only:
Sent after a Normal Dispatch transmission.
Pre and Post:
Sent both prior to and after a Normal Dispatch
transmission.
Notes
This
feature is only available for radio models equipped with the option board
capability.
Available when
the radio model is capable of transmitting PTT ID.

### PTT Keyup Encode

*Source: `(root)/PTT_Keyup_Encode.htm`*

PTT Keyup Encode
Selects what is transmitted when the PTT is pressed. It can either be
a fixed telegram or an address.
Selecting the fixed telegram option will enable the Telegram drop down
combo box to enable a selection of the required telegram.
If the 'Address' option is selected, the telegram drop down combo box
is disabled and the current address is sent. The current address may be
a variable digit address, from the address book or that assigned to a
pre-programmed call button.
Notes
Available
when the radio is a Select 5 model.
'Address'
is only available if Multicall
Advanced User Mode is enabled.

### PTT Keyup Mode

*Source: `(root)/PTT_Keyup_Mode.htm`*

PTT Keyup Mode
Defines when, if at all, a telegram will be sent when the PTT is pressed.
Choices
Functionality
Disabled:
If disable no telegram will be sent when
the PTT is pressed.
Every PTT:
If this option is selected, then a defined
telegram is sent every time the PTT button is pressed.
Once Only:
A telegram will be sent on the first activation
of the PTT button when a call is instigated. This is dependent on the
radio not being in Auto Reset Mode,
or if it is in auto-reset mode, that a call has not yet been started (this
caters for the situation whereby auto-reset mode is entered via the Forced Monitor feature). The intention
is to allow telegrams to be sent by the radio starting the call and not
by the radio responding to a call.
Periodic:
Enabling this feature results in the defined
repeat telegram being sent at intervals while the radio is transmitting.
A Telegram Repeat Timer will be maintained
by the radio and is started whenever a telegram is sent, it can be set
from 0 to 255 seconds.
On pressing the PTT, the
telegram will be sent if either:
1) The Telegram Repeat Timer is not running
(because it is not enabled or it has expired)
2) The remaining time before the Telegram
Repeat Timer is due to expire is less than the specified Minimum Telegram
Repeat Threshold, in which case the outstanding time will be cancelled
and the timer reset. The Minimum telegram repeat timer can be set from
0 to 255 seconds.
The telegram will also be sent if the PTT
is active when the timer expires.
Notes
Available
when the radio is a Select 5 model.

### PTT Sidetone (DTMF)

*Source: `(root)/PTT_Sidetone_(DTMF).htm`*

PTT Sidetone (DTMF)
(Expert Feature)
Selects the type of PTT Sidetone used after the PTT
button is pressed, and immediately following the Signaling
System
data packet being transmitted. The purpose is to indicate to the radio-user
when voice may be initiated. This feature applies for the current DTMF
Signaling System.
Choices
Functionality
None:
Long:
When enabled, causes the radio to sound
a continuous alert tone, from the time the PTT button is pressed, until
the time that the Signaling System data packet is transmitted.
Short:
When enabled, causes the radio to sound
one short alert tone, after the PTT button is pressed, and immediately
following the Signaling System data packet being transmitted.
Notes
This
feature is only available for radio models equipped with the option board
capability.
Available
when PTT ID Type is not
set to None or Post Only.

### PTT Sidetone (MDC)

*Source: `(root)/PTT_Sidetone_(MDC).htm`*

PTT Sidetone (MDC)
(Expert Feature)
Selects the type of PTT Sidetone used after the PTT
button is pressed, and immediately following the Signaling
System
data packet being transmitted. The purpose is to indicate to the radio-user
when voice may be initiated. This feature applies for the current MDC
Signaling System.
Choices
Functionality
None:
Long:
When enabled, causes the radio to sound
a continuous alert tone, from the time the PTT button is pressed, until
the time that the Signaling System data packet is transmitted.
Short:
When enabled, causes the radio to sound
one short alert tone, after the PTT button is pressed, and immediately
following the Signaling System data packet being transmitted.
Notes
Available when
MDC PTT ID Type
is not set to None or Post Only.

### PTT Sidetone (Phone)

*Source: `(root)/PTT_Sidetone_(Phone).htm`*

PTT Sidetone (Phone)
Selects the one short alert tone after the PTT
button is pressed.
Choices
Functionality
None:
Long:
Causes the radio to sound DTMF
digits as they are sent. The purpose is to indicate to the radio-user
when the next process may be started. This feature applies while in Phone
Mode
for the current Phone
System.
This applies to Speed Dialed
phone numbers, or phone numbers selected from the Phone
List,
or manually dialed numbers when the Dial Type field is set
to Buffered.
This also applies to Access
and Deaccess
codes when the Access/Deaccess Type field is set to Delayed
or Immediate Auto. However, Access/Deacess DTMF tones codes can be muted.
Short:
Causes the radio to sound one short alert
tone, after the PTT button is pressed, and immediately following the phone
data packet being transmitted. The purpose is to indicate to the radio-user
when voice may be initiated. This feature applies while in Phone
Mode
for the current Phone
System.
Notes
Available
when the radio is a Display model.

### PTT Sidetone (QCII System)

*Source: `(root)/PTT_Sidetone_(QCII_System).htm`*

PTT Sidetone (QCII System)
(Expert Feature)
Selects the type of PTT Sidetone used after the PTT
button is pressed, and immediately following the Signaling
System
data packet being transmitted. The purpose is to indicate to the radio-user
when voice may be initiated. This feature applies for the current QCII
Signaling System.
Choices
Functionality
None:
Long:
When enabled, causes the radio to sound
a continuous alert tone, from the time the PTT button is pressed, until
the time that the Signaling System data packet is transmitted.
Short:
When enabled, causes the radio to sound
one short alert tone, after the PTT button is pressed, and immediately
following the Signaling System data packet being transmitted.
Notes

### Password

*Source: `(root)/Password.htm`*

Password
(Expert Feature)
This feature is used to prevent unauthorised
access with the CPS.
Once a codeplug is programmed to the radio, the radio can only read with
the correct password.
The range is from 0 to 65535.
Notes
Available
when the radio is a Select 5 model.

### Pause Digit Duration

*Source: `(root)/Pause_Digit_Duration.htm`*

Pause Digit Duration
Defines the duration of the DTMF pause tone. It is referenced with a
�P� in the DTMF encoder sequence.
Range is from 30ms to 2550 ms, in increments of 10 ms.
Notes
Available
when the radio is a Select 5 model.

### Pause Duration

*Source: `(root)/Pause_Duration.htm`*

Pause Duration
(Expert Feature)
Selects the amount of time that the radio waits during a dialing pause.
This creates a momentary wait at a strategic point - when the radio is
automatically dialing pre-programmed speed dial numbers. This wait is
sometimes needed, so that the radio does not get ahead of the external
phone system that it is attempting to access. This feature applies while
in Phone
Mode
for the current Phone
System.
The range is from 0 ms to 4500 ms, in increments of 25 ms.
Example: When the Access/Deaccess Type field is set to Immediate Auto, just
after the Access Code is automatically sent, a pause for a dial tone may
be needed before the Speed Dialed number is automatically transmitted.
Notes
Available
when the radio is a Display model.

### Periodic Repeat Time

*Source: `(root)/Periodic_Repeat_Time.htm`*

Periodic Repeat Time
(Expert Feature)
Periodic telegram repeat time interval defines when the radio will automatically
send out its PTT Keyup
for Telegram Repeat.
Range is from 0 to 255 seconds, in increments of 1 second.
Notes
Available
when the radio is a Select 5 model.

### Phone Entry Assignment Position

*Source: `(root)/Phone_Entry_Assignment_Position.htm`*

Phone Entry Assignment Position
A Phone Entry can be reassigned to any position in the list.
Highlight Phone in the tree view.
In the Phone List field, place the cursor into the
Location column and highlight the desired row number.
Use the mouse to either drag and drop or hold the
<Ctrl> key while pressing the Up/Down arrows to reassign the Phone
Entry to a different position in the list.

### Phone List

*Source: `(root)/Phone_List.htm`*

Phone List
The Phone List allows you to add and delete phone numbers, and correlating
phone names, to the Phone List. The first nine entries in this list are
automatically programmed for one-touch Speed Dialing on the DTMF keypad.
Speed Dial is not possible when the Access/Deaccess
Type field is set to Manual. Flexible functionality is assigned to
the Phone List through individual Phone
Systems.
Notes
Available
when the radio is a Display model.
Up to 25 Phone
List entries are allowed.
Up to 16 digits
for a Phone Number are allowed.
When the codeplug
version is equal to or greater than 03.00, valid characters available
are 0-9, *, #, -, P (pause character). There may be a need for a pause
when the radio is transmitting a Phone Number entry that is set-up for
one-touch Speed Dialing. The amount of pause time can be defined in the
Pause
Duration field.
When the codeplug
version is less than 03.00, valid characters available are 0-9, *, #,
-.
Up to 8 characters
for a Phone Name are allowed. Valid characters available are A-Z, a-z,
1-9, \, #, < >, *, +, _, /, -.
One-touch Speed
Dialing is only available on DTMF Keypad models.

### Phone List (Menu)

*Source: `(root)/Phone_List_menu.htm`*

Phone List (Menu)
When checked, enables the Phone List feature
to be included in the Program lists menu. This allows the radio-user the
ability to define and use certain Phone
List
functionality.
Notes
Available
when the radio is a Display model.

### Phone Mode

*Source: `(root)/Phone_Mode.htm`*

Phone Mode
When checked, enables Phone as a radio-user Top Level Menu feature.
This allows the radio-user to enter the Phone Mode, when the radio is
capable of transmitting phone calls.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Display model.

### Phone System

*Source: `(root)/Phone_System.htm`*

Phone System
(Expert Feature)
Selects the Phone System to be used when operating in Phone
Mode
for the current Conventional
Personality.
A Phone System defines certain functionality and the list of phone numbers
that allow the radio-user to make telephone calls.
Choices available are:
None
Available phone system
Notes
Available
when the radio is a Display model.

### Pin #12 Function Select (Select 5)

*Source: `(root)/Pin__12_Function_Select_(Select_5).htm`*

Pin #12 Function Select (Select 5)
Selects the radio accessory or functionality for Accessory
Connector Pin #12. The data direction for this pin is input
or output.
Choices
Functionality
Disabled:
Channel Steering:
Channel steering allows an external device
to select a channel, using a parallel interface.
The CPS can configure up to 4 input pins
in channel steering mode.
The radio software takes the state of
these inputs and brings them together to form an N bit value, where N
is the number of pins assigned to channel steering by the CPS and the
channel selected is a result of the Binary count obtained from these pins.
This value is the Channel Steering Index.
The lowest pin number corresponds to the
least significant bit of the Channel Steering Index.
If the Channel Steering Index is zero,
channel steering has no affect and channels are selected by normal user
inputs.
If the Channel Steering Index is not zero,
then the channel will be set to the channel that corresponds to the Channel
Steering Index value. If the selected channel index refers to a channel
higher than the number of channels programmed in the radio, the highest
available channel will be selected.
Any attempt to change channel via user
button action will be ignored if the Channel Steering Index is not zero
and the Button Error Alert will be sounded.  This
includes the following button actions:
(a) Up/Down.
(b) Memory Channel.
(c) Entering channel numbers via the keypad.
If the Channel Steering Index is reset to
zero the radio will return to the last �user selected� channel.
If the radio goes into any Emergency Mode
for which an Emergency
Revert Channel is defined, the Emergency Revert Channel takes precedence
over Channel Steering.
Hook:
External hook performs the same function
as microphone hook.
Voice PTT:
If a Voice PTT press is detected, then the
TX audio will be routed from either microphone path. This is selectable
via the CPS �Per Radio� window as to whether the external PTT uses the
internal or external microphone audio.
Mute Audio PA:
If this input is asserted then the audio
PA will be muted.  When
it is de-asserted, the audio PA will operate under normal software control
and follow programmed squelch requirements.
Open Rx Audio:
When this input is asserted the discriminator
audio is routed through to the audio PA independent of the normal squelch
criteria ie the radio is put into open squelch.
If an option board is fitted,
the audio routing is managed by the option board and could be different
from the default audio routing described above.
Public Address:
When enabled, this feature allows the radio
to act as a 'Public Address' system. An external switch is connected to
this pin. When this pin is asserted, the radio routes the �Control Head�
mic audio or the external mic audio through to the RX Audio line (pins
7 and 11). A public address kit must be connected to the RX Audio line;
this provides extra audio amplification and connection to an external
speaker (eg mounted on the roof of the car).
The �Control Head� mic
audio is selected when the mic PTT is pressed, while the external mic
audio is used by selecting the external PTT line.
Call 1, 2, 3, 4:
If one of call 1, call 2, call 3 or call
4 inputs is asserted, then its associated telegram will be transmitted.
It provides the same functionality as assigning
a call to a programmable button.
Emergency
If the emergency switch is assigned to
pin 9, and this input is asserted while the radio is powered down, then
the emergency wakeup function will be activated causing the radio to power
up and immediately enter Emergency mode. If this input is asserted while
the radio is powered up, the radio will enter the Emergency mode in the
normal way.
If the emergency switch is assigned to
a pin other than pin 9, then its operation and resulting action will be
the same as any button programmed for emergency. Emergency will only be
entered if the radio is powered up.
If external emergency is enabled for pin
9, then on power up the radio checks for failure of the attached emergency
kit.
Carrier Detect:
The output is asserted whenever carrier
is detected and is de-asserted if no carrier is present.
The output is de-asserted if the radio is
in TX mode
PL/DPL Detect:
When
the radio is first switched on, this output is de-asserted, thereafter
its behaviour depends on whether or not:
PL Override is enabled.
The correct decode tone PL or digital PL
for the currently selected channel is detected.
The speaker is muted or unmuted.
The radio is in TX mode.
1) If the radio is transmitting, the
PL/DPL detect line is de-asserted.
2) If the radio is in standby mode, or
decodes an incorrect PL/DPL, the PL/DPL detect line is de-asserted.
3) If the radio decodes the correct PL/DPL
and the PL override is disabled, the PL/DPL detect line is asserted whilst
the PL is present and de-asserted when it is not present.
4) If the radio decodes the correct PL/DPL
and the PL override is enabled, the PL/DPL detect line is asserted whilst
the speaker is unmuted, and de-asserted when it is muted.
Busy Radio
This output is asserted whenever Carrier
Detect is asserted, or when the radio is in TX mode.
Per Channel Output:
The output is asserted (high/low) while
the radio is on a channel which has �per channel output� enabled.
The output is de-asserted otherwise.
Car Audio Mute:
This option is used to mute the audio on
a car�s hi-fi system when any of the following occurs:
The output is asserted if the radio�s loudspeaker
is open.
The output is asserted if the radio is
transmitting.
The output is de-asserted if the radio�s
loudspeaker has been closed and the radio has not transmitted during the
preceding 5 seconds.
PTT Sense:
This is an output line that follows the
internal PTT input line. Its purpose is to inform an external device of
the state of the PTT and thus avoid conflicts in assertion between internal
PTT and the external PTT initiated by the device.
Decoder Output Control:
The output is asserted on decode of a decoder
which has the option 'Assert' in the Decoder
Output Control field selected.
The output is de-asserted on decode of
a decoder which has the option De-assert' in the 'Decoder Output Control'
field selected.
This option is enabled/disabled per personality.
Notes
Available
when the radio is a Select 5 Mobile model.
See Also
Active
Level
Debounce

### Pin #12 Function Select

*Source: `(root)/Pin__12_Function_Select_EMEA.htm`*

Pin #12 Function Select
Selects the radio accessory or functionality for Accessory
Connector Pin #12. The data direction for this pin can be input
or output.
Choices available are:
Unassigned
Channel Select 1
Channel Select 2
Channel Select 3
Channel Select 4
CSQ Detect
Data PTT
External Mic PTT
Mic Off Hook
PA Switch
PL/CSQ Detect/Talkgroup Detect
Rx Audio Mute
Tx PL Inhibit
Emergency Input
Data Revert
VOX On/Off
Available for Display
models only:
TOC
Disable
Tx Audio Mute
Request to Send
External Call Button
1
External Call Button
2
Option Board 1 (Input)
Option Board 2 (Input)
Option Board 3 (Input)
Option Board 4 (Input)
Clear to Send
Option Board 1 (Output)
Option Board 2 (Output)
Option Board 3 (Output)
Option Board 4 (Output)
Notes
Available
when the radio is a Mobile model.
Data PTT
and PA
Switch,
are mutually exclusive selections. That is, when selecting either one,
the other will not be available.
See Also
Active
Level
Debounce

### Pin #14 Function Select (Select 5)

*Source: `(root)/Pin__14_Function_Select_(Select_5).htm`*

Pin #14 Function Select (Select 5)
Selects the radio accessory or functionality for Accessory
Connector Pin #14. The data direction for this pin is input
or output.
Choices
Functionality
Disabled:
Channel Steering:
Channel steering allows an external device
to select a channel, using a parallel interface.
The CPS can configure up to 4 input pins
in channel steering mode.
The radio software takes the state of
these inputs and brings them together to form an N bit value, where N
is the number of pins assigned to channel steering by the CPS and the
channel selected is a result of the Binary count obtained from these pins.
This value is the Channel Steering Index.
The lowest pin number corresponds to the
least significant bit of the Channel Steering Index.
If the Channel Steering Index is zero,
channel steering has no affect and channels are selected by normal user
inputs.
If the Channel Steering Index is not zero,
then the channel will be set to the channel that corresponds to the Channel
Steering Index value. If the selected channel index refers to a channel
higher than the number of channels programmed in the radio, the highest
available channel will be selected.
Any attempt to change channel via user
button action will be ignored if the Channel Steering Index is not zero
and the Button Error Alert will be sounded.  This
includes the following button actions:
(a) Up/Down.
(b) Memory Channel.
(c) Entering channel numbers via the keypad.
If the Channel Steering Index is reset to
zero the radio will return to the last �user selected� channel.
If the radio goes into any Emergency Mode
for which an Emergency
Revert Channel is defined, the Emergency Revert Channel takes precedence
over Channel Steering.
Hook:
External hook performs the same function
as microphone hook.
Voice PTT:
If a Voice PTT press is detected, then the
TX audio will be routed from either microphone path. This is selectable
via the CPS �Per Radio� window as to whether the external PTT uses the
internal or external microphone audio.
Mute Audio PA:
If this input is asserted then the audio
PA will be muted.  When
it is de-asserted, the audio PA will operate under normal software control
and follow programmed squelch requirements.
Open Rx Audio:
When this input is asserted the discriminator
audio is routed through to the audio PA independent of the normal squelch
criteria ie the radio is put into open squelch.
If an option board is fitted,
the audio routing is managed by the option board and could be different
from the default audio routing described above.
Public Address:
When enabled, this feature allows the radio
to act as a 'Public Address' system. An external switch is connected to
this pin. When this pin is asserted, the radio routes the �Control Head�
mic audio or the external mic audio through to the RX Audio line (pins
7 and 11). A public address kit must be connected to the RX Audio line;
this provides extra audio amplification and connection to an external
speaker (eg mounted on the roof of the car).
The �Control Head� mic
audio is selected when the mic PTT is pressed, while the external mic
audio is used by selecting the external PTT line.
Call 1, 2, 3, 4:
If one of call 1, call 2, call 3 or call
4 inputs is asserted, then its associated telegram will be transmitted.
It provides the same functionality as assigning
a call to a programmable button.
Emergency
If the emergency switch is assigned to
pin 9, and this input is asserted while the radio is powered down, then
the emergency wakeup function will be activated causing the radio to power
up and immediately enter Emergency mode. If this input is asserted while
the radio is powered up, the radio will enter the Emergency mode in the
normal way.
If the emergency switch is assigned to
a pin other than pin 9, then its operation and resulting action will be
the same as any button programmed for emergency. Emergency will only be
entered if the radio is powered up.
If external emergency is enabled for pin
9, then on power up the radio checks for failure of the attached emergency
kit.
Carrier Detect:
The output is asserted whenever carrier
is detected and is de-asserted if no carrier is present.
The output is de-asserted if the radio is
in TX mode
PL/DPL Detect:
When
the radio is first switched on, this output is de-asserted, thereafter
its behaviour depends on whether or not:
PL Override is enabled.
The correct decode tone PL or digital PL
for the currently selected channel is detected.
The speaker is muted or unmuted.
The radio is in TX mode.
1) If the radio is transmitting, the
PL/DPL detect line is de-asserted.
2) If the radio is in standby mode, or
decodes an incorrect PL/DPL, the PL/DPL detect line is de-asserted.
3) If the radio decodes the correct PL/DPL
and the PL override is disabled, the PL/DPL detect line is asserted whilst
the PL is present and de-asserted when it is not present.
4) If the radio decodes the correct PL/DPL
and the PL override is enabled, the PL/DPL detect line is asserted whilst
the speaker is unmuted, and de-asserted when it is muted.
Busy Radio
This output is asserted whenever Carrier
Detect is asserted, or when the radio is in TX mode.
Per Channel Output:
The output is asserted (high/low) while
the radio is on a channel which has �per channel output� enabled.
The output is de-asserted otherwise.
Car Audio Mute:
This option is used to mute the audio on
a car�s hi-fi system when any of the following occurs:
The output is asserted if the radio�s loudspeaker
is open.
The output is asserted if the radio is
transmitting.
The output is de-asserted if the radio�s
loudspeaker has been closed and the radio has not transmitted during the
preceding 5 seconds.
PTT Sense:
This is an output line that follows the
internal PTT input line. Its purpose is to inform an external device of
the state of the PTT and thus avoid conflicts in assertion between internal
PTT and the external PTT initiated by the device.
Decoder Output Control:
The output is asserted on decode of a decoder
which has the option 'Assert' in the Decoder
Output Control field selected.
The output is de-asserted on decode of
a decoder which has the option De-assert' in the 'Decoder Output Control'
field selected.
This option is enabled/disabled per personality.
Notes
Available
when the radio is a Select 5 Mobile model.
See Also
Active
Level
Debounce

### Pin #14 Function Select

*Source: `(root)/Pin__14_Function_Select_EMEA.htm`*

Pin #14 Function Select
Selects the radio accessory or functionality for Accessory
Connector Pin #14. The data direction for this pin can be input
or output.
Choices available are:
Unassigned
Channel Select 1
Channel Select 2
Channel Select 3
Channel Select 4
CSQ Detect
Data PTT
External Mic PTT
Mic Off Hook
PA Switch
PL/CSQ Detect/Talkgroup Detect
Rx Audio Mute
Tx PL Inhibit
Emergency Input
Data Revert
VOX On/Off
Available for Display
models only:
TOC
Disable
Tx Audio Mute
Request to Send
External Call Button
1
External Call Button
2
Option Board 1 (Input)
Option Board 2 (Input)
Option Board 3 (Input)
Option Board 4 (Input)
Clear to Send
Option Board 1 (Output)
Option Board 2 (Output)
Option Board 3 (Output)
Option Board 4 (Output)
Notes
Available
when the radio is a Mobile model.
Data PTT
and PA
Switch,
are mutually exclusive selections. That is, when selecting either one,
the other will not be available.
See Also
Active
Level
Debounce

### Pin #3 Function Select (Select 5)

*Source: `(root)/Pin__3_Function_Select_(Select_5).htm`*

Pin #3 Function Select (Select 5)
Selects the radio accessory or functionality for Accessory
Connector Pin #3. The data direction for this pin is input
or output.
Choices
Functionality
Disabled:
Channel Steering:
Channel steering allows an external device
to select a channel, using a parallel interface.
The CPS can configure up to 4 input pins
in channel steering mode.
The radio software takes the state of
these inputs and brings them together to form an N bit value, where N
is the number of pins assigned to channel steering by the CPS and the
channel selected is a result of the Binary count obtained from these pins.
This value is the Channel Steering Index.
The lowest pin number corresponds to the
least significant bit of the Channel Steering Index.
If the Channel Steering Index is zero,
channel steering has no affect and channels are selected by normal user
inputs.
If the Channel Steering Index is not zero,
then the channel will be set to the channel that corresponds to the Channel
Steering Index value. If the selected channel index refers to a channel
higher than the number of channels programmed in the radio, the highest
available channel will be selected.
Any attempt to change channel via user
button action will be ignored if the Channel Steering Index is not zero
and the Button Error Alert will be sounded.  This
includes the following button actions:
(a) Up/Down.
(b) Memory Channel.
(c) Entering channel numbers via the keypad.
If the Channel Steering Index is reset to
zero the radio will return to the last �user selected� channel.
If the radio goes into any Emergency Mode
for which an Emergency
Revert Channel is defined, the Emergency Revert Channel takes precedence
over Channel Steering.
Hook:
External hook performs the same function
as microphone hook.
Voice PTT:
If a Voice PTT press is detected, then the
TX audio will be routed from either microphone path. This is selectable
via the CPS �Per Radio� window as to whether the external PTT uses the
internal or external microphone audio.
Data PTT:
If data mode is selected, it is assumed
that the external PTT is an electronic switch (e.g. a modem) that requires
the fastest possible radio response. When this pin is asserted the microphone
path will be muted and the TX audio will be routed from the Flat TX audio
input.
Note:
Fast Data PTT will only work on pin 3 with input debouncing for this pin
disabled.
To get the fastest possible keyup time (15
ms), the following options should also not be enabled:
- PTT keyup
Mode
- Select
5 Decode Authorisation
- Tx Admit
Criteria (except 'Always Allowed')
- Time-Out
Timer Type
- PTT Dekey
Encode
- TPL
Reversed Burst / DPL TOC
- Scan
List
Attention:
PL/DPL will not be available if the fastest Data PTT is programmed. For
PL/DPL to be available, you should enable at least one of the above options.
For example, you can set the config. byte 1 bit 1 to enable the Time-Out
Timer for fast Data PTT, then PL/DPL will be available.
Voice & Data PTT:
If data and voice mode is selected, then
it is assumed that the external PTT is an electronic switch that requires
the fastest possible radio response. If a PTT press is detected both the
microphone path and the Flat TX audio input will be enabled and the two
signals will be summed to form the TX signal.
This is selectable via the CPS �Per Radio�
window as to whether the external PTT uses the internal or external microphone
audio.
Note:
Fast Voice & Data PTT will only work on pin 3 with input debouncing
for this pin disabled.
To get the fastest possible keyup time
(15ms), the following options should also not be enabled:
- PTT keyup
Mode
- Select
5 Decode Authorisation- Tx Admit Criteria
(except 'Always Allowed')
- Time-Out Timer Type
- PTT Dekey
Encode
- TPL
Reversed Burst / DPL TOC
- Scan
List
Attention:
PL/DPL will not be available for Voice & Data PTT.
Mute Audio PA:
If this input is asserted then the audio
PA will be muted.  When
it is de-asserted, the audio PA will operate under normal software control
and follow programmed squelch requirements.
Open Rx Audio:
When this input is asserted the discriminator
audio is routed through to the audio PA independent of the normal squelch
criteria ie the radio is put into open squelch.
If an option board is fitted,
the audio routing is managed by the option board and could be different
from the default audio routing described above.
Public Address:
When enabled, this feature allows the radio
to act as a 'Public Address' system. An external switch is connected to
this pin. When this pin is asserted, the radio routes the �Control Head�
mic audio or the external mic audio through to the RX Audio line (pins
7 and 11). A public address kit must be connected to the RX Audio line;
this provides extra audio amplification and connection to an external
speaker (eg mounted on the roof of the car).
The �Control Head� mic
audio is selected when the mic PTT is pressed, while the external mic
audio is used by selecting the external PTT line.
Call 1, 2, 3, 4:
If one of call 1, call 2, call 3 or call
4 inputs is asserted, then its associated telegram will be transmitted.
It provides the same functionality as assigning
a call to a programmable button.
Emergency:
If the emergency switch is assigned to
pin 9, and this input is asserted while the radio is powered down, then
the emergency wakeup function will be activated causing the radio to power
up and immediately enter Emergency mode. If this input is asserted while
the radio is powered up, the radio will enter the Emergency mode in the
normal way.
If the emergency switch is assigned to
a pin other than pin 9, then its operation and resulting action will be
the same as any button programmed for emergency. Emergency will only be
entered if the radio is powered up.
If external emergency is enabled for pin
9, then on power up the radio checks for failure of the attached emergency
kit.
Notes
Available
when the radio is a Select 5 Mobile model.
See Also
Active
Level
Debounce

### Pin #3 Function Select

*Source: `(root)/Pin__3_Function_Select_EMEA.htm`*

Pin #3 Function Select
Selects the radio accessory or functionality for Accessory
Connector Pin #3. The data direction for this pin is input-only.
Choices available are:
Unassigned
Data PTT
External Mic PTT
Notes
Available
when the radio is a Mobile model.
See Also
Active
Level
Debounce

### Pin #4 Function Select (Select 5)

*Source: `(root)/Pin__4_Function_Select_(Select_5).htm`*

Pin #4 Function Select (Select 5)
Selects the radio accessory or functionality for Accessory
Connector Pin #4. The data direction for this pin is Output-only.
Choices
Functionality
Disabled:
Carrier Detect:
The output is asserted whenever carrier is
detected and is de-asserted if no carrier is present.
The output is de-asserted if the radio is
in TX mode
PL/DPL Detect:
When
the radio is first switched on, this output is de-asserted, thereafter
its behaviour depends on whether or not:
PL Override is enabled.
The correct decode tone PL or digital PL
for the currently selected channel is detected.
The speaker is muted or unmuted.
The radio is in TX mode.
1) If the radio is transmitting, the
PL/DPL detect line is de-asserted.
2) If the radio is in standby mode, or
decodes an incorrect PL/DPL, the PL/DPL detect line is de-asserted.
3) If the radio decodes the correct PL/DPL
and the PL override is disabled, the PL/DPL detect line is asserted whilst
the PL is present and de-asserted when it is not present.
4) If the radio decodes the correct PL/DPL
and the PL override is enabled, the PL/DPL detect line is asserted whilst
the speaker is unmuted, and de-asserted when it is muted.
Radio Busy:
This output is asserted whenever Carrier
Detect is asserted, or when the radio is in TX mode.
External Alarm:
Note:
It is only possible to assign this function to pin 4 of the accessory
connector.
External alarm is enabled per radio, and
per decoder.
If the radio has external alarm enabled
and a telegram is decoded, by a decoder set for external alarm enable,
then the output will be asserted.  This
output is used to energise a relay, etc that will sound the car's horn/flash
the lights.
Note:
This feature is not legal in all countries.
The output is de-asserted when any button
is pressed.
The output is de-asserted if the radio
is stunned.
The output is de-asserted when a time equal
to the external alarm duration has passed since the most recent previous
assertion of the output. For instance, if the external alarm duration
is 5 seconds, and two decodes are received 1 second apart, the alarm will
start on receipt of the first decode, and stop 6 seconds later (i.e.,
5 seconds after the second decode).
External Alarm cannot be enabled when the
Decoder Type is set for Stun, Ack1 ringing,
Ack1 Answer
or Silent Interrogate.
Per Channel Output:
The output is asserted (high/low) while
the radio is on a channel which has �per channel output� enabled.
The output is de-asserted otherwise.
Car Audio Mute:
This option is used to mute the audio on
a car�s hi-fi system when any of the following occurs:
The output is asserted if the radio�s loudspeaker
is open.
The output is asserted if the radio is
transmitting.
The output is de-asserted if the radio�s
loudspeaker has been closed and the radio has not transmitted during the
preceding 5 seconds.
PTT Sense:
This is an output line that follows the
internal PTT input line. Its purpose is to inform an external device of
the state of the PTT and thus avoid conflicts in assertion between internal
PTT and the external PTT initiated by the device.
Decoder Output Control:
The output is asserted on decode of a decoder
which has the option 'Assert' in the Decoder
Output Control field selected.
The output is de-asserted on decode of
a decoder which has the option De-assert' in the 'Decoder Output Control'
field selected.
This option is enabled/disabled per personality.
Notes
Available
when the radio is a Select 5 Mobile model.
See Also
Active
Level
Debounce

### Pin #4 Function Select

*Source: `(root)/Pin__4_Function_Select_EMEA.htm`*

Pin #4 Function Select
Selects the radio accessory or functionality for Accessory
Connector Pin #4. The data direction for this pin is output-only.
Choices available are:
Unassigned
CSQ Detect
External Alarm
PL/CSQ/Talkgroup Detect
Available for Display
models only:
Clear to Send
Option Board 1 (Output)
Option Board 2 (Output)
Option Board 3 (Output)
Option
Board 4 (Output)
Notes
Available
when the radio is a Mobile model.
See Also
Active
Level
Debounce

### Pin #6 Function Select

*Source: `(root)/Pin__6_Function_Select_EMEA.htm`*

Pin #6 Function Select
Selects the radio accessory or functionality for Accessory
Connector Pin #6. The data direction for this pin is input-only.
Choices available are:
Unassigned
Channel Select 1
Channel Select 2
Channel Select 3
Channel Select 4
Data PTT
External Mic PTT
Mic Off Hook
PA Switch
Rx Audio Mute
Tx PL Inhibit
Emergency Input
Data Revert
Available for Display
models only:
TOC Disable
Tx Audio Mute
Request to Send
External Call Button
1
External Call Button
2
Option Board 1 (Input)
Option Board 2 (Input)
Option Board 3 (Input)
Option
Board 4 (Input)
Notes
Available
when the radio is a Mobile model.
The Pin
selections: Data PTT and PA Switch, are mutually exclusive selections.
That is, when selecting either one, the other will not
be available.
Pin #
6 functionality may be limited to SCI based on resistor configuration.
Consult your basic service manual for more information.
See Also
Active
Level
Debounce

### Pin #8 Function Select (Select 5)

*Source: `(root)/Pin__8_Function_Select_(Select_5).htm`*

Pin #8 Function Select (Select 5)
Selects the radio accessory or functionality for Accessory
Connector Pin #8. The data direction for this pin is input
or output.
Choices
Functionality
Disabled:
Channel Steering:
Channel steering allows an external device
to select a channel, using a parallel interface.
The CPS can configure up to 4 input pins
in channel steering mode.
The radio software takes the state of
these inputs and brings them together to form an N bit value, where N
is the number of pins assigned to channel steering by the CPS and the
channel selected is a result of the Binary count obtained from these pins.
This value is the Channel Steering Index.
The lowest pin number corresponds to the
least significant bit of the Channel Steering Index.
If the Channel Steering Index is zero,
channel steering has no affect and channels are selected by normal user
inputs.
If the Channel Steering Index is not zero,
then the channel will be set to the channel that corresponds to the Channel
Steering Index value. If the selected channel index refers to a channel
higher than the number of channels programmed in the radio, the highest
available channel will be selected.
Any attempt to change channel via user
button action will be ignored if the Channel Steering Index is not zero
and the Button Error Alert will be sounded.  This
includes the following button actions:
(a) Up/Down.
(b) Memory Channel.
(c) Entering channel numbers via the keypad.
If the Channel Steering Index is reset to
zero the radio will return to the last �user selected� channel.
If the radio goes into any Emergency Mode
for which an Emergency
Revert Channel is defined, the Emergency Revert Channel takes precedence
over Channel Steering.
Hook:
External hook performs the same function
as microphone hook.
Voice PTT:
If a Voice PTT press is detected, then the
TX audio will be routed from either microphone path. This is selectable
via the CPS �Per Radio� window as to whether the external PTT uses the
internal or external microphone audio.
Mute Audio PA:
If this input is asserted then the audio
PA will be muted.  When
it is de-asserted, the audio PA will operate under normal software control
and follow programmed squelch requirements.
Open Rx Audio:
When this input is asserted the discriminator
audio is routed through to the audio PA independent of the normal squelch
criteria ie the radio is put into open squelch.
If an option board is fitted,
the audio routing is managed by the option board and could be different
from the default audio routing described above.
Public Address:
When enabled, this feature allows the radio
to act as a 'Public Address' system. An external switch is connected to
this pin. When this pin is asserted, the radio routes the �Control Head�
mic audio or the external mic audio through to the RX Audio line (pins
7 and 11). A public address kit must be connected to the RX Audio line;
this provides extra audio amplification and connection to an external
speaker (eg mounted on the roof of the car).
The �Control Head� mic
audio is selected when the mic PTT is pressed, while the external mic
audio is used by selecting the external PTT line.
Call 1, 2, 3, 4:
If one of call 1, call 2, call 3 or call
4 inputs is asserted, then its associated telegram will be transmitted.
It provides the same functionality as assigning
a call to a programmable button.
Emergency
If the emergency switch is assigned to
pin 9, and this input is asserted while the radio is powered down, then
the emergency wakeup function will be activated causing the radio to power
up and immediately enter Emergency mode. If this input is asserted while
the radio is powered up, the radio will enter the Emergency mode in the
normal way.
If the emergency switch is assigned to
a pin other than pin 9, then its operation and resulting action will be
the same as any button programmed for emergency. Emergency will only be
entered if the radio is powered up.
If external emergency is enabled for pin
9, then on power up the radio checks for failure of the attached emergency
kit.
Carrier Detect:
The output is asserted whenever carrier
is detected and is de-asserted if no carrier is present.
The output is de-asserted if the radio is
in TX mode
PL/DPL Detect:
When
the radio is first switched on, this output is de-asserted, thereafter
its behaviour depends on whether or not:
PL Override is enabled.
The correct decode tone PL or digital PL
for the currently selected channel is detected.
The speaker is muted or unmuted.
The radio is in TX mode.
1) If the radio is transmitting, the
PL/DPL detect line is de-asserted.
2) If the radio is in standby mode, or
decodes an incorrect PL/DPL, the PL/DPL detect line is de-asserted.
3) If the radio decodes the correct PL/DPL
and the PL override is disabled, the PL/DPL detect line is asserted whilst
the PL is present and de-asserted when it is not present.
4) If the radio decodes the correct PL/DPL
and the PL override is enabled, the PL/DPL detect line is asserted whilst
the speaker is unmuted, and de-asserted when it is muted.
Busy Radio
This output is asserted whenever Carrier
Detect is asserted, or when the radio is in TX mode.
Per Channel Output:
The output is asserted (high/low) while
the radio is on a channel which has �per channel output� enabled.
The output is de-asserted otherwise.
Car Audio Mute:
This option is used to mute the audio on
a car�s hi-fi system when any of the following occurs:
The output is asserted if the radio�s loudspeaker
is open.
The output is asserted if the radio is
transmitting.
The output is de-asserted if the radio�s
loudspeaker has been closed and the radio has not transmitted during the
preceding 5 seconds.
PTT Sense:
This is an output line that follows the
internal PTT input line. Its purpose is to inform an external device of
the state of the PTT and thus avoid conflicts in assertion between internal
PTT and the external PTT initiated by the device.
Decoder Output Control:
The output is asserted on decode of a decoder
which has the option 'Assert' in the Decoder
Output Control field selected.
The output is de-asserted on decode of
a decoder which has the option De-assert' in the 'Decoder Output Control'
field selected.
This option is enabled/disabled per personality.
Notes
Available
when the radio is a Select 5 Mobile model.
See Also
Active
Level
Debounce

### Pin #8 Function Select

*Source: `(root)/Pin__8_Function_Select_EMEA.htm`*

Pin #8 Function Select
Selects the radio accessory or functionality for Accessory
Connector Pin #8. The data direction for this pin can be input
or output.
Choices available are:
Unassigned
Channel Select 1
Channel Select 2
Channel Select 3
Channel Select 4
CSQ Detect
Data PTT
External Mic PTT
Mic Off Hook
PA Switch
PL/CSQ Detect/Talkgroup Detect
Rx Audio Mute
Tx PL Inhibit
Emergency Input
Data Revert
VOX On/Off
Available for Display
models only:
TOC
Disable
Tx Audio Mute
Request to Send
External Call Button
1
External Call Button
2
Option Board 1 (Input)
Option Board 2 (Input)
Option Board 3 (Input)
Option Board 4 (Input)
Clear to Send
Option Board 1 (Output)
Option Board 2 (Output)
Option Board 3 (Output)
Option Board 4 (Output)
Notes
Available
when the radio is a Mobile model.
Data PTT
and PA
Switch,
are mutually exclusive selections. That is, when selecting either one,
the other will not be available.
See Also
Active
Level
Debounce

### Pin #9 Function Select (Select 5)

*Source: `(root)/Pin__9_Function_Select_(Select_5).htm`*

Pin #9 Function Select (Select 5)
Selects the radio accessory or functionality for Accessory
Connector Pin #9. The data direction for this pin is input-only.
Choices
Functionality
Disabled:
Emergency
If the emergency switch is assigned to
pin 9, and this input is asserted while the radio is powered down, then
the emergency wakeup function will be activated causing the radio to power
up and immediately enter Emergency mode. If this input is asserted while
the radio is powered up, the radio will enter the Emergency mode in the
normal way.
If the emergency switch is assigned to
a pin other than pin 9, then its operation and resulting action will be
the same as any button programmed for emergency. Emergency will only be
entered if the radio is powered up.
If external emergency is enabled for pin
9, then on power up the radio checks for failure of the attached emergency
kit.
Notes
Available
when the radio is a Select 5 Mobile model.
See Also
Active
Level
Debounce

### Pin #9 Function Select

*Source: `(root)/Pin__9_Function_Select_EMEA.htm`*

Pin #9 Function Select
Selects the radio accessory or functionality for Accessory
Connector Pin #9. The data direction for this pin is input-only.
Choices available are:
Unassigned
External Emergency Switch
Notes
Available
when the radio is a Mobile model.
The Active
Level for External Emergency Switch can only be set to 'Low'.
See Also
Active
Level
Debounce

### Power Level (Menu)

*Source: `(root)/Power_Level_menu.htm`*

Power Level (Menu)
When checked, enables the Tx
Power Level to be included in the Utilities menu. This allows the
user to toggle between low and high power to preserve battery life.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Power Range

*Source: `(root)/Power_Range_5tone.htm`*

Power Range
The CPS
retrieves and allows you to view-only
the minimum and maximum power range at which the radio is allowed to operate.
This information is stored in the radio.
Notes
Available
when the radio is a Mobile model.

### Power Up Alert

*Source: `(root)/Power_Up_Alert.htm`*

Power Up Alert
This is the power up self-test alert and that indicates either a successful
power up or an unsuccessful power up where one or more self-checks have
failed.
Choices available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Power Up Channel

*Source: `(root)/Power_Up_Channel.htm`*

Power Up Channel
The radio can be programmed to always power up on a defined channel.
If not programmed, it will always power up on the last used channel prior
to power down.
Choices available are:
Last Used
Available Personality
Notes
Available
when the radio is a Select 5 model.

### Power Up Delay

*Source: `(root)/Power_Up_Delay.htm`*

Power Up Delay
(Expert Feature)
Selects the amount of time (during radio power-up) that all GP I/O lines
of the Accessory
Connector pins are ignored. During this time any functionality associated
with all connector pins is delayed for the duration of the timer. Range
is from 0 ms to 6300 ms, in increments of 100 ms.
Notes
Available
when the radio is a Select 5 Mobile model.

### Pretime (DTMF)

*Source: `(root)/Pretime_(DTMF).htm`*

Pretime (DTMF)
(Expert Feature)
Selects the amount of time between a PTT
button press and the first digit of a Signaling
System
data packet transmission. This time allows the receiving radio to stabilize
before receiving data. This applies for the current DTMFSignaling
System.
The range is from 0 ms to 4500 ms, in increments of 25 ms.
Notes
This
feature is only available for radio models equipped with the option board
capability.
Available
when the radio model is capable of transmitting Radio
Calls
or PTT
ID's.

### Pretime (Encoder Sequence)

*Source: `(root)/Pretime_(Encoder_Sequence).htm`*

Pretime (Encoder Sequence)
(Expert Feature)
The time set in this field is used in repeater operations to allow the
repeater to reach its operating power output before the radio sends its
Encode Sequences.
The range is from 0 to 2550 ms, in increments of 10 ms. if set to 0
ms, the option is disabled.
Notes
Available
when the radio is a Select 5 model.

### Pretime (Quik-Call II)

*Source: `(root)/Pretime_(Quik-Call_II).htm`*

Pretime (Quik-Call II)
(Expert Feature)
Selects the amount of time between a PTT
button press and the first tone of a Signaling
System
data packet transmission. This time allows the receiving radio to stabilize
before receiving the tone. This applies for the current Quik-Call
IISignaling
System.
The range is from 0 ms to 4500 ms, in increments of 25 ms.
Notes
Available
when the radio model is capable of transmitting Radio
Calls.

### Pretime (Phone)

*Source: `(root)/Pretime_Phone.htm`*

Pretime (Phone)
(Expert Feature)
Selects the amount of time between pressing PTT
and the first bit of data packet transmission. This time allows the receiving
radio to stabilize before receiving data. This feature applies while in
Phone
Mode
for the current Phone
System.
The range is from 0 ms to 4500 ms, in increments of 25 ms.
Notes
Available
when the radio is a Display model.

### Primary ID (DTMF)

*Source: `(root)/Primary_ID_(DTMF).htm`*

Primary ID (DTMF)
Selects the unique one to eight digit ID that identifies the radio while
operating (transmitting or receiving DTMF calls) on the current DTMF
- Signaling
System.
When receiving a DTMF transmission, the Primary ID allows the radio
to identify the incoming call as being addressed to it.
When transmitting DTMF PTT
ID's,
the Primary ID provides the means for Reverse
Aliasing
on the receiving radio. Valid characters are 0 through 9, * and #.
Notes
This
feature is only available for radio models equipped with the option board
capability.

### Priority #2 Scan List Member

*Source: `(root)/Priority_2_Scan_List_Member.htm`*

Priority #2 Scan List Member
Causes the second highest priority to be assigned
to the second member/row in the current Scan
List.
When the radio is scanning a Scan List (Active
Scan),
25% of the scans are targeted at the Priority #2 Member channel. When
a Priority #2 Member exists, scan checks for the Priority #1 Member are
reduced from 50% to 25%.
Example
If the Priority
#1 Member is P1, the Priority #2 Member is P2, and the non-priority Scan
List Members are Nn, then the scanning sequence is: P1 N1,
P2 N2, P1 N3,
P2 N4, P1 N5,
etc.
Notes
When
the radio�s speaker is unmuted
to a non-priority call (Landed
Scan mode),
or is unmuted on the Priority
#2 Member (if one exists), the radio continues to mute
at a specific time interval (the Priority
Sample Time), and scan for transmission activity on the Priority #1
Member channel. If the radio discovers a valid Priority #1 transmission,
it drops the current transmission, and unmutes to the Priority #1 call.
Available
when the Landed Scan List member and the Priority #2 Member are both of
Conventional Dispatch type.
When the radio
is in Landed Scan mode for a Priority #2 Member call, and it discovers
a valid Priority #1 transmission, it drops the Priority #2 call and unmutes
to the Priority #1 call.
When the Scan
List Member �#1� Personality is set to Priority #1.

### Priority Call Decode Alert

*Source: `(root)/Priority_Call_Decode_Alert.htm`*

Priority Call Decode Alert
(Expert Feature)
Indicates that Priority Decode is received, any further calls will not
interrupt a Priority call, either during the call or while the call is
waiting to be answered.
Choices
available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Priority Time

*Source: `(root)/Priority_Time.htm`*

Priority Time
(Expert Feature)
Selects the delay period between checking for priority Scan
List Member
transmission activity for the current Scan
List.
The range is from 500 ms to 4000 ms, in increments of 250 ms.
Notes
Available
when the radio is a Select 5 model.
Available
when the radio has a scan list member that has a Priority
#1 channel set.
Available
when Vote Scan is disabled.

### Program PL

*Source: `(root)/Program_PL.htm`*

Program PL
When checked, enables Program PL as a radio-user Top Level Menu feature.
This allows the radio-user to edit the PL/DPL codes for a selected channel.
Notes
Available
when the radio is a Display model.

### Prompt Message Language

*Source: `(root)/Prompt_Message_Language_5tone.htm`*

Prompt Message Language
A different language may be used for both the radio�s operation and
prompt messages.
The available languages are English, French, German, Spanish, Italian,
and Polish.
Notes
Available
when the radio is a Select 5 Display model.

### Quik-Call II System

*Source: `(root)/Quik-Call_II_System.htm`*

Quik-Call II System
Selects the Quik-Call
IISignaling
System
to be used by the current Quik Call II (QCII) - Call List Member.
Notes
Available
when the radio is a Display model.
Available
when the radio is capable of transmitting Call
Alerts
or Selective
Calls.

### Radio ID

*Source: `(root)/Radio_ID.htm`*

Radio ID
Radio ID digits allow a user to input the Radio ID and use them in Select
5 Encode and Decode sequences.
Digit
Descirption
Range
U1
1st digit of Radio ID
0-9, A-F
U2
2nd digit of Radio ID
0-9, A-F
U3
3rd digit of Radio ID
0-9, A-F
U4
4th digit of Radio ID
0-9, A-F
U5
5th digit of Radio ID
0-9, A-F
U6
6th digit of Radio ID
0-9, A-F
U7
7th digit of Radio ID
0-9, A-F
U8
8th digit of Radio ID
0-9, A-F
Notes
Available
when the radio is a Select 5 model.
Available when
the codeplug version is equal to or higher than 4.00.
If any digit
of 0-9 and A-F is defined as Group Tone or
Repeat Tone, it can not be defined as any
digit of the Radio ID.

### Radio ID (Menu)

*Source: `(root)/Radio_ID_(Menu).htm`*

Radio ID (Menu)
When checked, enables Radio ID as a radio-user Top Level Menu feature.
This enables the radio user to view or change the defined Radio
ID digits.
Notes
Available
when the radio is a Select 5 Display model.
Available
when the codeplug version is equal to or higher than 4.00.

### Radio Information

*Source: `(root)/Radio_Information.htm`*

Radio Information
This displays the radio information window, taken from the codeplug
currently displayed. The radio information displayed is its serial and
model numbers, the codeplug and radio software versions, the frequency
range and power output.
The description field gives information about the shown model.

### Radio On Message

*Source: `(root)/Radio_on_Message.htm`*

Radio On Message
If the display is programmed to Radio On Message, upon power up the
Radio On Message text will be displayed.
The text message can contain up to 8 alphanumeric characters. This can
be different from the Display Text.
Notes
Available
when the radio is a Select 5 Display model.

### Recall Last Selected

*Source: `(root)/Recall_Last_Selected.htm`*

Recall Last Selected
When checked, causes the last-used Top Level Menu option to automatically
appear in the radio�s display when the radio-user enters the Menu Mode.
When not checked, the first available Top-Level Menu option appears
in the radio�s display when the radio-user enters the Menu Mode.
Notes
Available
when the radio is a Display model.

### Rekey Inhibit Duration

*Source: `(root)/Rekey_Inhibit_Duration.htm`*

Rekey Inhibit Duration
This feature is used to prevent a user from re-keying the radio, for
the period of time set after the allowed transmit time has expired. This
feature is intended to enable better access to the traffic channel by
preventing single user monopoly. The time can be set from 0 to 255 seconds,
in increments of 1 second.
Notes
Available
when the radio is a Select 5 model.

### Removing Auto Acknowledges

*Source: `(root)/Removing_Auto_Acknowledges.htm`*

Removing Auto Acknowledges
There are multiple ways to remove Auto Acknowledges.
Highlight the Auto Acknowledge (Ack) in the tree view.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu, or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The Auto Acknowledge disappears from the tree view.
Notes
Available
when the radio is a Select 5 model.

### Removing Contacts in the Contact List

*Source: `(root)/Removing_Contacts_in_the_Contact_List.htm`*

Removing Contacts in the Contact List
Highlight a Location
number.
Click the Remove
button.
Notes
Available
when the radio is a Select 5 Display model.

### Removing DTMF Systems

*Source: `(root)/Removing_DTMF_Systems.htm`*

Removing DTMF Systems
There are multiple ways to remove DTMF Systems.
Highlight the DTMF system in the tree view.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu., or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The DTMF System disappears from the tree view.
Notes
This
feature is only available for radio models equipped with the option board
capability.

### Removing Decoder Definitions

*Source: `(root)/Removing_Decoder_Definitions.htm`*

Removing Decoder Definitions
There are multiple ways to remove Decoder Definitions.
Highlight the Definition (Def) in the tree view.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu, or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The Definition disappears from the tree view.
Notes
Available
when the radio is a Select 5 model.

### Removing Encoder Sequences

*Source: `(root)/Removing_Encoder_Sequences.htm`*

Removing Encoder Sequences
There are multiple ways to remove Encoder Sequences.
Highlight the Sequence (Seq) in the tree view.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu, or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The Sequence disappears from the tree view.
Notes
Available
when the radio is a Select 5 model.

### Removing Encoder Telegrams

*Source: `(root)/Removing_Encoder_Telegrams.htm`*

Removing Encoder Telegrams
There are multiple ways to remove Encoder Telegrams.
Highlight the Telegram (Tel) in the tree view.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu, or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The Telegram disappears from the tree view.
Notes
Available
when the radio is a Select 5 model.

### Removing Personalities

*Source: `(root)/Removing_Personalities_(Select5).htm`*

Removing Personalities
There are multiple ways to remove Personalities.
Highlight the Personality (Pers) in the tree view.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu, or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The Personality disappears from the tree view.
Notes
Upon
deletion of a Personality, if Designated
Power Up Channel was set to the deleted Personality, the Designated
Power Up Channel field will set to 'None'.
A minimum
of one Personality is required.

### Removing Select 5 Systems

*Source: `(root)/Removing_Select_5_Systems.htm`*

Removing Select 5 Systems
There are multiple ways to remove Select 5 Systems.
Highlight the Select 5 System (Sys) in the tree view.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu, or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The Select 5 System disappears from the tree view.
Notes
Available
when the radio is a Select 5 model.

### Removing a DTMF Call Entry

*Source: `(root)/Removing_a_DTMF_Call_Entry.htm`*

Removing a DTMF Call Entry
There are multiple ways to remove DTMF Call entries.
Open Call in the tree view, then open DTMF in the tree view. Highlight
a DTMFCL entry.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu., or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The DTMF Call entry disappears from the tree view.
Notes
Available
when the radio is a Display model.

### Removing a Phone System

*Source: `(root)/Removing_a_Phone_System.htm`*

Removing a Phone System
There are multiple ways to remove a Phone System.
Highlight the Phone System (Sys) in the tree view.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu., or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The Phone System disappears from the tree view.
Notes
Available
when the radio is a Display model.

### Removing a Quik-Call II Call Entry

*Source: `(root)/Removing_a_Quik-Call_II_Call_Entry.htm`*

Removing a Quik-Call II Call Entry
There are multiple ways to remove Quik-Call II Call entries.
Open Call in the tree view then open Quik-Call II in the tree view.
Highlight a QCCL entry.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu., or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The Quik-Call II Call entry disappears from the tree view.
Notes
Available
when the radio is a Display model.

### Removing a Scan List

*Source: `(root)/Removing_a_Scan_List.htm`*

Removing a Scan List
There are multiple ways to remove a Scan List.
Highlight the Scan List (List) in the tree view.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu, or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The Scan List disappears from the tree view.

### Removing a Status in the Status List

*Source: `(root)/Removing_a_Status_in_the_Status_List.htm`*

Removing a Status in the Status List
Highlight a Position
number.
Click the Delete
button.
Notes
Available
when the radio is a Select 5 Display model.

### Renaming (Select 5)

*Source: `(root)/Renaming_(Select5).htm`*

Renaming (Select 5)
Personalities can be renamed.
Highlight the Personality to be renamed in the
tree view.
From the Edit
menu choose Rename, or, right
mouse click and choose Rename.
Rename the item.
Notes
A maximum
of 8 characters is allowed. Valid characters are A-Z a-z 123456789 \ #
< > * + _ / -

### Repeat Counter

*Source: `(root)/Repeat_Counter.htm`*

Repeat Counter
(Expert Feature)
Defines the number the encoder telegram is repeated. Every valid receive
decode will cancel this function.
Range is from 1 to 255 seconds, in increments of 1 second.
Notes
Available
when the radio is a Select 5 model.

### Repeat Tone

*Source: `(root)/Repeat_Tone.htm`*

Repeat Tone
For each Signalling System the tone used for repeat must be defined
as any one of the tones 0-9, A-F.
The default tone used for repeat is the E tone.
Notes
Available
when the radio is a Select 5 model.
The Repeat
Tone and Group Tone should be different.

### Reset Duration

*Source: `(root)/Reset_Duration.htm`*

Reset Duration
(Expert Feature)
Selects the amount of time the radio waits for the next incoming DTMF
digit in a sequence of digits, before resetting itself to look for the
first DTMF digit of a new sequence. The feature applies for the current
DTMFSignaling
System.
The range is from 0.2 seconds to 33 second, in increments of 0.1 seconds.
Notes
This
feature is only available for radio models equipped with the option board
capability.
Available
when the radio model is capable of transmitting Radio
Calls
or PTT
ID's.
If you
do not have complete knowledge of the system configuration that this radio
will be operating on, do not attempt
to modify this setting!

### Reverse Squelch

*Source: `(root)/Reverse_Squelch.htm`*

Reverse Squelch
(Expert Feature)
When checked, programs for reverse PL/DPL to unmute, the radio will
have satisfied its PL/DPL requirements when there is no PL/DPL.
Notes
Available
when the radio is a Select 5 model.

### Revert Channel

*Source: `(root)/Revert_Channel.htm`*

Revert Channel
It will be possible to specify a Personality on whose transmit frequency
the acknowledge telegram will be encoded. PL will be encoded according
to its setting for the revert channel. The revert channel number will
be programmable per acknowledge block. Signalling standard, RF power,
frequency, channel spacing and PL encode configurations will be used from
the chosen Personality.
Choices available are:
Selected (current channel)
Available Personality
Notes
Available
when the radio is a Select 5 model.
Available
when a Personality has been defined.

### Revert Personality (DTMF Call)

*Source: `(root)/Revert_Personality_(DTMF_Call).htm`*

Revert Personality (DTMF Call)
Selects a Conventional
Personality
(by its CPS
given name) causing the current DTMF
- Call
List Member
to transmit on that channel.
Therefore, when a Radio Call is initiated using a Call List Member where
a Revert Personality has been selected, that personality�s functionality
is utilized (reverted to) during the call. Once the call has completed,
the radio reverts back to the Personality/Group assigned to the current
Channel Selector's selected channel (see Channel
Position).
Notes
Available
when the radio is a Display model.
The Revert
Personality uses the DTMF Signaling System selected for the current DTMF
Call List Member.

### Revert Personality (QCII Call)

*Source: `(root)/Revert_Personality_(QCII_Call).htm`*

Revert Personality (QCII Call)
Selects a Conventional
Personality
(by its CPS
given name) causing the current Quik-Call
II
(QCII) - Call
List Member
to transmit on that channel.
Therefore, when a Radio Call is initiated using a Call List Member where
a Revert Personality has been selected, that personality�s functionality
is utilized (reverted to) during the call. Once the call has completed,
the radio reverts back to the Personality/Group assigned to the current
Channel Selector selected channel (see Channel
Position).
Notes
Available
when the radio is a Display model.
The Revert
Personality uses the QCII Signaling System selected for the current Quik-Call
II Call List Member.

### Revert Scan

*Source: `(root)/Revert_Scan.htm`*

Revert Scan
(Expert Feature)
When checked, causes the radio to automatically move to the last landed
scan
- channel
when exiting Scan Mode.
When unchecked, the radio automatically moves back to the channel where
scan was originally initiated.
Notes
Available
when the radio is a Display model.
Available
when the radio has a scan list member that has a Priority
#1 channel set.

### Ring Type Alert

*Source: `(root)/Ring_Type_Alert.htm`*

Ring Type Alert
This feature is used to define the ring tone used by the radio.
Available choices are:
English
French
General
Notes
Available
when the radio is a Select 5 model.

### Rx Audio Type (Select 5)

*Source: `(root)/Rx_Audio_Type_(Select_5).htm`*

Rx Audio Type
Selects the configuration of the audio output line. The audio output
line uses Pin #11 of the Accessory Connector. Certain external
accessories such as modems or public address systems may require unfiltered
or filtered audio.
Choices
Functionality
Filtered Squelched:
This is received audio that has pre-emphasis/de-emphasis
(voice) and does not contain the transmitted sub-audible PL tone and is
output when carrier is detected.
Filtered Unsquelched:
This is received audio that has pre-emphasis/de-emphasis
(voice) and is output at all times. and does not contain the transmitted
sub-audible PL tone. As this is an unsquelched option, there will always
be noise at this output when the radio is in the idle condition.
Flat Squelched:
This is received audio that has no pre-emphasis/de-emphasis
(data), but still contains the transmitted sub-audible PL tone and is
output when carrier is detected.
Flat Unsquelched:
This is received audio that has no pre-emphasis/de-emphasis
(data), but still contains the transmitted sub-audible PL tone and is
output at all times. As this is an unsquelched option, there will always
be noise at this output when the radio is in the idle condition.
Notes
Available
when the radio is a Select 5 Mobile model.

### Rx DPL Code (Select 5)

*Source: `(root)/Rx_DPL_Code_(Select_5).htm`*

Rx DPL Code (Select 5)
Selects the specific code accepted when receiving Digital
Private Line
(DPL) encoding, while operating on the current Personality.
Non standard code frequencies
may also be entered. Range is from 023 to 754 in octal numbers.
Notes
Available
when Rx Squelch Type is set
to DPL.
See Also
Standard
Code List

### Rx DPL Code

*Source: `(root)/Rx_DPL_Code_EMEA.htm`*

Rx DPL Code
Selects the specific code accepted when receiving Digital
Private Line
(DPL) encoding, while operating on the current Conventional
Personality.
Non standard code frequencies
may also be entered. Range is from 000 to 777 in octal numbers.
Notes
Available
when Rx Squelch Type is set to
DPL.
See Also
Standard
Code List

### Rx DPL Invert (Select 5)

*Source: `(root)/Rx_DPL_Invert_(Select_5).htm`*

Rx DPL Invert (Select 5)
When checked, causes Digital
Private Line
(DPL) signals to be inverted when they are received by the radio, while
operating on the current Personality.
Inverted coding allows for more traffic/usage on frequencies.
Notes
DPL
Invert must be set on both receiving and transmitting radios, and repeaters,
for communication to occur.
Available when
Rx Squelch Type is set to
DPL.

### Rx DPL Invert

*Source: `(root)/Rx_DPL_Invert_EMEA.htm`*

Rx DPL Invert
When checked, causes Digital
Private Line
(DPL) signals to be inverted when they are received by the radio, while
operating on the current Conventional
Personality.
Inverted coding allows for more traffic/usage on frequencies.
Notes
DPL
Invert must be set on both receiving and transmitting radios, and repeaters,
for communication to occur.
Available when
Rx Squelch Type is set to DPL.

### Rx Low Battery Volume Alert

*Source: `(root)/Rx_Low_Battery_Volume_Alert.htm`*

Rx Low Battery Volume Alert
(Expert Feature)
An alert is sounded, if enabled, when the battery threshold falls to
a specific level. This tells the user that the battery power has fallen
to such a low level that normal receive operation cannot be maintained
and that the radio will shortly shut down.
Choices available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 Portable model.

### Rx Parameters Include (Select 5)

*Source: `(root)/Rx_Parameters_Include_(Select_5).htm`*

Rx Parameters Include (Select 5)
Rx
Frequency
Rx
Squelch Type
Rx
TPL Frequency
Rx
TPL Code
Rx
DPL Code
Rx
DPL Invert

### Rx Reference Frequency (Select 5)

*Source: `(root)/Rx_Reference_Frequency_(Select_5).htm`*

Rx Reference Frequency (Select 5)
(Expert Feature)
Selects the Reference Frequency used when receiving on the current Personality.
Choices available
are:
2.100 MHz
2.225 MHz
2.400 MHz
Automatic
Notes
It is
possible to disable the radio's ability to receive and or transmit data.
If you are not fully aware of the impact of this setting, DO
NOT MODIFY IT!

### Rx Squelch Type (Select 5)

*Source: `(root)/Rx_Squelch_Type_(Select_5).htm`*

Rx Squelch Type (Select 5)
Selects the type of Private
Line
(PL) or Carrier
Squelch
needed to receive a call, while operating on the current Personality.
Choices
Functionality
(CSQ)
Does not receive PL code
(TPL)
Receives TPL
code
(DPL)
Receives DPL
code
Notes
Available
when the radio is a Select 5 model.
The Unmute/Mute
Rules
for the Conventional Personality also determines if a call can be received.

### Rx Squelch Type

*Source: `(root)/Rx_Squelch_Type_EMEA.htm`*

Rx Squelch Type
Selects the type of Private
Line
(PL) or Carrier
Squelch
needed to receive a call, while operating on the current Conventional
Personality.
Choices
Functionality
(CSQ)
Does not receive PL code
(TPL)
Receives TPL
code
(DPL)
Receives DPL
code
Notes
If CSQ
is selected, Channel Busy Lockout
will be disabled.
The Unmute/Mute
Rules
for the Conventional Personality also determines if a call can be received.

### Rx TPL Code (Select 5)

*Source: `(root)/Rx_TPL_Code_(Select_5).htm`*

Rx TPL Code (Select 5)
Selects the specific code accepted when receiving Tone
Private Line
(TPL) encoding, while operating on the current Personality.
This code can directly correlate to the Rx
TPL Frequency field. That is, selecting a value for this field automatically
selects an Rx TPL Frequency; however, non standard frequencies may also
be selected.
Notes
Available
when the radio is a Select 5 model.
Available
when Rx Squelch Type is set
to TPL.
When a non-standard
TPL frequency is set, the TPL code will be set to Blank.
See Also
Frequency/Codes
List

### Rx TPL Code

*Source: `(root)/Rx_TPL_Code_EMEA.htm`*

Rx TPL Code
Selects the specific code accepted when receiving Tone
Private Line
(TPL) encoding, while operating on the current Conventional
Personality.
This code can directly correlate to the Rx
TPL Frequency field. That is, selecting a value for this field automatically
selects an Rx TPL Frequency; however, non standard frequencies may also
be selected.
Notes
Available
when Rx Squelch Type is set to
TPL.
When a non-standard
TPL frequency is set, the TPL code will be set to Blank.
See Also
Frequency/Codes
List

### Rx TPL Frequency (Select 5)

*Source: `(root)/Rx_TPL_Frequency_(Select_5).htm`*

Rx TPL Frequency (Select 5)
Selects a designated frequency
used when receiving Tone
Private Line
(TPL) encoding, while operating on the current Personality.
This frequency can directly correlate to the Rx
TPL Code field; however, non standard code frequencies may also be
selected. Range is from 67.0 Hz to 255.0 Hz, in increments of 0.1 Hz.
Notes
Available
when the radio is a Select 5 model.
Available
when Rx Squelch Type is set
to TPL.
See Also
Frequency/Codes
List

### Rx TPL Frequency

*Source: `(root)/Rx_TPL_Frequency_EMEA.htm`*

Rx TPL Frequency
Selects a designated frequency
used when receiving Tone
Private Line
(TPL) encoding, while operating on the current Conventional
Personality.
This frequency can directly correlate to the Rx
TPL Code field; however, non standard code frequencies may also be
selected. Range is from 67.0 Hz to 255.0 Hz, in increments of 0.1 Hz.
Notes
Available
when Rx Squelch Type is set to
TPL.
See Also
Frequency/Codes
List

### S5 Decode Authorisation

*Source: `(root)/S5_Decode_Authorisation.htm`*

Select 5 Decode Authorisation
(Expert Feature)
Prevents the user from monitoring or transmitting until authorised.
The radio will be authorised when it receives the individual call for
the channel and be de-authorised if:
It subsequently receives
and decodes the clear down sequence for the channel.
The user changes channel that is using a different
personality option and authorisation is disabled.
Optionally it is possible to specify that the
radio is de-authorised when the auto-reset timer expires or the monitor
button is tapped, providing the monitor button feature is enabled.
The radio may auto acknowledge the authorisation
sequence and may also be authorised by a group call. The auto-reset timer
is started when the individual call sequence is decoded and stopped when
the clear down sequence is decoded.
Choices
Functionality
Disabled:
The radio has normal transmit capabilities.
Enabled:
The radio will only have transmit capabilities
when it is called and until the auto-reset timer expires, or it decodes
a clear down sequence.
Enabled with Request:
If programmed, this option will allow the
user to request a call. Initially, the only call allowed by this option,
is a call telegram, sent to the controller from a pre-programmed button.
The telegram contains the address (ID) of the sender and the transmit
request sequence.
If this is acknowledged and approved by the
controller, the radio will decode the �authorisation� sequence that enables
transmission and all normal transmit timers will apply.
When the request is sent, the authorisation
timer is started. This can be set from 0 to 32 seconds. This is the time
the radio remains unsquelched while the user awaits confirmation. At time
out, or if clear down is decoded, the radio reverts to normal operation
and the user knows the request was not granted.
Notes
Available
when the radio is a Select 5 model.

### Saving Files

*Source: `(root)/Saving_Files_(Select5).htm`*

Saving Files
Once a radio's codeplug file configurations are
completed, the file can be saved as an archive file for future use.
From the File
menu choose Save or Save
As.
Browse to where you want the file saved and click
the Save button.

### Saving a Report

*Source: `(root)/Saving_a_Report.htm`*

Saving a Report
To save the report to your hard drive:
From the File
menu Choose Reports, or from the
tool bar click
A dialog box appears.
Click on one of the
report types and click the Save As
button.
Browse to where you
want to save the report. The report saves as an .html file.

### Scan

*Source: `(root)/Scan.htm`*

Scan
When checked, enables Scan as a radio-user Top Level Menu feature. This
allows the radio-user to enter the radio�s Scan
Mode.
Notes
Available
when the radio is a Display model.

### Scan (Select 5)

*Source: `(root)/Scan_(Select_5).htm`*

Scan (Select 5)
When checked, enables Scan to be included in the Utilities menu. This
allows the radio-user to enter the radio�s Scan
Mode.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Scan LED

*Source: `(root)/Scan_LED.htm`*

Scan LED
When checked, the LED will flash to indicate active channel scan and
will stop flashing when the radio stops on a channel.
Notes
Available
when the radio is a Select 5 model.

### Scan List (Select 5)

*Source: `(root)/Scan_List_(Select_5).htm`*

Scan List (Select 5)
Selects the Scan List used by the radio while operating in the Scan
Mode,
on the current
Personality.
The Scan List determines which callers the radio scans for (actively looks
for), and considers Unmuting
to, on the selected Scan List channels.
Choices available are:
None
Available List
Notes
Available
when the radio is a Select 5 model.
Scan
List Members must be added to the assigned Scan List.

### Scan List (Menu)

*Source: `(root)/Scan_List_menu.htm`*

Scan List (Menu)
When checked, enables the Scan
List feature to be included in the Program Lists menu. This allows
the radio-user the ability to define and use certain Scan
List
functionality.
Notes
Available
when the radio is a Display model.

### Scan PL Type

*Source: `(root)/Scan_PL_Type_EMEA.htm`*

Scan PL Type
Causes Private
Line
(PL) to be required - when accepting calls from members of the current
Scan
List,
while in Scan
Mode.
PL is considered only when the
transmission being received has its Rx
Squelch Type set for PL.
Choices
Functionality
Disabled:
PL decoding is not
required.
Non-Priority Channel:
Requires PL decoding only
on any Non-Priority current Scan List member channels.
Priority Channel:
Requires PL decoding only
on a Priority #1, and or Priority
#2 Scan List Member channel. This selection exists only
when a Priority Member is enabled.
Priority and Non-Priority Channel:
Requires PL decoding on all current Scan
List Members channels.
Notes
Disabling
the need for PL codes increases scanning speeds by unmuting
the radio on Carrier
Squelch Detect
only.

### Scan Priority Alert

*Source: `(root)/Scan_Priority_Alert.htm`*

Scan Priority Alert
This is sounded when the radio stops on the priority channel during
scanning.
Notes
Available
when the radio is a Select 5 model.

### Scan Start Alert

*Source: `(root)/Scan_Start_Alert.htm`*

Scan Start Alert
This is sounded when the scan option is invoked.
Notes
Available
when the radio is a Select 5 model.

### Scan Stop Alert

*Source: `(root)/Scan_Stop_Alert.htm`*

Scan Stop Alert
This is sounded when the radio 'Lands On' a channel during scan.
Notes
Available
when the radio is a Select 5 model.

### Secret Emergency

*Source: `(root)/Secret_Emergency.htm`*

Secret Emergency
When checked, causes all radio alerts, LEDs, and side tones to disabled,
when the emergency button is pressed and the radio enters Emergency
Mode.
This prevents anyone from realizing that the radio is operating. The
controller is able to hear what is happening during the transmit cycle,
and then has the choice of transmitting during the receive cycles of the
radio.
Notes
Available
when the radio is a Select 5 model.
Secret
Emergency CM340 limitation - Due to hardware
limitations within the control head of this version of radio, the channel
selection display and the button back lights are illuminated when the
Secret Emergency is invoked.

### Sel Cal

*Source: `(root)/Sel_Cal.htm`*

Sel Cal
When checked, enables the Selective
Call feature
to be included in the Radio
Call
menu. This allows the radio-user the ability to transmit Selective Calls.
Notes
Available
when the radio is a Display model.
Available when
the radio is capable of transmitting Selective Calls.
See Also
Call
Type (QCII)
Call
Type (DTMF)

### Select 5 Decode - About

*Source: `(root)/Select_5_Decode_-_About.htm`*

Select 5 Decode - About
A decode sequence may consist of up to 12 tones and the radio is able
to decode sequences that have a different number of tones and where the
longest sequence contains the same tone as the smaller sequence. E.g.
the radio is able to decode 12345 & 123456
Any of the decoders signalling systems standard tones may be specified
in the sequence.

### Select 5 Decode Auto Reset Deauthorises

*Source: `(root)/Select_5_Decode_Auto_Reset_Deauthorises.htm`*

Select 5 Decode Auto Reset Deauthorises
(Expert Feature)
If enabled and the Auto Reset Timer
expires the radio will revert to its programmed operation and authorisation
will be revoked.
Notes
Available
when the radio is a Select 5 model.

### Select 5 Decode Telegrams

*Source: `(root)/Select_5_Decode_Telegrams.htm`*

Select 5 Decode Telegrams
A decode sequence may consist of up to 12 tones and the radio is able
to decode sequences that have a different number of tones and where the
longest sequence contains the same tone as the smaller sequence. E.g.
the radio is able to decode 12345 & 123456
Any of the decoders signaling systems standard tones may be specified
in the sequence.
Highlight
any number of decoders in the Available list, depending on the programming
of the decoders, and click the Add
button. There are up to 16 decoders available to choose from.
Notes
Available
when the radio is a Select 5 model.

### Select 5 Encode - About

*Source: `(root)/Select_5_Encode_-_About.htm`*

Select 5 Encode - About
S5 Encode is used to define the Select 5 call sequences programmed to
call buttons and/or the PTT button.
In order to reference variable digits, such as Address, Status etc,
special characters are used in the encoder sequence fields and mapped
to the corresponding codeplug fields.
They are as follows:
Single
Tones -  (T1),
(T2); Note the radio�s display references Single Tone T1 as �J� and Single
Tone T2 as �K�
Status Digits  -
(S1) � (S3)
Address Digits - (A1) � (A8)

### Select 5 Encode Call 1, 2, 3, 4

*Source: `(root)/Select_5_Encode_Call_1,_2,_3,_4.htm`*

Select 5 Encode Call 1, 2, 3, 4
Any option button can be assigned as either call 1, 2, 3 or 4 and if
pressed, the telegram assigned to the call, will be transmitted. If the
transmit Tx Admit Criteria is not
met, then the button/keypad error alert will sound until the button is
released.
Choices available are:
None
Address Send
Available Telegram
Notes
Available
when the radio is a Select 5 model.

### Select 5 Encode DTMF Disconnect Telegram

*Source: `(root)/Select_5_Encode_DTMF_Disconnect_Telegram.htm`*

Select 5 Encode DTMF Disconnect Telegram
(Expert Feature)
If the call is a telephone interconnect call, (i.e. the call telegram
has either live or buffered dial enabled) then on termination of the call,
the DTMF disconnect telegram will be sent, if enabled.
Choices
available are:
None
Available Telegram
Notes
Available
when the radio is a Select 5 model.

### Select 5 Encode Disconnect Telegram

*Source: `(root)/Select_5_Encode_Disconnect_Telegram.htm`*

Select 5 Encode Disconnect Telegram
If the call is a normal Select 5 call, (i.e. the call telegram has either
live or buffered dial enabled) then on termination of the call, a Select
5 telegram will be sent if enabled.
A call can be terminated for the following reasons:
1) Auto-reset expires.
2) A clear down telegram is received.
3) The radio goes �On-Hook� - mobiles only.
4) The monitor button is press to terminate the call.
Disconnect telegrams cannot be used if any of the Acknolwedge
Expected options are enabled.
Choices
available are:
None
Available Telegram
Notes
Available
when the radio is a Select 5 model.

### Select 5 Encode Sidetone

*Source: `(root)/Select_5_Encode_Sidetone.htm`*

Select 5 Encode Sidetone
When checked, enables the transmitted Select 5 telegram to be heard
as a sidetone in the speaker. This can act as a comfort feature to the
user in knowing the radio has transmitted.
For each defined acknowledge block, it is possible to disable sidetone
indications that are normally given when the radio performs auto ACK or
call forward.
Notes
Available
when the radio is a Select 5 model.

### Select 5 Encode #Button

*Source: `(root)/Select_5_Encode__Button.htm`*

Select 5 Encode #Button
Display model radios are able to transmit a telegram, using the  #
key, from the Contact List, or after entering variable address digits
via direct entry Multicall.
If the # is pressed and the transmit Tx
Admit Criteria is not met, then the button/keypad error alert will
sound until the option button is released.
Choices
available are:
None
Available Telegram
Notes
Available
when the radio is a Select 5 model.

### Select 5 Signalling System

*Source: `(root)/Select_5_Signalling_System.htm`*

Select 5 Signalling System
Selects 1 of the 8 possible pre-defined Select 5 signalling tables.
These tables are used to define the encode sequence behaviour.
Notes
Available
when the radio is a Select 5 model.

### Select 5 System Table

*Source: `(root)/Select_5_System_Table.htm`*

Select 5 System Table
Tone #
ZVEI 1
ZVEI 2 / French Modified ZVEI
ZVEI 3 / Modified ZVEI
CCIR
70 ms / Modified CCIR
CCIR 20 ms / 100 ms
EEA
0
2400
2400
2200
1981
1981
1981
1
1060
1060
970
1124
1124
1124
2
1160
1160
1060
1197
1197
1197
3
1270
1270
1160
1275
1275
1275
4
1400
1400
1270
1358
1358
1358
5
1530
1530
1400
1446
1446
1446
6
1670
1670
1530
1540
1540
1540
7
1830
1830
1670
1640
1640
1640
8
2000
2000
1830
1747
1747
1747
9
2200
2200
2000
1860
1860
1860
A (G)
2800
885
885
2400
2400
2400
B
810
810
810
930
930
930
C
970
2800
2600
2247
2247
2247
D
885
2600
2800
991
991
991
E (R)
2600
970
2400
2110
2110
2110
F
930
930
930
873
873
873

### Sequence Time Out Timer

*Source: `(root)/Sequence_Time_Out_Timer.htm`*

Sequence Time Out Timer
(Expert Feature)
Specifies the maximum acceptable delay between two successive decoder
sequences.
Range can be set from 20 ms to 5100 ms, in increments of 20 ms.
Notes
Available
when the radio is a Select 5 Display model.

### Short Press (Microphone) (Select 5)

*Source: `(root)/Short_Press_(Microphone)_(Select_5).htm`*

Short Press (Select 5)
(Microphone)
Selects the functionality to be assigned to the Short-Press of a Microphone.
A Short Press is defined as any button-press that is shorter in duration
than the CPS-user defined Long
Press Duration.
Selections
Available When
Unassigned
Always available.
Monitor
1 / Call Cancel
Always available.
Scan
Always available.
Power
Level
Always available.
Repeater/
Talkaround
Always available.
Memory
Channel 1
Always available. Available for Display models
only.
Memory
Channel 2
Always available. Available for Display models
only.
Option
Board
Always available. Available for Display models
only.
Call
1, 2, 3, or 4
Always available.
Call
Forward
Always available.
DTMF
Keypad
Always available. Available for Display models
only.
Nuisance
Delete
Always available.
Nuisance
Delete/Cancel Voice Message
Always available. Available for Display models
only.
XPAND
Always available.
Cancel
Voice Message
Always available. Available for Display models
only.
Voice
Storage Play
Assigned to a Short Press. Available for Display
models only.
Lone
Worker
Always available.
External
Alarm
Always available.
Backlight
Always available. Available for Display models
only.
Local/Base
Station
Always available.
Missed
Calls
Always available. Available for Display models
only.
Contact
List
Always available. Available for Display models
only.
Contact
Multicall
Always available. Available for Display models
only.
Status
List
Always available. Available for Display models
only.
Status
Multicall
Always available. Available for Display models
only.
Channel
Always available. Available for Display models
only.

### Short Press (Microphone)

*Source: `(root)/Short_Press_(Microphone_NonNag).htm`*

Short Press
(Microphone)
Selects the functionality to be assigned to the Short-Press of a Microphone.
A Short Press is defined as any button-press that is shorter in duration
than the CPS-user defined Long
Press Duration.
Selections
Available
When
Unassigned
Always available.
Sticky
Permanent Monitor
This button�s Long Press is set to Open
Squelch.
Or,
this button�s Long Press is Unassigned.
Toggle High/Low
Power
Always available.
Toggle Local/Distance
Always available.
Toggle Repeater/Talkaround
Always available.
Toggle System
Scan On/Off
Always available.
Toggle Tight
/ Normal Squelch
Always available.
Toggle VOX
Operation
Always available.
Escalert
Always available. Available for Display models
only.
Revert
Memory Channel 1
This button's Long Press is assigned to Store
Memory Channel 1.
Available for Display models only.
Revert
Memory Channel 2
This button's Long Press is assigned to Store
Memory Channel 2.
Available for Display models only.
Radio
Call
Always available. Available for Display models
only.
Phone
Speed Dial
Always available. Available for Display models
only.
Phone
Mode
Always available. Available for Display models
only.
Scan
List Edit
Always available. Available for Display models
only.
External
Alarm
Always available. Available for Display models
only.
Toggle Option
Board On/Off
Always available. Available for Display models
only.

### Short Press (Mobile) (Select 5)

*Source: `(root)/Short_Press_(Mobile)_(Select_5).htm`*

Short Press (Select 5)
(Mobile)
Selects the functionality to be assigned to the Short-Press of a mobile
radio. A Short Press is defined as any button-press that is shorter in
duration than the CPS-user defined Long
Press Duration.
Selections
Available When
Unassigned
Always available.
Monitor
1 / Call Cancel
Always available.
Scan
Always available.
Power
Level
Always available.
Repeater/
Talkaround
Always available.
Memory
Channel 1
Always available. Available for Display models
only.
Memory
Channel 2
Always available. Available for Display models
only.
Option
Board
Always available. Available for Display models
only.
Call
1, 2, 3, or 4
Always available.
Call
Forward
Always available.
DTMF
Keypad
Always available. Available for Display models
only.
Nuisance
Delete
Always available.
Nuisance
Delete/Cancel Voice Message
Always available. Available for Display models
only.
XPAND
Always available.
Cancel
Voice Message
Always available. Available for Display models
only.
Voice
Storage Play
Assigned to a Short Press. Available for Display
models only.
Lone
Worker
Always available.
External
Alarm
Always available.
Backlight
Always available. Available for Display models
only.
Local/Base
Station
Always available.
Missed
Calls
Always available. Available for Display models
only.
Contact
List
Always available. Available for Display models
only.
Contact
Multicall
Always available. Available for Display models
only.
Status
List
Always available. Available for Display models
only.
Status
Multicall
Always available. Available for Display models
only.
Channel
Always available. Available for Display models
only.

### Short Press (Mobile)

*Source: `(root)/Short_Press_(Mobile_NonNag).htm`*

Short Press
(Mobile)
Selects the functionality to be assigned to the Short-Press of a mobile
radio. A Short Press is defined as any button-press that is shorter in
duration than the CPS-user defined Long
Press Duration.
Selections
Available
When
Unassigned
Always available.
Sticky
Permanent Monitor
This button�s Long Press is set to Open
Squelch.
Or,
this button�s Long Press is Unassigned.
Toggle High/Low
Power
Always available.
Toggle Local/Distance
Always available.
Toggle Repeater/Talkaround
Always available.
Toggle System
Scan On/Off
Always available.
Toggle Tight
/ Normal Squelch
Always available.
Toggle VOX
Operation
Always available.
Volume
Set
This button�s Long Press is Unassigned. Hold
down this button for Volume Set.
Escalert
Always available.
Revert
Memory Channel 1
This button's Long Press is assigned to Store
Memory Channel 1.
Available for Display models only.
Revert
Memory Channel 2
This button's Long Press is assigned to Store
Memory Channel 2.
Available for Display models only.
Radio
Call
Always available. Available for Display models
only.
Phone
Speed Dial
Always available. Available for Display models
only.
Phone
Mode
Always available. Available for Display models
only.
Scan
List Edit
Always available. Available for Display models
only.
Menu
Mode
Programmed on the P2 button. When in menu mode, the P1 button automatically
becomes the menu exit button. Available for Display models only.
External
Alarm
Always available. Available for Display models
only.
Toggle Option
Board On/Off
Always available. Available for Display models
only.

### Short Press (Portable)

*Source: `(root)/Short_Press_(Portable)_EMEAConv.htm`*

Short Press
(Portable)
Selects the functionality to be assigned to the Short Press of a portable
radio. A Short Press is defined as any button-press that is shorter in
duration than the CPS-user
defined Long
Press Duration.
Selections
Available When
Unassigned
Always available.
Monitor
This button�s Long Press can be set to Sticky
Permanent Monitor.
This button�s Short Press cancels Sticky Permanent monitor.
Or,
this button�s Long Press is Unassigned.
Volume
Set
This button's Long Press is Unassigned.
Hold down this button for Volume Set.
Battery
Indicator
This button's Long Press is Unassigned. Hold
down this button to check the Battery Indicator.
Toggle System
Scan On/Off
Always available.
Toggle High/Low
Power
Always available. This feature is not available
for 2 W portable models.
Toggle Repeater/
Talkaround
Always available.
Toggle Tight
/ Normal Squelch
Always available.
Toggle VOX
Operation
Always available.
Whisper
Mode
Always available.
Escalert
Always available.
Revert
Memory Channel 1
This button's Long Press is assigned to Store
Memory Channel 1.
Available for Display models only.
Revert
Memory Channel 2
This button's Long Press is assigned to Store
Memory Channel 2.
Available for Display models only.
Radio
Call
Always available. Available for Display models
only.
Phone
Speed Dial
Always available. Available for Full-Keypad
Display models only.
Phone
Mode
Always available. Available for Display models
only.
Scan
List Edit
Always available. Available for Display models
only.
Menu
Mode
Programmed on the Front P2 button. When in
menu mode, the P1 button automatically becomes the menu exit button. Available
for Display models only.
Toggle Lights
On/Off
Always available. Available for Display models only.
Toggle Option
Board On/Off
Always available.

### Short Press (Portable) (Select 5)

*Source: `(root)/Short_Press_portable_(Select_5).htm`*

Short Press (Select 5)
(Portable)
Selects the functionality to be assigned to the Short Press of a portable
radio. A Short Press is defined as any button-press that is shorter in
duration than the CPS-user
defined Long
Press Duration.
Selections
Available When
Unassigned
Always available.
Monitor
1 / Call Cancel
Always available.
Scan
Always available.
Power
Level
Always available.
Repeater/
Talkaround
Always available.
Whisper
Mode On/Off
Always available.
Memory
Channel 1
Always available. Available for Display models
only.
Memory
Channel 2
Always available. Available for Display models
only.
Option
Board
Always available.
Call
1, 2, 3, or 4
Always available.
Call
Forward
Always available.
DTMF
Keypad
Always available. Available for Full Keypad
models only.
Nuisance
Delete
Always available.
Nuisance
Delete/Cancel Voice Message
Always available. Available for Display models
only.
XPAND
Always available.
Cancel
Voice Message
Always available. Available for Display models
only.
Voice
Storage Play
Assigned to a Short Press. Available for Display
models only.
Lone
Worker
Always available.
Light
Always available. Available for Display models
only.
Keypad
Enable On/Off
Always available. Available for Full Keypad
models only.
Missed
Calls
Always available. Available for Display models
only.
Contact
List
Always available. Available for Display models
only.
Contact
Multicall
Always available. Available for Display models
only.
Status
List
Always available. Available for Display models
only.
Status
Multicall
Always available. Available for Display models
only.
Channel
Always available. Available for Display models
only.

### Side Tone Alert Volume Offset

*Source: `(root)/Side_Tone_Alert_Volume_Offset.htm`*

Side Tone Alert Volume Offset
(Expert Feature)
This option is referenced to the �normal radio volume� which is manually
adjustable using the volume control. The Side Tone alert volume can be
programmed to be at either a higher or lower level than the �normal radio
volume�.
The offset is programmable from -128 to +127, in increments of 10. A
zero entry is normal radio volume.
Notes
Available
when the radio is a Select 5 model.

### Sidetones

*Source: `(root)/Sidetones.htm`*

Sidetones
For each defined acknowledgement block it is possible to disable sidetone
indications that are normally given when the radio performs Auto
Acknowledgement or Call
Forward.
Notes
Available
when the radio is a Select 5 model.

### Signalling Pre-emphasis/De-emphasis

*Source: `(root)/Signalling_Pre-emphasis_De-emphasis.htm`*

Signalling Pre-emphasis/De-emphasis
When checked, provides a filtering algorithm, used by the ASFIC, to
reduce the signal noise ratio in two-way radio RF systems. Pre-emphasis
is used to filter the transmit signal and De-emphasis is used to filter
the receive signal.
Notes
Available
when the radio is a Select 5 model.

### Signalling System

*Source: `(root)/Signalling_System.htm`*

Signalling System
For each Select 5 Signalling System, the Signalling System standard
to be used must be defined.
The radio supports seven Select 5 signalling system standards: - ZVEI
1, ZVEI 2, ZVEI 3, 20 ms CCIR, 70 ms CCIR, 100 ms CCIR and EEA. Sixteen
tones 0-9, A - F are supported in each standard.
In addition, it is possible to program data for �user-defined� signalling
system standards into the radio. The radio allows for up to 2 �user-defined�
standards.
The Signalling System standard defines the tone frequency and duration
data to be used when encoding or decoding Select 5 tones.
All tones within a Signalling System standard have the same duration.
See Also
Select
5 System Table
Notes
Available
when the radio is a Select 5 model.

### Signalling System (Encoder Sequence)

*Source: `(root)/Signalling_System_(Encoder_Sequence).htm`*

Signalling System (Encoder Sequence)
All tones of a sequence are transmitted using the same signalling system.
Encode sequences may be transmitted using one of the eight Select 5 signalling
systems.
Choices
Functionality
Select 5:
Each tone consists of a single frequency
in the range of 300 to 3000 Hz. The tone frequency, tone length, inter
tone delay, group tone and repeat tone are dependent upon the signalling
standard (signalling system) selected.
The radio will perform auto �R� insertion
for all Select 5 sequences.
DTMF:
A transmitted DTMF tone is a combination
of 2 tones.  The
duration of the resultant tone and the inter tone delay between successive
tones is dependent on the signalling system in use.
Notes
Available
when the radio is a Select 5 model.

### Software Version

*Source: `(root)/Software_Version.htm`*

Software Version
When checked, enables the Software Version feature to be included in
the Utility menu. This allows the radio-user the ability to display the
Version Number of internal-radio Firmware Software stored in Read-Only
Memory (ROM).
Notes
Available
when the radio is a Display model.

### Squelch

*Source: `(root)/Squelch.htm`*

Squelch
When checked, enables the Squelch feature to be included in the Utility
menu. This allows the radio-user the ability to temporarily adjust the
Squelch
Threshold
setting to �Normal� or �Tight� for the current Channel Selector selected
channel.
Once the radio�s channel is changed, or the radio is powered-off, this
setting reverts back to the Squelch
Setting
for each Conventional
Personality.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Display model.

### Squelch Mode

*Source: `(root)/Squelch_Mode.htm`*

Squelch Mode
This mode cannot be entered if there is no �Selective Calling� or PL
enabled on the channel. During normal channel operation the receiver may
unmute due to the different signalling requirements and the various user
actions programmed into the radio for that channel.
Choices available are:
CSQ
TPL/DPL & Tone
TPL/DPL
Tone
Notes
Available
when the radio is a Select 5 model.

### Start Scan RSSI Level

*Source: `(root)/Start_Scan_RSSI_Level.htm`*

Start Scan RSSI Level
(Expert Feature)
This defines the lowest RSSI level that allows the radio to 'Land On'
a channel.
The RSSI range setting for this option is  -70
to -120dBm, in increments of 1dBm.
Notes
Available
when the radio is a Select 5 model.

### Status (Decoder Status List)

*Source: `(root)/Status_(Decoder_Status_List).htm`*

Status (Decoder Status List)
This specifies decode variable digits associated with a name.
For each designated variable position, the following digits may be entered:
0-9, A-F, G, R, (T1) and (T2).
The CPS user is able to specify up to 3 ranges of allowed variable digits.
Notes
Available
when the radio is a Select 5 Display model.

### Status (Encoder Status List)

*Source: `(root)/Status_(Encoder_Status_List).htm`*

Status (Encoder Status List)
This specifies encode or decode variable digits associated with a name.
For each designated variable position, the following digits may be entered:
0-9, A-F, G, R, (T1) and (T2).
The CPS user is able to specify up to 3 ranges of allowed variable digits.
A validation check is made to ensure that the number of variable digits
entered is a match for the selected telegram.
The status entered by the user will be validated against range(s) that
have the same number of digits.
Group digits can be locked out from variable positions by setting the
corresponding bits of a Group Lockout mask.
A digit can be programmed so that it can be locked out from either all
positions or from a single variable digit position.
Validation against the allowed variable digit entry is done on keypad
entry.
CPS entry allows entry of numbers in the Status List that are outside
the ranges.
If an attempt is made to transmit a telegram where not enough Variable
Digits are entered, transmission will fail and the button/keypad error
alert shall be sounded.
Notes
Available
when the radio is a Select 5 Display model.

### Status List

*Source: `(root)/Status_List.htm`*

Status List
When checked, enables the Status List as a radio-user Top Level Menu
feature. This allows the radio-user to go straight to the Status List
of the menu.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Strip PL

*Source: `(root)/Strip_PL.htm`*

Strip PL
(Expert Feature)
When checked, causes the radio to not transmit Private
Line
(PL) codes while in the Phone
Mode.
This only applies when the current Phone
System
is assigned to a Conventional
Personality
that is configured for Transmit
PL.
Notes
Available
when the radio is a Display model.

### Strip TPL/DPL (DTMF Call)

*Source: `(root)/Strip_TPL_DPL_(DTMF_Call).htm`*

Strip TPL/DPL (DTMF Call)
(Expert Feature)
When checked, causes the radio to not transmit PL
codes
with the call for the current DTMF
- Call
List Member.
PL codes are stripped when the current Revert Personality
or current (Channel Selector) Conventional
Personality
has Transmit
PL
enabled.
Notes
Available
when the radio is a Display model.
This is
useful when it is necessary to selectively call a radio or group of radios
(using Selective
Call)
without disturbing other radio-users.
When the radio
is capable of transmitting Call
Alerts
or Selective
Calls.

### Strip TPL/DPL (QCII Call)

*Source: `(root)/Strip_TPL_DPL_(QCII_Call).htm`*

Strip TPL/DPL (QCII Call)
(Expert Feature)
When checked, causes the radio to not transmit PL
codes
with the call for the current Quik-Call
II
(QCII) - Call
List Member.
PL codes are stripped when the current Revert Personality
or current (Channel Selector) Conventional
Personality
has Transmit
PL
enabled.
Notes
Available
when the radio is a Display model.
This is
useful when it is necessary to selectively call a radio or group of radios
(using Selective
Call)
without disturbing other radio-users.
When the radio
is capable of transmitting Call
Alerts
or Selective
Calls.

### Sweep Time

*Source: `(root)/Sweep_Time.htm`*

Sweep Time
(Expert Feature)
Sweep time defines the amount of time a radio will stay on a landed
channel, provided no conversation is started.
Sweep mode is disabled for a given scan list by programming the sweep
time to zero.
Note: this configuration is
required to allow conversation on a PL only channel.
Listen mode is entered when a conversation is entered during scan and
this may be because the user has pressed the PTT, a call button or the
radio has received a Select 5 call. It may also be entered automatically,
when �landing on� during scan, if sweep mode is disabled.
Auto reset will operate as auto reset carrier override, but it will
then use the listen mode timer.
Note the auto-reset option to defeat PL will not be applicable to scan
reset.
The range is programmable from 0 to 255 seconds, in increments of 1
second.
Notes
Available
when the radio is a Select 5 model.
Available
when Vote Scan is disabled.
This configuration
is required to allow conversation on a PL only channel.

### TPL/DPL Required for Data

*Source: `(root)/TPL_DPL_Required_for_Data_EMEA.htm`*

TPL/DPL Required for Data
(Expert Feature)
When checked, causes the radio to require the correct Private
Line
(PL) codes before signaling data can be received, while operating on the
current Personality.
Notes
This
feature is not available for 2W Portable models.
Available when
Rx Squelch Type is set to TPL,
or DPL.
Available when
Rx
Signaling System is not set
to None.

### TPL Reverse Burst/DPL TOC

*Source: `(root)/TPL_Reverse_Burst_DPL_TOC.htm`*

TPL Reverse Burst/DPL TOC
When checked, enables the radio to transmit a PL
code and send the tone code when keyed, and on PTT dekey, the tone signal
is stopped, and a PL 'reverse burst' is generated. This reverse burst
consists of the PL code with a 240 degrees phase shift. It is sent to
indicate the end of transmission to the receiving radio and so reduce
squelch
tail.
Digital Private Line (DPL) is similar to PL. When a radio is programmed
to transmit a DPL code, it sends a digital code when keyed and on PTT
dekey, the tone signal is stopped, and a DPL �Turn Off Code� (TOC) is
sent to indicate the end of transmission to the receiving radio.
It may be necessary to disable this feature for certain repeater operations.
Notes
Available
when the radio is a Select 5 model.
Tx
Squelch Type must be either TPL or DPL.

### Talkaround

*Source: `(root)/Talkaround.htm`*

Talkaround
When checked, allows the radio to operate in Talkaround
ModeRepeater
Mode,
while operating on the current Personality.
Talkaround can also be selected by a radio-user (short or long programmable
button-press) or through the Talkaround
menu selection.
Disabling disallows the current personality the ability to operate in
Talkaround Mode.
Notes
Available
when the radio is a Select 5 model.
In Talkaround
Mode the Rx
Parameters are used in place of the Tx
Parameters when transmitting.
If the Rx Parameters
and Tx Parameters are programmed the same for the current Personality,
the personality is in affect in a constant Talkaround mode, therefore
this field is automatically disabled.

### Talkaround (Menu)

*Source: `(root)/Talkaround_menu.htm`*

Talkaround (Menu)
When checked, enables Talkaround
as a radio-user Top Level Menu feature. This allows the radio-user to
choose to operate in Repeater
Mode
or Talkaround
Mode.
Notes
Available
when the radio is a Display model.

### Talkaround (Menu) (Select 5)

*Source: `(root)/Talkaround_menu_(Select_5).htm`*

Talkaround (Menu) (Select 5)
When checked, enables Talkaround to be
included in the Utilities menu. This allows the radio-user to choose to
operate in Repeater
Mode
or Talkaround
Mode.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Telegram

*Source: `(root)/Telegram.htm`*

Telegram
Specifies the telegram to be used, as an Advanced Multicall user, when
making a call to this entry.
If variable digit positions have been defined in the telegram, the entry
will specify the variable digits to be encoded in those positions. For
a given telegram the same number of variable digits must always be specified.
For each designated variable position, the following digits may be entered:
0-9, A-F, G, R, (T1) and (T2).
The CPS user is able to specify up to 3 ranges of allowed variable digits.
A validation check is made to ensure that the number of variable digits
entered is a match for the selected telegram.
The address entered by the user will be validated against range(s) that
have the same number of digits.
Group digits can be locked out from variable positions by setting the
corresponding bits of a Group Lockout mask.
A digit can be programmed so that it can be locked out from either all
positions or from a single variable digit position.
Validation against the allowed variable digit entry is done on keypad
entry.
If an attempt is made to transmit a telegram where not enough Variable
Digits are entered, transmission will fail and the button/keypad error
alert is sounded.
Variable digits will be substituted into any transmitted telegram containing
variable Called Radio ID digits.
Notes
Available
when the radio is a Select 5 Display model.

### Telegram 1st Tone Duration

*Source: `(root)/Telegram_1st_Tone_Duration.htm`*

Telegram 1st Tone Duration
(Expert Feature)
Defines the time duration of the first tone of the received sequence.
If a transmitted sequence has an extended first tone, the receiver�s decoders
must know what the duration is, otherwise the sequence would be corrupted
on decode. The length of the tone would not be of the correct duration
for the standard used (CCIR, EEA, ZVEI etc).
The range is from 0 to 2550 ms, in increments of 10 ms. If set to 0
ms, the option is disabled.
Notes
Available
when the radio is a Select 5 model.

### Telegram Repeat

*Source: `(root)/Telegram_Repeat.htm`*

Telegram Repeat
(Expert Feature)
When checked, allows the encoded telegram to be repeated if:
An acknowledgement
is not received within the Acknowledge
Expected Duration or
The transmit Tx
Admit Criteria is not satisfied on the first attempt, or any subsequent
attempts. However if the transmit attempt fails due to being Select
5 Decode Authorisation, Force Monitor
Mode or Transmit never allowed, then the call attempt will fail.
The telegram may be repeated up to the Maximum
Number of Retries, retries due to no Ack being received, and retries due
to Transmit Admit Criteria failure increment the number of repeats.
Telegram repeat can be programmed for any of the Acknowledge
Expected options (including No ACK).
If a decode is not received after the maximum number of repeats, then
the Call Failed text and Call Failed alert indications are given.
Telegram repeat is enabled/disabled per telegram.
The Acknowledge Duration is programmable per radio from 0 to 255 seconds.
The Maximum Number of Retries is programmable per radio.
Telegram repeat should not be programmed for a telegram programmed with
no Acknowledge Duration, and which is assigned to a PTT.
Notes
Available
when the radio is a Select 5 model.

### Test Mode

*Source: `(root)/Test_Mode.htm`*

Test Mode
(Expert Feature)
When checked, Test Mode operation is enabled and a Short-Press of the
P2 button during power-up allows the radio to enter Test Mode.
Notes
Available
when the radio is a Select 5 model.

### Time-Out Timer Delay

*Source: `(root)/Time-Out_Timer_Delay.htm`*

Time-Out Timer Delay
(Expert Feature)
Specifies the transmit time-out reset duration per Conventional
Personality.
Range is from 1 second to 255 seconds, in increments of 1 second.
Notes
This
feature is not available for radio
models that do not support this capability.
Available when
Receive
Only is unchecked.

### Time-Out Timer Type

*Source: `(root)/Time-Out_Timer_Type.htm`*

Time-Out Timer Type
(Expert Feature)
Selects the type of timer per transmission, while operating on the current
Conventional
Personality.
Choices
Functionality
Cumulative:
Is the cumulative total of one or more times
that the radio is allowed to transmit for the maximum amount, on the current
personality. Upon expiration of the timer, the radio dekey's (stops transmitting).
Non-Cumulative:
Is the maximum amount of time that the radio
is allowed to transmit continuously, on the current personality. Upon
expiration of the timer, the radio dekey's (stops transmitting).
Notes
Available
when Receive
Only is unchecked.
When Cumulative
is selected, Time-Out Timer Delay
will set to 15 seconds.
When Non-Cumulative
is selected, Time-Out Timer Delay will set to 0 seconds.

### Time-Out Timer Type (Select 5)

*Source: `(root)/Time-Out_Timer_Type_(Select_5).htm`*

Time-Out Timer Type (Select 5)
Selects the type of timer per transmission, while operating on the current
Personality.
Choices
Functionality
None:
Radio is able to transmit continuously.
Cumulative:
If selected, a radio will not be allowed
to transmit after the cumulative total of transmissions has exceeded the
time out timer period unless reset by a receive period, with muted speaker,
greater than the cumulative TOT reset duration. If the radio is PL squelched,
the TOT will be reset if the radio is receiving carrier for longer than
the cumulative reset duration time but does not detect its own PL in this
period.
Non-Cumulative:
If selected and if the PTT is pressed continually
for the TOT period, this option will then cause the radio to de-key after
expiration of the timer and a button/keypad error alert will sound for
the duration the PTT button remains pressed. The user will not be able
to re-key the radio until expiry of the transmitter time out re-key duration
timer.
The TOT will be reset when:
Cycling the power to
the radio.
Transmitting
on a new channel
Receiving
(mute or unmute) on a new channel until the TOT reset timer expires.
Receiving
an individual call.
Notes
Available
when the radio is a Select 5 model.
Available
when Tx Admit Criteria is not
set to 'Never Allowed'.
If enabled
the Tx Time-Out Pre Alert
may be given at a set time (5 seconds) prior to TOT expiration.

### Time-Out Timer (Menu)

*Source: `(root)/Time-Out_Timer_menu.htm`*

Time-Out Timer (Menu)
(Expert Feature)
Selects the amount of time the radio waits in Menu
Mode,
without any radio-user key press activity, before automatically exiting
out of Menu Mode. Range is from 1 second to 30 seconds, in increments
of 1 second.
Notes
Available
when the radio is a Display model.

### Tone A Code (QCII Call)

*Source: `(root)/Tone_A_Code_(QCII_Call).htm`*

Tone A Code (QCII Call)
Selects the Code correlating to the Tone
A Frequency to be transmitted for current Quik-Call
II
(QCII) - Call
List Member.
QCII Standard Tones are a subset of the QCII Frequency range. Therefore,
selecting a value for this field automatically selects a value for the
Tone A Frequency field.
Notes
Available
when the radio is a Display model.
When the
radio is capable of transmitting Call
Alerts
or Selective
Calls.
See Also
Codes
= Frequency List

### Tone A Frequency (QCII Call)

*Source: `(root)/Tone_A_Frequency_(QCII_Call).htm`*

Tone A Frequency (QCII Call)
Selects the frequency of the first tone to be transmitted for the current
Quik-Call
II
(QCII) -Call
List Member.
Selecting a value for this field automatically selects a value for the
Tone
A Code field. Some Frequencies may not have a correlating Code causing
nothing to display in the Code field. The range is from 288.5 Hz to 3086.0
Hz, in increments of 0.1 Hz.
Notes
Available
when the radio is a Display model.
When the radio
is capable of transmitting Call
Alerts
or Selective
Calls.

### Tone B Code (QCII Call)

*Source: `(root)/Tone_B_Code_(QCII_Call).htm`*

Tone B Code (QCII Call)
Selects the Code correlating to the Tone
B Frequency to be transmitted for the current Quik-Call
II
(QCII) - Call
List Member.
QCII Standard Tones are a subset of the QCII Frequency range. Therefore,
selecting a value for this field automatically selects a value for the
Tone B Frequency field.
Notes
Available
when the radio is a Display model.
When the QCII
Call
Format is set to Two Tone.
When the radio
is capable of transmitting Call
Alerts
or Selective
Calls.
See Also
Codes
= Frequency List

### Tone B Frequency (QCII Call)

*Source: `(root)/Tone_B_Frequency_(QCII_Call).htm`*

Tone B Frequency (QCII Call)
Selects the frequency of the second-tone to be transmitted for the current
Quik-Call
II
(QCII) - Call
List Member.
Selecting a value for this field automatically selects a value for the
Tone
B Code field. Some Frequencies may not have a correlating Code causing
nothing to display in the Code field. The range is from 288.5 Hz to 3086.0
Hz, in increments of 0.1 Hz.
Notes
Available
when the radio is a Display model.
When the QCII
Call
Format is set to Two Tone.
When the radio
is capable of transmitting Call
Alerts
or Selective
Calls.

### Tone Frequency

*Source: `(root)/Tone_Frequency.htm`*

Tone Frequency
Defines the nominal frequency of the encode or decode tone. Tones 0
to 9 & A - F can be set between 300 and 3000 Hz, in increments of
1 Hz.
Notes
Available
when the radio is a Select 5 model.

### Tone Span

*Source: `(root)/Tone_Span.htm`*

Tone Span
Selects the type of DTMF
tone length that is sent when dialing - while in the Phone
Mode,
and for the current Phone
System.
Choices
Functionality
Timed:
Causes a continuous DTMF tone to be generated
for the specified Tx Tone Duration timer setting.
Continuous:
Causes a continuous DTMF tone to be generated
for the entire length of the keypad depression.
Notes
Available
when the radio is a Display Mobile and Full Keypad Portable model.
For preprogrammed
one-touch Speed Dial, the �Timed� selection applies.

### Troubleshooting Group Tone/Repeat Tone

*Source: `(root)/Troubleshooting_Group_Tone_Repeat_Tone.htm`*

Troubleshooting Group Tone/Repeat Tone
Why I can't change Signaling
-> Select 5 Systems -> Sys N -> Group Tone/Repeat Tone?

### Tx Admit Criteria

*Source: `(root)/Tx_Admit_Criteria.htm`*

Tx Admit Criteria
When a channel is selected, the chosen option displayed in this option
box defines the operation of the transmitter when the PTT button is pressed.
Tx Admit Criteria options are used to prevent the operator from transmitting
on channels that are already being used.
If the radio has different transmit and receive frequencies, the receive
frequency only is monitored for activity and if nothing is found, the
radio will allow the user to transmit on the transmit frequency, even
if it is being used.
Choices
Functionality
Never Allowed:
This option prevents the user from transmitting
and operationally the channel is receive only.
Always Allowed:
This option allows the user to transmit
all the time.
Channel Free:
The radio inhibits any attempted transmission
if carrier only is currently being detected on the receive frequency.
Past PL/DPL Lockout:
The radio will only allow transmission when
carrier is not present, or when carrier is present if a PL
decode frequency for the radio has been detected on that channel since
carrier was detected.
Note
� carrier is assumed to be lost when the radio is keyed, so this criteria
must be satisfied again after de-key.
This option is required for the type of repeater
that only holds up carrier (not PL) during hang time, but where the radios
on the repeater use PL. It is used to prevent other users with different
PLs gaining access and control of the repeater during gaps in the conversation.
In this case the called radio, not receiving
PL during the hang time, must remember that it did receive the correct
PL prior to hang time and is therefore able to transmit.
PL/DPL Lockout:
Unless the PL/DPL code of the channel is
being detected, the radio will inhibit any attempt at transmission if
carrier is detected on the receive channel.
This option is required for the type of repeater
that holds up both carrier and PL during repeater hang time. Repeater
hang time is the period of time during which the repeater remains keyed
after a user�s radio has de-keyed.  It
is used to prevent other users with different PLs gaining access and control
of the repeater before a �called� radio with same PL has had chance to
reply.
Carrier Gone Timer Expired:
The radio will only allow transmission when
carrier has not been detected for a programmable period of time. The timer
will be reset for the duration of received carrier.
This option is used to prevent operators
currently not involved in calls transmitting over other users who may
be active on the channel, but are de-keyed with their auto-reset timers
running.
The duration of this timer can be set between
0 and 60 seconds in 1 second increments.
PL/DPL Not Detected:
The radio will only allow transmissions
when the PL decode frequency for the channel is not currently being detected.
Uses of this option are:
1) This option is used by PL users, where
there is a requirement to prevent PL users in the same group from transmitting
at the same time.
2) Where used on repeaters which transmit
PL during Repeater Hang Time, this option also allows PL users from a
different group to that last transmitting to gain access to a channel
during Repeater Hang Time. This prevents one group from �hogging� a channel.
Potential problems are:
1) Where used on repeaters which transmit
PL during Repeater Hang Time, users in the same group to that previously
transmitting cannot transmit during Repeater Hang Time, and hence causes
problems with enforced gaps in conversations between users in the same
group during Repeater Hang Time.
2) A PL user from one group can transmit
at the same time as a PL user in a different group.
3) Where used on repeaters which don�t
transmit PL during Repeater Hang timer users from any group can gain access
during Repeater Hang Time.
No PL/DPL or Past  PL/DPL:
The radio will only allow transmissions
when the PL decode frequency for the channel is not currently being detected,
or the PL decode frequency for the channel has not been detected since
carrier was detected.
Uses of this option are:
1) This option is used by PL users, where
there is a requirement to prevent PL users in the same group from transmitting
at the same time.
2)
Where used on repeaters which transmit PL during Repeater Hang Time, this
option also allows PL users from a different group to that last transmitting
to gain access to a channel during Repeater Hang Time.  This
prevents one group from �hogging� a channel.
Potential problems are:
1) Where used on repeaters which transmit
PL during Repeater Hang Time, users in the same group to that previously
transmitting cannot transmit during Repeater Hang Time, and hence causes
problems with enforced gaps in conversations between users in the same
group during Repeater Hang Time.
2) A PL user from one group can transmit
at the same time as a PL user in a different group.
Channel Free or  No PL/DPL but  Past
PL/DPL:
The radio will only allow transmissions
when the PL/DPL decode frequency for the channel is not currently being
detected or the PL decode frequency for the channel has not been detected
since carrier was detected.
Uses of this option are:
1) To prevent users in the same group talking
over each other.
2) If one group is monopolizing a repeater,
it allows another group to �break in� if:
a) A PL is transmitted during repeater
hang time.
b) A PL is not transmitted during repeater
hang time.
Potential problems are:
1) Should not be used on repeaters that
transmit PL during repeater hang time as users within the same group cannot
transmit during this period and this leads to enforced gaps in the conversation.
A PL user from one group can transmit at
the same time as a PL user from another group.
Notes
Available
when the radio is a Select 5 model.
Available
when PL dependent modes require PL code to be in use.
If 'Carrier
Gone Timer Expired' is chosen then Carrier
Gone Timer must be defined.

### Tx DPL Code (Select 5)

*Source: `(root)/Tx_DPL_Code_(Select_5).htm`*

Tx DPL Code (Select 5)
Selects the Digital
Private Line
(DPL) code that transmits while operating on the current Personality.
Non standard code frequencies may also be entered. Range is from 023 to
754 in octal numbers.
Notes
Available
when the radio is a Select 5 model.
Available
when Tx Squelch Type is set
to DPL.
See Also
Standard
Code List

### Tx DPL Invert (Select 5)

*Source: `(root)/Tx_DPL_Invert_(Select_5).htm`*

Tx DPL Invert (Select 5)
When checked, causes Digital
Private Line
(DPL) signals to be inverted before they are transmitted from the radio,
while operating on the current Personality.
Inverted coding allows for more traffic/usage on frequencies.
Notes
Available
when the radio is a Select 5 model.
Available
when Tx Squelch Type is set to DPL.
DPL Invert
must be set on both receiving and transmitting radios, and repeaters
for communication to occur.

### Tx Frequency (Select 5)

*Source: `(root)/Tx_Frequency_(Select_5).htm`*

Tx Frequency (Select 5)
Selects a designated frequency
used when transmitting carrier
for the current Personality.
Notes
Available
when the radio is a Select 5 model.
Increments
are dependent upon Channel
Bandwidth.

### Tx Hang Time

*Source: `(root)/Tx_Hang_Time.htm`*

Tx Hang Time
(Expert Feature)
Selects the maximum time that the radio waits between key presses (DTMF
digits) - when manually dialing a phone number, before Pretime
is automatically inserted before the transmission of the next digit. If
the Pretime value is required to be to a large duration, it can significantly
slow the dialing process. This feature applies while in Phone
Mode
for the current Phone
System.
Range is from 0 ms to 4500 ms, in increments of 25 ms.
Notes
Available
when the radio is a Display Mobile and Full Keypad Portable model.
If you do not
have complete knowledge of the system configuration that this radio will
be operating on, do not attempt to modify
this setting!

### Tx High Power Value (Select 5)

*Source: `(root)/Tx_High_Power_Value_(Select_5).htm`*

Tx High Power Value (Select 5)
For mobile radios this setting determines the wattage for the CPS
- Tx Power Level "High"
setting. The "High" setting can also be radio-user selected
with a programmable button press.
Tx High Power mode is used when a stronger signal is needed to extend
transmission distances.
For Low Power UHF/VHF mobile radios, the range is from 1 W to 25 W,
in increments of 0.5 W.
For High Power UHF mobile radios, the range is from 25 W to 40 W, in
increments of 0.5 W.
For High Power VHF mobile radios, the range is from 25 W to 45 W, in
increments of 0.5 W.
Notes
Available
when the radio is a Select 5 Mobile model.

### Tx LED

*Source: `(root)/Tx_LED.htm`*

Tx LED
When checked, causes a radio's LED to flash red while the radio is transmitting.
Notes
Available
when the radio is a Select 5 model.

### Tx LED (Acknowledges)

*Source: `(root)/Tx_LED_(ack).htm`*

Tx LED (Acknowledges)
For each defined acknowledgement block it is possible to disable Tx
LED indications that are normally given when the radio performs Auto
Acknowledgement or Call
Forward.
Notes
Available
when the radio is a Select 5 model.

### Tx Low Power Value (Select 5)

*Source: `(root)/Tx_Low_Power_Value_(Select_5).htm`*

Tx Low Power Value (Select 5)
For mobile radios, this setting determines the wattage for the CPS
- Tx Power Level "Low"
setting. The "Low" setting can also be radio-user selected with
a programmable button press.
Tx Low Power mode is used when communicating in close proximity, and
to keep the radio from transmitting into other geographical groups
operating on the same frequency.
For Low Power UHF/VHF mobile radios, the range is from 1 W to 25 W,
in increments of 0.5 W.
For High Power UHF mobile radios, the range is from 25 W to 40 W, in
increments of 0.5 W.
For High Power VHF mobile radios, the range is from 25 W to 45 W, in
increments of 0.5 W.
Notes
Available
when the radio is a Select 5 Mobile model.

### Tx Mode

*Source: `(root)/Tx_Mode.htm`*

Tx Mode
These options are used to define which channel the radio will transmit
after stopping on a channel.
Choices
Functionality
Scan Start Channel:
Selecting this option will cause the radio
to transmit on the channel for which the scan list applies.
Designated Channel:
This selection will cause the radio to transmit
on a programmable designated channel, which does not have to be part of
the scan list or the channel to which the scan list applies.
Last Free Channel:
This feature is more associated with �SmarTrunk��
operation. The radio will always transmit on the last free channel of
the scan list.
Last Busy Channel:
The radio will always transmit on the last
busy channel of the scan list.
Voted:
Scan will operate in Vote
Scan mode.
Notes
Available
when the radio is a Select 5 model.
'Last
Free Channel' and 'Last Busy Channel' are available when Vote
Scan is disabled.
'Voted'
is available when Vote Scan is enabled.

### Tx Parameters Include (Select 5)

*Source: `(root)/Tx_Parameters_Include_(Select_5).htm`*

Tx Parameters Include (Select 5)
Tx
Frequency
Tx
Squelch Type
Tx
TPL Frequency
Tx
TPL Code
Tx
DPL Code
Tx
DPL Invert

### Tx Power Level (Menu)

*Source: `(root)/Tx_Power_Level_(Menu).htm`*

Tx Power Level (Menu)
When checked, enables the Tx
Power Level feature to be included in the Utility menu. This allows
the radio-user to adjust the Transmit Power setting (radio-wide) to �High�
or �Low�.
Radio-wide Power Level functionality can also be assigned to a (short
or long) programmable button-press.
Notes
Available
when the radio is a Display model.

### Tx Power Level (Select 5)

*Source: `(root)/Tx_Power_Level_(Select_5).htm`*

Tx Power Level (Select 5)
Selects the transmit power level while operating on the current Personality.
For portable radios this feature can extend radio battery life.
Certain radio models offer the ability to manually change the Power Level setting via the Menu or a radio-user (short
or long) programmable button-press.
Choices
Functionality
Low:
Used when communicating in close proximity,
and to keep the radio from transmitting into other geographical groups
operating on the same frequency.
High:
Used when a stronger signal is needed to
extend transmission distances.
Notes
Available
when the radio is a Select 5 model.

### Tx Reference Frequency (Select 5)

*Source: `(root)/Tx_Reference_Frequency_(Select_5).htm`*

Tx Reference Frequency (Select 5)
(Expert Feature)
Selects the Reference Frequency used
when transmitting on the current Personality.
Choices available
are:
2.100 MHz
2.225 MHz
2.400 MHz
Automatic
Notes
It is
possible to disable the radio's ability to receive and or transmit data.
If you are not fully aware of the impact of this setting, DO
NOT MODIFY IT!

### Tx Squelch Type (Select 5)

*Source: `(root)/Tx_Squelch_Type_(Select_5).htm`*

Tx Squelch Type (Select 5)
Selects the type of Private
Line
(PL) or Carrier
Squelch
that the radio transmits, while operating on the current Personality.
Choices
Functionality
(CSQ)
Does not transmit PL code.
(TPL)
Transmits TPL
code.
(DPL)
Transmits DPL
code.
Notes
Available
when the radio is a Select 5 model.

### Tx TPL Code (Select 5)

*Source: `(root)/Tx_TPL_Code_(Select_5).htm`*

Tx TPL Code (Select 5)
Selects the specific code accepted when transmitting Tone
Private Line
(TPL) decoding, while operating on the current Personality.
This code can directly correlate to the Tx
TPL Frequency field. That is, selecting a value for this field automatically
selects a Tx TPL Frequency; however, non standard frequencies may also
be selected.
Notes
Available
when the radio is a Select 5 model.
Available
when Tx Squelch Type is set
to TPL.
When a
non-standard TPL frequency is set, the TPL code will be set to Blank.
See Also
Frequency/Codes
List

### Tx TPL Frequency (Select 5)

*Source: `(root)/Tx_TPL_Frequency_(Select_5).htm`*

Tx TPL Frequency
Selects a designated frequency
used to transmit Tone
Private Line
(TPL) decoding, while operating on the current Personality. This frequency
can directly correlate to the Tx
TPL Code field; however, non standard code frequencies may also be
selected. Range is from 65.0 Hz to 255.0 Hz, in increments of 0.1 Hz.
Notes
Available
when the radio is a Select 5 model.
Available
when Tx Squelch Type is set
to TPL.
See Also
Frequency/Codes
List

### Tx Time-Out Timer

*Source: `(root)/Tx_Time-Out_Timer_(select_5).htm`*

Tx Time-Out Timer
Selects the maximum amount of communication time allowed per transmission,
while operating on the current Personality.
Once this time expires, the transmission is automatically terminated.
Range is 5 seconds to 255 seconds, in increments of 1 second.
Notes
Available
when the radio is a Select 5 model.

### Tx Time-Out Timer Pre Alert

*Source: `(root)/Tx_Time-Out_Timer_Pre_Alert.htm`*

Tx Time-Out Timer Pre Alert
This is sounded 5 seconds prior to the expiration of the Tx
Time-Out Timer.
Available choices are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model.

### Tx Tone Duration (DTMF)

*Source: `(root)/Tx_Tone_Duration_(DTMF).htm`*

Tx Tone Duration (DTMF)
(Expert Feature)
Selects the amount of time that a single DTMF
tone is transmitted for manually dialed digits, and when the Tone
Span
field is set to Timed. Once the Tx Tone Duration ends, the Tx Tone Interval begins, and vice-versa. This applies for
the current DTMF Signaling
System.
The range is from 25 ms to 6400 ms, in increments of 25 ms.
Notes
If you
do not have complete knowledge of the system configuration that this radio
will be operating on, do not attempt
to modify this setting!

### Tx Tone Duration (Phone)

*Source: `(root)/Tx_Tone_Duration_phone.htm`*

Tx Tone Duration (Phone)
(Expert Feature)
Selects the amount of time that a single DTMF
tone is transmitted for manually dialed digits, and when the Tone Span field is set to Timed. Once the Tx Tone Duration
ends, the Tx Tone Interval begins, and vice-versa. This
field automatically applies during a preprogrammed Speed Dial, even when
the Tone Span field is not set
to Timed. This feature applies while in Phone
Mode
for the current Phone
System.
The range is from 25 ms to 6400 ms, in increments of 25 ms.
Notes
Available
when the radio is a Display model.
If you do not
have complete knowledge of the system configuration that this radio will
be operating on, do not attempt to modify
this setting!

### Tx Tone Interval (DTMF)

*Source: `(root)/Tx_Tone_Interval_(DTMF).htm`*

Tx Tone Interval (DTMF)
(Expert Feature)
Selects the amount of time that the radio waits between DTMF
digits during a preprogrammed Speed Dial. Once the Tx Tone Duration
ends, this Tx Tone Interval begins, and vice-versa. This applies for the
current DTMF Signaling
System.
The range is from 25 ms to 6400 ms, in increments of 25 ms.
Notes
If you
do not have complete knowledge of the system configuration that this radio
will be operating on, do not attempt
to modify this setting!

### Tx Tone Interval (Phone)

*Source: `(root)/Tx_Tone_Interval_phone.htm`*

Tx Tone Interval (Phone)
(Expert Feature)
Selects the amount of time that the radio waits between DTMF
digits during a preprogrammed Speed Dial. Once the Tx Tone Duration
ends, this Tx Tone Interval begins, and vice-versa. This feature applies
while in Phone
Mode
for the current Phone
System.
The range is from 25 ms to 6400 ms, in increments of 25 ms.
Notes
Available
when the radio is a Display model.
If you do not
have complete knowledge of the system configuration that this radio will
be operating on, do not attempt to modify
this setting!

### Unmute/Mute Rule

*Source: `(root)/Unmute_Mute_Rule_EMEA.htm`*

Unmute/Mute Rule
(Expert Feature)
Selects the rule that determines when a radio
unmutes
and mutes
its speaker to receive audio for the current Conventional
Personality.
The Unmute/Mute
rule
applies when PL is the selected Rx
Squelch Type for the current Conventional Personality. Unmuting opens
the speaker. Muting closes the speaker.
Choices
Functionality
Std Unmuting, Std Muting:
To unmute on Proper Private
Line
(PL) code detection, and to mute on loss of
proper PL code.
And Unmuting, Std Muting:
To unmute on Proper PL code detection And Carrier
Squelch Detect, and to mute on loss of proper PL code.
And Unmuting, Or Muting:
To unmute on Proper PL code detection And Carrier Squelch Detect, and to mute
on loss of proper PL code Or loss
of Carrier Squelch Detect.
Notes
Available
when Rx Squelch Type is set to
TPL or DPL.
If Rx
Squelch Type is set to CSQ this feature will set to Std Unmuting, Std
Muting.
Proper refers
to there being a code match between the transmitting radio�s Tx
DPL and Tx
TPL codes, and the receiving radio�s Rx
DPL and Rx TPL codes.

### Use Decoder Status List

*Source: `(root)/Use_Decoder_Status_List.htm`*

Use Decoder Status List
The radio may be programmed such that there is only one status list
which contains both Encode and Decode Status entries by enabling Use Decoder
Status List. If Use Decoder Status List is selected, the Encode Status
List is disabled and Decode Status List is used for both Encode and Decode
Status.
Notes
Available
when the radio is a Select 5 Display model.

### VOX (Select 5)

*Source: `(root)/VOX_(Select_5).htm`*

VOX (Select 5)
When checked, enables the radio to automatically key-up
due to recognition of voice received through an Accessory Connector headset
microphone on a Portable radio. This feature applies while operating on
the current Personality.
See Also
VOX
Feedback
VOX
Sensitivity
VOX
Hold Time

### VOX Feedback

*Source: `(root)/VOX_Feedback.htm`*

VOX Feedback
(Expert Feature)
When checked, allows the user to hear the transmitted audio in the headset.
This provides the user with a transmitting indication when the transmit
LED is either disabled or not visible.
Notes
Available
when the radio is a Select 5 Portable model.

### VOX Hold Time

*Source: `(root)/VOX_Hold_Time.htm`*

VOX Hold Time
(Expert Feature)
VOX Hold Time is a programmable time period of between 0.1 and 25.5
seconds, during which the VOX remains active to allow for pauses in conversation,
preventing the radio dropping out of transmit and so loosing the channel.
The other option is VOX enable / disable and this is on a per channel
basis.
Notes
Available
when the radio is a Select 5 model.

### VOX Sensitivity

*Source: `(root)/VOX_Sensitivity.htm`*

VOX Sensitivity
(Expert Feature)
This option allows a microphone gain of either 8 dB or 25 dB to be selected.
Notes
Available
when the radio is a Select 5 model.

### Voice Pre-emphasis/De-emphasis

*Source: `(root)/Voice_Pre-emphasis_De-emphasis.htm`*

Voice Pre-emphasis/De-emphasis
When checked, provides a filtering algorithm, used by the ASFIC, to
reduce the signal noise ratio in two-way radio RF systems. Pre-emphasis
is used to filter the transmit signal and De-emphasis is used to filter
the receive signal.
Notes
Available
when the radio is a Select 5 model.

### Voice Storage

*Source: `(root)/Voice_Storage.htm`*

Voice Storage
This feature is used to enable/disable voice storage of messages/received
audio.
The Voice Storage feature allows the user to perform the following voice-related
tasks:
Choices
Functionality
Disabled:
Emergency Voice Message:
This Voice Storage feature allows the radio
user to record an emergency message, which will automatically be played
back during the Emergency Tx Cycle.
Emergency
Voice Message is also selectable via the radio's programmable menu.
Note:
If this option is chosen, no other form of recording can be enabled/used,
even if only 1 slot of memory is used to record the emergency message.
Recorder:
This Voice Storage feature allows the radio
user to record a memo.
Recoder
is also selectable via the menu.
Notes
Available
when the radio is a Select 5 model that supports Voice Storage.

### Voice Storage Cancel Message Alert

*Source: `(root)/Voice_Storage_Cancel_Message_Alert.htm`*

Voice Storage Cancel Message Alert
(Expert Feature)
Indicates that a played-back message from voice storage is deleted.
Choices
available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model that supports Voice Storage.

### Voice Storage Emergency Message

*Source: `(root)/Voice_Storage_Emergency_Message.htm`*

Voice Storage Emergency Message
When checked, enables the Emergency Voice
Message feature to be in the Voice Storage menu.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Voice Storage Full Alert

*Source: `(root)/Voice_Storage_Full_Alert.htm`*

Voice Storage Full Alert
Indicates storage space is full and that the radio has stopped recording.
Choices
available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model that supports Voice Storage.

### Voice Storage Recorder

*Source: `(root)/Voice_Storage_Recorder.htm`*

Voice Storage Recorder
When checked, enables the Recorder feature
to be in the Voice Storage menu.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Display model.

### Voice Storage Recording Alert

*Source: `(root)/Voice_Storage_Recording_Alert.htm`*

Voice Storage Recording Alert
Indicates recording of a message or audio.
Choices available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model that supports Voice Storage.

### Voice Storage Warning Alert

*Source: `(root)/Voice_Storage_Warning_Alert.htm`*

Voice Storage Warning Alert
(Expert Feature)
Pre-alert indicates full storage alert is imminent.
Choices
available are:
Disabled
Fixed
Variable
Notes
Available
when the radio is a Select 5 model that supports Voice Storage.

### Vote Delay

*Source: `(root)/Vote_Delay.htm`*

Vote Delay
(Expert Feature)
When the radio is in Vote Scan operation
and it detects a signal on the scan channel, the radio will suspend the
Vote Scan operation for the delay period that is designated. When the
delay timer times out, the radio will resume the Vote Scan operation.
The timer can be set from 0ms to 10000ms, in increments of 25ms. The timer
is disable if set to 0ms.
Notes
Available
when the radio is a Select 5 model.
Available
when the codeplug version is equal to or higher than 4.00.

### Vote Scan

*Source: `(root)/Vote_Scan.htm`*

Vote Scan
(Expert Feature)
Used in multi-frequency simulcast systems that provide wide area repeater
coverage in applications where frequency spectrum is readily available.
The typical system has a set of scattered base sites that are transmitting
the same information on different frequencies. The radio scans the frequencies
of these base sites and perform a voting algorithm to select the closest
base site.
The radio's transmit frequency will typically be the same on every channel,
but the radio's receive frequencies will be different.
The voting algorithm adopted is briefly described below:
Perform �Fast Vote
Scan�. In this scan operation the radio will only check channels with
a Fast Vote RSSI level equal to or greater than that set in the Fast
Vote RSSI Level option box. During the Fast Vote, a record will be
kept up to date of the three strongest channels.
Perform �Vote Scan�. This scan operation is performed
if no channel is found during �Fast Vote� which has a Fast Vote RSSI level,
and the correct signalling conditions. In �Vote� scan the radio will stop
on the channel checked during the �Fast Vote', which has the strongest
RSSI. The radio will only stop on a channel during �Vote� scan if a channel
exists with the correct signalling conditions and an RSSI greater than
or equal to that set in the Start
Scan RSSI Level option box
The radio will continue to switch between �Fast
Vote� Scan and �Vote� scan until it stops on a channel or scan is stopped.
During fast vote scan, the radio will look
for a channel with an RSSI level equal to, or greater than the pre-programmed
Fast Vote RSS Level. The level can be set from -70 to -120 dBm, in increments
of 1 dBm.
The radio will stop on the first channel with the RSSI level equal to,
or greater than the pre-programmed Fast Vote RSS Level that meets the
squelch criteria.
Once a radio stop on a channel, the Fast Vote scan will stop.
When performing �Fast Vote Scan�, the radio scans each channel in the
scan list order and records the RSSI level when carrier is detected.
If no carrier is detected on a channel and:
The channel is �marked�,
it will cease to be �marked� and the radio will move to the next channel
in the scan list. Note: �Marked�
refers to the automatic nuisance channel delete/re-instate feature of
the radio when in �Fast Vote Scan�.
If the channel is not marked, the radio will move
to the next channel in the scan list.
If carrier is detected on the channel, the
RSSI level is measured and stored.
If the channel was
marked, it will remain marked and the radio will move to the next channel
in the scan list;
If the RSSI level is equal to, or greater than
the Fast Vote RSS Level, the squelch criteria is checked:
If the squelch is 'Carrier
Squelch', the radio lands on that channel, unmutes the radio and exits
Fast Scan.
If
the squelch is 'PL/DPL Squelch', the radio will Unmute, if the Early
Unmute option is enabled, otherwise it will remain muted:
If
the PL is correct, the radio lands on that channel, unmutes the radio
and exits Fast Scan.
If the PL is incorrect,
the radio mutes if the 'Early Unmute' option is enabled, the channel is
�Marked� and the radio will move to the next channel in the scan list.
If the RSSI level is less than the Fast Vote RSS
Level, the radio will move to the next channel in the scan list.
If the radio completes the 'Fast Vote' scan
without stopping the radio will then go into the �Vote� scan mode.
Notes
Available
when the radio is a Select 5 model.
The following
features should be disabled when Vote Scan is used.
Sweep Time
Priority Scan
Include current channel
Nuisance Channel Delete
Auto Acknowledge
Carrier Squelch Only
Channels
with the following features enabled should not
be allowed in Vote Scan lists:
Select 5 Squelch
Busy Channel Lockout

### Whisper

*Source: `(root)/Whisper.htm`*

Whisper
(Expert Feature)
When checked, increases the radio microphone
gain
to allow the user to speak quietly.
If the radio is keyed via the internal microphone in whisper mode, the
radio uses the Internal Microphone Gain setting, but if the radio is keyed
via the external microphone in whisper mode, then the radio uses the External
Microphone Gain setting.
Whisper can also be selected by a radio-user (short or long programmable
button-press) or through the Whisper menu
selection.
Notes
Available
when the radio is a Select 5 Portable model.

### Whisper Mode

*Source: `(root)/Whisper_Mode.htm`*

Whisper Mode
(Expert Feature)
When checked, increases the radio microphone
gain
to allow the user to speak quietly.
If the radio is keyed via the internal microphone in whisper mode, the
radio uses the Internal Microphone Gain setting, but if the radio is keyed
via the external microphone in whisper mode, then the radio uses the External
Microphone Gain setting.
Whisper can also be selected by a radio-user (short or long programmable
button-press).
Notes
Available
when the radio is a Portable model.
Available when
Receive
Only is unchecked.
Available when
Companding
Mode is not checked.

### Whisper (Menu)

*Source: `(root)/Whisper_menu).htm`*

Whisper (Menu)
When checked, enables Whisper to be included
in the Utilities menu. This increases the microphone gain to allow the
user to speak quietly.
This same functionality can be assigned to a (short or long) programmable
button-press.
Notes
Available
when the radio is a Select 5 Portable Display model.

### Access Code

*Source: `(root)/_Access_Code_pop.htm`*

Access Code
Specifies the 8 digit Access Code for the current Phone System. The
Access Code allows a connection to a telephone line and subsequent dial
tone.

### Access/Deaccess Type

*Source: `(root)/_Access_Deaccess_Type_pop.htm`*

Access/Deaccess Type
Selects the method used to send the Access and Deaccess codes that are
defined for the current Phone System. This feature applies while in Phone
Mode for the current Phone System.

### Ack Value

*Source: `(root)/_Ack_Value.htm`*

Ack Value
Selects the type of acknowledgment that is sent back when the radio
receives a DTMF call, for the current DTMF Signaling Systems.

### Active Level

*Source: `(root)/_Active_Level.htm`*

Active Level
The Active Level is the voltage setting for the Accessory
Connector�s fully programmable pins.

### Active Scan Mode

*Source: `(root)/_Active_Scan_Mode.htm`*

Active Scan Mode
When in Scan Mode, and when the radio is rapidly
moving through the Scan List Member channels looking for eligible transmission
activity to receive - or unmute to. The radio�s LED flashes green during
active scan.

### Alert On/Off

*Source: `(root)/_Alert_On_Off.htm`*

Alert On/Off
When checked, enables the Alert On/Off feature to be included in the
Tones menu. This allows the radio-user to toggle on and off all Alert
Tones.

### Alert Tone Fixed Volume

*Source: `(root)/_Alert_Tone_Fixed_Volume.htm`*

Alert Tone Fixed Volume
When checked, causes all alert tones to remain at a constant volume
level. This constant volume level is equal to the radio�s Midpoint Volume
Setting, plus or minus the Alert Tone Volume Offset setting. The audio
level for alert tones then remains at this constant, even when the radio�s
Volume Knob is adjusted.
When not checked, causes all alert tones volume levels to be adjustable
with the radio�s Volume Knob.

### Asynchronous Communications

*Source: `(root)/_Asynchronous_Communications.htm`*

Asynchronous Communications
A method of data communications in which information
is transmitted one character at a time, with no specific starting time.
Each character is preceded by a start bit and followed by one (or more)
stop bit(s).

### Backlight

*Source: `(root)/_Backlight.htm`*

Backlight
When checked, allows the radio-user to select the brightness level of
a mobile radio�s Control Head.

### Backlight On/Off

*Source: `(root)/_Backlight_On.htm`*

Backlight On/Off
Enables users to toggle the backlight between Off and On (backlight
On mode may be Permanent or Timed).

### Bandwidth

*Source: `(root)/_Bandwidth.htm`*

Bandwidth
The Width of the frequency band that is available
for radio communications.

### Battery Indicator (display)

*Source: `(root)/_Battery_Indicator_(display).htm`*

Battery Indicator (display)
The Radio�s represents the following indications based on current battery
charge levels.
Battery Level
Display
Full
=
Good
=
Fair
=
Low
Very Low
=

### CPS

*Source: `(root)/_CPS.htm`*

CPS
Acronym for Customer Programming Software. Licensed
Motorola software used to program two-way radios with a unique set of
features.

### CTCSS

*Source: `(root)/_CTCSS.htm`*

CTCSS
Acronym for Continuous Tone Coded Squelch System.
A generic term for sub-audible tone/ code used to create communications
groups. Also See �PL�.

### Calibration

*Source: `(root)/_Calibration.htm`*

Calibration
The means of teaching the radio how to adjust itself
for optimum performance. To Calibrate.

### Call Alert

*Source: `(root)/_Call_Alert.htm`*

Call Alert
A Signaling System - Radio Call that allows a dispatcher
or radio-caller to notify a targeted radio-user of a missed call.

### Call Alert (menu)

*Source: `(root)/_Call_Alert_(menu).htm`*

Call Alert
When checked, enables the Call Alert feature to be included in the Radio
Call menu. This allows the radio-user the ability to transmit Call Alerts.

### Call Alert w/voice

*Source: `(root)/_Call_Alert_w_voice.htm`*

Call Alert w/Voice
A radio call with voice.

### Call Format (QCII Call)

*Source: `(root)/_Call_Format_(QCII_Call).htm`*

Call Format (QCII Call)
Selects the Call Tone Type for the current Quik-Call II (QCII) - Call
List Member.

### Call Forward

*Source: `(root)/_Call_Forward.htm`*

Call Forward
Enters mode whereby an individual call causes the radio to transmit
the call forward telegram.
This feature is used more on mobile radios and it allows the user to
leave the vehicle. If the vehicle receives an individual call, it will
transmit a telegram to the forwarding radio. This radio will open and
assuming both radios have the same PL the call will take place.
A radio can also call forward to a pager and alert the user to the call.

### Call LED

*Source: `(root)/_Call_LED.htm`*

Call LED
When checked, causes the receiving radio to blink its LED when it has
received a Call Alert for the current Quik-Call II (QCII) Signaling System
or DTMF Signaling System. The radio�s LED double-flashes yellow for the
A-B call format and single-flashes yellow for the other call formats.

### Call List

*Source: `(root)/_Call_List.htm`*

Call List
The Call List window allows you to view-only all Call List Members that
exist. The Call List allows the radio-user to select, and transmit to
a specific radio, or group of radios. Only one Call List can exist per
radio.
Call List Members are created, deleted, and defined in the window correlating
with their Signaling System type.

### Call List Member

*Source: `(root)/_Call_List_Member_pop.htm`*

Call List Member
A listing that allows the radio-user to select a Call List Member, then
allows the radio-user to transmit to that Member�s radio, or group of
radios. Call List Members are defined by a Signaling System type and other
CPS-user defined functionality.

### Call Tone Tag

*Source: `(root)/_Call_Tone_Tag.htm`*

Call Tone Tag
When checked, enables the Call Tone Tag feature to be included in the
Tones menu. This allows the radio-user to select which tone sounds when
receiving a Call Alert or a Selective Call. There are several ring tones
to choose from.

### Call Type

*Source: `(root)/_Call_Type.htm`*

Call Type
Selects the type of Call Alerts that can be received for the current
Quik-Call II (QCII) Signaling System or DTMF Signaling System. A Call
Alert allows a transmitting radio to notify (with an alert tone) and leave
evidence of (by lighting the LED) a call on a receiving radio while the
radio-user is away. The Call LED persists until reset by the user.

### Calls 1, 2, 3, or 4

*Source: `(root)/_Calls_1,_2,_3,_or_4.htm`*

Calls 1, 2, 3, or 4
Buttons can be programmed with these calls and can then be used to transmit
their assigned telegram.

### Cancel Voice Message

*Source: `(root)/_Cancel_Voice_Message.htm`*

Cancel Voice Message
Deletes message being played back from voice storage.

### Carrier

*Source: `(root)/_Carrier.htm`*

Carrier
An electromagnetic signal that is transmitted on
a selected frequency for the purpose of carrying voice or data transmissions
along with it. Carrier can then be received by all radios listening on
that frequency.

### Carrier Gone Timer

*Source: `(root)/_Carrier_Gone_Timer.htm`*

Carrier Gone Timer
Allows the radio to transmit when carrier has not been detected for
a programmable period of time. The timer will be reset for the duration
of the received carrier.
This option is used to prevent operators, currently not involved in
calls, from transmitting over other users who may be active on the channel,
but are de-keyed with their auto-reset timers running. Range is from 0
seconds to 60 seconds, in increments of 1 second.

### Carrier Squelch (CSQ)

*Source: `(root)/_Carrier_Squelch_(CSQ).htm`*

Carrier Squelch (CSQ)
When the carrier energy exceeds the CPS-selected
or radio-designated carrier energy threshold, known as the Squelch Setting/Threshold.

### Carrier Squelch Detect

*Source: `(root)/_Carrier_Squelch_Detect.htm`*

Carrier Squelch Detect
When the carrier energy exceeds the CPS-selected
or radio-designated carrier energy threshold, known as the Squelch Setting/Threshold.
Carrier is an electromagnetic signal that is transmitted
on a selected frequency for the purpose of carrying voice or data transmissions
along with it. Carrier can then be received by all radios listening on
that frequency.

### Channel

*Source: `(root)/_Channel.htm`*

Channel
A single path separated by frequency or time divisions
used for transmitting and or receiving voice and or data.
Unique radio channel functionality can be assigned
to the radio�s Channel Selector as individual Personalities.

### Channel Power Toggle

*Source: `(root)/_Channel_Power_Toggle.htm`*

Power Level
This allows the radio-user to adjust the Transmit Power setting to �High�
or �Low�.
The �per channel� power level may be overridden
by toggling a button programmed for Power Level.

### Channel

*Source: `(root)/_Channel_list.htm`*

Channel
Radio will go directly to the Channel List programmable menu feature.

### Clone

*Source: `(root)/_Clone.htm`*

Cloning Radios
The CPS allows cloning the configuration of one radio into another radio
of the same model.

### Codeplug

*Source: `(root)/_Codeplug.htm`*

Codeplug
A solid-state chip inside a radio where the radio�s
personality data is stored. Personality data is created using the Motorola
Customer Programming Software (CPS). CPS defined data can be transferred
to the radio�s chip or to a codeplug file. Codeplug files can be archived
on the computer�s hard drive for later use

### Communications Port (COM Port)

*Source: `(root)/_Communications_Port_(COM_Port).htm`*

Communications Port (COM Port)
A serial hardware interface connection at the back
of a computer used to communicate with other hardware devices, such as
radios, modems, and printers. Also known as a Serial Port. COM Ports are
designated by slot positions such as COM1, COM2, COM3, COM4.
When programming a radio, the radio must be connected
to a RIB cable that connects to a Radio Interface Box. The Radio Interface
Box is then connected to the COM Port of the computer. The computer�s
CPS COM Port setting applies to the Read, Write, and Clone features. The
CPS COM Port is independent for each instance of the CPS that is running.
1.
From the Edit menu choose Preferences.
2.
Select the communications port.
Notes
The
CPS uses the last saved COM Port setting when it is launched.

### Community RPTR (ZR310) Rx (Select 5)

*Source: `(root)/_Community_RPTR_(ZR310)_Rx_(Select_5).htm`*

Community RPTR (ZR310) Rx (Select 5)
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Unassigned
Input
Disabled
Low
4
Carrier Detect
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Flat Audio (Unfiltered)

### Community RPTR (ZR310) Tx (Select 5)

*Source: `(root)/_Community_RPTR_(ZR310)_Tx_(Select_5).htm`*

Community RPTR (ZR310) Tx (Select 5)
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Voice PTT
Input
Enabled
Low
4
Carrier Detect
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Flat Audio (Unfiltered)

### Companding Mode

*Source: `(root)/_Companding_Mode.htm`*

Companding Mode
Allows further improvement of voice quality. It compresses
your voice at transmission, and expands it when receiving while simultaneously
reducing extraneous noise. However, to enjoy this benefit, all transmitting
and receiving radios must have this feature activated.

### Contact List

*Source: `(root)/_Contact_List.htm`*

Contact List
Allows the user to go directly to the Contact List programmable menu
feature.

### Contact Multicall

*Source: `(root)/_Contact_Multicall.htm`*

Contact Multicall
Radio will go directly to the Telegram number.

### DOS

*Source: `(root)/_DOS.htm`*

DOS
Data Operated Squelch

### DOS Coast Duration

*Source: `(root)/_DOS_Coast_Duration.htm`*

DOS Coast Duration
Selects an amount of time that the radio waits muted once the Carrier
Squelch signal has been lost. This applies for the current MDC - Signaling
System. The range is from 0 ms to 500 ms, in increments of 25 ms.
When MDC Signaling data is detected and then once the Carrier Squelch
signal is lost - this timer begins. While this timer is active the radio
waits muted for Carrier Squelch to be re-detected. If Carrier Squelch
is re-detected while this timer is running; this timer is stopped and
reset, and the DOS Auto Mute Duration (timer) begins again.

### DOS Criteria Type

*Source: `(root)/_DOS_Criteria_Type.htm`*

DOS Criteria Type
Selects the frequency type used to determine DOS activation, for the
current MDC - Signaling System.

### DOS Fixed Retry Wait Time

*Source: `(root)/_DOS_Fixed_Retry_Wait_Time.htm`*

DOS Fixed Retry Wait Time
This duration is added to the CPS-calculated retry-wait-duration for
Polite and Impolite transmissions. This has the effect of randomly staggering
retry attempts, in an effort to have unsynchronized retry attempts from
competing radios. This applies for the current MDC - Signaling System.
The range is from 0 seconds to 17 seconds, in increments of 0.1 seconds.

### DTMF Keypad

*Source: `(root)/_DTMF_Keypad.htm`*

DTMF Keypad
Places the keypad in DTMF mode.

### DTMF System

*Source: `(root)/_DTMF_System.htm`*

DTMF System
Selects the DTMF Signaling System to be used by the current DTMF - Call
List Member.

### DTMF

*Source: `(root)/_DTMF_pop.htm`*

Dual Tone Multiple Frequency (DTMF)
A Signaling System protocol widely used in the telephone
industry. Two tones are transmitted simultaneously at different amplitudes
for each keypad key press. A sequential series of Dual Tones makes a data
word.

### DVM

*Source: `(root)/_DVM.htm`*

DVM
Acronym for Digital Volt Meter.

### Data Operated Squelch (DOS)

*Source: `(root)/_Data_Operated_Squelch_(DOS).htm`*

Data Operated Squelch (DOS)
DOS causes the radio�s speaker to automatically mute
when receiving signaling data. This helps to reduce unwanted noise.

### De-key

*Source: `(root)/_De-key.htm`*

De-key
To release the PTT button and stop transmitting.

### Deaccess Back Porch Delay

*Source: `(root)/_Deaccess_Back_Porch_Delay.htm`*

Deaccess Back Porch Delay
Selects the amount of time the radio remains in Phone Mode after sending
the Deaccess code. This allows the radio a transition time to re-establish
normal Conventional Personality operation. Range is from 0 seconds to
3.5 seconds, in increments of 0.5 seconds.

### Deaccess Code

*Source: `(root)/_Deaccess_Code_pop.htm`*

Deaccess Code
Specifies the 8 digit Deaccess Code for the current Phone System. The
Deaccess Code causes disconnection from a phone call.

### Decode

*Source: `(root)/_Decode.htm`*

Decode
When the radio receives a voice or data call.

### Designated Tx Personality

*Source: `(root)/_Designated_Tx_Personality.htm`*

Designated Tx Personality
When the radio is in Landed Scan, selects a transmit Conventional Personality
to be used for the current Scan List and while operating in Scan Mode.
Personality selections are CPS given names. For example; Conventional-1.

### Dial Type

*Source: `(root)/_Dial_Type_pop.htm`*

Dial Type
Selects the method that the radio uses to transmit the DTMF digits -
dialed by the radio-user, while in the Phone Mode. This applies for the
current Phone System.

### Digital Private Line (DPL)

*Source: `(root)/_Digital_Private_Line_(DPL).htm`*

Digital Private Line (DPL)
Transmitted when the receiving radio is to only receive
calls from radios with specific DPL codes, this creates communications
groups while operating in Conventional Dispatch mode. DPL is a digital
format transmitted along with the carrier. DPL allows for more use and
privacy on a frequency. DPL is transmitted at a sub-audible (not able
to be heard) frequency. Also known as Channel Guard, Quiet Call, and CTCSS.

### EEPROM

*Source: `(root)/_EEPROM.htm`*

EEPROM
Acronym for Electronically Erasable Programmable Read Only Memory. Used
by the radio microcomputer system to store the radio�s codeplug data.

### Emergency

*Source: `(root)/_Emergency.htm`*

Emergency
Allows the radio-user to activate the radio's programmed emergency options.

### Emergency Ack Alert

*Source: `(root)/_Emergency_Ack_Alert.htm`*

Emergency Ack Alert
When checked, causes the radio to sound an alert tone when an Emergency
Transmission acknowledgement is received. The acknowledgement is sent
back from the receiving radio, confirming a successful Emergency Transmission.

### Emergency Alert

*Source: `(root)/_Emergency_Alert.htm`*

Emergency Alert
When checked, causes the radio to sound an alert tone when the Emergency
Button is pressed initiating the Emergency Mode.

### Emergency Decode

*Source: `(root)/_Emergency_Decode.htm`*

Emergency Decode
When the radio is able to receive Emergency Mode signaling.

### Emergency Impolite Retries

*Source: `(root)/_Emergency_Impolite_Retries.htm`*

Emergency Impolite Retries
When in Emergency Mode, this feature selects the number of times the
radio impolitely sends an Emergency Transmission, even when the channel
is currently busy with other radio traffic. This is known as an Impolite
Transmission.

### Emergency LED

*Source: `(root)/_Emergency_LED.htm`*

Emergency LED
When checked, causes the transmitting radio�s LED to continuously light-up
during Emergency Mode.

### Emergency Long Press Duration

*Source: `(root)/_Emergency_Long_Press_Duration.htm`*

Emergency Long Press Duration
Selects the amount of time that the radio�s Emergency button must be
continuously pressed to end the Emergency Mode.

### Emergency Long Sidetone

*Source: `(root)/_Emergency_Long_Sidetone.htm`*

Emergency Long Sidetone
When checked, causes the transmitting radio to sound an alert tone every
time the Emergency Data Packet is sent during Emergency Mode. The Emergency
Data Packet contains information as to which radio was the source of the
transmission.

### Emergency Mode

*Source: `(root)/_Emergency_Mode.htm`*

Emergency Mode
When a radio is sending an Emergency transmission
initiated by pressing the emergency button.
Notes
If
an emergency call is initiated during scan mode, the power level during
emergency and after exiting emergency will follow the home channel's CPS
setting. Under these circumstances, if the radio is required to transmit
in high power during emergency mode, the power level for the home channel
must be set to High in the CPS.

### Emergency Mode

*Source: `(root)/_Emergency_Mode_pop.htm`*

Emergency Mode
Selects the emergency functionality during the radio�s Emergency Mode.

### Emergency Open Mic Duration

*Source: `(root)/_Emergency_Open_Mic_Duration.htm`*

Emergency Open Mic Duration
Selects the amount of time that the microphone remains automatically
keyed-up once the Emergency Alarm data packets have ceased. Emergency
Alarm data packets cease to transmit when all Polite and Impolite retries
have been exhausted, or an acknowledgement confirming the successful transmission
of the emergency data packets is received. This automatic Open Microphone
broadcast transmits on the same channel as the Emergency Alarm data packets.

### Emergency PTT ID

*Source: `(root)/_Emergency_PTT_ID.htm`*

Emergency PTT ID
Selects a unique PTT ID that is transmitted while the radio is operating
in an Emergency Mode. This is only true when the Mode field is set to
�Alarm/Call�.

### Emergency Polite Retries

*Source: `(root)/_Emergency_Polite_Retries.htm`*

Emergency Polite Retries
When in Emergency Mode, this feature selects the number of times the
radio politely sends an Emergency Transmission, even when the channel
is currently busy with other radio traffic. This is known as an Polite
Transmission.

### Emergency Tx Cycles

*Source: `(root)/_Emergency_Tx_Cycles.htm`*

Emergency Tx Cycles
Selects the number of times that the radio automatically keys-up for
the purpose of sending voice during Emergency Mode. The radio automatically
transmits for the amount of time defined in the Emergency Open Mic Duration
field.

### Emergency Tx Cycles Delay

*Source: `(root)/_Emergency_Tx_Cycles_Delay.htm`*

Emergency Tx Cycles Delay
Selects the amount of time between Emergency Tx Cycles. The Tx Cycles
selection defines how many Emergency Open Mic Durations are initiated
during an Emergency Mode.

### Emergency Sticky Revert

*Source: `(root)/_Emergency_sticky_revert_pop.htm`*

Emergency Sticky Revert
When checked, causes the radio to remain permanently on the Emergency
Revert Personality after the emergency transmission has been sent and
acknowledged. The radio must be powered off for it to return to the radio�s
Channel Selector selected channel.

### Encode

*Source: `(root)/_Encode_pop.htm`*

Encode
When the radio transmits a voice or data call.

### Escalert (Menu)

*Source: `(root)/_Escalert_(Menu).htm`*

Escalert (Menu)
When checked, enables the Escalert feature to be included in the Tones
menu allowing the radio-user to toggle on and off this functionality.
Escalert causes the radio to gradually increase the volume of a repetitive
alert tone. This repetitive tone is an alert of an incoming radio call.

### Escalert

*Source: `(root)/_Escalert_pop.htm`*

Escalert
Escalert causes the radio to gradually increase
the volume of a repetitive alert tone. This repetitive tone is an alert
of an incoming radio call.

### External Alarm

*Source: `(root)/_External_Alarm.htm`*

External Alarm
The External Alarm is an accessory item, which connects
to a mobile radio�s Accessory Connector. The External Alarm is activated
by an incoming Call Alert.

### External Alarm On/Off

*Source: `(root)/_External_Alarm_On_Off_select5.htm`*

External Alarm On/Off
Enables the user to toggle the External Alarm feature between On and
Off.

### Field

*Source: `(root)/_Field.htm`*

Field
A data entry point in a software program where a
feature�s current value is entered, selected, viewed, or edited.

### File

*Source: `(root)/_File.htm`*

File
A collection of data or information that is stored
on a computer�s hard disk or diskette that can be read by a computer.

### Firmware

*Source: `(root)/_Firmware.htm`*

Firmware
Software that controls the internal hardware components
of the radio. Firmware cannot be modified with the CPS.

### Frequency

*Source: `(root)/_Frequency.htm`*

Frequency
(a)   The
location of the center of a channel of operation in the radio spectrum.
Measured in Megahertz (MHz). A receive (one-way) or receive and transmit
(two-way) path.
(b)   A
computer speed. Measured in Megahertz (MHz).

### Front Panel Access (FPA)

*Source: `(root)/_Front_Panel_Access_(FPA).htm`*

Front Panel
Access (FPA)
Allows the ability
to test radio functionality relating to: transmit and receive frequencies,
buttons and keys, and the display. Refer to the Basic Service Manual for
more information.

### Front Panel Test

*Source: `(root)/_Front_Panel_Test.htm`*

Front Panel Test
Allows admittance into the radio�s FPA (Front Panel Access) testing
mode.

### Function Keys

*Source: `(root)/_Function_Keys.htm`*

Function Keys
The twelve keys located across the top of the PC
keyboard labeled F1 to F12.

### Function Select (Select 5)

*Source: `(root)/_Function_Select_(Select_5).htm`*

Function Select (Select 5)
Pin #3 Function Select
Pin #4 Function Select
Pin #6 Function Select
Pin #8 Function Select
Pin #9 Function Select
Pin #12 Function Select
Pin #14 Function Select

### Function Select

*Source: `(root)/_Function_Select_EMEA.htm`*

Function Select
Pin #3 Function Select
Pin #4 Function Select
Pin #6 Function Select
Pin #8 Function Select
Pin #9 Function Select
Pin #12 Function Select
Pin #14 Function Select

### General I/O Package

*Source: `(root)/_General_I_O_Package.htm`*

General I/O Package
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Voice PTT
Input
Enabled
Low
4
Unassigned
Output
Disabled
Low
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
PL/DPL Detect
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Filtered Audio

### Group

*Source: `(root)/_Group.htm`*

Group
A collection of radios which communicate together.

### Group ID

*Source: `(root)/_Group_ID.htm`*

Group ID
Selects the unique one to eight digit ID that identifies the radio as
belonging to a unique group while operating (receiving DTMF calls) on
the current DTMF - Signaling System.

### Hang Time

*Source: `(root)/_Hang_Time.htm`*

Hang Time
Selects the amount of time that the radio waits on the scanned channel
- in Landed Scan mode, before returning to Active Scan mode. The timer
begins once receive or transmit activity has ceased. While the timer is
counting down, if the radio transmits (PTT is pressed), or the radio unmutes
its speaker to receive audio, the timer is reset, and the original conditions
again apply.

### Highlight

*Source: `(root)/_Highlight.htm`*

Highlight
When a data entry field or icon is selected by clicking
on it. This is generally represented with a bolded outline or reverse
video.
To Highlight: Selecting
text or a graphic by clicking and dragging across it, or by double clicking
on it. Once highlighted, it can be copied, moved, or deleted.

### Hz

*Source: `(root)/_Hz.htm`*

Hz
The abbreviation for Hertz.

### ID (DTMF)

*Source: `(root)/_ID_(DTMF).htm`*

ID
Selects the one to eight digit ID to be transmitted for the current
DTMF - Call List Member. The transmitted ID can target one or several
receiving radios. This allows DTMF transmissions to be made to a specific
radio or groups of radios without disturbing other radios operating on
the same channel. The range is from 0 through 9, * and #.

### Impolite Transmission

*Source: `(root)/_Impolite_Transmission_pop.htm`*

Impolite Transmission
When the radio sends a transmission, even when the
current channel is busy with other radio traffic, in-effect stepping on
other channel traffic.

### Key-Up (To key the radio)

*Source: `(root)/_Key-Up_(To_key_the_radio).htm`*

Key-Up (To key the radio)
The action of transmitting. (Pressing the PTT button).

### Keypad

*Source: `(root)/_Keypad.htm`*

Keypad
When checked, enables the Keypad Tones feature to be included in the
Tones menu. This allows the radio-user to toggle on or off the DTMF audio
tones heard when using the keypad.

### Keypad Enable On/Off

*Source: `(root)/_Keypad_Enable_On_Off.htm`*

Keypad Enable On/Off
Enables user to lock the keypad and menu navigation buttons.

### Keypad Lock On/Off

*Source: `(root)/_Keypad_Lock_On_Off.htm`*

Keypad Lock On/Off
Toggles the keypad lock on or off on a Display Portable model.

### Landed Scan Mode

*Source: `(root)/_Landed_Scan_Mode.htm`*

Landed Scan Mode
When in Scan Mode, and once Active Scan finds an
eligible Scan List Member channel/call to receive - or unmute to, the
radio is then in Landed Scan Mode.
Also, once both Transmit and Receive activity has
ceased, and while the Scan Hang Timer is counting down, the radio is still
in Landed Scan Mode.

### Light Emitting Diode (LED)

*Source: `(root)/_Light_Emitting_Diode_(LED).htm`*

Light Emitting Diode (LED)
A visual indicator that flashes or glows. Usually
located at the top of the radio.

### Light

*Source: `(root)/_Light_button.htm`*

Light
Allows the radio-user the ability to enable or disable a portable radio�s
keypad backlight and display initiated through a (long or short) programmable
button-press.

### Lights

*Source: `(root)/_Lights.htm`*

Lights
When checked, enables the Lights feature to be included in the Utility
menu. This allows the radio-user the ability to disable a portable radio�s
keypad backlight and display. This mode is also initiated and ended through
a (long or short) programmable button-press.

### Local/Base Station

*Source: `(root)/_Local_Base_Station.htm`*

Local/Base Station
Use this feature between Local mode (low sensitivity) and Base Station
mode (normal sensitivity). When Local mode is set, you will not hear weak
transmissions. When Base Station mode is set you will hear all transmissions,
including weaker signals.

### Lone Worker

*Source: `(root)/_Lone_Worker.htm`*

Lone Worker
If enabled the radio will enter emergency if no radio button is pressed
with in a defined period of time after the alert.

### MHz

*Source: `(root)/_MHz.htm`*

MHz
Abbreviation for Megahertz. One MHz is equal to one
million Hertz (Hz).

### Maximum Volume Setting

*Source: `(root)/_Maximum_Volume_Setting_pop.htm`*

Maximum Volume
Setting
This value determines the highest volume level for receive
audio. This value is hard-coded into the radio and can not be changed
with Customer Programming Software (CPS).

### Memory Channel 1&2

*Source: `(root)/_Memory_Channel_1&2.htm`*

Memory Channel 1 & 2
Selects the Channel that the radio engages (jumps to) when a programmable
button-press is set to �Revert Memory Channel 1� or "Revert Memory
Channel 2".

### Menu Mode

*Source: `(root)/_Menu_Mode_pop.htm`*

Menu Mode
Allows access to a drop-down list of features that
can be selected by the CPS-user. The Menu/Select Key (P2) is used by the
radio-user to enter the Menu Mode. Once in the Menu Mode, the Top Level
Menu Options appear.

### Midpoint Volume Setting

*Source: `(root)/_Midpoint_Volume_Setting.htm`*

Midpoint Volume Setting
This value determines the exact center of volume levels
for receive audio. This value is hard-coded into the radio and can not
be changed with Customer Programming Software (CPS).

### Minimum Volume Setting

*Source: `(root)/_Minimum_Volume_Setting.htm`*

Minimum Volume Setting
This value determines the lowest volume level for receive
audio. This value is hard-coded into the radio and can not be changed
with Customer Programming Software (CPS).

### Missed Calls

*Source: `(root)/_Missed_Calls.htm`*

Missed Calls
Allows the user to go straight to the Missed Calls section of the programmable
menu.

### Monitor (Silent Squelch)

*Source: `(root)/_Monitor_(Silent_Squelch).htm`*

Monitor (Silent Squelch)
The radio�s speaker Unmutes to any carrier squelch activity.

### Monitor 1 / Call Cancel

*Source: `(root)/_Monitor_1___Call_Cancel.htm`*

Monitor 1 / Call Cancel
This allows the user to:
1. Select between carrier and unsquelched signalling modes.
2. Suspend scan when landed on a channel.
3. Cancel the current incoming or outgoing call.

### Monitor 2 / Call Cancel

*Source: `(root)/_Monitor_2___Call_Cancel.htm`*

Monitor 2 / Call Cancel
This allows the user to:
1. Select between carrier and unsquelched signalling modes.
2. Suspend scan when landed on a channel.
3. Cancel the current incoming or outgoing call.

### Motorola Data Communications (MDC)

*Source: `(root)/_Motorola_Data_Communications_(MDC).htm`*

Motorola Data Communications (MDC)
A Motorola proprietary Signaling System protocol.
A binary format using 1200 baud minimum shift keying modulation.

### Mute

*Source: `(root)/_Mute.htm`*

Mute
When the radio closes its speaker to receive audio.

### Mute Access/Deaccess Tone

*Source: `(root)/_Mute_Access_Deaccess_Tone.htm`*

Mute Access/Deaccess Tone
Causes the DTMF tones for Access and Deaccess codes to be muted - when
the Access/Deaccess Type field is set to Delayed or Immediate Auto. However,
DTMF tones are not muted when the Access/Deaccess Type is set to Manual.
This feature applies while in Phone Mode for the current Phone System.

### Normal Dispatch

*Source: `(root)/_Normal_Dispatch.htm`*

Normal Dispatch
Occurs when; only the PTT button is pressed to initiate
a call, while operating on a Conventional channel.

### Nuisance Delete/Cancel Voice Message

*Source: `(root)/_Nuisance_Delete_Cancel_Voice_Message.htm`*

Nuisance Delete/Cancel Voice Message
This allows the user to:
When a Scan List Member continually generates
unwanted noise, it can be temporarily deleted from the scan list. This
feature applies for the current Scan List.
Deletes message being played back from voice storage.

### Open Squelch

*Source: `(root)/_Open_Squelch.htm`*

Open Squelch
When the radio�s speaker is constantly unmuted to all channel
activity. Also see Monitor Type.

### Operating System

*Source: `(root)/_Operating_System.htm`*

Operating System
A computer program that coordinates your computer�s
activities, such as, memory allocation, file management, input and output
operations, communications, and interfacing to other application software
packages, such as CPS.

### Option Board (Menu)

*Source: `(root)/_Option_Board_(Menu).htm`*

Option Board (Menu)
When checked, enables the Option Board feature to be included in the
Utility menu. This allows the radio-user the ability to toggle on and
off radio-wide Option Board functionality. Radio-wide functionality applies
to Personalities that have Option Board functionality enabled.
Radio-wide Option Board functionality can also be assigned to a (short
or long) programmable button-press.

### Option Board

*Source: `(root)/_Option_Board_(pers).htm`*

Option Board
When checked, enables Option Board functionality to be active for the
current Personality.
The ability to turn radio-wide option board functionality on and off
can be assigned to a radio-user (short or long) programmable button-press
or Option Board menu selection. However, option board functionality only applies for channels where this
Personality Option Board Feature has been enabled.

### Option Board Configuration Download

*Source: `(root)/_Option_Board_Configuration_Download.htm`*

Option Board Configuration Download
When checked,causes the radio to download third party option board configuration
data which initializes specific option board functionality on a per Conventional
Personality basis. Option board configuration data downloads apply only
to specific option board types.

### Option Board Configuration Index

*Source: `(root)/_Option_Board_Configuration_Index.htm`*

Option Board Configuration Index
Selects the desired �Advanced� only option board functionality for the
current Conventional Personality. Advanced option board types allow for
unique settings on a per personality basis. Option board functionality
selections are based on the �Imported� third party option board configuration
data that applies for the selected Option Board Type.
This selected option board functionality is then automatically downloaded
and initiated when the radio-user selects the current channel.

### Option Board On/Off

*Source: `(root)/_Option_Board_On_Off.htm`*

Option Board On/Off
Allows the user to enable/disable the option board.

### Option Board Type

*Source: `(root)/_Option_Board_Type_pop.htm`*

Option Board Type
Selects the type of option board that has been installed
in the current radio. This prompts the radio to expect certain new functionality.

### Override Busy Channel Lockout

*Source: `(root)/_Override_Busy_Channel_Lockout.htm`*

Override Busy Channel Lockout
When checked, causes the radio to override the Busy Channel Lockout
Rule, while operating in Phone Mode, and for the current Phone System.

### PL Required

*Source: `(root)/_PL_Required.htm`*

PL Required
When checked, causes a Private Line (PL) code match to be required on
a incoming phone call - while in the Phone Mode, in order for communication
to occur. This only applies when the current Phone System is assigned
to a Conventional Personality, that requires Receive PL.

### PTT ID (Push-To-Talk)

*Source: `(root)/_PTT_ID_(Push-To-Talk).htm`*

PTT ID (Push-To-Talk)
A PTT ID is transmitted when the PTT button is pressed
for a Signaling System enabled channel.

### PTT Sidetone (DTMF)

*Source: `(root)/_PTT_Sidetone_(DTMF).htm`*

PTT Sidetone (DTMF)
Selects the type of PTT Sidetone used after the PTT button is pressed,
and immediately following the Signaling System data packet being transmitted.
The purpose is to indicate to the radio-user when voice may be initiated.
This feature applies for the current DTMF Signaling System.

### PTT Sidetone (Phone)

*Source: `(root)/_PTT_Sidetone_(Phone).htm`*

PTT Sidetone (Phone)
Selects the one short alert tone after the PTT button is pressed.

### PTT Sidetone (QCII)

*Source: `(root)/_PTT_Sidetone_(QCII).htm`*

PTT Sidetone (QCII System)
Selects the type of PTT Sidetone used after the PTT button is pressed,
and immediately following the Signaling System data packet being transmitted.
The purpose is to indicate to the radio-user when voice may be initiated.
This feature applies for the current QCII Signaling System.

### Parallel Port

*Source: `(root)/_Parallel_Port.htm`*

Parallel Port
A hardware interface connection on a computer used
to communicate with other hardware devices such as printers, tape drives
used for backing up data, and external Disk Drives. Parallel Ports are
designated by slot positions such as LPT1, and LPT2. Also see COM Ports.

### Path

*Source: `(root)/_Path.htm`*

Path
The location of a directory or sub-directory on a
hard disk or diskette. Paths start at the root directory of the hard disk
or diskette and end at the directory containing the desired file. For
example, the path C:\CPS\Codeplugs\Radio1 shows the hierarchy or ordering
of directories/sub-directories the computer must descend to reach a file
located in the �Radio1� sub-directory. �CPS� is at the highest level in
the hierarchy; therefore it is a directory, not a sub-directory.
�C:\� is the root of the path.

### Pause Duration

*Source: `(root)/_Pause_Duration_pop.htm`*

Pause Duration
Selects the amount of time that the radio waits during a dialing pause.
This creates a momentary wait at a strategic point - when the radio is
automatically dialing pre-programmed speed dial numbers. This wait is
sometimes needed, so that the radio does not get ahead of the external
phone system that it is attempting to access. This feature applies while
in Phone Mode for the current Phone System.

### Personality

*Source: `(root)/_Personality.htm`*

Personality
Individual groupings of CPS-user defined functionality,
which can be assigned to the individual channels of the radio�s Channel
Selector.

### Phone List (Menu)

*Source: `(root)/_Phone_List_menu.htm`*

Phone List (Menu)
When checked, enables the Phone List feature to be included in the Program
lists menu. This allows the radio-user the ability to define and use certain
Phone List functionality.

### Phone List

*Source: `(root)/_Phone_List_pop.htm`*

Phone List
The Phone List allows you to add and delete phone numbers, and correlating
Phone Names, to the Phone List. The first nine entries in this list can
be programmed for one-touch Speed Dialing. Flexible functionality is assigned
to the Phone List through individual Phone Systems.

### Phone Mode

*Source: `(root)/_Phone_Mode_pop.htm`*

Phone Mode
When the radio is capable of transmitting a Phone Call. This mode is
initiated and ended through a (long or short) programmable button-press
or menu selection.

### Phone Speed Dial

*Source: `(root)/_Phone_Speed_Dial.htm`*

Phone Speed Dial
Directly accesses phone mode to quickly access phone list for speed
dial. The first nine entries in the Phone List are automatically programmed
for one-touch Speed Dialing on the DTMF keypad.

### Phone System

*Source: `(root)/_Phone_System.htm`*

Phone System
Selects the Phone System to be used when operating in Phone Mode for
the current Conventional Personality.
A Phone System defines certain functionality and the list of phone numbers
that allow the radio-user to make telephone calls.

### Phone System

*Source: `(root)/_Phone_System_pop.htm`*

Phone System
Individual Phone Systems - with the Phone List, can be assigned to a
Conventional Personality. Only one phone list can exist, however through
multiple Phone System definitions, Phone List functionality can be uniquely
configured for each Conventional Personality.

### Polite Transmission

*Source: `(root)/_Polite_Transmission_pop.htm`*

Polite Transmission
When the radio waits for the current Channel Selector
selected channel to be free of radio traffic before attempting to transmit.

### Pretime (Phone)

*Source: `(root)/_Pretime_(phone).htm`*

Pretime (Phone)
Selects the amount of time between pressing PTT and the first bit of
data packet transmission. This time allows the receiving radio to stabilize
before receiving data. This feature applies while in Phone Mode for the
current Phone System. The range is from 0 ms to 4500 ms, in increments
of 25 ms.

### Pretime (phone)

*Source: `(root)/_Pretime_phone_pop.htm`*

Pretime (phone)
Selects the amount of time between pressing PTT and the first bit of
data packet transmission. This time allows the receiving radio to stabilize
before receiving data. This feature applies while in Phone Mode for the
current Phone System.

### Primary ID

*Source: `(root)/_Primary_ID_(DTMF).htm`*

Primary ID
Selects the unique one to eight digit ID that identifies the radio while
operating (transmitting or receiving DTMF calls) on the current DTMF -
Signaling System.

### Private Line (PL)

*Source: `(root)/_Private_Line_(PL).htm`*

Private Line (PL)
A sub-audible tone/code used to create unique/private
communication groups while operating in Conventional Dispatch mode. A
generic term for Tone Private Line (TPL), or Digital Private Line (DPL).

### Program PL

*Source: `(root)/_Program_PL.htm`*

Program PL
When checked, enables Program PL as a radio-user Top Level Menu feature.
This allows the radio-user to edit the PL/DPL codes for a selected channel.

### Programming Session

*Source: `(root)/_Programming_Session.htm`*

Programming
Session
A programming session
is initiated when information is Read into the CPS from a radio.
A programming session
is ended when the current programming information is closed. This is the
case either when new programming information is read or loaded, or when
the CPS is closed.

### Public Address System (PA)

*Source: `(root)/_Public_Address_System_(PA).htm`*

Public Address System (PA)
The PA System is an Accessory Connector external
speaker system. The radio�s hand-held microphone is the source of audio
for the external speaker.

### Push to Talk (PTT)

*Source: `(root)/_Push_to_Talk_(PTT).htm`*

Push to Talk (PTT)
Used to begin transmitting a radio communication.

### Quick-Call II System

*Source: `(root)/_Quick-Call_II_System.htm`*

Quik-Call II System
Selects the Quik-Call II Signaling System to be used by the current
Quik Call II (QCII) - Call List Member.

### Quik-Call II (QCII)

*Source: `(root)/_Quik-Call_II_(QCII).htm`*

Quik-Call II (QCII)
A two-tone, sequential tone, Signaling System protocol
associated with portable radios and pagers.

### RICK or i20R Rx (Select 5)

*Source: `(root)/_RICK_or_i20R_Rx_(Select_5).htm`*

RICK or i20R Rx (Select 5)
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Unassigned
Input
Disabled
Low
4
External Alarm
Output
Disabled
Low
6
Unassigned
Input
Disabled
Low
8
PL/DPL Detect
Output
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Flat Audio (Unfiltered)

### RICK or i20R Tx (Select 5)

*Source: `(root)/_RICK_or_i20R_Tx_(Select_5).htm`*

RICK or i20R Tx (Select 5)
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Voice PTT
Input
Enabled
Low
4
Unassigned
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Flat Audio (Unfiltered)

### Radio Call

*Source: `(root)/_Radio_Call.htm`*

Radio Call
Signaling System calls: Call Alerts, Call Alerts w/Voice, and Voice
Sel Cal�s. Prior to transmitting, a Radio Call type can be selected by
the radio-user from the �Radio Call� menu.

### Radio ID's

*Source: `(root)/_Radio_ID_s.htm`*

Radio ID's
ID�s are CPS-user defined for each
Signaling System. Signaling Systems can then be assigned to personalities.
MDC uses the: Primary and Group fields.
QCII uses the: Tone A, Tone B, Tone C, and Tone D
fields.

### Radio Interface Box (RIB)

*Source: `(root)/_Radio_Interface_Box_(RIB).htm`*

Radio Interface Box (RIB)
Used to connect a personal computer to a radio for
the purpose of communication between the two. The RIB consists of level-shifting
circuits that convert from the standard RS-232 voltage levels of the computer
asynchronous serial interface (COM Port), to the single-ended voltage
levels present on the Serial Bus contacts of the radio�s connector. The
RIB must have an appropriate RIB-to-radio and RIB-to-computer Radio Interface
Cable for communication and radio programming to occur.

### Radio Interface Cable

*Source: `(root)/_Radio_Interface_Cable.htm`*

Radio Interface Cable
Allows the Radio Interface Box to be connected to
a computer. This allows for communication between the two. Also see COM
Port.

### Random Access Memory (RAM)

*Source: `(root)/_Random_Access_Memory_(RAM).htm`*

Random Access Memory (RAM)
A temporary storage space used by a computer to operate
a software program currently running. Anything stored in RAM is lost when
the computer is turned off.

### Read

*Source: `(root)/_Read.htm`*

Read
The transfer of programmed information from the radio
to the computer�s temporary memory (RAM) via the RIB communication link,
and the computer�s COM Port.
1.
From the Device menu choose Read.
2.
From the tool bar click:

### Recall Last Selected

*Source: `(root)/_Recall_Last_Selected.htm`*

Recall Last Selected
When checked, causes the last-used Top Level Menu option to automatically
appear in the radio�s display when the radio-user enters the Menu Mode.
When not checked, the first available Top-Level Menu option appears
in the radio�s display when the radio-user enters the Menu Mode.

### Release Squelch

*Source: `(root)/_Release_Squelch.htm`*

Release Squelch
Creates exceptions to the Signaling Squelch Unmuting Rule
(see the Auto Reset Timer Type �Selections�).
The Release Squelch State begins once the radio unmutes
to a Voice Call.
When Signaling Squelch is set to �Or�; and once the radio
is in the Release Squelch State, only Carrier Squelch Detect is required
for unmuting to re-occur, PL and Voice Call are not required.
When Signaling Squelch is set to �And�; and once the radio
is in the Release Squelch state, then only the current personalities -
Unmute Rules must be satisfied for unmuting to re-occur, a Voice Call
is no longer required.

### Repeater

*Source: `(root)/_Repeater.htm`*

Repeater
Radio equipment that receives a radio transmission
and then sends it out again. The re-transmitted signal ultimately increases
radio range, and long-distance call clarity.

### Repeater Mode

*Source: `(root)/_Repeater_Mode.htm`*

Repeater Mode
When the radio accesses a Repeater for the purpose
of increasing transmission signal strength, which increases range and
audio clarity.

### Repeater/Talkaround

*Source: `(root)/_Repeater_Talkaround.htm`*

Repeater/Talkaround
This allows the radio-user to toggle between Repeater Mode and Talkaround
Mode. This is true provided that the radio�s current Channel Selector
selected channel has Talkaround checked.

### Reset Duration

*Source: `(root)/_Reset_Duration.htm`*

Reset Duration
Selects the amount of time the radio waits for the next incoming DTMF
digit in a sequence of digits, before resetting itself to look for the
first DTMF digit of a new sequence. The feature applies for the current
DTMF Signaling System.

### Reverse Aliasing

*Source: `(root)/_Reverse_Aliasing.htm`*

Reverse Aliasing
Reverse Aliasing allows the receiving radio-user to identify the source-radio
for certain call types on an MDC or DTMF - Signaling System enabled channel.

### Revert Memory Channel 1

*Source: `(root)/_Revert_Memory_Channel_1.htm`*

Revert Memory Channel 1
Selects the Personality that the radio engages (jumps to) when a programmable
button-press is set to �Revert Memory Channel 1�.

### Revert Memory Channel 2

*Source: `(root)/_Revert_Memory_Channel_2.htm`*

Revert Memory Channel 2
Selects the Personality that the radio engages (jumps to) when a programmable
button-press is set to �Revert Memory Channel 2�.

### Revert Personality

*Source: `(root)/_Revert_Personality_pop.htm`*

Revert Personality
Selects a Personality (by its CPS given name) causing the current Quik-Call
II (QCII) or DTMF - Call List Member to transmit on that channel.

### Revert Scan

*Source: `(root)/_Revert_Scan.htm`*

Revert Scan
When checked, causes the radio to automatically move to the last landed
scan - channel when exiting Scan Mode.
When unchecked, the radio automatically moves back to the channel where
scan was originally initiated.

### Rx

*Source: `(root)/_Rx.htm`*

Rx
Acronym for Receive.

### Save

*Source: `(root)/_Save.htm`*

Save
The transfer of programming information from the
computer�s temporary memory (RAM) to a computer file.
Save is initiated from a menu selection
or a button-press.
1.
From the File menu choose Save.
2.
From the tool bar select:

### Scan (menu)

*Source: `(root)/_Scan_(menu).htm`*

Scan (Menu)
When checked, enables Scan as a radio-user Top Level Menu feature. This
allows the radio-user to enter the radio�s Scan Mode.

### Scan List (Menu)

*Source: `(root)/_Scan_List_menu.htm`*

Scan List (Menu)
When checked, enables the Scan List feature to be included in the Program
Lists menu. This allows the radio-user the ability to define and use certain
Scan List functionality. This mode is also initiated and ended through
a (long or short) programmable button-press.

### Scan Mode

*Source: `(root)/_Scan_Mode.htm`*

Scan Mode
When the radio is in one of the two Scan States,
Active Scan and Landed Scan. This mode is initiated automatically through
Auto Scan or System Scan through a short-press of a programmable button.
The radio�s LED flashes green while Actively Scanning in the Scan Mode.

### Sel Cal

*Source: `(root)/_Sel_Cal.htm`*

Sel Cal
When checked, enables the Selective Call feature to be included in the
Radio Call menu. This allows the radio-user the ability to transmit Selective
Calls.

### Sel Cal (Select Call)

*Source: `(root)/_Sel_Cal_(Select_Call).htm`*

Sel Cal (Selective Call)
A Signaling System - Radio Call that allows you to
receive and transmit a radio Selective Call.

### Software

*Source: `(root)/_Software.htm`*

Software
A set of computer instructions that controls input
and produces desired output. The Customer Programming Software (CPS) allows
customer input that ultimately programs radios with its output.

### Software Version

*Source: `(root)/_Software_Version.htm`*

Software Version
When checked, enables the Software Version feature to be included in
the Utility menu. This allows the radio-user the ability to display the
Version Number of internal-radio Firmware Software stored in Read-Only
Memory (ROM).

### Squelch

*Source: `(root)/_Squelch.htm`*

Squelch
(a)
To cut off or end a transmission due to a lack of signal wave strength
(see Squelch Setting).
(b)     A
radio circuit, which eliminates noise from the radio�s speaker.

### Squelch (Menu)

*Source: `(root)/_Squelch_(Menu).htm`*

Squelch (Menu)
When checked, enables the Squelch feature to be included in the Utility
menu. This allows the radio-user the ability to temporarily adjust the
Squelch Threshold setting to �Normal� or �Tight� for the current Channel
Selector selected channel. Once the radio�s channel is changed, or the
radio is powered-off, this setting reverts back to the Squelch Setting
for each Conventional Personality.

### Squelch Tail

*Source: `(root)/_Squelch_Tail.htm`*

Squelch Tail
An intrusive noise that is emitted while the transmission
of Carrier is fading.

### Status List

*Source: `(root)/_Status_List.htm`*

Status List
Radio will go directly to the Status List programmable menu feature.

### Status Multicall

*Source: `(root)/_Status_Multicall.htm`*

Status Multicall
Radio will go directly to the Status number.

### Sticky Permanent Monitor Mode

*Source: `(root)/_Sticky_Permanent_Monitor_Mode_pop.htm`*

Sticky Permanent Monitor Mode
Sticky Permanent Monitor Mode occurs when holding
the short-press Monitor Button for a Long Press duration. Once the long-press
occurs, the radio remains in Monitor Mode until the Monitor Button is
short pressed. Initiating Scan Mode or a Radio Call will also cancel Sticky
Permanent Monitor mode.

### Store Memory Channel 1

*Source: `(root)/_Store_Memory_Channel_1.htm`*

Store Memory Channel 1
Stores the current Personality that the radio engages (jumps to) when
a programmable button-press is set to �Revert Memory Channel 1�.

### Store Memory Channel 2

*Source: `(root)/_Store_Memory_Channel_2.htm`*

Store Memory Channel 2
Stores the current Personality that the radio engages (jumps to) when
a programmable button-press is set to �Revert Memory Channel 2�.

### Strip PL

*Source: `(root)/_Strip_PL.htm`*

Strip PL
When checked, causes the radio to not transmit Private Line (PL) codes
while in the Phone Mode. This only applies when the current Phone System
is assigned to a Conventional Personality that is configured for Transmit

### Strip TPL/DPL

*Source: `(root)/_Strip_TPL_DPL.htm`*

Strip TPL/DPL
When checked, causes the radio to not transmit PL codes with the call
for the current Quik-Call II (QCII) or DTMF - Call List Member. PL codes
are stripped when the current Revert Personality, or current (Channel
Selector) Conventional Personality, has Transmit PL enabled.

### Talkaround (Menu)

*Source: `(root)/_Talkaround_(Menu).htm`*

Talkaround (Menu)
When checked, enables Talkaround as a radio-user Top Level Menu feature.
This allows the radio-user to choose to operate in Repeater Mode or Talkaround
Mode.

### Talkaround Mode

*Source: `(root)/_Talkaround_Mode.htm`*

Talkaround Mode
Radio to Radio communications in close proximity.
Communicating without the use of a Repeater to boost the signal.
In Talkaround Mode the Rx Parameters are used in
place of the Tx Parameters when transmitting. If the Rx Parameters and
Tx Parameters are programmed to the same setting for a Conventional Personality,
the personality is in effect in a constant Talkaround mode.

### Tel Interconnect (ZR340) Simplex (Select 5)

*Source: `(root)/_Tel_Interconnect_(ZR340)_Simplex_(Select_5).htm`*

Tel Interconnect (ZR340) Simplex (Select 5)
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Voice PTT
Input
Enabled
Low
4
Carrier Detect
Output
Disabled
Low
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
PL/DPL Detect
Output
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Filtered Audio

### Time-Out-Timer

*Source: `(root)/_Time-Out-Timer.htm`*

Time-Out-Timer
Selects the amount of time the radio waits in Menu Mode, without any
radio-user key press activity, before automatically exiting out of Menu
Mode. Range is from 1 second to 30 seconds, in increments of 1 second.

### Time-Out Timer Delay (sec)

*Source: `(root)/_Time-Out_Timer_Delay_(sec).htm`*

Time-Out Timer Delay (sec)
Specifies the transmit time-out reset duration per Conventional Personality.
Range is from 1 second to 255 seconds, in increments of 1 second.

### Time-Out Timer Type

*Source: `(root)/_Time-Out_Timer_Type.htm`*

Time-Out Timer Type
Selects the type of timer per transmission, while operating on the current
Conventional Personality.

### To Program

*Source: `(root)/_To_Program.htm`*

To Program
The transfer of CPS information from the computers
temporary memory (RAM) to the radio via the RIB communication link, and
the computer�s COM Port.

### Tone A Code (QCII Call)

*Source: `(root)/_Tone_A_Code_(QCII_Call)_pop.htm`*

Tone A Code (QCII Call)
Selects the Code correlating to the Tone A Frequency to be transmitted
for the current Quik-Call II (QCII) Call List Member. QCII Standard Tones
are a subset of the QCII Frequency range. Therefore, selecting a value
for this field automatically selects a value for the Tone A Frequency
field.

### Tone A Frequency (QCII Call)

*Source: `(root)/_Tone_A_Frequency_(QCII_Call)_pop.htm`*

Tone A Frequency (QCII Call)
Selects the frequency of the first tone to be transmitted for the current
Quik-Call II (QCII) Call List Member. Selecting a value for this field
automatically selects a value for the Tone A Code field. Some Frequencies
may not have a correlating Code causing nothing to display in the Code
field.

### Tone B Code (QCII Call)

*Source: `(root)/_Tone_B_Code_(QCII_Call)_pop.htm`*

Tone B Code (QCII Call)
Selects the Code correlating to the Tone B Frequency to be transmitted
for the current Quik-Call II (QCII) Call List Member. QCII Standard Tones
are a subset of the QCII Frequency range. Therefore, selecting a value
for this field automatically selects a value for the Tone A Frequency
field.

### Tone B Frequency (QCII Call)

*Source: `(root)/_Tone_B_Frequency_(QCII_Call)_pop.htm`*

Tone B Frequency (QCII Call)
Selects the frequency of the second-tone to be transmitted for the current
Quik-Call II (QCII) Call List Member. Selecting a value for this field
automatically selects a value for the Tone B Code field. Some Frequencies
may not have a correlating Code causing nothing to display in the Code
field.

### Tone Private Line (TPL)

*Source: `(root)/_Tone_Private_Line_(TPL).htm`*

Tone Private Line (TPL)
Transmitted when the receiving radio is to only receive
calls from radios with specific TPL codes, this creates communications
groups while operating in Conventional Dispatch mode. TPL allows for more
use and privacy on a frequency. TPL is transmitted at a sub-audible (not
able to be heard) frequency. Also known as Channel Guard, Quiet Call,
and CTCSS.

### Tone Span

*Source: `(root)/_Tone_Span_pop.htm`*

Tone Span
Selects the type of DTMF tone length that is sent when dialing - while
in the Phone Mode, and for the current Phone System.

### Tx

*Source: `(root)/_Tx.htm`*

Tx
Acronym for Transmit.

### Tx Hang Time

*Source: `(root)/_Tx_Hang_Time.htm`*

Tx Hang Time
Selects the maximum time that the radio waits between key presses (DTMF
digits) - when manually dialing a phone number, before Pretime is automatically
inserted before the transmission of the next digit. If the Pretime value
is required to be to a large duration, it can significantly slow the dialing
process. This feature applies while in Phone Mode for the current Phone
System. Range is from 0 ms to 4500 ms, in increments of 25 ms.

### Tx Power Level (Menu)

*Source: `(root)/_Tx_Power_Level_(Menu).htm`*

Tx Power Level (Menu)
When checked, enables the Tx Power Level feature to be included in the
Utility menu. This allows the radio-user to adjust the Transmit Power
setting (radio-wide) to �High� or �Low�.

### Tx Tone Duration (DTMF)

*Source: `(root)/_Tx_Tone_Duration_(DTMF).htm`*

Tx Tone Duration (DTMF)
Selects the amount of time that a single DTMF tone is transmitted for
manually dialed digits, and when the Tone Span field is set to Timed.
Once the Tx Tone Duration ends, the Tx Tone Interval begins, and vice-versa.
This applies for the current DTMF Signaling System. The range is from
25 ms to 6400 ms, in increments of 25 ms.

### Tx Tone Duration (Phone)

*Source: `(root)/_Tx_Tone_Duration_(Phone).htm`*

Tx Tone Duration (Phone)
Selects the amount of time that a single DTMF tone is transmitted for
manually dialed digits, and when the Tone Span field is set to Timed.
This field automatically applies during a preprogrammed Speed Dial, even
when the Tone Span field is not set to Timed. This feature applies while
in Phone Mode for the current Phone System.
Notes
If you
do not have complete knowledge of the system configuration that this radio
will be operating on, do not attempt
to modify this setting!

### Tx Tone Interval (DTMF)

*Source: `(root)/_Tx_Tone_Interval_(DTMF).htm`*

Tx Tone Interval (DTMF)
Selects the amount of time that the radio waits between DTMF digits
during a preprogrammed Speed Dial. Once the Tx Tone Duration ends, this
Tx Tone Interval begins, and vice-versa. This applies for the current
DTMF Signaling System. The range is from 25 ms to 6400 ms, in increments
of 25 ms.

### Tx Tone Interval (Phone)

*Source: `(root)/_Tx_Tone_Interval_(Phone).htm`*

Tx Tone Interval (Phone)
Selects the amount of time that the radio waits between DTMF digits
during a preprogrammed Speed Dial. Once Tx Tone Duration ends, the Tone
Interval begins, and vice-versa. This feature applies while in Phone Mode
for the current Phone System.
Notes
If you
do not have complete knowledge of the system configuration that this radio
will be operating on, do not attempt
to modify this setting!

### Unit ID

*Source: `(root)/_Unit_ID.htm`*

Unit ID
The electronic tuning/alignment information of a
particular radio.

### Unmute

*Source: `(root)/_Unmute.htm`*

Unmute
When the radio opens its speaker to receive audio.

### Voice Call

*Source: `(root)/_Voice_Call.htm`*

Voice Call
Signaling System calls: A Voice Sel Cal, or a Call Alert with Voice.

### Voice Storage Play

*Source: `(root)/_Voice_Storage_Play.htm`*

Voice Storage Play
Plays back a recorded message.

### Voice Storage Record

*Source: `(root)/_Voice_Storage_Record.htm`*

Voice Storage Record
Record incoming call (manual operation) or memo a message.

### Whisper Mode

*Source: `(root)/_Whisper_Mode.htm`*

Whisper Mode
Increases the radio microphone gain to allow the user to speak quietly.

### Whisper Mode On/Off

*Source: `(root)/_Whisper_Mode_On_Off.htm`*

Whisper Mode On/Off
Increases the radio microphone gain to allow the user to speak quietly.

### Write

*Source: `(root)/_Write.htm`*

Write
The transfer of programming information from the
computers temporary memory (RAM) to the radio via the RIB communication
link, and the computer�s COM Port.
1.
From the Device menu choose Write.
2.
From the tool bar click:

### XPAND

*Source: `(root)/_XPAND.htm`*

XPAND
Allows further improvement of voice quality through a Long-Press or
Short-Press of a preprogrammed button. It compresses your voice at transmission,
and expands it when receiving while simultaneously reducing extraneous
noise. However, to enjoy this benefit, all transmitting and receiving
radios must have this feature activated.

### Auto Reset Timer Type

*Source: `(root)/_auto_reset_timer_type_glosspop.htm`*

Auto Reset Timer Type
Selects the Timer or Manual rule having to do with
Release Squelch Signaling Systems.
Release Squelch temporarily adds an exception to
the Signaling Squelch Unmuting Rule. That is, once a Voice Call has been
received, and then Muting occurs, for the radio to Unmute again during
the Auto timer, or Manual duration, Voice Call is temporarily not
required for the Unmuting to occur. Therefore, when the radio is in the
Release Squelch state, only the radio�s Unmute Rules are then required
to receive a call.
Once Release Squelch ends, by Auto timer expiration,
or by the radio-user Manually pressing the Monitor button, the full Signaling
Squelch Unmuting Rules are again required for unmuting to occur.
When Signaling Squelch is set to �Or�, and during
the Release Squelch state, only Carrier Squelch Detect is required to
unmute the radio.

### Auto_w/Carrier_Override

*Source: `(root)/_auto_w_carrier_override_popsonly.htm`*

Auto w/ Carrier Override
The timer begins on the receiving radio once its Signaling Squelch Unmuting
Rules are met. (While the timer is running, the radio is in the Release
Squelch State.)
While
the timer is active, it is stopped and reset every time the radio�s PTT
button is pressed. The timer is re-started when PTT is released.
Once the radio is muted, the timer is reset and re-started in effect
extending the Release Squelch state again.
If the radio is muted when the timer expires the Signaling Squelch Unmuting
Rules are then required again.
If the
radio is unmuted when the timer expires the radio remains unmuted.

### Auto_w/o_Carrier_Override

*Source: `(root)/_auto_w_o_carrier_override_popsonly.htm`*

Auto w/o Carrier Override
The timer begins on the receiving radio once its Signaling Squelch Unmuting
Rules are met. (While the timer is running, the radio is in the Release
Squelch State.)
While the timer is active, it is stopped and reset every time the radio�s
PTT button is pressed. The timer is re-started when PTT is released.
If the timer expires regardless of whether the radio is muted or unmuted;
the radio is muted, the Release Squelch State is ended, and the radio�s
Signaling Squelch Unmuting Rules are again required.

### Battery Indicator (non-display)

*Source: `(root)/_battery_indicator_(non-display).htm`*

Battery Indicator (non-display)
The Radio�s LED indicator presents the following colors based on current
battery charge levels.
Battery Level
LED Indicator
High
=
Green
Sufficient
=
Yellow
Low
=
Flashing Red
Very Low
=
None

### CES Data Terminal

*Source: `(root)/_ces_data_terminal.htm`*

CES Data Terminal
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Data PTT
Input
Disabled
Low
4
Unassigned
Output
Disabled
High
6
Channel Select 1
Input
Disabled
Low
8
PL/CSQ/Talkgroup Detect
Output
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Rx Audio Mute
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low

### Channel Steering

*Source: `(root)/_channel_steering_pop.htm`*

Channel Steering
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Unassigned
Input
Disabled
Low
4
Unassigned
Output
Disabled
High
6
Channel Select 1
Input
Disabled
Low
8
Channel Select 2
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Channel Select 3
Input
Disabled
Low
14
Channel Select 4
Input
Disabled
Low

### Tel Interconnect (ZR340) Rx (Select 5)

*Source: `(root)/_community_rptr_(ZR340)_Rx_(Select_5).htm`*

Tel Interconnect (ZR340) Rx (Select 5)
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Unassigned
Input
Disabled
Low
4
Carrier Detect
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
PL/DPL Detect
Output
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Filtered Audio

### Tel Interconnect (ZR340) Tx (Select 5)

*Source: `(root)/_community_rptr_(ZR340)_Tx_(Select_5).htm`*

Tel Interconnect (ZR340) Tx (Select 5)
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Voice PTT
Input
Disabled
Low
4
Carrier Detect
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Filtered Audio

### Community Repeater ZR310 RX

*Source: `(root)/_community_rptr_zr310_rx_poponly.htm`*

Community RPTR (ZR310) Rx
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Unassigned
Input
Disabled
Low
4
CSQ Detect
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Flat Audio (Unfiltered)

### Community Repeater ZR310 TX

*Source: `(root)/_community_rptr_zr310_tx_popsonly.htm`*

Community RPTR (ZR310) Tx
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
External Mic PTT
Input
Disabled
Low
4
CSQ Detect
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Flat Audio (Unfiltered)

### Community Repeater ZR340 RX

*Source: `(root)/_community_rptr_zr340_rx_poponly.htm`*

Tel Interconnect (ZR340) Rx
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Unassigned
Input
Disabled
Low
4
CSQ Detect
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
PL/DPL & CSQ Detect
Output
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Filtered Audio

### Community Repeater ZR340 TX

*Source: `(root)/_community_rptr_zr340_tx_poponly.htm`*

Tel Interconnect (ZR340) Tx
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
External Mic PTT
Input
Disabled
Low
4
CSQ Detect
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Filtered Audio

### Conventional Personality

*Source: `(root)/_conventional_personality_glosspop.htm`*

Conventional Personality
Defined individual Conventional Personality functionality.
Conventional dispatch is one of two dispatch modes. Conventional channels
can only communicate to radios operating on Conventional channels.

### Data PTT Overrides Voice

*Source: `(root)/_data_ptt_overrides_voice.htm`*

Data PTT Overrides Voice
When checked, selects PTT with a data transmission to override a voice
transmission. When the radio is transmitting or receiving a voice transmission,
enabling this selection allows PTT with data to interrupt the voice transmission
and begin its own transmission.

### Debounce

*Source: `(root)/_debounce_pop.htm`*

Debounce
When checked, causes the Debounce Duration to be used for an Accessory
Connector Pin selected functionality. The Debounce Duration is the amount
of time that the radio waits before rechecking the pin�s Active Level.

### Default Package

*Source: `(root)/_default_package_poponly.htm`*

Default Package
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
External Mic PTT
Input
Enabled
Low
4
Unassigned
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Filtered Audio

### DOS Auto Mute Duration

*Source: `(root)/_dos_auto_mute_duration_pop.htm`*

DOS Auto Mute Duration
Selects the amount of time that the radio is muted once Carrier Squelch
is detected. This DOS timer is then active while receiving MDC Signaling
data, helping to reduce unwanted noise. This applies for the current MDC
- Signaling System. Time is in milliseconds.
Notes
If you
do not have complete knowledge of the system configuration that this radio
will be operating on, do not attempt
to modify this setting!

### Emergency Revert Channel (MDC)

*Source: `(root)/_emergency_revert_Channel_mdc_pop.htm`*

Emergency Revert Channel (MDC)
Selects the channel (by its CPS given name) to be
used during Emergency Mode. No matter what channel the radio is currently
operating on, the radio is automatically switched to this channel for
an emergency transmission.

### Emergency Type

*Source: `(root)/_emergency_type_pop.htm`*

Emergency Type
Selects behavioral traits of the transmitting radio
while operating in Emergency Mode.

### High Low Power

*Source: `(root)/_high_low_power_pop.htm`*

High/Low Power
This allows the radio-user to adjust the Transmit Power setting to �High�
or �Low�.

### Hot Mic Source

*Source: `(root)/_hot_mic_source_pop.htm`*

Hot Mic Source
Selects which microphone automatically keys-up and accepts audio and
then automatically de-keys when audio is no longer present. The VOX field
determines if Hot Mic is available on a per Conventional Personality basis.

### Individual ID Tones

*Source: `(root)/_individual_id_tones_pop.htm`*

Individual ID Tones
Individual ID Tones allows you to select receive
frequencies for the current Quik-Call II (QCII) Signaling System. Frequencies
can be selected by their correlating code.

### kHz

*Source: `(root)/_kHz.htm`*

kHz
The abbreviation for Kilohertz. One Kilohertz is
equal to one thousand Hertz (Hz).

### Local Distance

*Source: `(root)/_local_distance_pop.htm`*

Local/Distance
Use this feature between Local mode (low sensitivity) and Distance mode
(normal sensitivity). When Local mode is set, you will not hear weak transmissions.
When Distance mode is set you will hear all transmissions, including weaker
signals.

### MDC System Window

*Source: `(root)/_mdc_system_window_glosspop.htm`*

MDC System Window
The MDC System window allows you to create and delete
MDC Signaling Systems, as well as define individual MDC Signaling System
functionality.

### Microphone Gain

*Source: `(root)/_microphone_gain_pop.htm`*

Microphone Gain
Selects the Gain control for the standard microphone. Gain determines
a non-fluctuating audio volume level for the receiving radio�s speaker.
This level remains constant regardless of the audio level that the transmitting
radio�s microphone receives. The radio-user on the receiving radio can
as always adjust speaker levels.
The standard microphone is on the front side of a Portable radio, and
attaches to the microphone jack of a Mobile radio.
Microphone Gain applies to both internal as well as external (accessories)
microphones of a Portable radio.

### Off-Hook Defeats PL

*Source: `(root)/_off_hook_defects_pl_pop.htm`*

Off-Hook Defeats PL
When checked, causes the radio to unmute to all carrier squelch activity
on a channel when the microphone is off the hook. This is true even when
the selected radio channel�s Unmute/Mute rule requires PL (Private Line).

### Off-Hook Suspends Scan

*Source: `(root)/_off_hook_suspends_scan_pop.htm`*

Off-Hook Suspends Scan
Selects the radio�s Scan Mode behavior when the microphone is off the
hook.

### Paging Encoder Package

*Source: `(root)/_paging_encoder_package_popsonly.htm`*

Paging Encoder Package
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Unassigned
Input
Disabled
Low
4
External Alarm
Output
Disabled
High
6
Data PTT
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Tx PL Inhibit
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Filtered Audio

### Phone Patch or i750R Package

*Source: `(root)/_phone_patch_or_i750r_package_popsonly.htm`*

Phone Patch or i750R
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
External Mic PTT
Input
Enabled
Low
4
External Alarm
Output
Disabled
High
6
Tx PL Inhibit
Input
Disabled
Low
8
PL/DPL & CSQ Detect
Output
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
CSQ Detect
Output
Disabled
Low
Rx Audio Type = Flat Audio (Unfiltered)

### Pretime

*Source: `(root)/_pretime_pop.htm`*

Pretime
Selects the amount of time between PTT button press and the first digit
of the Signaling System data packet transmission. This time allows the
receiving radio to stabilize before receiving data. This applies for the
current MDC Signaling System and DTMF Signaling System.

### PTT Sidetone (MDC)

*Source: `(root)/_ptt_sidetone_(MDC).htm`*

PTT Sidetone (MDC)
When checked, causes the radio to sound a continuous
alert tone, from the time the PTT button is pressed, until the time that
the Signaling System data packet is transmitted. The purpose is to indicate
to the radio-user when voice may be initiated. This feature applies for
the current MDC Signaling System.

### Public Address Package

*Source: `(root)/_public_address_package_popsonly.htm`*

Public Address Package
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Unassigned
Input
Disabled
Low
4
External Alarm
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
PA Switch
Input
Enabled
Low
Rx Audio Type = Filtered Audio

### Radio to Radio Clone

*Source: `(root)/_radio_to_radio_clone_pop.htm`*

Radio to Radio Clone
When checked, enables cloning between two portable radios of the same
model.

### Remote Package

*Source: `(root)/_remote_package_popsonly.htm`*

Remote Package
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
External Mic PTT
Input
Enabled
Low
4
External Alarm
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Mic Off Hook
Input
Enabled
Low
Rx Audio Type = Filtered Audio

### Repeater Talkaround

*Source: `(root)/_repeater_talkaround_pop.htm`*

Repeater/Talkaround
This allows the radio-user to toggle between Repeater Mode and Talkaround
Mode. This is true provided that the radio�s current Channel Selector
selected channel has Allow Talkaround checked.

### Rick or i20R RX Package

*Source: `(root)/_rick_or_i20r_rx_package_popsonly.htm`*

RICK or i20R Rx
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
Unassigned
Input
Disabled
Low
4
External Alarm
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
PL/DPL & CSQ Detect
Output
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Flat Audio (Unfiltered)

### Rick or i20R TX Package

*Source: `(root)/_rick_or_i20r_tx_glosspop.htm`*

RICK or i20R Tx
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
External Mic PTT
Input
Enabled
Low
4
Unassigned
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
Unassigned
Input
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Flat Audio (Unfiltered)

### Rx Signaling System

*Source: `(root)/_rx_signaling_system_pop.htm`*

Rx Signaling System
Selects the Signaling System and data type that
the radio uses when receiving Signaling data, while operating on the current
Conventional Personality.

### Scan List

*Source: `(root)/_scan_list_pop.htm`*

Scan List
Selects the Scan List used by the radio while operating
in the Scan Mode, on the current  Personality.
The Scan List determines which callers the radio scans for (actively looks
for), and considers Unmuting to, on the selected Scan List channels (Personalities).

### Scan List/Scan List Members

*Source: `(root)/_scan_list_scan_list_members_glosspop.htm`*

Scan List/Scan List Members
The Scan List contains groupings of Personalities
that make up Scan List Member channels. This list of Scan List Member
channels can then be scanned for transmission activity - one at a time,
when the radio is in Scan Mode.

### Scan Operation

*Source: `(root)/_scan_operation_popup.htm`*

Scan Operation
This allows the radio-user to enter the radio�s Scan Mode. This is true
provided the Personality for the selected channel has a Scan List selected.

### Signaling Systems

*Source: `(root)/_signaling_systems_glosspop.htm`*

Signaling Systems
Signaling Systems can be created in their data type
window then can be assigned to Personalities.

### Squelch_Threshold

*Source: `(root)/_squelch_threshold.htm`*

Squelch Threshold
A measurement of the strength of an incoming transmission. If the incoming
signal is not strong enough to produce a clear transmission, then it should
not be heard. This helps to filter out unwanted noise.

### Tel Interconnect ZR340 Simplex

*Source: `(root)/_tel_interconnect_zr340_simplex_popsonly.htm`*

Tel Interconnect (ZR340) Simplex
Pin
Pin
Configuration
Direction
Debounce
Active
Level
3
External Mic PTT
Input
Enabled
Low
4
CSQ Detect
Output
Disabled
High
6
Unassigned
Input
Disabled
Low
8
Unassigned
Input
Disabled
Low
9
Unassigned
Input
Disabled
Low
12
PL/DPL
Output
Disabled
Low
14
Unassigned
Input
Disabled
Low
Rx Audio Type = Filtered Audio

### Toggle VOX Operation

*Source: `(root)/_toggle_vox_operation_poponlypop.htm`*

Toggle VOX Operation
This button allows the radio-user to temporarily change the CPS - Voice
Operated Tx setting while operating on a Conventional Personality. When
the radio-user moves off and then back to a channel, the CPS setting is
again reinstated.
Voice Operated Tx allows the selected microphone to automatically key-up
due to recognition of voice. The radio then automatically de-keys when
audio is no longer present.

### Tx Low Power Value

*Source: `(root)/_tx_low_power_value_pop.htm`*

Tx Low Power Value
For mobile radios this setting determines the wattage for the CPS Tx
Power Level "Low" setting. The "Low" setting can also
be radio-user selected with a programmable button press.

### Volume Set

*Source: `(root)/_volume_set.htm`*

Volume Set
Emits a tone indicated the current volume level of the radio�s speaker. The volume level is based on the current setting of the radio�s Volume Selector Knob.

### VOX Microphone Gain

*Source: `(root)/_vox_microphone_gain_pop.htm`*

VOX Microphone Gain
Selects the Gain for the VOX Microphone headset. This adjusts the sensitivity
of the microphone.
The VOX Microphone attaches to the Accessory Connector of a portable
radio.

### Accessory Connector Pin Functionality

*Source: `(root)/accessory_connector_pin_functionality_popsonly.htm`*

Mobile Radio Accessory Connector Pin Functionality
Predetermined
Functionality:
Pin
Function
Direction
Comments
Description
1
External Speaker (-)
Not Programmable
Connect external 8 or 4 ohms speaker to pin 1 and 16.
Caution: Bridge-type output. Neither pin 1 or 16 is grounded.
2
External Microphone Audio
Partially Programmable
Input impedence:500 ohms
80 mV rms at 1 kHz for 60% deviation. This path is enabled when external
mic PTT is keyed.
3
External Mic PTT
Input Only
Fully Programmable,
12V Active Low Only
Put this pin low (less than 0.66 Vdc) to key transmitter and enable
external mic audio path. This path is pulled low via a diode when frontpanel
mic PTT is pulled low to allow sensing of mic PTT by accessory.
This pin pulled high to 3.3 Vdc via 3.3k ohms
4
Output Only
Fully Programmable
Defaults to External Alarm. Provides an active high to 13.8 Vdc battery
supply. maximum current: 0.15 amps.
CAUTION: Do not short to ground, this may damage the radio.
5
Flat Tx Audio Input
Partially Programmable
Input impedance: Greater than 35k ohms. The nominal input level is 150
mV rms for 60% deviation.
6
Input Only
Fully Programmable
Serial Communication Interface. On MDC and P/L radios only, this pin
can be configured as a general purpose input by removing resistor R421.
7
Ground
Not Programmable
Used as ground.
8
Selectable Input/ Output
Fully Programmable
Input or output depending on dealer programming.
9
Emergency Input
Special Input
Fully Programmable
When connecting the Emergency Footswitch between pins 9 and 7, the radio
will sense the connection upon Power-up.
Shorting this pin to Ground by pressing the switch when the radio is
OFF, turns ON the radio in Emergency Mode.
Shorting this pin to Ground by pressing the switch when the radio is
ON, activates Emergency Mode.
To turn OFF a radio that was turned ON by Emergency Footswitch (ON/
OFF knob in OFF position) turn knob to ON and then to OFF position.
10
Ignition Sense
Special Input
Not Programmable,
Active High
For optional 3-wire ignition control, connect this pin to the vehicle
ignition-controlled voltage source for ignition-controlled radio ON/OFF.
To resume NON ignition state, remove the battery connection for 10 seconds;
remove the ignition connection from this pin and re-connect the battery
connections.
11
Receiver Audio Output
Output Only
Not Programmable
Programmable (using CPS in the RX Audio Type): 660mV rms (de-emphasized/muted)
or 330mV rms (non de-emphasized muted. Minimum load resistance: 5k ohms.
12
Selectable Input/ Output
Fully Programmable
Input or Output.
13
Switched Battery (+)
Not Programmable
(Switched Battery Voltage) 13.8 Vdc (500 mA max.) when radio is ON.
14
Selectable Input/ Output
Fully Programmable
Input or Output.
15
Internal Speaker (+)
Not Programmable
Connect to internal speaker (+) and by internal jumper to pin 16.
16
External Speaker (-)
Not Programmable
Connect external 8 or 4 ohms speaker to pins 1 and 16.
CAUTION: Bridge type output. Neither pin 1 nor 16 is grounded.

### DPL Squelch Codes

*Source: `(root)/dpl_squelch_codes.htm`*

DPL Squelch Codes
Code
Code
Code
Code
023
152
343
565
025
155
346
606
026
156
351
612
031
162
364
624
032
165
365
627
043
172
371
631
047
174
411
632
051
205
412
645*
054
223
413
654
065
226
423
662
071
243
431
664
072
244
432
703
073
245
445
712
074
251
464
723
114
261
465
731
115
263
466
732
116
265
503
734
125
271
506
743
131
306
516
754
132
311
525*
134
315
532
143
331
546
Notes
The
codes marked with an asterisk are not part of the 83 standard EIA/TIA-603
codes.

### Frequencies & Codes (TPL)

*Source: `(root)/frequencies_codes_tpl_.htm`*

TPL Squelch Frequencies & Codes
Freq (Hz) = Code
Freq (Hz)  =
Code
67.0
XZ
136.5
4Z
69.3
WZ
141.3
4A
71.9
XA
146.2
4B
74.4
WA
151.4
5Z
77.0
XB
156.7
5A
79.7
WB
162.2
5B
82.5
YZ
167.9
6Z
85.4
YA
173.8
6A
88.5
YB
179.9
6B
91.5
ZZ
186.2
7Z
94.8
ZA
192.8
7A
97.4
ZB
203.5
M1
100.0
1Z
206.5
8Z
103.5
1A
210.7
M2
107.2
1B
218.1
M3
110.9
2Z
225.7
M4
114.8
2A
229.1
9Z
118.8
2B
233.6
M5
123.0
3Z
241.8
M6
127.3
3A
250.3
M7
131.8
3B
254.1
0Z

### Nuisance Delete

*Source: `(root)/nuisance_delete.htm`*

Nuisance Delete
When a Scan
List
Member continually generates unwanted noise, this allows the radio-user
to temporarily remove the channel
from the current Active
Scan.
This feature applies for the current Scan
List.
This is accomplished by the radio-user with a long-press of the short-press
Scan button while in Landed
Scan Mode,
and while landed on the member to be removed.
Notes
Switching
to a another channel on the radio�s Channel Selector, or turning the radio
off and then back on, effectively brings that temporarily removed Scan
List member channel back to an actively scanned status.
Nuisance Delete is NOT possible:
For
a Priority #1 and Priority
#2 Scan List Member channel.
For a Designated
TX
channel.
If the current
Scan List does not contain at least two members before a Nuisance Delete
occurs.

### Priority #1 Scan List Member

*Source: `(root)/priority_1_scan_type.htm`*

Priority #1 Scan List Member
Causes the highest priority to be assigned to the first member/row in
the current Scan
List.
When the radio is scanning a Scan List (Active
Scan),
50% of the scans are targeted at the Priority #1 Member channel.
Example
If the Priority
#1 Member is P1, and the non-priority Scan List Members are Nn, then the
scanning sequence is: P1 N1, P1
N2, P1 N3,
P1 N4, P1 N5, etc.
Notes
When
the radio�s speaker is unmuted
to a non-priority call (Landed
Scan mode),
or is unmuted on the Priority
#2 Member (if one exists), the radio continues to mute
at a specific time interval (the Priority
Sample Time), and scan for transmission activity on the Priority #1
Member channel. If the radio discovers a valid Priority #1 transmission,
it drops the current transmission, and unmutes to the Priority #1 call.
Available
when the Landed Scan List member and the Priority #1 Member are both of
Conventional Dispatch type.
When the radio
is in Landed Scan mode for a Priority #1 Member call, priority member
checking is not necessary.
Available when
the Scan List Member �#1� Personality is set to Priority #1.

### Quik-Call II Standard Frequency/Code Tones

*Source: `(root)/quik_call_ii_standard_frequency_code_tones.htm`*

Quik-Call II Standard Frequency/Code Tones
Freq (Hz)
= Code
Freq
(Hz)
= Code
Freq
(Hz)
= Code
Freq
(Hz)
= Code
Freq
(Hz)
= Code
Freq
(Hz)
= Code
288.5
138
441.6
EA
582.1
HZ
716.7
KZ
892.5
A5
1357.6
197
296.5
108
445.7
146
584.8
151
726.8
155
903.2
159
1395.0
198
304.7
139
457.1
EB
592.5
A1
727.5
A8
907.5
C5
1433.4
199
313.0
109
457.9
116
600.9
121
741.3
KA
912.0
MA
1472.9
170
321.7
140
470.5
147
602.6
HA
746.8
125
922.5
B5
1513.5
171
330.5
110
473.2
FZ
607.5
B1
757.5
A2
928.1
129
1555.2
172
339.6
141
483.5
117
617.4
152
767.4
156
937.5
A6
1598.0
173
346.7
CZ
489.8
FA
622.5
C9
772.5
C2
944.1
MB
1642.0
174
349.0
111
496.8
148
623.7
HB
787.5
B2
952.5
C6
1687.2
175
358.6
142
507.0
FB
634.5
122
788.5
126
953.7
160
1733.7
176
358.9
CA
510.5
118
637.5
A9
794.3
LZ
967.5
B6
1781.5
177
368.5
112
517.5
B7
645.7
JZ
802.5
A3
979.9
130
1830.5
178
371.5
CB
524.6
149
651.9
153
810.2
157
1006.9
161
1881.0
179
378.6
143
524.8
GZ
652.5
B0
817.5
C3
1034.7
131
1930.2
200
384.6
DZ
532.5
C7
667.5
C0
822.2
LA
1063.2
162
1989.1
201
389.0
113
539.0
119
668.3
JA
832.5
127
1092.4
189
2043.8
202
398.1
DA
543.3
GA
669.9
123
847.5
A4
1122.5
190
2094.5
203
399.8
144
547.5
A7
682.5
A0
851.1
LB
1153.4
191
2155.6
204
410.8
114
553.9
150
688.3
154
855.5
158
1185.2
192
2212.2
205
412.1
DB
562.3
GB
691.8
JB
862.5
C4
1217.8
193
2271.7
206
422.1
145
562.5
B8
697.5
B9
877.5
B4
1251.4
194
2334.6
207
426.6
EZ
569.1
120
707.3
124
879.0
128
1285.8
195
2401.0
208
433.7
115
577.5
C8
712.5
C1
881.0
MZ
1321.2
196
2468.2
209

### Rx Parameters

*Source: `(root)/rx_parameters_glosstop.htm`*

Rx Parameters Include:
Rx
Frequency
Rx
Squelch Type
Rx
TPL Frequency
Rx
TPL Code
Rx
DPL Code
Rx
DPL Invert
Rx
System

### Tx Parameters

*Source: `(root)/tx_parameters_glosstop.htm`*

Tx Parameters Include:
Tx
Frequency
Tx
Squelch Type
Tx
TPL Frequency
Tx
TPL Code
Tx
DPL Code
Tx
DPL Invert
Tx
System


---

## General Radio Settings

### Escalert (Menu)

*Source: `general_settings/Escalert_menu.htm`*

Escalert (Menu)
When checked, enables the Escalert feature to be included in the Tones
menu allowing the radio-user to toggle on and off this functionality.
Escalert causes the radio to gradually increase the volume of a repetitive
alert tone. This repetitive tone is an alert of an incoming radio call.
The CPS-user
can also make this selection with the Escalert
field in the General Settings.
Notes
Available
when the radio is a Display model.

### Option Board Configuration Download

*Source: `general_settings/Option_Board_Configuration_Download.htm`*

Option Board Configuration Download
When checked, causes the radio to download third party option board
configuration data which initializes specific option board functionality
on a per Conventional
Personality
basis. Option board configuration data downloads apply only to specific
option board types.
Notes
This
feature is available only on radios that support an option board.
�Advanced�
option board types allow for unique settings on a per Conventional Personality
basis with the Option
Board Configuration Index fields.
Available
when Import has been run. The Import feature allows the CPS
user to import this third party option board configuration data.
Available
when the Option Board Type is set to Advanced Option Interface.

### Option Board Type

*Source: `general_settings/Option_Board_Type.htm`*

Option Board Type
Selects the type of option board that has been installed in the current
radio. This prompts the radio to expect certain new functionality.
Choices
Functionality
None:
Simple Decoder:
Supports DTMF Decoder option boards. DTMF
decode features are available with this selection.
Simple Option Interface:
Supports simple option board commands.
Advanced Option Interface:
Supports
advanced option board commands.
Notes
This
feature is available only on radios that support an option board.

### Radio Prompt Language

*Source: `general_settings/Radio_Prompt_Language.htm`*

Radio Prompt Language
A different language may be used for both the radio�s menu and prompt
messages.
The available languages are English and Russian.
Notes
Available
when the radio is a Conventional Display model.
Available when
the codeplug supports Russian and the version is equal to or higher than
8.00.

### Self Test Report

*Source: `general_settings/Self_Test_Report.htm`*

Self Test Report
(Expert Feature)
When checked, the radio sends self test status data to the data terminal
via SBEP after powering up successfully.
Notes
Available
when the radio is a Mobile model.
Available
when the radio's Codeplug major version is Seven and above.

### Alert Tone Volume Offset

*Source: `general_settings/alert_tone_volume_offset.htm`*

Alert Tone Volume Offset
Based on the Alert Tone Volume Offset setting, alert
tone volume levels will be constantly
offset higher, lower, or equal to, receive audio volume levels, which
are controlled by the radio�s Volume Knob position. Range is from -50
to +50, in increments of 10.
Notes
The
alert tone volume levels always remain within the radio�s internal Minimum
/ Maximum range for receive audio volume levels.
Headset
Sidetone (hearing one's voice through an accessory headset) for a
portable model is controlled through this field.
The following
rules apply:
If
the Alert Tone Volume Offset field is set to a negative (-) amount, alert
tone volume levels never exceed the (Maximum Volume setting �less� the
Volume Offset amount).
If
the Alert Tone Volume Offset field is set to a positive (+) amount, all
alert tone volume levels never go lower than the (Minimum Volume setting
�plus� the Volume Offset amount).

### Busy LED

*Source: `general_settings/busy_led_radio_configuration.htm`*

Busy LED
When checked, causes the radio�s LED to flash red when the current Personality
is receiving activity.

### Codeplug Password

*Source: `general_settings/codeplug_password.htm`*

Codeplug Password
(Expert Feature)
Causes the current codeplug
to be Password protected. The password prompt appears when a CPS-user
attempts to read this codeplug. This is true whether the codeplug is stored
in a radio or in a file.
Enables and selects the eight character password that is required when
reading
the current codeplug. This is true whether the codeplug is stored in a
radio or in file format.
The range is from 1 to 8 characters consisting of letters, numbers,
or special characters. Valid characters available are: A-Z,
a-z, 0123456789, space, \, #, >, <, * +, _, /, -
Notes
Before
writing
to the radio, the radio is read
first to make sure that it has the same serial number and model number
as the file opened, and if the radio is password protected. Then, the
radio-user will be prompted to enter the password.
Entries
are case sensitive. Spaces used as suffixes will become empty.

### Front Panel Test

*Source: `general_settings/front_panel_test.htm`*

Front Panel Test
(Expert Feature)
Allows admittance into the radio�s FPA (Front
Panel Access)
testing mode.
Choices
Functionality
Controls:
Allows the radio to be placed in a mode
where the controls can be tested.
Controls & RF:
Allows the radio to be placed in a mode
where the controls and RF can be tested.
None:
Does not permit either the controls or RF
test mode of operation.
Notes
Do not
choose Controls & RF in countries that have strict regulations against
radiating unauthorized frequency tests in the air.

### Hot Mic Source

*Source: `general_settings/hot_mic_source.htm`*

Hot Mic Source
(Expert Feature)
Selects which microphone automatically keys-up
and accepts audio, and then automatically de-keys when audio is no longer
present while in Emergency Mode operation. The VOX
field determines if Hot Mic is available on a per Conventional
Personality
basis.
Choices available are:
Control Head
Accessory Connector
Notes
Available
when the radio is a Mobile model.

### Microphone Gain

*Source: `general_settings/microphone_gain_radio_configuration_.htm`*

Microphone Gain
Selects the Gain control for the standard microphone. Gain determines
a non-fluctuating audio volume level for the receiving radio�s speaker.
This level remains constant regardless of the audio level that the transmitting
radio�s microphone receives. The radio-user on the receiving radio can
as always adjust speaker levels.
The standard microphone is on the front side of a Portable radio, and
attaches to the microphone jack of a Mobile radio. Range is from 1.5 dB
to 46.5 dB, in increments of 1.5 dB.
Microphone Gain applies to both internal as well as external (accessories)
microphones of a Portable radio.

### Monitor Type

*Source: `general_settings/monitor_type_radio_configuration.htm`*

Monitor Type
(Expert Feature)
Selects the monitoring mode of a portable radio. Monitor allows the
radio-user to listen to all radio traffic for channels
of Conventional dispatch type. Monitor is possible for PL (Private
Line)
transmissions that do not match for the current channel.
Choices
Functionality
Open Squelch:
The radio�s speaker is constantly open to
all channel activity.
Silent:
The radio�s speaker unmutes
to any carrier
squelch
activity.
Notes
Available
when the radio is a Portable model.
This mode
is initiated when the Monitor Button is held down.

### Off-Hook Defeats PL

*Source: `general_settings/off_hook_defeats_pl.htm`*

Off-Hook Defeats PL
When checked, causes the mobile radio to unmute
to all carrier
squelch
activity on a channel
when the microphone is off the hook. This is true even when the selected
radio channel�s Unmute/Mute
rule requires PL
(Private Line).
This applies only when the Public Address (PA) accessory is turned off.
An On
Busy Channel
selection (for a channel) may also override this functionality. This feature
applies for Conventional
dispatch only.
Notes
Available
when the radio is a Mobile model.
Available when
Busy Channel Lockout is not set
to 'On Carrier' or 'On Wrong PL'.
This mode is
similar to Silent
Monitor
initiated by a short-press of a mobile radio�s programmable button.

### Radio To Radio Clone

*Source: `general_settings/radio_to_radio_clone.htm`*

Radio To Radio Clone
(Expert Feature)
Enables cloning between two portable radios of the same model and major
codeplug version.
Connect the two radios together with the cloning
cable.
Power up the destination radio.
Press and hold the two side buttons at the same
time on the source radio and then power up the source radio.
Notes
Radio
To Radio cloning is supported for portable models only.
The source
radios serial number cannot be blank.
The source
and destination radios generate a clone entry tone at the initiation of
the clone operation. Upon completion of the clone operation, the source
radio generates a clone exit tone, and both the source and destination
radios reset.
The source
or destination radio generates a continuous tone, if an error occurs during
clone operation.

### Rx Low Battery Alert Interval

*Source: `general_settings/rx_low_battery_alert_interval_radio_configuration.htm`*

Rx Low Battery Alert Interval
(Expert Feature)
Selects the amount of time that defines the silent interval between
each low battery alert tone for a portable radio. This tone only
occurs while a call is being received or while the radio is in idle mode,
and when the radio�s low battery threshold is reached. Range is from 0
seconds to 635 seconds, in increments of 5 seconds.
Notes
Available
when the radio is a Portable model.

### Sticky Permanent Monitor Alert

*Source: `general_settings/sticky_permanent_monitor_alert_.htm`*

Sticky Permanent Monitor Alert
(Expert Feature)
When checked, causes a portable radio to generate an alert tone upon
entering Sticky Permanent Monitor Mode. Therefore, the alert tone is sounded
when the Monitor button has reached its Long
Press Duration duration. This feature only
applies for channels capable of Conventional Dispatch.
Notes
Available
when the radio is a Portable model.

### Tx High Power Value

*Source: `general_settings/tx_high_power_value.htm`*

Tx High Power Value
(Expert Feature)
For mobile radios this setting determines the wattage for the CPS
- Tx
Power Level "High" setting. The "High" setting
can also be radio-user selected with a programmable button press.
Tx High Power mode is used when a stronger signal is needed to extend
transmission distances.
For Low Power UHF/VHF mobile radios, the range is from 1 W to 25 W,
in increments of 0.5 W.
For High Power UHF mobile radios, the range is from 25 W to 40 W, in
increments of 0.5 W.
For High Power VHF mobile radios, the range is from 25 W to 45 W, in
increments of 0.5 W.
Notes
Available
when the radio is a Mobile model.

### Tx Low Battery Alert

*Source: `general_settings/tx_low_battery_alert.htm`*

Tx Low Battery Alert
When checked, causes a portable radio to sound an alert tone (chirp)
when its low battery threshold is reached. This tone only
occurs following a transmission and when the PTT button is released.
Notes
Available
when the radio is a Portable model.

### Tx Low Battery LED

*Source: `general_settings/tx_low_battery_led_radio_configuration.htm`*

Tx Low Battery LED
When checked, causes a portable radio's LED to flash red when the battery
transmit threshold falls below the specific level required for successful
transmission. This occurs only
while the radio is transmitting.
Notes
Available
when the radio is a Portable model.

### Tx Low Power Value

*Source: `general_settings/tx_low_power_value.htm`*

Tx Low Power Value
(Expert Feature)
For mobile radios, this setting determines the wattage for the CPS
- Tx
Power Level "Low" setting. The "Low" setting can
also be radio-user selected with a programmable button press.
Tx Low Power mode is used when communicating in close proximity, and
to keep the radio from transmitting into other geographical groups
operating on the same frequency.
For Low Power UHF/VHF mobile radios, the range is from 1 W to 25 W,
in increments of 0.5 W.
For High Power UHF mobile radios, the range is from 25 W to 40 W, in
increments of 0.5 W.
For High Power VHF mobile radios, the range is from 25 W to 45 W, in
increments of 0.5 W.
Notes
Available
when the radio is a Mobile model.


---

## Getting Started / How-To

### Basic and Expert Views

*Source: `getting_started/basic_and_expert_views.htm`*

Basic and Expert Views
The Basic View displays most of the controls that are used on a routine
basis. The Expert View displays all the information found under the Basic
View with additional controls for more advanced features that are used
less frequently.
From the View menu choose Expert or Basic.
The CPS
defaults to Basic View during startup, or you can change the default in
Preferences to either Expert or
Last Selected.
There is an icon in the status bar at the bottom to indicate the current
view mode. If the icon is grayed , it is in Basic View.
If the icon is highlighted , it is in Expert View.
From
the Edit menu choose Preferences.
Make your choice in
the Startup View.

### Choosing a Communications Port

*Source: `getting_started/choosing_a_communications_port.htm`*

Choosing a Communications Port
When programming a radio, the radio must be connected to a RIB
cable
that connects to a Radio
Interface Box.
The Radio Interface Box is then connected to the COM
Port
of the computer. For a mobile radio, a ribless cable can be used that
connects directly to the computer's CPS COM Port. The computer�s CPS
COM Port setting applies to the Read,
Write,
and Clone features. The CPS COM Port
is independent for each instance of the CPS that is running.
From
the Edit menu choose Preferences.
Select the communications
port.
Notes
The
CPS uses the last saved COM Port setting when it is launched.

### Reading from a Radio

*Source: `getting_started/reading_from_a_radio.htm`*

Reading from a Radio
Connect the radio via
the programming cable to the COM
Port.
Power-up the RIB
and radio.
From the Device
menu choose Read, or from the
tool bar click:

### Writing to a Radio

*Source: `getting_started/writing_to_a_radio.htm`*

Writing to a Radio
Connect the radio via
the programming cable to the COM
Port.
Power-up the RIB
and radio.
From the Device
menu choose Write, or from the
tool bar click:


---

## MDC System Configuration

### DOS Auto Mute Duration (MDC System)

*Source: `mdc/mdc_system/dos_auto_mute_duration_mdc_system.htm`*

DOS Auto Mute Duration (MDC System)
(Expert Feature)
Selects the amount of time that the radio is muted
once Carrier
Squelch
is detected. This DOS timer is then active while receiving MDC Signaling
data, helping to reduce unwanted noise. This applies for the current MDC
- Signaling
System.
The range is from 0 ms to 4500 ms, in increments of 25 ms.
Notes
If you
do not have complete knowledge of the system configuration that this radio
will be operating on, do not attempt
to modify this setting!

### Pretime (MDC System)

*Source: `mdc/mdc_system/pretime_mdc_system.htm`*

Pretime (MDC)
(Expert Feature)
Selects the amount of time between a PTT
button press and the first digit of a Signaling
System
data packet transmission. This time allows the receiving radio to stabilize
before receiving data. This applies for the current MDCSignaling System.
The range is from 0 ms to 4500 ms, in increments of 25 ms.
Notes
Available
when the radio model is capable of transmitting Radio Calls; PTT
ID,
Emergency Mode, or
Repeater
Mode.

### Primary ID (MDC System)

*Source: `mdc/mdc_system/primary_id_mdc_system.htm`*

Primary ID (MDC)
Selects the unique four digit ID that identifies the radio while operating
(transmitting or receiving MDC calls) on the current MDC
- Signaling
System.
When receiving an MDC transmission, the Primary ID allows the radio
to identify the incoming call as being addressed to it. The range is from
0001 to DEEE.
Notes
The character
F is not allowed in any of the digits to use.

### PTT ID Type (MDC System)

*Source: `mdc/mdc_system/ptt_id_type_mdc_system.htm`*

PTT ID Type (MDC)
Selects when the PTT
ID
is sent during a Normal
Dispatch
transmission for the current MDC
- Signaling
System.
Choices
Functionality
None:
Does not set previous, after, or both.
Pre Only:
Sent previous to a Normal Dispatch transmission.
Post Only:
Sent after a Normal Dispatch transmission.
Pre and Post:
Sent both prior to and after a Normal Dispatch
transmission.
Notes
Available when
the radio model is capable of receiving PTT ID.


---

## MDC1200 Signaling

### Adding MDC Systems

*Source: `mdc/add_mdc_system.htm`*

Adding MDC Systems
There are multiple ways to add MDC Systems.
Highlight MDC System  in
the tree view.
Click
the Add MDC System button, or
Right mouse
click on MDC System and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new MDC System (Sys) appears in the tree view.
Notes
Up to
4 MDC systems are allowed.

### Removing MDC Systems

*Source: `mdc/removing_mdc_systems.htm`*

Removing MDC Systems
There are multiple ways to remove MDC Systems.
Highlight the MDC System in the tree view.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu, or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The MDC System disappears from the tree view.
Notes


---

## Multiple Selection

### Multiple Selection

*Source: `multiple_selection/multiple_selection.htm`*

Multiple Selection
Multiple Signaling Systems, Personalities, Phone Systems, and Call Systems
can be configured at the same time with the same configurations.
For example, to configure the same Channel Bandwidth for multiple Conventional
Personalities, refer to the following steps.
Click the first Conventional Personality in the
tree view.
Hold the <Shift> key down and click the
last Conventional Personality to select all the Conventional Personalities.
Or, hold the <Ctrl> key to select any combination of Conventional
Personalities.
Or, hold the <Shift> key down while pressing the Up/Down arrow
keys to select Conventional Personalities one at a time.
Select the Channel Bandwidth, which will be configured
for all the selected Conventional Personalities.


---

## Personality (Per-Channel) Settings

### Allow Talkaround

*Source: `conventional_personalities/personality/allow_talkaround_enable_conventional_personality.htm`*

Allow Talkaround
When checked, allows the radio to operate in Talkaround
ModeRepeater
Mode,
while operating on the current Conventional
Personality.
Talkaround can also be selected by a radio-user (short or long programmable
button-press) or through the Talkaround
menu selection.
Disabling disallows the current personality the ability to operate in
Talkaround Mode.
Notes
In Talkaround
Mode the Rx
Parameters are used in place of the Tx
Parameters when transmitting.
If the Rx Parameters
and Tx Parameters are programmed the same for the current Conventional
Personality, the personality is in affect in a constant Talkaround mode,
therefore this field is automatically disabled.
Available when
Receive Only is unchecked.

### Auto Scan

*Source: `conventional_personalities/personality/auto_scan.htm`*

Auto Scan
When checked, causes the radio to automatically enter the Scan
Mode,
when the radio-user selects (with the Channel Selector) the current Personality.
When disabled, the radio-user is able to invoke the Scan Mode operation
through a button short-press while operating on the current Personality.
Notes
Available
when a Scan List is selected and at least
one Personality is a Scan List Member.
Available when
Scan List is not set to None.

### Channel Bandwidth

*Source: `conventional_personalities/personality/channel_bandwidth_conventional_personality.htm`*

Channel Bandwidth
Selects the channel bandwidth
while operating on the current Personality.
Choices available are:
12.5 kHz
20 kHz
25 kHz
Notes
India
models can only choose 12.5 kHz.

### Companding Mode

*Source: `conventional_personalities/personality/companding_mode_(EMEA).htm`*

Companding Mode
When checked, allows further improvement of voice quality. It compresses
your voice at transmission, and expands it when receiving while simultaneously
reducing extraneous noise. However, to enjoy this benefit, all transmitting
and receiving radios must have this feature activated.
Notes
Available
when Whisper Mode is not
checked.

### Emphasis Selection

*Source: `conventional_personalities/personality/emphasis_selection.htm`*

Emphasis Selection
(Expert Feature)
Selects the type of audio shaping used while operating on the current
Conventional
Personality.
These selections can enhance audio clarity.
Choices available are:
None
Pre-Emphasis
De-Emphasis
De-Emphasis and Pre-Emphasis

### Receive Only

*Source: `conventional_personalities/personality/receive_only.htm`*

Receive Only
When checked, prevents the radio from transmitting on the current Personality.
Notes
Receiving
calls is the only operation permitted
on this personality.

### Rx Frequency

*Source: `conventional_personalities/personality/rx_frequency.htm`*

Rx Frequency
Selects a designated frequency
used when receiving carrier
squelch
for the current Personality.
Notes
Increments
are dependent upon Channel
Bandwidth.

### Rx Reference Frequency

*Source: `conventional_personalities/personality/rx_reference_frequency.htm`*

Rx Reference Frequency
(Expert Feature)
Selects the Reference Frequency used when receiving on the current Conventional
Personality.
Choices available
are:
2.100 MHz
2.225 MHz
2.400 MHz
Default
Notes
It is
possible to disable the radio's ability to receive and or transmit data.
If you are not fully aware of the impact of this setting, DO
NOT MODIFY IT!

### Rx Signaling System

*Source: `conventional_personalities/personality/rx_signaling_system.htm`*

Rx Signaling System
Selects the Signaling
System
and data type that the radio uses when receiving signaling data, while
operating on the current Conventional
Personality.
Choices available are:
None
MDC
Quik-Call II
DTMF
Notes
DTMF choice
is only available for radio models equipped with the option board capability.
DTMF choice
is available when Option
Board Type is Simple Decoder and Option
Board feature is checked.

### Scan List

*Source: `conventional_personalities/personality/scan_list.htm`*

Scan List
Selects the Scan List used by the radio while operating in the Scan
Mode,
on the current
Conventional Personality.
The Scan List determines which callers the radio scans for (actively looks
for), and considers Unmuting
to, on the selected Scan List channels.
Choices available are:
None
Available List
Notes
Scan
List Members must be added to the assigned Scan List.

### Signaling Squelch

*Source: `conventional_personalities/personality/signaling_squelch.htm`*

Signaling Squelch
(Expert Feature)
Selects the Unmute
rule for the current Rx
Signaling System that is selected for the current Conventional
Personality.
And:
The
current personality�s Private
Line
(PL) Unmute/Mute
Rule
must be satisfied before unmuting
occurs.
Or:
Either
the current Conventional Personality�s Private Line (PL) Unmute/Mute rule,
or Voice Call detection unmutes
the radio�s speaker to receive audio.
Notes
This
feature is not available for 2W Portable models.
Available when
Rx Signaling System is not
set to None
If Rx Signaling
System is set to None, this feature is disabled and set to 'Or'.

### Squelch Setting

*Source: `conventional_personalities/personality/squelch_setting.htm`*

Squelch Setting
(Expert Feature)
Selects the amount of carrier energy required to unmute
the radio�s speaker upon satisfying this selected Carrier
Squelch
threshold. This feature applies while operating on the current Conventional
Personality.
Choices
Functionality
Normal
Allows more transmissions with less clarity
to unmute the radio�s speaker.
Tight:
Increases the squelch threshold causing
a stronger carrier signal to be required before the radio�s speaker will
unmute. This helps to reduce unwanted noise.
Notes
These
squelch selections can also be assigned to a radio-user long or short
programmable button-press.

### Time-Out Timer

*Source: `conventional_personalities/personality/time_out_timer.htm`*

Time-Out Timer
(Expert Feature)
Selects the maximum amount of communication time allowed per transmission,
while operating on the current Conventional
Personality.
Once this time expires, the transmission is automatically terminated.
Range is 15 seconds to 180 seconds, or Inifinite.
Notes
Available
when Receive Only is unchecked.

### TPL Reverse Burst

*Source: `conventional_personalities/personality/tpl_rev_burst.htm`*

TPL Reverse Burst
(Expert Feature)
Causes a Tone
Private Line
(TPL) code to be transmitted at the end of a transmission - once PTT
is released, and while operating on the current Conventional
Personality.
This sub-audible tone causes the receiving radio to mute
its speaker before loss of a carrier
is detected. Muting the speaker eliminates unwanted noise (squelch
tail)
during loss of carrier detection.
Choices available are:
None
Standard
Non-Standard
Notes
Available
when Tx Squelch Type is set to TPL.
Available when
Receive Only is unchecked.

### Tx DPL Code

*Source: `conventional_personalities/personality/tx_dpl_code.htm`*

Tx DPL Code
Selects the Digital
Private Line
(DPL) code that transmits while operating on the current Conventional
Personality.
Non standard code frequencies may also be entered. Range is from 000 to
777 in octal numbers.
Notes
Available
when Tx Squelch Type is set to DPL.
Available when
Receive Only is unchecked.
See Also
Standard
Code List

### Tx DPL Invert

*Source: `conventional_personalities/personality/tx_dpl_invert.htm`*

Tx DPL Invert
When checked, causes Digital
Private Line
(DPL) signals to be inverted before they are transmitted from the radio,
while operating on the current Conventional
Personality.
Inverted coding allows for more traffic/usage on frequencies.
Notes
Available
when Tx Squelch Type is set to DPL.
Available when
Receive Only is unchecked.
DPL Invert
must be set on both receiving and transmitting radios, and repeaters
for communication to occur.

### Tx DPL Turnoff Code

*Source: `conventional_personalities/personality/tx_dpl_turnoff_code.htm`*

Tx DPL Turnoff Code
(Expert Feature)
When checked, causes a Digital
Private Line
(DPL) code to be transmitted at the end of a transmission - once PTT
is released, and while operating on the current Conventional
Personality.
This sub-audible code causes the receiving radio to mute its speaker before
loss of a carrier
is detected. Muting
the speaker eliminates unwanted noise (squelch
tail)
during this process.
Notes
Available
when Tx Squelch Type is set to DPL.
Available when
Receive Only is unchecked.

### Tx Frequency

*Source: `conventional_personalities/personality/tx_frequency.htm`*

Tx Frequency
Selects a designated frequency
used when transmitting carrier
for the current Conventional
Personality.
Notes
Available
when Receive Only is unchecked.
Increments
are dependent upon Channel
Bandwidth.

### Tx Power Level

*Source: `conventional_personalities/personality/tx_power_level.htm`*

Tx Power Level
Selects the transmit power level while operating on the current Conventional
Personality.
For portable radios this feature can extend radio battery life.
Certain radio models offer the ability to manually change the Tx Power Level setting via the Menu or a radio-user
(short or long) programmable button-press.
Choices
Functionality
Low:
Used when communicating in close proximity,
and to keep the radio from transmitting into other geographical groups
operating on the same frequency.
High:
Used when a stronger signal is needed to
extend transmission distances.
Notes
This
feature is not available for 2W Portable models.
Available when
Receive Only is unchecked.

### Tx Reference Frequency

*Source: `conventional_personalities/personality/tx_reference_frequency.htm`*

Tx Reference Frequency
(Expert Feature)
Selects the Reference Frequency used
when transmitting on the current Conventional
Personality.
Choices available
are:
2.100 MHz
2.225 MHz
2.400 MHz
Default
Notes
It is
possible to disable the radio's ability to receive and or transmit data.
If you are not fully aware of the impact of this setting, DO
NOT MODIFY IT!
Available when
Receive Only is unchecked.

### Tx Signaling System

*Source: `conventional_personalities/personality/tx_signaling_system.htm`*

Tx Signaling System
Selects the Signaling
System
and data type that the radio uses when transmitting signaling data, while
operating on the current Conventional
Personality.
Choices available are:
None
MDC
Quik-Call II
DTMF
Notes
Quik-Call
II choice is not available for Non-Display models.
DTMF and
MDC choices are available for all radio models, except 2W Portable models.
Available when
Receive Only is unchecked.
If None is
selected, then Emergency
Type is disabled.

### Tx Squelch Type

*Source: `conventional_personalities/personality/tx_squelch_type.htm`*

Tx Squelch Type
Selects the type of Private
Line
(PL) or Carrier
Squelch
that the radio transmits, while operating on the current Conventional
Personality.
Choices
Functionality
(CSQ)
Does not transmit PL code.
(TPL)
Transmits TPL
code.
(DPL)
Transmits DPL
code.
Notes
Available
when Receive Only is unchecked.

### Tx TPL Code

*Source: `conventional_personalities/personality/tx_tpl_code.htm`*

Tx TPL Code
Selects the specific code accepted when transmitting Tone
Private Line
(TPL) decoding, while operating on the current Conventional
Personality.
This code can directly correlate to the Tx
TPL Frequency field. That is, selecting a value for this field automatically
selects a Tx TPL Frequency; however, non standard frequencies may also
be selected.
Notes
Available
when Tx Squelch Type is set to TPL.
Available when
Receive Only is unchecked.
When a non-standard
TPL frequency is set, the TPL code will be set to Blank.
See Also
Frequency/Codes
List

### Tx TPL Frequency

*Source: `conventional_personalities/personality/tx_tpl_frequency.htm`*

Tx TPL Frequency
Selects a designated frequency
used to transmit Tone
Private Line
(TPL) decoding, while operating on the current Conventional Personality.
This frequency can directly correlate to the Tx
TPL Code field; however, non standard code frequencies may also be
selected. Range is from 67.0 Hz to 255.0 Hz, in increments of 0.1 Hz.
Notes
Available
when Tx Squelch Type is set to TPL.
Available when
Receive Only is unchecked.
See Also
Frequency/Codes
List

### Voice Activated Transmission (VOX)

*Source: `conventional_personalities/personality/vox.htm`*

VOX
When checked, enables the radio to automatically key-up
due to recognition of voice received through an Accessory Connector headset
microphone on a Portable radio, or microphone on a Mobile radio provided
the transmit criteria is met. For a Mobile radio the selected Hot
Mic Source
automatically keys-up due to recognition of voice. In both cases the radio
automatically de-keys when audio is no longer present. This feature applies
while operating on the current Conventional
Personality
and while in Emergency
Mode.
Notes
Available
when Receive Only is unchecked.
See Also
Headset
Sidetone
VOX
Microphone Gain


---

## Pop-up Tooltips

### Handset

*Source: `pop-ups/hidc_check_acon_csb_handset_en.htm`*

Handset
When checked, enables the Handset accessory feature. The Handset is
similar to a telephone handset, which allows for speaker privacy.

### Auto Scan

*Source: `pop-ups/hidc_check_cnv_per_csb_auto_scan_en.htm`*

Auto Scan
When checked, causes
the radio to automatically enter the Scan Mode, when the radio-user selects
(with the Channel Selector) the current Conventional Personality.
When disabled, the radio-user is able to invoke
the Scan Mode operation through a programmable button short-press while
operating on the current Conventional Personality

### TPL/DPL Required For Data

*Source: `pop-ups/hidc_check_cnv_per_csb_pl_dpl_reqd_en.htm`*

TPL/DPL Required for Data
When checked, causes the radio to require the correct
Private Line (PL) codes before Signaling data can be received, while operating
on the current Conventional Personality.

### RX DPL Invert

*Source: `pop-ups/hidc_check_cnv_per_csb_rx_dpl_inv_en.htm`*

Rx DPL Invert
When checked, causes Digital Private Line (DPL)
signals to be inverted when they are received by the radio, while operating
on the current Conventional Personality. Inverted coding allows for more
traffic/usage on frequencies.

### Receive Only

*Source: `pop-ups/hidc_check_cnv_per_csb_rx_only_en.htm`*

Receive Only
When checked, prevents the radio from transmitting
on the current Conventional Personality.

### Allow Talkaround

*Source: `pop-ups/hidc_check_cnv_per_csb_ta_en.htm`*

Allow Talkaround
When checked, allows
the radio to operate in Talkaround Mode, while operating on the current
Conventional Personality. Talkaround can be selected by a radio-user (short
or long) programmable button-press.
Disabling disallows the current personality the
ability to operate in Talkaround Mode only.

### TX DPL Invert

*Source: `pop-ups/hidc_check_cnv_per_csb_tx_dpl_inv_en.htm`*

Tx DPL Invert
When checked, causes Digital Private Line (DPL)
signals to be inverted before they are transmitted from the radio, while
operating on the current Conventional Personality. Inverted coding allows
for more traffic/usage on frequencies.

### VOX

*Source: `pop-ups/hidc_check_cnv_per_csb_vox_en.htm`*

VOX
When checked, enables the radio to automatically
key-up due to recognition of voice received through an Accessory Connector
headset microphone on a Portable radio or a microphone on a Mobile radio
provided the transmit criteria is met. The radio automatically de-keys
when audio is no longer present. This feature applies while operating
on the current Conventional Personality.

### TX DPL Turnoff Code

*Source: `pop-ups/hidc_check_cnv_per_tx_dpl_turnoff_code_en.htm`*

Tx DPL Turnoff Code
When checked, causes a Digital Private Line (DPL)
code to be transmitted at the end of a transmission - once PTT is released,
and while operating on the current Conventional Personality. This sub-audible
code causes the receiving radio to mute its speaker before loss of a carrier
is detected. Muting the speaker eliminates unwanted noise (squelch tail)
during this process.

### TPL Revert Burst

*Source: `pop-ups/hidc_check_cnv_per_tx_tpl_rev_burst_en.htm`*

TPL Reverse Burst
When checked, causes a Tone Private Line (TPL) code
to be transmitted at the end of a transmission - once PTT is released,
and while operating on the current Conventional Personality. This sub-audible
tone causes the receiving radio to mute its speaker before loss of a carrier
is detected. Muting the speaker eliminates unwanted noise (squelch tail)
during loss of carrier detection.

### Alert Tone Auto Reset

*Source: `pop-ups/hidc_check_qcii_sys_csb_ca_tone_auto_rst_en.htm`*

Alert Tone Auto Reset
When checked, causes the radio to generate only
one sequence of the Call Alert tone, for the current Quik-Call II (QCII)
Signaling System or DTMF Signalling System. Normally the Call Alert Tone
Tag is a repeating alert tone.

### Auto Power Mode

*Source: `pop-ups/hidc_check_rad_cfg_csb_auto_pwr_mode_en.htm`*

Auto Power Mode
When checked, allows the Conventional personality
Tx Power Level field to be set to Automatic. This �Auto� setting causes
the radio to automatically select between transmitting at low or high
power based upon the strength of the last received transmission. After
a period of inactivity the radio will always transmit at high power.

### Busy LED

*Source: `pop-ups/hidc_check_rad_cfg_csb_busy_led_en.htm`*

Busy LED
When checked, causes the radio�s Busy LED to flash
red when the current channel is busy.

### Headset Sidetone

*Source: `pop-ups/hidc_check_rad_cfg_csb_headset_en.htm`*

Headset Sidetone
When checked, causes voice to be routed to an Accessory
Connector external headset speaker. Headset Sidetone can also be adjusted
by adjusting the Alert Tone Volume Offset.

### Priority Alert

*Source: `pop-ups/hidc_check_rad_cfg_csb_prio_scan_alert_en.htm`*

Priority Alert
When checked, causes an alert tone to sound when
the radio unmutes to a Priority #1 Scan List Member transmission.

### Scanned Channel Discovery Alert

*Source: `pop-ups/hidc_check_rad_cfg_csb_scan_chan_dis_alert_en.htm`*

Scanned Channel Discovery Alert
When checked, causes an alert tone to sound when
the radio-user selects (with the Channel Selector) the Scan List Member
channel that last unmuted.

### Sticky Permanent Monitor Alert

*Source: `pop-ups/hidc_check_rad_cfg_csb_sticky_perm_mon_alert_en.htm`*

Sticky Permanent Monitor Alert
When checked, causes a portable radio to generate
an alert tone upon entering Sticky Permanent Monitor Mode. Therefore,
the alert tone is sounded when the Monitor button has reached its Long
Press duration. This feature only
applies for channels capable of Conventional Dispatch.

### Tx Low Battery Alert

*Source: `pop-ups/hidc_check_rad_cfg_csb_tx_low_batt_alert_en.htm`*

Tx Low Battery Alert
When checked, causes a portable radio to sound an
alert tone (chirp) when its low battery threshold is reached. This tone
only occurs following a transmission
and when the PTT button is released.

### Tx Low Battery LED

*Source: `pop-ups/hidc_check_rad_cfg_csb_tx_low_batt_led_en.htm`*

Tx Low Battery LED
When checked, causes a portable radio's LED to flash
red when the low battery threshold is reached. This occurs only
while the radio is transmitting.

### Nuisance Delete

*Source: `pop-ups/hidc_check_scan_lst_info_csb_nuis_del_en.htm`*

Nuisance Delete
When a Scan List Member continually generates unwanted
noise, it can be temporarily deleted from the scan list. This feature
applies for the current Scan List.
It is possible to delete all channels except the
priority channel.

### Scan PL Lockout

*Source: `pop-ups/hidc_check_scan_lst_info_csb_pl_scan_lock_out_en.htm`*

Scan PL Lockout
When checked, enhances
Scan Mode performance for the current Scan List. The lockout condition
occurs when, the unsuccessfully scanned - Scan List Member channel/call,
had no PL code where a PL code was expected, or where the PL code was
incorrect. Once lockout occurs a counter begins. The counter continues
the lockout for the next nine scans of that channel. However, if scan
finds that carrier has dropped on that channel, then the counter is reset
and the lockout is discontinued.
This is particularly effective when in Landed Scan
Mode on a non-priority scan list member - and when the radio briefly mutes
at specific time intervals to check for Priority #1 Member activity. The
lockout allows this muting period to be a smaller amount of time. Therefore
there is less interruption for the current call.

### Priority #1 Scan List Member

*Source: `pop-ups/hidc_check_scan_lst_info_csb_prio1_scan_en.htm`*

Priority #1 Scan List Member
Causes the highest priority to be assigned to the
first member/row in the current Scan List. When the radio is scanning
a Scan List (Active Scan), 50% of the scans are targeted at the Priority
#1 Member channel.

### Talkback

*Source: `pop-ups/hidc_check_scan_lst_info_csb_talkback.htm`*

Talkback
When checked, causes the radio to transmit on the landed channel, when
in Landed Scan Mode.
This applies to the current Scan List, while operating in Scan Mode.

### Rx DPL Code

*Source: `pop-ups/hidc_dcombo_cnv_per_rx_dpl_code.htm`*

Rx DPL Code
Selects the specific code accepted when receiving
Digital Private Line (DPL) encoding, while operating on the current Conventional
Personality. Non standard code frequencies may also be entered.

### Rx TPL Code

*Source: `pop-ups/hidc_dcombo_cnv_per_rx_tpl_code.htm`*

Rx TPL Code
Selects the specific code accepted when receiving
Tone Private Line (TPL) encoding, while operating on the current Conventional
Personality. This code can directly correlate to the Rx TPL Frequency
field. That is, selecting a value for this field automatically selects
an Rx TPL Frequency; however, from the Rx TPL Frequency field, non standard
code frequencies may also be selected.

### Tx DPL Code

*Source: `pop-ups/hidc_dcombo_cnv_per_tx_dpl_code.htm`*

Tx DPL Code
Selects the Digital Private Line (DPL) code that
transmits while operating on the current Conventional Personality. Non
standard code frequencies may also be entered.

### Tx TPL Code

*Source: `pop-ups/hidc_dcombo_cnv_per_tx_tpl_code.htm`*

Tx TPL Code
Selects the specific code accepted when transmitting
Tone Private Line (TPL) decoding, while operating on the current Conventional
Personality. This code can directly correlate to the Tx TPL Frequency
field. That is, selecting a value for this field automatically selects
a Tx TPL Frequency; however, from the Tx TPL Frequency field, non standard
code frequencies may also be selected.

### Individual Tone A Code

*Source: `pop-ups/hidc_dcombo_qcii_sys_csb_indv_id_tone_a_code.htm`*

Individual Tone A Code
Selects the receive Tone A Code for the current
Quik-Call II (QCII) Signaling System. QCII Standard Tones are a subset
of the QCII Frequency range. Therefore, selecting a value for this field
automatically selects a value for the Individual Tone A Frequency field.

### Individual Tone B Code

*Source: `pop-ups/hidc_dcombo_qcii_sys_csb_indv_id_tone_b_code.htm`*

Individual Tone B Code
Selects the receive Tone B Code for the current
Quik-Call II (QCII) Signaling System. QCII Standard Tones are a subset
of the QCII Frequency range. Therefore, selecting a value for this field
automatically selects a value for the Individual Tone B Frequency field.

### Individual Tone C Code

*Source: `pop-ups/hidc_dcombo_qcii_sys_csb_indv_id_tone_c_code.htm`*

Individual Tone C Code
Selects the receive Tone C Code for the current
Quik-Call II (QCII) Signaling System. QCII Standard Tones are a subset
of the QCII Frequency range. Therefore, selecting a value for this field
automatically selects a value for the Individual Tone C Frequency field.

### Individual Tone D Code

*Source: `pop-ups/hidc_dcombo_qcii_sys_csb_indv_id_tone_d_code.htm`*

Individual Tone D Code
Selects the receive Tone D code for the current
Quik-Call II (QCII) Signaling System. QCII Standard Tones are a subset
of the QCII Frequency range. Therefore, selecting a value for this field
automatically selects a value for the Individual Tone D Frequency field.

### Primary ID

*Source: `pop-ups/hidc_edit_mdc_sys_csb_primary_id.htm`*

Primary ID
Selects the unique four digit ID that identifies
the radio while operating (transmitting or receiving MDC calls) on the
current MDC - Signaling System.

### Codeplug Password

*Source: `pop-ups/hidc_edit_rad_cfg_csb_cps_pwd.htm`*

Codeplug Password
Causes the current codeplug to be Password protected. The password prompt
appears when a CPS-user attempts to read this codeplug. This is true whether
the codeplug is stored in a radio or in a file.
Enables and selects the eight character password that is required when
reading the current codeplug. This is true whether the codeplug is stored
in a radio or in file format.

### Radio Frequency

*Source: `pop-ups/hidc_edit_rad_info_csb_band_min_freq.htm`*

Frequency Range
The CPS retrieves and allows you to view-only
the minimum and maximum frequency setting at which the radio is allowed
to operate. The radio�s frequency range is defined as being between, or
equal to, the Minimum and Maximum frequencies. This information is stored
in the radio.

### Firmware version

*Source: `pop-ups/hidc_edit_rad_info_csb_firmware_ver.htm`*

Firmware Version
The CPS retrieves and allows you to view-only
the firmware version of the currently connected radio. Firmware is Software
that controls the internal hardware components of the radio. Firmware
cannot be modified with the CPS.

### Model Number

*Source: `pop-ups/hidc_edit_rad_info_csb_model_num.htm`*

Model Number
The CPS retrieves and allows you to view-only
the radio�s model number. The model number identifies the type of radio.
This information is stored in the radio.

### Serial Number

*Source: `pop-ups/hidc_edit_rad_info_csb_serial_num.htm`*

Serial Number
The CPS retrieves and allows you to view-only
the radio�s serial number. Each radio has its own unique serial number.
This information is stored in the radio.

### Codeplug Version

*Source: `pop-ups/hidc_edit_rad_info_orig_cp_ver.htm`*

Codeplug Version
The CPS retrieves and allows you to view-only
the current codeplug version that was loaded into the radio. This information
is stored in the radio.

### Last Programmed Date

*Source: `pop-ups/hidc_edit_track_info_latest_pgm_date.htm`*

Last Programmed Date
The CPS retrieves and allows you to view-only
the most recent date on which the radio was programmed. This information
is stored in the radio.

### Rx Audio Type

*Source: `pop-ups/hidc_lcombo_acon_csb_ac_rx_audio_type.htm`*

Rx Audio Type
Selects the configuration of the audio output line. The audio output
line uses the partially programmable Pin #11 of the Accessory Connector.
Certain external accessories such as modems or public address systems
may require unfiltered or filtered audio.

### Accessory Package

*Source: `pop-ups/hidc_lcombo_acon_csb_package_id.htm`*

Accessory Package
Selects an accessory connector package. Each package assigns a related
group of default settings to the fully programmable pins of the Accessory
Connector. Once an Accessory Package has been assigned, individual pin
settings may be modified.

### Busy Channel Lockout

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_busy_chan_lockout.htm`*

Busy Channel Lockout
Selects a channel lockout rule while operating on the current Conventional
Personality.

### Channel Bandwidth

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_chan_bw_sel.htm`*

Channel Bandwidth
Selects the channel bandwidth while operating on
the current Conventional Personality.

### Emphasis Selection

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_emph_sel.htm`*

Emphasis Selection
Selects the type of audio shaping used while operating
on the current Conventional Personality. These selections can enhance
audio clarity.

### Rx Reference Frequency

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_rx_ref_freq.htm`*

Rx Reference Frequency
Selects the Reference Frequency used when receiving
on the current Personality.
Notes
It
is possible to disable the radio's ability to receive and or transmit
data. If you are not fully aware of the impact of this setting, DO NOT MODIFY IT!

### Rx Squelch Type

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_rx_sq_code_sel.htm`*

Rx Squelch Type
Selects the type of Private Line (PL) or Carrier
Squelch needed to receive a call, while operating on the current Conventional
Personality.

### Signaling Squelch

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_sig_sq.htm`*

Signaling Squelch
Selects the Unmute rule for the current Rx Signaling
System that is selected for the current Conventional Personality.

### Squelch Setting

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_sq_setting.htm`*

Squelch Setting
Selects the amount of carrier energy required to
unmute the radio�s speaker upon satisfying this selected Carrier Squelch
threshold. This feature applies while operating on the current Conventional
Personality.

### Time-out Timer (sec)

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_tot.htm`*

Time-Out Timer (sec)
Selects the maximum amount of communication time
allowed per transmission, while operating on the current Conventional
Personality. Once this time expires, the transmission is automatically
terminated. Time is in seconds.

### Tx Power Level

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_tx_pwr_level_sel.htm`*

Tx Power Level
Selects the transmit power level while operating
on the current Conventional Personality. For portable radios this feature
can extend radio battery life.

### Tx Reference Frequency

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_tx_ref_freq.htm`*

Tx Reference Frequency
Selects the Reference Frequency used when transmitting
on the current Personality.
Notes
It
is possible to disable the radio's ability to receive and or transmit
data. If you are not fully aware of the impact of this setting, DO NOT MODIFY IT!

### Tx Squelch Type

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_tx_sq_code_sel.htm`*

Tx Squelch Type
Selects the type of Private Line (PL) or Carrier
Squelch that the radio transmits while operating on the current Conventional
Personality.

### Unmute/Mute Rule

*Source: `pop-ups/hidc_lcombo_cnv_per_csb_unmute_mute_type.htm`*

Unmute/Mute Rule
Selects the rule that determines when a radio unmutes
and mutes its speaker to receive audio for the current Conventional Personality.
The Unmute/Mute rule applies when PL is the selected Rx Squelch Type for
the current Conventional Personality. Unmuting opens the speaker. Muting
closes the speaker.

### Tx Signaling System

*Source: `pop-ups/hidc_lcombo_cnv_per_tx_hss_sys.htm`*

Tx Signaling System
Selects the Signaling System and data type that
the radio uses when transmitting Signaling data, while operating on the
current Conventional Personality.

### PTT ID Type

*Source: `pop-ups/hidc_lcombo_mdc_sys_csb_ptt_id_type.htm`*

PTT ID Type
Selects when the PTT ID is sent during a Normal
Dispatch transmission for the current MDC - Signaling System.

### Auto Reset Timer Type

*Source: `pop-ups/hidc_lcombo_qcii_sys_csb_auto_rst_tmr_type.htm`*

Auto Reset Timer Type
Selects a **Timed or *Manual exception to the Signaling
Squelch unmuting rule for the current Quik Call II (QCII) Signaling System
or DTMF Signaling System.

### Call Format

*Source: `pop-ups/hidc_lcombo_qcii_sys_csb_call_fmt.htm`*

Call Format
Selects the call format used for the current Quik-Call
II (QCII) Signaling System.

### Alert Tone Volume Offset

*Source: `pop-ups/hidc_lcombo_rad_cfg_csb_alert_tone_vol_offset.htm`*

Alert Tone Volume Offset
Based on the Alert Tone Volume Offset setting, alert
tone volume levels will be constantly
offset higher, lower, or equal to, receive audio volume levels, which
are controlled by the radio�s Volume Knob position.

### Data PTT Audo Source

*Source: `pop-ups/hidc_lcombo_rad_cfg_csb_data_ptt_audio_src.htm`*

Data PTT Audio Source
Selects the point of input for audio data and whether filtering is applied.
Data PTT Audio is generally used with accessories such as a Global Positioning
System (GPS) or Vehicular Radio Modem (VRM).

### External PTT Audio Source

*Source: `pop-ups/hidc_lcombo_rad_cfg_csb_ext_ptt_audio_src.htm`*

External PTT Audio Source
Selects the point of input and whether filtering is applied. External
PTT Audio is generally used when the radio and the radio-user are in two
different locations. For example, the radio-user is inside the car and
the radio is in the vehicle�s trunk.

### Monitor Type

*Source: `pop-ups/hidc_lcombo_rad_cfg_csb_mon_type.htm`*

Monitor Type
Selects the monitoring mode of a portable radio.
Monitor allows the radio-user to listen to all radio traffic for channels
of Conventional dispatch type. Monitor is possible for PL (Private Line)
transmissions that do not match for the current channel.

### Scan PL Type

*Source: `pop-ups/hidc_lcombo_scan_lst_info_csb_pl_scan_type.htm`*

Scan PL Type
Causes Private Line (PL) to be required - when accepting
calls from members of the current Scan List, while in Scan Mode. PL is
considered only when the Conventional
transmission being received has its Tx Squelch Type set for PL.

### Personality

*Source: `pop-ups/hidc_lcombo_scan_mbr_pers.htm`*

Personality
Selects a Conventional Personality for the current
Scan List Member. Personality selections are CPS given names. For example;
Pers1.

### Debounce Duration

*Source: `pop-ups/hidc_spin_acon_csb_dbnc_dur.htm`*

Debounce Duration
Selects the amount of time that the radio waits before rechecking any
fully programmable Accessory Connectors pin�s Active Level. Debounce is
the electrical noise usually caused by relays or other mechanical devices,
which can cause misleading readings. Therefore certain Accessory Connector
pins may require a wait time to allow for possible debounce noise. This
applies to Input Lines only. Time
is in milliseconds.

### External Alarm Delay

*Source: `pop-ups/hidc_spin_acon_csb_ext_alarm_del.htm`*

External Alarm Delay
Selects the amount of time prior to the External Alarm Duration timer.
Once this External Alarm Delay timer expires, the External Alarm Duration
timer begins and the External Alarm becomes active.

### External Alarm Duration

*Source: `pop-ups/hidc_spin_acon_csb_ext_alarm_dur.htm`*

External Alarm Duration
Selects the amount of time that the External Alarm feature remains active.
The External Alarm is activated by an incoming Call Alert or Selective
Call.

### Accessory Power Up Delay

*Source: `pop-ups/hidc_spin_acon_csb_pwr_up_del.htm`*

Accessory Power Up Delay
Selects the amount of time (during radio power-up) that the Active Level
of the Accessory Connector pins are ignored. During this time any functionality
associated with all connector pins is delayed for the duration of the
timer.

### Rx Frequency

*Source: `pop-ups/hidc_spin_cnv_per_rx_freq.htm`*

Rx Frequency
Selects a designated frequency used when receiving
carrier squelch for the current Personality.

### Rx TPL Frequency

*Source: `pop-ups/hidc_spin_cnv_per_rx_tpl_freq.htm`*

Rx TPL Frequency
Selects a designated frequency used when receiving
Tone Private Line (TPL) encoding, while operating on the current Conventional
Personality. This frequency can directly correlate to the Rx TPL Code
field; however, non standard code frequencies may also be selected.

### Tx Frequency

*Source: `pop-ups/hidc_spin_cnv_per_tx_freq.htm`*

Tx Frequency
Selects a designated frequency used when transmitting
carrier for the current Personality.

### Tx TPL Frequency

*Source: `pop-ups/hidc_spin_cnv_per_tx_tpl_freq.htm`*

Tx TPL Frequency
Selects a designated frequency used to transmit
Tone Private Line (TPL) encoding, while operating on the current Conventional
Personality. This frequency can directly correlate to the Tx TPL Code
field; however, non standard code frequencies may also be selected.

### Individual Tone C Frequency

*Source: `pop-ups/hidc_spin_qcii_sys_csb_ind_id_tone_c_freq.htm`*

Individual Tone C Frequency
Selects the receive Tone C Frequency for current
Quik-Call II (QCII) Signaling System. Entering a value for this field
automatically selects a value for the Individual Tone C Code field. Some
Frequencies may not have a correlating Code causing nothing to display
in the Code field.

### Individual Tone A Frequency

*Source: `pop-ups/hidc_spin_qcii_sys_csb_indv_id_tone_a_freq.htm`*

Individual Tone A Frequency
Selects the receive Tone A Frequency for the current
Quik-Call II (QCII) Signaling System. Entering a value for this field
automatically selects a value for the Individual Tone A Code field. Some
Frequencies may not have a correlating Code causing nothing to display
in the Code field.

### Individual Tone B Frequency

*Source: `pop-ups/hidc_spin_qcii_sys_csb_indv_id_tone_b_freq.htm`*

Individual Tone B Frequency
Selects the receive Tone B Frequency for the current
Quik-Call II (QCII) Signaling System. Entering a value for this field
automatically selects a value for the Individual Tone B Code field. Some
Frequencies may not have a correlating Code causing nothing to display
in the Code field.

### Individual Tone D Frequency

*Source: `pop-ups/hidc_spin_qcii_sys_csb_indv_id_tone_d_freq.htm`*

Individual Tone D Frequency
Selects the receive Tone D Frequency for the current Quik-Call II (QCII) Signaling System. Entering a value for this field automatically selects a value for the Individual Tone D Code field. Some Frequencies may not have a correlating Code causing nothing to display in the Code field.

### Accessory Microphone Gain

*Source: `pop-ups/hidc_spin_rad_cfg_csb_acc_mic_gain.htm`*

Accessory Microphone Gain
Selects the Gain control for the Accessory Microphone headset. This
adjusts the sensitivity of the microphone.
The Accessory Microphone attaches into the microphone jack of the mobile
radio.

### Long Press Duration

*Source: `pop-ups/hidc_spin_rad_cfg_csb_long_press_dur.htm`*

Long Press Duration
Selects the amount of time that the radio-user is
required to press (and hold down) a button, for the press to be interpreted
by the radio as a long press. The radio�s programmable buttons can be
assigned unique long press vs short press functionality.

### Rx Low Battery Alert Interval

*Source: `pop-ups/hidc_spin_rad_cfg_csb_rx_low_batt_alert_intrvl.htm`*

Rx Low Battery Alert Interval
Selects the amount of time that defines the silent
interval between each low battery alert tone for a portable radio. This
tone only occurs while a call
is being received or while the radio is in idle mode, and when the radio�s
low battery threshold is reached.

### Scan Hang Time

*Source: `pop-ups/hidc_spin_rad_cfg_csb_scan_hang_time.htm`*

Scan Hang Time
Selects the amount of time that the radio waits
on the scanned channel � in Landed Scan mode, before returning to Active
Scan mode. The timer begins once receive or transmit activity has ceased.
While the timer is counting down, if the radio transmits (PTT is pressed),
or the radio unmutes its speaker to receive audio, the timer is reset,
and the original conditions again apply.

### Tx High Power Value

*Source: `pop-ups/hidc_spin_rad_cfg_csb_tx_high_pwr.htm`*

Tx High Power Value
For mobile radios this setting determines the wattage for the CPS -
Tx Power Level "High" setting. The "High" setting
can also be radio-user selected with a programmable button press.

### Signaling Hold Time

*Source: `pop-ups/hidc_spin_scan_lst_info_csb_hs_hold_time.htm`*

Signaling Hold Time
Selects the amount of time that the radio waits
in Active Scan, on a Scan List Member channel. The wait only applies when
carrier squelch is detected on the channel. This pause allows the radio
enough time to decode Signaling System data. If Signaling System data
is not decoded and the timer expires, the radio then scans the next Scan
List Member channel. This feature applies to the current Scan List.

### Priority Sample Time

*Source: `pop-ups/hidc_spin_scan_lst_info_csb_prio_sample_time.htm`*

Priority Sample Time
Selects the delay period between checking for priority
Scan List Member transmission activity for the current Scan List. The
checking for Priority #1 Members, occurs in Landed Scan Mode when the
radio is unmuted on a non-priority Member call. This checking briefly
mutes the current transmission.

### Auto Reset Timer

*Source: `pop-ups/hidc_spin_sig_cfg_csb_auto_rst_tmr.htm`*

Auto Reset Timer
Selects the amount of time to be used by the Auto
Reset Timer Type for Signaling System communications.


---

## Quik-Call II Signaling

### Adding QCII Systems

*Source: `quik_call_ii/add_qcii_system.htm`*

Adding QCII Systems
There are multiple ways to add QCII Systems.
Highlight Quik-Call II System  in
the tree view.
Click
the Add Quik-Call II System button,
or
Right mouse
click on Quik-Call II System and choose Add,
or
Choose Add from the Edit
menu, or
Click Add in the tool bar.
A new Quik-Call II System (Sys) appears in the tree view.
Notes

### Removing QCII Systems

*Source: `quik_call_ii/removing_qcii_systems.htm`*

Removing QCII Systems
There are multiple ways to remove QCII Systems.
Highlight the Quik-Call II system in the tree view.
Right
mouse click and choose Delete,
or
Choose Delete from the Edit
menu., or
Click Delete in the tool bar.
Press the Delete
key on the keyboard.
The Quik-Call II System disappears from the tree view.
Notes


---

## Quik-Call II System

### Alert Tone Auto Reset (QCII System)

*Source: `quik_call_ii/quik_call_ii_system/alert_tone_auto_reset_quik_call_ii.htm`*

Alert Tone Auto Reset (Quik-Call II)
When checked, causes the radio to generate only one sequence of the
Call
Alert
alert or Call
Alert w/Voice
tone, for the current Quik-Call
II
(QCII) Signaling System.
Notes
Available when
the QCII Call Type is not
set to None or Sel
Cal.

### Auto Reset Timer Type (QCII System)

*Source: `quik_call_ii/quik_call_ii_system/auto_reset_timer_type_quik_call_ii.htm`*

Auto Reset Timer Type (Quik-Call II)
(Expert Feature)
Selects a **Timed or *Manual exception to the Signaling
Squelchunmuting
rule
for the current Quik
Call II
(QCII) Signaling System.
This **Timed or *Manual exception is known as the Release
Squelch State.
The Release Squelch State begins once the radio unmutes
to a Voice
Call.
When Signaling Squelch is set to "And";
and once the radio is in the Release Squelch state, then only
the current Conventional
Personalities
- Unmute
Rules
must be satisfied for unmuting to re-occur, a Voice Call is no longer
required.
When Signaling Squelch is set to "Or";
and once the radio is in the Release Squelch State, only
Carrier
Squelch Detect
is required to unmuting to re-occur, PL and Voice Call are not required.
Choices
Functionality
None:
The radio does not consider a Release Squelch
state.
* Manual:
Short-pressing the programmed Monitor button
ends the Release Squelch state.
**Auto
w/Carrier Override
**Auto
w/o Carrier Override
Notes
Available when
the Call Type field has Call
Alert w/Voice
or Sel
Cal
selected.

### Call Format (Quik-Call II)

*Source: `quik_call_ii/quik_call_ii_system/call_format_quik_call_ii.htm`*

Call Format (Quik-Call II)
Selects the call format used for the current Quik-Call
II
(QCII) Signaling System.
Choices
Functionality
A-B:
Tone generated at frequency A followed by tone generated at frequency
B.
A-B/A-C:
Tone generated at frequency A followed by tone generated at frequency
B. Or, tone generated at frequency A followed by tone generated at frequency
C.
A-B/C-B:
Tone generated at frequency A followed by tone generated at frequency
B. Or, tone generated at frequency C followed by tone generated at frequency
B.
A-B/Long B:
Tone generated at frequency A followed by tone generated at frequency
B. Or, a long tone generated at frequency B.
A-B/Long C:
Tone generated at frequency A followed by tone generated at frequency
B. Or, a long tone generated at frequency C.
A-B/A-C/Long C:
Tone generated at frequency A followed by tone generated at frequency
B. Or, tone generated at frequency A followed by tone generated at frequency
C. Or, a long tone generated at frequency C.
A-B/Long B/Long C:
Tone generated at frequency A followed by tone generated at frequency
B. Or, a long tone generated at frequency B. Or, a long tone generated
at frequency C.
A-B/A-C/Long B/Long C:
Tone generated at frequency A followed by tone generated at frequency
B. Or, tone generated at frequency A followed by tone generated at frequency
C. Or, a long tone generated at frequency B. Or, a long tone generated
at frequency C.
A-B/A-D/C-D:
Tone generated at frequency A followed by tone generated at frequency
B. Or, tone generated at frequency A followed by tone generated at frequency
D. Or, tone generated at frequency C followed by tone generated at frequency
D.
A-B/C-D:
Tone generated at frequency A followed by tone generated at frequency
B. Or, tone generated at frequency C followed by tone generated at frequency
D.
Notes
Available when
QCII Call Type is not
set to None.

### Call LED (Quik-Call II System)

*Source: `quik_call_ii/quik_call_ii_system/call_led_quik_call_ii.htm`*

Call LED (Quik-Call II)
When checked, causes the receiving radio to blink its LED when it has
received a Call
Alert
for the current Quik-Call
II
(QCII) Signaling System. The radio�s LED double-flashes yellow for the
A-B call format and single-flashes yellow for the other call formats.
Notes
When the QCII
Call Type is not
set to None.

### Call Type (Quik-Call II System)

*Source: `quik_call_ii/quik_call_ii_system/call_type_quik_call_ii.htm`*

Call Type (Quik-Call II)
Selects the type of Call
Alerts
that can be received for the current Quik-Call
II
(QCII) Signaling System. A Call Alert allows a transmitting radio to notify
(with an alert tone) and leave evidence of (by lighting the LED) a call
on a receiving radio while the radio-user is away. The Call
LED persists until reset by the user. A Call Alert w/Voice is a combination
of a Sel Cal and a Call Alert.
Choices available are:
None
Call Alert
Call Alert w/Voice
Sel Cal (Selective Call)
Notes

### Tone A Code (Quik-Call II System)

*Source: `quik_call_ii/quik_call_ii_system/individual_tone_a_code_quik_call_ii.htm`*

Tone A Code
Selects the receive Tone A code for the current Quik-Call
II
(QCII) Signaling System. QCII Standard Tones are a subset of the QCII
Frequency range. Therefore, selecting a value for this field automatically
selects a value for the Tone
A Frequency field.
Notes
Limited performance
may occur when using frequencies above 2468.2 Hz.
Available when
QCII Call Type is not
set to None.
See Also
Codes
= Frequency List

### Tone A Frequency (Quik-Call II System)

*Source: `quik_call_ii/quik_call_ii_system/individual_tone_a_frequency_quik_call_ii.htm`*

Tone A Frequency
Selects the receive Tone A Frequency
for the current Quik-Call
II
(QCII) Signaling System. Entering a value for this field automatically
selects a value for the Tone
A Code field. Some Frequencies may not have a correlating Code causing
nothing to display in the Code field.
The range is from 288.5 Hz to 3086 Hz, in increments of 0.1 Hz.
Notes
Limited performance
may occur when using frequencies above 2468.2 Hz.
Available when
QCII Call Type is not
set to None.

### Tone B Code (Quik-Call II System)

*Source: `quik_call_ii/quik_call_ii_system/individual_tone_b_code_quik_call_ii.htm`*

Tone B Code
Selects the receive Tone B code for the current Quik-Call
II
(QCII) Signaling System. QCII Standard Tones are a subset of the QCII
Frequency range. Therefore, selecting a value for this field automatically
selects a value for the Tone
B Frequency field.
Notes
Limited performance
may occur when using frequencies above 2468.2 Hz.
Available when
QCII Call
Type is not set to None.
See Also
Codes
= Frequency List

### Tone B Frequency (Quik-Call II System)

*Source: `quik_call_ii/quik_call_ii_system/individual_tone_b_frequency_quik_call_ii.htm`*

Tone B Frequency
Selects the receive Tone B Frequency
for the current Quik-Call
II
(QCII) Signaling System. Entering a value for this field automatically
selects a value for the Tone
B Code field. Some Frequencies may not have a correlating Code causing
nothing to display in the Code field.
The range is from 288.5 Hz to 3086 Hz, in increments of 0.1 Hz.
Notes
Limited performance
may occur when using frequencies above 2468.2 Hz.
Available when
QCII Call Type is not
set to None.

### Tone C Code (Quik-Call II System)

*Source: `quik_call_ii/quik_call_ii_system/individual_tone_c_code_quik_call_ii.htm`*

Tone C Code
Selects the receive Tone C code for the current Quik-Call
II
(QCII) Signaling System. QCII Standard Tones are a subset of the QCII
Frequency range. Therefore, selecting a value for this field automatically
selects a value for the Tone
C Frequency field.
Notes
Limited performance
may occur when using frequencies above 2468.2 Hz.
Available when
QCII Call Format is not
set to A-B or A-B/Long B.
Available when
QCII Call Type is not
set to None.
See Also
Codes
= Frequency List

### Tone C Frequency (Quik-Call II System)

*Source: `quik_call_ii/quik_call_ii_system/individual_tone_c_frequency_quik_call_ii.htm`*

Tone C Frequency
Selects the receive Tone C Frequency
for current Quik-Call
II
(QCII) Signaling System. Entering a value for this field automatically
selects a value for the Tone
C Code field. Some Frequencies may not have a correlating Code causing
nothing to display in the Code field.
The range is from 288.5 Hz to 3086 Hz, in increments of 0.1 Hz.
Notes
Limited performance
may occur when using frequencies above 2468.2 Hz.
Available when
Call Type is not
set to None.
Available when
QCII Call Format is not
set to A-B or A-B/Long B.

### Tone D Code (Quik-Call II System)

*Source: `quik_call_ii/quik_call_ii_system/individual_tone_d_code_quik_call_ii.htm`*

Tone D Code
Selects the receive Tone D code for the current Quik-Call
II
(QCII) Signaling System. QCII Standard Tones are a subset of the QCII
Frequency range. Therefore, selecting a value for this field automatically
selects a value for the Tone
D Frequency field.
Notes
Limited performance
may occur when using frequencies above 2468.2 Hz.
Available when
QCII Call Type is not
set to None.
Available when
QCII Call Format is set to
A-B/A-D/C-D or A-B/C-D.
See Also
Codes
= Frequency List

### Tone D Frequency (Quik-Call II System)

*Source: `quik_call_ii/quik_call_ii_system/individual_tone_d_frequency_quik_call_ii.htm`*

Tone D Frequency
Selects the receive Tone D Frequency
for the current Quik-Call
II
(QCII) Signaling System. Entering a value for this field automatically
selects a value for the Tone
D Code field. Some Frequencies may not have a correlating Code causing
nothing to display in the Code field.
The range is from 288.5 Hz to 3086 Hz, in increments of 0.1 Hz.
Notes
Limited performance
may occur when using frequencies above 2468.2 Hz.
Available when
QCII Call Type is not
set to None.
Available when
QCII Call Format is set to
A-B/A-D/C-D or A-B/C-D.


---

## Radio Information

### Frequency Range

*Source: `radio_information/Frequency_Range.htm`*

Frequency Range
The CPS
retrieves and allows you to view-only
the minimum and maximum frequency setting at which the radio is allowed
to operate. The radio�s frequency range is defined as being between, or
equal to, the Minimum and Maximum frequencies. This information is stored
in the radio.

### Codeplug Version

*Source: `radio_information/codeplug_version.htm`*

Codeplug Version
The CPS
retrieves and allows you to view-only
the current codeplug
version that was loaded into the radio. This information is stored in
the radio.

### Firmware Version

*Source: `radio_information/firmware_version_radio_information_.htm`*

Firmware Version
The CPS retrieves and allows you to view-only
the firmware version. Firmware is Software
that controls the internal hardware components of the radio.

### Last Programmed Date

*Source: `radio_information/last_programmed_date.htm`*

Last Programmed Date
The CPS
retrieves and allows you to view-only
the most recent date and time at which the radio was programmed. This
information is stored in the radio.

### Model Number

*Source: `radio_information/model_number.htm`*

Model Number
The CPS
retrieves and allows you to view-only
the radio�s model number. The model number identifies the type of radio.
This information is stored in the radio.

### Serial Number

*Source: `radio_information/serial_number.htm`*

Serial Number
The CPS
retrieves and allows you to view-only
the radio�s serial number. Each radio has its own unique serial number.
This information is stored in the radio.


---

## Reports

### Choosing a Report

*Source: `reports/choosing_a_report.htm`*

Choosing a Report
The CPS
offers several different styles of reports, such as:
A Customer
Handout
A Detailed
Report
A Personalities
Summary
From the File
menu Choose Reports, or from the
tool bar click
A dialog box appears.
Click on one of the
report types and click the OK
button.
See Also
Dealer
Information

### Copying Information from a Report

*Source: `reports/copying_information_from_a_report.htm`*

Copying Information from a Report
The reports can be copied and pasted into a text document to edit, if
needed.
Using the mouse, highlight the entire report or
the part to be copied.
With the mouse pointer in a highlighted area,
right mouse click and choose Copy.
Open a text document and paste into it.

### Dealer Information

*Source: `reports/dealer_information.htm`*

Dealer Information
Dealer information can be added to a Customer Handout Report using a
template provided in the CPS.
From the Edit
menu choose Dealer Info. An editable
tri-pane window appears.
Replace the text in the window your dealer information
and click the OK button.
When the Customer Handout Report is created, your
dealer information will appear at the bottom of the report.
Notes
The
Dealer Information must be HTML compliant using HTML characters.
The '^' character
is not valid.

### Previewing a Report Before Printing

*Source: `reports/previewing_a_report_before_printing.htm`*

Previewing a Report Before Printing
To display each page as it will look when printed, click the Preview
button on the report window.
Notes
This
feature is available only with Internet Explorer versions greater than
5.5.

### Printing a Report

*Source: `reports/printing_a_report.htm`*

Printing a Report
To print the report, click the Print
button on the report window.
Notes
Previewing
a Report Before Printing


---

## Scan List Configuration

### Adding Scan Members

*Source: `scan_settings/scan_list/add_scan_member.htm`*

Adding Scan List Members
Click on one of the scan lists. Click on a Personality
in the Available List or <Ctrl> click to choose more than one Personality
and click the Add button.
The Personality appears in the member List.
Notes
The
"Selected" choice causes the radio to scan on the assigned channel
of the radio�s current Channel Selector position when added to the member
List.
Up to 16 scan
list members are allowed.

### Priority Sample Time

*Source: `scan_settings/scan_list/priority_sample_time.htm`*

Priority Sample Time
(Expert Feature)
Selects the delay period between checking for priority Scan
List Member
transmission activity for the current Scan
List.
Range is from 750 ms to 7750 ms, in increments of 250 ms.
Notes
Available
when the radio has a scan list member that has a Priority
#1 and/or Priority
#2 channel set.

### Removing Scan List Members

*Source: `scan_settings/scan_list/removing_scan_list_members.htm`*

Removing Scan List Members
From the List Window - click on a Personality
in the member List or <Ctrl> click to choose more than one Personality
and click the Remove button.
The Personality disappears from the member List and appears in the Available
list.

### Scan PL Lockout

*Source: `scan_settings/scan_list/scan_pl_lockout.htm`*

Scan PL Lockout
(Expert Feature)
When checked, enhances Scan
Mode
performance for the current Scan
List.
The lockout condition occurs when, the unsuccessfully scanned - Scan List
Member channel/call, had no PL
code where a PL code was expected, or where the PL code was incorrect.
Once lockout occurs a counter begins. The counter continues the lockout
for the next nine scans of that channel.
However, if scan finds that carrier
has dropped on that channel, then the counter is reset and the lockout
is discontinued.
This is particularly effective when in Landed
Scan
mode on a non-priority scan list member - and when the radio briefly mutes
at specific time intervals to check for Priority
#1 or Priority #2
Scan activity. The lockout allows this muting period to be a smaller amount
of time. Therefore there is less interruption for the current call.

### Set/Clear Priority 1 / 2

*Source: `scan_settings/scan_list/set_clear_priority_1.htm`*

Set/Clear Priority 1 / 2
Highlight the Personality (channel) in the member
List and click the Set/Clear
Priority 1 button to set a Priority #1 Scan List Member. Highlight another Personality
and click the Set/Clear
Priority 2 to set the Priority
#2 Scan List Member.
Notes
If the
Priority #1 channel is cleared, the Priority #2 channel automatically
clears itself. You will first need to reassign the Priority #1 channel
then the Priority #2 channel.

### Signaling Hold Time

*Source: `scan_settings/scan_list/signaling_hold_time.htm`*

Signaling Hold Time
(Expert Feature)
Selects the amount of time that the radio waits in Active
Scan,
on a Scan
List Member
channel. The wait only applies when carrier
squelch
is detected on the channel. This pause allows the radio enough time to
decode Signaling System data. If Signaling System data is not
decoded and the timer expires, the radio then scans the next Scan List
Member channel. This feature applies to the current Scan List.
Signaling Hold Time applies for Signaling System transmissions such
as Radio Calls and PTT
ID's.
Range is from 50 ms to 6375 ms, in increments of 25 ms.
Notes
The
total hold time value must be set equal to or greater than the amount
of time that it takes the sending radio to transmit the signaling data
packet, plus the transmitting Personality�s Signaling System Pretime.
Hold Time applies
to both priority and non-priority Scan List member channels.

### Talkback

*Source: `scan_settings/scan_list/talkback_scan_list_info.htm`*

Talkback
When checked, if the radio stops on a channel, the radio user is able
to PTT the radio and �talk back� on that channel.
This applies to the current Scan
List,
while operating in Scan
Mode.


---

## Scan Settings

### Priority Channel 1 Lock

*Source: `scan_settings/Priority_Channel_1_Lock.htm`*

Priority Channel 1 Lock
When checked, Priority #1 Member channel becomes uneditable at  the
radio menu.
Notes
Available
when the radio's codeplug major version is six and above.

### Selected Channel Lock

*Source: `scan_settings/Selected_Channel_Lock.htm`*

Selected Channel Lock
When checked, the selected channel becomes uneditable. It cannot be
added into or deleted from scan list via the radio menu. In addition,
it cannot be temporarily deleted from scan list via Nuisance
Delete.
Notes
Available
when the radio's codeplug major version is six and above.

### Hang Time

*Source: `scan_settings/hang_time_radio_configuration.htm`*

Hang Time
Selects the amount of time that the radio waits on the scanned channel
- in Landed
Scan
mode, before returning to Active
Scan
mode. The timer begins once receive or transmit activity has ceased. While
the timer is counting down, if the radio transmits (PTT
is pressed), or the radio unmutes
its speaker to receive audio, the timer is reset, and the original conditions
again apply. Range is from 0 ms to 7750 ms, in increments of 250 ms.

### Off-Hook Suspends Scan

*Source: `scan_settings/off_hook_suspends_scan.htm`*

Off-Hook Suspends Scan
Selects the mobile radio�s Scan
Mode
behavior when the microphone is off the hook. This applies only when the
Public
Address (PA)
accessory is turned off.
Choices
Functionality
Disabled:
Scan is not effected.
Suspend Non-Priority Scan
The radio only scans for Priority
Members.
Suspend All Scan:
All scanning is suspended.
Notes
Available
when the radio is a Non-Display Mobile model.

### Priority Alert

*Source: `scan_settings/priority_alert.htm`*

Priority Alert
When checked, causes an alert tone to sound when the radio unmutes
to a Priority #1 or Priority
#2 Scan List Member transmission.
Notes
Available
when the radio has a scan list member that has a Priority #1 channel set.

### Scanned Channel Discovery Alert

*Source: `scan_settings/scanned_channel_discovery_radio_configuration.htm`*

Scanned Channel Discovery Alert
When checked, causes an alert tone to sound when the radio-user selects
(with the Channel Selector) the Scan
List Member
channel that last unmuted.
The alert indicates to the radio-user on which channel
the last conversation (discovered while in Scan
Mode)
took place.
Notes
Available
when the radio is a Non-Display model.


---

## Signaling Configuration

### Emergency Revert Channel

*Source: `signaling/Emergency_revert_Channel.htm`*

Emergency Revert Channel
Selects the Personality
to be used during Emergency
Mode.
No matter what channel the radio is currently operating on, the radio
is automatically switched to this channel for an emergency transmission.
Choices available are:
Selected
Available Personalities
Notes
Available
when the radio is a Mobile model.
Available when
Emergency Type is not
set to Disabled.
Available when
a Personality has a defined Tx
Signaling System
of type MDC.
Available when
'Selected' is available only when all Personalities have a defined Tx
Signaling System of type MDC.
Available when
Personalities that have a defined Tx Signaling System of type MDC will
only be viewed in the drop down list.

### Emergency Sticky Revert

*Source: `signaling/Emergency_sticky_revert.htm`*

Emergency Sticky Revert
When checked, causes the radio to remain permanently on the Emergency Revert Channel after the emergency transmission
has been sent. The radio must be powered off for it to return to the radio�s
Channel Selector selected channel.
Notes
Available
when the radio is a Mobile model.
Available when
Emergency Type is not
set to Disabled.
Available when
Emergency Revert Channel is
not set to Selected.

### Auto Reset Timer

*Source: `signaling/auto_reset_timer_signaling_configuration.htm`*

Auto Reset Timer
Selects the amount of time to be used
by the Auto
Reset Timer Type for Signaling System communications.
The range is from 1 second to 255 seconds,
in increments of 1 second.
Notes
This
feature is not available for 2W Portable models.

### Emergency Type

*Source: `signaling/emergency_type.htm`*

Emergency Type
Selects behavioral traits of the transmitting radio while operating
in Emergency
Mode.
Choices
Functionality
Disabled:
Standard:
The transmitting radio�s alarm-tone and
LED
are activated throughout the alarm sequence.
Silent:
The transmitting radio produces no audio
or visual indications that an alarm is in progress, and the radio remains
unconditionally muted.
Silent with Voice:
The transmitting radio produces no audio
or visual indications that an alarm is in progress, and the radio unmutes
to qualified channel
activity.
Notes
Available
when the radio is a Mobile model.
Available when
at least one Personality
has a defined Tx
Signaling System
of type MDC.


---

## Troubleshooting

### Why I can't select the option "Emergency" for a Long Button Press in the Buttons window?

*Source: `Troubleshooting/Question_1.htm`*

Why I can't select the option "Emergency" for a Long Button
Press in the Buttons window?
If Emergency Revert Channel has been set as PersX, and the option "Never
Allowed" for Admit Criteria is selected in the PersX window, you
cannot select the option "Emergency" for a Long Button Press
in the Buttons window.
Involved Field:
Buttons -> All Button N Long Press Function (Emergency)

### Why I can't change the Decoder Single Tone -> Tone 1/2 -> Minimum or Maximum Durations in the Signaling -> Select 5 Systems -> Sys X window?

*Source: `Troubleshooting/Question_10.htm`*

Why I can't change the Decoder Single Tone -> Tone 1/2 -> Minimum
or Maximum Durations in the Signaling -> Select 5 Systems -> Sys
X window?
On "Select 5 Signaling System" the decoder single tone maximum
duration must be greater than the single tone minimum duration.
Involved Fields:
Signaling -> Select 5 Systems -> Sys X -> Decoder Single Tone
-> Tone 1 -> Minimum Durations (ms)
Signaling -> Select 5 Systems -> Sys X -> Decoder Single Tone
-> Tone 1 -> Maximum Durations (ms)
Signaling -> Select 5 Systems -> Sys X -> Decoder Single Tone
-> Tone 2 -> Minimum Durations (ms)
Signaling -> Select 5 Systems -> Sys X -> Decoder Single Tone
-> Tone 2 -> Maximum Durations (ms)

### Why I can't move "Def N" from "S5 Decoder -> Available" to "S5 Decoder -> Decoder -> Decode Telegrams" in the Personalities -> Pers X window?

*Source: `Troubleshooting/Question_11.htm`*

Why I can't move "Def N" from "S5 Decoder -> Available"
to "S5 Decoder -> Decoder -> Decode Telegrams" in the
Personalities -> Pers X window?
The "Def N" must use the same Select 5 Signaling System as
the "Def" in "S5 Decoder -> Decode Telegrams".
Involved Field:
Personalities -> Pers X -> S5 Decode -> Decode Telegrams

### Why I can't change Select 5 Signaling Systems in the Decoder -> Definitions -> Def N window?

*Source: `Troubleshooting/Question_12.htm`*

Why I can't change Select 5 Signaling Systems in the Decoder ->
Definitions -> Def N window?
The Decoders in "S5 Decoder -> Decode Telegrams" in the
Personalities -> Pers X window must use the same Select 5 Signaling
Systems.
Involved Field:
Decoder -> Definitions -> Def N -> Select 5 Signaling Systems

### Why I can't change System 1/2 -> Encoder Tone Durations (ms), Decoder Min. Tone Durations, (ms), Decoder Min. Tone Duration, or Decoder Max. Tone Durations in the Signaling -> User Defined System window?

*Source: `Troubleshooting/Question_13.htm`*

Why I can't change System 1/2 -> Encoder Tone Durations (ms), Decoder
Min. Tone Durations, (ms), Decoder Min. Tone Duration, or Decoder Max.
Tone Durations in the Signaling -> User Defined System window?
On User Definable Signaling Systems, the Decoder Minimum Tone Duration
must be lower than the Encoder Tone Duration and the Decoder Maximum Tone
Duration must be greater than the Encoder Tone Duration.
Involved Fields:
Signaling -> User Defined Systems -> System1 -> Encoder Tone
Duration (ms)
Signaling -> User Defined Systems -> System1 -> Decoder Min.
Tone Duration (ms)
Signaling -> User Defined Systems -> System1 -> Decoder Max.
Tone Duration (ms)
Signaling -> User Defined Systems -> System2 -> Encoder Tone
Duration (ms)
Signaling -> User Defined Systems -> System2 -> Decoder Min.
Tone Duration (ms)
Signaling -> User Defined Systems -> System2 -> Decoder Max.
Tone Duration (ms)

### Why I can't change the Telegram 1st Tone Duration (ms) in the Decoder -> Definitions -> Def N window?

*Source: `Troubleshooting/Question_14.htm`*

Why I can't change the Telegram 1st Tone Duration (ms) in the Decoder
-> Definitions -> Def N window?
If Def N is selected in Select 5 System X, The Decoder "Telegram
1st Tone Duration" (0 means Disabled) must be greater than system
durations. The system durations is corresponding to "Signaling System"
in the Signaling - >Select 5 Systems -> Sys X window.
Involved Field:
Decoder -> Definitions -> Def N -> Telegram 1st Tone Duration
(ms)

### Why I can't change Select 5 Signaling Systems in the Decoder -> Definitions -> Definitions -> Def N window?

*Source: `Troubleshooting/Question_15.htm`*

Why I can't change Select 5 Signalling Systems in the Decoder ->
Definitions -> Definitions -> Def N window?
If Def N is selected in Select 5 System X, the Decoder "Telegram
1st Tone Duration" must be greater than the system durations. The
system durations is corresponding to the "Signalling System"
in the Signalling -> Select 5 Systems -> Sys X window.
Involved Field:
Decoder -> Definitions -> Def N -> Select 5 Signalling Systems

### Why I can't change Signaling System in the Signaling -> Select 5 Systems -> Sys N window?

*Source: `Troubleshooting/Question_16.htm`*

Why I can't change Signalling System in the Signalling -> Select
5 Systems -> Sys N window?
If Def N is selected in Select 5 System X, the Decoder "Telegram
1st Tone Duration" (0 means Disabled) must be greater than the system
durations.
.
Involved Field:
Signalling ->Select 5 Systems -> Sys N -> Signalling System

### Why I can't change System 1/2 -> Encoder Tone Duration (ms) in the Decoder -> Definitions -> Def N window?

*Source: `Troubleshooting/Question_17.htm`*

Why I can't change System 1/2 -> Encoder Tone Duration (ms) in Signalling
-> User Defined Systems  window?
If Def N is selected in Select 5 System X and Select 5 Sys X is select
in "User Defined 1" or "User Defined 2" for Signalling
Systems, the Decoder "Telegram 1st Tone Duration" must be greater
than the system durations. The system durations is corresponding to the
"Signalling System" in the Signalling -> Select 5 Systems
-> Sys X window.
Involved Fields:
Signalling -> User Defined Systems -> System1 -> Encoder Tone
Duration (ms)
Signalling -> User Defined Systems -> System2 -> Encoder Tone
Duration (ms)

### Why I can't change Receive -> Frequency (MHz) or Transmit -> Frequency (MHz) in the Personalities -> Pers N window?

*Source: `Troubleshooting/Question_18.htm`*

Why I can't change Receive -> Frequency (MHz) or Transmit ->
Frequency (MHz) in the Personalities -> Pers N window?
Frequency must be divisible by either 5 kHz or 6.25 kHz.
Involved Fields:
Personalities -> Pers N -> Receive -> Frequency (MHz)
Personalities -> Pers N -> Transmit -> Frequency (MHz)

### Why I can't make "Status" to be blank in the Encode -> Status or Decoder -> Status window?

*Source: `Troubleshooting/Question_19.htm`*

Why I can't make "Status" to be blank in the Encode ->
Status or Decoder -> Status window?
Status Encode and Decode must not contain data.
Involved Fields:
Encoder -> Status -> Status
Decoder -> Status -> Status

### Why I can't change Signaling -> Select 5 Systems -> Sys N -> Group Tone/Repeat Tone?

*Source: `Troubleshooting/Question_19a.htm`*

Why I can't change Signaling -> Select 5 Systems -> Sys N ->
Group Tone/Repeat Tone?
If the Group Tone / Repeat Tone was set as a tone that was used by any
of the Radio ID digits, the CPS automatically changes it to a non-conflict
tone while saving an archive file or while programming the radio.

### Why I can't select the options "Emergency" or "Emergency with Wakeup" for Pin #'s 3, 4, 8, 9/, 12, and 14 Function in the Accessories window?

*Source: `Troubleshooting/Question_2.htm`*

Why I can't select the options "Emergency" or "Emergency
with Wakeup" for Pin #'s 3, 4, 8, 9, 12, and 14 Function in the Accessories
window?
If Emergency Revert Channel has been set as PersX, and the "Never
Allowed" option is selected for Admit Criteria in PersX screen, you
cannot select the option "Emergency" or "Emergency with
Wakeup" for Pin #'s 3/4/8/9/12/14 Function in the Accessories window.
Involved Fields:
Accessories -> Pin #3, #4, #8, #12, and #14 Function (Emergency)
Accessories -> Pin #9 Function (Emergency with Wakeup)

### Why I can't select "Advanced" for Multicall User Mode in the Encode Window?

*Source: `Troubleshooting/Question_20.htm`*

Why I can't check the Multicall Advanced User Mode checkbox in the
Encode Window?
In Contact List X, select Address Telegram Y. If the number of digits
of the "Contact List X Address" do not match the number of variable
digits of the "Telgram Y" (A1...A8),, you cannot check the Multicall
Advanced User checkbox in the Encode window.
Involved Field:
Encoder -> Multicall Advanced User Mode

### Why I can't modify "Address" for Contact List X in the Contact List window?

*Source: `Troubleshooting/Question_21.htm`*

Why I can't modify "Address" for Contact List X in the Contact
List window?
In Contact List X select Address Telegram Y. If Multicall Advanced User
Mode in the Encode window is checked and the number of digits of the "Contact
List X Address" matches the number of variable digits of the "Telegram
Y" (A1...A8), you cannot modify the number of digits for "Address"
in  Contact
List X in the Contact List window.
Involved Field:
Contact List  ->
Address

### Why I can't modify "Address Telegram" for Contact List X in the Contact List window?

*Source: `Troubleshooting/Question_22.htm`*

Why I can't modify "Address Telegram" for Contact List X
in the Contact List window?
In Contact List X, select Address Telegram Y. If Multicall Advanced
User Mode in the Encode window is checked and the number of digits of
the "Contact List X Address" matches the number of variable
digits of the "Telegram Y" (A1...A8), you cannot modify "Address
Telegram" for Contact List X in the Contact List window.
Involved Field:
Contact List -> Address Telegram

### Why I can't select for Sequence 1/2/3 in the Encoder -> Telegrams -> Tele N window?

*Source: `Troubleshooting/Question_23.htm`*

Why I can't select for Sequence 1/2/3 in the Encoder -> Telegrams
-> Tele N window?
In Contact List X, select Address Telegram Y. If you check the Multicall
Advanced User Mode checkbox in the Encode window and the number of digits
of the "Contact List X Address" matches the number of variable
digits of Telegram Y" (A1...A8), you cannot select for Sequence 1/2/3
in the Encoder -> Telegrams -> Tele N window.
Involved Field:
Encoder -> Telegrams -> Tele N -> Sequence 1/2/3

### Why I can't select from "DTMF" to "Select 5 Sys X" for a Signaling System in the Encoder -> Telegrams -> Seg N window?

*Source: `Troubleshooting/Question_24.htm`*

Why I can't select from "DTMF" to "Select 5 Sys X"
for a Signalling System in the Encoder -> Telegrams -> Seg N window?
In Contact List X select Address Telegram Y. If you check the Multicall
Advanced User Mode checkbox in the Encode window and the number of digits
of the "Contact List X Address" matches e number of variable
digits of "Telegram Y" (A1-A8), you cannot select from "DTMF"
to "Select 5 Sys X" for a Signalling System in the Encoder ->
Telegrams -> Seq N window.
Involved Field:
Encoder -> Sequences -> Seq N -> Signalling System

### Why I can't change Sequence in the Encoder -> Telegrams -> Seg N window?

*Source: `Troubleshooting/Question_25.htm`*

Why I can't change Sequence in the Encoder -> Telegrams -> Seg
N window?
in Contact List X select Address Telegram Y, in Address Telegram Y select
Sequence Z. If you check the Multicall Advanced User Mode checkbox in
the Encode window and the number of digits of the "Contact List X
Address" matches the number of variable digits of the "Telegram
Y" (A1...A8), you cannot change Sequence in the Encoder -> Telegrams
-> Seq N window.
Involved Field:
Encoder -> Sequences -> Seq N -> Sequence

### Why I can't change the Address/Status Minimum or Maximum range in the Encoder window?

*Source: `Troubleshooting/Question_26.htm`*

Why I can't change the Address/Status Minimum or Maximum range in the
Encoder window?
Multicall "Address/Status Range Minimum" must be lower than
or equal to the "Address/Status Range Maximum". Multicall "Address/Status
Range Minimum" must have the same number of digits as the "Address/Status
Range Maximum".
Involved Fields:
Encoder -> Multicall Address -> Address Range 1/2/3 -> Minimum
Encoder -> Multicall Address -> Address Range 1/2/3 -> Maximum
Encoder -> Multicall Status -> Status Range 1/2/3 -> Minimum
Encoder -> Multicall Status -> Status Range 1/2/3 -> Maximum

### Why I can't place "(T1)" or "(T2)" into a Decoder Sequence 1/2/3 in the Decoder -> Definition -> Def N window?

*Source: `Troubleshooting/Question_27.htm`*

Why I can't place "(T1)" or "(T2)" into a Decoder
Sequence 1/2/3 in the Decoder -> Definition -> Def N window?
In Def N select Select 5 Signaling System X. If the Decoder Single Tone
-> Tone 1/2 in the Signaling -> Select 5 Systems window is not enabled,
you cannot place "(T1)" or "(T2)" into the Decoder
Sequence 1/2/3 in the Decoder -> Definition -> Def N window.
Involved Field:
Decoder -> Definition -> Def N -> Decoder Sequence 1/2/3

### Why I can't change Select 5 Signaling Systems in the Decoder -> Definition -> Def N window?

*Source: `Troubleshooting/Question_28.htm`*

Why I can't change Select 5 Signaling Systems in the Decoder ->
Definition -> Def N window?
If the Decoder Single Tone -> Tone 1/2 in the Signaling -> Select
5 Systems window is not enabled and you place "(T1)" or "(T2)"
into a Decoder Sequence 1/2/3 in the Decoder -> Definition -> Def
N window, Select 5 Signaling System X cannot be selected in the Def N
window.
Involved Field:
Decoder -> Definitions -> Def N -> Select 5 Signaling Systems

### Why I can't uncheck Decoder Single Tone -> Tone 1 or Tone 2 in the Signaling -> Select 5 Systems window?

*Source: `Troubleshooting/Question_29.htm`*

Why I can't uncheck Decoder Single Tone -> Tone 1 or Tone 2 in the
Signaling -> Select 5 Systems window?
If the Decoder Single Tone -> Tone 1/2 in the Signaling ->Select
5 Systems window is enabled and you place "(T1)" or "(T2)"
into a Decoder Sequence 1/2/3 in the Decoder -> Definition -> Def
N window, you cannot uncheck Decoder Single Tone -> Tone 1 or Tone
2 in the Signaling -> Select 5 Systems window.
Involved Fields:
Signaling -> Select 5 Systems -> Decoder Single Tone -> Tone
1
Signaling -> Select 5 Systems -> Decoder Single Tone -> Tone
2

### Why I can't select the designated channel for Revert Channel in the Emergency window?

*Source: `Troubleshooting/Question_3.htm`*

Why I can't select the designated channel for Revert Channel in the
Emergency window?
If a Long Button press function has been assigned as "Emergency"
and option "Never Allowed" for Admit Criteria is selected in
the PersX window, you cannot select PersX for Revert Channel in the Emergency
window.
For Mobile models, If Pin #'s 3/4/8/9/12/14 Function has been assigned
as "Emergency" or "Emergency with Wakeup", you cannot
select the "Never Allowed" option for Admit Criteria in the
PersX window, and you cannot select PersX for Revert Channel in the Emergency
window.
Involved Field:
Emergency -> Revert Channel

### Why I can't select "Periodic" for Transmit -> PTT Keyup Mode in the Personalities -> Pers N window?

*Source: `Troubleshooting/Question_30.htm`*

Why I can't select "Periodic" for Transmit -> PTT Keyup
Mode in the Personalities -> Pers N window?
If the Periodic Telegram Repeat timer in the Encoder -> Telegrams
window is 0, you cannot select "Periodic" for Transmit ->
PTT Keyup Mode in the Personalities -> Pers N window.
Involved Field:
Personalities -> Pers N -> Transmit -> PTT Keyup Mode

### Why I can't set the Periodic Telegram Repeat timer to 0 in the Encoder -> Telegrams window?

*Source: `Troubleshooting/Question_31.htm`*

Why I can't set the Periodic Telegram Repeat timer to 0 in the Encoder
-> Telegrams window?
If "Periodic" is selected for Transmit -> PTT Keyup Mode
in the Personalities -> Pers N window, then the Periodic Telegram Repeat
timer in the Encoder -> Telegrams window cannot be set to 0.
Involved Field:
Encoder -> Telegrams -> Periodic Repeat Time (ms)

### Why I can't make "Address" to be blank in the Contact List window?

*Source: `Troubleshooting/Question_32.htm`*

Why I can't make "Address" to be blank in the Contact List
window?
If Multicall Advanced
User Mode in the Encode window is unchecked you cannot make Address
to be blank in the Contact List window.
Involved Field:
Contact List -> Address

### Why I can't select "Basic" for Multicall User Mode in the Encode window?

*Source: `Troubleshooting/Question_33.htm`*

Why I can't uncheck the Multicall Advanced User Mode in the Encode
window?
If Address in the Contact List window is
blank, you cannot uncheck Multicall
Advanced User Mode in the Encode window.
Involved Field:
Encoder -> Multicall Advanced User Mode

### Why I set a button to "Store Memory Channel 1/2", but the button has no effect while I press this button?

*Source: `Troubleshooting/Question_34.htm`*

Why I set a button to "Store Memory Channel 1/2", but the
button has no effect while I press this button?
The button has been defined for "Store Memory Channel 1/2",
but no button defined for "Memory Channel 1/2".
Involved Fields:
Button Options
General Settings->"Memory Channel 1" and "Memory Channel
2"

### Why I set a button to "Voice Storage Record/Play" or "Cancel Voice Message", but the button has no effect while I press this button?

*Source: `Troubleshooting/Question_35.htm`*

Why I set a button to "Voice Storage Record/Play" or "Cancel
Voice Message", but the button has no effect while I press this button?
Buttons for "Voice Storage Record" and "Voice Storage
Play" or "Cancel Voice Message" are defined but "Voice
Storage" in the Option Board window is disabled.
Involved Fields:
Button-> Button X Short/Long Press
Option Board -> Voice Storage

### Why I set Accessories -> External Alarm to enabled, but it has no effect in the radio?

*Source: `Troubleshooting/Question_36.htm`*

Why I set Accessories -> External Alarm to enabled, but it has no
effect in the radio?
External Alarm is enabled but no button or menu entry has been defined.
Involved Fields:
Button Options
Accessories -> "Package/Pin Configuration", "External
Alarm"

### GPIO is set to "Decoder Output Control", but why does the function has no effect on the radio?

*Source: `Troubleshooting/Question_37.htm`*

GPIO is set to "Decoder Output Control", but why does the
function has no effect on the radio?
GPIO is set to "Decoder Output Control" but "Decoder
Output Control" is disabled in the Decoder -> Definitions ->
Def N window.
Involved Fields:
Accessories-> Pin's #4, #8, #12, and #14 -> Function
Decoder -> Definitions -> Def N -> Decoder Output

### Why I can't select the option "Never Allowed" for Admit Criteria in the Personalities -> Pers X window?

*Source: `Troubleshooting/Question_4.htm`*

Why I can't select the option "Never Allowed" for Admit Criteria
in the Personalities -> Pers X window?
If a Long Button press function has been assigned as "Emergency"
and Emergency Revert Channel has been set as PersX, you cannot select
the "Never Allowed" option for Admit Criteria in the PersX window.
For Mobile models, if Pin #'s 3/4/8/9/12/14 Function has been assigned
as "Emergency" or "Emergency with Wakeup" and Emergency
Revert Channel has been set as PersX, you cannot select the "Never
Allowed" option for Admit Criteria in the PersX window.
Involved Field:
Personalities -> PersN -> Admit Criteria

### Why I can't select the option "Emergency" for a Long Button press in the Buttons window?

*Source: `Troubleshooting/Question_5.htm`*

Why I can't select the option "Emergency" for a Long Button
press in the Buttons window?
If Emergency Revert Channel has been set as "PersX" and Emergency
Squelch has been set as "PL", and the option "CSQ"
for Receive -> Squelch Type is selected in the Personalities ->
Pers N window, you cannot select the option "Emergency" for
a Long Button press in the Buttons window.
Involved Field:
Buttons -> All Button N Long Press Function (Emergency)

### Why I can't select the option "Emergency" or "Emergency with Wakeup" for Pin #'s 3, 4, 8, 9, 12, and 14 Function in the Accessories window?

*Source: `Troubleshooting/Question_6.htm`*

Why I can't select the option "Emergency" or "Emergency
with Wakeup" for Pin #'s 3, 8, 9, 12, and 14 Function in the Accessories
window?
If Emergency Revert Channel has been set as "PersX" and Emergency
Squelch has been set as "PL", and the option "CSQ"
is selected for Receive -> Squelch Type in the Personalities ->
Pers N window, you cannot select the option "Emergency" or "Emergency
with Wakeup" for Pin #'s 3/8/9/12/14 Function in the Accessories
window.
Involved Fields:
Accessories -> Pin #3, #8, #12, and #14 Function (Emergency)
Accessories -> Pin #9 Function (Emergency with Wakeup)

### Why I can't select the designated channel for Revert Channel in the Emergency window?

*Source: `Troubleshooting/Question_7.htm`*

Why I can't select the designated channel for Revert Channel in the
Emergency window?
If a Long Button press function has been assigned as "Emergency"
and the option "CSQ" is selected for Receive -> Squelch Type
in the Personalities -> Pers X window and Emergency Squelch has been
set as "PL" in the Emergency window, you cannot select the Pers
X for Revert Channel in the Emergency window.
For Mobile types, if Pin #'s 3/8/9/12/14 Function has been assigned
as "Emergency" or "Emergency with Wakeup" and the
option "CSQ" is selected for Receive -> Squelch Type in the
Personalities -> Pers X window and Emergency Squelch has been set as
"PL" in the Emergency window, you cannot select the Pers X for
Revert Channel in the Emergency window.
Involved Field:
Emergency -> Revert Channel

### Why I can't select the "TPL Squelch" for Squelch in the Emergency window?

*Source: `Troubleshooting/Question_8.htm`*

Why I can't select the "TPL Squelch" for Squelch in the Emergency
window?
If a Long Button press function has been assigned as "Emergency"
and the option "CSQ" is selected for Receive -> Squelch Type
in the Personalities -> Pers X window and the Pers X is selected for
Revert Channel in the Emergency window, you cannot select "PL"
for Squelch in the Emergency window.
For Mobile models, if Pin #'s3/8/9/12/14 Function has been assigned
as "Emergency" or "Emergency with Wakeup"and the option
"CSQ" is selected for Receive -> Squelch Type in the Personalities
-> Pers X window and the Pers X is selected for Revert Channel in the
Emergency window, you cannot select "PL" for Squelch in the
Emergency window.
Involved Field:
Emergency -> Squelch

### Why I can't select the option "CSQ" for Transmit -> Squelch Type in the Personalities -> Pers X window?

*Source: `Troubleshooting/Question_9.htm`*

Why I can't select the option "CSQ" for Receive -> Squelch
Type in the Personalities -> Pers X window?
If a Long Button press function has been assigned as "Emergency"
and the Pers X is selected for Revert Channel in the Emergency window
and Emergency Squelch has been set as "PL" in the Emergency
window, you cannot select the option "CSQ" for Receive ->
Squelch Type in the Personalities -> Pers N window.
For Mobile models, If Pin #'s 3/8/9/12/14 Function has been assigned
as "Emergency" or "Emergency with Wakeup"and the Pers
X is selected for Revert Channel in the Emergency window and Emergency
Squelch has been set as "PL" in the Emergency window, you cannot
select the option "CSQ" for Receive ->Squelch Type in the
Personalities - Pers N window.
Involved Field:
Personalities -> Pers X -> Receive -> Squelch Type

### Troubleshooting Accessories Settings

*Source: `Troubleshooting/Troubleshooting_Accessories_Settings.htm`*

Troubleshooting Accessories Settings
Why I set Accessories -> External Alarm
to enabled, but it has no effect in the radio?
GPIO is set to "Decoder Output Control",
but why does the function have no effect on the radio?

### Troubleshooting Channel Frequency

*Source: `Troubleshooting/Troubleshooting_Channel_Frequency.htm`*

Troubleshooting Channel Frequency
Why I can't change Receive -> Frequency
(MHz) or Transmit -> Frequency (MHz) in the Personalities -> Pers
N window?

### Troubleshooting Contact List Data

*Source: `Troubleshooting/Troubleshooting_Contact_List_Data.htm`*

Troubleshooting Contact List Data
Why I can't make "Address" to be
blank in the Contact List window?
Why I can't uncheck the Multicall Advanced
User Mode in the Encode window?

### Troubleshooting Decoder Single Tone

*Source: `Troubleshooting/Troubleshooting_Decoder_Single_Tone.htm`*

Troubleshooting Decoder Single Tone
Why I can't place "(T1)" or "(T2)"
into a Decoder Sequence 1/2/3 in the Decoder -> Definition -> Def
N window?
Why I can't change Select 5 Signaling Systems
in the Decoder -> Definition -> Def N window?
Why I can't uncheck Decoder Single Tone ->
Tone 1 or Tone 2 in the Signaling -> Select 5 Systems window?

### Troubleshooting Decoder Single Tone Duration

*Source: `Troubleshooting/Troubleshooting_Decoder_Single_Tone_Duration.htm`*

Troubleshooting Decoder Single Tone Duration
Why I can't change the Decoder Single Tone
-> Tone 1/2 -> Minimum or Maximum Durations in the Signaling ->
Select 5 Systems -> Sys X window?

### Troubleshooting Decoder Telegram First Tone Duration

*Source: `Troubleshooting/Troubleshooting_Decoder_Telegram_First_Tone_Duration.htm`*

Troubleshooting Decoder Telegram First Tone Duration
Why I can't change the Telegram 1st Tone Duration
(ms) in the Decoder -> Definitions -> Def N window?
Why I can't change Select 5 Signalling Systems
in the Decoder -> Definitions -> Def N window?
Why I can't change Signalling System in the
Signalling -> Select 5 Systems -> Sys N window?
Why I can't change System 1/2 -> Encoder
Tone Duration (ms) in Signalling -> User Defined Systems window?

### Troubleshooting Decoder Tone Duration

*Source: `Troubleshooting/Troubleshooting_Decoder_Tone_Duration.htm`*

Troubleshooting Decoder Tone Duration
Why I can't change System 1/2 -> Encoder
Tone Durations (ms), Decoder Min. Tone Durations, or Decoder Max. Tone
Durations in the Signaling -> User Defined System window?

### Troubleshooting Digit Number in Contact List

*Source: `Troubleshooting/Troubleshooting_Digit_Number_in_Contact_List.htm`*

Troubleshooting Digit Number in Contact List
Why I can't check the Multicall Advanced User
Mode checkbox in the Encode window?
Why I can't modify "Address" for
Contact List X in the Contact List window?
Why I can't modify "Address Telegram"
for Contact List X in the Contact List window?
Why I can't select a Sequence 1/2/3 in the
Encoder -> Telegrams -> Tele N window?
Why I can't select from "DTMF" to
"Select 5 Sys X" for a Signalling System in the Encoder ->
Telegrams -> Seq N window?
Why I can't change Sequence in the Encoder
-> Telegrams -> Seq N window?

### Troubleshooting Encoder Status

*Source: `Troubleshooting/Troubleshooting_Encoder_Status.htm`*

Troubleshooting Encoder Status
Why I can't make "Status" to be
blank in the Encode -> Status or Decoder -> Status window?

### Troubleshooting General Settings

*Source: `Troubleshooting/Troubleshooting_General_Settings.htm`*

Troubleshooting General Settings
Why I set a button to "Store Memory Channel
1/2", but the button has no effect while I press this button?
Why I set a button to "Voice Storage
Record/Play" or "Cancel Voice Message", but the button
has no effect while I press this button?

### Troubleshooting Multicall Status/Address Range

*Source: `Troubleshooting/Troubleshooting_Multicall_Status_Address_Range.htm`*

Troubleshooting Multicall Status/Address Range
Why I can't change the Address/Status Minimum
or Maximum range in the Encoder window?

### Troubleshooting Periodic Telegram Repeat Timer

*Source: `Troubleshooting/Troubleshooting_Periodic_Telegram_Repeat_Timer.htm`*

Troubleshooting Periodic Telegram Repeat Timer
Why I can't select "Periodic" for
Transmit -> PTT Keyup Mode in the Personalities -> Pers N window?
Why I can't set the Periodic Telegram Repeat
timer to 0 in the Encoder -> Telegrams window?

### Troubleshooting Signaling System

*Source: `Troubleshooting/Troubleshooting_Signaling_System.htm`*

Troubleshooting Signaling System
Why I can't move "Def N" from "S5
Decoder -> Available" to "S5 Decoder -> Decode Telegrams"
in the Personalities->Pers X window?
Why I can't change Select 5 Signaling Systems
in Decoder -> Definitions -> Def N window?

### Troubleshooting TPL Squelch

*Source: `Troubleshooting/Troubleshooting_TPL_Squelch.htm`*

Troubleshooting TPL Squelch
Why I can't select the option "Emergency"
for a Long Button press in the Buttons window?
Why I can't select the option "Emergency"
or "Emergency with Wakeup" for Pin #'s 3/8/9/12/14 Function
in the Accessories window?
Why I can't select the designated channel for
Revert Channel in the Emergency window?
Why I can't select the "TPL Squelch"
for Squelch in the Emergency window?
Why I can't select the option "CSQ"
for Transmit -> Squelch Type in the Personalities -> Pers X window?

### Troubleshooting Transmit Never Allowed

*Source: `Troubleshooting/Troubleshooting_Transmit_Never_Allowed_.htm`*

Troubleshooting Transmit Never Allowed
Why I can't select the option "Emergency"
for a Long Button Press in the Buttons window?
Why I can't select the options "Emergency"
or "Emergency with Wakeup" for Pin #'s 3/4/8/9/12/14 Function
in the Accessories window?
Why I can't select the designated channel for
Revert Channel in the Emergency window?
Why I can't select the option "Never Allowed"
for Admit Criteria in the Personalities -> Pers X window?
