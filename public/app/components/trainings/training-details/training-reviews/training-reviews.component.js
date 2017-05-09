'use strict';

(function () {

    angular.module('trainings')
        .component('trainingReviews', {
            bindings: {
                training: '<',
                reviews: '<'
            },
            templateUrl: 'app/components/trainings/training-details/training-reviews/training-reviews.template.html',
            controller: function TrainingReviews($scope, $http, Trainings) {
                let self = this;

                this.maxRate = 5;

                this.defaultOpinion = {
                    rate: 4,
                    comment: ""
                };

                this.newOpinion = {
                    rate: self.defaultOpinion.rate,
                    comment: self.defaultOpinion.comment
                };

                this.avarageRate = () => {
                    if (!self.training) {
                        return 0;
                    }
                    let reviews = self.training.reviews;
                    if (!reviews) {
                        return 0;
                    }

                    if (reviews.length < 1) {
                        return 0;
                    } else {
                        return reviews.map((review) => {
                                return review.rate;
                            }).reduce((total, rate) => {
                                return total + rate;
                            }, 0) / reviews.length;
                    }
                };

                this.pullReviews = () => {
                    Trainings.pullReviews();
                };

                this.addReview = () => {
                    $http.post('/reviews',
                        {
                            training: self.training._id,
                            rate: self.newOpinion.rate,
                            comment: self.newOpinion.comment,
                            updated: self.newOpinion.updated
                        })
                        .catch((error) => {
                            alert("Nie mozna dodać komentarza!");
                        })
                        .then((response) => {
                            self.training.reviews.unshift(response.data);
                            Trainings.pullReviews();
                        });


                    self.newOpinion = {
                        rate: self.defaultOpinion.rate,
                        comment: self.defaultOpinion.comment
                    }
                };
            }
        });

})();