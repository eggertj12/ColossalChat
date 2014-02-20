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
    },

    joinRoom: function(room) {
        var d = $q.defer();
        console.log("I created a room!");
        Socket.emit('joinroom', room, function(available) {
            d.resolve(available);
        });
    },

    sendmsg: function(msgdata) {
      // chatserver
      console.log("Sending a msg", msgdata);
      Socket.emit("sendmsg", function(msgdata) {

      });  
    }


   // Socket.on('updatechat', function (message) { 
   //   console.log(message);
 //   });

  };
}]);