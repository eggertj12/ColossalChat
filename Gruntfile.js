'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        ccConfig: {
            app: '',
            dist: 'dist',
            dev: 'dev'
        },

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dev: ['.tmp', 'dev/*'],
            dist: ['.tmp', 'dist']
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: [
                    'Gruntfile.js',
                    'js/**/*.js'
                ]
            }
        },

        // This is handled by usemin task

        // uglify: {
        //     options: {
        //         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //     },
        //     dist: {
        //         files: {
        //             'dist/<%= pkg.name %>.min.js': ['js/app.js', 'js/*/*.js']
        //         }
        //     }
        // },

        useminPrepare: {
            html: ['index.html'],
            options: {
                dest: '<%= ccConfig.dist %>'
            }
        },

        usemin: {
            html: ['<%= ccConfig.dist %>/index.html'],
            css: ['<%= ccConfig.dist %>/styles/styles.css'],
            options: {
                dirs: ['<%= ccConfig.dist %>']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= ccConfig.app %>',
                    src: ['*.html', 'views/*.html'],
                    dest: '<%= ccConfig.dist %>'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= ccConfig.app %>',
                    dest: '<%= ccConfig.dist %>',
                    src: [
                        'bower_components/**/*',
                        'images/{,*/}*.{gif,webp}',
                        'styles/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= ccConfig.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }]
            },
            devfull: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= ccConfig.app %>',
                    dest: '<%= ccConfig.dev %>',
                    src: [
                        'bower_components/**/*',
                        'styles/**/*',
                        'views/**/*',
                        'js/**/*',
                        'index.html'
                    ]
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= ccConfig.app %>',
                    dest: '<%= ccConfig.dev %>',
                    src: [
                        'bower_components/**/*',
                        'styles/**/*',
                        'views/**/*',
                        'js/**/*',
                        'index.html'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= ccConfig.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        watch: {
            scripts: {
                files: [
                    'js/**/*.js',
                    'views/**/*.html',
                    'styles/**/*.css'
                ],
                tasks: ['jshint', 'copy:dev'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    // Load the plugin to provdie tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    // grunt.registerTask('jshint', ['jshint']);
    // grunt.registerTask('concat', ['concat']);
    // grunt.registerTask('uglify', ['uglify']);
    // grunt.registerTask('default', ['jshint', 'uglify']);
    grunt.registerTask('dist', ['clean:dist', 'useminPrepare', 'jshint', 'concat', 'uglify', 'copy:dist', 'htmlmin', 'usemin']);
    grunt.registerTask('default', ['clean:dev', 'jshint', 'copy:devfull']);

};