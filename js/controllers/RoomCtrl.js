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
            messages: Room.msgs,
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

    $scope.sendMsg = function() {
        $scope.vm.msg.roomName = Room.roomName;
        $scope.vm.msg.msg = $scope.inputText;
        ChatBackend.sendmsg($scope.vm.msg);
        $scope.inputText = '';
    };
    
    $scope.actionUser = function(user) {
        $scope.vm.dostuff.displayOp = $scope.isOp(Room);
        $scope.vm.dostuff.displayMenu = true;
        $scope.vm.dostuff.selUser = user;
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

        promise = ChatBackend.sendPrvmsg(user, msg);
        promise.then(function(res){
            if (res) {
                $scope.vm.user.pms[user].messages.push({text: msg, from: 'me'});
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
    };

    // admin/op stuff

    $scope.isOp = function(room, user) {
        user = (angular.isDefined(user) ? user : User.nick);
        return angular.isDefined(room.ops[user]);
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
    $scope.userlistHandler = function () {
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

    // and remove those same thingamsomethings on scope destruction
    $scope.$on('$destroy', function() {
        ChatBackend.onUpdateChat(null);
        ChatBackend.onUpdateUsers(null);
        ChatBackend.onUserList(null);
        ChatBackend.onRecvPrvMessage(null);
        ChatBackend.onKicked(null);
        ChatBackend.onOpped(null);
        ChatBackend.onDeOpped(null);
        ChatBackend.onBanUser(null);
    });


    // Request user list.
    ChatBackend.requestUserlist();

}]);