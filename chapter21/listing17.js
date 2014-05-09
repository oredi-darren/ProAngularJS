/**
 * Created by dseet on 5/9/2014.
 */
angular.module("increment", [])
    .directive("increment", function () {
        return {
            restrict: "E",
            scope: {
                item: "=item",
                property: "@propertyName",
                restful: "@restful",
                method: "@methodName"
            },
            link: function (scope, element, attr) {
                var button = angular.element("<button>").text("+");
                button.addClass("btn btn-primary btn-xs");
                element.append(button);
                button.on("click", function () {
                    scope.$apply(function() {
                        scope.item[scope.property]++;
                        if(scope.restful) {
                            angular.copy(scope.item)[scope.method]();
                        }
                    })
                });
            }
        };
    });
