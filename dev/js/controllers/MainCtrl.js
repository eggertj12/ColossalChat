/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('MainCtrl', ['$scope', 'Lang', 'ChatBackend',
function($scope, Lang, ChatBackend) {
  $scope.lang = Lang;

  // Set up a ViewModel to avoid possibility of nasty value overwriting
  $scope.vm = {
    nick: '',
    error: false,
    errorMessage: ''
  };

  $scope.addUser = function() {
    var promise;
    if ($scope.vm.nick === '') {
      $scope.vm.errorMessage = Lang.noNick;
      $scope.vm.error = true;
    } else {
      $scope.vm.error = false;
      promise = ChatBackend.addUser($scope.vm.nick);
      promise.then(function(available) {
        console.log(available);
      });
    }
  };
}]);