'use strict';

(function () {

    const router = require('express').Router();

    const androidApk = require('./android-apk/android-apk');

    router.use('/android-apk', androidApk);

    module.exports = router;

})();