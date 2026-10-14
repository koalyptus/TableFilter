// Library outputs: ESM (#887), CJS (#888), UMD (#889); legacy layout
// (#890) copies the UMD bundle to the historic dist/tablefilter/ path.
// CommonJS because package.json has no "type": "module".
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

const srcDir = path.join(__dirname, 'src').replace(/\\/g, '/') + '/';

// Same {VERSION}/{AUTHOR} substitution as webpack.config.js
const replacePlaceholders = () => ({
    name: 'tablefilter-placeholders',
    transform(code, id) {
        if (!id.replace(/\\/g, '/').startsWith(srcDir)) {
            return null;
        }
        return code
            .replace(/{VERSION}/ig, pkg.version)
            .replace(/{AUTHOR}/ig, pkg.author.name);
    }
});

// Stage the Vite UMD bundle next to the webpack output without overwriting
// it: the published dist/tablefilter/tablefilter.js must stay the webpack
// flat-global build until consumers migrate to the window.TableFilter
// namespace. The directory's other assets (style/, chunks) are untouched.
// TODO(#965): point this copy at tablefilter.js and drop the .vite.js
// provisional name once tests/demos migrate.
const copyLegacyDist = () => ({
    name: 'tablefilter-legacy-dist',
    writeBundle(options) {
        if (options.format !== 'umd') {
            return;
        }
        const outDir = path.join(__dirname, 'dist');
        const legacyDir = path.join(outDir, 'tablefilter');
        fs.mkdirSync(legacyDir, {recursive: true});
        fs.copyFileSync(
            path.join(outDir, 'tablefilter.umd.js'),
            path.join(legacyDir, 'tablefilter.vite.js')
        );
    }
});

module.exports = {
    plugins: [replacePlaceholders(), copyLegacyDist()],
    build: {
        lib: {
            entry: path.join(__dirname, 'src/tablefilter.js'),
            // name is required for the UMD build, it sets window.TableFilter
            name: 'TableFilter',
            formats: ['es', 'cjs', 'umd'],
            fileName: (format) => {
                switch (format) {
                    case 'es':
                        return 'tablefilter.esm.js';
                    case 'cjs':
                        return 'tablefilter.cjs.js';
                    default:
                        return 'tablefilter.umd.js';
                }
            }
        },
        // dist/ also holds the webpack build output, do not wipe it
        emptyOutDir: false
    },
    server: {
        host: '0.0.0.0',
        port: 8080
    }
};
