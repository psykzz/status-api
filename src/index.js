'use strict';
var debug = require('debug')('status-api:entrypoint');
var express = require('express');
var bodyParser = require('body-parser')

const app = express();

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Routes
app.use('/api/status', require('./routes/status'));
app.use('/api/v1', require('./routes/v1'));

var port = process.env.LISTEN_PORT || 3000;
app.listen(port, () => {
  debug(`Server started on port ${port}`);
})
