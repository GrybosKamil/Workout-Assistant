'use strict';

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

        User.findOne({username: req.body.username})
            .then((user) => {
                if (!user) {
                    ctrlResponse.sendJSON(res, 404, {})
                }
                if (!user.validPassword(req.body.password)) {
                    ctrlResponse.sendJSON(res, 401, {})
                }

                ctrlResponse.sendJSON(res, 200, {
                    token: user.generateJwt()
                });
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });


    };

    const verifyUser = function (req, res, method) {
        // if (!req.payload._id) {
        //     ctrlResponse.sendJSON(res, 401, {});
        //     return;
        // }

        let user = req.user;

        if (!user || user._id != userId) {
            ctrlResponse.sendJSON(res, 401, {});
            return;
        }

        method(req, res, user);
    };

    const verifyModerator = function (req, res, method) {
        // if (!req.payload._id) {
        //     ctrlResponse.sendJSON(res, 401, {});
        //     return;
        // }

        let user = req.user;

        if (!user || !user.hasModerator()) {
            ctrlResponse.sendJSON(res, 401, {});
            return;
        }
        method(req, res, user);
    };

    const verifyAdministrator = function (req, res, method) {
        // if (!req.payload._id) {
        //     ctrlResponse.sendJSON(res, 401, {});
        //     return;
        // }

        let user = req.user;

        if (!user || !user.hasAdministrator()) {
            ctrlResponse.sendJSON(res, 401, {});
            return;
        }

        method(req, res, user);
    };

    const verifyUserOrAdmin = function (req, res, method) {
        // if (!req.payload._id) {
        //     ctrlResponse.sendJSON(res, 401, {});
        //     return;
        // }

        let user = req.user;

        let userId = req.params.userId;

        if (!user || user._id != userId && !user.hasAdministrator()) {
            ctrlResponse.sendJSON(res, 401, {});
            return;
        }

        method(req, res, user);
    };

    const verifyUserOrModerator = function (req, res, method) {
        // if (!req.payload._id) {
        //     ctrlResponse.sendJSON(res, 401, {});
        //     return;
        // }

        let user = req.user;

        let userId = req.params.userId;

        if (!user || user._id != userId && !user.hasModerator()) {
            ctrlResponse.sendJSON(res, 401, {});
            return;
        }

        method(req, res, user);
    };

    const identifyUser = function (req, res, method) {
        // if (!req.payload._id) {
        //     ctrlResponse.sendJSON(res, 401, {});
        //     return;
        // }

        let user = req.user;

        method(req, res, user);
    };

    module.exports = {
        register: register,
        login: login,
        verifyUser: verifyUser,
        verifyModerator: verifyModerator,
        verifyAdministrator: verifyAdministrator,
        verifyUserOrAdmin: verifyUserOrAdmin,
        verifyUserOrModerator: verifyUserOrModerator,
        identifyUser: identifyUser
    }

})();
