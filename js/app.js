/*globals angular */
'use strict';

angular.module('ColossalChat', ['ng', 'ngRoute', 'btford.socket-io'])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).
      when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);