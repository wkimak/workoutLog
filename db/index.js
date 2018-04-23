const mysql = require('mysql');
const config = require('../config');

const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: config.password,
		database: 'workout_log'
	}
})





module.exports = { knex };

