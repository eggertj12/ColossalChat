/* globals angular*/
'use strict';

angular.module('ColossalChat')
.factory('Roomjoin', [
    function() {
        return {
            room: 'default',
            pass: ''
        };
    }
]);