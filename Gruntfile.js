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
                '-W069': true,  // ['xxx'] is better written in dot notation
                '-W107': true,  // Script URL
                '-W061': true,  // Eval can be harmful
                '-W041': true,
                // options here to override JSHint defaults
                globals: {
                    console: true/*,
                    module: true,
                    document: true*/
                }
            }
        },

        watch: {
            files: [
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
                    include: ['../libs/almond/almond','core'],
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
                    //{ src: ['<%= source_folder %>tablefilter_all.js'], dest: '<%= dist_folder %>tablefilter_all-uncompressed.js' },
                    //{ src: ['<%= source_folder %>tablefilter.js'], dest: '<%= dist_folder %>tablefilter-uncompressed.js' },
                    // { src: ['<%= source_folder %>filtergrid.css'], dest: '<%= dist_folder %>filtergrid-uncompressed.css' },
                    // { src: ['<%= source_folder %>tf-main.js'], dest: '<%= dist_folder %>tf-main.js' },
                    // { src: ['<%= source_folder %>string.js'], dest: '<%= dist_folder %>string.js' },
                    // { src: ['<%= source_folder %>array.js'], dest: '<%= dist_folder %>array.js' },
                    // { src: ['<%= source_folder %>cookie.js'], dest: '<%= dist_folder %>cookie.js' },
                    // { src: ['<%= source_folder %>date.js'], dest: '<%= dist_folder %>date.js' },
                    // { src: ['<%= source_folder %>dom.js'], dest: '<%= dist_folder %>dom.js' },
                    // { src: ['<%= source_folder %>event.js'], dest: '<%= dist_folder %>event.js' },
                    // { src: ['<%= source_folder %>types.js'], dest: '<%= dist_folder %>types.js' },
                    // { src: ['**'], cwd: '<%= source_folder %>modules/', dest: '<%= dist_folder %>modules/', expand: true },
                    // { src: ['<%= source_folder %>/*.js'], dest: '<%= dist_folder %>', flatten: true, expand: false },
                    // { src: ['libs/requirejs/require.js'], dest: '<%= dist_folder %>/libs/require.js' },
                    { src: ['**'], cwd: '<%= source_folder %>TF_Modules/', dest: '<%= dist_folder %>TF_Modules/', expand: true },
                    { src: ['**'], cwd: '<%= source_folder %>TF_Themes/', dest: '<%= dist_folder %>TF_Themes/', expand: true }
                ]
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

    // This is the default task being executed if Grunt
    // is called without any further parameter.
    grunt.registerTask('default', ['jshint', 'requirejs', 'concat', 'uglify', 'cssmin', 'copy', 'qunit']);
    grunt.registerTask('dev', ['jshint', 'concat', 'cssmin', 'copy']);
    grunt.registerTask('test', ['qunit']);
};