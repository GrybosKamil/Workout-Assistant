'use strict';

(function () {

    const router = require('express').Router();
    const User = require('../../models/user');
    // const mongoose = require('mongoose');
    // const User = mongoose.model('User');

    const ctrlAuth = require('../../controllers/authentication');
    const auth = require('../../config/environment').auth;
    const ctrlResponse = require('../../controllers/response');


    const newUser = require('./new/new');
    router.use('/new', newUser);

    router.route('/')
        .get((req, res, next) => {
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
        });

    const userId = require('./user/user');
    router.use('/', userId);

    module.exports = router;

})();