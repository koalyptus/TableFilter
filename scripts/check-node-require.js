'use strict';

// Guard for #1030: the published package must load from Node with require().
// The legacy webpack UMD bundle used to emit its wrapper as `}(window, ...)`,
// which threw `ReferenceError: window is not defined` before the CommonJS
// branch could assign module.exports. Requiring the repo checkout is not
// enough: only the packed tarball shows what consumers actually install
// (the `files` whitelist, index.js and dist/ layout).
// Usage: node scripts/check-node-require.js (exit 0 = exports a function).

const {execFileSync} = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
// Run inside the throwaway project. Catches locally so a broken bundle
// prints a one-line error instead of Node's code frame dumping the whole
// minified dist file.
const PROBE = [
    'try {',
    '    var TableFilter = require("tablefilter");',
    '    if (typeof TableFilter !== "function") {',
    '        throw new Error(',
    '            "require(\'tablefilter\') returned " + typeof TableFilter',
    '        );',
    '    }',
    '    console.log("require(\'tablefilter\') ->", typeof TableFilter);',
    '} catch (err) {',
    '    console.error(err.name + ": " + err.message);',
    '    process.exit(1);',
    '}'
].join('\n');

// `npm run` exports the repo's .npmrc (allow-scripts=phantomjs-prebuilt) as
// npm_config_allow_scripts. npm 12 rejects that setting in a nested,
// project-scoped install, so drop it for the throwaway project.
const npmEnv = Object.assign({}, process.env);
Object.keys(npmEnv).forEach((key) => {
    if (key.toLowerCase() === 'npm_config_allow_scripts') {
        delete npmEnv[key];
    }
});

const run = (cmd, args, cwd) => execFileSync(cmd, args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
    env: npmEnv
});

const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tf-node-require-'));

try {
    // Pack the same file list npm publish would upload.
    const packDir = path.join(workDir, 'pack');
    fs.mkdirSync(packDir);
    run('npm', ['pack', '--pack-destination', packDir], REPO_ROOT);
    const tarball = fs.readdirSync(packDir)
        .filter((name) => name.endsWith('.tgz'))[0];
    if (!tarball) {
        throw new Error('npm pack produced no tarball');
    }

    // Install it into a throwaway project, then require it the way a
    // consumer would, so package.json "main" resolution is exercised too.
    const appDir = path.join(workDir, 'app');
    fs.mkdirSync(appDir);
    fs.writeFileSync(
        path.join(appDir, 'package.json'),
        JSON.stringify({name: 'tf-node-require-smoke', private: true})
    );
    run(
        'npm',
        [
            'install', '--no-save', '--no-package-lock', '--no-audit',
            '--no-fund', path.join(packDir, tarball)
        ],
        appDir
    );
    process.stdout.write(run(process.execPath, ['-e', PROBE], appDir));
} finally {
    fs.rmSync(workDir, {recursive: true, force: true});
}
