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
                    template: '<div class="info">Strona w budowie ... </div>'
                }).when('/exercises', {
                    template: '<exercises></exercises>'
                }).when('/trainings', {
                    template: '<trainings><trainings/>'
                }).when('/404', {
                    template: '<div class="info"> Looks like you got lost. <a href="/">Back to home.</a> </div>'
                }).otherwise('/404');
            }
        ]);

})();
