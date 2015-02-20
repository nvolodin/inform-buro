(function(){

'use strict';
/* Controllers */
angular
	.module('informBuroApp')
	.controller('SearchCtrl', SearchController);
	
	SearchController.$inject =['webSocket','$routeParams',];
	function SearchController(webSocket,$routeParams){
		var vm=this;
		init();

		function init(){
			if ($routeParams && $routeParams.drug) {
				var text=decodeURIComponent($routeParams.drug)
				vm.drugs=[];
				webSocket.getDrugs(text, addDrug);
			}
		}

		function addDrug(data){
			vm.drugs=$.grep(data, function(item){
				return item.prices;
			});
		}
	}	
})();
