(function () {

    const mongoose = require('../../config/db.connection');
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const Review = new Schema({
            training: {
                type: ObjectId,
                ref: 'Training'
            },
            opinions: [{
                opinion: {
                    type: ObjectId,
                    ref: 'Opinion'
                }
            }]
        }
    );

    module.exports = mongoose.model('Review', Review);

})();