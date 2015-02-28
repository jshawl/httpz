var mongoose = require('mongoose');
var requestSchema = new mongoose.Schema({
  createdAt: { type: Date }
});

module.exports = mongoose.model('Request', requestSchema, 'Requests');
