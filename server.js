(function () {

    const express = require('express');

    const path = require('path');
    const favicon = require('serve-favicon');
    const multer = require('multer');
    const logger = require('morgan');
    const bodyParser = require('body-parser');
    const methodOverride = require('method-override');
    const cookieParser = require('cookie-parser');

    const http = require('http');
    const socketio = require('socket.io');


    const passport = require('passport');
    const auth = require("./app_api/config/auth")();

    const port = process.env.PORT || 8080;
    const app = express();
    const server = http.createServer(app);
    const io = socketio.listen(server);


    app.set('socketio', io);
    app.set('server', server);


    app.use(auth.initialize());

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname)));
    app.use(express.static(path.join(__dirname, 'app_client')));

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    const routesApi = require('./app_api/routesApi');

    app.use('/api', routesApi);

    const router = require('express').Router();

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

    app.get('server').listen(port);
    // app.get('server').listen(port, function () {
    //     console.log('Server is running on port :' + port);
    // });

    // app.listen(port, function () {
    //     console.log('Server is running on port :' + port);
    // });

    // exports =
    module.exports = app;

})();