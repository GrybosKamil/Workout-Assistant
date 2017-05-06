'use strict';

(function () {

    angular.module('workoutAssistantApp')
        .config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');

                $routeProvider.when('/', {
                    template: '<main></main>'
                }).when('/about', {
                    template: '<about></about>'
                }).when('/contact', {
                    template: 'Contact'
                }).when('/404', {
                    template: 'Looks like you got lost. <a href="/">Back to home.</a>'
                }).when('/exercises', {
                    template: '<exercises><exercises/>'
                }).otherwise('/404');
            }
        ]);

})();
