/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('MainCtrl', ['$scope', '$location', 'Lang', 'ChatBackend', 'User',
function($scope, $location, Lang, ChatBackend, User) {
    $scope.lang = Lang;

    // Set up a ViewModel to avoid possibility of nasty value overwriting
    $scope.vm = {
        user: User,
        error: false,
        errorMessage: ''
    };

    $scope.addUser = function() {
        var promise;
        
        if ($scope.vm.user.nick === '') {
            $scope.vm.errorMessage = Lang.noNick;
            $scope.vm.error = true;
        } else {
            $scope.vm.error = false;
            promise = ChatBackend.addUser($scope.vm.user.nick);
            
            promise.then(function(available) {
                if(available) {
                    $scope.vm.user.loggedIn = true;
                    $scope.vm.user.name = $scope.vm.nick;
                    User.nick = $scope.vm.nick;
                    $location.path('/chat');

                } else {
                    $scope.vm.errorMessage = Lang.unavailableNick;
                    $scope.vm.error = true;
                }
            });
        }
    };
}]);