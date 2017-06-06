(function () {

    const routerApi = require('express').Router();

    const passport = require('passport');

    // const User = require('./models/user');
    // const Exercise = require('./models/exercise');
    // const Training = require('./models/training');
    // const Opinion = require('./models/opinion');
    // const Review = require('./models/review');
    // const Workout = require('./models/workout');

    // const trainings = require('./models/training');
    // const reviews = require('./routes/reviews');

    // function routing(app) {

    routerApi.use((req, res, next) => {
        console.log("[API] Something is happening.");
        next();
    });

    const users = require('./routes/users/users');
    routerApi.use('/users', users);

    const exercises = require('./routes/exericses/exercises');
    routerApi.use('/exercises', exercises);

    const trainings = require('./routes/trainings/trainings');
    routerApi.use('/trainings', trainings);

    const reviews = require('./routes/reviews/reviews');
    routerApi.use('/reviews', reviews);

    // // router.route('/exercises')
    // //     .post((req, res) => {
    // //         let exercise = new Exercise(req.body);
    // //
    // //         let promise = exercise.save();
    // //         promise
    // //             .catch((error) => {
    // //                 res.send(error);
    // //             })
    // //             .then((response) => {
    // //                 res.json(response);
    // //             });
    // //
    // //     })
    // //     .get((req, res) => {
    // //         let exerciseID = req.query.exercise_id;
    // //
    // //         let promise;
    // //         if (exerciseID) {
    // //             promise = Exercise.find({_id: exerciseID});
    // //         } else {
    // //             promise = Exercise.find()
    // //                 .sort({name: 1, description: 1});
    // //         }
    // //
    // //         promise
    // //         // .lean()
    // //             .exec();
    // //
    // //         promise
    // //             .catch((error) => {
    // //                 res.send(error);
    // //             })
    // //             .then((response) => {
    // //                 res.json(response);
    // //             });
    // //     });
    //
    // app.use('/trainings', trainings);
    // // router.route('/trainings')
    // //     .post((req, res) => {
    // //         let training = new Training(req.body);
    // //         training.updated = Date.now();
    // //
    // //         let promise = training.save();
    // //         promise
    // //             .catch((error) => {
    // //                 res.send(error);
    // //             })
    // //             .then((response) => {
    // //                 res.json(response);
    // //             });
    // //     })
    // //     .get((req, res) => {
    // //             let trainingID = req.query.training_id;
    // //
    // //             let promise;
    // //             if (trainingID) {
    // //                 promise = Training.findOne({_id: trainingID});
    // //             } else {
    // //                 promise = Training.find();
    // //             }
    // //
    // //             promise.populate('exercises.exercise')
    // //                 .exec();
    // //
    // //             promise
    // //                 .catch((error) => {
    // //                     res.send(error);
    // //                 })
    // //                 .then((response) => {
    // //                     res.json(response);
    // //                 });
    // //         }
    // //     );
    //
    // router.route('/continuous_scroll_trainings')
    //     .get((req, res) => {
    //         if (!req.query.newest) {
    //             let oldest = req.query.oldest;
    //
    //             let promise = Training.find({}, "_id author name updated")
    //                 .sort({updated: -1});
    //
    //             if (oldest) {
    //                 promise = promise.where({updated: {"$lt": oldest}})
    //             }
    //
    //             promise = promise.limit(6)
    //             // .populate('exercises.exercise')
    //             // .lean()
    //                 .exec();
    //
    //             promise
    //                 .catch((error) => {
    //                     res.send(error);
    //                 })
    //                 .then((response) => {
    //                     res.json(response);
    //                 });
    //         } else {
    //             let newest = req.query.newest;
    //
    //             let promise = Training.find({}, "_id author name updated")
    //                 .sort({updated: 1});
    //
    //             if (newest) {
    //                 promise = promise.where({updated: {"$gt": newest}})
    //             }
    //
    //             promise = promise.limit(6)
    //             // .populate('exercises.exercise')
    //             // .lean()
    //                 .exec();
    //
    //             promise
    //                 .catch((error) => {
    //                     res.send(error);
    //                 })
    //                 .then((response) => {
    //                     res.json(response);
    //                 });
    //         }
    //     });
    //
    //
    // app.use('/reviews', reviews);
    // //
    // // router.route('/reviews')
    // // // .put((req, res) => {
    // // //
    // // //     let trainingID = req.query.training_id;
    // // //     let opinionID = req.query.opinion_id;
    // // //
    // // //     let opinion = Opinion.findOne({_id: opinionID}).exec();
    // // //
    // // //     // console.log(opinion);
    // // //     // let opinion
    // // //
    // // //     // console.log(trainingID);
    // // //     // console.log(opinionID);
    // // //
    // // //     opinion.then((data) => {
    // // //             console.log(data);
    // // //             let promise = Review.update(
    // // //                 {training: trainingID},
    // // //                 {$push: {opinions: data}},
    // // //                 {upsert: true}
    // // //             );
    // // //
    // // //
    // // //             promise.exec();
    // // //
    // // //             promise.catch((error) => {
    // // //                 console.log(error);
    // // //             }).then((response) => {
    // // //                 console.log(response);
    // // //             });
    // // //         }
    // // //     );
    // // //
    // // //
    // // // })
    // //     .post((req, res) => {
    // //         let review = new Review(req.body);
    // //         review.updated = Date.now();
    // //
    // //         let promise = review.save();
    // //         promise
    // //             .catch((error) => {
    // //                 res.send(error);
    // //             })
    // //             .then((response) => {
    // //                 res.json(response);
    // //             });
    // //     })
    // //     .get((req, res) => {
    // //         let trainingID = req.query.training_id;
    // //
    // //         let promise;
    // //         if (trainingID) {
    // //             promise = Review.find({training: trainingID});
    // //         } else {
    // //             promise = Review.find();
    // //         }
    // //
    // //         promise
    // //             .sort({updated: -1})
    // //             .exec();
    // //
    // //         promise
    // //             .catch((error) => {
    // //                 res.send(error);
    // //             })
    // //             .then((response) => {
    // //                 res.json(response);
    // //             });
    // //
    // //     });

    // app.use('/api', routerApi);
    // }


    module.exports = routerApi;


    // function isLoggedIn(req, res, next) {
    //     if (req.isAuthenticated())
    //         return next();
    //     res.redirect('/');
    // }

})();