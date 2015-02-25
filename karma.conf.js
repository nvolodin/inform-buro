module.exports=function(config){
	config.set({
		basePath : './',
		files : [
			'app/components/jquery/dist/jquery.js',
			'app/components/angular/angular.js',
			'app/components/angular-route/angular-route.js',
			'app/components/angular-mocks/angular-mocks.js',
			'https://cdn.socket.io/socket.io-1.3.2.js',
			'app/js/*.js',
			'app/js/**/*.js',
			'test/unit/**/*.js'
		],
		frameworks: ['jasmine'],

	    browsers : ['PhantomJS'],

	    plugins : [
	            'karma-chrome-launcher',
	            'karma-firefox-launcher',
	            'karma-jasmine',
				'karma-phantomjs-launcher'
	            ],

		reporters: ['teamcity'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
	    junitReporter : {
	      outputFile: 'test_out/unit.xml',
	      suite: 'unit'
	    },
		singleRun: true
	});
}