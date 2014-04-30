/**
 * Created by dseet on 4/30/2014.
 */
angular.module("exampleApp.Services", [])
    .value("nowValue", new Date())
    .config(function() {
        console.log("Services module config: (no time)");
    })
    .run(function(startTime) {
        console.log("Services module run:" + startTime);
    })
    .service("days", function(nowValue) {
        this.today =  nowValue.getDay();
        this.tomorrow =  (this.today + 1) % 7;
    });