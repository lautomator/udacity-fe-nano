module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // tasks

        // minify css (this plugin can also concatenate files)
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'css',
                        ext: '.min.css'
                    },
                    {
                        expand: true,
                        cwd: 'views/css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'views/css',
                        ext: '.min.css'
                    }
                ]
            }
        },

        // minify html
        htmlmin: {
            dist: {
                options: {
                    removeComments: false,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true,
                },
                files: {
                    // dest, source
                    '../production/index.html': 'index.html',
                    '../production/views/pizza.html': 'views/pizza.html',
                }
            }
        },

        // copy to production
        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['css/*.min.css'],
                        dest: '../production/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        src: ['views/css/*.min.css'],
                        dest: '../production',
                        filter: 'isFile'
                    }
                ],
            },
        },

        // minify js
        uglify: {
            my_target: {
                files: {
                    '../production/js/perfmatters.min.js': ['js/perfmatters.js'],
                    '../production/js/main.min.js': ['js/main.js'],
                    '../production/views/js/main.min.js': ['views/js/main.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['cssmin', 'htmlmin', 'copy', 'uglify']);
};
