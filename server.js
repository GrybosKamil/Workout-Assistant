(function () {

    var express = require('express');
    var path = require('path');
    var app = express();

    var port = process.env.PORT || 8080;

    app.use(express.static(path.join(__dirname, 'public', 'app')));

    app.get('*', function (req, res) {
        res.sendFile('index.html');
    });

    app.listen(port, function () {
        console.log('Our app is running on port :' + port);
    });

})();