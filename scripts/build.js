const fs = require('node:fs');
const path = require('node:path');

const source = path.join(__dirname, '..', 'public');
const output = path.join(__dirname, '..', 'dist');

fs.mkdirSync(output, { recursive: true });
fs.cpSync(source, output, { recursive: true });

console.log('Build complete: static site copied to dist/');
