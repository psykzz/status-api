'use strict';
var debug = require('debug')('status-api:v1:history');
var async = require('async');

var errorResponse = require('./helper').errorResponse;

// Models
var Status = require('../../models/index').Status;
// var StatusHistory = require('../../models/index').StatusHistory;


// TODO: Fix the configuration here to reduce DRY
module.exports = (req, res) => {
  var statusHistoryConfig = {
    path: 'history',
    select: 'created status',
    options: {
      sort: {
        _id: 'desc'
      }
    }
  };
  async.waterfall([
    cb => Status.findOne({name: req.params.statusName}, "name type updated history", cb),
    (item, cb) => {
      if(!item) {
        debug("Item not found", req.params.statusName, item)
        return errorResponse(res, 'Status not found', 404);
      }
      cb(null, item);
    },
    (item, cb) => item.populate(statusHistoryConfig, cb)
  ], (err, results) => {
    res.json({
      status: 'ok',
      response: results
    })
  })
}
