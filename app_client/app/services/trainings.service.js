'use strict';

(function () {

    angular.module('trainingsService', [])
        .service('Trainings', trainings);

    trainings.$inject = ['$http', 'Authorization'];
    function trainings($http, Authorization) {
        const self = this;

        self.initiated = false;
        self.busy = false;

        self.newest = undefined;
        self.oldest = undefined;

        self.trainings = [];
        self.chosenTraining = undefined;

        self.trainingHeaders = [];

        const getInitTrainings = () => {
            if (!self.initiated) {
                self.initiated = true;
                return getOldestTrainings();
            }
            return self.trainingHeaders;
        };

        const getOldestTrainings = function () {
            if (!self.busy) {
                self.busy = true;
                console.log("getOldestTrainings");

                $http.get('/api/trainings/continuous_scroll_trainings', {
                    params: {oldest: self.oldest}
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
                        self.busy = false;
                    }
                );
            }
            return self.trainingHeaders;
        };

        const getNewestTrainings = function () {
            if (!self.busy) {
                self.busy = true;
                self.newest = self.trainingHeaders[0].updated;
                console.log("getNewestTrainings");

                $http.get('/api/trainings/continuous_scroll_trainings', {
                    params: {newest: self.newest}
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
                        self.busy = false;
                    }
                );
            }
            return self.trainingHeaders;
        };

        const checkArray = (array, attr, value) => {
            for (let i = 0; i < array.length; ++i) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        };

        const getChosenTraining = function () {
            return self.chosenTraining;
        };

        const getTraining = function (trainingId) {
            let index = checkArray(self.trainings, '_id', trainingId);

            if (index > -1) {
                self.chosenTraining = self.trainings[index];
                console.log("Training retrieved from cache");
                return self.chosenTraining;
            } else {
                pullTraining(trainingId)
                    .then((response) => {
                        self.chosenTraining = response.data;
                        self.trainings.push(self.chosenTraining);

                        console.log("POBRANE");
                        console.log(self.chosenTraining);

                        return self.chosenTraining;
                    });
            }
        };

        const pullTraining = (trainingId) => {
            return $http.get('/api/trainings/' + trainingId);
        };

        const getReviews = function () {
            if (!self.chosenTraining) {
                return [];
            }
            if (self.chosenTraining.reviews) {
                console.log("Reviews retrieved from cache");
                return self.chosenTraining.reviews;
            } else {
                pullReviews(self.chosenTraining._id)
                    .then((response) => {
                            console.log("Reviews pulled from server");
                            self.chosenTraining.reviews = response.data;
                            return self.chosenTraining.reviews
                        }
                    )
            }
        };

        const pullReviews = (trainingId) => {
            return $http.get('/api/reviews/training/' + trainingId);
        };

        const updateReviews = () => {
            pullReviews(self.chosenTraining._id)
                .then((response) => {
                        console.log("Reviews pulled from server");
                        self.chosenTraining.reviews = response.data;
                        return self.chosenTraining.reviews
                    }
                )
        };

        return {
            getInitTrainings: getInitTrainings,
            getOldestTrainings: getOldestTrainings,
            getNewestTrainings: getNewestTrainings,
            getTraining: getTraining,
            getChosenTraining: getChosenTraining,
            getReviews: getReviews,
            updateReviews: updateReviews
        };
    }

})();
