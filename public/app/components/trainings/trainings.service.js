'use strict';

(function () {

    angular.module('trainingsService', []).service('Trainings', ['$http', function ($http) {
        let self = this;

        this.initiated = false;
        this.busy = false;

        this.newest = undefined;
        this.oldest = undefined;

        this.trainings = [];
        this.chosenTraining = undefined;

        this.reviews = [];

        this.trainingHeaders = [];

        this.getInitTrainings = () => {
            if (!this.initiated) {
                this.initiated = true;
                return this.getOldestTrainings();
            }
            return this.trainingHeaders;
        };

        this.getOldestTrainings = function () {
            if (!this.busy) {
                this.busy = true;
                console.log("getOldestTrainings");

                $http.get('/continuous_scroll_trainings', {
                    params: {oldest: this.oldest}
                }).then((response) => {
                        if (response.data.length) {
                            let newOldest = response.data.slice(-1)[0].updated;

                            if (self.oldest !== newOldest) {
                                self.oldest = newOldest;

                                response.data.forEach((training) => {
                                    self.trainingHeaders.push(training);
                                });
                            }
                        }
                        this.busy = false;
                    }
                );
            }
            return this.trainingHeaders;
        };

        this.getNewestTrainings = function () {
            if (!this.busy) {
                this.busy = true;
                this.newest = this.trainingHeaders[0].updated;
                console.log("getNewestTrainings");

                $http.get('/continuous_scroll_trainings', {
                    params: {newest: this.newest}
                }).then((response) => {
                        if (response.data.length) {
                            let newNewest = response.data.slice(-1)[0].updated;

                            if (self.newest !== newNewest) {
                                self.newest = newNewest;

                                response.data.forEach((training) => {
                                    self.trainingHeaders.unshift(training);
                                });
                            }
                        }
                        this.busy = false;
                    }
                );
            }
            return this.trainingHeaders;
        };

        this.checkArray = (array, attr, value) => {
            for (let i = 0; i < array.length; ++i) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        };

        this.getChosenTraining = () => {
            return self.chosenTraining;
        };

        this.getTraining = (trainingID) => {
            let index = self.checkArray(self.trainings, '_id', trainingID);

            if (index > -1) {
                self.chosenTraining = self.trainings[index];
                return self.chosenTraining;
            } else {
                $http.get('/trainings', {
                    params: {training_id: trainingID}
                }).then((response) => {
                    self.chosenTraining = response.data;
                    self.trainings.push(self.chosenTraining);

                    self.pullReviews();
                    return self.chosenTraining;
                });
            }
        };


        this.pullReviews = () => {
            if (self.chosenTraining) {
                $http.get('/reviews',
                    {
                        params: {
                            training_id: self.chosenTraining._id
                        }
                    }
                ).then((response) => {
                        console.log(response);
                        self.reviews = response.data;
                        console.log(self.reviews);
                    }
                )
            } else {
                return self.reviews;
            }
        };

        this.getReviews = () => {
            return self.reviews;
        }

    }]);

})();
