 const { knex } = require('../../db/index.js');

 exports.insertLogs = (req, res) => {
 	
  knex.select('id').from('users').where({username: req.body.username})
  .then((data) => {
  	for(let i = 0; i<req.body.exercise.length; i++) {
  	 	knex('logs').insert({created_at: req.body.created_at, exercise: req.body.exercise[i], sets: req.body.sets[i], reps: req.body.reps[i], usernameId: data[0].id })
  	 	.catch((err) => {
  	 		console.log('error inserting log into db', err);
  	 	})
  	 }
  })
  .catch((err) => {
  	console.log('error retrieving usernameId', err);
  })
}