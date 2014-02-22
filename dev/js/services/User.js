/* globals angular*/
'use strict';

angular.module('ColossalChat')
.factory('User', [
    function() {
        return {
            name: 'default',
            nick: '',
            loggedIn: false,
            op: []
        };
    }
]);