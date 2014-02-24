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
            displayPmsgInput: false,
            displayOp: false
        },

        user: User
    };
    $scope.vm.msg.roomName = Room.roomName;

    //simple markup action handlers

    $scope.showDisplayMenu = function() {
        $scope.vm.dostuff.displayMenu = true;
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
        $scope.vm.dostuff.displayOp = $scope.isOp(Room);
        $scope.vm.dostuff.displayMenu = true;
        $scope.vm.dostuff.selUser = user;
    };

    // actions on users



    $scope.sendPrvmsg = function() {
        var promise;
       // promise = ChatBackend.sendPrvmsg($scope.dostuff.selUser, $scope.dostuff.msg);
        promise = ChatBackend.sendPrvmsg($scope.vm.dostuff.selUser, $scope.vm.pmsg.text);
        promise.then(function(available){
            console.log('pm: ', available);
        });
        $scope.vm.dostuff.displayPmsgInput = false;
    };

    // admin/op stuff

    $scope.isOp = function(room) {
        return angular.isDefined(room.ops[User.nick]);
    };

    $scope.kickUser = function() {
        var promise;
        if($scope.isOp(Room)) {
            promise = ChatBackend.kickUser($scope.vm.dostuff.selUser, $scope.vm.chat.room.roomName);
            promise.then(function(available) {
                // This is cargo cult programming
                console.log(available);
            });
        }
        console.log('Not an op');
    };

    $scope.opUser = function() {
        var promise;
        if($scope.isOp(Room)) {
            promise = ChatBackend.opUser($scope.vm.dostuff.selUser, $scope.vm.chat.room.roomName);
            promise.then(function(available) {
                console.log(available);
            });
        }
        console.log('Not an op');
    };

    $scope.deOpUser = function() {
        var promise;
        if($scope.isOp(Room)) {
            promise = ChatBackend.deOpUser($scope.vm.dostuff.selUser, $scope.vm.chat.room.roomName);
            promise.then(function(available) {
                console.log(available);
            });
        }
        console.log('Not an op');
    };

    $scope.banUser = function() {
        var promise;
        if($scope.isOp(Room)) {
            promise = ChatBackend.banUser($scope.vm.dostuff.selUser, $scope.vm.chat.room.roomName);
            promise.then(function(available) {
                console.log(available);
            });
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
            $scope.vm.dostuff.displayOp = $scope.isOp(Room);
        }
    };
    // Too global
    $scope.userlistHandler = function (userlist) {
    };

    $scope.recvPrvmsgHandler = function(from, msg) {
        
        // needs more 
        console.log(from, ': ', msg);
    };

    $scope.userKickedHandler = function(roomn, usern, usersocketn) {
        console.log(roomn, usern, usersocketn);
        if(usern === $scope.vm.user.nick) {
            $scope.leave();
        }

    };

    $scope.userOppedHandler = function(roomn, usern, usersocketn) {
        console.log('Just opped ', usersocketn, ' in ', roomn);
        // Updateusershandler should take care of updating lists
    };

    $scope.userDeOppedHandler = function(roomn, usern, usersocketn) {
        console.log(usern, usersocketn, ' was just deopped in ', roomn);
    };

    $scope.userBannedHandler = function(roomn, usern, usersocketn) {
        console.log(usern, usersocketn, 'was just banned in ', roomn);
        if(usern === $scope.vm.user.nick) {
            $scope.leave();
        }
    };

    //Bind chatbackend thingamabobs

    ChatBackend.onUpdateChat($scope.updatechatHandler);
    ChatBackend.onUpdateUsers($scope.updateusersHandler);
    ChatBackend.onUserList($scope.userlistHandler);
    ChatBackend.onRecvPrvMessage($scope.recvPrvmsgHandler);
    ChatBackend.onKicked($scope.userKickedHandler);
    ChatBackend.onOpped($scope.userOppedHandler);
    ChatBackend.onDeOpped($scope.userDeOppedHandler);
    ChatBackend.onBanUser($scope.userBannedHandler);

    // Request user list.
    ChatBackend.requestUserlist();

}]);