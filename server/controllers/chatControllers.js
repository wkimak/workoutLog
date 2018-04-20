const { knex } = require('../../db/index.js');
const moment = require('moment');

exports.saveMessages = (msg, username, time) => {
	
  let dateTime = moment(new Date(time)).format("YYYY-MM-DD HH:mm:ss");

	knex('messages').insert({message: msg, created_at: dateTime})
	.catch((err) => {
		console.log('error saving message in db', err);
	})
	
}