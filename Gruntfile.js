module.exports = function (grunt) {
    "use strict";
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
         * Directory variables
         */
        app : {
            root : 'www',
            js : '<%= app.root%>/js',
            css : '<%= app.root%>/css',
            img : '<%= app.root%>/img'
        },
        src : {
            bower : 'bower_components',
            root : 'src',
            js : '<%= src.root %>/js',
            sass : '<%= src.root %>/sass',
            // temp : '<%= src.root %>/temp',
            html : '<%= src.root %>/templating',
            img : '<%= src.root %>/img',
            
            assets : '<%= src.root %>/assets'
        },
    
        /**
         * concat setup
         */
        concat: {
            options : {
                sourceMap : true,
            },
            vendors : {
                src : [
                    '<%= src.bower %>/jquery/dist/jquery.js',
                    '<%= src.bower %>/fastclick/lib/fastclick.js',
                    '<%= src.bower %>/framework7/dist/js/framework7.js',
                    '<%= src.bower %>/momentjs/moment.js',
                    '<%= src.bower %>/momentjs/locale/da.js',
                ],
                dest : '<%= app.js %>/vendors.js',
                nonull : true
            },
            app: {
                src: [
                    '<%= src.js %>/**/*.js',
                    '<%= src.js %>/*.js'
                ],
                dest: '<%= app.js %>/site.js',
                nonull : true
            },
        },

        /**
         * uglify setup
         */
        uglify: {
            options: {
                mangle: false,
                sourceMap: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            vendors: {
                files: {
                    '<%= app.js %>/vendors.min.js': '<%= app.js %>/vendors.js'
                }
            },
            site: {
                files: {
                    '<%= app.js %>/site.min.js': '<%= app.js %>/site.js'
                }
            },
            // modernizr: {
            //     files: {
            //         '<%= app.js %>/modernizr-custom.min.js': ['<%= app.js %>/modernizr-custom.js']
            //     }
            // }
        },

/*sass setup*/
        sass: {
            dist: {
                options: {
                    loadPath: [
                        '',
                        ''
                    ],
                    // banner: '/*\nTheme Name: <%= pkg.name %>\nTemplate: plant_boilerplate\nVersion: <%=pkg.version %>\nDescription: <%= pkg.description%>\nAuthor: <%= pkg.author %>\n*/',
                    style: 'expanded'
                },
                files: {
                    '<%= app.css %>/style.css': '<%= src.sass %>/style.scss'
                }
            },
        },
        cssmin: {
            target: {
                files: {
                    '<%= app.css %>/style.min.css': '<%= app.css %>/style.css'
                }
            }
        },
        /**
         * Add a custom modernizr based on what is actually used
         */
        // modernizr: {
        //     dist: {
        //         "devFile" : "<%= src.bower %>/modernizr/modernizr.js",
        //         "outputFile" : "<%= app.js %>/modernizr-custom.js",
        //         "extra" : {
        //             "shiv" : true,
        //             "load" : true,
        //             "mq" : true,
        //             "cssclasses" : true
        //         },
        //         "extensibility" : {
        //             "addtest" : true,
        //             "prefixed" : false,
        //             "teststyles" : false,
        //             "testprops" : false,
        //             "testallprops" : false,
        //             "hasevents" : false,
        //             "prefixes" : false,
        //             "domprefixes" : false
        //         },
        //         "uglify" : false,
        //         "parseFiles" : true,
        //         "files" : {
        //             "src": ['<%= app.css %>/style.css', '<%= app.js %>/site.js', '<%= app.js %>/vendors.js']
        //         }
        //     }
        // },

        /**
         * Copy files from src to www
         */
        copy: {
            assets: {
                expand: true,
                cwd: '<%= src.img %>/',
                src: ['**/*.{ico,xml,png,jpg,svg}'],
                dest: '<%= app.img %>/'
            },

            themeTemplates: {
                expand : true,
                cwd : '<%= src.html %>',
                src : ['**', '**/*'],
                dest : '<%= app.root %>'
            }
        },

        /**
         * Remove temp files
         */
        // clean: {
        //     temp : ['<%= src.temp %>']
        // },

        /**
         * Minify image assets
         */
        imagemin: {
            assets: {
                files: [{
                    expand: true,
                    cwd: '<%= src.img %>/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= app.img %>/'
                }]
            },
            uploads: {
                files: [{
                    expand: true,
                    cwd: 'app/content/uploads/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'app/content/uploads/'
                }]
            }
        },

        /**
         * Minify svg assets
         */
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }, {
                        removeUselessStrokeAndFill: false
                    }, {
                        convertPathData: {
                            straightCurves: false
                        }
                    }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= src.img %>/',
                    src: ['**/*.svg'],
                    dest: '<%= app.img %>/',
                    ext: '.svg'
                }]
            }
        },

        /**
         * Watch setup
         */
        watch: {
            jsfiles : {
                options : {
                    livereload : 35729
                },
                files: [
                    '<%= src.js %>/*.js',
                    '<%= src.js %>/**/*.js'
                ],
                tasks: ['js_build']
            },
            sassfiles: {
                options : {
                    livereload : 35729
                },
                files: [
                '<%= src.sass %>/**/*.scss',
                '<%= src.sass %>/*.scss',
                ],
                tasks: ['css_build']
            },
            assetsfiles: {
                options : {
                    livereload : 35729
                },
                files: ['<%= src.img%>/**/*.{png,jpg,gif}', '<%= src.img %>/*.{png,jpg,gif}', '<%= src.img %>/**/*.svg', '<%= src.img %>/*.svg'],
                tasks: ['assets_build']
            },
            templatefiles: {
                files: ['<%= src.html %>/**'],
                tasks: ['template_build']
            }
        },

        /**
         * Notify setup
         */
        notify_hooks: {
            options: {
                enabled: true,
                title: "<%= pkg.name %>" // defaults to the name in package.json, or will use project directory's name
            }
        },
        notify: {
            all : {
                options : {
                    message : 'APP build'
                }
            },
            css: {
                options: {
                    message: 'CSS build',
                }
            },
            js: {
                options: {
                    message: 'JS build',
                }
            },
            templates: {
                options: {
                    message: 'Templates build',
                }
            },
            assets: {
                options: {
                    message: 'Assets build',
                }
            }
        },
        // concurrent: {
        //     concurrentOne : {
        //         tasks : ['copy', 'concat', 'sass'],
        //         options: {
        //             logConcurrentOutput: true,
        //             limit : 4
        //         }
        //     },
        //     concurrentTwo : {
        //         tasks : ['cssmin', 'uglify', 'imagemin:assets', 'svgmin'],
        //         options: {
        //             logConcurrentOutput: true,
        //             limit : 4
        //         }
        //     }
        // }
    });
    /**
     * Task to install bower components listed in bower.json
     * @return {void}
     */
    grunt.registerTask('bower_install', 'install bower dependencies', function () {

        var exec = require('child_process').exec;
        var done = this.async();

        exec('bower install', {cwd: './'}, function(error, stdout, stderr) {
            grunt.log.writeln(stdout);
            if(error){
                grunt.log.writeln('err');
                grunt.log.writeln(stderr);
            }
            done();
        });
    });

    grunt.registerTask('template_build', [
        'copy:themeTemplates',
        'notify:templates'
    ]);

    grunt.registerTask('css_build', [
        'sass',
        // 'modernizr',
        'cssmin',
        'notify:css'
    ]);

    grunt.registerTask('js_build', [
        'concat:app',
        'uglify:site',
        'notify:js'
    ]);

    grunt.registerTask('assets_build', [
        'cssmin',
        'svgmin',
        'copy:assets',
        'notify:assets'
    ]);

    grunt.registerTask('imgminify', [
        'imagemin'
    ]);

    grunt.registerTask('once', [
        // 'ngAnnotate', 
        // 'concurrent:concurrentOne',
        // 'concurrent:concurrentTwo',
        // 'modernizr',
        // 'clean',
        // 'js_build',
        'assets_build',
        'concat:vendors',
        'uglify:vendors',
        'sass',
        'notify:all'
    ]);

    grunt.registerTask('default', [
        'bower_install',
        'once',
        'watch'
    ]);

};