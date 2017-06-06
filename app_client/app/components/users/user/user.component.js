'use strict';

(function () {

    angular.module('user')
        .component('user', {
            templateUrl: 'app/components/users/user/user.template.html',
            controller: function User($scope, $window, $routeParams, Authorization, Users) {
                const self = this;

                const userId = $routeParams.userId;

                this.currentUser = Authorization.currentUser();

                if (this.currentUser && this.currentUser._id == userId) {
                    $window.location.href = '/#!/profile';
                }

                this.user = undefined;

                this.hasAdministrator = Authorization.hasAdministrator();

                Users.getUser(userId)
                    .then((user) => {
                        self.user = user;
                    })
                    .catch((error) => {

                    });

                this.changePrivileges = function (privileges) {
                    if (privileges == self.user.privileges) {
                        return;
                    }

                    Users.changePrivileges(userId, privileges)
                        .then((response) => {
                            self.user.privileges = privileges;
                        })
                        .catch((error) => {

                        });
                };

                this.deleteUser = function () {
                    Users.deleteUser(userId)
                        .then((response) => {
                            $window.location.href = '/#!/users';
                        })
                        .catch((error) => {

                        });
                };

            }
        });
})();
