const express = require('express');
const router = express.Router();

const usersControllers = require('./controllers/usersControllers');
const logsControllers = require('./controllers/logsControllers');
const chatControllers = require('./controllers/chatControllers');


/* ----- routes ----- */
router.post('/signup', usersControllers.insertUsers);
router.post('/signin', usersControllers.userLogin);
router.post('/logs', logsControllers.insertLogs);

router.delete('/deleteLog', logsControllers.deleteLog);

router.get('/logs', logsControllers.getLogs);
router.get('/chat', chatControllers.getMessages);

module.exports = router;

