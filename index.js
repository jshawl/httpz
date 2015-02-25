var Path = require('path');
var Hapi = require('hapi');
var mongoose = require('mongoose');
var server = new Hapi.Server();
var dbUrl = 'mongodb://localhost:27017/hook-clinic';
var Handlebars = require('handlebars');


Handlebars.registerHelper('json', function(obj) {
       return JSON.stringify(obj);
});

var appointmentSchema = new mongoose.Schema({
  headers: { type: Object },
  payload: { type: Object }
});

var Appointment = mongoose.model('Appointment', appointmentSchema, 'Appointments');

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

server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {
       reply.view('index');
    }
});

server.route({
    method: 'GET',
    path:'/appointments/create', 
    handler: function (request, reply) {
       reply( 'pizza' );
    }
});

server.route({
    method: 'GET',
    path:'/appointments', 
    handler: function (request, reply) {
       Appointment.find( function( err, apts ){
        if (err){
          reply( err );
          return;
        }
        reply.view('appointments', { data: apts } );
       })
    }

});


server.route({
  method: 'POST',
  path: '/appointments',
  handler: function( req, res ){
    var apt = new Appointment({
      headers: req.headers,
      payload: req.payload
    })
    
    apt.save(function( err, apt ){
      if( err ) {
	res( err );
        return;
      }
      res( apt );
    })
  }
})

server.start(function(){
  mongoose.connect( dbUrl, dbOpts, function( err ){
    if( err ) server.log( 'error', err )
  })
  console.log('Server running at:', server.info.uri );
});