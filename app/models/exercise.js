(function () {

    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

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