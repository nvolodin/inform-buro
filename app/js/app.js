(function () {
    'use strict';

    angular.module('informBuroApp', [
        'ngRoute',
        'informBuroApp.core'
    ])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider
                .when('/search/:drug', {
                    templateUrl: 'views/search.html',
                    controller: 'SearchCtrl',
                    controllerAs: 'sc'
                })
                .when('/search', {
                    templateUrl: 'views/search.html',
                    controller: 'SearchCtrl',
                    controllerAs: 'sc'
                })
                .when('/drugStoreList/:cdprep/:cdform', {
                    templateUrl: 'views/drugStoreList.html',
                    controller: 'DrugStoreListCtrl',
                    controllerAs: 'dsc'
                })
                .when('/notFound', {
                    templateUrl: 'views/notFound.html'
                })
                .otherwise({
                    redirectTo: '/search'
                });
        }]);
})();
