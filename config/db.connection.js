(function () {

    const mongoose = require('mongoose');
    const db = require('./db');

    mongoose.Promise = require('q').Promise;
    mongoose.connect(db.url);

    const connection = mongoose.connection;

    connection.on('error', console.error.bind(console, 'Connection Error : '));
    connection.once('open', function () {
        console.log('Database connection ok!');
    });

    module.exports = mongoose;

})();