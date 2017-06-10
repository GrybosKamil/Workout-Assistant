'use strict';

(function () {

    angular.module('uploadsService', [])
        .service('Uploads', uploads);

    uploads.$inject = ['$http', 'Upload', 'Authorization'];
    function uploads($http, Upload, Authorization) {
        let self = this;

        const getAndroidApks = function () {
            return pullAndroidApks()
                .then((response) => {
                    return response.data;
                });

        };

        const pullAndroidApks = function () {
            return $http.get('/api/uploads/android-apk',
                {
                    headers: Authorization.authorizationHeader()
                });
        };

        const getAndroidApk = function (androidApkId) {
            return pullAndroidApk(androidApkId)
                .then((response) => {
                    return response.data;
                });

        };

        const pullAndroidApk = function (androidApkId) {
            return $http.get('/api/uploads/android-apk/' + androidApkId,
                {
                    headers: Authorization.authorizationHeader()
                });
        };

        const deleteAndroidApk = function (androidApkId) {
            return $http.delete('/api/uploads/android-apk/' + androidApkId,
                {
                    headers: Authorization.authorizationHeader()
                });
        };

        const createNewAndroidApk = function (file) {
            return Upload.upload({
                    url: '/api/uploads/android-apk/new',
                    data: {
                        file: file
                    },
                    headers: Authorization.authorizationHeader()
                }
            )
        };

        return {
            getAndroidApks: getAndroidApks,
            pullAndroidApks: pullAndroidApks,
            getAndroidApk: getAndroidApk,
            pullAndroidApk: pullAndroidApk,
            deleteAndroidApk: deleteAndroidApk,
            createNewAndroidApk: createNewAndroidApk
        };
    }

})();
