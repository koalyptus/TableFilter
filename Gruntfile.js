module.exports = function (grunt) {

    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');
    var pkg = grunt.file.readJSON('package.json');
    var version = pkg.version;

    grunt.initConfig({

        jshint: {
            src: [
                'Gruntfile.js',
                'src-es6/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        qunit: {
            files: ['test/**/*.html']
        },

        copy: {
            build: {
                src: ['**'],
                cwd: 'static/style',
                dest: 'build/tablefilter',
                expand: true
            },
            dist: {
                src: ['**'],
                cwd: 'static/style',
                dest: 'dist/tablefilter',
                expand: true
            }
        },

        'webpack-dev-server': {
            options: {
                webpack: webpack.dev,
                publicPath: '/dev/'
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: 'eval',
                    debug: true
                }
            }
        },

        webpack: {
            dist: webpackConfig.dist,
            build: webpackConfig.build
            // 'dev': {
            //     entry: __dirname + '/src-es6/tablefilter.js',
            //     // entry: {
            //     //     tablefilter: __dirname + '/src-es6/tablefilter.js',
            //     //     colsVisibility: __dirname +
            //     //         '/src-es6/extensions/colsVisibility/colsVisibility.js'
            //     // },
            //     output: {
            //         publicPath: '/src/',
            //         path: __dirname + '/src',
            //         filename: 'tablefilter.js',
            //         chunkFilename: '[name].js',
            //         libraryTarget: 'umd'
            //     },
            //     resolve: {
            //         extensions: ['', '.js']
            //     },
            //     module: {
            //         loaders: [{
            //             test: path.join(__dirname, 'src-es6'),
            //             exclude: /node_modules/,
            //             query: {
            //                 compact: false
            //             },
            //             loader: 'babel-loader'
            //         }]
            //     },
            //     devtool: 'sourcemap',
            //     debug: true
            // },
        },

        babel: {
            options: {
                sourceMap: true,
                modules: 'amd',
                compact: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src-es6',
                    src: ['**/*.js'],
                    dest: 'dev/tablefilter'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-babel');

    // The development server (the recommended option for development)
    grunt.registerTask('dev-server', ['webpack-dev-server:start']);

    // Build and watch cycle (another option for development)
    // Advantage: No server required, can run app from filesystem
    // Disadvantage: Requests are not blocked until bundle is available,
    //               can serve an old app on too fast refresh
    grunt.registerTask('dev', ['jshint', 'webpack:build', 'copy:build'/*, 'watch:app'*/]);

    // Production build
    grunt.registerTask('dist', ['jshint', 'webpack:dist', 'copy:dist']);

    // Tests
    grunt.registerTask('test', ['qunit']);

    // Transpile with Babel
    grunt.registerTask('transpile', ['babel']);

};
