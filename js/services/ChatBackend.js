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
            Socket.emit('rooms');
        },

        joinRoom: function(room) {
            var d = $q.defer();
            Socket.emit('joinroom', room, function(available, reason) {
                d.resolve({available: available, reason: reason});
            });
            return d.promise;
        },

        partRoom: function(room) {
            Socket.emit('partroom', room);
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
            return d.promise;
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
            return d.promise;
        },

        deOpUser: function(usern, roomn) {
            var deopObj = {
                user: usern,
                room: roomn
            };
            var d = $q.defer();
            Socket.emit('deop', deopObj, function(available) {
                d.resolve(available);
            });
            return d.promise;
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
            return d.promise;
        },

        requestUserlist: function() {
            Socket.emit('users');
        },

        setTopic: function(topic) {
            var d = $q.defer();
            Socket.emit('settopic', topic, function(success) {
                d.resolve(success);
            });
            return d.promise;
        },

        logout: function() {
            Socket.emit('logout');
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
        },

        onKicked: function(handler) {
            Socket.on('kicked', handler);
        },

        onOpped: function(handler) {
            Socket.on('opped', handler);
        },

        onDeOpped: function(handler) {
            Socket.on('deopped', handler);
        },

        onBanUser: function(handler) {
            Socket.on('banned', handler);
        }

    };
}]);