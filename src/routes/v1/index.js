'use strict';
var express = require('express');
var router = express.Router()

router.get('/', (req, res) => {
  // redirect to swagger or something?
  res.json({status: 'ping pong?'})
})

// -------- STATUS ----------
router.get('/status', require('./status').GET)
router.post('/status', require('./status').POST);

// -------- STATUS/::NAME ----------
router.get('/status/:statusName', require('./statusName').GET)
router.post('/status/:statusName', require('./statusName').POST)
router.delete('/status/:statusName', require('./statusName').DELETE);


// -------- STATUS/::NAME/HISTPRY ----------
router.get('/status/:statusName/history', require('./history'));

module.exports = router;
