'use strict';

(function () {

    angular.module('profile')
        .component('profile', {
            templateUrl: 'app/components/profile/profile.template.html',
            controller: function Profile($scope, $window, Authorization) {
                const self = this;

                if (!Authorization.isLoggedIn()) {
                    $window.location.href = '/#!/login';
                    return;
                }


                this.user = Authorization.currentUser();

                this.token = Authorization.getToken();

            }
        });
})();
