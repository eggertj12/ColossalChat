'use strict';

angular.module('ColossalChat')
.filter('count', [function(){
    return function(obj) {
        return _.size(angular.copy(obj));
    };
}]);