(function () {

    var router = require('express').Router();
    // var Exercise = require('./models/exercise')(mongoose);

    function routing(app) {

        var Exercise = require('./models/exercise');
        // var Workout = require('./models/workout');


        router.use(function (req, res, next) {
            console.log("Something is happening.");
            next();
        });

        router.route('/exercises')
            .post(function (req, res) {
                var exercise = new Exercise(req.body);


                exercise.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({
                        message: 'Exercise created!',
                        exercise: exercise
                    });
                });
            })
            .get(function (req, res) {
                Exercise.find(function (err, exercises) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(exercises);
                });
            });

        // router.route('/workouts')
        //     .post(function (req, res) {
        //         var workout = new Workout;
        //         workout.name = req.body.name;
        //         workout.description = req.body.description;
        //         console.log(req.body);
        //
        //         workout.save(function (err) {
        //             if (err) {
        //                 res.send(err);
        //             }
        //             res.json({message: 'Workout created!'});
        //         });
        //     })
        //     .get(function (req, res) {
        //         Workout.find(function (err, exercises) {
        //             if (err) {
        //                 res.send(err);
        //             }
        //             res.json(exercises);
        //         });
        //     });


        router.get('/', function (req, res) {
            res.sendFile('index.html');
        });

        app.use('/', router);
    }

    module.exports = routing;

})();