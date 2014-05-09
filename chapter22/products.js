/**
 * Created by dseet on 5/9/2014.
 */
angular.module("exampleApp", ["increment", "ngResource", "ngRoute"])
    .constant("baseUrl", "https://api.parse.com/1/classes/Products/")
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when("/ProAngularJS/chapter22/list", {
            templateUrl: "/ProAngularJS/chapter22/tableView.html"
        });

        $routeProvider.when("/ProAngularJS/chapter22/edit", {
            templateUrl: "/ProAngularJS/chapter22/editorView.html"
        });

        $routeProvider.when("/ProAngularJS/chapter22/create", {
            templateUrl: "/ProAngularJS/chapter22/editorView.html"
        });

        $routeProvider.otherwise({
            templateUrl: "/ProAngularJS/chapter22/tableView.html"
        });
    })
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
    .controller("defaultCtrl", function($scope, $http, $resource, $location, baseUrl) {
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
                $location.path("/ProAngularJS/chapter22/list");
            });
        };

        $scope.createProduct = function (product) {
            var newProduct = new $scope.productsResource(product);
            newProduct.$save().then(function (response) {
                $scope.products.push(angular.extend(newProduct, product));
                $location.path("/ProAngularJS/chapter22/list");
            });
        };

        $scope.editProduct = function (product) {
            $scope.currentProduct = product;
            $location.path("/ProAngularJS/chapter22/edit");
        };

        $scope.saveEdit = function (product) {
            if(angular.isDefined(product.objectId)) {
                $scope.updateProduct(product);
            } else {
                $scope.createProduct(product);
            }
            $scope.currentProduct = {};
        };

        $scope.cancelEdit = function () {
            if($scope.currentProduct && $scope.currentProduct.$get) {
                $scope.currentProduct.$get();
            }
            $scope.currentProduct = {};
            $location.path("/ProAngularJS/chapter22/list");
        }

        $scope.listProducts();
    });