'use strict';

(function () {

    angular.module('trainingDetailsService', []).factory('TrainingDetails', ['$http', function ($http) {
        return {
            getTraining: function (trainingDetail) {
                return $http.get('/trainings');
            }
        };
    }]);

})();
