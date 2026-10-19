// Library outputs: ESM (#887), CJS (#888), UMD (#889); legacy layout
// (#890) copies the UMD bundle to the historic dist/tablefilter/ path.
// CommonJS because package.json has no "type": "module".
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

const srcDir = path.join(__dirname, 'src').replace(/\\/g, '/') + '/';

// Inject static imports of all extensions into the Vite bundle so they
// are available without a bundler-specific loader (#991/#965).
// TODO(#965): remove once Vite lazy/chunked extension loading replaces this
const injectExtImports = () => ({
    name: 'inject-ext-imports',
    enforce: 'pre',
    transform(code, id) {
        if (!id.endsWith('tablefilter.js')) {
            return null;
        }
        const imports = [
            'import __Sort from "./extensions/sort/sort";',
            'import __ColsVisibility from ' +
                '"./extensions/colsVisibility/colsVisibility";',
            'import __ColOps from "./extensions/colOps/colOps";',
            'import __AdvancedGrid from ' +
                '"./extensions/advancedGrid/advancedGrid";',
            'import __FiltersVisibility from ' +
                '"./extensions/filtersVisibility/filtersVisibility";'
        ].join('\n');
        let registry = '\nconst EXTENSIONS = {';
        registry += ' sort: __Sort, ';
        registry += 'colsVisibility: __ColsVisibility, ';
        registry += 'colOps: __ColOps, ';
        registry += 'advancedGrid: __AdvancedGrid, ';
        registry += 'filtersVisibility: __FiltersVisibility };';
        return imports + registry + code;
    }
});

// The sort extension relies on the vendored `SortableTable` script, which
// webpack loaded globally through `script-loader!sortabletable`. That loader
// is webpack-specific, so for the Vite bundle the legacy script is inlined as
// raw text and evaluated in the global scope (#965).
// TODO(#965): remove once the sort extension imports SortableTable directly.
const injectSortableTable = () => ({
    name: 'inject-sortabletable',
    enforce: 'pre',
    transform(code, id) {
        if (!id.endsWith('/extensions/sort/sort.js')) {
            return null;
        }
        const shim = 'import __sortableTableSrc from ' +
            '"../../../libs/sortabletable.js?raw";\n' +
            'if (typeof SortableTable === "undefined") {\n' +
            '    (0, eval)(__sortableTableSrc);\n' +
            '}\n';
        return shim + code;
    }
});

// Flatten the UMD global so `window.TableFilter` is the class itself
// (flat-global compat), not `{ TableFilter: [class] }` (#965).
const flattenUmdGlobal = () => ({
    name: 'flatten-umd-global',
    generateBundle(options, bundle) {
        if (options.format !== 'umd') {
            return;
        }
        for (const fileName in bundle) {
            const chunk = bundle[fileName];
            if (chunk.type === 'chunk') {
                chunk.code += '\nif(typeof globalThis !== "undefined" ' +
                    '&& globalThis.TableFilter ' +
                    '&& globalThis.TableFilter.TableFilter) { ' +
                    'globalThis.TableFilter = ' +
                    'globalThis.TableFilter.TableFilter; }';
            }
        }
    }
});

// Serve dist/ files as raw static assets (no Vite transform) during dev,
// so the pre-built UMD bundle (which may contain import()) is not parsed
// by Vite's dev server (#965).
const serveDistRaw = () => ({
    name: 'serve-dist-raw',
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            const url = req.url.split('?')[0];
            if (url.startsWith('/dist/')) {
                const filePath = path.join(__dirname, url);
                if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                    const ext = path.extname(filePath);
                    if (ext === '.js') {
                        res.setHeader('Content-Type', 'application/javascript');
                    } else if (ext === '.css') {
                        res.setHeader('Content-Type', 'text/css');
                    } else if (ext === '.map') {
                        res.setHeader('Content-Type', 'application/json');
                    }
                    fs.createReadStream(filePath).pipe(res);
                    return;
                }
            }
            next();
        });
    }
});

// Same {VERSION}/{AUTHOR} substitution as webpack.config.js
const replacePlaceholders = () => ({
    name: 'tablefilter-placeholders',
    transform(code, id) {
        if (!id.replace(/\\\\/g, '/').startsWith(srcDir)) {
            return null;
        }
        return code
            .replace(/{VERSION}/ig, pkg.version)
            .replace(/{AUTHOR}/ig, pkg.author.name);
    }
});

// Copy the Vite UMD bundle to the historic dist/tablefilter/tablefilter.js
// path so consumers (tests, demos) load the Vite-built bundle.
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
            path.join(legacyDir, 'tablefilter.js')
        );
    }
});

module.exports = {
    plugins: [
        replacePlaceholders(),
        copyLegacyDist(),
        flattenUmdGlobal(),
        injectExtImports(),
        injectSortableTable(),
        serveDistRaw()
    ],
    build: {
        lib: {
            entry: path.join(__dirname, 'src/tablefilter.js'),
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
        rollupOptions: {
            output: {
                exports: 'named'
            }
        },
        // Keep class names: the feature registry keys off `Class.name`
        // (see instantiateFeatures), so mangling breaks every feature (#965).
        minify: false,
        emptyOutDir: false
    },
    server: {
        host: '0.0.0.0',
        port: 8080
    }
};