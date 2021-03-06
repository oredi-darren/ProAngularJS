/**
 * Created by dseet on 5/13/2014.
 */
angular.module("exampleApp", [])
    .controller("defaultCtrl", function ($scope, $http, $interval, $timeout, $log) {
        $scope.intervalCounter = 0;
        $scope.timerCounter = 0;

        $interval(function() {
            $scope.intervalCounter++;
        }, 5000, 10);

        $timeout(function() {
            $scope.timerCounter++;
        }, 5000);

        $http.get("productData.json").success(function (data) {
            $scope.products = data;
            $log.log("There are " + data.length + " items");
        });

        $scope.counter = 0;
        $scope.incrementCounter = function() {
            $scope.counter++;
        };
    })
    .filter("labelCase", function () {
        return function(value, reverse) {
            if(angular.isString(value)) {
                var intermediate = reverse ? value.toUpperCase() : value.toLowerCase();

                return (reverse ? intermediate[0].toLowerCase() : intermediate[0].toUpperCase()) + intermediate.substr(1);
            } else {
                return value;
            }
        };
    })
    .directive("unorderedList", function() {
        return function (scope, element, attrs) {
            var data = scope[attrs["unorderedList"]];
            if(angular.isArray(data)) {
                var listElement = angular.element("<ul>")
                element.append(listElement);
                for (var i = 0; i < data.length; i++) {
                    listElement.append(angular.element("<li>").text(data[i].name));
                }
            }
        }
    })
    .factory("counterService", function () {
        var counter = 0;
        return {
            incrementCounter: function() {
                counter++;
            },
            getCounter: function () {
                return counter;
            }
        };
    });
