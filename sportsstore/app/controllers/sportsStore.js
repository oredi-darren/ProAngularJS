/**
 * Created by dseet on 4/24/2014.
 */
angular.module("sportsStore")
    .constant("dataUrl", "http://localhost:5500/products")
    .controller("sportsStoreCtrl", function($scope, $http, dataUrl) {
        $scope.data = {};
        $http.get(dataUrl)
            .success(function(data) {
                $scope.data.products = data;
            })
            .error(function(error){
                $scope.data.error = error;
            });
    });
