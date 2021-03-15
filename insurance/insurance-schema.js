'use strict';

const dynamoose = require('dynamoose');

const insuranceSchema = new dynamoose.Schema({
  'incidentId': String,
  'incidentDate': String,
  'name': String,
  'phone': String,
  'vehicle': String,
  'location': String,
});

module.exports = dynamoose.model('insurance-reporting', insuranceSchema);