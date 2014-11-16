module.exports = function (grunt) {
    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        version: '<%= pkg.version %>',
        dist_folder: 'dist/',
        source_folder: 'src/',

        // A list of files, which will be syntax-checked by JSHint
        jshint: {
            src: ['Gruntfile.js', 'src/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        watch: {
            files: [
                'src-es6/**/*.js',
                'src/**/*.js',
                'src/**/*.css',
                'src/**/*.html'
            ],
            tasks: ['dev']
        },

        qunit: {
            files: ['test/**/*.html']
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src/',
                    'paths': {
                        'tf': '.'
                    },
                    include: ['../libs/almond/almond', 'core'],
                    out: 'dist/tablefilter.js',
                    wrap: {
                        startFile: "src/start.frag",
                        endFile: "src/end.frag"
                    }/*,
                    optimize: 'uglify2',
                    preserveLicenseComments: false,
                    generateSourceMaps: true*/
                }
            }
        },

        concat: {
            /*js: {
                files: [{
                    src: ['<%= source_folder %>core.js'],
                    dest: '<%= dist_folder %>core.js'
                }]
            },*/
            css: {
                files: [{
                    src: ['<%= source_folder %>filtergrid.css'],
                    dest: '<%= dist_folder %>filtergrid.css'
                }]
            }
        },

        // and minified (source and destination files)
        uglify: {

            options: {
                banner: '/*------------------------------------------------------------------------ \n' +
                        '\t- TableFilter v<%= version %> by Max Guglielmi \n' +
                        '\t- build date: <%= grunt.template.today() %> \n' +
                        '\t- http://tablefilter.free.fr \n' +
                        '\t- Copyright (c) 2014, Licensed under the MIT License \n' +
                        '------------------------------------------------------------------------*/ \n'
            },

            js: {
                src: ['<%= dist_folder %>tablefilter.js'],
                dest: '<%= dist_folder %>tablefilter.js'
            }
        },

        cssmin: {
            combine: {
                options: {
                    banner: '/*------------------------------------------------------------------------ \n' +
                            '\t- TableFilter stylesheet by Max Guglielmi \n' +
                            '\t- (build date: <%= grunt.template.today() %>) \n' +
                            '\t- Edit below for your projects\' needs  \n' +
                            '------------------------------------------------------------------------*/ \n'
                },
                files: {
                    '<%= concat.css.files[0].dest %>': ['<%= concat.css.files[0].dest %>']
                }
            }
        },

        copy: {
            main: {
                files: [
                    { src: ['**'], cwd: '<%= source_folder %>TF_Modules/', dest: '<%= dist_folder %>TF_Modules/', expand: true },
                    { src: ['**'], cwd: '<%= source_folder %>TF_Themes/', dest: '<%= dist_folder %>TF_Themes/', expand: true }
                ]
            }
        },

        '6to5': {
            options: {
                sourceMap: true,
                modules: 'amd'
            },
            // dist: {
            //     files: {
            //         'es6/modules/*.js': '<%= source_folder %>modules/'
            //     }
            // }
            build:{
                files: [{
                    expand: true,
                    cwd: 'src-es6',
                    src: ['**/*.js'],
                    dest: '<%= source_folder %>'
                }]
            }
        }
    });

    // Load the plugins that provide the tasks we specified in package.json.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-6to5');

    // This is the default task being executed if Grunt
    // is called without any further parameter.
    grunt.registerTask('default', ['jshint', '6to5', 'requirejs', 'concat', 'uglify', 'cssmin', 'copy', 'qunit']);
    grunt.registerTask('dev', ['jshint', '6to5', 'concat', 'cssmin', 'copy']);
    grunt.registerTask('toes5', ['6to5']);
    grunt.registerTask('test', ['qunit']);
};