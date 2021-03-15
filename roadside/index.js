
const { v4: uuid } = require('uuid');
const dynamoose = require('dynamoose');
const  roadsideModel = require('./roadside-schema.js');


exports.handler = async (event) => {

  const { incidentId, incidentDate, name, phone, vehicle, location } = JSON.parse(event.body);
  let data;

  let id = uuid();

  try {


     let record = new  roadsideModel({
            id,
            incidentId,
            incidentDate,
            name,
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