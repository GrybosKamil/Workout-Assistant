'use strict';

(function () {

    const router = require('express').Router();
    const auth = require('../../config/auth')();
    const ctrlResponse = require('../../controllers/response');
    const ctrlAuth = require('../../controllers/authentication');

    const Review = require('../../models/review');

    router.route('/')
        .get((req, res, next) => {
            getReviews(req, res);
        });

    router.route('/training/:trainingId')
        .get((req, res, next) => {
            getTrainingReviews(req, res);
        });

    router.route('/new')
        .post(auth.authenticate(), (req, res, next) => {
            ctrlAuth.identifyUser(req, res, createNewReview);
        });
    // .post((req, res, next) => {
    //     createNewReview(req, res, {});
    // });

    router.route('/:reviewId')
    // .get((req, res, next) => {
    //     getExercise(req, res);
    // })
    // .put(auth.authenticate(), (req, res, next) => {
    //     ctrlAuth.verifyModerator(req, res, updateExercise)
    // })
        .delete(auth.authenticate(), (req, res, next) => {
            ctrlAuth.verifyUserOrModerator(req, res, deleteReview);
        });

    module.exports = router;


    const createNewReview = function (req, res, user) {
        let request = {
            author: user,
            training: req.body.training,
            rate: req.body.rate,
            comment: req.body.comment,
            updated: req.body.updated
        };

        let review = new Review(request);

        review.save()
            .then((message) => {
                ctrlResponse.sendJSON(res, 200, message);
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    // const updateExercise = function (req, res) {
    //     let exerciseId = req.params.exerciseId;
    //
    //     Exercise.update({_id: exerciseId},
    //         {
    //             $set: {
    //                 name: req.body.name,
    //                 description: req.body.description,
    //                 place: req.body.place,
    //                 muscles: req.body.muscles,
    //                 requirements: req.body.requirements
    //             }
    //         })
    //         .then((message) => {
    //             ctrlResponse.sendJSON(res, 200, message);
    //         })
    //         .catch((error) => {
    //             ctrlResponse.sendJSON(res, 400, {});
    //         });
    // };

    const deleteReview = function (req, res) {
        let reviewId = req.params.reviewId;

        Review.remove({_id: reviewId})
            .then((message) => {
                ctrlResponse.sendJSON(res, 200, message);
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    // const getExercise = function (req, res) {
    //     let exerciseId = req.params.exerciseId;
    //
    //     Exercise.findOne({_id: exerciseId})
    //         .then((exercise) => {
    //             if (!exercise) {
    //                 ctrlResponse.sendJSON(res, 404, {});
    //             } else {
    //                 ctrlResponse.sendJSON(res, 200, exercise);
    //             }
    //         })
    //         .catch((error) => {
    //             ctrlResponse.sendJSON(res, 400, {});
    //         });
    // };
    //
    const getReviews = function (req, res) {
        Review.find()
            .sort({name: 1})
            // .select({
            //     name: 1,
            //     // description: 0,
            //     place: 1,
            //     muscles: 1,
            //     requirements: 1
            // })
            .then((reviews) => {
                ctrlResponse.sendJSON(res, 200, reviews);
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const getTrainingReviews = function (req, res) {
        let trainingId = req.params.trainingId;

        console.log(trainingId);
        Review.find({training: trainingId})
            .populate("author", "username")
            .sort({update: -1})
            .then((reviews) => {
                console.log(reviews);
                ctrlResponse.sendJSON(res, 200, reviews);
            })
            .catch((error) => {
                console.log(error);
                ctrlResponse.sendJSON(res, 400, {});
            });
    }

})();