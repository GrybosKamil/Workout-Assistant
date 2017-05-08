'use strict';

(function () {

    angular.module('trainingsService', []).service('Trainings', ['$http', function ($http) {
        let self = this;

        // this.all = false;
        this.initiated = false;
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
            console.log("getTrainings");
            $http.get('/trainings', {
                params: {training_id: this.last}
            }).then((response) => {
                    console.log("response!!!!!!!!");
                    if (response.data.length) {
                        let newLast = response.data.slice(-1)[0]._id;

                        if (self.last !== newLast) {
                            self.last = newLast;

                            response.data.forEach((training) => {
                                self.trainings.push(training);
                            });
                        }
                    }
                }
            );

            return this.trainings;
        }
    }]);

})();
