module.exports=function(config){
	config.set({
		basePath : './',
		files : [
			'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js',
			'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js',
			'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-route.min.js',
			'app/components/angular-mocks/angular-mocks.js',
			'https://cdn.socket.io/socket.io-1.3.2.js',
			'app/js/app.min.js',
			'test/unit/**/*.js'
		],
		frameworks: ['jasmine'],

	    browsers : ['PhantomJS'],

	    plugins : [
				'karma-jasmine',
				'karma-teamcity-reporter',
	            'karma-chrome-launcher',
	            'karma-firefox-launcher',
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
		singleRun: true,
		browserDisconnectTimeout : 10000,
		browserDisconnectTolerance : 1,
		browserNoActivityTimeout : 4*60*1000,
		captureTimeout : 4*60*1000
	});
}