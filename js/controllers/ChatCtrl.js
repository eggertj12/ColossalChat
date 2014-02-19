/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('ChatCtrl', ['$scope', 'Lang', 'ChatBackend',
function($scope, Lang, ChatBackend) {

  $scope.greeting = 'Now you have reached a chat room.';

  $scope.lang=Lang;

  // Making a viewmodel is the right thing to do?

  $scope.cr = {
    room: '',
    pass: ''
  };

  $scope.joinRoom = function() {
    ChatBackend.joinRoom($scope.cr);
  };





}]);