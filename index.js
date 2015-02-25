var Path = require('path');
var Hapi = require('hapi');
var server = new Hapi.Server();

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

server.start(function(){
  console.log('Server running at:', server.info.uri );
});