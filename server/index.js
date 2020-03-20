var express = require('express');
require('./config/db.js')();
var app = express()
var bodyParser = require('body-parser')
var cors = require("cors")
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var Appointment = require('./models/appointment.js');

io.sockets.on('connection', function(socket) {
  ref = socket.handshake.headers.referer.split('/')
  ref.pop()
  socket.join(ref[ref.length - 1])
})

var handler = (io) => (req, res) => {
  Appointment.receive(req.params.id, req, request => {
    io.to(req.params.id).emit('proxy', request.payload);
    io.to(req.params.id).emit('request', request);
    res.send(request)
  })
}

['POST', 'PUT', 'PATCH', 'DELETE'].map(method => {
  app[method.toLowerCase()]("/:id", handler(io))
})

app.get('/:id.json', (req, res) => {
  Appointment.findOne({ _id: req.params.id }, function(err, apt) {
    res.json(err || apt)
  })
})

app.get("/appointments/create.json", (req, res) => {
  var apt = new Appointment({
    createdAt: new Date()
  })
  apt.save((err, apt) => res.json(err || apt))
})

server.listen(process.env.PORT || 3030)