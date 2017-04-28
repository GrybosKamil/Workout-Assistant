'use strict';

(function () {

    angular.module('workoutAssistantApp')
        .config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');

                $routeProvider.when('/', {
                    template: 'Workout Assistant : Main page'
                }).when('/about', {
                    template: '<about>Jestem Pau!</about>',
                    controller: ''
                    // templateUrl: 'public/app/about/about.template.html'
                }).when('/contact', {
                    template: 'Contact'
                }).when('/404', {
                    template: 'Looks like you got lost. <a href="/">Back to home.</a>'
                }).// when('/phones/:phoneId', {
                //   template: '<phone-detail></phone-detail>'
                // }).
                otherwise('/404');
            }
        ]);

})();
