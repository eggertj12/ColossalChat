/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('RoomCtrl', ['$scope', '$location', 'Lang', 'ChatBackend', 'User', 'Room', 'Roomjoin',
function($scope, $location, Lang, ChatBackend, User, Room, Roomjoin) {

    // Shouldn't be here unless logged in
    if (!User.loggedIn) {
        $location.path('/');
    }

    $scope.vm = {
        msg: {
            roomName: '',
            userName: '',
            msg: ''
        },

        chat: {
            messages: {},
            users: [],
            ops: {}
        },
        
        dostuff: {
            displayMenu: false,
            selUser: ''
        }
    };

    $scope.vm.msg.roomName = Room.roomName;
    $scope.vm.msg.userName = User.name;

    $scope.showDisplayMenu = function() {
        $scope.vm.dostuff.displayMenu = true;
        console.log($scope.vm.dostuff.displayMenu);
    };

    $scope.createTestRoom = function () {
        Roomjoin.room = 'IX';
        $scope.vm.msg.roomName = 'IX';
        $scope.vm.msg.userName = 'Tester';
        User.name = 'Tester';
        ChatBackend.addUser(User.name);
        ChatBackend.joinRoom(Roomjoin);
    };

    $scope.sendMsg = function() {

        $scope.vm.msg.msg = $scope.inputText;
        console.log($scope.vm.msg);
        ChatBackend.sendmsg($scope.vm.msg);
    };

    
    $scope.actionUser = function(user) {
        $scope.vm.dostuff.displayMenu = true;
        $scope.vm.dostuff.selUser = user;
        console.log($scope.vm.dostuff.selUser, $scope.vm.dostuff.displayMenu);
    };


    // Chatbackend handlers

    $scope.updatechatHandler = function (data1, data2) {
        if(data1 === Room.room) {
            $scope.vm.chat.messages = data2;
        }
        
    };

    $scope.updateusersHandler = function (room, users, ops) {
        console.log('someone updating users ', room, users, ops);
        $scope.vm.chat.users = users;
        $scope.vm.chat.ops = ops;
    };

    $scope.userlistHandler = function (userlist) {
        $scope.vm.chat.users = userlist;
    };

    ChatBackend.onUpdateChat($scope.updatechatHandler);
    ChatBackend.onUpdateUsers($scope.updateusersHandler);
    ChatBackend.onUserList($scope.userlistHandler);

}]);