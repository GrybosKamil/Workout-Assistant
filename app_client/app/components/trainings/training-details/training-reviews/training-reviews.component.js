'use strict';

(function () {

    angular.module('trainingReviews')
        .component('trainingReviews', {
            bindings: {
                training: '<'
            },
            templateUrl: 'app/components/trainings/training-details/training-reviews/training-reviews.template.html',
            controller: function TrainingReviews($scope, $http, Authorization, Trainings) {
                let self = this;

                this.currentUser = Authorization.currentUser();

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
                            })
                                .reduce((total, rate) => {
                                    return total + rate;
                                }, 0) / reviews.length;
                    }
                };

                this.showReviews = function () {
                    Trainings.getReviews();
                };

                this.addReview = () => {
                    $http.post('/api/reviews/new',
                        {
                            training: self.training._id,
                            rate: self.newOpinion.rate,
                            comment: self.newOpinion.comment,
                            updated: self.newOpinion.updated
                        },
                        Authorization.authorizationHeader()
                    )
                        .then((response) => {
                            self.training.reviews.unshift(response.data);
                        })
                        .catch((error) => {
                            alert("Nie mozna dodać komentarza!");
                        });


                    self.newOpinion = {
                        rate: self.defaultOpinion.rate,
                        comment: self.defaultOpinion.comment
                    }
                };
            }
        });

})();