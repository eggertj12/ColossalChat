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
            roomName: Room.roomName,
            msg: ''
        },

        pmsg : {
            userName : '',
            msg: '',
            displayPmsgs: false
        },

        chat: {
            messages: {},
            room: Room
        },
        
        dostuff: {
            displayMenu: false,
            selUser: ''
        },

        user: User
    };
    $scope.vm.msg.roomName = Room.roomName;

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
        $scope.vm.msg.roomName = Room.roomName;
        $scope.vm.msg.msg = $scope.inputText;
        ChatBackend.sendmsg($scope.vm.msg);
    };

    
    $scope.actionUser = function(user) {
        $scope.vm.dostuff.displayMenu = true;
        $scope.vm.dostuff.selUser = user;
        console.log($scope.vm.dostuff.selUser, $scope.vm.dostuff.displayMenu);
    };

    // actions on users
    $scope.sendPrvmsg = function() {
        var promise;
        promise = ChatBackend.sendPrvmsg($scope.dostuff.selUser, $scope.dostuff.msg);
        promise.then(function(available){
            console.log(available);
        });
    };



    // Chatbackend handlers

    $scope.updatechatHandler = function (data1, data2) {
        if(data1 === Room.roomName) {
            $scope.vm.chat.messages = data2;
        }
        
    };

    $scope.updateusersHandler = function (roomn, usersn, opsn) {
        if (roomn === Room.roomName) {
            Room.users = usersn;
            Room.ops = opsn;
            console.log(usersn, $scope.vm.chat.users, opsn, $scope.vm.chat.ops);
        }
    };
    // Too global
    $scope.userlistHandler = function (userlist) {
        $scope.vm.chat.users = userlist;
    };

    $scope.recvPrvmsgHandler = function(from, msg) {
        console.alert(from, ': ', msg);
    };

    //Bind chatbackend thingamabobs

    ChatBackend.onUpdateChat($scope.updatechatHandler);
    ChatBackend.onUpdateUsers($scope.updateusersHandler);
    ChatBackend.onUserList($scope.userlistHandler);
    ChatBackend.onRecvPrvMessage($scope.recvprvmsgHandler);

}]);