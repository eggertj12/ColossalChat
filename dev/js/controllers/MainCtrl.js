/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('MainCtrl', ['$scope', 'LangService',
function($scope, LangService) {
  $scope.lang = LangService;

  // Set up a ViewModel to avoid possibility of nasty value overwriting
  $scope.vm = {
    nick: ''
  };

}]);