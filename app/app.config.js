'use strict';

angular.
  module('workoutAssistantApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          template: 'Siemka'
        }).
        // when('/phones/:phoneId', {
        //   template: '<phone-detail></phone-detail>'
        // }).
        otherwise('/');
    }
  ]);
