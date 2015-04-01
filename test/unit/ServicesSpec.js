'use strict';

describe('Services', function () {
    var mock, socket, searchQueryActual = 'one', actualData = [1, 2, 3];

    beforeEach(module('informBuroApp.core'));

    describe("Services Defined", function () {
        beforeEach(function () {
            inject(function (webSocket) {
                socket = webSocket;
            });
        });

        it("should behave defined Service", function () {
            expect(socket).toBeDefined();
        });
    });

    describe("Get Drugs", function () {
        var expectedData = null;
        beforeEach(function (done) {
            mock = (function () {
                var callback = null;
                var internal = {
                    on: function (action, callbackAction) {
                        switch (action) {
                            case 'grid_data1':
                                callback = callbackAction;
                                break;
                        }
                    },
                    emit: jasmine.createSpy().and.callFake(function () {
                        setTimeout(function () {
                            if (callback)
                                callback.call(this, actualData);
                        });

                    })
                };
                var _mock = {
                    internal: internal,
                    connect: function (url) {
                        return internal;
                    }
                };
                return _mock;
            })();

            module(function ($provide) {
                $provide.value('$io', mock);
            });

            inject(function (webSocket) {
                socket = webSocket;
            });
            socket.getDrugs(searchQueryActual, function (data) {
                expectedData = data;
                done();
            });
        });


        it('should send emit', function () {
            expect(mock.internal.emit).toHaveBeenCalledWith('send_gridtable1', ['', searchQueryActual, , , 'все', 'все', '', '', , , , , , , , , '', '']);
        });

        it("should receive data", function () {
            expect(expectedData).toEqual(actualData);
        });
    });

    describe("Get DrugStores", function () {
        var drugDataMock = {cdform: 198, cdmnn: 835, cdprep: 5181, form: "Т", nmmnn: "М", nmprep: "М1", prices: 106},
            expectedData = null;
        ;
        beforeEach(function (done) {
            mock = (function () {
                var callback = null;
                var internal = {
                    on: function (action, callbackAction) {
                        switch (action) {
                            case 'grid_data4':
                                callback = callbackAction;
                                break;
                        }
                    },
                    emit: jasmine.createSpy().and.callFake(function () {
                        setTimeout(function () {
                            if (callback)
                                callback.call(this, actualData);
                        });

                    })
                };
                var _mock = {
                    internal: internal,
                    connect: function (url) {
                        return internal;
                    }
                };
                return _mock;
            })();
            module(function ($provide) {
                $provide.value('$io', mock);
            });

            inject(function (webSocket) {
                socket = webSocket;
            });
            socket.getDrugStoresByDrug(drugDataMock, function (data) {
                expectedData = data;
                done();
            });
        });


        it("should send emit", function () {
            expect(mock.internal.emit).toHaveBeenCalledWith('send_gridtable4', [
                '',
                '',
                drugDataMock.cdprep,
                drugDataMock.cdform,
                "все",
                "Все",
                "",
                "", , , , , , , , , "", ""]);
        });

        it("should receive data", function () {
            expect(expectedData).toEqual(actualData);
        });
    });

    describe("Get Favorites", function () {
        var expectedData = null;
        beforeEach(function (done) {
            mock = (function () {
                var callback = null;
                var internal = {
                    on: function (action, callbackAction) {
                        switch (action) {
                            case 'lekar_stat_data':
                                callback = callbackAction;
                                break;
                        }
                    },
                    emit: jasmine.createSpy().and.callFake(function () {
                        setTimeout(function () {
                            if (callback)
                                callback.call(this, actualData);
                        });

                    })
                };
                var _mock = {
                    internal: internal,
                    connect: function (url) {
                        return internal;
                    }
                };
                return _mock;
            })();

            module(function ($provide) {
                $provide.value('$io', mock);
            });

            inject(function (webSocket) {
                socket = webSocket;
            });

            socket.getFavorites(function (data) {
                expectedData = data;
                done();
            });
        });

        it('should send emit', function () {
            expect(mock.internal.emit).toHaveBeenCalledWith('get_lekar_stat','');
        });

        it("should receive data", function () {
            expect(expectedData).toEqual(actualData);
        });
    });
});