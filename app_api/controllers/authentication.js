(function () {

    const passport = require('passport');
    const mongoose = require('mongoose');
    const User = mongoose.model('User');

    const ctrlResponse = require('./response');


    module.exports.register = function (req, res) {

        // if(!req.body.name || !req.body.email || !req.body.password) {
        //   ctrlResponse.sendJSON(res, 400, {
        //     "message": "All fields required"
        //   });
        //   return;
        // }

        let user = new User();

        user.username = req.username;
        user.email = req.email;
        user.setPassword(req.password);

        user.privileges = req.privileges;

        user.save()
            .then((message) => {
                let token = user.generateJwt();
                ctrlResponse.sendJSON(res, 200, {
                    token: token
                });
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });

    };

    module.exports.login = function (req, res) {

        // if(!req.body.email || !req.body.password) {
        //   ctrlResponse.sendJSON(res, 400, {
        //     "message": "All fields required"
        //   });
        //   return;
        // }

        passport.authenticate('local', function (err, user, info) {
            let token;

            // If Passport throws/catches an error
            if (err) {
                ctrlResponse.sendJSON(res, 404,
                    err);
                return;
            }

            // If a user is found
            if (user) {
                token = user.generateJwt();
                ctrlResponse.sendJSON(res, 200, {
                    token: token
                });
            } else {
                ctrlResponse.sendJSON(res, 401,
                    info
                );
            }
        })(req, res);

    };


})();
