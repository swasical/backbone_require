module.exports = function(grunt){
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs'); // requirejs includes uglifyjs 
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-htmlrefs');
  //grunt.loadNpmTasks('grunt-release');
  
  //config
  grunt.initConfig({

    //tool for cutting new releases of this project
    //release: {options: {npm: false}},
	
    //delete the previous build and generated directories
    clean: {
      build: 'build',
      generated: ['build/generated', 'build/views', 'build/models']
    },

    //copy images to the build
    copy: {
	  build: {
		files: [
			{ src: ['lib/**'], dest: 'build/' },
			{ src: ['*.png'], dest: 'build/' },
			{ src: ['site.css'], dest: 'build/' }
		]
	  }
    },
	
    //replace all the script tags in the HTML file with the single built script
    htmlrefs: {
      options: {
        file: { 
          buildNumber: 47878 //todo generate unique from contents of file for each file
        }
      },
      build: {
        src: 'index.html',
        dest: 'build/'
      }
    },
	
    //minify the HTML file (index.html)
    htmlmin: {
      index: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    },

    //minify the JS file to be as small as possible
	pkg: grunt.file.readJSON('package.json'),
	requirejs: {
      compile: {
        options: {
          //mainConfigFile: 'main.js',
		  baseUrl: "js",
          // name: "main", // a module name
		  dir: 'build', // an output directory
	      modules: [
				{
					name: "main"
				}
		  ],
		  //out: 'build/app.min.js',
		  // include: ['main'],
		  optimize: 'uglify',
		  normalizeDirDefines: 'all'
        }
      }
    }
  });

  grunt.registerTask('build', ['clean:build', 'requirejs', 'htmlrefs', 'htmlmin', 'clean:generated', 'copy']);
};