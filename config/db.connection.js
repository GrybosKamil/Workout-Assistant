var mongoose = require('mongoose');
var db = require('./db');

mongoose.connect(db.url);

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'Connection Error : '));
connection.once('open', function () {
    console.log('Database connection ok!');
});

module.exports = mongoose;