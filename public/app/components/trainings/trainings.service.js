'use strict';

(function () {

    angular.module('trainingsService', []).service('Trainings', ['$http', function ($http) {
        let self = this;

        // this.all = false;
        this.initiated = false;
        this.busy = false;
        this.last = undefined;
        this.trainings = [];

        this.getInitTrainings = () => {
            if (!this.initiated) {
                this.initiated = true;
                return this.getTrainings();
            }
            return this.trainings;
        };

        this.getTrainings = function () {
            if (!this.busy) {
                this.busy = true;
                console.log("getTrainings");
                $http.get('/trainings', {
                    params: {training_id: this.last}
                }).then((response) => {
                        if (response.data.length) {
                            let newLast = response.data.slice(-1)[0]._id;

                            if (self.last !== newLast) {
                                self.last = newLast;

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
        }
    }]);

})();
