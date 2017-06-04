'use strict';

(function () {

    const router = require('express').Router();
    const ctrlAuth = require('../../../controllers/authentication');


    const auth = require('../../../config/environment').auth;
    router.route('/user')
        .post((req, res) => {
            createUser(req, res);
        });

    router.route('/moderator')
        .post(auth, (req, res) => {
            ctrlAuth.verifyAdministrator(req, res, createModerator)
        });

    router.route('/administrator')
        .post(auth, (req, res) => {
            ctrlAuth.verifyAdministrator(req, res, createAdministrator);
        });

    module.exports = router;


    const createUser = function (req, res) {
        createNewUser(req, res, "NONE");
    };

    const createModerator = function (req, res) {
        createNewUser(req, res, "MODERATOR");
    };

    const createAdministrator = function (req, res) {
        createNewUser(req, res, "ADMINISTRATOR");
    };

    const createNewUser = function (req, res, privileges) {
        let request = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            privileges: privileges
        };

        ctrlAuth.register(request, res);
    }

})();