'use strict';

(function () {

    angular.module('trainingDetails')
        .component('trainingDetails', {
            bindings: {
                training: '<'
            },
            templateUrl: 'app/components/trainings/training-details/training-details.template.html',
            controller: function TrainingDetails($scope, Trainings) {
                let self = this;


            }

        });

})();