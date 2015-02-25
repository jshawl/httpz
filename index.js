var Path = require('path');
var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 3030
});
server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, 'views')
})

// Add the route
server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {
       reply.view('index');
    }
});

// Start the server
server.start(function(){
  console.log('Server running at:', server.info.uri );
});