(function () {
    'use strict';

    angular.module('informBuroApp')
        .controller('DrugStoreListCtrl', DrugStoreListController);

    DrugStoreListController.$inject = ['webSocket', '$routeParams'];
    function DrugStoreListController(webSocket, $routeParams) {
        var vm = this, map, resizeTimer, _heightIsDirty = true, ymm = getYmm();
        init();

        vm.orderChanged = function () {
            switch (vm.model.order.mode) {
                case '0':
                    vm.model.order.orderBy = 'price';
                    vm.model.order.orderReverse = false;
                    break;
                case '1':
                    vm.model.order.orderBy = 'price';
                    vm.model.order.orderReverse = true;
                    break;
            }
        };

        vm.showMap = function () {
            vm.model.state = 'maps';
            !map && ymaps && ymaps.ready(initMap);
            if (_heightIsDirty)
                setTimeout(setMapHeight, 1);
        };

        function init() {
            vm.model = {
                state: 'list',
                order: {
                    mode: '0',
                    orderBy: 'price',
                    orderReverse: false
                },
                drugStores: []
            };
            if ($routeParams && $routeParams.cdprep && $routeParams.cdform) {
                var request = {
                    cdprep: $routeParams.cdprep,
                    cdform: $routeParams.cdform
                };
                vm.model.drugStores = [];
                webSocket.getDrugStoresByDrug(request, addDrugStore);
            }
        }

        function addDrugStore(data) {
            vm.model.drugStores = data;
        }

        function initMap() {
            $(window).resize(resize);
            createMapByGeo();
            setMapHeight();
        }

        function createMapByGeo() {
            var controls = ["zoomControl", "fullscreenControl", "geolocationControl"];
            ymaps.geolocation.get({mapStateAutoApply: true}).then(function (result) {
                var $map = $('#map'),
                    bounds = result.geoObjects.get(0).properties.get('boundedBy'),
                    mapState = ymaps.util.bounds.getCenterAndZoom(
                        bounds,
                        [$map.width(), $map.height()]
                    );
                mapState.zoom = 15;
                mapState.controls = controls;
                map = map || createMap(mapState);
                //map.geoObjects.add(result.geoObjects);
                ymm.proceedInit();
            }, function (e) {
                console.log(e);
                createMap({
                    center: [55.751574, 37.573856],
                    zoom: 2,
                    controls: controls
                });
            });
        }

        function createMap(state) {
            return new ymaps.Map('map', state);
        }

        function resize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setMapHeight, 250);
        }

        function setMapHeight() {
            var $map = $("#map:visible");
            if (!$map.length) {
                _heightIsDirty = true;
                return;
            }
            _heightIsDirty = false;
            var mapHeight = $(window).height() - $map.position().top;
            $map.css("height", mapHeight);
            if (map) {
                map.container.fitToViewport();
            }
        }

        function getYmm() {
            var re = /"pos":({.*?})/gm, currentDrugStoreIndex = -1, count = 20,
                ymm = {
                    load: function () {
                        var e = map.getBounds();
                        map.geoObjects.removeAll();
                        for (var i = 0, j = 0; i < vm.model.drugStores.length && j < count; i++) {
                            var item = vm.model.drugStores[i];
                            getPos(item);
                            if (isContains(item.pos, e)) {
                                var s = new ymaps.Placemark([item.pos.lat, item.pos.lon], {
                                    iconContent: ++j,
                                    balloonContent: ymm.generateBalloonContent(item)
                                }, {
                                    preset: {
                                        openBaloonOnClick: true,
                                        preset: 'twirl#blueDotIcon'
                                    }, balloonMaxWidth: 400
                                });
                                map.geoObjects.add(s);
                            }
                        }
                    },
                    proceedInit: function () {
                        var prevBtn = new ymaps.control.Button({
                                data: {
                                    iconType: 'prevDrugStore glyphicon glyphicon-triangle-left',
                                    title: 'Предыдущая аптека'
                                },
                                options: {
                                    selectOnClick: false, float: 'right'
                                }
                            }),
                            nextBtn = new ymaps.control.Button({
                                data: {
                                    iconType: 'prevDrugStore glyphicon glyphicon-triangle-right',
                                    title: 'Следующая аптека'
                                },
                                options: {
                                    selectOnClick: false, float: 'right'
                                }
                            });
                        prevBtn.events.add("click", onPrevDrugStore);
                        nextBtn.events.add("click", onNextDrugStore);
                        map.controls.add(prevBtn).add(nextBtn);
                        ymm.load();
                        map.events.add("boundschange", function () {
                            map.balloon.isOpen() || (ymm.load())
                        });
                    },
                    generateBalloonContent: function (item) {
                        return '<div class="b-map-balloon-price">' + item.price + ' руб.</div>' +
                            (item.nmplant ? ('<div class="b-map-balloon-oname">' + item.nmplant + '</div>') : '') +
                            '<div class="b-map-balloon-shopname">' + item.nmfirm + '</div>' +
                            '<div class="b-map-balloon-worktime">' + item.time + '</div>' +
                            '<div class="b-map-balloon-addr">' + item.str + '</div>';
                    }
                };
            return ymm;

            function getPos(obj) {
                if (obj == null)
                    return null;
                if (!obj.pos) {
                    var m = re.exec(obj.map);
                    if (m && m.length == 2) {
                        obj.pos = $.parseJSON(m[1]);
                        obj.pos.lat = parseFloat(obj.pos.lat);
                        obj.pos.lon = parseFloat(obj.pos.lon);
                    }
                }
                return obj.pos;
            }

            function isContains(pos, rect) {
                return pos && pos.lat && pos.lon && rect && rect.length == 2 && pos.lat > rect[0][0] && pos.lon > rect[0][1] && pos.lat < rect[1][0] && pos.lon < rect[1][1];
            }

            function centerDrugStoreByIndex(iterator) {
                if (!vm.model || !vm.model.drugStores || !iterator)
                    return;

                var start = iterator.call(), isComplete = false, current;
                current = start;
                while (!isComplete) {

                    if (current >= 0 && current < vm.model.drugStores.length) {
                        var item = vm.model.drugStores[current];
                        getPos(item);
                        if (item.pos && item.pos.lat && item.pos.lon) {
                            if (map.balloon.isOpen())
                                map.balloon.close();
                            map.setCenter([item.pos.lat, item.pos.lon]);
                            isComplete = true;
                        }
                    }
                    if (!isComplete) {
                        current = iterator.call();
                        if (current == start)
                            isComplete = true;
                    }
                }

            }

            function onNextDrugStore() {
                centerDrugStoreByIndex(function () {
                    currentDrugStoreIndex++;
                    if (currentDrugStoreIndex >= vm.model.drugStores.length)
                        currentDrugStoreIndex = 0;
                    return currentDrugStoreIndex;
                });
            }

            function onPrevDrugStore() {
                centerDrugStoreByIndex(function () {
                    currentDrugStoreIndex--;
                    if (currentDrugStoreIndex < 0)
                        currentDrugStoreIndex = vm.model.drugStores.length - 1;
                    return currentDrugStoreIndex;
                });
            }
        }
    }
})();