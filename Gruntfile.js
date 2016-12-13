/*	Grunt Task configuration */
module.exports = function(grunt) {

	/* using jit-grunt for automatically loading all required plugins */
	require('jit-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Compile Sass to CSS and produce SoureMaps;
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'uncompressed'
			},
			files: {
				src: 'scss/main.scss',
				dest: 'dist/css/styles.min.css',
				ext: '.css'
			}
		},

		// PostCSS for adding prefixers and setting rem to pixels;
		postcss: {
			dist: {
				src: 'dist/css/styles.min.css'

			},
			options: {
				// Rewrite and save sourcemap as seperate file
				map: {
					annotation: 'styles/'
				},
				processors: [
					// add fallbacks for rem units
					require('pixrem')({
						atrules: true
					}),
					// add vendor prefixes
					require('autoprefixer')({ browsers: 'iOS >= 7, last 2 versions, ie > 7' }),
					// minify the result
					require('cssnano')()
					]
				},
			},

			watch: {
				scss: {
					files: 'scss/**/*.scss',
					tasks: ['sass', 'postcss'],
					options: {
						spawn: false,
					},
				},
				nunjucks: {
					files: 'views/**/*.html',
					tasks: ['nunjucks'],
					options: {
						spawn: false,
					},
				}
			},
			nunjucks: {
				render: {
					options: {
						paths: ['views'],
						trimBlock: true,
						lstripBlocks: true,
						data: grunt.file.readJSON('templates-data.json')
					},
					files: [
					{
						expand: true,
						cwd: "views/",
						src: "*.html",
						dest: "dist/",
						ext: ".html"
					}
					]
				}
			},


		});

	grunt.loadNpmTasks('grunt-nunjucks-2-html');

/*
*	Grunt tasks
*	Run with grunt or grunt <command> in terminal
*/
grunt.registerTask('default', 'run');
grunt.registerTask('run',
	[
	'nunjucks',
	'sass',
	'postcss',
	'watch'
	]
	);
grunt.registerTask('create_css',
	[
	'sass',
	'postcss'
	]
	);
grunt.registerTask('create_html',
	[
	'nunjucks'
	]
	);
};
