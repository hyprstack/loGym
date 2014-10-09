var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
var rs = require('./lib/modules/routes.js');


var options = {
   views: {
        engines: {
            html: require('handlebars')
        },
        basePath: __dirname,
        path: './static/views',
        layoutPath: './static/views',
        helpersPath: './static/views/helpers'
    }
};

var server = Hapi.createServer(process.env.PORT || 8080, options);

server.route(rs);

server.start(function(){
  console.log("Server started: " + server.info.uri);
});

module.exports = server;
