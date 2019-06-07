module.exports = function (grunt) {
    var fs = require('fs');
    var path = require('path');
    var testDir = 'test';
    var testHost = 'http://localhost:8000/';
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({

        qunit: {
            options: {
                '--web-security': 'no',
                coverage: {
                    disposeCollector: true,
                    src: ['dist/tablefilter/*.js'],
                    instrumentedFiles: 'report/temp/',
                    htmlReport: 'report/coverage',
                    coberturaReport: 'report/',
                    lcovReport: 'report/',
                    jsonReport: 'report',
                    linesThresholdPct: 80
                }
            },
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
                src: [
                    '**',
                    '!**/*.styl',
                    '!**/extensions/**',
                    '!**/mixins/**'
                ],
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
                        }, {
                            pattern: /{VERSION}/ig,
                            replacement: pkg.version
                        }, {
                            pattern: /{EZEDITTABLE_LINK}/ig,
                            replacement: '<a href="http://edittable.free.fr/' +
                            'zip.php?f=ezEditTable.zip&amp;p=1"' +
                            'target="_blank" title="ezEditTable is a ' +
                            'javascript code aimed at enhancing regular ' +
                            'HTML tables by adding features such as ' +
                            'inline editing components, advanced ' +
                            'selection and keyboard navigation ' +
                            '- Developed by ' + pkg.author.name + '">' +
                            'ezEditTable</a>'
                        }, {
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

        // temporary shell commands while decommissioning grunt
        shell: {
            eslint: {
                command: 'npm run lint'
            },
            esdoc: {
                command: 'npm run esdoc'
            },
            build: {
                command: 'npm run build'
            },
            dev: {
                command: 'npm run dev'
            },
            test: {
                command: 'npm run build:test'
            },
            'build-css': {
                command: 'npm run build:css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-qunit-istanbul');

    grunt.registerTask('eslint', ['shell:eslint']);
    grunt.registerTask('esdoc', ['shell:esdoc']);

    grunt.registerTask('default', ['test', 'build', 'build-demos']);

    // Dev dev/build/watch cycle
    grunt.registerTask('dev',
        ['eslint', 'shell:dev', 'copy:dist', 'shell:build-css', 'watch:app']);

    // Production build
    grunt.registerTask('build',
        ['eslint', 'shell:build', 'copy:dist', 'shell:build-css']);

    // Build demos
    grunt.registerTask('dev-demos', ['build-demos', 'watch:templates']);
    grunt.registerTask('build-demos', ['copy:templates', 'copy:assets',
        'string-replace:demos', 'copy:starter', 'clean']);

    // Build tests
    grunt.registerTask('build-test',
        ['eslint', 'shell:test', 'copy:dist', 'shell:build-css']);

    // Tests with coverage
    grunt.registerTask('test', ['build-test', 'connect', 'qunit:all']);

    // Build all for deployment from travis
    grunt.registerTask('build-all', 'Prepare for deployment', [
        'build', 'build-demos', 'esdoc'
    ]);

    // Custom task running QUnit tests for specified files.
    // Usage example: grunt test-only:test.html,test-help.html
    grunt.registerTask('test-only',
        'A task that runs only specified tests.',
        function (tests) {
            if (!tests) {
                return;
            }
            tests = tests.split(',');
            var res = [];

            tests.forEach(function (itm) {
                var filePath = path.resolve(testDir, itm);
                var parts = filePath.split(path.sep);
                res.push(buildTestUrl(testHost, testDir, parts));
            });

            grunt.task.run('connect');
            grunt.config('qunit.only.options.urls', res);
            grunt.task.run('qunit:only');
        }
    );

    function isTestFile(pth) {
        var allowedExts = ['.html', '.htm'];
        for (var i = 0, len = allowedExts.length; i < len; i++) {
            var ext = allowedExts[i];
            if (pth.indexOf(ext) !== -1) {
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
        var getFiles = function (dir, host) {
            var res = [];
            var items = fs.readdirSync(dir);

            items.forEach(function (itm) {
                var fileOrDir = path.resolve(dir, itm);
                if (isTestFile(fileOrDir)) {
                    var parts = fileOrDir.split(path.sep);
                    res.push(buildTestUrl(host, testDir, parts));
                } else {
                    if (fs.lstatSync(fileOrDir).isDirectory()) {
                        res = res.concat(getFiles(fileOrDir, host));
                    }
                }
            });

            return res;
        };

        return getFiles(testDir, host);
    }
};
