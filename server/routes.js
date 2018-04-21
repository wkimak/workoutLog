const express = require('express');
const router = express.Router();

const path = require('path');

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

router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = router;

