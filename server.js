(function () {

    const express = require('express');

    const path = require('path');
    const favicon = require('serve-favicon');
    const logger = require('morgan');
    const bodyParser = require('body-parser');
    const methodOverride = require('method-override');
    const cookieParser = require('cookie-parser');

    const passport = require('passport');

    const routesApi = require('./app_api/routesApi');

    // const passportLocalStrategy = require('./app_api/config/passport/local.strategy.js');

    const app = express();
    const port = process.env.PORT || 8080;

    const auth = require("./app_api/config/auth")();

    app.use(auth.initialize());

    // passport.use(passportLocalStrategy);

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, 'app_client')));


    // app.use(passport.initialize());

    // app.use(express.session({secret: 'anything'}));
    // app.use(session({secret: 'anything'}));
    // app.use(passport.initialize());
    // app.use(passport.session());


    const router = require('express').Router();


    app.use('/api', routesApi);

    router.use((req, res, next) => {
        console.log("Something is happening.");
        next();
    });

    router.route('/')
        .get((req, res, next) => {
            res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
        });


    router.route('*')
        .get((req, res, next) => {
            res.redirect('/');
        });

    app.use('/', router);

    app.listen(port, function () {
        console.log('Server is running on port :' + port);
    });

    // exports =
    module.exports = app;

})();