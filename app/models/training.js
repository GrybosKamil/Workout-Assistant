(function () {

    const mongoose = require('../../config/db.connection');
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const Training = new Schema({
            author: String,
            name: String,
            updated: {type: Date, default: Date.now()},
            exercises: [{
                exercise: {
                    type: ObjectId,
                    ref: 'Exercise'
                },
                time: Boolean,
                quantity: Boolean,
                load: Boolean,
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