 const { knex } = require('../../db/index.js');
 const moment = require('moment');

 exports.insertLogs = (req, res) => {
  let formatDate = moment(req.body.created_at).format('YYYY MM DD');
  let finalDate = formatDate.replace(/\s/g, '-');

  knex.select('id').from('users').where({username: req.body.username})
  .then((data) => {
    let usernameId = data[0].id;

  	for(let i = 0; i<req.body.exercise.length; i++) {

    let exercise = req.body.exercise[i];
    let sets = req.body.sets[i];
    let reps = req.body.reps[i];

    knex.select().from('logs').where({created_at: finalDate, exercise: exercise, sets: sets, reps: reps, usernameId: usernameId})
    .then((data) => {
      if(data.length === 0) {
        knex('logs').insert({created_at: finalDate, exercise: exercise, sets: sets, reps: reps, usernameId: usernameId})
        .catch((err) => {
          console.log('error inserting log into db', err);
        })
      }
    })
   }
  })
  .catch((err) => {
  	console.log('error retrieving usernameId', err);
  })
}


exports.getLogs = (req,res) => {
  let formatDate = moment(req.query.date).format('YYYY MM DD');
  let finalDate = formatDate.replace(/\s/g, '-');
 
  knex.select('id').from('users').where({username: req.query.username})
  .then((id) => {

   knex.select().from('logs').where({created_at: finalDate, usernameId: id[0].id})
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     console.log('error retriving logs', err);
   })
  })
  .catch((err) => {
    console.log('error retriving usernameId', err);
  })

}

exports.deleteLog = (req, res) => {
  knex('logs').where({id: req.query.logId}).del()
  .then((data) => {
    res.send();
  })
  .catch((err) => {
    console.log('error deleting log item', err);
  })
}