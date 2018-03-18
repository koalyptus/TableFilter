const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
    mode: 'development',
    cache: true,
    entry: webpackConfig.entry,
    output: webpackConfig.output,
    resolve: webpackConfig.resolve,
    module: webpackConfig.module,
    devtool: 'source-map',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new StringReplacePlugin()
    ],
    devServer: {
        port: 8080,
        host: '0.0.0.0',
        publicPath: '/dist',
        hot: true
    }
};
