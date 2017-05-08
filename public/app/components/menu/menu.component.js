'use strict';

(function () {

    angular.module('menu')
        .component('menu', {
            templateUrl: 'app/components/menu/menu.template.html',
            controller: function Main($scope, $location) {
                let self = this;

                $scope.isActive = function (viewLocation) {
                    return viewLocation === $location.path();
                };

            }
        });

})();
