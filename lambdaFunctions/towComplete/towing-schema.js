'use strict';

const dynamoose = require('dynamoose');

const towingSchema = new dynamoose.Schema({
  'id': String,
  'incidentId': String,
  'incidentType': String,
  'incidentDate': String,
  'name': String,
  'phone': String,
  'vehicle': String,
  'location': String,
  'company': String,
  'dispatchDate': String,
  'completeDate': String
});

module.exports = dynamoose.model('towing-records', towingSchema);
