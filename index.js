var Path = require('path');
var Hapi = require('hapi');
var server = new Hapi.Server();
var SocketIO = require('socket.io')
var Handlebars = require('handlebars');
var helpers = require('diy-handlebars-helpers');
var fs = require('fs');
var fs = require('fs');
var Handlebars = require('handlebars');
var db = require('./config/db.js');
var template = fs.readFileSync('views/request.html', 'utf8');

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
    css: data['css/styles.css'],
    js: data['js/app.js']
  }
})

server.start( db );

var io = SocketIO.listen(server.listener);
io.sockets.on('connection', function( socket ){
  ref = socket.handshake.headers.referer.split('/')
  socket.join( ref[ref.length - 1] )
})

server.route(require('./config/routes')(io));