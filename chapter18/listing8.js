/**
 * Created by dseet on 5/7/2014.
 */
angular.module("customDirectives", ["customServices"])
    .directive("triButton", function (logService) {
        return {
            scope: { counter: "=counter" },
            link: function (scope, element, attr) {
                element.on("click", function () {
                    logService.log("Button click: " + event.target.innerText);
                    scope.$apply(function () {
                        scope.counter++;
                    });
                });
            }
        };
    });
