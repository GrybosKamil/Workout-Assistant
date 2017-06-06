(function () {

    const mongoose = require('../config/db.connection');
    const Schema = mongoose.Schema;

    const Exercise = new Schema({
            name: {
                type: String,
                unique: true,
                required: true
            },
            description: String,
            place: {
                type: String,
                enum: ['indoor', 'outdoor'],
                required: true
            },
            muscles: [String],
            requirements: [String]
        }
    );

    module.exports = mongoose.model('Exercise', Exercise);

})();