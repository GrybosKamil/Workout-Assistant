'use strict';

(function () {

    angular.module('trainings')
        .component('trainings', {
            templateUrl: 'app/components/trainings/trainings.template.html',
            controller: function Trainings($scope, $interval, Trainings) {
                let self = this;

                this.trainings = Trainings.getInitTrainings();

                this.chosenTraining = undefined;

                this.isTrainingChosen = function () {
                    return this.chosenTraining != undefined;
                };

                $scope.isTrainingChosen = function () {
                    // console.log(this.chosenTraining);
                    return self.chosenTraining != undefined;
                };

                this.showTraining = (training) => {
                    console.log(training);
                    // this.chosenTrainingId = training._id;

                    let newTraining = Trainings.getTraining(training._id);

                    newTraining.then((response) => {
                        this.chosenTraining = response.data;
                        // Trainings.currentTraining = this.chosenTraining;
                        $scope.training = this.chosenTraining;
                    });
                };

                (function () {

                    $('#trainings-panel')
                        .bind('scroll', function () {
                            if ($(this).scrollTop() + $(this).innerHeight() >= 0.9 * $(this)[0].scrollHeight) {
                                self.trainings = Trainings.getOldestTrainings();
                            }

                            if ($(this).scrollTop() === 0) {
                                self.trainings = Trainings.getNewestTrainings();
                            }
                        });

                })(jQuery);

            }

        });

})();
