
const { v4: uuid } = require('uuid');
const dynamoose = require('dynamoose');
const insuranceModel = require('./insurance-schema.js');


exports.handler = async (event) => {

  const { incidentId, incidentType, incidentDate, name, insurancePolicy, phone, vehicle, location } = JSON.parse(event.body);
  let data;

  let id = uuid();

  try {


     let record = new insuranceModel({
            id,
            incidentId,
            incidentType,
            incidentDate,
            name,
            insurancePolicy,
            phone,
            vehicle,
            location,
          });
    data = await record.save();

  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    }
  }

  let response = {
    statusCode: 200,
    body: JSON.stringify(data),
  }

  return response;
}