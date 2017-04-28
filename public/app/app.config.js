'use strict';

(function () {

    angular.module('workoutAssistantApp')
        .config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');

                $routeProvider.when('/', {
                    template: 'Workout Assistant : PAU TU BYŁA!!!'
                }).when('/about', {
                    template: '<about></about>'
                }).when('/contact', {
                    template: 'Contact'
                }).when('/404', {
                    template: 'Looks like you got lost. <a href="/">Back to home.</a>'
                }).otherwise('/404');
            }
        ]);

})();
