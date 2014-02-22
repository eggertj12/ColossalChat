/*globals angular, io */
'use strict';

angular.module('ColossalChat')
.factory('Socket', ['socketFactory', 'Settings',
function(socketFactory, Settings) {
    return socketFactory({
        ioSocket: io.connect(Settings.BACKEND_URL)
    });
}]);

