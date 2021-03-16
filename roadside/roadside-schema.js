'use strict';

const dynamoose = require('dynamoose');

const roadsideSchema = new dynamoose.Schema({
  'incidentId': String,
  'incidentDate': String,
  'name': String,
  'phone': String,
  'vehicle': String,
  'location': String,
});

module.exports = dynamoose.model('roadside-assistance', roadsideSchema);
