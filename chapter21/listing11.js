/**
 * Created by dseet on 5/9/2014.
 */
angular.module("exampleApp", ["increment"])
    .constant("baseUrl", "https://api.parse.com/1/classes/Products/")
    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Parse-Application-Id"] = "oXF8UFASovDbMzm7NvfC9YUfzulg0euATKnlLj6d";
        $httpProvider.defaults.headers.common["X-Parse-REST-API-Key"] = "m4zKi6c9bY8m1K32u2Qgihd4kEMmREwDdDnG5mIS";
        $httpProvider.interceptors.push(function () {
            return {
                response: function(response) {
                    if(response.headers("content-type").indexOf("application/json") != -1) {
                        if(response.hasOwnProperty("data") && response.data.hasOwnProperty("results")) {
                            response.data = response.data.results;
                        }
                    }
                    return response;
                }
            };
        });
    })
    .controller("defaultCtrl", function($scope, $http, baseUrl) {
        $scope.displayMode = "list";
        $scope.currentProduct = null;

        $scope.listProducts = function() {
            $http.get(baseUrl).success(function (data) {
                $scope.products = data;
            });
        };

        $scope.deleteProduct = function (product) {
            $http({
                method: "DELETE",
                url: baseUrl + product.objectId
            }).success(function(){
                $scope.products.splice($scope.products.indexOf(product), 1);
            });
        };

        $scope.updateProduct = function (product) {
            $http({
                url: baseUrl + product.objectId,
                method: "PUT",
                data: product
            }).success(function () {
                for (var i = 0; i < $scope.products.length; i++) {
                    if($scope.products[i].objectId == product.objectId) {
                        $scope.products[i] = product;
                        break;
                    }
                }
                $scope.displayMode = "list";
            });
        };

        $scope.createProduct = function (product) {
            $http.post(baseUrl, product).success(function (response) {
                product.objectId = response.objectId;
                $scope.products.push(product);
                $scope.displayMode = "list";
            });
        };

        $scope.editOrCreateProduct = function (product) {
            $scope.currentProduct = product || {};
            $scope.displayMode = "edit";
        };

        $scope.saveEdit = function (product) {
            if(angular.isDefined(product.objectId)) {
                $scope.updateProduct(product);
            } else {
                $scope.createProduct(product);
            }
        };

        $scope.cancelEdit = function () {
            $scope.currentProduct = {};
            $scope.displayMode = "list";
        }

        $scope.listProducts();
    });
