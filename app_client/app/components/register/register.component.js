'use strict';

(function () {

    angular.module('register')
        .component('register', {
            templateUrl: 'app/components/register/register.template.html',
            controller: function Register($scope, $window, Authorization) {
                const self = this;

                if (Authorization.isLoggedIn()) {
                    $window.location.href = '/#!/profile';
                    return;
                }

                this.newUser = {
                    username: "",
                    email: "",
                    password: ""
                };

                this.wrongCredentials = false;
                this.processingRegister = false;

                this.register = function () {
                    self.processingRegister = true;

                    Authorization
                        .register(self.newUser)
                        .then(function (data) {
                            $window.location.href = '#!/';

                            self.wrongCredentials = false;
                        })
                        .catch(function (error) {
                            self.newUser = {
                                username: "",
                                email: "",
                                password: ""
                            };
                            self.wrongCredentials = true;
                        })
                        .finally(function () {
                            $scope.form.$setPristine();
                            self.processingRegister = false;
                        });
                };
            }
        });
})();
