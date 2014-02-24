'use strict';

angular.module('ColossalChat')
.controller('ChatCtrl', ['$scope', '$location', '$modal', 'Lang', 'ChatBackend', 'User', 'Room',
function($scope, $location, $modal, Lang, ChatBackend, User, Room) {
    var promise;

    // Shouldn't be here unless logged in
    if (!User.loggedIn) {
        $location.path('/');
    }

    $scope.greeting = 'Now you have reached a chat room.';
    $scope.lang=Lang;

    // Making a viewmodel is the right thing to do?

    $scope.vm = {
        user: User,
        rooms: {},
        room: '',
        pass: ''
    };

    $scope.addRoom = function() {
        promise = ChatBackend.joinRoom({
            room: $scope.vm.room
        });

        promise.then(function(result) {
            console.log('Room created: ', result);
            if (result) {
                ChatBackend.getRooms();
            }
        });

        $scope.vm.room = '';
    };

    $scope.logout = function() {
        ChatBackend.logout();
        User.loggedIn = false;
        $location.path('/');
    };

    $scope.joinRoom = function(room, noRedirect) {
        promise = ChatBackend.joinRoom({
            room: room
        });

        promise.then(function(result, reason) {
            console.log('Room joined: ', result, reason);
            if (result) {
                Room.roomName = room;
                if (!noRedirect) {
                    $location.path('/room');
                }
            }
        });
    };

    $scope.isOp = function(room) {
        return angular.isDefined(room.ops[User.nick]);
    };

    $scope.showSetTopic = function(room, roomName) {
        var modalInstance = $modal.open({
            templateUrl: 'templates/settopic.html'
        });

        modalInstance.result.then(function(topic) {
        
            promise = ChatBackend.setTopic({
                room: roomName,
                topic: topic
            });

            promise.then(function(result) {
                if (result) {
                    Room.topic = topic;
                    room.topic = topic;
                }
            });
        
        }, function () {
            console.log('Settopic cancelled');
        });

    };

    // -----------------------------------------
    // Listeners
    // -----------------------------------------
    $scope.roomlistHandler = function(data) {
        $scope.vm.rooms = data;
    };

    $scope.serverMessageHandler = function(type, room) {
        if (type === 'join' && room !== Room.roomName) {
            // Someone else created a room, call for updated list
            ChatBackend.getRooms();
        } else {
            // All other servermessages relate to users joining or leaving, so update roomlist also
            ChatBackend.getRooms();
        }
    };

    // Set up listeners.
    ChatBackend.onRoomlist($scope.roomlistHandler);
    ChatBackend.onServerMessage($scope.serverMessageHandler);

    // Everyone automatically joins the lobby but not redirected to there
    if (User.loggedIn) {
        $scope.joinRoom('lobby', true);
    }

    // request the roomlist
    ChatBackend.getRooms();

}]);