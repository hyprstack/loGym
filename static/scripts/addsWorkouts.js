$(document).ready(function() {
  console.log('Document ready');



  // function to add sets to specific exercise
  $('#add-set').on('click', function() {
    console.log ('Button add-set clicked');

        var htmlSets = '<div class="sets" name="set">' +
            '<label for="reps" class="labels">Reps</label><input type="number" name="reps" class="reps-column" placeholder="How many reps?" />' +
            '<label for="kilos" class="labels">Kg\'s</label><input type="number" name="kilos" class="kilos-column" placeholder="How much Kg?" />' +
        '</div>';

    $('div.sets:last').append(htmlSets);
  });

});
