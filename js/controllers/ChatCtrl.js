'use strict';

angular.module('ColossalChat')
.controller('ChatCtrl', ['$scope', '$location', '$modal', '$window', 'Lang', 'ChatBackend', 'User', 'Room',
function($scope, $location, $modal, $window, Lang, ChatBackend, User, Room) {
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

    $scope.contact = function() {
        console.log('ChatCrl was just contacted');
    };

    $scope.addRoom = function() {
        promise = ChatBackend.joinRoom({
            room: $scope.vm.room
        });

        promise.then(function(result) {
            console.log('Room created: ', result);
            if (result.available) {
                // Store created room so as not to double join
                Room.roomName = $scope.vm.room;
                $scope.vm.room = '';

                // Get a list of rooms
                ChatBackend.getRooms();
            }
        });

    };

    $scope.logout = function() {
        // Clear state and redirect
        ChatBackend.logout();
        User.loggedIn = false;
        $location.path('/');
    };

    $scope.joinRoom = function(room, noRedirect) {
        if (room === Room.roomName) {
            // If already in room just redirect
            $location.path('/room');
        } else {
            promise = ChatBackend.joinRoom({
                room: room,
                // two people in the same function and so little time
                pass: $scope.vm.pass
            });

            promise.then(function(result) {
                console.log('Room joined: ', result);
                if (result.available) {
                    Room.roomName = room;
                    if (!noRedirect) {
                        $location.path('/room');
                    }
                } else {
                    if (result.reason === 'banned') {
                        $window.alert('Can not join room ' + room + ': You are banned!');
                    } else if (result.reason === 'wrong password') {
                        $window.alert('Can not join room ' + room + ': Wrong password.');
                    }
                }
            });
        }
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

    $scope.updateusersHandler = function (roomn, usersn, opsn) {
        if (roomn === Room.roomName) {
            Room.users = usersn;
            Room.ops = opsn;
        }
    };

    $scope.updateChatHandler = function (roomid, history) {
        if (roomid === Room.roomName) {
            Room.msgs = history;
        }
    };

    // Set up listeners.
    ChatBackend.onRoomlist($scope.roomlistHandler);
    ChatBackend.onServerMessage($scope.serverMessageHandler);
    ChatBackend.onUpdateUsers($scope.updateusersHandler);
    ChatBackend.onUpdateChat($scope.updateChatHandler);

    // and remove them on scope destruction
    $scope.$on('$destroy', function() {
        ChatBackend.onRoomlist(null);
        ChatBackend.onServerMessage(null);
        ChatBackend.onUpdateUsers(null);
        ChatBackend.onUpdateChat(null);
    });

    // Everyone automatically joins the lobby but not redirected to there

    // Repeatedly crashing the server for some reason
    // if (User.loggedIn) {
    //     $scope.joinRoom('lobby', true);
    // }

    // request the roomlist
    ChatBackend.getRooms();
    console.log('getRooms');

}]);