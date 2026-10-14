// Library outputs: ESM (#887), CJS (#888), UMD (#889); legacy layout
// follows in #890.
// CommonJS because package.json has no "type": "module".
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

module.exports = {
    plugins: [replacePlaceholders()],
    build: {
        lib: {
            entry: path.join(__dirname, 'src/tablefilter.js'),
            // name is required for the UMD build, it sets window.TableFilter
            name: 'TableFilter',
            formats: ['es', 'cjs', 'umd'],
            fileName: (format) => format === 'es' ?
                'tablefilter.esm.js' : format === 'cjs' ?
                    'tablefilter.cjs.js' : 'tablefilter.umd.js'
        },
        // dist/ also holds the webpack build output, do not wipe it
        emptyOutDir: false
    },
    server: {
        host: '0.0.0.0',
        port: 8080
    }
};
