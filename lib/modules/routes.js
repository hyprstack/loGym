var path = require('path');
var _ = require('underscore');
var couchbase = require('couchbase');

//Connect to database.

var db = db || new couchbase.Connection({host: 'localhost:8091', bucket: 'default'}, function(err) {
    if (err) {
      console.log('Connection Error', err);
    } else {
      console.log('Connected!');
  }
 });
console.log(db);
//We have a pending connection to the test database running on localhost.
//We now need to get notified if we connect successfully or if a connection error occurs


module.exports = [
    {method: 'GET', path: '/static/{param*}', config: { handler: { directory: { path: 'static'}}}},
    {method: 'GET', path:'/', config: { handler: landingPage}},
    {method: 'GET', path:'/workouts', config: { handler: getWorkouts}},
    {method: 'GET', path:'/workouts/musclegroup', config: {handler: getMusclegroup}},
    // {method: 'GET', path:'/addworkout', config: { handler: addWorkout}}
];

function landingPage (req, reply){
    reply.file('index.html');
}

function getWorkouts (req, reply){
    // set options for databse query
    var q ={
      descending: true,
      limit: 5,
      stale: false
    };

    // show multiple exercises - db.view(designDocument, viewName, options)
    db.view('workout', 'exercise', q).query(function(err, values){
          // use pluck method from underscore to retrieve data
          var keys = _.pluck(values, 'id');
          console.log("Keys: " + keys);

            //fetch multiple documents based on the 'keys' object
            db.getMulti(keys, null, function(err, results){
                console.log('Results: ' + results);

                var workouts = [];
                for (var prop in results) {
                  workouts.push(results[prop].value);
                }
                reply(workouts);
            });
    });
}


function getMusclegroup (req, reply){
    var q = {
      descending: true,
      limit: 5,
      stale: false
    };

    db.view('workout', 'exercise', q).query(function(err, values){

        var keys = _.pluck(values, 'id');

        db.getMulti(keys, null, function(err, results){

            var muscleGroups = [];
            for (var prop in results) {
                console.log(typeof results);
                console.log(results[prop].value.workout);
                muscleGroups.push(results[prop].value.workout);
            }
            reply(muscleGroups);
        });
    });
}


// function addWorkout (req, reply){
//
// }
