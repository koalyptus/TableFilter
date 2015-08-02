module.exports = function (grunt) {

    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');
    var fs = require('fs');
    var path = require('path');
    var testDir = 'test';
    var testHost = 'http://localhost:8000/';
    var pkg = grunt.file.readJSON('package.json');

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

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        },

        copy: {
            dist: {
                src: ['**'],
                cwd: 'static/style',
                dest: 'dist/tablefilter/style',
                expand: true
            },
            templates: {
                src: ['**'],
                cwd: 'static/templates',
                dest: 'demos',
                expand: true
            },
            assets: {
                src: ['**'],
                cwd: 'static/demos-assets',
                dest: 'demos/assets',
                expand: true
            },
            starter: {
                src: ['demos/starter.html'],
                dest: 'dist/starter.html'
            }
        },

        'string-replace': {
            demos: {
                files: { 'demos/': 'demos/*.html' },
                options: {
                    replacements: [
                        {
                            pattern: /{NAME}/ig,
                            replacement: pkg.name
                        },{
                            pattern: /{VERSION}/ig,
                            replacement: pkg.version
                        },{
                            pattern: /{EZEDITTABLE_LINK}/ig,
                            replacement: '<a href="http://edittable.free.fr/' +
                                'zip.php?f=ezEditTable.zip&amp;p=1"' +
                                'target="_blank" title="ezEditTable is a ' +
                                'javascript code aimed at enhancing regular ' +
                                'HTML tables by adding features such as ' +
                                'inline editing components, advanced ' +
                                'selection and keyboard navigation ' +
                                '- Developed by Max Guglielmi">ezEditTable</a>'
                        },{
                            pattern: /<!-- @import (.*?) -->/ig,
                            replacement: function (match, p1) {
                                return grunt.file.read('static/' + p1);
                            }
                        }
                    ]
                }
            }
        },

        clean: ['demos/starter.html'],

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
                files: ['src/**/*', 'static/style/**/*'],
                tasks: ['dev'],
                options: {
                    spawn: false
                }
            },
            templates: {
                files: ['static/templates/**/*', 'static/partials/**/*'],
                tasks: ['build-demos'],
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
        },

        esdoc : {
            dist : {
                options: {
                    source: 'src',
                    destination: 'doc',
                    title: pkg.name + ' v' + pkg.version
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-esdoc');

    grunt.registerTask('default', ['build', 'test', 'build-demos', 'esdoc']);

    // Development server
    grunt.registerTask('server', ['webpack-dev-server:start']);

    // Dev dev/build/watch cycle
    grunt.registerTask('dev',
        ['jshint', 'webpack:dev', 'copy:dist', 'watch:app']);

    // Production build
    grunt.registerTask('build', ['jshint', 'webpack:build', 'copy:dist']);

    // Build demos
    grunt.registerTask('dev-demos', ['build-demos', 'watch:templates']);
    grunt.registerTask('build-demos', ['copy:templates', 'copy:assets',
        'string-replace:demos', 'copy:starter', 'clean']);

    // Transpile with Babel
    grunt.registerTask('dev-modules', ['babel', 'copy:dist']);

    // Tests
    grunt.registerTask('test', ['jshint', 'connect', 'qunit:all']);

    // Custom task running QUnit tests for specified files.
    // Usage example: grunt test-only:test.html,test-help.html
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

            grunt.task.run('connect');
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
