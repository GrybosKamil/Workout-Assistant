'use strict';

(function () {

    angular.module('authorizationService', [])
        .service('Authorization', authentication);

    authentication.$inject = ['$http', '$window'];
    function authentication($http, $window) {

        const saveToken = function (token) {
            $window.localStorage['token'] = token;
        };

        const getToken = function () {
            return $window.localStorage['token'];
        };

        const removeToken = function () {
            $window.localStorage.removeItem('token');
        };


        const isLoggedIn = function () {
            const token = getToken();
            let payload;

            if (token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                if (payload.exp <= Date.now() / 1000) {
                    logout();
                    return false;
                } else {
                    return true;
                }
                // return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        const currentUser = function () {
            if (isLoggedIn()) {
                const token = getToken();
                let payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    username: payload.username,
                    email: payload.email,
                    privileges: payload.privileges,
                };
            }
        };

        const register = function (user) {
            return $http.post('/api/users/register', user)
                .then((response) => {
                        saveToken(response.data.token);
                    }
                );
        };

        const login = function (user) {
            return $http.post('/api/users/login', user)
                .then((response) => {
                    saveToken(response.data.token);
                });
        };

        const logout = function () {
            removeToken();
        };

        return {
            currentUser: currentUser,
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            register: register,
            login: login,
            logout: logout
        };

    }

})();
