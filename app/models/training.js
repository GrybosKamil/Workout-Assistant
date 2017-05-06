(function () {

    var mongoose = require('../../config/db.connection');
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;

    var Training = new Schema({
            author: String,
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