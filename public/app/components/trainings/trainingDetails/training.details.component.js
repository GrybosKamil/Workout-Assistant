'use strict';

(function () {

    angular.module('trainings')
        .component('trainingDetails', {
            bindings: {
                training: '<',
                reviews: '<'
            },
            templateUrl: 'app/components/trainings/trainingDetails/training.details.template.html',
            controller: function TrainingDetails($scope, Trainings) {
                let self = this;



            }

        });

})();