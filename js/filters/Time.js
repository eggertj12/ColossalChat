'use strict';

angular.module('ColossalChat')
.filter('time', [function(){
    return function(ts) {
        return moment(ts).format('hh:mm');
    };
}]);