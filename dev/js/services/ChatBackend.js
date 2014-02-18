/*globals angular */
'use strict';

angular.module('ColossalChat')
.factory('ChatBackend', ['$q', 'Socket',
function($q, Socket) {
  return {
    addUser: function(username) {
      var d = $q.defer();
      Socket.emit('adduser', username, function(available) {
        d.resolve(available);
      });
      return d.promise;
    }
  };
}]);