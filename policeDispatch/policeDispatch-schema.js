'use strict';

const dynamoose = require('dynamoose');

const policeDispatch = new dynamoose.Schema({
  'id': String,
  'incidentId': String,
  'incidentDate': String,
  'name': String,
  'phone': String,
  'vehicle': String,
  'location': String,
});

module.exports = dynamoose.model('police-dispatch', policeDispatch);
