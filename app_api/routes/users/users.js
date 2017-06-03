'use strict';

(function () {

    const router = require('express').Router();
    const User = require('../../models/user');

    const ctrlAuth = require('../../controllers/authentication');
    const auth = require('../../config/environment').auth;
    const ctrlResponse = require('../../controllers/response');

    const newUser = require('./new/user');
    const newModerator = require('./new/moderator');
    const newAdministrator = require('./new/administrator');

    const routerNew = require('express').Router();
    routerNew.use('/user', newUser);
    routerNew.use('/moderator', newModerator);
    routerNew.use('/administrator', newAdministrator);

    router.use('/new', routerNew);

    router.route('/')
        .get((req, res, next) => {
            User.find()
                .select({
                    username: 1,
                    email: 1,
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
        });

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
        .put(auth, (req, res, next) => {
            let userId = req.params.userId;

            if (!req.payload._id) {
                ctrlResponse.sendJSON(res, 401, {});
                return;
            }


            // User.findByIdAndUpdate(
            User.update(
                {_id: userId},
                {
                    $set: {
                        // username: req.body.username,
                        email: req.body.email,
                        privileges: req.body.privileges
                    }
                })
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
            let userId = req.params.userId;

            if (!req.payload._id) {
                ctrlResponse.sendJSON(res, 401, {});
                return;
            }

            User.findById(req.payload._id)
                .exec()
                .then((user) => {
                        if (!user.hasAdministrator()) {
                            ctrlResponse.sendJSON(res, 401, {});
                            return;
                        }

                        let userId = req.params.userId;

                        User.remove({_id: userId})
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

                    }
                )
                .catch((error) => {
                    ctrlResponse.sendJSON(res, 400, {});
                });
        });


    router.route('/:userId/password')
        .put(auth, (req, res, next) => {
            let userId = req.params.userId;

            if (!req.payload._id) {
                ctrlResponse.sendJSON(res, 401, {});
                return;
            }


            User.findById(req.payload._id)
                .then((user) => {
                    if (user._id == userId) {
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
                                ctrlResponse.sendJSON(res, 400, {});
                            });

                    } else {
                        ctrlResponse.sendJSON(res, 401, {});
                    }
                })
                .catch((error) => {
                    ctrlResponse.sendJSON(res, 400, {});
                });

        });

    module.exports = router;

})();