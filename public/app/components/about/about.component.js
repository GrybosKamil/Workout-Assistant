'use strict';

(function () {

    angular.module('about')
        .component('about', {
            templateUrl: 'app/components/about/about.template.html',
            controller: function About() {
                let self = this;

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
                    let accordion = $("#accordion");

                    self.faq.forEach((elem) => {
                        accordion.append(`<div class="header" data-link="` + elem.link + `">` + elem.title + `</div>`);
                        accordion.append(`<div class="content">` + `</div>`);
                    });

                    accordion.accordion({
                        animate: 300,
                        collapsible: true,
                        active: false,
                        header: '.header',
                        content: '.content',
                        heightStyle: 'content',
                        beforeActivate: (event, ui) => {
                            console.log(ui);
                        }
                    });

                })(jQuery);

            }
        });

})();