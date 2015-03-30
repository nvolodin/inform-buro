'use strict';
describe("Drug Store List Controller", function() {
	beforeEach(angular.mock.module('informBuroApp'));

	it("should behave defined", inject(function($controller) {
		var ctrl=$controller('DrugStoreListCtrl');
		expect(ctrl).toBeDefined();
		expect(ctrl.model).toBeDefined();
		expect(ctrl.model.state).toBe('list');
		expect(ctrl.model.order).toBeDefined();
		expect(ctrl.model.order.mode).toBe('0');
		expect(ctrl.model.order.orderBy).toBe('price');
		expect(ctrl.model.order.orderReverse).toBe(false);
		expect(ctrl.model.drugStores).toEqual([]);
	}));

	describe("get drug stores by drugid", function() {
		var drugStoreListController, 
			webServiceMock=(function(){
				return {
					getDrugStoresByDrug: function (query, callback) {
						if (callback) {
							var data = [
								{cdfirm: 123, nmfirm: "A1"}, {cdfirm: 123, nmfirm: "A2"}];
							callback.call(this, data);
						}
					}
				};
			})(),
			routeParams={cdprep:123,cdform:321};
		beforeEach(function(){
			module(function($provide){
				$provide.value('webSocket', webServiceMock);
				$provide.value('$routeParams',routeParams)
			});

			inject(function($controller){
				drugStoreListController=$controller('DrugStoreListCtrl');
			});
		});

		it("should behave drugsStores", function() {		
			expect(drugStoreListController.model.drugStores.length).toBe(2); 
		});

		it("should behave groupedDrugStores", function() {
			expect(drugStoreListController.model.groupedDrugStores.length).toBe(1);
		});

		it("should behave order by price desc", function() {
			expect(drugStoreListController.model.order.mode).toBe('0');
			drugStoreListController.model.order.mode='1';
			drugStoreListController.orderChanged();
			expect(drugStoreListController.model.order.orderBy).toBe('price');
			expect(drugStoreListController.model.order.orderReverse).toBe(true);
		});
	});	
});