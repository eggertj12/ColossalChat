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
            Socket.emit('joinroom', room, function(available, reason) {
                d.resolve(available, reason);
            });
            return d.promise;
        },

        sendmsg: function(msgdata) {
          // chatserver
            Socket.emit('sendmsg', msgdata);
        },

        sendPrvmsg: function(user, msg) {
            var sendObj = {
                nick: user,
                message: msg
            };
            var d = $q.defer();
            Socket.emit('privatemsg', sendObj, function(available) {
                d.resolve(available);
            });
            return d.promise;
        },

        kickUser: function(usern, roomn) {
            var kickObj = {
                user: usern,
                room: roomn
            };
            var d = $q.defer();
            Socket.emit('kick', kickObj, function(available) {
                d.resolve(available);
            });
        },

        opUser: function(usern, roomn) {
            var opObj = {
                user: usern,
                room: roomn
            };
            var d = $q.defer();
            Socket.emit('op', opObj, function(available) {
                d.resolve(available);
            });
        },

        deopUser: function(usern, roomn) {
            var deopObj = {
                user: usern,
                room: roomn
            };
            var d = $q.defer();
            Socket.emit('deop', deopObj, function(available) {
                d.resolve(available);
            });
        },

        banUser: function(usern, roomn) {
            var banObj = {
                user: usern,
                room: roomn
            };
            var d = $q.defer();
            Socket.emit('ban', banObj, function(available) {
                d.resolve(available);
            });
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
        },

        onRecvPrvMessage: function(handler) {
            Socket.on('recv_privatemsg', handler);
        }
    };
}]);