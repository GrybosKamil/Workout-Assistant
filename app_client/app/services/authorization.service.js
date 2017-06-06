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

            if (token) {
                let payload = getPayload(token);

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

        const authorizationHeader = function () {
            return {
                headers: {
                    Authorization: 'JWT ' + getToken()
                }
            }
        };

        const currentUser = function () {
            if (isLoggedIn()) {
                const token = getToken();
                let payload = getPayload(token);

                return {
                    _id: payload._id,
                    username: payload.username,
                    email: payload.email,
                    privileges: payload.privileges,
                };
            }
        };

        const hasAdministrator = function () {
            let user = currentUser();

            if (!user) {
                return false;
            }

            return user.privileges === 'ADMINISTRATOR';
        };

        const hasModerator = function () {
            let user = currentUser();

            if (!user) {
                return false;
            }

            return user.privileges === 'MODERATOR';
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


        const getPayload = function (token) {
            let payload = token.split('.')[1];
            payload = $window.atob(payload);
            return JSON.parse(payload);
        };

        return {
            currentUser: currentUser,
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            register: register,
            login: login,
            logout: logout,
            authorizationHeader: authorizationHeader,
            hasModerator: hasModerator,
            hasAdministrator: hasAdministrator,
        };
    }

})();
