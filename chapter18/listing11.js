/**
 * Created by dseet on 5/7/2014.
 */
/**
 * Created by dseet on 5/7/2014.
 */
angular.module("customServices", [])
    .provider("logService", function () {
        return {
            $get: function () {
                return {
                    messageCount: 0,
                    log: function (msg) {
                        console.log("(LOG + " + (this.messageCount++) + ") " + msg);
                    }
                };
            }
        };
    });
