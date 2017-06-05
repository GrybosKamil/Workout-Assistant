(function () {

    const mongoose = require('../config/db.connection');
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const Training = new Schema({
            author: {
                type: ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            updated: {
                type: Date,
                default: Date.now()
            },
            exercises: [{
                exercise: {
                    type: ObjectId,
                    ref: 'Exercise',
                    required: true
                },
                series: [{
                    time: Number,
                    quantity: Number,
                    load: Number
                }]
            }]
        }
    );

    module.exports = mongoose.model('Training', Training);

})();