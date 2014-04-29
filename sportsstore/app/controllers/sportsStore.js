/**
 * Created by dseet on 4/24/2014.
 */
angular.module("sportsStore")
    .constant("dataUrl", "https://api.parse.com/1/classes/Products")
    .constant("orderUrl", "https://api.parse.com/1/classes/Order")
    .run(function ($http) {
        $http.defaults.headers.common["X-Parse-Application-Id"] = "oOANAcbXl5SNeeDjSJ9qKWYeixVQkTVdKhMDdcpI";
        $http.defaults.headers.common["X-Parse-REST-API-Key"] = "i0lEyAUKNtUYVqlvZB97PgWMFjtOBNpAxsxeU8Fn";
    })
    .controller("sportsStoreCtrl", function($scope, $http, $location, dataUrl, orderUrl, cart) {
        $scope.data = {};
        $http.get(dataUrl)
            .success(function(data) {
                $scope.data.products = data.results;
            })
            .error(function(data, status){
                $scope.data.error = data.error || data || "Request failed";
                $scope.data.status = status;
            });

        $scope.sendOrder = function(shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
                .success(function(data) {
                    $scope.data.orderId = data.objectId;
                    cart.getProducts().length = 0;
                })
                .error(function(error) {
                    $scope.data.orderError = "Error: " + error;
                })
                .finally(function() {
                    $location.path("complete");
                });
        };
    });
