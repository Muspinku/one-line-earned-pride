// one-line-earned-pride — make.fun entry for
// u-mang-one-line-of-earned-pride-a0138557.
// A Node 22 program, standard library only. It writes one line to
// entry.txt in the output directory and then proves the file it wrote
// is byte-for-byte the line below.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The line itself. A grandfather who left school at twelve finally
// reads his granddaughter a bedtime story — a long, quiet effort
// landing in one small, ordinary moment. The finger under every word
// is the tell: he is still working at it. The landing is her asking
// for the same story tomorrow — proof his reading was good enough.
const ENTRY =
  'My grandfather left school at twelve. Tonight he read my daughter her bedtime story — slowly, finger under every word — and when he finished, she asked for the same one tomorrow.';

// The gate for this bounty: one line, 1 to 240 characters of UTF-8,
// no trailing newline, nothing else in the file.
const MAX_CHARS = 240;

function fail(message) {
  throw new Error(message);
}

function checkEntry(text) {
  if (typeof text !== 'string' || text.length < 1) fail('entry is empty');
  if (text.length > MAX_CHARS) {
    fail(`entry is ${text.length} characters, cap is ${MAX_CHARS}`);
  }
  if (!text.trim()) fail('entry is only whitespace');
  if (text.includes('\n')) fail('entry must stay on one line');
}

function resolveTarget() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outDir, { recursive: true });
  return join(outDir, 'entry.txt');
}

function verifyEntry(target, text) {
  const written = readFileSync(target);
  const expected = Buffer.byteLength(text, 'utf8');
  if (written.length !== expected) {
    fail(`entry.txt is ${written.length} bytes, expected ${expected}`);
  }
  if (written.length > 0 && written[written.length - 1] === 0x0a) {
    fail('entry.txt ends with a newline');
  }
  if (written.toString('utf8') !== text) {
    fail('entry.txt does not match ENTRY after writing');
  }
  return written.length;
}

checkEntry(ENTRY);
const target = resolveTarget();
writeFileSync(target, ENTRY, 'utf8');
const bytes = verifyEntry(target, ENTRY);
if (bytes === 0) fail('entry.txt is empty after writing');
console.log(`wrote ${target}: ${ENTRY.length} characters, ${bytes} bytes`);
