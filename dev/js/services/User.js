/* globals angular*/
'use strict';

angular.module('ColossalChat')
.factory('User', [
    function() {
        return {
            nick: '',
            loggedIn: false,
            op: [],
            pms: {}
        };
    }
]);