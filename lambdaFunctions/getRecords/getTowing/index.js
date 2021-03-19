const dynamoose = require('dynamoose');
const towingModel = require('./towing-schema.js');


exports.handler = async (event) => {

  let data;
  let id = event.pathParameters && event.pathParameters.id;

  try {

    if(id) {
      data = await towingModel.query('id').eq(id).exec();
    } else {
      data = await towingModel.scan().exec();
    }

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