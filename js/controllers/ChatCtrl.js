/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('ChatCtrl', ['$scope',
function($scope) {

  $scope.greeting = 'Now you have reached a chat room.';

}]);