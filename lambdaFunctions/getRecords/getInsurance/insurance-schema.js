'use strict';

const dynamoose = require('dynamoose');

const insuranceSchema = new dynamoose.Schema({
  'id': String,
  'incidentId': String,
  'incidentType': String,
  'incidentDate': String,
  'name': String,
  'insurancePolicy': String,
  'phone': String,
  'vehicle': String,
  'location': String,
});

module.exports = dynamoose.model('insurance-claims', insuranceSchema);
