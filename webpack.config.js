var path = require("path");
var webpack = require("webpack");

module.exports = {
    dev: {
        entry: __dirname + '/src-es6/tablefilter.js',
        output: {
            publicPath: "src/",
            path: __dirname + "/src",
            filename: "[name].js",
            chunkFilename: "[name].js",
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['', '.js']
        },
        module: {
            loaders: [{
                test: path.join(__dirname, 'src-es6'),
                loader: 'babel-loader'
            }]
        }
    },
    build: {
        entry: __dirname + '/src/tablefilter.js',
        output: {
            publicPath: "dist/",
            path: __dirname + "/dist",
            filename: "[name].js",
            chunkFilename: "[name].js",
            libraryTarget: 'this'
        },
        resolve: {
            extensions: ['', '.js']
        }
    }
};
