const dynamoose = require('dynamoose');
const insuranceModel = require('./insurance-schema.js');


exports.handler = async (event) => {

  let data;
  let id = event.pathParameters && event.pathParameters.id;

  try {

    if(id) {
      data = await insuranceModel.query('id').eq(id).exec();
    } else {
      data = await insuranceModel.scan().exec();
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