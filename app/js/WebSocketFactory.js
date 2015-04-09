(function () {
    'use strict';

    angular.module('informBuroApp.core', [])

    angular.module('informBuroApp.core')
        .value('$io', io)
        .factory('webSocket', webSocket);

    webSocket.$inject = ['$rootScope', '$io'];

    function webSocket($rootScope, $io) {
        var service = {
                getDrugs: getDrugs,
                getDrugStoresByDrug: getDrugStoresByDrug,
                getFavorites: getFavorites
            },
            socket = $io.connect('http://inform-buro.info');//'http:inform-buro.info:80');

        socket.on('error', function () {
            console.log('there was an error');
        });

        return service;

        function getDrugs(query, callback) {
            socket.emit('send_gridtable1', ['input1', query, , , '1', 'САМАРА', '', '', , , , , , , , , '', '']);
            socket.on('grid_data1', function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }

        function getDrugStoresByDrug(drugItem, callback) {
            var requestData = [
                'clickform1',
                '',
                drugItem.cdprep,
                drugItem.cdform,
                "1",
                "САМАРА",
                "",
                "", , , , , , , , , "", ""]
            socket.emit('send_gridtable4', requestData);
            socket.on('grid_data4', function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }

        function getFavorites(callback) {
            socket.emit('get_lekar_stat', '');
            socket.on('lekar_stat_data', function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            })
        }
    }
})()
