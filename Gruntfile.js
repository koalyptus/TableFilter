module.exports = function (grunt) {

    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');
    var fs = require('fs');
    var path = require('path');
    // var pkg = grunt.file.readJSON('package.json');
    // var version = pkg.version;
    var testDir = 'test';
    var testHost = 'http://localhost:8080/';

    grunt.initConfig({

        jshint: {
            src: [
                'Gruntfile.js',
                'webpack.config.js',
                'src-es6/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        qunit: {
            // files: ['test/**/*.html'],
            // urls: ['http://localhost:9000/test/test.html']
            all: {
                options: {
                    urls: getTestFiles(testDir, testHost)
                }
            },
            only: {
                options: {
                    urls: []
                }
            }
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
                publicPath: '/build/'
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
            //     //     '/src-es6/extensions/colsVisibility/colsVisibility.js'
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
                    dest: 'build/tablefilter'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-babel');


    grunt.registerTask('default',
        ['jshint', 'webpack:dist', 'copy:dist', 'test']);

    // The development server (the recommended option for development)
    grunt.registerTask('server', ['webpack-dev-server:start']);


    grunt.registerTask('dev', ['jshint', 'webpack:build', 'copy:build']);

    // Production build
    grunt.registerTask('dist',
        ['jshint', 'webpack:dist', 'copy:dist']);

    // Transpile with Babel
    grunt.registerTask('dev-modules', ['babel', 'copy:build']);

    // Tests
    grunt.registerTask('test', ['qunit:all']);

    // Custom task running QUnit tests for specified files.
    // Usage: grunt test-only:test.html,test-help.html
    grunt.registerTask('test-only',
        'A task that runs only specified tests.',
        function(tests) {
            if(!tests) {
                return;
            }
            tests = tests.split(',');
            var res = [];

            tests.forEach(function(itm) {
                var filePath = path.resolve(testDir, itm);
                var parts = filePath.split(path.sep);
                res.push(buildTestUrl(testHost, testDir, parts));
            });

            grunt.config('qunit.only.options.urls', res);
            grunt.task.run('qunit:only');
    });

    function isTestFile(pth) {
        var allowedExts = ['.html', '.htm'];
        for(var i=0, len=allowedExts.length; i<len; i++){
            var ext = allowedExts[i];
            if(pth.indexOf(ext) !== -1){
                return true;
            }
        }
        return false;
    }

    function buildTestUrl(host, testDir, parts) {
        var idx = parts.indexOf(testDir);
        var fileIdx = parts.length;
        var relParts = parts.slice(idx, fileIdx);
        return host.concat(relParts.join('/'));
    }

    // Returns the list of test files from the test folder for QUnit
    function getTestFiles(testDir, host) {

        var getFiles = function(dir, host) {
            var res = [];
            var items = fs.readdirSync(dir);

            items.forEach(function(itm){
                var fileOrDir = path.resolve(dir, itm);
                if(isTestFile(fileOrDir)) {
                    var parts = fileOrDir.split(path.sep);
                    res.push(buildTestUrl(host, testDir, parts));
                } else {
                    if(fs.lstatSync(fileOrDir).isDirectory()) {
                        res = res.concat(getFiles(fileOrDir, host));
                    }
                }
            });

            return res;
        };

        return getFiles(testDir, host);
    }

};

