'use strict';

(function () {

    angular.module('androidApk')
        .component('androidApk', {
            templateUrl: 'app/components/android-apk/android-apk.template.html',
            controller: function AndroidApk($window, $scope, Upload, Authorization) {
                let self = this;

                self.hasAdministrator = Authorization.hasAdministrator();

                self.submit = function () { //function to call on form submit
                    if ($scope.upload_form.file.$valid && self.file) { //check if from is valid
                        self.upload(self.file); //call upload function
                    }
                };

                self.upload = function (file) {
                    Upload.upload({
                            url: '/api/uploads/android-apk/new',
                            data: {
                                file: file
                            },
                            headers: {
                                Authorization: 'JWT ' + Authorization.getToken()
                            }
                        },
                        Authorization.authorizationHeader()
                    ).then(function (resp) {
                        if (resp.data.error_code === 0) {
                            $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                        } else {
                            $window.alert('an error occured');
                        }
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                        $window.alert('Error status: ' + resp.status);
                    }, function (evt) {
                        console.log(evt);
                        let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                        self.progress = 'progress: ' + progressPercentage + '% ';
                    });
                };

            }
        });

})();