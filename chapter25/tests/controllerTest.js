/**
 * Created by dseet on 5/13/2014.
 */
describe("Controller Test", function () {
    // Arange
    var mockScope = {};
    var controller;
    beforeEach(angular.mock.module("exampleApp"));
    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        mockScope = $rootScope.$new();
        controller = $controller("defaultCtrl", {
            $scope: mockScope
        });
    }));

    // Act and Assess
    it("Creates variable", function () {
        expect(mockScope.counter).toEqual(0);
    });

    it("Increments counter", function () {
        mockScope.incrementCounter();
        expect(mockScope.counter).toEqual(1);
    });
});
