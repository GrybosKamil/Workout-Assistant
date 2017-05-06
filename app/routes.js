(function () {

    var router = require('express').Router();

    var Exercise = require('./models/exercise');
    var Training = require('./models/training');
    // var Workout = require('./models/workout');

    function routing(app) {

        router.use(function (req, res, next) {
            console.log("Something is happening.");
            next();
        });

        router.route('/exercises')
            .post(function (req, res) {
                var exercise = new Exercise(req.body);

                var promise = exercise.save();

                promise.catch(function(error){
                    res.send(error);
                }).then(function(data){
                    res.json(data);
                })

            })
            .get(function (req, res) {
                var promise = Exercise.find().exec();

                promise.catch(function(error){
                    res.send(error);
                }).then(function(data){
                    res.json(data);
                })
            });

        router.route('/trainings')
            .post(function (req, res) {
                var training = new Training(req.body);

                var promise = training.save();

                promise.catch(function(error){
                    res.send(error);
                }).then(function(data){
                    res.json(data);
                })
            })
            .get(function (req, res) {
                var promise = Training.find().populate('exercises.exercise').exec();

                promise.catch(function(error){
                    res.send(error);
                }).then(function(data){
                    res.json(data);
                })
            });


        router.get('/', function (req, res) {
            res.sendFile('index.html');
        });

        app.use('/', router);
    }

    module.exports = routing;

})();