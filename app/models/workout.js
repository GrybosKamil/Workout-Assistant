// // (function () {
//
//
// var mongoose = require('mongoose');
//
// // var Exercise = require('./exercise');
//
// // function create(mongoose) {
// var Schema = mongoose.Schema;
// // var Exercise = require('./exercise')(mongoose);
//
// var Workout = new Schema({
//         author: String,
//         exercises: [{
//             quantity: Number,
//             exercise: {
//                 type: mongoose.Schema.ObjectId,
//                 ref: 'Exercise'
//             }
//             // exercise : Exercise
//         }]
//     }
// );
// // return mongoose.model('workout', Workout);
// // }
//
// module.exports = mongoose.model('Workout', Workout);
// // module.exports = create;
//
// // })();