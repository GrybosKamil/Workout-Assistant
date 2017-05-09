'use strict';

(function () {

    angular.module('trainings')
        .component('trainings', {
            templateUrl: 'app/components/trainings/trainings.template.html',
            controller: function Trainings($scope, $interval, Trainings) {
                let self = this;

                this.trainingHeaders = Trainings.getInitTrainings();


                // this.isTrainingChosen = function () {
                //     return this.chosenTraining != undefined;
                // };

                // this.chosenTraining = {siema: "siema"};

                this.chosenTraining = () => {
                    return Trainings.chosenTraining;
                };

                this.isTrainingChosen = function () {
                    return Trainings.chosenTraining != undefined;
                };

                this.showTraining = (training) => {
                    console.log(training);

                    // let newTraining = Trainings.getTraining(training._id);
                    Trainings.getTraining(training._id);

                    // newTraining.then((response) => {
                    //     Trainings.chosenTraining = response.data;
                    //     $scope.training = this.chosenTraining;
                    // });
                };

                (function () {

                    $('#trainingHeaders-panel')
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
