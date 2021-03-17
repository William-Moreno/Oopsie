
const { v4: uuid } = require('uuid');
const dynamoose = require('dynamoose');
const towingModel = require('./towing-schema.js');




exports.handler = async (event) => {

  let data;
  let id = event.pathParameters && event.pathParameters.id;
  let completeDate = Date();
  /*   let id = uuid(); */

  data = await towingModel.query('id').eq(id).exec();
  
  try {

  const {
    // id,
    incidentId,
    incidentType,
    incidentDate,
    name,
    phone,
    vehicle,
    location,
    company,
    dispatchDate,
  } = JSON.parse(event.body);


    let record = new towingModel({
      id,
      incidentId,
      incidentType,
      incidentDate,
      name,
      phone,
      vehicle,
      location,
      company,
      dispatchDate,
      completeDate
    });

    data = await record.save();

  } catch (e) {
    console.log(e);
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