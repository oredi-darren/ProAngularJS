/**
 * Created by dseet on 5/13/2014.
 */
describe("Filter Tests", function () {
    var filterInstance;
    beforeEach(angular.mock.module("exampleApp"));
    beforeEach(angular.mock.inject(function ($filter) {
        filterInstance = $filter("labelCase");
    }));

    it("Changes case", function () {
        var result = filterInstance("test phrase");
        expect(result).toEqual("Test phrase");
    });

    it("Reverse case", function () {
        var result = filterInstance("test phrase", true);
        expect(result).toEqual("tEST PHRASE");
    });
});
