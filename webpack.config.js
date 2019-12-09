const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

module.exports = {
    mode: 'production',
    cache: true,
    entry: {
        'main': path.join(__dirname, '/src/tablefilter.js')
    },
    output: {
        path: path.join(__dirname, '/dist/tablefilter'),
        filename: 'tablefilter.js',
        chunkFilename: 'tf-[name]-[chunkhash].js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            sortabletable: '../../../libs/sortabletable.js'
        }
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, 'src'),
                exclude: /tablefilter\/node_modules/,
                options: {
                    compact: false,
                    presets: ['@babel/env']
                },
                loader: 'babel-loader'
            }, {
                test: path.join(__dirname, 'src'),
                loader: StringReplacePlugin.replace({
                    replacements: [{
                        pattern: /{VERSION}/ig,
                        replacement: function (/*match, p1, offset, string*/) {
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
    // devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // sourceMap: true,
                uglifyOptions: {
                    beautify: false,
                    warnings: false,
                    comments: false,
                    keep_fnames: true
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'dist')]
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new StringReplacePlugin(),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000
        }),
        new webpack.BannerPlugin({
            banner: '/** \n' +
            ' *\t '+pkg.name+' v'+pkg.version+' by '+pkg.author.name+'\n' +
            ' *\t build date: '+ new Date().toISOString() +' \n' +
            ' *\t MIT License  \n' +
            ' */ \n',
            raw: true
        })
    ]
};
