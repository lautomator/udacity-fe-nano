module.exports = function(grunt) {

    var mozjpeg = require('imagemin-mozjpeg'),
        pngcrush = require('imagemin-pngcrush');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // tasks

        // minify css
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'source/css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'source/css',
                        ext: '.min.css'
                    },
                    // {
                    //     expand: true,
                    //     cwd: 'views/css',
                    //     src: ['*.css', '!*.min.css'],
                    //     dest: 'views/css',
                    //     ext: '.min.css'
                    // }
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
                    'production/index.html': 'source/index.html',
                    'production/views/pizza.html': 'source/views/pizza.html',
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
                        cwd: 'source/css',
                        src: ['*.min.css'],
                        dest: 'production/css',
                        filter: 'isFile'
                    },
                    // this is temporary --> TODO: delete
                    {
                        expand: true,
                        cwd: 'source/views/js',
                        src: ['*.js'],
                        dest: 'production/views/js',
                        filter: 'isFile'
                    }
                ],
            },
        },

        // minify js
        uglify: {
            my_target: {
                files: {
                    'production/js/perfmatters.min.js': ['source/js/perfmatters.js'],
                    'source/js/perfmatters.min.js': ['source/js/perfmatters.js'],
                    'production/js/main.min.js': ['source/js/main.js'],
                    'source/js/main.min.js': ['source/js/main.js'],
                    'production/views/js/main.min.js': ['source/views/js/main.js'],
                    'source/views/js/main.min.js': ['source/views/js/main.js'],
                }
            }
        },

        // optimize images
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 1,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [
                        mozjpeg({quality: 80}),
                        pngcrush({reduce: true})
                    ]
                },
                files: {
                    'production/img/2048.png': 'source/img/2048.png',
                    'production/img/cam_be_like.jpg': 'source/img/cam_be_like.jpg',
                    'production/img/mobilewebdev.jpg': 'source/img/mobilewebdev.jpg',
                    'production/img/profilepic.jpg': 'source/img/profilepic.jpg',
                    'production/views/images/pizza.png': 'source/views/images/pizza.png',
                    'production/views/images/pizzeria.jpg': 'source/views/images/pizzeria.jpg'
                }
            }
        },
        // resize a large image
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 395,
                    }]
                },
                files: [{
                    expand: true,
                    src: ['*.jpg'],
                    cwd: 'source/views/images/',
                    dest: 'production/views/images/'
                }]
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-responsive-images');

    grunt.registerTask('default', [
        'cssmin',
        'htmlmin',
        'copy',
        'uglify',
        'imagemin',
        'responsive_images'
    ]);
};
