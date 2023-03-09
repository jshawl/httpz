require("./db")();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");
var logger = require("./logger");
var Appointment = require("./appointment.js");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);
app.use(express.static(path.join(__dirname, "../client/build")));
var server = require("http").Server(app);
var io = require("socket.io")(server);

io.sockets.on("connection", function(socket) {
  const { id } = socket.handshake.query;
  if (!id) return;
  socket.join(id);
});

var handler = io => (req, res) => {
  Appointment.receive(req.params.id, req, request => {
    io.to(req.params.id).emit("proxy", request.payload);
    io.to(req.params.id).emit("request", request);
    res.send(request);
  });
};

["POST", "PUT", "PATCH", "DELETE"].map(method => {
  app[method.toLowerCase()]("/:id", handler(io));
});

app.get("/:id.json", (req, res) => {
  Appointment.findOne({ _id: req.params.id }, function(err, apt) {
    res.json(err || apt);
  });
});

app.delete("/:id/:ts.json", (req, res) => {
  Appointment.updateOne(
    { _id: req.params.id },
    { $pull: { requests: { createdAt: req.params.ts } } },
    (err, apt) => res.json(err || apt)
  );
});

app.get("/appointments/create.json", (req, res) => {
  var apt = new Appointment({
    createdAt: new Date()
  });
  apt.save((err, apt) => res.json(err || apt));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

server.listen(process.env.PORT || 3030, '0.0.0.0');
