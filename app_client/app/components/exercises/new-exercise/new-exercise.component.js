'use strict';

(function () {

    angular.module('newExercise')
        .component('newExercise', {
            templateUrl: 'app/components/exercises/new-exercise/new-exercise.template.html',
            controller: function NewExercise($scope, $window, Authorization, Exercises) {
                const self = this;

                if (!Authorization.isLoggedIn()) {
                    $window.location.href = '/#!/login';
                    return;
                }
                if (!Authorization.hasModerator()) {
                    $window.location.href = '/#!/404';
                    return;
                }

                this.places = [ "indoor", "outdoor"];
                this.chosenMuscles = [];
                this.chosenRequirements = [];

                this.exercise = undefined;

                this.createNewExercise = function () {
                    Exercises.cr
                        .then((response) => {

                        })
                        .catch((error) => {

                        });
                };

            }
        });
})();
