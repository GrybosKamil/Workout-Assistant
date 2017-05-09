'use strict';

(function () {

    angular.module('trainings')
        .component('trainingReviews', {
            bindings: {
                training: '<'
            },
            templateUrl: 'app/components/trainings/trainingDetails/training-reviews/training-reviews.template.html',
            controller: function TrainingReviews($scope, $http, Trainings) {
                console.log("ZACZYNAM");
                console.log(this.training);
                console.log("KONCZE");
                let self = this;
                this.newOpinion = {
                    rate: 4,
                    comment: "Good training"
                };

                this.addOpinion = () => {
                    $http.put('/reviews',
                        self.newOpinion,
                        {
                            params: {
                                training_id: self.training._id
                            }
                        })
                        .then((response) => {
                            console.log(response);
                        });

                    self.newOpinion = {
                        rate: 4,
                        comment: ""
                    }
                };
            }

        })
    ;

})
();