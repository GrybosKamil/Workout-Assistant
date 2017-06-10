'use strict';

(function () {

    const router = require('express').Router();
    const auth = require('../../config/auth')();
    const ctrlResponse = require('../../controllers/response');
    const ctrlAuth = require('../../controllers/authentication');

    const Training = require('../../models/training');

    router.route('/')
        .get((req, res, next) => {
            getTrainings(req, res);
        });


    router.route('/continuous_scroll_trainings')
        .get((req, res, next) => {
            if (!req.query.newest) {
                let oldest = req.query.oldest;

                let promise = Training.find({}, "_id author name updated")
                    .sort({updated: -1});

                if (oldest) {
                    promise = promise.where({updated: {"$lt": oldest}})
                }

                promise = promise.limit(6)
                // .populate('exercises.exercise')
                // .lean()
                    .exec();

                promise
                    .catch((error) => {
                        res.send(error);
                    })
                    .then((response) => {
                        res.json(response);
                    });
            } else {
                let newest = req.query.newest;

                let promise = Training.find({}, "_id author name updated")
                    .sort({updated: 1});

                if (newest) {
                    promise = promise.where({updated: {"$gt": newest}})
                }

                promise = promise.limit(6)
                // .populate('exercises.exercise')
                // .lean()
                    .exec();

                promise
                    .catch((error) => {
                        res.send(error);
                    })
                    .then((response) => {
                        res.json(response);
                    });
            }
        });

    router.route('/new')
        .post(auth.authenticate(), (req, res, next) => {
            ctrlAuth.identifyUser(req, res, createNewTraining);
        });

    router.route('/user/:userId')
        .get((req, res) => {
            getUserTrainings(req, res);
        });


    router.route('/:trainingId')
        .get((req, res, next) => {
            getTraining(req, res);
        })
        .put(auth.authenticate(), (req, res, next) => {
            ctrlAuth.verifyUser(req, res, updateTraining)

        })
        .delete(auth.authenticate(), (req, res, next) => {
            ctrlAuth.verifyUserOrAdmin(req, res, deleteTraining);
        });


    module.exports = router;

    const createNewTraining = function (req, res, user) {
        let request = {
            author: user,
            name: req.body.name,
            updated: Date.now(),
            exercises: req.body.exercises
        };

        let training = new Training(request);

        training.save()
            .then((message) => {
                ctrlResponse.sendJSON(res, 200, {});
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const getTraining = function (req, res) {
        let trainingId = req.params.trainingId;

        Training.findOne({_id: trainingId})
            .populate("author", "username")
            .populate("exercises.exercise", "-description")
            .then((training) => {
                if (!training) {
                    ctrlResponse.sendJSON(res, 404, {});
                } else {
                    ctrlResponse.sendJSON(res, 200, training);
                }
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const getTrainings = function (req, res) {
        Training.find()
            .sort({updated: -1, name: 1})
            .populate("author", "username")
            // .populate("exercises.exercise")
            .select({
                author: 1,
                name: 1,
                updated: 1
            })
            .then((exercises) => {

                console.log("TUTAJ");
                ctrlResponse.sendJSON(res, 200, exercises);
            })
            .catch((error) => {
                console.log(error);
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const updateTraining = function (req, res) {
        let trainingId = req.params.trainingId;
        console.log(trainingId);

        Training.update({_id: trainingId},
            {
                $set: {
                    name: req.body.name,
                    updated: Date.now(),
                    exercises: req.body.exercises
                }
            })
            .then((message) => {
                ctrlResponse.sendJSON(res, 200, message);
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const deleteTraining = function (req, res) {
        let trainingId = req.params.trainingId;
        console.log(trainingId);

        Training.remove({_id: trainingId})
            .then((message) => {
                ctrlResponse.sendJSON(res, 200, message);
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const getUserTrainings = function (req, res) {
        let userId = req.params.userId;

        Training.find({author: userId})
            .sort({updated: -1, name: 1})
            .populate("author", "username")
            .then((message) => {
                ctrlResponse.sendJSON(res, 200, message);
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };
})();