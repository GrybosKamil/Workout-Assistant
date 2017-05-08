'use strict';

(function () {
    angular.module('about')
        .component('about', {
            templateUrl: 'app/components/about/about.template.html',
            controller: function About() {
                this.message = "Frequent Answers and Questions";

                this.faq = [
                    {
                        "title": "What is this project?",
                        "description": "This project our final project"
                    },
                    {
                        "title": "Why is this project?",
                        "description": "Because we need graduate"
                    },
                    {
                        "title": "Who takes care of it?",
                        "description": "Two third year students : Paulina Kozioł & Kamil Gryboś"
                    }
                ];

                (function () {
                    $("#accordion").accordion({
                        animate: 200,
                        collapsible: true,
                        activate: function (event, ui) {
                            console.log(event);
                            console.log(ui);
                        }
                    });
                })(jQuery);

            }

        });
})();