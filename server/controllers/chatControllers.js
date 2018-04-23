const { knex } = require('../../db/index.js');
const moment = require('moment');

exports.saveMessages = (msg, username, time, room) => {
  console.log(msg, time, username, room);
	
  let dateTime = moment(new Date(time)).format("YYYY-MM-DD HH:mm:ss");

  knex.select('id').from('users').where({ username: username })
  .then((data) => {
  	knex('messages').insert({ message: msg, usernameId: data[0].id, created_at: dateTime, room: room })
  	.catch((err) => {
  		console.log('error saving message in db', err);
  	})
  })
}

exports.getMessages = (req, res) => {
  console.log(req.query);
  knex.select().from('messages').where({ room: req.query.room })
  .join('users', 'messages.usernameId', '=', 'users.id' )
  .orderBy('created_at', 'asc')
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log('error retrieving msgs from db', err);
  })
}