/*globals angular */
'use strict';

angular.module('ColossalChat')
.factory('ChatBackend', ['$q', 'Socket',
function($q, Socket) {
    return {

        // ------------------------------------------------
        // emit actions
        // ------------------------------------------------
        addUser: function(username) {
            var d = $q.defer();
            Socket.emit('adduser', username, function(available) {
                d.resolve(available);
            });
            return d.promise;
        },

        getRooms: function() {
            console.log('Get a roomlist!');
            Socket.emit('rooms');
        },

        joinRoom: function(room) {
            var d = $q.defer();
            console.log('I created a room!');
            Socket.emit('joinroom', room, function(available) {
                d.resolve(available);
            });
        },

        sendmsg: function(msgdata) {
          // chatserver
            console.log('Sending a msg', msgdata);
            Socket.emit('sendmsg', msgdata);
        },

        // ------------------------------------------------
        // register listeners
        // ------------------------------------------------

        onRoomlist: function(handler) {
            Socket.on('roomlist', handler);
        },

        onUpdateChat: function(handler) {

            Socket.on('updatechat', handler);
        },

        onUpdateUsers: function(handler) {
            Socket.on('updateusers', handler);
        }
    };
}]);