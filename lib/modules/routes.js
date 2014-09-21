var path = require('path');
var _ = require('underscore');
var couchbase = require('couchbase');

//Connect to database.

var cluster = new couchbase.Cluster();
var db = cluster.openBucket('default');
console.log(db);
//We have a pending connection to the test database running on localhost.
//We now need to get notified if we connect successfully or if a connection error occurs

module.exports = [
  {method: 'GET', path: '/static/{param*}', config: { handler: { directory: { path: 'static'}}}},
  {method:'GET', path:'/', config: { handler: landingPage}},
  // {method:'GET', path:'/workouts', config: { handler: getWorkouts}},
  // {method:'GET', path:'/workouts/{musclegroup}', config: {handler: getMusclegroup}},
  // {method:'GET', path:'/addworkout', config: { handler: adWorkout}}
];

function landingPage (req, reply){
  reply.file('index.html');
}
