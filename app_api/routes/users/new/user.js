'use strict';

(function () {

    const router = require('express').Router();
    const ctrlAuth = require('../../../controllers/authentication');

    router.route('/')
        .post((req, res) => {

            let request = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                privileges: 'NONE'
            };
            ctrlAuth.register(request, res);
        });


    module.exports = router;

})();