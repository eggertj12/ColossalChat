'use strict';

angular.module('ColossalChat')
.filter('users', [function(){
    return function(obj, length) {
        // Default to 5 names if not given a value
        var count = (angular.isDefined(length) ? length : 5),
            html = '',
            i,

            // Converts obj to an array of values
            arr = _.values(angular.copy(obj));

        count = Math.min(arr.length, count);

        for (i = 0; i < count; i++) {
            html += arr[i] + ', ';
        }

        if (arr.length > count) {
            html += 'and ' + (arr.length - count) + ' more';
        } else {
            html = html.replace(/[,\s]+$/gm,'');
        }

        return html;
    };
}]);