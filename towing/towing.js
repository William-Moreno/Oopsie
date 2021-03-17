'use strict';

const faker = require('faker');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const { Consumer } = require('sqs-consumer');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const sns = new AWS.SNS();
const dynamoose = require('dynamoose');
const towingModel = require('./towing-schema.js');
const superagent = require('superagent');

const queueUrl = 'https://sqs.us-west-2.amazonaws.com/560831323692/towing-service.fifo';
const apiUrl = 'https://ey5bvhivwj.execute-api.us-west-2.amazonaws.com/beta';
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
       Data: "A tow truck has been dispatched to your location."
      },
      Text: {
       Charset: "UTF-8",
       Data: "Test Message"
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'Towing Service'
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

      superagent.post(`${apiUrl}/towing`).send(incidentInfo).then(console.log(`It's Working!`));

      emailParams.Message.Body.Html.Data = `${incidentInfo.name}, ${faker.name.findName()} with ${faker.name.firstName()}'s Towing has been dispatched to your location.`;

      // Create the promise and SES service object
      let sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(emailParams).promise();

      sendPromise.then(
        function(data) {
          console.log(data.MessageId);
        }).catch(
          function(err) {
          console.error(err, err.stack);
        });
      
      // respond to user with notification
      console.log(`${incidentInfo.name}, a tow truck has been dispatched to your location`);
      }
    });


}, 5000);

// route information to DB (superagent?) --> oopsie-api (not yet deployed)