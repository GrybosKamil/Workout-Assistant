(function () {

    const mongoose = require('../../config/db.connection');
    const Schema = mongoose.Schema;

    const Opinion = new Schema({
            rate: {
                type: Number,
                min: 0,
                max: 5
            },
            comment: String
        }
    );

    module.exports = mongoose.model('Opinion', Opinion);

})();
