'use strict';

(function () {

    angular.module('main')
        .component('main', {
            templateUrl: 'app/components/main/main.template.html',
            controller: function Main($scope) {
                let self = this;

                this.parallaxBackgrounds = [{
                    parallax_number: "0",
                    imageSrc: 'https://newsbook.pl/wp-content/uploads/2016/06/sport.jpg'
                }, {
                    parallax_number: "1",
                    imageSrc: 'https://www.freeletics.com/en/knowledge/wp-content/uploads/sites/12/2016/03/box-1@2x@2x.jpg'
                }];

                this.addParallaxBackground = function (parallaxBackground) {
                    (function () {
                        $(".parallax-" + parallaxBackground.parallax_number)
                            .parallax({
                                imageSrc: parallaxBackground.imageSrc
                            });
                    })(jQuery);
                };

                this.initParallax = function () {
                    self.parallaxBackgrounds
                        .forEach(self.addParallaxBackground);
                };

                this.initParallax();

                $scope.$on("$destroy", function () {
                    (function () {
                        $("div.parallax-mirror")
                            .remove();
                    })(jQuery);
                });
            }
        });

})();
