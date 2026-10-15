'use strict';

// Guard for the --tf-* token system (#892): every var(--tf-*, <fallback>)
// used across the base stylesheets must carry a fallback equal to the
// :root definition in custom-properties.styl, otherwise unthemed rendering
// silently drifts from the pre-variable values.
// Usage: node scripts/check-css-tokens.js (exit 0 = match, exit 1 = drift).

const fs = require('fs');
const path = require('path');

const STYLE_DIR = path.join(__dirname, '..', 'static', 'style');
const DEFINITIONS_FILE = 'custom-properties.styl';

const normalize = (value) => value.trim().toLowerCase();

const definitions = new Map();
const defSource = fs.readFileSync(
    path.join(STYLE_DIR, DEFINITIONS_FILE), 'utf8'
);
for (const line of defSource.split('\n')) {
    const match = line.match(/^\s*(--tf-[a-z-]+)\s+([^;\s]+)\s*$/);
    if (match) {
        definitions.set(match[1], normalize(match[2]));
    }
}

if (definitions.size === 0) {
    console.error(`No --tf-* definitions found in ${DEFINITIONS_FILE}`);
    process.exit(1);
}

const failures = [];
const usagePattern = /var\(\s*(--tf-[a-z-]+)\s*,\s*([^)]+)\)/g;
const files = fs.readdirSync(STYLE_DIR)
    .filter((file) => file.endsWith('.styl'))
    .sort();

for (const file of files) {
    const source = fs.readFileSync(path.join(STYLE_DIR, file), 'utf8');
    let match;
    usagePattern.lastIndex = 0;
    while ((match = usagePattern.exec(source)) !== null) {
        const [name, fallback] = [match[1], normalize(match[2])];
        if (!definitions.has(name)) {
            failures.push(file + ': ' + name + ' has no :root definition');
        } else if (definitions.get(name) !== fallback) {
            failures.push(
                file + ': ' + name + ' fallback ' + match[2].trim() +
                ' does not match definition'
            );
        }
    }
}

if (failures.length > 0) {
    failures.forEach((failure) => console.error('FAIL: ' + failure));
    process.exit(1);
}

console.log(
    'OK: all var() fallbacks match ' +
    definitions.size + ' --tf-* definitions ' +
    'across ' + files.length + ' stylesheets'
);
