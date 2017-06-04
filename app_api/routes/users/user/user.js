'use strict';

(function () {

    const router = require('express').Router();
    const ctrlAuth = require('../../../controllers/authentication');
    const auth = require('../../../config/environment').auth;
    const ctrlResponse = require('../../../controllers/response');

    const User = require('../../../models/user');
    // const mongoose = require('mongoose');
    // const User = mongoose.model('User');

    router.route('/:userId')
        .get((req, res, next) => {
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
                        ctrlResponse.sendJSON(res, 404, user)
                    } else {
                        ctrlResponse.sendJSON(res, 200, user);
                    }
                })
                .catch((error) => {
                    ctrlResponse.sendJSON(res, 400, {});
                });
        })
        .delete(auth, (req, res, next) => {
            ctrlAuth.verifyUserOrAdmin(req, res, deleteUser);
        });


    router.route('/:userId/password')
        .put(auth, (req, res, next) => {
            ctrlAuth.verifyUser(req, res, changePassword);
        });

    module.exports = router;

    const changePassword = function (req, res, user) {
        if (req.body.password.length < 2) {
            ctrlResponse.sendJSON(res, 400, {});
            return;
        }
        user.setPassword(req.body.password);

        user.update(
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
                console.log(err);
                ctrlResponse.sendJSON(res, 400, {});
            });
    };

    const deleteUser = function (req, res, user) {
        let userId = req.params.userId;

        User.remove({_id: userId})
            .then((user) => {
                if (!user) {
                    ctrlResponse.sendJSON(res, 404, user)
                } else {
                    // console.log(user);
                    ctrlResponse.sendJSON(res, 200, user);
                }
            })
            .catch((error) => {
                ctrlResponse.sendJSON(res, 400, {})
            });
    };

})();