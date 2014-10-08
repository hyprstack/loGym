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

module.exports = db;
