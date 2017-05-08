(function () {

    const router = require('express').Router();

    const Exercise = require('./models/exercise');
    const Training = require('./models/training');
    const Opinion = require('./models/opinion');
    // const Workout = require('./models/workout');

    function routing(app) {

        router.use((req, res, next) => {
            console.log("Something is happening.");
            next();
        });

        router.route('/exercises')
            .post((req, res) => {
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
            .get((req, res) => {
                let promise = Exercise.find()
                    .sort({name: 1, description: 1})
                    // .lean()
                    .exec();

                promise
                    .catch((error) => {
                        res.send(error);
                    })
                    .then((response) => {
                        res.json(response);
                    });
            });

        router.route('/trainings')
            .post((req, res) => {
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
            .get((req, res) => {
                    let trainingID = req.query.training_id;

                    let promise = Training.findOne({_id: trainingID})
                        .populate('exercises.exercise').exec();

                    promise
                        .catch((error) => {
                            res.send(error);
                        })
                        .then((response) => {
                            res.json(response);
                        });
                }
            );

        router.route('/continuous_scroll_trainings')
            .get((req, res) => {
                let last = req.query.training_id;

                let promise = Training.find()
                    .sort({_id: 1});

                if (last) {
                    promise = promise.where({_id: {"$gt": last}})
                }

                promise = promise.limit(3)
                    .populate('exercises.exercise')
                    // .lean()
                    .exec();

                promise
                    .catch((error) => {
                        res.send(error);
                    })
                    .then((response) => {
                        res.json(response);
                    });
            });

        router.get('/', (req, res) => {
            res.sendFile('index.html');
        });

        router.get('*', (req, res) => {
            res.redirect('/');
        });

        app.use('/', router);
    }

    module.exports = routing;

})
();