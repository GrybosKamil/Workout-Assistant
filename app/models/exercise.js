(function () {

    var mongoose = require('mongoose');

    // function create(mongoose) {
    var Schema = mongoose.Schema;

    var Exercise = new Schema({
            name: String,
            description: String
        }
    );
    // return mongoose.model('exercise', Exercise);
    // }

    module.exports = mongoose.model('Exercise', Exercise);
    // module.exports = create;

})();