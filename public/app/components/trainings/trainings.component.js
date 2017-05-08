'use strict';

(function () {

    angular.module('trainings')
        .component('trainings', {
            templateUrl: 'app/components/trainings/trainings.template.html',
            controller: function Trainings($scope, $interval, Trainings) {
                let self = this;

                this.trainings = Trainings.getInitTrainings();


                this.showTraining = (training) => {
                    console.log(training);
                };


                (function () {

                    $('#trainings-panel')
                        .bind('scroll', function () {
                            if ($(this).scrollTop() + $(this).innerHeight() >= 0.7 * $(this)[0].scrollHeight) {
                                console.log("bottom");
                                self.trainings = Trainings.getTrainings();
                            }
                        });

                })(jQuery);

            }

        });

})();
