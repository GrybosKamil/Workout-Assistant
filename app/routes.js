(function () {

    const router = require('express').Router();

    const Exercise = require('./models/exercise');
    const Training = require('./models/training');
    // const Workout = require('./models/workout');

    function routing(app) {

        router.use(function (req, res, next) {
            console.log("Something is happening.");
            next();
        });

        router.route('/exercises')
            .post(function (req, res) {
                let exercise = new Exercise(req.body);

                let promise = exercise.save();

                promise
                    .catch((error) => {
                        res.send(error);
                    })
                    .then((response) => {
                        res.json(response);
                    });

            })
            .get(function (req, res) {
                let promise = Exercise.find().exec();

                promise
                    .catch((error) => {
                        res.send(error);
                    })
                    .then((response) => {
                        res.json(response);
                    });
            });

        router.route('/trainings')
            .post(function (req, res) {
                let training = new Training(req.body);

                let promise = training.save();

                promise
                    .catch((error) => {
                        res.send(error);
                    })
                    .then((response) => {
                        res.json(response);
                    });
            })
            .get(function (req, res) {
                let promise = Training.find().populate('exercises.exercise').exec();

                promise
                    .catch((error) => {
                        res.send(error);
                    })
                    .then((response) => {
                        res.json(response);
                    });
            });


        router.get('/', function (req, res) {
            res.sendFile('index.html');
        });

        app.use('/', router);
    }

    module.exports = routing;

})();