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
            console.log(items);
            console.log(filter);

            let resultExercises = [];

            items.forEach(function (exercise) {

                if(filter.selectedPlace !== ''){
                    if(filter.selectedPlace !== exercise.place) return;
                }

                if(!exercisePropertiesMatches(exercise.requirements, filter.selectedReq)) return;
                if(!exercisePropertiesMatches(exercise.muscles, filter.selectedMuscles)) return;
                resultExercises.push(exercise);
            });


            return resultExercises;
        }
        
    });

})();
