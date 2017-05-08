'use strict';

(function () {

    angular.module('trainings')
        .component('trainings', {
            templateUrl: 'app/components/trainings/trainings.template.html',
            controller: function Trainings($scope, $interval, Trainings) {
                let self = this;

                this.trainings = Trainings.getInitTrainings();

                this.chosenTrainingId = '';
                this.chosenTraining = {};

                this.isTrainingChosen = function () {
                    return this.chosenTrainingId !== '';
                };

                this.showTraining = (training) => {
                    console.log(training);
                    this.chosenTrainingId = training._id;

                    let newTraining = Trainings.getTraining(this.chosenTrainingId);
                    console.log(newTraining);


                };

                (function () {

                    $('#trainings-panel')
                        .bind('scroll', function () {
                            if ($(this).scrollTop() + $(this).innerHeight() >= 0.9 * $(this)[0].scrollHeight) {
                                self.trainings = Trainings.getTrainings();
                            }
                        });

                })(jQuery);

            }

        });

})();
