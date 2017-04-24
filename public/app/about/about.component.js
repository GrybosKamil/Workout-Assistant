'use strict';

(function () {
    angular.module('about')
        .component('about', {
            templateUrl: 'about/about.template.html',
            controller: function About() {
                this.message = "Some information about project"
            }

        });
})();