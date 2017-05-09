'use strict';

(function () {

    angular.module('trainings')
        .component('trainingDetails', {
            bindings: {
                training: '<',
                reviews: '<'
            },
            templateUrl: 'app/components/trainings/training-details/training-details.template.html',
            controller: function TrainingDetails($scope, Trainings) {
                let self = this;



            }

        });

})();