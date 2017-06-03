'use strict';

(function () {

    const router = require('express').Router();
    const ctrlAuth = require('../../../controllers/authentication');
    const auth = require('../../../config/environment').auth;
    const ctrlResponse = require('../../../controllers/response');

    const User = require('../../../models/user');


    router.route('/')
        .post(auth, (req, res) => {
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

                        let request = {
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            privileges: 'ADMINISTRATOR'
                        };

                        ctrlAuth.register(request, res);
                    }
                )
                .catch((error) => {
                    ctrlResponse.sendJSON(res, 400, {});
                });

        });


    module.exports = router;


})();