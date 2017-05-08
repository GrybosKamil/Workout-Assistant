'use strict';

(function () {

    angular.module('trainingsService', []).factory('Trainings', ['$http', function ($http) {
        return {
            getTrainings: function () {
                return $http.get('/trainings');
            }
        }
    }]);

})();
