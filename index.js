var Path = require('path');
var Hapi = require('hapi');
var mongoose = require('mongoose');
var server = new Hapi.Server();
var SocketIO = require("socket.io")
var dbUrl = 'mongodb://localhost:27017/hook-clinic';
var Handlebars = require('handlebars');
var helpers = require('diy-handlebars-helpers');
var fs = require('fs');
var fs = require('fs');
var Handlebars = require('handlebars');
Handlebars.registerHelper('json', function(obj) {
       return JSON.stringify(obj);
});

var template = fs.readFileSync('views/request.html', 'utf8');
Handlebars.registerPartial("request", template);

var dbOpts = {
  db: {
    native_parser: true
  },
  server: {
    poolSize: 5
  }
}

server.connection({ 
    host: 'localhost', 
    port: 3030
});


server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, 'views'),
  layout: true,
  layoutPath: Path.join(__dirname, 'views/layout')
})



server.start(function(){
  mongoose.connect( dbUrl, dbOpts, function( err ){
    if( err ) server.log( 'error', err )
  })
  console.log('Server running at:', server.info.uri );
});

var io = SocketIO.listen(server.listener);
server.route(require('./config/routes')(io));