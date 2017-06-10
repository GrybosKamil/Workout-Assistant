'use strict';

(function () {

    angular.module('newExercise')
        .component('newExercise', {
            templateUrl: 'app/components/exercises/new-exercise/new-exercise.template.html',
            controller: function NewExercise($scope, $window, Authorization, Exercises) {
                const self = this;

                if (!Authorization.isLoggedIn()) {
                    $window.location.href = '/#!/login';
                    return;
                }
                if (!Authorization.hasModerator()) {
                    $window.location.href = '/#!/404';
                    return;
                }


                this.places = [ "indoor", "outdoor"];

                this.nameData = "";
                this.descriptionData="";
                this.placeData = "";
                this.chosenMuscles = [];
                this.chosenRequirements = [];

                this.newReq = "";
                this.newMuscle = "";

                this.createNewExercise = function () {

                    if(this.nameData === "" || this.descriptionData==="" || this.placeData==="") return;

                    var exercise = {
                        name: this.nameData,
                        description: this.descriptionData,
                        place: this.placeData,
                        muscles: this.chosenMuscles,
                        requirements: this.chosenRequirements
                    };

                    console.log(exercise);

                    Exercises.pushExercise(exercise)
                        .then((response) => {
                            console.log(response.data);
                            alert("Dodano ćwiczenie");
                        })
                        .catch((error) => {
                            alert("Błąd podczas dodawania ćwiczenia");
                        });

                    this.nameData = "";
                    this.descriptionData="";
                    this.placeData="";
                    this.chosenMuscles = [];
                    this.chosenRequirements = [];

                };

                this.shouldShowAddedList = function (list) {
                    return list.length > 0;
                };

                this.addItemToList = function (list, item) {

                    if(item === "") return;

                    list.push(item);

                    this.newReq = "";
                };

                this.addReqToRequirementsList = function () {

                    if(this.newReq === "") return;

                    this.chosenRequirements.push(this.newReq);

                    this.newReq = "";
                };

                this.addMuscleToMusclesList = function () {

                    if(this.newMuscle === "") return;

                    this.chosenMuscles.push(this.newMuscle);

                    this.newMuscle = "";
                }

                this.deleteFromList = function (list, idx) {
                    list.splice(idx, 1);
                }

            }
        });
})();
