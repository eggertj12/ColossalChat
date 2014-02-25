/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('RoomCtrl', ['$scope', '$location', 'Lang', 'ChatBackend', 'User', 'Room',
function($scope, $location, Lang, ChatBackend, User, Room) {

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
            text: '',
            displayPmsgs: false
        },

        chat: {
            messages: {},
            room: Room
        },
        
        dostuff: {
            displayMenu: false,
            selUser: '',
            displayPmsgInput: false
        },

        user: User
    };
    $scope.vm.msg.roomName = Room.roomName;

    //simple markup action handlers

    $scope.showDisplayMenu = function() {
        $scope.vm.dostuff.displayMenu = true;
        console.log($scope.vm.dostuff.displayMenu);
    };

    $scope.dispPrvmsg = function() {
        $scope.vm.dostuff.displayPmsgInput = true;
    };


    $scope.createTestRoom = function () {
        $scope.vm.msg.roomName = 'IX';
        $scope.vm.msg.userName = 'Tester';
        User.name = 'Tester';
        ChatBackend.addUser(User.name);
        ChatBackend.joinRoom({
            room: 'IX'
        });
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


    $scope.startPrvchat = function() {
        var user = $scope.vm.dostuff.selUser,
            pms = $scope.vm.user.pms;

        if (angular.isDefined(pms[user])) {
            pms[user].open = true;
        } else {
            pms[user] = {
                open: true,
                messages: []
            };
        }
    };


    $scope.sendPrvmsg = function(user, msg) {
        var promise;
       // promise = ChatBackend.sendPrvmsg($scope.dostuff.selUser, $scope.dostuff.msg);
        promise = ChatBackend.sendPrvmsg(user, msg);
        promise.then(function(res){
            $scope.vm.user.pms[user].messages.push({text: msg, from: 'me'});
            if (res) {
            }
        });
    };

    $scope.recvPrvmsgHandler = function(from, msg) {
        var pms = $scope.vm.user.pms;

        if (angular.isDefined(pms[from])) {
            pms[from].open = true;
            pms[from].messages.push({text: msg, from: from});
        } else {
            pms[from] = {
                open: true,
                messages: [{text: msg, from: from}]
            };
        }
        
        // needs more 
        console.log(from, ': ', msg);
    };

    // admin/op stuff

    $scope.isOp = function(room) {
        return angular.isDefined(room.ops[User.nick]);
    };

    $scope.kickUser = function() {
        if($scope.isOp($scope.chat.room)) {
            ChatBackend.kickUser($scope.vm.dostuff.selUser, $scope.vm.chat.room.roomName);
        }
        console.log('Not an op');
    };

    $scope.leave = function() {
        ChatBackend.partRoom(Room.roomName);
        $location.path('/chat/');
    };

    $scope.logout = function() {
        ChatBackend.logout();
        User.loggedIn = false;
        $location.path('/');
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
    //    $scope.vm.chat.users = userlist;
    };

    $scope.userKickedHandler = function() {

    };

    //Bind chatbackend thingamabobs

    ChatBackend.onUpdateChat($scope.updatechatHandler);
    ChatBackend.onUpdateUsers($scope.updateusersHandler);
    ChatBackend.onUserList($scope.userlistHandler);
    ChatBackend.onRecvPrvMessage($scope.recvPrvmsgHandler);
    ChatBackend.onKicked($scope.userKickedHandler);

    // Request user list.
    ChatBackend.requestUserlist();

}]);