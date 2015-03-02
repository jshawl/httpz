var Appointment = require('../models/appointment.js');
var Request = require('../models/request.js');
var fs = require('fs');
var Handlebars = require('handlebars');

module.exports = function( io ){
  var handler = function handler( req, res ){
    console.log( req.method );
    Appointment.findOne({_id: req.params.id}, function( err, apt ){
      if( err ) {
	res( err );
	return;
      }
      var request = {
	headers: req.headers, 
	method: req.method,
	payload: req.payload,
	createdAt: new Date().toISOString(),
	id: apt._id,
      }
      apt.requests.push( request );
      apt.save();
      Request.create({
        createdAt: new Date().toISOString()
      })
      io.to( req.params.id ).emit('proxy', request.payload );
      fs.readFile('views/request.html', 'utf8', function (err,data) {
	if (err) {
	  return console.log(err);
	}
	var template = Handlebars.compile(data);
	var r = template( request );
	io.to( req.params.id ).emit('request', r );
      });
      res( request )
    })
  }
   return [
	{
	  method: 'GET',
	  path:'/', 
	  handler: function (request, reply) {
	     Request.count({},function( err, res ){
	       reply.view('index', { len: res } );
	     })
	  }
	},
	{
	  method: 'GET',
	  path:'/{id}', 
	  handler: function (request, reply) {
	    if( request.query.challenge ){
	      reply( request.query.challenge )  
	    } else {
	    Appointment.findOne({ _id: request.params.id }, function(err, apt) {
	      if (err) {
		reply(err);
		return;
	      }
	      apt.requests = apt.requests.reverse()
	      apt.host = request.info.host;
	      reply.view('show', {data: apt});
	    });
	  }
	  }
	},
	{
	  method: 'GET',
	  path:'/public/{path*}',
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
	},
	{
	  method: 'POST',
	  path: '/{id}',
	  handler: handler
	},
	{
	  method: 'PUT',
	  path: '/{id}',
	  handler: handler
	},
	{
	  method: 'PATCH',
	  path: '/{id}',
	  handler: handler
	},
	{
	  method: 'DELETE',
	  path: '/{id}',
	  handler: handler
	}
    ]
}