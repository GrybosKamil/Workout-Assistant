'use strict';

(function () {

    angular.module('trainingsService', []).service('Trainings', ['$http', function ($http) {
        let self = this;

        // this.all = false;
        this.initiated = false;
        this.busy = false;

        this.newest = undefined;
        this.oldest = undefined;

        this.trainings = [];

        this.getInitTrainings = () => {
            if (!this.initiated) {
                this.initiated = true;
                return this.getOldestTrainings();
            }
            return this.trainings;
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
                                    self.trainings.push(training);
                                });
                            }
                        }
                        this.busy = false;
                    }
                );
            }
            return this.trainings;
        };

        this.getNewestTrainings = function () {
            if (!this.busy) {
                this.busy = true;
                this.newest = this.trainings[0].updated;
                console.log("getNewestTrainings");

                $http.get('/continuous_scroll_trainings', {
                    params: {newest: this.newest}
                }).then((response) => {
                        if (response.data.length) {
                            let newNewest = response.data.slice(-1)[0].updated;

                            if (self.newest !== newNewest) {
                                self.newest = newNewest;

                                response.data.forEach((training) => {
                                    self.trainings.unshift(training);
                                });
                            }
                        }
                        this.busy = false;
                    }
                );
            }
            return this.trainings;
        };


    }]);

})();
