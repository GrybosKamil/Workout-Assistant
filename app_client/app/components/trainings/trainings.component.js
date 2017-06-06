'use strict';

(function () {

    angular.module('trainings')
        .component('trainings', {
            templateUrl: 'app/components/trainings/trainings.template.html',
            controller: function Trainings($scope, $interval, Trainings) {
                let self = this;

                this.trainingHeaders = Trainings.getInitTrainings();

                this.training = function () {
                    return Trainings.getChosenTraining();
                };


                this.isTrainingChosen = function () {
                    return self.training() != undefined;
                };

                this.isChosen = function (training) {
                    if (!this.isTrainingChosen()) {
                        return false;
                    }
                    return training._id === this.training()._id;
                };

                this.showTraining = (training) => {
                    Trainings.getTraining(training._id);
                };

                (function () {

                    $('#trainings-panel')
                        .bind('scroll', function () {
                            if ($(this).scrollTop() + $(this).innerHeight() >= 0.9 * $(this)[0].scrollHeight) {
                                self.trainingHeaders = Trainings.getOldestTrainings();
                            }

                            if ($(this).scrollTop() === 0) {
                                self.trainingHeaders = Trainings.getNewestTrainings();
                            }
                        });

                })(jQuery);

            }

        });

})();
