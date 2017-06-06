'use strict';

(function () {

    angular.module('exercise')
        .component('exercise', {
            templateUrl: 'app/components/exercises/exercise/exercise.template.html',
            controller: function Exercise($scope, $window, $routeParams, Authorization, Exercises) {
                const self = this;

                const exerciseId = $routeParams.exerciseId;

                this.exercise = undefined;

                this.hasModerator = Authorization.hasModerator();

                Exercises.getExercise(exerciseId)
                    .then((exercise) => {
                        self.exercise = exercise;
                    })
                    .catch((error) => {

                    });

                this.deleteExercise = function () {
                    Exercises.deleteExercise(exerciseId)
                        .then((response) => {
                            $window.location.href = '/#!/exercises';
                        })
                        .catch((error) => {

                        });
                };

            }
        });
})();
