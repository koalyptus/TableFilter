var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
// var webpackDevConfig = require('./webpack.dev.config.js');
var path = require('path');
var Clean = require('clean-webpack-plugin');
// var StringReplacePlugin = require('string-replace-webpack-plugin');
// var fs = require('fs');
// var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

module.exports = {
    cache: true,
    entry: webpackConfig.entry,
    output: webpackConfig.output,
    resolve: webpackConfig.resolve,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                exclude: /tablefilter\/node_modules/,
                loader: 'isparta-loader'
            }/*, {
                test: path.join(__dirname, 'src'),
                loader: StringReplacePlugin.replace({
                    replacements: [{
                        pattern: /{VERSION}/ig,
                        replacement: function () {
                            return pkg.version;
                        }
                    }, {
                        pattern: /{AUTHOR}/ig,
                        replacement: function () {
                            return pkg.author.name;
                        }
                    }]
                })
            }*/
        ]
    },
    devtool: 'source-map',
    plugins: [
        new Clean(['dist']),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                isparta: {
                    embedSource: true,
                    noAutoWrap: true,
                    babel: {
                        compact: false,
                        presets: ['es2015'],
                        plugins: [['transform-es2015-classes', {loose: true}]]
                    }
                }
            }
        }),
        // new StringReplacePlugin()
    ]
    //.concat(webpackDevConfig.plugins)
};
