(function () {

    const express = require('express');
    // const session = require('express-session');

    const path = require('path');
    const favicon = require('serve-favicon');
    const logger = require('morgan');
    const bodyParser = require('body-parser');
    const methodOverride = require('method-override');
    const cookieParser = require('cookie-parser');

    const passport = require('passport');

    const app = express();
    const port = process.env.PORT || 8080;


    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'app_client')));


    app.use(passport.initialize());
    // app.use(express.session({secret: 'anything'}));
    // app.use(session({secret: 'anything'}));
    // app.use(passport.initialize());
    // app.use(passport.session());

    const routesApi = require('./app_api/routesApi');

    app.use('/api', routesApi);

    app.use(function (req, res) {
        res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
    });

    app.listen(port, function () {
        console.log('Server is running on port :' + port);
    });

    // exports =
    module.exports = app;

})();