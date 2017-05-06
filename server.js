(function () {

    const express = require('express');

    const path = require('path');
    const bodyParser = require('body-parser');
    const methodOverride = require('method-override');

    const app = express();
    const port = process.env.PORT || 8080;

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