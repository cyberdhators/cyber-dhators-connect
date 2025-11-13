#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Usage: node scripts/create-bing-key.js <KEY>
// Or set BING_KEY env var and run: node scripts/create-bing-key.js

const key = process.argv[2] || process.env.BING_KEY;
if (!key) {
  console.error('Usage: node scripts/create-bing-key.js <BING_KEY>');
  process.exit(1);
}

const filename = `${key}.txt`;
const outPath = path.join(__dirname, '..', 'public', filename);
fs.writeFileSync(outPath, key, { encoding: 'utf8' });
console.log(`Wrote Bing verification file to ${outPath}`);
