'use strict';

(function () {
    angular.module('exercises')
        .component('exercises', {
            templateUrl: 'app/components/exercises/exercises.template.html',
            controller: function Exercises(Exercises) {

                this.sortType = '';
                this.sortingUsed = false;

                Exercises.getExercises().then((response) => {
                    this.exercises = response.data;
                });

                this.changeSorting = function (newSorting) {
                    this.sortType = newSorting;
                }

            }

        });
})();
