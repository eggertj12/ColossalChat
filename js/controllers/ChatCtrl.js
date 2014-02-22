/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('ChatCtrl', ['$scope', '$location', 'Lang', 'ChatBackend', 'User', 'Room', 'Roomjoin',
function($scope, $location, Lang, ChatBackend, User, Room, Roomjoin) {
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

    $scope.roomlistHandler = function(data) {
        console.log(data);
        $scope.vm.rooms = data;
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
    };

    $scope.joinRoom = function(room) {
        promise = ChatBackend.joinRoom({
            room: room
        });

        promise.then(function(result, reason) {
            console.log('Room joined: ', result, reason);
            if (result) {
                Room.roomName = room;
                $location.path('/room');
            }
        });
    };


    ChatBackend.onRoomlist($scope.roomlistHandler);
    ChatBackend.getRooms();

}]);