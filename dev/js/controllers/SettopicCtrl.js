'use strict';

angular.module('ColossalChat')
.controller('SettopicCtrl', ['$scope', '$modalInstance',
function($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close($scope.topic);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
