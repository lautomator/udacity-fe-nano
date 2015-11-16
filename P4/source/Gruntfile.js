module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // tasks

        // minify css (this plugin can also concatenate files)
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },

        // minify html
        htmlmin: {
            dist: {
                options: {
                    removeComments: false,
                    collapseWhitespace: true
                },
                files: {
                    // dest, source
                    '../production/index.html': 'index.html',
                    // 'dist/contact.html': 'src/contact.html' can add more files
                }
            }
        },

        // copy to production
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['css/*.min.css'], dest: '../production/css/', filter: 'isFile'},
            ],
          },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['cssmin', 'htmlmin', 'copy']);
};
