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

        const changePrivileges = function (userId, privileges) {
            // return $http({
            //     method: 'PUT',
            //     url: '/api/users/' + userId,
            //     headers: {
            //         Authorization: 'JWT ' + Authorization.getToken()
            //     },
            //     data: {
            //         privileges: privileges
            //     }
            // });

            return $http.put('api/users/' + userId, {
                data: {
                    privileges: privileges
                }
            }, {
                headers: {
                    Authorization: 'JWT ' + Authorization.getToken(),
                },
            });

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
            changePrivileges: changePrivileges,
            deleteUser: deleteUser
        };
    }


})
();
