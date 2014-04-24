/**
 * Created by dseet on 4/24/2014.
 */
angular.module("sportsStore")
    .controller("cartSummaryController",
    function($scope, cart) {
        $scope.cartData = cart.getProducts();
        $scope.total = function() {
            return cartData.total();
        };
        $scope.remove = function(id) {
            cart.removeProduct(id);
        }
    });
