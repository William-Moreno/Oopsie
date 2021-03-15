'use strict';

const dynamoose = require('dynamoose');

const towingSchema = new dynamoose.Schema({
  'incidentId': String,
  'date': String,
  'name': String,
  'phone': String,
  'vehicle': String,
  'location': String,
});

module.exports = dynamoose.model('towing-records', towingSchema);