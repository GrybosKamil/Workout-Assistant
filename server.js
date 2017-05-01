'use strict';

(function () {

    var express = require('express');
    var mongoose = require('mongoose');

    var path = require('path');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');

    var app = express();
    var db = require('./config/db');

    var port = process.env.PORT || 8080;

    mongoose.connect(db.url);

    app.use(bodyParser.json());
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(bodyParser.json({type: 'application/vnd.api+json'}));
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(express.static(path.join(__dirname, 'public')));

    require('./app/routes')(app);

    app.listen(port, function () {
        console.log('Server is running on port :' + port);
    });

    exports = module.exports = app;
})();