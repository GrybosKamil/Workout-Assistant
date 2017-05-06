(function () {

    const mongoose = require('../../config/db.connection');
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const Exercise = new Schema({
            name: String,
            description: String,
            place: String,
            muscles: [String],
            requirements: [String]
        }
    );

    module.exports = mongoose.model('Exercise', Exercise);

})();