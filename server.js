(function () {

    var express = require('express');

    var path = require('path');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');

    var app = express();
    var port = process.env.PORT || 8080;

    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname, 'public')));

    require('./app/routes')(app);

    app.listen(port, function () {
        console.log('Server is running on port :' + port);
    });

    exports = module.exports = app;
})();