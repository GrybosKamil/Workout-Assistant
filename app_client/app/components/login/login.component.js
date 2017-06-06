'use strict';

(function () {

    angular.module('login')
        .component('login', {
            templateUrl: 'app/components/login/login.template.html',
            controller: function Login($scope, $window, Authorization) {
                const self = this;

                if (Authorization.isLoggedIn()) {
                    $window.location.href = '/#!/profile';
                    return;
                }

                this.newUser = {
                    username: "",
                    password: ""
                };

                this.wrongCredentials = false;
                this.processingLogin = false;

                this.login = function () {
                    self.processingLogin = true;

                    Authorization
                        .login(self.newUser)
                        .then(function (data) {

                            $window.location.href = '#!/profile';

                            self.wrongCredentials = false;
                        })
                        .catch(function (error) {
                            self.newUser = {
                                username: "",
                                password: ""
                            };
                            self.wrongCredentials = true;
                        })
                        .finally(function () {
                            $scope.form.$setPristine();
                            self.processingLogin = false;
                        });
                };
            }
        });
})();
