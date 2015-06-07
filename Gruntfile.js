var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var fs = require('fs');
var path = require('path');
var testDir = 'test';
var testHost = 'http://localhost:8080/';

module.exports = function (grunt) {

    grunt.initConfig({

        jshint: {
            src: [
                'Gruntfile.js',
                'webpack.config.js',
                'src/**/*.js'
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
            dist: {
                src: ['**'],
                cwd: 'static/style',
                dest: 'dist/tablefilter/style',
                expand: true
            }
        },

        'webpack-dev-server': {
            options: {
                webpack: webpack.dev,
                publicPath: '/dist/'
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
            options: webpackConfig,
            build: webpackConfig.build,
            dev: webpackConfig.dev
        },

        watch: {
            app: {
                files: ['src/**/*'],
                tasks: ['dev'],
                options: {
                    spawn: false
                }
            }
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
                    cwd: 'src',
                    src: ['**/*.js'],
                    dest: 'dist/tablefilter'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('default',
        ['jshint', 'webpack:build', 'copy:dist', 'test']);

    // The development server (the recommended option for development)
    grunt.registerTask('server', ['webpack-dev-server:start']);


    grunt.registerTask('dev',
        ['jshint', 'webpack:dev', 'copy:dist', 'watch:app']);

    // Production build
    grunt.registerTask('build',
        ['jshint', 'webpack:build', 'copy:dist']);

    // Transpile with Babel
    grunt.registerTask('dev-modules', ['babel', 'copy:dist']);

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

    // Returns the list of test files from the test folder for qunit task
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

