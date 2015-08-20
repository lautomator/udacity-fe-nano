module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // tasks

        // concatenate files
        // concat: {
        //     dist: {
        //         src: [
        //             'libs/*.js', // All JS in the libs folder
        //             // 'js/global.js'  // This specific file
        //         ],
        //         dest: 'build/production.js',
        //     }
        // },

        // optimize images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/'
                }]
            }
        },

        // grunt automatically when there are changes to files (optional)
        // 'grunt watch' in the command line to initiate
        // watch: {
        //     scripts: {
        //         files: ['libs/*.js', 'images/*.jpg'],
        //         tasks: ['concat', 'uglify'],
        //         options: {
        //             spawn: false,
        //         },
        //     }
        // },
        // rename the long image files
        'name-changer': {
          options: {
            reference: 'build/',
            directory: ['img/*.png', 'img/*.jpg', 'img/*.gif'],
            lettercase: 'lowercase',
            spaces:'-'
          },
        },

        // minify css (this plugin can also concatenate files)
        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'css/',
              src: ['*.css', '!*.min.css'],
              dest: 'build/',
              ext: '.min.css'
            }]
          }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    // grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-name-changer');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    // grunt.registerTask('default', ['concat']);
    grunt.registerTask('default', ['cssmin', 'imagemin', 'name-changer']);

};
