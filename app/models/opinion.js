// (function () {
//
//     const mongoose = require('../../config/db.connection');
//     const Schema = mongoose.Schema;
//     // const ObjectId = Schema.ObjectId;
//
//     const Opinion = new Schema({
//         comment: String,
//         rate: {
//             type: Number
//             // min: 0,
//             // max:5
//         }
//         }
//     );
//
//     module.exports = mongoose.model('Opinion', Opinion);
//
// })();