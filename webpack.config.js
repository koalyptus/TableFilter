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
        publicPath: '/dist/tablefilter/',
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
        loaders: [
            {
                test: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                query: {
                    compact: false
                },
                loader: 'babel-loader'
            },
            {
                test: path.join(__dirname, 'src'),
                loader: StringReplacePlugin.replace({
                    replacements: [{
                        pattern: /{VERSION}/ig,
                        replacement: function (/*match, p1, offset, string*/) {
                            return pkg.version;
                        }
                    }]
                })
            }
        ]
    },
    build: {
        plugins: [
            new Clean(['dist']),
            new webpack.optimize.DedupePlugin(),
            new StringReplacePlugin(),
            new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.BannerPlugin(
                '/** \n' +
                ' *\t '+ pkg.name +' v'+ pkg.version +' by Max Guglielmi \n' +
                ' *\t build date: '+ new Date().toISOString() +' \n' +
                ' *\t MIT License  \n' +
                ' */ \n',
                { raw: true }
            )
        ]
    },
    dev: {
        devtool: 'sourcemap',
        debug: true,
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new StringReplacePlugin()
        ]
    }
};
