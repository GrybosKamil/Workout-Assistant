'use strict';

(function () {

    angular.module('exercisesService', []).factory('Exercises', ['$http', function ($http) {
        return {
            getExercises: function () {
                console.log("Get exercises");
                return $http.get('/exercises');
            }
        };
    }]);

})();
