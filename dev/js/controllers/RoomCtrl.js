/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('RoomCtrl', ['$scope', '$location', 'Lang', 'ChatBackend', 'User',
function($scope, $location, Lang, ChatBackend, User) {

    // Shouldn't be here unless logged in
    if (!User.loggedIn) {
        $location.path('/');
    }

    $scope.rm = {
        name: '',
        room: ''
    };


    $scope.sendMsg = function() {
        var msgdata = {
            msg: $scope.msg
        };
        console.log(msgdata);
        //ChatBackend.sendmsg($scope.msgdata);
    };


}]);