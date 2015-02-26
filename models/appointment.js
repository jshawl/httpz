var mongoose = require('mongoose');
var appointmentSchema = new mongoose.Schema({
  createdAt: { type: Date },
  requests: { type: Array }
});

module.exports = mongoose.model('Appointment', appointmentSchema, 'Appointments');