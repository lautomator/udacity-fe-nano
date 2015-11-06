module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // tasks

        // minify css (this plugin can also concatenate files)
        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'css/',
              src: ['*/css/*.css', '!*/css/*.min.css'],
              dest: 'build/',
              ext: '.min.css'
            }]
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['cssmin']);
};
