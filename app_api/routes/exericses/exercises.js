'use strict';

(function () {

    const router = require('express').Router();
    const auth = require('../../config/environment').auth;
    const ctrlResponse = require('../../controllers/response');
    const ctrlAuth = require('../../controllers/authentication');

    const Exercise = require('../../models/exercise');


    router.route('/')
        .get((req, res, next) => {
            Exercise.find()
                .sort({name: 1})
                .select({
                    name: 1,
                    // description: 0,
                    place: 1,
                    muscles: 1,
                    requirements: 1
                })
                .then((exercises) => {
                    ctrlResponse.sendJSON(res, 200, exercises);
                })
                .catch((error) => {
                    console.log(error);
                    ctrlResponse.sendJSON(res, 400, {});
                });
        });


    router.route('/new')
        .post(auth, (req, res, next) => {
            ctrlAuth.verifyModerator(req, res, createNewExercise);
        });


    router.route('/:exerciseId')
        .get((req, res, next) => {
            let exerciseId = req.params.exerciseId;

            Exercise.findOne({_id: exerciseId})
                .then((exercise) => {
                    if (!exercise) {
                        ctrlResponse.sendJSON(res, 404, exercise);
                    } else {
                        ctrlResponse.sendJSON(res, 200, exercise);
                    }
                })
                .catch((error) => {
                    ctrlResponse.sendJSON(res, 400, {});
                });
        })
        .put(auth, (req, res, next) => {
            ctrlAuth.verifyModerator(req, res, updateExercise)

        })
        .delete(auth, (req, res, next) => {
            ctrlAuth.verifyModerator(req, res, deleteExercise);
        });

    module.exports = router;


    const createNewExercise = function (req, res) {
        let exercise = new Exercise(req.body);

        exercise.save()
            .then((message) => {
                ctrlResponse.sendJSON(res, 200, message);
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };


    const updateExercise = function (req, res) {
        let exerciseId = req.params.exerciseId;
        console.log(exerciseId);

        Exercise.update({_id: exerciseId},
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    place: req.body.place,
                    muscles: req.body.muscles,
                    requirements: req.body.requirements
                }
            })
            .then((message) => {
                ctrlResponse.sendJSON(res, 200, message);
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const deleteExercise = function (req, res) {
        let exerciseId = req.params.exerciseId;
        console.log(exerciseId);

        Exercise.remove({_id: exerciseId})
            .then((message) => {
                ctrlResponse.sendJSON(res, 200, message);
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

})
();