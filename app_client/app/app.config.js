'use strict';

(function () {

    angular.module('workoutAssistantApp')
        .config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');

                $routeProvider
                    .when('/', {
                        //template: '<main></main>'
                        template: 'INDEX'
                    })
                    .when('/register', {
                        template: '<register></register>'
                    })
                    .when('/login', {
                        template: '<login></login>'
                    })
                    .when('/about', {
                        template: '<about></about>'
                    })
                    // .when('/contact', {
                    //     template: '<not-ready></not-ready>'
                    // })
                    // .when('/exercises', {
                    //     template: '<exercises></exercises>'
                    // })
                    // .when('/trainings', {
                    //     template: '<trainings><trainings/>'
                    // })
                    .when('/404', {
                        template: '<div class="info"> Looks like you got lost. <a href="/">Back to home.</a> </div>'
                    })
                    .otherwise('/404');
            }
        ]);

})();
