'use strict';

(function () {
    angular.module('exercises').filter('exFilter', function () {
        
        function exercisePropertiesMatches(exerciseProperties, filterProperties){
            for(var i = 0; i < filterProperties.length; i++){
                if(exerciseProperties.indexOf(filterProperties[i]) === -1)
                    return false;
            }
            return true;
        }


        return function (items, filter) {

            if(items === undefined) return;

            let resultExercises = [];

            items.forEach(function (exercise) {

                if(filter.selectedPlace !== null){
                    if(filter.selectedPlace.place !== exercise.place) return;
                }

                if(!exercisePropertiesMatches(exercise.requirements, filter.selectedReq)) return;
                if(!exercisePropertiesMatches(exercise.muscles, filter.selectedMuscles)) return;
                resultExercises.push(exercise);
            });


            return resultExercises;
        }
        
    });

})();
