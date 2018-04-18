const express = require('express');
const router = express.Router();

const usersControllers = require('./controllers/usersControllers');


/* ----- routes ----- */
router.post('/users', usersControllers.insertUsers);

module.exports = router;

