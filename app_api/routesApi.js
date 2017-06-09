(function () {

    const routerApi = require('express').Router();

    const passport = require('passport');

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


    const uploads = require('./routes/uploads/uploads');
    routerApi.use('/uploads', uploads);



    module.exports = routerApi;

})();