'use strict';

(function () {
    angular.module('users')
        .component('users', {
            templateUrl: 'app/components/users/users.template.html',
            controller: function Users(Authorization, Users) {

                let self = this;

                this.users = [];

                this.hasAdministrator = Authorization.hasAdministrator();

                Users.getUsers()
                    .then((usersList) => {
                        this.users = usersList;
                        // this.initFilters(this.exercises);
                    });

                this.getUsers = function () {
                    return this.users;
                };

                // this.initFilters = function (exercises) {
                //     let allMuscles = exercises.map(function (ex) {
                //         return ex.muscles;
                //     });
                //
                //     let musclesArray = [].concat.apply([], allMuscles);
                //     this.musclesAv = [...new Set(musclesArray)];
                //
                //     let allRequirements = exercises.map(function (ex) {
                //         return ex.requirements;
                //     });
                //     let reqArray = [].concat.apply([], allRequirements);
                //     this.requirementsAv = [...new Set(reqArray)];
                //
                // };
                //
                // this.changeSorting = function (newSorting) {
                //
                //     if (this.sorting.active === newSorting) {
                //         this.sorting.descending = !this.sorting.descending;
                //     } else {
                //         this.sorting.active = newSorting;
                //         this.sorting.descending = true;
                //     }
                //
                //     this.sorting.active = newSorting;
                // };
                //
                //
                // this.getIcon = function (column) {
                //     if (this.sorting.active === column) {
                //         return this.sorting.descending ?
                //             'glyphicon-triangle-top'
                //             : 'glyphicon-triangle-bottom';
                //     }
                //
                //     return 'glyphicon-triangle-top';
                // };
                //
                // this.toggleSelection = function (option, value) {
                //     let index = option.indexOf(value);
                //
                //     if (index > -1) {
                //         option.splice(index, 1);
                //     } else {
                //         option.push(value);
                //     }
                // };
                //
                // this.togglePlace = function (value) {
                //     value.selected = true;
                //     if (this.filter.selectedPlace === null) {
                //         this.filter.selectedPlace = value;
                //
                //     } else if (this.filter.selectedPlace !== value) {
                //         this.filter.selectedPlace.selected = false;
                //         this.filter.selectedPlace = value;
                //
                //     } else {
                //         this.filter.selectedPlace = null;
                //         value.selected = false;
                //     }
                // }

            }

        });
})();
