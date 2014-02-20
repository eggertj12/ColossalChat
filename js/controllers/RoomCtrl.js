/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('RoomCtrl', ['$scope', 'Lang', 'ChatBackend', 'User', 'Room',
function($scope, Lang, ChatBackend, User, Room) {

    $scope.msg = {
        roomName: '',
        userName: '',
        msg: ''
    };

    $scope.chat = {
        messages: {}
    };

    $scope.msg.roomName = Room.roomName;
    $scope.msg.userName = User.name;

    $scope.sendMsg = function() {

        $scope.msg.msg = $scope.inputText;
        console.log($scope.msg);
        ChatBackend.sendmsg($scope.msg);
    };

    $scope.updatechatHandler = function (data1, data2) {
        console.log('welcome to the handler', data1, data2);
        $scope.chat.messages = data2;
    };

    ChatBackend.onUpdateChat($scope.updatechatHandler);

}]);