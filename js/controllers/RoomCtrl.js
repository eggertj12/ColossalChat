/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('RoomCtrl', ['$scope', 'Lang', 'ChatBackend',
function($scope, Lang, ChatBackend) {

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