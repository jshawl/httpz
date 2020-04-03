var mongoose = require("mongoose");
var appointmentSchema = new mongoose.Schema({
  createdAt: { type: Date },
  requests: { type: Array }
});

appointmentSchema.statics.receive = function(id, req, callback) {
  this.findOne({ _id: id }, (err, apt) => {
    if (err) return callback(err);
    var request = {
      headers: req.headers,
      method: req.method,
      payload: req.body || req.query,
      createdAt: new Date().toISOString(),
      id: apt._id
    };
    apt.requests.push(request);
    apt.save();
    callback(request);
  });
};

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema,
  "Appointments"
);
