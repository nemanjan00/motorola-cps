#!/usr/bin/env node
/**
 * remove-password — Remove CPS and radio lock passwords from Motorola codeplugs.
 *
 * Usage:
 *   node remove-password.js <file.cps>                  # Remove from file, save in place
 *   node remove-password.js <file.cps> -o <output.cps>  # Save to different file
 *   node remove-password.js --serial <port>              # Remove from connected radio
 *   node remove-password.js --show <file.cps>            # Show password state only
 *
 * Passwords in these radios are NOT security — stored plaintext in the codeplug.
 * CPS reads the password and compares client-side. This tool zeroes the fields.
 */

import { decodeCps, encodeCps, parseCodeplugXml, serializeCodeplugXml } from '../lib/index.js';
import { readFile, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';

const HELP = `
remove-password — Remove passwords from Motorola Commercial Series codeplugs

Usage:
  remove-password <file.cps>                  Clear passwords, overwrite file
  remove-password <file.cps> -o <output.cps>  Clear passwords, write to output
  remove-password --serial <port>             Clear passwords on connected radio
  remove-password --show <file.cps>           Show password state without modifying

Options:
  -o, --output <file>   Write to a different file
  -s, --serial <port>   Serial port (/dev/ttyUSB0, COM3)
  --show                Read-only, show password state
  --dry-run             Show what would change
  -h, --help            Show this help
`;

async function main() {
  const args = process.argv.slice(2);
  if (!args.length || args.includes('-h') || args.includes('--help')) { console.log(HELP); return; }

  const showOnly = args.includes('--show');
  const dryRun = args.includes('--dry-run');
  const serialIdx = Math.max(args.indexOf('--serial'), args.indexOf('-s'));
  const outputIdx = Math.max(args.indexOf('--output'), args.indexOf('-o'));

  if (serialIdx !== -1) {
    await handleSerial(args[serialIdx + 1], showOnly, dryRun);
  } else {
    const input = args.find(a => !a.startsWith('-') && a !== args[outputIdx + 1]);
    if (!input) { console.error('Error: no input file'); process.exit(1); }
    await handleFile(input, outputIdx !== -1 ? args[outputIdx + 1] : null, showOnly, dryRun);
  }
}

// ---- File mode ----

async function handleFile(inputFile, outputFile, showOnly, dryRun) {
  console.log(`Reading ${basename(inputFile)}...`);
  const cp = parseCodeplugXml(decodeCps(new Uint8Array(await readFile(inputFile))));
  console.log(`Format: ${cp.format} | Model: ${cp.getModelNumber() || 'unknown'}\n`);

  const passwords = getPasswords(cp);
  showPasswords(passwords);

  if (showOnly) return;
  if (!passwords.some(p => p.active)) { console.log('\nNo active passwords.'); return; }

  if (dryRun) {
    console.log('\nWould clear:');
    passwords.filter(p => p.active).forEach(p => console.log(`  ${p.label}: ${p.value} → ${p.clear}`));
    return;
  }

  clearPasswordsFromCodeplug(cp);
  const dest = outputFile || inputFile;
  await writeFile(dest, encodeCps(serializeCodeplugXml(cp)));
  console.log(`\nPasswords cleared → ${basename(dest)}`);
}

// ---- Serial mode ----

async function handleSerial(port, showOnly, dryRun) {
  if (!port) { console.error('Error: --serial needs a port path'); process.exit(1); }

  const { createNodeTransport } = await import('../lib/protocol/transport.js');
  const { ESBEPSession, QUERY } = await import('../lib/protocol/esbep.js');
  const { RadioSession } = await import('../lib/protocol/radio-session.js');
  const { parseBlockHeader } = await import('../lib/binary/block-codec.js');

  console.log(`Connecting to ${port}...`);
  const transport = await createNodeTransport(port);
  const esbep = new ESBEPSession(transport);

  try {
    // Identify
    const model = await esbep.query(QUERY.MODEL);
    const serial = await esbep.query(QUERY.SERIAL);
    const firmware = await esbep.query(QUERY.FIRMWARE);
    const format = model.match(/^M50[JKQRST](?:QC|QF|PC|PF|RC|RF|TC|TF)/) ? 'S5T' : 'ELP_ELM';

    console.log(`Model: ${model} | Serial: ${serial} | FW: ${firmware} | Format: ${format}\n`);

    // Check if radio reports password
    let hasPwd;
    try { hasPwd = await esbep.query(QUERY.PASSWORD_CHECK); } catch { hasPwd = '0'; }
    console.log(`Radio reports password set: ${hasPwd !== '0' ? 'YES' : 'no'}\n`);

    if (format === 'S5T') {
      await handleSerialS5T(esbep, showOnly, dryRun);
    } else {
      await handleSerialElpElm(esbep, model, showOnly, dryRun);
    }
  } finally {
    await esbep.close();
  }
}

async function handleSerialElpElm(esbep, model, showOnly, dryRun) {
  // ELP_ELM: password is in DR_BLOCK.
  // Bootstrap: read RI at 642, MDF at 728, RRW header to find VECT, read VECT to find DR_BLOCK address.
  const isPortable = model.startsWith('H');

  // Read RRW header to get VECT address
  const rrwOffset = isPortable ? 759 : 767;
  const rrwHeader = await esbep.readMemory(642 + rrwOffset - 642 + 642, 9);
  const vbVec = rrwHeader[7] | (rrwHeader[8] << 8);

  // Read VECT to get DR_BLOCK address (index 6)
  const vbData = await esbep.readMemory(vbVec, 114);
  const drAddr = vbData[2 + 6 * 2] | (vbData[3 + 6 * 2] << 8);

  if (!drAddr) {
    console.log('DR_BLOCK not found in codeplug.');
    return;
  }

  // Read DR_BLOCK: 4-byte header + 14 bytes data
  const drRaw = await esbep.readMemory(drAddr, 18);
  const entrySize = drRaw[1];
  const dataStart = drAddr + 4; // header is 4 bytes

  console.log('DR_BLOCK at 0x' + drAddr.toString(16) + ', entry size ' + entrySize + ' bytes');
  console.log('DR_BLOCK data: ' + Buffer.from(drRaw.slice(4, 4 + entrySize)).toString('hex'));

  if (showOnly) {
    console.log('\nUse without --show to clear.');
    return;
  }

  if (dryRun) {
    console.log('\nWould zero DR_BLOCK data (' + entrySize + ' bytes) to clear radio lock.');
    console.log('Note: CPS password (RC_BLOCK) is not cleared — it only locks the CPS');
    console.log('software, not the ESBEP protocol. Radio is fully accessible regardless.');
    return;
  }

  // Zero the entire DR_BLOCK data area.
  // This clears: radio lock password, lock enable, valid password flag,
  // AND resets runtime state (last channel, scan state, etc.) to defaults.
  // This is safe — DR_BLOCK is "dynamic radio" state, not configuration.
  // The radio rebuilds runtime state on next power cycle.
  const zeroed = new Uint8Array(entrySize);
  await esbep.writeMemory(dataStart, zeroed);

  console.log('\nDR_BLOCK zeroed — radio lock password cleared.');
  console.log('Note: CPS password in RC_BLOCK not modified (does not lock the radio).');
  console.log('Reset the radio for changes to take effect.');
}

async function handleSerialS5T(esbep, showOnly, dryRun) {
  // S5T: password is in S5_RADIO_INFO_BLOCK at byte offset 53
  // Read S5_CFG at 642 to get VECT address
  const cfg = await esbep.readMemory(642, 9);
  const vbVec = cfg[7] | (cfg[8] << 8);
  const vbData = await esbep.readMemory(vbVec, 65);

  // S5_RADIO_INFO_BLOCK is VECT index 0
  const riAddr = vbData[1] | (vbData[2] << 8);
  if (!riAddr) { console.log('S5_RADIO_INFO_BLOCK not found.'); return; }

  // Password is at offset +5 (header) +53 = byte 58 from block start
  const pwdOffset = riAddr + 5 + 53;
  const pwdByte = await esbep.readMemory(pwdOffset, 1);
  const hasPassword = pwdByte[0] !== 0;

  console.log(`S5T password byte at 0x${pwdOffset.toString(16)}: 0x${pwdByte[0].toString(16)} (${hasPassword ? 'SET' : 'not set'})`);

  if (showOnly) return;
  if (!hasPassword) { console.log('No password set.'); return; }
  if (dryRun) { console.log('Would write 0x00 to clear password.'); return; }

  // Write single zero byte to clear password
  await esbep.writeMemory(pwdOffset, new Uint8Array([0]));
  console.log('Password cleared.');
}

// ---- Codeplug password helpers ----

function getPasswords(cp) {
  if (cp.format === 'S5T') {
    const pwd = cp.getField('S5_RADIO_INFO_BLOCK', 'S5_RI_RSS_PWD') || '0';
    return [{ label: 'CPS/RSS Password', field: 'S5_RI_RSS_PWD', value: pwd, active: pwd !== '0', clear: '0' }];
  }

  const g = (b, f) => cp.getField(b, f);
  return [
    { label: 'Radio Lock Password', field: 'DR_RADLOCKPSWD', value: g('DR_BLOCK', 'DR_RADLOCKPSWD') || '0000', active: g('DR_BLOCK', 'DR_RADLOCKEN') === '1', clear: '0000' },
    { label: 'Radio Lock Enable', field: 'DR_RADLOCKEN', value: g('DR_BLOCK', 'DR_RADLOCKEN') || '0', active: g('DR_BLOCK', 'DR_RADLOCKEN') === '1', clear: '0' },
    { label: 'Valid Password', field: 'DR_VALIDPSWD', value: g('DR_BLOCK', 'DR_VALIDPSWD') || '0', active: g('DR_BLOCK', 'DR_VALIDPSWD') === '1', clear: '0' },
    { label: 'CPS Password Enable', field: 'RC_CPSPSWDEN', value: g('RC_BLOCK', 'RC_CPSPSWDEN') || '0', active: g('RC_BLOCK', 'RC_CPSPSWDEN') === '1', clear: '0' },
    { label: 'CPS Password', field: 'RC_CPSPSWD', value: g('RC_BLOCK', 'RC_CPSPSWD') || '', active: g('RC_BLOCK', 'RC_CPSPSWDEN') === '1', clear: '' },
  ];
}

function showPasswords(passwords) {
  console.log('Password state:');
  for (const p of passwords) {
    const status = p.active ? '\x1b[31mACTIVE\x1b[0m' : '\x1b[32moff\x1b[0m';
    console.log(`  ${p.label.padEnd(25)} ${status}${p.active ? ' (' + p.value + ')' : ''}`);
  }
}

function clearPasswordsFromCodeplug(cp) {
  if (cp.format === 'S5T') {
    cp.setField('S5_RADIO_INFO_BLOCK', 'S5_RI_RSS_PWD', '0');
  } else {
    cp.setField('DR_BLOCK', 'DR_RADLOCKPSWD', '0000');
    cp.setField('DR_BLOCK', 'DR_RADLOCKEN', '0');
    cp.setField('DR_BLOCK', 'DR_VALIDPSWD', '0');
    cp.setField('RC_BLOCK', 'RC_CPSPSWDEN', '0');
    const rcBlock = cp.getBlock('RC_BLOCK');
    if (rcBlock?.entries[0]?.fields['RC_CPSPSWD'] !== undefined) {
      cp.setField('RC_BLOCK', 'RC_CPSPSWD', '');
    }
  }
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });
