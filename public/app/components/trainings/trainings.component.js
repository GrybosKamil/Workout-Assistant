'use strict';

(function () {

    angular.module('trainings')
        .component('trainings', {
            templateUrl: 'app/components/trainings/trainings.template.html',
            controller: function Trainings($scope, $interval, Trainings) {
                let self = this;

                this.trainingHeaders = Trainings.getInitTrainings();


                this.chosenTraining = () => {
                    return Trainings.chosenTraining;
                };

                this.reviews = () => {
                    return Trainings.reviews;
                };

                this.isTrainingChosen = function () {
                    return Trainings.chosenTraining != undefined;
                };

                this.isChosen = function (training) {
                    if (!this.isTrainingChosen()) return false;

                    return training._id === this.chosenTraining()._id;
                };

                this.showTraining = (training) => {
                    Trainings.getTraining(training._id);
                    console.log(self.chosenTraining());
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
