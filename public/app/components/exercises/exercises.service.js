'use strict';

(function () {
    angular.module('exercisesService', []).factory('Exercises', ['$http', function($http) {

        return {
            // call to get all exercises
            get : function() {
                console.log("Get function");
                return $http.get('/exercises');
            }
        }

    }]);

})();
