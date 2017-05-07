'use strict';

(function () {
    angular.module('exercises')
        .component('exercises', {
            templateUrl: 'app/components/exercises/exercises.template.html',
            controller: function Exercises(Exercises) {

                this.sorting = {
                    active: '',
                    descending: undefined
                };

                Exercises.getExercises().then((response) => {
                    this.exercises = response.data;
                });

                this.changeSorting = function (newSorting) {
                    this.sorting.active = newSorting;
                }

            }

        });
})();
