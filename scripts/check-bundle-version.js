'use strict';

// Guard for #1095: the tracked browser <script> artifact must report the
// version in package.json. CI runs this against the committed bundle before
// any build overwrites dist/, and against the built bundle before publishing
// and the tablefilter-website sync.
// Usage: node scripts/check-bundle-version.js [bundle-path]
// (exit 0 = match, exit 1 = mismatch or unreadable file).

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const bundlePath = process.argv[2] ||
    path.join('dist', 'tablefilter', 'tablefilter.js');

const fail = (message) => {
    const prefix = process.env.GITHUB_ACTIONS ? '::error::' : '';
    console.error(`${prefix}${message}`);
    process.exit(1);
};

const read = (file) => {
    try {
        return fs.readFileSync(file, 'utf8');
    } catch (err) {
        fail(err.message);
    }
};

const pkg = JSON.parse(
    read(path.join(REPO_ROOT, 'package.json'))
);
const bundle = read(path.resolve(REPO_ROOT, bundlePath));
const expected = `this.version="${pkg.version}"`;

if (bundle.indexOf(expected) === -1) {
    fail(
        `${bundlePath} does not report ${pkg.version} - ` +
        'rebuild and commit it'
    );
}

console.log(`${bundlePath} reports ${pkg.version}`);
