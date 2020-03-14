var Path = require('path');
var express = require('express');
require('./config/db.js')();
var hbs = require('./config/handlebars')
var app = express()
var bodyParser = require('body-parser')
var cors = require("cors")
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set("view engine", "hbs")
app.use(express.static('public'))
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var Appointment = require('./models/appointment.js');

io.sockets.on('connection', function(socket) {
  ref = socket.handshake.headers.referer.split('/')
  socket.join(ref[ref.length - 1])
})

var handler = (io) => (req, res) => {
  Appointment.receive(req.params.id, req, request => {
    io.to(req.params.id).emit('proxy', request.payload);
    io.to(req.params.id).emit('request', hbs.compile(fs.readFileSync('views/request.html', 'utf8'))(request));
    res.send(request)
  })
}

['POST', 'PUT', 'PATCH', 'DELETE'].map(method => {
  app[method.toLowerCase()]("/:id", handler(io))
})

app.get('/', (req,res)=> res.render("index"))

app.get('/:id.json', (req, res) => {
  Appointment.findOne({ _id: req.params.id }, function(err, apt) {
    console.log(err, apt)
    if (err) return res.json(err)
    apt.requests = apt.requests.reverse()
    apt.host = req.headers.host;
    res.json(apt)
  })
  
})

app.get('/:id',(req, res)=> {
  if (req.query.challenge) {
    reply(req.query.challenge)
  } else if (JSON.stringify(req.query) != "{}") {
    handler(req, res)
  } else {
    Appointment.findOne({ _id: req.params.id }, function(err, apt) {
      console.log(err,apt)
      if (err) return res.json(err)
      apt.requests = apt.requests.reverse()
      apt.host = req.headers.host;
      res.render('show', { data: apt, scheme: process.env.NODE_ENV === "production" ? "https" : "http" });
    })
  }
})

app.get("/appointments/create.json", (req, res) => {
  var apt = new Appointment({
    createdAt: new Date()
  })
  apt.save((err, apt) => res.json(err || apt))
})

app.get("/appointments/create", (req, res) => {
  var apt = new Appointment({
    createdAt: new Date()
  })
  apt.save(function(err, apt) {
    if (err) return res(err);
    res.redirect('/' + apt._id);
  })
})

server.listen(process.env.PORT || 3030)