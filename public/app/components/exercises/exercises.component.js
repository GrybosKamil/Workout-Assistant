'use strict';

(function () {
    angular.module('exercises')
        .component('exercises', {
            templateUrl: 'app/components/exercises/exercises.template.html',
            controller: function Exercises(Exercises) {

                Exercises.getExercises().then((response) => {
                    this.exercises = response.data;
                });


            }

        });
})();
