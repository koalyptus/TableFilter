module.exports = function (grunt) {
    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        version: '<%= pkg.version %>',
        dist_folder: 'dist/',
        source_folder: 'src/',

        meta: {
            src: [
                '<%= source_folder %>string.js',
                '<%= source_folder %>dom.js',
                '<%= source_folder %>event.js',
                '<%= source_folder %>tablefilter_all.js'
            ]
        },

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

        concat: {
            js: {
                files: [{
                    src: ['<%= meta.src %>'],
                    dest: '<%= dist_folder %>tablefilter_all.js'
                }]
            },
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
                src: ['<%= concat.js.files[0].dest %>'],
                dest: '<%= concat.js.files[0].dest %>'
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
                    //{ src: ['<%= source_folder %>filtergrid.css'], dest: '<%= dist_folder %>filtergrid-uncompressed.css' },
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

    // This is the default task being executed if Grunt
    // is called without any further parameter.
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'copy']);

};