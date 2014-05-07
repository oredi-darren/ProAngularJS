/**
 * Created by dseet on 5/7/2014.
 */
angular.module("exampleApp")
    .directive("triButton", function () {
        return {
            scope: { counter: "=counter" },
            link: function (scope, element, attr) {
                element.on("click", function () {
                    console.log("Button click: " + event.target.innerText);
                    scope.$apply(function () {
                        scope.counter++;
                    });
                });
            }
        };
    });
