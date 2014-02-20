/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('RoomCtrl', ['$scope', 'Lang', 'ChatBackend', 'User', 'Room',
function($scope, Lang, ChatBackend, User, Room) {

    $scope.rm = {
        roomName: '',
        userName: '',
        msg: ''
    };

    $scope.rm.roomName = Room.roomName;
    $scope.rm.userName = User.name;

    $scope.sendMsg = function() {

        $scope.rm.msg = $scope.msg;
        console.log($scope.rm);
        ChatBackend.sendmsg($scope.rm);
    };


}]);