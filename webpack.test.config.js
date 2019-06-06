const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
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
            }
        ]
        // TODO: re-instate StringReplacePlugin, currently failing
        // in conjunction with 'isparta-loader'
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'dist')]
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                isparta: {
                    embedSource: true,
                    noAutoWrap: true,
                    babel: {
                        compact: false,
                        presets: ['env'],
                        plugins: [['transform-es2015-classes', {loose: true}]]
                    }
                }
            }
        })
    ]
};
