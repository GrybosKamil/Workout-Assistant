'use strict';

(function () {

    angular.module('trainings')
        .component('trainingReviews', {
            bindings: {
                training: '<',
                reviews: '<'
            },
            templateUrl: 'app/components/trainings/trainingDetails/training-reviews/training-reviews.template.html',
            controller: function TrainingReviews($scope, $http, Trainings) {
                let self = this;


                this.newOpinion = {
                    rate: 4,
                    comment: "Good training"
                };

                this.addReview = () => {
                    $http.post('/reviews',
                        {
                            training: self.training._id,
                            rate: self.newOpinion.rate,
                            comment: self.newOpinion.comment
                        })
                        .then((response) => {
                            Trainings.pullReviews();
                        });


                    self.newOpinion = {
                        rate: 3,
                        comment: ""
                    }
                };

                this.pullReviews = () => {
                    Trainings.pullReviews();
                };

            }
        });

})();