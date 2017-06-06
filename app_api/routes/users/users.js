'use strict';

(function () {

    const router = require('express').Router();
    const User = require('../../models/user');

    const ctrlAuth = require('../../controllers/authentication');
    const auth = require("./../../../app_api/config/auth")();
    const ctrlResponse = require('../../controllers/response');

    router.route('/')
        .get((req, res, next) => {
            getUsers(req, res,);
        });


    router.route('/new/user')
        .post((req, res) => {
            createUser(req, res);
        });


    router.route('/:userId')
        .get((req, res, next) => {
            getUser(req, res);
        })
        .put(auth.authenticate(), (req, res, next) => {
            ctrlAuth.verifyAdministrator(req, res, changePrivileges)
        })
        .delete(auth.authenticate(), (req, res, next) => {
            ctrlAuth.verifyUserOrAdmin(req, res, deleteUser);
        });

    router.route('/:userId/password/change')
        .put(auth.authenticate(), (req, res, next) => {
            ctrlAuth.verifyUser(req, res, changePassword);
        });

    router.route('/password/reset')
        .post((req, res, next) => {
            resetPassword(req, res);
        });

    router.route('/register')
        .post((req, res) => {
            // register(req, res);
            createNewUser(req, res, "NONE");
        });

    router.route('/login')
        .post((req, res) => {
            login(req, res);
        });


    module.exports = router;

    const login = function (req, res) {
        ctrlAuth.login(req, res);
    };

    const register = function (req, res) {
        ctrlAuth.register(req, res);
    };

    const createUser = function (req, res) {
        let request = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            privileges: "NONE"
        };

        ctrlAuth.register(request, res);
    };

    const getUser = function (req, res, user) {
        let userId = req.params.userId;

        User.findOne({_id: userId})
            .select({
                username: 1,
                email: 1,
                // hash: 0,
                // salt: 0,
                privileges: 1
            })
            // .exec()
            .then((user) => {
                if (!user) {
                    ctrlResponse.sendJSON(res, 404, {})
                } else {
                    ctrlResponse.sendJSON(res, 200, user);
                }
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const getUsers = function (req, res, user) {
        User.find()
            .select({
                username: 1,
                // email: 1,
                // hash: 0,
                // salt: 0,
                privileges: 1
            })
            .sort({username: 1}).exec()
            .then((users) => {
                ctrlResponse.sendJSON(res, 200, users);
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, error);
            });
    };

    const deleteUser = function (req, res, user) {
        let userId = req.params.userId;
        User.remove({_id: userId})
            .then((user) => {
                if (!user) {
                    ctrlResponse.sendJSON(res, 404, {})
                } else {
                    ctrlResponse.sendJSON(res, 200, user);
                }
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {})
            });
    };

    const changePrivileges = function (req, res, user) {
        let userId = req.params.userId;

        User.update({_id: userId},
            {
                $set: {
                    privileges: req.body.privileges
                }
            })
            .then((message) => {
                let token = user.generateJwt();
                ctrlResponse.sendJSON(res, 200, {
                    token: token
                });
            })
            .catch((err) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const changePassword = function (req, res, user) {
        if (req.body.password.length < 2) {
            ctrlResponse.sendJSON(res, 400, {});
            return;
        }

        let userId = req.params.userId;

        user.setPassword(req.body.password);

        User.update({_id: userId},
            {
                $set: {
                    salt: user.salt,
                    hash: user.hash
                }
            })
            .then((message) => {
                let token = user.generateJwt();
                ctrlResponse.sendJSON(res, 200, {
                    token: token
                });
            })
            .catch((err) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const resetPassword = function (req, res) {
        let username = req.body.username;
        let email = req.body.email;

        User.findOne({username: username, email: email})
            .then((user) => {
                ctrlResponse.sendJSON(res, 200, {
                    username: username,
                    email: email,
                    message: "Found out!"
                });
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {});
            });
    };


})();