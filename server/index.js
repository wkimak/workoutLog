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

// usernames that are currently connected to chat
let usernames = {};

// rooms that are currently available in chat
let rooms = ['public'];


io.sockets.on('connection', (socket) => {

  // When user joins chat
  socket.on('add user', (username) => {

     socket.username = username;
     socket.room = 'public';

     usernames[username] = username;

     socket.join('public');

     socket.emit('updatechat', 'You have connected to the public chat');

     socket.broadcast.emit('updateusers', null, username);
     socket.broadcast.to('public').emit('updateusers', username + ' has entered this room', null);

     socket.emit('updaterooms', rooms, 'public');

  })
   
   // Get Active Users to show up on chat side bar
  socket.on('get users', () => {
    socket.emit('get users', usernames);
  })

  socket.on('chat message', (msg, time) => {
    chatControllers.saveMessages(msg, socket.username, time, socket.room); 

    let relativeTime = moment(time).fromNow();

    io.sockets.in(socket.room).emit('updatechat', socket.username, msg, relativeTime);
  })

  // When user switches room
  socket.on('switch room', (usr, myUsername) => {
    socket.leave(socket.room);
    

    if(usr !== 'public') {
      var newroom = myUsername + ' / ' + usr;
  
      var reverse = newroom.split(' ').reverse().join(' ');
      if(!rooms.includes(newroom) && !rooms.includes(reverse)){
        rooms.push(newroom);
      } else {
        newroom = rooms[rooms.indexOf(reverse)];
      }
    } else {
      newroom = 'public';
    }

    socket.join(newroom);

    socket.emit('updateusers', 'you have connected to ' + newroom);

    socket.broadcast.to(socket.room).emit('updatechat', socket.username + ' has left the room');

    socket.room = newroom;

    socket.broadcast.to(newroom).emit('updatechat', socket.username + ' has entered this room');

    socket.emit('updaterooms', rooms, newroom);
  })


  // When User leaves chat
  socket.on('disconnect', function(){
      // remove the username from global usernames list
      delete usernames[socket.username];
      // update list of users in chat, client-side
      io.sockets.emit('deleteusers', socket.username);
      // echo globally that this client has left
      socket.broadcast.emit('updatechat', socket.username + ' has disconnected');
      socket.leave(socket.room);
    });


});





http.listen('3000', () => {
	console.log('listening at port 3000');
})




