module.exports = function (grunt) {

    var webpack = require("webpack");
    // var webpackConfig = require("./webpack.config.js");
    var path = require("path");

    grunt.initConfig({

        "webpack-dev-server": {
            options: {
                webpack: webpack.dev,
                publicPath: "/src/"
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: "eval",
                    debug: true
                }
            }
        },

        webpack: {
            "dev": {
                entry: __dirname + '/src-es6/tablefilter.js',
                // entry: {
                //     tablefilter: __dirname + '/src-es6/tablefilter.js',
                //     colsVisibility: __dirname +
                //         '/src-es6/extensions/colsVisibility/colsVisibility.js'
                // },
                output: {
                    publicPath: "/src/",
                    path: __dirname + "/src",
                    filename: "tablefilter.js",
                    chunkFilename: "[name].js",
                    libraryTarget: 'umd'
                },
                resolve: {
                    extensions: ['', '.js']
                },
                module: {
                    loaders: [{
                        test: path.join(__dirname, 'src-es6'),
                        exclude: /node_modules/,
                        query: {
                            compact: false
                        },
                        loader: 'babel-loader'
                    }]
                },
                devtool: "sourcemap",
                debug: true
            },
            "build": {
                entry: __dirname + '/src-es6/tablefilter.js',
                // entry: {
                //     tablefilter: __dirname + '/src-es6/tablefilter.js',
                //     sortabletable: __dirname + '/libs/sortabletable.js'
                // },
                output: {
                    publicPath: "/dist/",
                    path: __dirname + "/dist",
                    filename: "tablefilter.js",
                    // chunkFilename: "[name]-[chunkhash].js",
                    chunkFilename: "[name].js",
                    libraryTarget: 'umd'
                },
                resolve: {
                    extensions: ['', '.js'],
                    alias: {
                        sortabletable: "../../../libs/sortabletable.js",
                        adapterSortabletable:
                            './extensions/sortabletable/adapterSortabletable'
                    }
                },
                // externals: {
                //     'sortabletable': "SortableTable"
                // },
                module: {
                    loaders: [{
                        test: path.join(__dirname, 'src-es6'),
                        exclude: /node_modules/,
                        query: {
                            compact: false
                        },
                        loader: 'babel-loader'
                    }]
                },
                plugins: [
                    // new webpack.DefinePlugin({
                    //     "process.env": {
                    //         // This has effect on the react lib size
                    //         "NODE_ENV": JSON.stringify("production")
                    //     }
                    // }),
                    // new webpack.optimize.CommonsChunkPlugin(
                    //     'main', 1, false),
                    // new webpack.IgnorePlugin(/adapterSortabletable$/),
                    // new webpack.optimize.CommonsChunkPlugin(
                    //     "commons.js",
                    //     ["1", "2"]),
                    new webpack.optimize.DedupePlugin()
                    // ,
                    // new webpack.optimize.UglifyJsPlugin()
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-webpack');

    // The development server (the recommended option for development)
    grunt.registerTask("default", ["webpack-dev-server:start"]);

    // Build and watch cycle (another option for development)
    // Advantage: No server required, can run app from filesystem
    // Disadvantage: Requests are not blocked until bundle is available,
    //               can serve an old app on too fast refresh
    grunt.registerTask("dev", ["webpack:dev"/*, "watch:app"*/]);

    // Production build
    grunt.registerTask("build", ["webpack:build"]);

};
