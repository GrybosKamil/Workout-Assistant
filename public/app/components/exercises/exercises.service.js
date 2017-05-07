'use strict';

(function () {
    angular.module('exercisesService', []).factory('Exercises', ['$http', '$q', function($http, $q) {

        return {
            // call to get all exercises
            getExercises : function() {
                console.log("Get function");
                return $http.get('/exercises');
            }
        }

    }]);

})();
