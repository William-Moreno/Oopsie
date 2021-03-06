'use strict';

const faker = require('faker');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const { Consumer } = require('sqs-consumer');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const sns = new AWS.SNS();
const dynamoose = require('dynamoose');
const superagent = require('superagent');
const policeDispatchModel = require('./policeDispatch-schema.js');

const queueUrl = 'https://sqs.us-west-2.amazonaws.com/560831323692/police-dispatch.fifo';
const dispatchReport = 'arn:aws:sns:us-west-2:560831323692:dispatch-report.fifo';
let deleteParams;
let incidentInfo;

const receiveParams = {
  AttributeNames: [
    'SentTimestamp',
  ],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [
    'All',
  ],
  QueueUrl: queueUrl,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

let emailParams = {
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
       Data: "An officer has been dispatched to your location."
      },
      Text: {
       Charset: "UTF-8",
       Data: "An officer has been dispatched to your location."
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'Police Dispatch'
     }
    },
  Source: 'oopsieappplication@gmail.com', /* required */
  ReplyToAddresses: [
     'oopsieappplication@gmail.com',
    /* more items */
  ],
};


setInterval(() => {
  let stageOne;

  sqs.receiveMessage(receiveParams, function(err, data) {
    if (err) {
      console.log('Receive Error', err);
    } else if (data.Messages) {
      deleteParams = {
        QueueUrl: queueUrl,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      stageOne = JSON.parse(data.Messages[0].Body);
      incidentInfo = JSON.parse(stageOne.Message);
      console.log(incidentInfo);
      
      sqs.deleteMessage(deleteParams, function(err, data) {
            if (err) {
              console.log('Delete Error', err);
            } else {
              console.log('Message Deleted', data);
            }
            
      });

      // superagent.post(`${apiUrl}/police`).send(incidentInfo).then(console.log(`${incidentInfo.name},  an officer has been dispatched to your location`));

      console.log(`${incidentInfo.name}, an officer has been dispatched to your location`);

      const reportParams = {
        MessageGroupId: 'test',
        MessageDeduplicationId: faker.random.uuid(),
        TopicArn: dispatchReport,
        Message:JSON.stringify(incidentInfo),
      };
  
      sns.publish(reportParams).promise().then(console.log).catch(console.error);

      emailParams.Message.Body.Html.Data = `${incidentInfo.name}, Officer ${faker.name.findName()} has been dispatched to your location.`;

      // Create the promise and SES service object
      let sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(emailParams).promise();

      sendPromise.then(
        function(data) {
          console.log(data.MessageId);
        }).catch(
          function(err) {
          console.error(err, err.stack);
        });

      let smsParams = {
        Message: emailParams.Message.Body.Html.Data,
        PhoneNumber: '12064138371',
      };

      let publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(smsParams).promise();

      publishTextPromise.then(
        function (data) {
          console.log("MessageID is " + data.MessageId);
        }).catch(
          function (err) {
            res.end(JSON.stringify({ Error: err }));
          });

      }
    });


}, 5000);

// route information to DB (superagent?) --> oopsie-api (not yet deployed)
