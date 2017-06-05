'use strict';

(function () {

    const router = require('express').Router();
    const auth = require('../../config/auth')();
    const ctrlResponse = require('../../controllers/response');
    const ctrlAuth = require('../../controllers/authentication');

    const Exercise = require('../../models/exercise');

    router.route('/')
        .get((req, res, next) => {
            getExercises(req, res);
        });

    router.route('/new')
        .post(auth.authenticate(), (req, res, next) => {
            ctrlAuth.verifyModerator(req, res, createNewExercise);
        });

    router.route('/:exerciseId')
        .get((req, res, next) => {
            getExercise(req, res);
        })
        .put(auth.authenticate(), (req, res, next) => {
            console.log("SIEMA");
            console.log(req.user);
            ctrlAuth.verifyModerator(req, res, updateExercise)

        })
        .delete(auth.authenticate(), (req, res, next) => {
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

        Exercise.remove({_id: exerciseId})
            .then((message) => {
                ctrlResponse.sendJSON(res, 200, message);
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const getExercise = function (req, res) {
        let exerciseId = req.params.exerciseId;

        Exercise.findOne({_id: exerciseId})
            .then((exercise) => {
                if (!exercise) {
                    ctrlResponse.sendJSON(res, 404, {});
                } else {
                    ctrlResponse.sendJSON(res, 200, exercise);
                }
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const getExercises = function (req, res) {
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
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

})();