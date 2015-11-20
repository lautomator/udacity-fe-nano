module.exports = function(grunt) {

    var mozjpeg = require('imagemin-mozjpeg'),
        pngcrush = require('imagemin-pngcrush');

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
                    '../production/views/js/main.min.js': ['views/js/main.js'],
                    // '../production/views/js/worker.min.js': ['views/js/worker.js']
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
                    '../production/img/2048.png': './img/2048.png',
                    '../production/img/cam_be_like.jpg': './img/cam_be_like.jpg',
                    '../production/img/mobilewebdev.jpg': './img/mobilewebdev.jpg',
                    '../production/img/profilepic.jpg': './img/profilepic.jpg',
                    '../production/views/images/pizza.png': './views/images/pizza.png',
                    '../production/views/images/pizzeria.jpg': './views/images/pizzeria.jpg'
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
                    cwd: 'views/images/',
                    dest: '../production/views/images/'
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
