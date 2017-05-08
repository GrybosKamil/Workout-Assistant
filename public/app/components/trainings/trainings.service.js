'use strict';

(function () {

    angular.module('trainingsService', []).factory('Trainings', ['$http', function ($http) {
        return {
            getTrainings: function () {
                console.log("Get trainings");
                return $http.get('/trainings');
            }
        };
    }]);

})();
