(function () {

    const passport = require('passport');
    const mongoose = require('mongoose');
    const User = mongoose.model('User');

    const ctrlResponse = require('./response');

    const register = function (req, res) {

        // if(!req.body.name || !req.body.email || !req.body.password) {
        //   ctrlResponse.sendJSON(res, 400, {
        //     "message": "All fields required"
        //   });
        //   return;
        // }

        if (req.password.length < 2) {
            ctrlResponse.sendJSON(res, 400, {});
            return;
        }

        let user = new User();
        user.username = req.username;
        user.email = req.email;
        user.privileges = req.privileges;
        user.setPassword(req.password);

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

    const login = function (req, res) {

        // if(!req.body.email || !req.body.password) {
        //   ctrlResponse.sendJSON(res, 400, {
        //     "message": "All fields required"
        //   });
        //   return;
        // }

        passport.authenticate('local', function (err, user, info) {
            let token;

            if (err) {
                ctrlResponse.sendJSON(res, 404,
                    err);
                return;
            }

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

    const verifyUser = function (req, res, method) {
        if (!req.payload._id) {
            ctrlResponse.sendJSON(res, 401, {});
            return;
        }

        User.findById(req.payload._id)
            .then((user) => {
                    let userId = req.params.userId;

                    if (user._id != userId) {
                        ctrlResponse.sendJSON(res, 401, {});
                        return;
                    }

                    method(req, res, user);
                }
            )
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const verifyModerator = function (req, res, method) {
        if (!req.payload._id) {
            ctrlResponse.sendJSON(res, 401, {});
            return;
        }

        User.findById(req.payload._id)
            .then((user) => {
                    if (!user.hasModerator()) {
                        ctrlResponse.sendJSON(res, 401, {});
                        return;
                    }
                    method(req, res, user);
                }
            )
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const verifyAdministrator = function (req, res, method) {
        if (!req.payload._id) {
            ctrlResponse.sendJSON(res, 401, {});
            return;
        }

        User.findById(req.payload._id)
            .then((user) => {
                    if (!user.hasAdministrator()) {
                        ctrlResponse.sendJSON(res, 401, {});
                        return;
                    }

                    method(req, res, user);
                }
            )
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const verifyUserOrAdmin = function (req, res, method) {
        if (!req.payload._id) {
            ctrlResponse.sendJSON(res, 401, {});
            return;
        }

        User.findById(req.payload._id)
            .then((user) => {
                    let userId = req.params.userId;

                    if (user._id != userId && !user.hasAdministrator()) {
                        ctrlResponse.sendJSON(res, 401, {});
                        return;
                    }

                    method(req, res, user);
                }
            )
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    module.exports = {
        register: register,
        login: login,
        verifyUser: verifyUser,
        verifyModerator: verifyModerator,
        verifyAdministrator: verifyAdministrator,
        verifyUserOrAdmin: verifyUserOrAdmin
    }

})();
