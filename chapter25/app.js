/**
 * Created by dseet on 5/13/2014.
 */
angular.module("exampleApp", [])
    .controller("defaultCtrl", function ($scope, $http) {
        $scope.counter = 0;

        $http.get("productData.json").success(function (data) {
            $scope.products = data;
        });

        $scope.incrementCounter = function() {
            $scope.counter++;
        };
    });
