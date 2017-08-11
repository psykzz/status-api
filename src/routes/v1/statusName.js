'use strict';
var debug = require('debug')('status-api:v1:statusName');
var async = require('async');

var errorResponse = require('./helper').errorResponse;

// Models
var Status = require('../../models/index').Status;
var StatusHistory = require('../../models/index').StatusHistory;

// Model fields
const STATUS_FIELDS = 'name type updated last_update';
const STATUS_FIELDS_FULL = STATUS_FIELDS + ' history';
const STATUS_HISTORY_POPULATE = [{
  path: 'last_update',
  select: 'created status'
}]
var STATUS_HISTORY_POPULATE_FULL = STATUS_HISTORY_POPULATE.concat([{
  path: 'history',
  select: 'created status',
  options: {
    limit: 5,
    sort: {
      _id: 'desc'
    }
  }
}])



module.exports.GET = (req, res) => {
  async.waterfall([
    cb => Status.findOne({name: req.params.statusName}, STATUS_FIELDS_FULL, cb),
    (item, cb) => {
      if(!item) {
        debug("Item not found", req.params.statusName, item)
        return errorResponse(res, 'Status not found', 404);
      }
      cb(null, item);
    },
    (item, cb) => item.populate(STATUS_HISTORY_POPULATE_FULL, cb)
  ], (err, results) => {
    res.json({
      status: 'ok',
      response: results
    })
  })
}


module.exports.POST = (req, res) => {
  async.waterfall([
    (cb) => Status.findOne({name: req.params.statusName}, STATUS_FIELDS_FULL, cb),
    (item, cb) => {
      if(!item) {
        debug("Item not found", req.params.statusName, item)
        return cb('Status not found');
      }
      return cb(null, item);
    },
    (item, cb) => {
      var statusHistory = new StatusHistory({
        parent: item._id
      })
      statusHistory.populate('parent', 'name type updated', cb)
    },
    (item, cb) => {
      // Add the status
      if(item.parent.type === 'percent') {
        if(!req.body.percent) {
          return cb("Invalid paramters: percent required.")
        }
        var percent = parseInt(req.body.percent, 10);
        percent = Math.min(Math.max(req.body.percent, 0), 100);

        item.status = {
          percent: percent
        }
      }
      else if(item.parent.type === 'stage') {
        // TODO: Dynamically figure the max stage out
        // Use previous history if available
        // Otherwise use the current stage
        if(!req.body.stage || !req.body.maxStages) {
          return cb("Invalid paramters: stage & maxStages required.")
        }

        item.status = {
          scale: {
            current: req.body.stage,
            max: req.body.maxStages
          }
        }
      }

      item.save((err, item) => cb(err, item))
    },
    (item, cb) => {
      Status.findOne({name: item.parent.name}, (err, stat) => {
        if(err) {
          return cb(err);
        }
        if(!stat) {
          return cb("WHAT THE FUCK? How...");
        }

        stat.last_update = item;
        stat.history.push(item);
        stat.save(err => cb(err, item))
      })
    }
  ], (err, result) => {
    if(err) {
      return errorResponse(res, err);
    }
    res.json({
      status: 'ok',
      response: result
    })
  })
}

module.exports.DELETE = (req, res) => {
  async.waterfall([
    cb => Status.findOneAndRemove({name: req.params.statusName}, cb),
  ], (err) => {
    if(err) {
      return errorResponse(res, err)
    }
    res.json({
      status: 'ok',
      response: null
    })
  })
}
