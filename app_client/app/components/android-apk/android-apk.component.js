'use strict';

(function () {

    angular.module('androidApk')
        .component('androidApk', {
            templateUrl: 'app/components/android-apk/android-apk.template.html',
            controller: function AndroidApk($window, $scope, Upload, Authorization, Socket) {
                let self = this;

                self.hasAdministrator = Authorization.hasAdministrator();

                self.submit = function () {
                    if ($scope.upload_form.file.$valid && self.file) {
                        self.upload(self.file);
                    }
                };

                self.upload = function (file) {
                    console.log(file);
                    Upload.upload({
                            url: '/api/uploads/android-apk/new',
                            data: {
                                file: file
                            },
                            headers: Authorization.authorizationHeader()
                        }
                    ).then(function (resp) {
                        if (resp.data.error_code === 0) {
                            self.clearForm();
                        } else {
                            $window.alert('an error occured');
                        }
                    }, function (resp) {
                        $window.alert('Error status: ' + resp.status);
                    }, function (evt) {
                        let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        self.progress = 'progress: ' + progressPercentage + '% ';
                    });
                };

                self.clearForm = function () {
                    self.file = undefined;
                };

                $scope.$on('socket:android-apk', function (ev, data) {
                    console.log(data);
                });

            }
        });

})();