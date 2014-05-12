/**
 * Created by dseet on 5/13/2014.
 */
angular.module("exampleApp", [])
.controller("defaultCtrl", function ($scope) {
    $scope.counter = 0;

    $scope.incrementCounter = function() {
        $scope.counter++;
    };
});
