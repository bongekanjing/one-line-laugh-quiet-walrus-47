import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The One-Line Laugh: one funny sentence, at most 200 characters.
//
// The line is a deadpan confession that only lands at the last beat. The setup
// reads like ordinary moving-house admin, so the reader is already nodding
// along before the turn arrives, and the turn is the same sentence doing two
// jobs at once: it explains why the box is unopened and why it can never be.
const LINE =
  "I have moved a box labelled 'cables, probably' through four apartments in six years without once opening it. It is not a box anymore, it is an heirloom.";

const OUT = process.env.ENTRY_OUT ?? "/output/entry.txt";

// The brief caps the line at 200 characters. Count code points, not UTF-16
// units, so a stray emoji could never slip past the gate as one character.
const chars = [...LINE];
const problems = [];
if (chars.length < 1) problems.push("the line is empty");
if (chars.length > 200) problems.push(`the line is ${chars.length} characters, over the 200 cap`);
if (!LINE.trim()) problems.push("the line is whitespace only");
if (/\s{2,}/.test(LINE)) problems.push("the line has doubled spaces");
if (!/[.!?]$/.test(LINE.trim())) problems.push("the line does not end on a full stop");

if (problems.length) {
  for (const p of problems) console.error(`invalid: ${p}`);
  process.exit(1);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, LINE, "utf8");
console.log(`wrote ${chars.length} characters`);
