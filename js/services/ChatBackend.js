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
            console.log('Room: ', room, ' created.');
            Socket.emit('joinroom', room, function(available) {
                d.resolve(available);
            });
            return d.promise;
        },

        sendmsg: function(msgdata) {
          // chatserver
            console.log('Sending a msg', msgdata);
            Socket.emit('sendmsg', msgdata);
        },

        requestUserlist: function() {
            Socket.emit('users');
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
        },

        onUserList: function(handler) {
            Socket.on('userlist', handler);
        },

        onServerMessage: function(handler) {
            Socket.on('servermessage', handler);
        }
    };
}]);