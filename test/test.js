var lab = require("lab");
// var lab = exports.lab = lab.script();
var server = require('../'); // require index.js
var request = require('request');


lab.experiment("Tests loGym code", function() {
  // tests

  lab.test("Render index.html file as home page", function(done){
    var options = {
      method: 'GET',
      url: '/home',
      handler: {file: 'index.html'}
    };
    //server inject lets you simulate an http request
    server.inject(options, function(response){
      lab.expect(response.statusCode).to.equal(200);
      done();
    });
  });
  
});
