/**
 * Created by dseet on 5/9/2014.
 */
angular.module("exampleApp", ["increment", "ngResource"])
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
    .controller("defaultCtrl", function($scope, $http, $resource, baseUrl) {
        $scope.displayMode = "list";
        $scope.currentProduct = null;
        $scope.productsResource = $resource(baseUrl + ":id", { id: "@objectId" }, {
            query: {
                method: "GET", isArray: true, transformResponse: function(data, headers) {
                    return JSON.parse(data).results;
                }
            },
            update: { method: "PUT" }
        });

        $scope.listProducts = function() {
            $scope.products = $scope.productsResource.query();
        };

        $scope.deleteProduct = function (product) {
            product.$delete().then(function() {
                $scope.products.splice($scope.products.indexOf(product), 1);
            });
        };

        $scope.updateProduct = function (product) {
            angular.copy(product).$update().then(function() {
                $scope.displayMode = "list";
            });
        };

        $scope.createProduct = function (product) {
            var newProduct = new $scope.productsResource(product);
            newProduct.$save().then(function (response) {
                $scope.products.push(angular.extend(newProduct, product));
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
            if($scope.currentProduct && $scope.currentProduct.$get) {
                $scope.currentProduct.$get();
            }
            $scope.currentProduct = {};
            $scope.displayMode = "list";
        }

        $scope.listProducts();
    });