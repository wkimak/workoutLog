const express = require('express');
const router = express.Router();

const usersControllers = require('./controllers/usersControllers');
const logsControllers = require('./controllers/logsControllers');


/* ----- routes ----- */
router.post('/users', usersControllers.insertUsers);
router.post('/logs', logsControllers.insertLogs);

router.get('/logs', logsControllers.getLogs);

module.exports = router;

