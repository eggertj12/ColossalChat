/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('RoomCtrl', ['$scope', 'Lang', 'ChatBackend', 'User', 'Room', 'Roomjoin',
function($scope, Lang, ChatBackend, User, Room, Roomjoin) {

    $scope.msg = {
        roomName: '',
        userName: '',
        msg: ''
    };

    $scope.chat = {
        messages: {},
        users: [],
        ops: {}
    };
    $scope.dostuff = {
        displayMenu: false,
        selUser: ''
    };

    $scope.msg.roomName = Room.roomName;
    $scope.msg.userName = User.name;

    $scope.showDisplayMenu = function() {
        console.log($scope.dostuff.displayMenu);
    }

    $scope.createTestRoom = function () {
        Roomjoin.room = 'IX';
        $scope.msg.roomName = 'IX';
        $scope.msg.userName = 'Tester';
        User.name = 'Tester';
        ChatBackend.addUser(User.name);
        ChatBackend.joinRoom(Roomjoin);
    };

    $scope.sendMsg = function() {

        $scope.msg.msg = $scope.inputText;
        console.log($scope.msg);
        ChatBackend.sendmsg($scope.msg);
    };

    
    $scope.actionUser = function(user) {
        $scope.dostuff.displayMenu = true;
        $scope.dostuff.selUser = user;
        console.log($scope.dostuff.selUser, $scope.dostuff.displayMenu);
    };


    // Chatbackend handlers

    $scope.updatechatHandler = function (data1, data2) {
        if(data1 === Room.room) {
            $scope.chat.messages = data2;
        }
        
    };

    $scope.updateusersHandler = function (room, users, ops) {
        console.log('someone updating users ', room, users, ops);
        $scope.chat.users = users;
        $scope.chat.ops = ops;
    };

    $scope.userlistHandler = function (userlist) {
        $scope.chat.users = userlist;
    };

    ChatBackend.onUpdateChat($scope.updatechatHandler);
    ChatBackend.onUpdateUsers($scope.updateusersHandler);
    ChatBackend.onUserList($scope.userlistHandler);

}]);