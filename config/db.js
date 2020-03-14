var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/hook-clinic';
var dbOpts = {
  db: {
    native_parser: true
  },
  server: {
    poolSize: 5
  }
}

module.exports = function( cb ){
  mongoose.set('debug', true);
  mongoose.connect( dbUrl, dbOpts, function( err ){
    if( err ) console.log( 'error', err )
    if( typeof cb == "function"){
    	cb( mongoose )
    }
  })
}