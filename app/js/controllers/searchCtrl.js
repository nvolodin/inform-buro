(function () {

    'use strict';
    /* Controllers */
    angular
        .module('informBuroApp')
        .controller('SearchCtrl', SearchController);

    SearchController.$inject = ['webSocket', '$routeParams', '$location'];
    function SearchController(webSocket, $routeParams, $location) {
        var vm = this;
        init();

        vm.getDrugOffersCount = function (offersCount) {
            if (!offersCount)
                return '';
            var offersCountStr = offersCount.toString();
            var lastDigit = !offersCountStr.length ? '0' : offersCountStr[offersCountStr.length - 1],
                prevDigit = offersCountStr.length > 1 ? offersCountStr[offersCountStr.length - 2] : '0';
            var postfix = '';
            if (prevDigit == '1' || lastDigit === '5' || lastDigit === '6' || lastDigit === '7' || lastDigit === '8' || lastDigit === '9' || lastDigit === '0') {
                postfix = 'й';
            } else if (lastDigit === '1') {
                postfix = 'е';
            } else if (lastDigit === '2' || lastDigit === '3' || lastDigit === '4') {
                postfix = 'я';
            } else {
                return '';
            }
            return offersCount + ' предложени' + postfix;
        };

        function init() {
            if ($routeParams && $routeParams.drug) {
                var text = decodeURIComponent($routeParams.drug);
                vm.drugs = [];
                webSocket.getDrugs(text, addDrug);
            }
        }

        function addDrug(data) {
            vm.drugs = $.grep(data, function (item) {
                return item.prices;
            });
            if (!vm.drugs.length){
                $location.path('/notFound');
            }
        }
    }
})();
