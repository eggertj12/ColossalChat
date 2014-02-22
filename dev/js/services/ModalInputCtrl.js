'use strict';

angular.module('ColossalChat')
.factory('ModalInputCtrl', [
    function() {
        return function($scope, $modalInstance) {
            $scope.ok = function () {
                $modalInstance.close($scope.value);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
    }
]);
