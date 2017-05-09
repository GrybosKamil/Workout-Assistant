(function () {

    const mongoose = require('../../config/db.connection');
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const Workout = new Schema({
        author: String,
        trainingHeaders: [{
            training: {
                type: ObjectId,
                ref: 'Training'
            }
        }
        ]
    });

    module.exports = mongoose.model('Workout', Workout);

})
();