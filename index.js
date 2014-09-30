var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
var rs = require('./lib/modules/routes.js');


var config= { };

var server = Hapi.createServer(process.env.PORT || 8080, config);

server.route(rs);

server.start(function(){
  console.log("Server started: " + server.info.uri);
});

module.exports = server;
