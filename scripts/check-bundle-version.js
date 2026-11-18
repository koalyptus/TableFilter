'use strict';

// Guard for #1095: the tracked browser <script> artifact must report the
// version in package.json. CI runs this against the committed bundle before
// any build overwrites dist/, and against the built bundle before the
// tablefilter-website sync.
// Usage: node scripts/check-bundle-version.js [bundle-path]
// (exit 0 = match, exit 1 = mismatch).

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const bundlePath = process.argv[2] ||
    path.join('dist', 'tablefilter', 'tablefilter.js');
const pkg = JSON.parse(
    fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8')
);
const bundle = fs.readFileSync(path.resolve(REPO_ROOT, bundlePath), 'utf8');
const expected = `this.version="${pkg.version}"`;

if (bundle.indexOf(expected) === -1) {
    const prefix = process.env.GITHUB_ACTIONS ? '::error::' : '';
    console.error(
        `${prefix}${bundlePath} does not report ${pkg.version} - ` +
        'rebuild and commit it'
    );
    process.exit(1);
}

console.log(`${bundlePath} reports ${pkg.version}`);
