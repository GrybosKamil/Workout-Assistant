'use strict';

(function () {
    angular.module('exercises')
        .component('exercises', {
            templateUrl: 'app/components/exercises/exercises.template.html',
            controller: function Exercises(Exercises) {
                this.exercises = Exercises.get();
                console.log(this.exercises);
            }

        });
})();
