const { knex } = require('../../db/index.js');

exports.insertUsers = (req, res) => {
  knex('users').insert({username: req.body.username, password: req.body.password})
  .catch((err) => {
    console.log(err);
  })
  
  res.status(201).send();
 }




