/**
 * Created by dseet on 5/9/2014.
 */
angular.module("increment", [])
    .directive("increment", function () {
        return {
            restrict: "E",
            scope: {
                value: "=value"
            },
            link: function (scope, element, attr) {
                var button = angular.element("<button>").text("+");
                button.addClass("btn btn-primary btn-xs");
                element.append(button);
                button.on("click", function () {
                    scope.$apply(function() {
                        scope.value++;
                    })
                });
            }
        };
    });
