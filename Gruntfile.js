module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.initConfig({
        uglify: {
            dev: {
                files: {
                    'app/js/app.min.js': ['app/js/app.js', 'app/js/WebSocketFactory.js', 'app/js/directives/**/*.js', 'app/js/controllers/**/*.js']
                },
                options: {
                    sourceMap: true,
                    sourceMapName: 'app/js/app.min.js.map'
                }
            }
        },
        cssmin: {
            options: {
                sourceMap: true
            },
            target: {
                files: {
                    'app/css/app.min.css': ['app/css/app.css']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });
    grunt.registerTask("default", ['uglify', 'cssmin', 'karma'])
};
