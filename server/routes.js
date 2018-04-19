const express = require('express');
const router = express.Router();

const usersControllers = require('./controllers/usersControllers');
const logsControllers = require('./controllers/logsControllers');


/* ----- routes ----- */
router.post('/users', usersControllers.insertUsers);
router.post('/logs', logsControllers.insertLogs);

module.exports = router;

