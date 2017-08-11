'use strict';
var debug = require('debug')('status-api:v1:status');
var async = require('async');

var errorResponse = require('./helper').errorResponse;

// Models
var Status = require('../../models/index').Status;

// Model fields
const STATUS_FIELDS = 'name type updated last_update';
const STATUS_HISTORY_POPULATE = [{
  path: 'last_update',
  select: 'created status'
}]

module.exports.GET = (req, res) => {
  Status.find({}, STATUS_FIELDS)
  .populate(STATUS_HISTORY_POPULATE)
  .exec((err, statuses) => {
    if(err) {
      return errorResponse(res, err);
    }
    res.json({
      status: 'ok',
      response: statuses
    })
  })
}


module.exports.POST = (req, res) => {
  var statusData = {
    name: req.body.name,
    type: req.body.type
  }
  debug('Creating new status', statusData)
  async.waterfall([
    cb => Status.findOne({name: req.body.name}, STATUS_FIELDS, cb),
    (item, cb) => {
      if(item) {
        debug('Status already exists', item)
        return errorResponse(res, 'Status already exists', 409);
      }
      cb();
    },
    (cb) => {
      var status = new Status(statusData);
      debug('Saving new status', status)
      status.save((err, status) => cb(err, status))
    },
  ], (err, results) => {
    if(err) {
      debug(err)
      return errorResponse(res, "Unable to create new status")
    }
    res.json({
      status: 'ok',
      response: results
    })
  })
}
