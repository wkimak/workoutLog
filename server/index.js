const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');

const session = require('express-session');

// Routes
const routes = require('./routes.js');
const chatControllers = require(__dirname + '/controllers/chatControllers');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static(__dirname + '/../client/dist'));

// session middleware
app.use(session({
  secret: 'its a secret',
  resave: false,
  saveUninitialized: true,
}))

app.use('/', routes);



// Chatroom Socket
io.on('connection', (socket) => {
  socket.on('chat message', (msg, username, time) => {
  	let clientTime = moment().startOf(time).fromNow();
    io.emit('chat message', msg, username, clientTime);
    chatControllers.saveMessages(msg, username, time);
  })

   socket.on('typing', (username) => {
   	socket.broadcast.emit('typing', username);
   })

  socket.on('disconnect', () => {
  	console.log('a user disconnected');
  })
})


http.listen('3000', () => {
	console.log('listening at port 3000');
})




