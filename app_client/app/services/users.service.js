'use strict';

(function () {

    angular.module('usersService', [])
        .service('Users', users);

    users.$inject = ['$http', 'Authorization'];
    function users($http, Authorization) {
        let self = this;

        const getUsers = function () {
            return pullUsers()
                .then((response) => {
                    return response.data;
                });

        };

        const pullUsers = function () {
            return $http.get('/api/users');
        };

        const getUser = function (userId) {
            return pullUser(userId)
                .then((response) => {
                    return response.data;
                });

        };
        const pullUser = function (userId) {
            return $http.get('/api/users/' + userId);
        };

        const deleteUser = function (userId) {
            return $http.delete('/api/users/' + userId,
                Authorization.authorizationHeader()
            )
        };

        return {
            getUsers: getUsers,
            pullUsers: pullUsers,
            getUser: getUser,
            pullUser: pullUser,
            deleteUser: deleteUser
        };
    }


})
();
