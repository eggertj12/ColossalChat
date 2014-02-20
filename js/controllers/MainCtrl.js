/*globals angular */
'use strict';

angular.module('ColossalChat')
.controller('MainCtrl', ['$scope', 'Lang', 'ChatBackend', 'User',
function($scope, Lang, ChatBackend, User) {
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
            var x = promise.then(function(available) {
                console.log(available);
            });
            if(x) {
                $scope.vm.loggedIn = true;
                User.name = $scope.vm.nick;
            }
        }
    };
}]);