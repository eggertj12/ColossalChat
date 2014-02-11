'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    ccConfig: {
      app: '',
      build: 'dist'
    },

    pkg: grunt.file.readJSON('package.json'),

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
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     files: {
    //       'build/<%= pkg.name %>.min.js': ['js/app.js', 'js/*/*.js']
    //     }
    //   }
    // },

    useminPrepare: {
      html: ['index.html'],
      options: {
        dest: '<%= ccConfig.build %>'
      }
    },

    usemin: {
      html: ['<%= ccConfig.build %>/index.html'],
      css: ['<%= ccConfig.build %>/styles/styles.css'],
      options: {
        dirs: ['<%= ccConfig.build %>']
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
          dest: '<%= ccConfig.build %>'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= ccConfig.app %>',
          dest: '<%= ccConfig.build %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= ccConfig.build %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= ccConfig.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    }

  });

  // Load the plugin to provdie tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  // grunt.registerTask('jshint', ['jshint']);
  // grunt.registerTask('concat', ['concat']);
  // grunt.registerTask('uglify', ['uglify']);
  // grunt.registerTask('default', ['jshint', 'uglify']);
  grunt.registerTask('default', ['useminPrepare', 'jshint', 'concat', 'uglify', 'copy:dist', 'htmlmin', 'usemin']);

};