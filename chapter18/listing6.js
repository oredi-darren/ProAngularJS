/**
 * Created by dseet on 5/7/2014.
 */
/**
 * Created by dseet on 5/7/2014.
 */
angular.module("customServices", [])
    .factory("logService", function () {
        var messageCount = 0;
        return {
            log: function (msg) {
                console.log("(LOG + " + messageCount++ + ") " + msg);
            }
        };
    });
