/*globals angular */
'use strict';

angular.module('ColossalChat', ['ngRoute']).config(['$routeProvider',
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
/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('MainCtrl', ['$scope',
function($scope) {
  $scope.greeting = 'Welcome to Colossal Chat!';

}]);
/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('ChatCtrl', ['$scope',
function($scope) {

  $scope.greeting = 'Now you have reached a chat room.';

}]);