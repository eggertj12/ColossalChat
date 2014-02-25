/* globals angular*/
'use strict';

angular.module('ColossalChat')
.factory('Room', [
    function() {
        return {
            roomName: '',
            topic: '',
            msgs: [],
            users: [],
            ops: [],
            pass: 'test',
            pwd: false
        };
    }
]);