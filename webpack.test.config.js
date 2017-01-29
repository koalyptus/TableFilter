var webpackConfig = require('./webpack.config.js');
var path = require('path');
var Clean = require('clean-webpack-plugin');
var StringReplacePlugin = require('string-replace-webpack-plugin');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

module.exports = {
    cache: true,
    entry: webpackConfig.entry,
    output: webpackConfig.output,
    resolve: webpackConfig.resolve,
    // isparta: {
    //     embedSource: true,
    //     noAutoWrap: true,
    //     babel: {
    //         compact: false,
    //         presets: ['es2015'],
    //         plugins: [['transform-es2015-classes', {loose: true}]]
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                exclude: /tablefilter\/node_modules/,
                loader: 'isparta-loader',
                options: {
                    embedSource: true,
                    noAutoWrap: true,
                    babel: {
                        compact: false,
                        presets: ['es2015'],
                        plugins: [['transform-es2015-classes', {loose: true}]]
                    }
                }
            },
            {
                test: path.join(__dirname, 'src'),
                loader: StringReplacePlugin.replace({
                    replacements: [{
                        pattern: /{VERSION}/ig,
                        replacement: function () {
                            return pkg.version;
                        }
                    },{
                        pattern: /{AUTHOR}/ig,
                        replacement: function () {
                            return pkg.author.name;
                        }
                    }]
                })
            }
        ]
    },
    devtool: 'sourcemap',
    plugins: [
        new Clean(['dist']),

    ].concat(webpackConfig.dev.plugins)
};
