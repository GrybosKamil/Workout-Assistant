(function () {

    const router = require('express').Router();
    const auth = require('../config/environment').auth;
    const ctrlResponse = require('../controllers/response');

    const Exercise = require('../models/exercise');

    router.route('/')
        .post(auth, (req, res, next) => {
            if (!req.payload._id) {
                ctrlResponse.sendJSON(res, 401, {});
                return;
            }


            User.findById(req.payload._id)
                .exec()
                .then((user) => {
                        if (!user.hasModerator()) {
                            ctrlResponse.sendJSON(res, 401, {});
                            return;
                        }

                        let exercise = new Exercise(req.body);

                        exercise.save()
                            .then((message) => {
                                ctrlResponse.sendJSON(res, 200, message);
                            })
                            .catch((error) => {
                                ctrlResponse.sendJSON(res, 400, error);
                            });
                    }
                )
                .catch((error) => {
                    ctrlResponse.sendJSON(res, 400, {});
                });

        })
        .get((req, res, next) => {
            Exercise.find()
                .sort({name: 1, description: 1}).exec()
                .then((exercises) => {
                    ctrlResponse.sendJSON(res, 200, exercises);
                })
                .catch((error) => {
                    ctrlResponse.sendJSON(res, 400, {});
                });
        });

    router.route('/:exerciseId')
        .get((req, res, next) => {
            let exerciseId = req.params.exerciseId;

            Exercise.findOne({_id: exerciseId}).exec()
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
            if (!req.payload._id) {
                ctrlResponse.sendJSON(res, 401, {});
                return;
            }

            User.findById(req.payload._id)
                .exec()
                .then((user) => {
                        if (!user.hasModerator()) {
                            ctrlResponse.sendJSON(res, 401, {});
                            return;
                        }

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
                                ctrlResponse.sendJSON(res, 400, error);
                            });
                    }
                )
                .catch((error) => {
                    ctrlResponse.sendJSON(res, 400, {});
                });

        })
        .delete(auth, (req, res, next) => {
            if (!req.payload._id) {
                ctrlResponse.sendJSON(res, 401, {});
                return;
            }


            User.findById(req.payload._id)
                .exec()
                .then((user) => {
                        if (!user.hasModerator()) {
                            ctrlResponse.sendJSON(res, 401, {});
                            return;
                        }

                        let exerciseId = req.params.exerciseId;

                        Exercise.remove({_id: exerciseId})
                            .then((message) => {
                                ctrlResponse.sendJSON(res, 200, message);
                            })
                            .catch((error) => {
                                ctrlResponse.sendJSON(res, 400, error);
                            });
                    }
                )
                .catch((error) => {
                    ctrlResponse.sendJSON(res, 400, {});
                });

        });

    module.exports = router;


})();