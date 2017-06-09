'use strict';

(function () {

    const router = require('express').Router();
    const multer = require('multer');
    const auth = require('../../../config/auth')();
    const ctrlAuth = require('../../../controllers/authentication');

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/android-apk');
        },
        filename: function (req, file, cb) {
            let timestamp = Date.now();
            let format = file.originalname.split('.')[file.originalname.split('.').length - 1];
            let name = file.originalname.substring(0, file.originalname.length - (format.length + 1));

            cb(null, timestamp + '-' + name + '.' + format)
        }
    });

    const upload = multer({storage: storage}).single('file');


    router.route('/new')
        .post(auth.authenticate(), (req, res, next) => {
                ctrlAuth.verifyAdministrator(req, res, uploadNewAndroidAPK);
            }
        );

    module.exports = router;


    const uploadNewAndroidAPK = function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                console.log(err);

                res.json({error_code: 1, err_desc: err});
                return;
            }
            res.json({error_code: 0, err_desc: null});
        });
    };

})();