const { knex } = require('../../db/index.js');


exports.insertUsers = (req, res) => {
  
  let username = req.body.username;
  let password = req.body.password;

  knex('users').insert({ username: username, password: password })
  .catch((err) => {
    res.send('account already exists');
  })
  
  res.status(201);
 }


exports.userLogin = (req, res) => {

	let username = req.body.username;
	let password = req.body.password;

  knex.select().from('users').where({ username: username })
  .then((data) => {
  	if(data.length === 0) {
  		res.send('Incorrect Username');
  	} else {
        if(password === data[0].password){
          res.send('match');
        } else {
          res.send('Incorrect Password');
        }
  	  }
  })
  .catch((err) => {
  	console.log('error logging in from server', err);
  })

}




