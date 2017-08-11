'use strict';
var mongoose = require('mongoose');
mongoose.connect(`mongodb://db/status-api_${process.env.NODE_ENV}`);

var Schema = mongoose.Schema;

var StatusSchema = new Schema({
  name: {type: String, required: true, unique: true, validate: /^[a-zA-Z0-9-]+$/},
  type: {type: String, enum: ['percent', 'stage'], required: true},
  updated: {type: Date, default: Date.now},
  last_update: {type: Schema.Types.ObjectId, ref: 'StatusHistory'},
  history: [ {type: Schema.Types.ObjectId, ref: 'StatusHistory'} ],
});

var StatusHistorySchema = new Schema({
  status: {type: Object, required: true},
  created: {type: Date, default: Date.now},
  parent: {type: Schema.Types.ObjectId, ref: 'Status', required: true},
});

module.exports.Status = mongoose.model('Status', StatusSchema);
module.exports.StatusHistory = mongoose.model('StatusHistory', StatusHistorySchema);
