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

                this.activeSorting = this.sorting.active;

                Exercises.getExercises().then((response) => {
                    this.exercises = response.data;
                });

                this.changeSorting = function (newSorting) {

                    if(this.sorting.active === newSorting){
                        this.sorting.descending = !this.sorting.descending;
                    } else {
                        this.sorting.active = newSorting;
                        this.sorting.descending = false;
                    }

                    this.sorting.active = newSorting;
                };


                this.getIcon = function (column) {
                    if(this.sorting.active === column) {
                        return this.sorting.descending ?
                            'glyphicon-triangle-top'
                            : 'glyphicon-triangle-bottom';
                    }

                    return 'glyphicon-triangle-top';
                }

            }

        });
})();
