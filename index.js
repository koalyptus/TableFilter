'use strict';

// Published CommonJS entry (#1033): the Vite CJS bundle avoids the legacy
// webpack UMD wrapper that evaluated `window` as its global root and threw
// "ReferenceError: window is not defined" in Node (#1030).
const CJS_BUNDLE = './dist/tablefilter.cjs.js';
try {
    module.exports = require(CJS_BUNDLE).TableFilter;
} catch (err) {
    if (err.code === 'MODULE_NOT_FOUND' && err.message.includes(CJS_BUNDLE)) {
        throw new Error(
            'tablefilter: CommonJS bundle not built; run ' +
            '`npm run build:vite` before requiring ' +
            '(or install the published tarball)'
        );
    }
    throw err;
}
