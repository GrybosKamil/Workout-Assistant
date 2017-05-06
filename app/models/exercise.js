(function () {

    var mongoose = require('../../config/db.connection');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;

    var Exercise = new Schema({
            name: String,
            description: String,
            place: String,
            muscles: [String],
            requirements: [String]
        }
    );

    module.exports = mongoose.model('Exercise', Exercise);

})();