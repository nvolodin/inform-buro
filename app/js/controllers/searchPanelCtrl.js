(function() {
	
'use strict';
/* Controllers */
angular
	.module('informBuroApp')
	.controller('SearchPanelCtrl', SearchPanelController);

	SearchPanelController.$inject =['$location','$routeParams'];
	function SearchPanelController($location ,$routeParams){
		var vm=this;
		init();

		function init(){
			vm.searchText='';
			
			if ($routeParams.drug){
				vm.searchText=decodeURIComponent($routeParams.drug);
			}
		}

		vm.search=function(){
			if (vm.searchText)
				$location.path('/search/'+encodeURIComponent(vm.searchText));
		}
	}
})();