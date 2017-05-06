(function () {

    var mongoose = require('../../config/db.connection');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;

    var Workout = new Schema({
        author: String,
        trainings: [{
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