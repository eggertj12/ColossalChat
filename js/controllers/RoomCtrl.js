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
        messages: {},
        users: {},
        ops: {}
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

    $scope.updateusersHandler = function (room, users, ops)
    {
        console.log('someone updating users ', room, users, ops);
        $scope.chat.users = users;
        $scope.chat.ops = ops;
    }

    ChatBackend.onUpdateChat($scope.updatechatHandler);
    ChatBackend.onUpdateUsers($scope.updateusersHandler);

}]);