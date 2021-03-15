const dynamoose = require('dynamoose');

// this whole process is magic, between AWS Lambda and DynamoDB
const roadsideSchema = new dynamoose.Schema({

  
});

// the model looks at a table based on the string argument given to this model.
module.exports = dynamoose.model('people', roadsideSchema);
