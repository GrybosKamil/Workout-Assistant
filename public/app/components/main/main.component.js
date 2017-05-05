'use strict';

(function () {
    angular.module('main')
        .component('main', {
            templateUrl: 'app/components/main/main.template.html',
            controller: function Main() {
                var self = this;

                this.parallaxBackgrounds = [{
                    parallax_number: ".parallax-1",
                    imageSrc: 'https://newsbook.pl/wp-content/uploads/2016/06/sport.jpg'

                }, {
                    parallax_number: ".parallax-2",
                    imageSrc: 'http://watchfit.com/wp-content/uploads/2015/05/Male-Body-Shapes-Training-Tips1.jpg'
                }];

                this.addParallaxBackground = function (parallaxBackground) {
                    $(parallaxBackground.parallax_number)
                        .parallax({
                            imageSrc: parallaxBackground.imageSrc
                        });
                };

                this.initParallax = function () {
                    console.log("InitParalax");

                    $(function () {
                        self.parallaxBackgrounds
                            .forEach(self.addParallaxBackground);
                    })
                };

                this.initParallax();
            }
        });
})();
