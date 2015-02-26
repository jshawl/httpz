var Appointment = require('../models/appointment.js');
var today = require('moment')().startOf('day');
var db = require('../config/db.js')(function( mg ){
	console.log('connected');
	Appointment.find(function(err, apts){
		if(err) console.log(err);
		console.log("total", apts.length );
	});
	Appointment.find({
	    createdAt: {
	      $lt: today.toDate()
	    }
	}, function(err, apts){
		if(err) console.log(err);
		console.log("total", apts.length );
		for( var i = 0; i < apts.length; i++ ){
			console.log( apts[i].createdAt );
		}
		mg.disconnect();
	})
	
})