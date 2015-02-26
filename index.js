var Path = require('path');
var Hapi = require('hapi');
var mongoose = require('mongoose');
var server = new Hapi.Server();
var SocketIO = require("socket.io")
var dbUrl = 'mongodb://localhost:27017/hook-clinic';
var Handlebars = require('handlebars');
var helpers = require('diy-handlebars-helpers');
var fs = require('fs');

Handlebars.registerHelper('json', function(obj) {
       return JSON.stringify(obj);
});
var template = fs.readFileSync('views/request.html', 'utf8');
Handlebars.registerPartial("request", template);

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
      var request = {
	headers: req.headers, 
	payload: req.payload,
	createdAt: new Date(),
        id: apt._id,
      }
      console.log( request )
      apt.requests.push( request );
      apt.save();
      fs.readFile('views/request.html', 'utf8', function (err,data) {
	if (err) {
	  return console.log(err);
	}
	var template = Handlebars.compile(data);
	var r = template( request );
	io.sockets.emit('request', r );
      });
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

var io = SocketIO.listen(server.listener);