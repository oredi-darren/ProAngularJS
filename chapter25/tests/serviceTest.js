/**
 * Created by dseet on 5/13/2014.
 */
describe("Service Tests", function () {
    beforeEach(angular.mock.module("exampleApp"));

    it("Increments the counter", function () {
        angular.mock.inject(function (counterService) {
            expect(counterService.getCounter()).toEqual(0);
            counterService.incrementCounter();
            expect(counterService.getCounter()).toEqual(1);
        });
    });
});
