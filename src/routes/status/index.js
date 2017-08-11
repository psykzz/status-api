'use strict';
var debug = require('debug')('status-api:status');
var express = require('express');
var router = express.Router()

router.get('/', (req, res) => {
  res.json({status: 'ok'})
})

module.exports = router;
