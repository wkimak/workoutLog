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



/* --------- Public Chat Socket --------- */
let usersArray = [];
io.on('connection', (socket) => {
  
  let connectedUser = socket.handshake.query.username;

  if(!usersArray.includes(connectedUser)) {
  usersArray.push(connectedUser);
  }

  socket.on('chat message', (msg, username, time) => {
  	let clientTime = moment().startOf(time).fromNow();
    io.emit('chat message', msg, username, clientTime);
    chatControllers.saveMessages(msg, username, time);
  })

  socket.on('typing', (username) => {
    socket.broadcast.emit('typing', username);
  })

  socket.on('getUsers', () => {
    io.emit('getUsers', usersArray)
  })
   
  socket.on('activeUsers', (user) => {
    if(!usersArray.includes(user)) {
      usersArray.push(user);
    }
    io.emit('activeUsers', usersArray);
  })

  socket.on('disconnect', () => {
    usersArray.splice(usersArray.indexOf(connectedUser), 1);
    io.emit('disconnectUser', usersArray);
  })

})

/* ------ Private Chat Socket ------- */
const privateIo = io.of('/privateSocket');
privateIo.on('connection', function(socket){

  socket.on('chat message', (msg, username, time) => {
    let clientTime = moment().startOf(time).fromNow();
    privateIo.emit('chat message', msg, username, clientTime);
    chatControllers.saveMessages(msg, username, time);
  })

  socket.on('typing', (username) => {
    console.log('USERNAME', username);
    socket.broadcast.emit('typing', username);
  })



  console.log('someone connected privately');
});



http.listen('3000', () => {
	console.log('listening at port 3000');
})




