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

                this.filterPlacesAv = [
                    "outdoor",
                    "indoor"
                ];

                Exercises.getExercises().then((response) => {
                    this.exercises = response.data;
                    this.initFilters(this.exercises);
                });


                this.initFilters = function (exercises) {
                    let allMuscles = exercises.map(function (ex) {
                        return ex.muscles;
                    });

                    let musclesArray = [].concat.apply([], allMuscles);
                    this.musclesAv = [...new Set(musclesArray)];
                    console.log(this.musclesAv);

                    let allRequirements = exercises.map(function (ex) {
                        return ex.requirements;
                    });
                    let reqArray = [].concat.apply([], allRequirements);
                    this.requirementsAv = [...new Set(reqArray)];
                    console.log(this.requirementsAv);

                };

                this.changeSorting = function (newSorting) {

                    if (this.sorting.active === newSorting) {
                        this.sorting.descending = !this.sorting.descending;
                    } else {
                        this.sorting.active = newSorting;
                        this.sorting.descending = false;
                    }

                    this.sorting.active = newSorting;
                };


                this.getIcon = function (column) {
                    if (this.sorting.active === column) {
                        return this.sorting.descending ?
                            'glyphicon-triangle-top'
                            : 'glyphicon-triangle-bottom';
                    }

                    return 'glyphicon-triangle-top';
                };

            }

        });
})();
