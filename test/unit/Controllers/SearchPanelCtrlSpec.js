'use strict';

describe("Search Panel Controller", function() {
	beforeEach(angular.mock.module('informBuroApp'));

	it("should behave defined", inject(function($controller) {
		var ctrl=$controller('SearchPanelCtrl');
		expect(ctrl).toBeDefined();
	}));

	describe("when received search", function() {
		var searchPanelController, 
			location=(function(){
				var _mock= {
					path:path
				};

				return _mock;

				function path(url){
					_mock.url=url;
				}				
			})(),
			routeParams={
				drug:'123'
			};
		beforeEach(function(){
			module(function($provide){
				$provide.value('$location', location);
				$provide.value('$routeParams',routeParams);
			});

			inject(function($controller){
				searchPanelController=$controller('SearchPanelCtrl');
			});
		});

		it("should behave navigate to search page", function() {		
			searchPanelController.search();
			expect(searchPanelController.searchText).toBeDefined();
			expect(searchPanelController.searchText).toEqual('123');
			expect(location.url).toEqual('/search/123');
		});
	});
});