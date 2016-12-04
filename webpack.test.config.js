var webpack = require('webpack');
var path = require('path');
var Clean = require('clean-webpack-plugin');
var StringReplacePlugin = require('string-replace-webpack-plugin');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

module.exports = {
    cache: true,
    entry: {
        'main': path.join(__dirname, '/src/tablefilter.js')
    },
    output: {
        path: path.join(__dirname, '/dist/tablefilter'),
        filename: 'tablefilter.js',
        // chunkFilename: '[name]-[chunkhash].js',
        chunkFilename: 'tf-[name].js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {
            sortabletable: '../../../libs/sortabletable.js'
        }
    },
    module: {
        preLoaders: [
            {
                // test: path.join(__dirname, 'src'),
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                exclude: /tablefilter\/node_modules/,
                query: {
                    compact: false,
                    presets: ['es2015'],
                    plugins: [['transform-es2015-classes', {loose: true}]]
                },
                loader: 'babel-istanbul-loader'
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
    test: {
        devtool: 'sourcemap',
        debug: true,
        plugins: [
            new Clean(['dist']),
            new webpack.optimize.DedupePlugin(),
            new StringReplacePlugin()
        ]
    }
};
