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


var landingPage = {
    handler: function(req, reply) {
        reply.file('index.html');
    }
};

var getWorkouts = {
    handler: function (req, reply) {
        // set options for databse query
        var q ={
          descending: true,
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
};


var getMusclegroup = {
  handler: function (req, reply) {
        var q = {
          descending: true,
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
                reply(muscleGroups[0]);
            });
        });
    }
};


var sendWorkout = {
    handler: function(req, reply){


      var d = new Date();
      var cd = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();

      // sets schema for workout
      var payload = {
          "personId": "personId", //to later be replaced with actual username
          "date": cd,
          "workout": [
              {
                "exercise": req.query.exercise,
                "musclegoup": req.query.musclegroup,
                "sets": [
                  {
                    "reps": req.query.reps,
                    "kg": req.query.kg
                  }
                ]
              }
          ]
      };

      // defines unique key for data
      var key = payload.personId + payload.date;
      console.log(key);

      // adds payload to database
      db.add(key, payload, function(error, results){
          if (error) {
              console.log(error);
              reply(error + "\n");
          }
          console.log(results);
          reply(payload);
      });
    }
};


var workoutNew = {
    handler: function (req, reply) {
      reply.file("static/html/workoutForm.html");
    },
};


module.exports = [
    {method: 'GET', path: '/static/{param*}', config: { handler: { directory: { path: 'static'}}}},
    {method: 'GET', path: '/', config: landingPage},
    {method: 'GET', path: '/workouts', config: getWorkouts},
    {method: 'GET', path: '/workouts/musclegroup', config: getMusclegroup},
    {method: 'GET', path: '/newworkout', config: workoutNew},
    {method: 'POST', path:'/newworkout/workout', config: sendWorkout}
];
