var Path = require('path');
var Hapi = require('hapi');
var mongoose = require('mongoose');
var server = new Hapi.Server();
var dbUrl = 'mongodb://localhost:27017/hook-clinic';
var Handlebars = require('handlebars');
var helpers = require('diy-handlebars-helpers');

Handlebars.registerHelper('json', function(obj) {
       return JSON.stringify(obj);
});

var appointmentSchema = new mongoose.Schema({
  createdAt: { type: Date },
  requests: { type: Array }
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
    path:'/{id}', 
    handler: function (request, reply) {
      Appointment.findOne({ _id: request.params.id }, function(err, apt) {
	if (err) {
	  reply(err);
	  return;
	}
	console.log( apt )
	apt.requests = apt.requests.reverse()
	reply.view('show', {data: apt});
      });
    }
});


server.route({
  method: 'GET',
  path:'/public/{path*}',
  handler: {
    directory: {
      path: "./public",
      listing: false,
      index: false
    }
  }
})

server.route({
    method: 'GET',
    path:'/appointments/create', 
    handler: function (req, res) {
      var apt = new Appointment({
        createdAt: new Date()
      })
      apt.save(function( err, apt ){
	if( err ) {
	  res( err );
	  return;
	}
	res.redirect('/'+ apt._id );
      })
    }
});

server.route({
  method: 'POST',
  path: '/{id}',
  handler: function( req, res ){
    Appointment.findOne({_id: req.params.id}, function( err, apt ){
      if( err ) {
	res( err );
        return;
      }
      console.log( req.payload );
      apt.requests.push( { 
	headers: req.headers, 
	payload: req.payload,
	createdAt: new Date()
      });
      apt.save();
      res( apt )
    })
  }
})

server.start(function(){
  mongoose.connect( dbUrl, dbOpts, function( err ){
    if( err ) server.log( 'error', err )
  })
  console.log('Server running at:', server.info.uri );
});