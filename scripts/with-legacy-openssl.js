'use strict';

// webpack 4 hashes with md4, which OpenSSL 3 disables by default, so the
// legacy provider is required on Node runtimes that link OpenSSL 3.
// Usage: node scripts/with-legacy-openssl.js <command> [...args]

const {spawnSync} = require('child_process');

const LEGACY_PROVIDER = '--openssl-legacy-provider';
const OPENSSL_MAJOR = parseInt(process.versions.openssl, 10);

const argv = process.argv.slice(2);
const command = argv[0];
const args = argv.slice(1);

const env = Object.assign({}, process.env);
if (OPENSSL_MAJOR >= 3 &&
    (env.NODE_OPTIONS || '').indexOf(LEGACY_PROVIDER) === -1) {
    env.NODE_OPTIONS =
        `${env.NODE_OPTIONS || ''} ${LEGACY_PROVIDER}`.trim();
}

const result = spawnSync(command, args, {
    stdio: 'inherit',
    env,
    shell: process.platform === 'win32'
});

if (result.error) {
    console.error(result.error.message);
}

process.exit(result.status === null ? 1 : result.status);
