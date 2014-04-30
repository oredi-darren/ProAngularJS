/**
 * Created by dseet on 4/30/2014.
 */
angular.module("exampleApp.Controllers", [])
    .controller("dayCtrl", function($scope, days) {
        $scope.day = days.today;
    })
    .controller("tomorrowCtrl", function($scope, days) {
        $scope.day = days.tomorrow;
    });
