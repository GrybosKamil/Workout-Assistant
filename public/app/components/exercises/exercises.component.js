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

                this.filter = {
                    selectedPlace: '',
                    selectedReq: [],
                    selectedMuscles: []
                };


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

                this.toggleSelection = function (option, value) {
                    console.log(option);
                    console.log(value);

                    let indx = option.indexOf(value);

                    if(indx > -1){
                        option.splice(indx, 1);
                    } else {
                        option.push(value);
                    }
                    console.log(this.filter);
                };

                this.togglePlace = function (value) {
                    if(this.filter.selectedPlace === '' || this.filter.selectedPlace !== value) {
                        this.filter.selectedPlace = value;
                        console.log(value);
                    } else {
                        this.filter.selectedPlace = '';
                    }
                    console.log(this.filter);
                }

            }

        });
})();
