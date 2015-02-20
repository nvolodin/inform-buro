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

	    browsers : ['Chrome'],

	    plugins : [
	            'karma-chrome-launcher',
	            'karma-firefox-launcher',
	            'karma-jasmine'
	            ],

	    junitReporter : {
	      outputFile: 'test_out/unit.xml',
	      suite: 'unit'
	    }
	});
}