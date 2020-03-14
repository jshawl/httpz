var Path = require('path');
var Hapi = require('hapi');
var server = new Hapi.Server();
var SocketIO = require('socket.io')
var Handlebars = require('handlebars');
var helpers = require('diy-handlebars-helpers');
var fs = require('fs');
var Handlebars = require('handlebars');
var db = require('./config/db.js');
var template = fs.readFileSync('views/request.html', 'utf8');

var Appointment = require('./models/appointment.js');

var handler = (io) => (req, res) => {
  Appointment.findOne({ _id: req.params.id }, function(err, apt) {
    if (err) return res(err);
    var request = {
      headers: req.headers,
      method: req.method,
      payload: req.payload || req.query,
      createdAt: new Date().toISOString(),
      id: apt._id,
    }
    apt.requests.push(request);
    apt.save();
    io.to(req.params.id).emit('proxy', request.payload);
    io.to(req.params.id).emit('request', Handlebars.compile(fs.readFileSync('views/request.html', 'utf8'))(request));
    res(request)
  })
}

let routes = (io) => [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => (reply.view('index'))
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: function(request, reply) {
      if (request.query.challenge) {
        reply(request.query.challenge)
      } else if (JSON.stringify(request.query) != "{}") {
        handler(request, reply)
      } else {
        Appointment.findOne({ _id: request.params.id }, function(err, apt) {
          if (err) return reply(err)
          apt.requests = apt.requests.reverse()
          apt.host = request.info.host;
          reply.view('show', { data: apt });
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/public/{path*}',
    handler: {
      directory: {
        path: "./public",
        listing: false,
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/appointments/create',
    handler: function(req, res) {
      var apt = new Appointment({
        createdAt: new Date()
      })
      apt.save(function(err, apt) {
        if (err) return res(err);
        res.redirect('/' + apt._id);
      })
    }
  },
  ...['POST', 'PUT', 'PATCH', 'DELETE'].map(method => (
    { method: method, path: '/{id}', handler: handler(io) }))
]

Handlebars.registerHelper('json', function(obj) {
  return JSON.stringify(obj);
});

Handlebars.registerPartial('request', template);

server.connection({ 
  host: 'localhost', 
  port: 3030
});

var data = JSON.parse( fs.readFileSync('public/dist/rev-manifest.json','utf-8') );
console.log( data)
server.views({
  engines: {
    html: Handlebars
  },
  path: Path.join(__dirname, 'views'),
  layout: true,
  layoutPath: Path.join(__dirname, 'views/layout'),
  context: {
    css: data['assets/styles.css'],
    js: data['js/app.js']
  }
})

server.start( db );

var io = SocketIO.listen(server.listener);
io.sockets.on('connection', function( socket ){
  ref = socket.handshake.headers.referer.split('/')
  socket.join( ref[ref.length - 1] )
})

server.route(routes(io));