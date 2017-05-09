'use strict';

(function () {

    angular.module('trainings')
        .component('trainingDetails', {
            binding: {
                training: '<'
            },
            templateUrl: 'app/components/trainings/trainingDetails/training.details.template.html',
            controller: function TrainingDetails() {

            }

        });

})();