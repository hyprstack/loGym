$(document).ready(function() {
  console.log('Document ready');

  // function to add sets to specific exercise
  $('#add-set').on('click', function() {
    console.log ('Button add-set clicked');

        var htmlSets = '<div class="sets">' +
            '<label for="reps" class="labels">Reps</label><input type="text" id="reps" class="reps-column" placeholder="How many reps?" />' +
            '<label for="kilos" class="labels">Kg\'s</label><input type="text" id="kilos" class="kilos-column" placeholder="How much Kg?" />' +
        '</div>';

    $(htmlSets).insertAfter('div.sets:last');
  });

  // function to add more exercise
  $('#add-exercise').on('click', function() {
    console.log('Button add-exercise clicked');

        var htmlExercise = '<div class="workouts">' +
            '<label for="exercise" class="labels"> <strong>Exercise</strong> </label><input type="text" name="exercise" id="exercise" placeholder="Which exercise?" autofocus />' +
            '<label for="musclegroup" class="labels"> <strong>Muscle-Group</strong> </label><input type="text" name="musclegroup" id="musclegroup" placeholder="Which muscle-group?" />' +

            '<div class="sets">' +
                '<label for="reps" class="labels">Reps</label><input type="text" name="reps" id="reps" class="reps-column" placeholder="How many reps?" />' +
                '<label for="kilos" class="labels">Kg\'s</label><input type="text" name="kilos" id="kilos" class="kilos-column" placeholder="How much Kg?" />' +
            '</div>' +
            '<hr>' +
        '</div>';

    $(htmlExercise).insertAfter('div.workouts:last');
  });

});
