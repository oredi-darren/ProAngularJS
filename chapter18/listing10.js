/**
 * Created by dseet on 5/7/2014.
 */
/**
 * Created by dseet on 5/7/2014.
 */
angular.module("customServices", [])
    .service("logService", function () {
        return {
            messageCount: 0,
            log: function (msg) {
                console.log("DEBUG: " + (this.messageCount++) + " " + msg);
            }
        };
    });
