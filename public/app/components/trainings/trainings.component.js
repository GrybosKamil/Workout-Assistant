'use strict';

(function () {

    angular.module('trainings')
        .component('trainings', {
            templateUrl: 'app/components/trainings/trainings.template.html',
            controller: function Trainings(Trainings) {
                // let self = this;

                this.trainings = [];

                Trainings.getTrainings().then((response) => {
                        console.log(response);
                        response.data.forEach((data) => {
                            let training = {
                                author: data.author,
                                exercises: data.exercises
                            };
                            this.trainings.push(training);
                        });
                        console.log(this.trainings.length);
                    }
                );


            }

        });

})();
