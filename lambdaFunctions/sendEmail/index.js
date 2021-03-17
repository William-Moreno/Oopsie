// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-2'});

// Create sendEmail params 
let params = {
  Destination: { /* required */
    ToAddresses: [
      'oopsieappplication@gmail.com',
      /* more items */
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Html: {
       Charset: "UTF-8",
       Data: "Your insurance claim has been filed."
      },
      Text: {
       Charset: "UTF-8",
       Data: "Test Message"
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'Insurance Claim'
     }
    },
  Source: 'oopsieappplication@gmail.com', /* required */
  ReplyToAddresses: [
     'oopsieappplication@gmail.com',
    /* more items */
  ],
};

// Create the promise and SES service object
let sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
