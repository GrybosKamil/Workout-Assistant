'use strict';

(function () {

    angular.module('exercisesService', [])
        .service('Exercises', exercises);

    exercises.$inject = ['$http', 'Authorization'];
    function exercises($http, Authorization) {
        let self = this;

        const getExercises = function () {
            return pullExercises()
                .then((response) => {
                    return response.data;
                });

        };

        const pullExercises = function () {
            return $http.get('/api/exercises');
        };

        const getExercise = function (exerciseId) {
            return pullExercise(exerciseId)
                .then((response) => {
                    return response.data;
                });

        };
        const pullExercise = function (exerciseId) {
            return $http.get('/api/exercises/' + exerciseId);
        };

        const deleteExercise = function (exerciseId) {
            return $http.delete('/api/exercises/' + exerciseId,
                Authorization.authorizationHeader()
            )
        };

        return {
            getExercises: getExercises,
            pullExercises: pullExercises,
            getExercise: getExercise,
            pullExercise: pullExercise,
            deleteExercise: deleteExercise
        };
    }


})
();
