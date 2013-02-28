/*global config:true, task:true*/

module.exports = function(grunt) {
	// Grunt utilities.
	var task = grunt.task;
	var file = grunt.file;
	var utils = grunt.utils;
	var log = grunt.log;
	var verbose = grunt.verbose;
	var fail = grunt.fail;
	var option = grunt.option;
	var config = grunt.config;
	var template = grunt.template;

	grunt.initConfig({
		options: {
			// testFiles: [
			//     'js/model/**/*.js',
			//     'js/collection/**/*.js',
			//     'js/router/**/*.js',
			//     'js/view/**/*.js',
			//     'js/libs/acme/**/*.js'
			// ]
		},
		watch: {
			test: {
				files: ['src/**/*.js', 'test/**/*.js'],
				tasks: 'mocha'
			}
		},
		lint: {
			//files: ['test/**/*.js', 'src/**/*.js']
			files: ['src/**/*.js']
		},
		mocha: {
			// runs all html files (except test2.html) in the test dir
			// In this example, there's only one, but you can add as many as
			// you want. You can split them up into different groups here
			// ex: admin: [ 'test/admin.html' ]
			all: ['test/**/*.html']
		},
		min: {
			dist: {
				src: ['src/jquery-io.js'],
				dest: 'dist/jquery-io.min.js'
			}
		},
		pkg: '<json:package.json>',
		jqueryjson: {
			dependencies: {
				jquery: '>=1.4.3'
			}
		}
	});

	// Alias 'test' to 'mocha' so you can run `grunt test`
	task.registerTask('test', 'mocha');

	// Default task.
	task.registerTask('default', 'lint min jquery-json');

	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-jquery-json');
};