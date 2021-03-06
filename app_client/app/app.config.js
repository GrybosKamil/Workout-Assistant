'use strict';

(function () {

    angular.module('workoutAssistantApp')
        .config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');

                $routeProvider
                    .when('/', {
                        template: '<main></main>'
                    })
                    .when('/register', {
                        template: '<register></register>'
                    })
                    .when('/login', {
                        template: '<login></login>'
                    })
                    .when('/profile', {
                        template: '<profile></profile>'
                    })
                    .when('/about', {
                        template: '<about></about>'
                    })
                    .when('/contact', {
                        template: '<not-ready></not-ready>'
                    })
                    .when('/users', {
                        template: '<users></users>'
                    })
                    .when('/users/:userId', {
                        template: '<user></user>'
                    })
                    .when('/exercises', {
                        template: '<exercises></exercises>'
                    })
                    .when('/exercises/new', {
                        template: '<new-exercise></new-exercise>'
                    })
                    .when('/exercises/:exerciseId', {
                        template: '<exercise></exercise>'
                    })
                    .when('/trainings', {
                        template: '<trainings></trainings>'
                    })
                    .when('/android-apk', {
                        template: '<android-apk></android-apk>'
                    })
                    .when('/404', {
                        template: '<div class="info"> Looks like you got lost. <a href="/">Back to home.</a> </div>'
                    })
                    .otherwise('/404');
            }
        ]);

})();
