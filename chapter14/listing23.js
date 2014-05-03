/**
 * Created by darren on 5/3/14.
 */
angular.module("exampleApp")
    .filter("labelCase", function() {
        return function(value, reverse) {
            if(angular.isString(value)) {
                var intermediate = reverse ? value.toUpperCase() : value.toLowerCase();
                return(reverse ? intermediate[0].toLowerCase() : intermediate[0].toUpperCase()) + intermediate.substr(1);
            } else {
                return value;
            }
        };
    })
    .filter("skip", function () {
        return function(data, count) {
            if(angular.isArray(data) && angular.isNumber(count)) {
                if(count < data.length && count > 0) {
                    return data.slice(count);
                }
            }
            return data;
        };
    })
    .filter('take', function($filter) {
        return function(data, skipCount, takeCount) {
            var skippedData = $filter("skip")(data, skipCount);
            return $filter("limitTo")(skippedData, takeCount);
        };
    });
