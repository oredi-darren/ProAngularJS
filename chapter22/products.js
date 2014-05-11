/**
 * Created by dseet on 5/9/2014.
 */
angular.module("exampleApp", ["increment", "ngResource", "ngRoute"])
    .constant("baseUrl", "https://api.parse.com/1/classes/Products/")
    .factory("productsResource", function ($resource, baseUrl) {
        return $resource(baseUrl + ":id", { id: "@objectId" }, {
            query: {
                method: "GET", isArray: true, transformResponse: function(data, headers) {
                    return JSON.parse(data).results;
                }
            },
            update: { method: "PUT" }
        });
    })
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when("/ProAngularJS/chapter22/edit/:id", {
            templateUrl: "/ProAngularJS/chapter22/editorView.html",
            controller: "editCtrl"
        });

        $routeProvider.when("/ProAngularJS/chapter22/create/", {
            templateUrl: "/ProAngularJS/chapter22/editorView.html",
            controller: "editCtrl"
        });

        $routeProvider.otherwise({
            templateUrl: "/ProAngularJS/chapter22/tableView.html",
            controller: "tableCtrl",
            resolve: {
                data: function(productsResource) {
                    return productsResource.query();
                }
            }
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
    .controller("defaultCtrl", function($scope, $location, $routeParams, productsResource) {
        $scope.data = {};
        $scope.currentProduct = null;

        $scope.deleteProduct = function (product) {
            product.$delete().then(function() {
                $scope.data.products.splice($scope.data.products.indexOf(product), 1);
            });
        };

        $scope.createProduct = function (product) {
            var newProduct = new productsResource(product);
            newProduct.$save().then(function (response) {
                $scope.data.products.push(angular.extend(newProduct, product));
                $location.path("/ProAngularJS/chapter22/list");
            });
        };

    })
    .controller("tableCtrl", function ($scope, $location, $route, data) {
        $scope.data.products = data;
        $scope.refreshProducts = function() {
            $route.reload();
        }
    })
    .controller("editCtrl", function ($scope, $routeParams, $location) {
        $scope.currentProduct = null;

        if($location.path().indexOf("/ProAngularJS/chapter22/edit/") == 0) {
            var id = $routeParams["id"];
            for (var i = 0; i < $scope.data.products.length; i++) {
                if($scope.data.products[i].objectId == id) {
                    $scope.currentProduct = $scope.data.products[i];
                    break;
                }
            }
        }

        $scope.cancelEdit = function () {
            $location.path("/ProAngularJS/chapter22/list");
        }

        $scope.updateProduct = function (product) {
            angular.copy(product).$update().then(function() {
                $location.path("/ProAngularJS/chapter22/list");
            });
        };

        $scope.saveEdit = function (product) {
            if(angular.isDefined(product.objectId)) {
                $scope.updateProduct(product);
            } else {
                $scope.createProduct(product);
            }
            $scope.currentProduct = {};
        };
    });