'use strict';

(function () {

    const router = require('express').Router();
    const multer = require('multer');
    const path = require('path');
    const fileSystem = require('fs');
    const auth = require('../../../config/auth')();
    const ctrlResponse = require('../../../controllers/response');
    const ctrlAuth = require('../../../controllers/authentication');

    const storageAndroidAPK = path.join(__dirname, "..", "..", "..", "..", "uploads", "android-apk");

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

    router.route('/')
        .get((req, res, next) => {
                getApplicationsAPK(req, res);
            }
        );

    router.route('/new')
        .post(auth.authenticate(), (req, res, next) => {
                ctrlAuth.verifyAdministrator(req, res, uploadNewAndroidAPK);
            }
        );

    router.route('/:apkId')
        .get((req, res, next) => {
            downloadAndroidAPK(req, res);
        })
        .delete(auth.authenticate(), (req, res, next) => {
            deleteAndroidAPK(req, res);
        });


    module.exports = router;


    const deleteAndroidAPK = function (req, res) {
        let apkId = req.params.apkId;

        let fileName = apkId + '.apk';
        let filePath = path.join(storageAndroidAPK, fileName);

        if (fileSystem.existsSync(filePath)) {
            fileSystem.unlink(filePath, (err) => {
                if (err) {
                    return ctrlResponse.sendJSON(res, 400, {});
                } else {

                    let socketio = req.app.get('socketio');
                    socketio.sockets.emit('android-apk', {
                        data: {
                            new: 0,
                            message: "Usunięte"
                        }
                    });
                    return ctrlResponse.sendJSON(res, 200, {});
                }
            });
        } else {
            ctrlResponse.sendJSON(res, 400, {});
        }
    };

    const getApplicationsAPK = function (req, res) {
        fileSystem.readdir(storageAndroidAPK, (err, files) => {
            let fileList = files.map((file) => {
                return file.substring(0, file.length - 4);
            });
            ctrlResponse.sendJSON(res, 200, fileList);
        });
    };

    const uploadNewAndroidAPK = function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                console.log(err);

                res.json({
                    error_code: 1,
                    err_desc: err
                });
                return;
            }

            let socketio = req.app.get('socketio');
            socketio.sockets.emit('android-apk', {
                new: 1,
                message: "Dodane"
            });

            res.json({error_code: 0, err_desc: null});
        });
    };

    const downloadAndroidAPK = function (req, res) {
        let apkId = req.params.apkId;

        let fileName = apkId + '.apk';
        let filePath = path.join(storageAndroidAPK, fileName);

        if (fileSystem.existsSync(filePath)) {
            let stat = fileSystem.statSync(filePath);

            res.writeHead(200, {
                'Content-Type': 'application/vnd.android.package-archive',
                'Content-Disposition': 'attachment;filename=' + fileName,
                'Content-Length': stat.size
            });

            let readStream = fileSystem.createReadStream(filePath);
            readStream.pipe(res);
        } else {
            ctrlResponse.sendJSON(res, 404, undefined);
        }
    }

})();