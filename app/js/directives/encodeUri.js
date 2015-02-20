(function(){
	'use strict';

	angular.module('informBuroApp.core')
	.filter("encodeUri", function() {
  		return function(x) {
    		return window.btoa(encodeURIComponent(x));
		};
	});
})();