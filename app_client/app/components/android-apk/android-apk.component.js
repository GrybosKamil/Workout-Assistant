'use strict';

(function () {

    angular.module('androidApk')
        .component('androidApk', {
            templateUrl: 'app/components/android-apk/android-apk.template.html',
            controller: function AndroidApk($window, $scope, Uploads, Authorization, Socket) {
                let self = this;

                self.hasAdministrator = Authorization.hasAdministrator();

                self.newVersion = false;

                self.androidApkList = [];
                self.androidApkListError = false;

                self.submit = function () {
                    if ($scope.upload_form.file.$valid && self.file) {
                        self.uploadNewAndroidAPK(self.file);
                    }
                };

                self.uploadNewAndroidAPK = function (file) {
                    Uploads.createNewAndroidApk(file)
                        .then(function (resp) {
                                if (resp.data.error_code === 0) {
                                    self.clearForm();
                                } else {
                                    $window.alert('an error occured');
                                }
                            },
                            function (resp) {
                                $window.alert('Error status: ' + resp.status);
                            },
                            function (evt) {
                            });
                };

                self.getAndroidApkList = function () {
                    Uploads.getAndroidApks()
                        .then((response) => {
                            self.androidApkList = response;
                            self.androidApkListError = false;
                        })
                        .catch((error) => {
                            self.androidApkList = [];
                            self.androidApkListError = true;
                        });
                };

                self.deleteAndroidAPK = function (androidApkId) {
                    Uploads.deleteAndroidApk(androidApkId)
                        .then((response) => {
                            let index = self.androidApkList.indexOf(androidApkId);
                            self.androidApkList.splice(index, 1);
                        })
                        .catch((error) => {
                        })
                };

                self.clearForm = function () {
                    self.file = undefined;
                };

                const socket = Socket;

                socket.on('android-apk', function (message) {
                    if (message.data.isNew == 1) {
                        self.newVersion = true;
                    }

                    if (self.androidApkList == undefined || self.androidApkList.length == 0) {
                        self.newVersion = false;
                    }

                    self.getAndroidApkList();
                });

                self.getAndroidApkList();

            }
        });

})();