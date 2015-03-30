'use strict';

describe("Search Controller", function() {
	beforeEach(angular.mock.module('informBuroApp'));

	it("should behave defined", inject(function($controller) {
		var ctrl=$controller('SearchCtrl');
		expect(ctrl).toBeDefined();
	}));

	describe("when received search", function() {
		var searchController, 
			webServiceMock=(function(){
				return {
					getDrugs: function (query, callback) {
						if (callback) {
							var data = [{prices: 0}, {prices: 10}];
							callback.call(this, data);
						}
					}
				};
			})(),
			routeParams={drug:'t'};
		beforeEach(function(){
			module(function($provide){
				$provide.value('webSocket', webServiceMock);
				$provide.value('$routeParams',routeParams)
			});

			inject(function($controller){
				searchController=$controller('SearchCtrl');
			});
		});

		it("should behave drugs with prices > 0", function() {		
			expect(searchController.drugs).toBeDefined();
			expect(searchController.drugs.length).toEqual(1);
			expect(searchController.drugs[0].prices).toBeGreaterThan(0);
		});
	});	
});