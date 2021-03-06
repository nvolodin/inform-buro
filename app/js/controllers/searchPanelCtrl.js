(function () {

    'use strict';
    /* Controllers */
    angular
        .module('informBuroApp')
        .controller('SearchPanelCtrl', SearchPanelController);

    SearchPanelController.$inject = ['$location', '$routeParams'];
    function SearchPanelController($location, $routeParams) {
        var vm = this;
        init();

        vm.search = function () {
            if (vm.searchText)
                $location.path('/search/' + encodeURIComponent(vm.searchText));
        };

        function init() {
            vm.searchText = '';

            if ($routeParams.drug) {
                vm.searchText = decodeURIComponent($routeParams.drug);
            }
        }
    }
})();