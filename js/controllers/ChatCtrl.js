/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('ChatCtrl', ['$scope', 'Lang', 'ChatBackend', 'User',
function($scope, Lang, ChatBackend, User) {

    $scope.greeting = 'Now you have reached a chat room.';

    $scope.lang=Lang;
    $scope.user=User;

    // Making a viewmodel is the right thing to do?

    $scope.vm = {
        rooms: {},
        room: '',
        pass: ''
    };

    $scope.roomlistHandler = function(data) {
        console.log(data);
        $scope.vm.rooms = data;
    };

    $scope.joinRoom = function() {
        ChatBackend.joinRoom($scope.cr);
    };

    ChatBackend.onRoomlist($scope.roomlistHandler);
    ChatBackend.getRooms();

}]);