/* globals angular*/
'use strict';

angular.module('ColossalChat')
.factory('Room', [
    function() {
        return {
            roomName: 'default'
        };
    }
]);