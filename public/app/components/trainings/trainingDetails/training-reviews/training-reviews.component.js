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

                // this.reviews = [];

                this.newOpinion = {
                    rate: 4,
                    comment: "Good training"
                };

                this.addOpinion = () => {

                    console.log("TUTUT");
                    console.log(self.training);
                    console.log(self.reviews);
                    $http.post('/reviews',
                        {
                            training: self.training._id,
                            rate: self.newOpinion.rate,
                            comment: self.newOpinion.comment
                        })
                        .then((response) => {
                            console.log(response);
                            console.log("->");
                            console.log(response.data);
                            console.log("<-");
                            self.pullReviews();
                        });


                    self.newOpinion = {
                        rate: 1,
                        comment: ""
                    }
                };


                // this.pullReviews = () => {
                //     Trainings.pullReviews();
                // $http.get('/reviews',
                //     {
                //         params: {
                //             training_id: self.training._id
                //         }
                //     }
                // ).then((response) => {
                //         console.log(response);
                //         self.reviews = response.data;
                //     }
                // )
                // }

            }

        })
    ;

})
();