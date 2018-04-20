const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

// Routes
const routes = require('./routes.js');
const chatControllers = require(__dirname + 'controllers/chatControllers');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.use(express.static(__dirname + '/../client/dist'));


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    chatControllers.saveMessages();
  })

  socket.on('disconnect', () => {
  	console.log('a user disconnected');
  })
})




http.listen('3000', () => {
	console.log('listening at port 3000');
})

