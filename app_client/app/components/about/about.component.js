'use strict';

(function () {

    angular.module('about')
        .component('about', {
            templateUrl: 'app/components/about/about.template.html',
            controller: function About() {
                let self = this;

                this.message = "FAQ - Frequent Answers and Questions";

                this.faq = [
                    {
                        "title": "Czym jest aplikacja?",
                        "description": "<span> Aplikacja to platforma webowa do organizacji treningów personalnych.</span>" +
                        "<span>Umożliwia wygodne przeglądanie dostępnych ćwiczeń, razem ze skompletowanymi już treningami.</span>" +
                        "<span>Przygotowany z troską o wygodę użytkownika interfejs, razem ze zintegrowaną już niedługo </span>" +
                        "<span> aplikacją mobilną, będzie pomagał zorganizować czas, jak również zadba o niezbędną motywację do ćwiczeń. </span>"
                    },
                    {
                        "title": "Po co powstał ten projekt?",
                        "description": "<span> Aplikacja powstała w ramach projektu zaliczeniowego na kursie Programowanie dla WWW</span>" +
                        "<span> na Wydziale Matematyki i Informatyki Uniwersytetu Jagiellońskiego w semestrze letnim 2016/2017. </span>"
                    },
                    {
                        "title": "Autorzy?",
                        "description": "Dwójka studentów trzeciego roku, studiów pierwszego stopnia: " +
                        "Kamil Gryboś i Paulina Kozioł"
                    }
                ];

                (function () {
                    let accordion = $("#accordion");

                    self.faq.forEach((elem) => {
                        accordion.append(`<div class="header" data-link="` + elem.link + `">` + elem.title + `</div>`);
                        accordion.append(`<div class="content">` + elem.description + `</div>`);
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