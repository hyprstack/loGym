var path = require('path');
var _ = require('underscore');
var db = require('./database.js');
var Joi = require('joi');

//Connect to database.


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
                console.log(workouts);
                reply.view('docList', {content: workouts});
            });
        });
    }
};


var getWorkoutSearch = {
  handler: function (req, reply) {
        // set options for view results
        var q = {
          descending: true,
          stale: false
        };

        // set req.params.search to variable search for passing into view function
        var key = req.params.key;
        console.log(key);

        db.get(key, null, function(err, result){

            console.log(result.value);
            var doc = result.value;

            reply.view('workouts', {content: doc});
        });
    }
};


var sendWorkout = {
    handler: function(req, reply){


      var d = new Date();
      var cd = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();


      console.log(req.payload);

      // sets schema for workout
      // this needs to be the data from the form and then should be validated with joi!!!
      var workoutSchema = {
          "personId": "Mario", //to later be replaced with actual username
          "date": cd,
          "workout": {
              "exercise": req.payload.exercise,
              "musclegroup": req.payload.musclegroup,
              "sets": [
                  {
                    "reps": req.payload.reps,
                    "kilos": req.payload.kilos
                  },
              ]
          }
      };


      // defines unique key for data
      var key = workoutSchema.personId + cd + req.payload.exercise;
      console.log(key);

      // adds payload to database
      db.add(key, workoutSchema, function(error, results){
          if (error) {
              console.log("Coushbase error: " + error);
              reply.view('docCreated',{Response: "An exercise with that name, or that date, or muscle group already exists."});
          }
          console.log(results);
          reply.view('docCreated', {Response:"Exercise Saved!"});
      });
    },
    validate :{
        payload: {
            personId: Joi.string(),
            date: Joi.date(),
            exercise: Joi.string(),
            musclegroup: Joi.string(),
            reps: Joi.array().min(1),
            kilos: Joi.array().min(1)
        }
    }
};


var workoutNew = {
    handler: function (req, reply) {
      reply.file("static/html/workoutForm.html");
    },
};


module.exports = [
    {method: 'GET', path: '/static/{param*}', config: { handler: { directory: { path: 'static'}}}},
    {method: 'GET', path: '/home', config: landingPage},
    {method: 'GET', path: '/workouts', config: getWorkouts},
    {method: 'GET', path: '/workout/{key}', config: getWorkoutSearch},
    {method: 'GET', path: '/newworkout', config: workoutNew},
    {method: 'POST', path:'/newworkout/workout', config: sendWorkout}
];
