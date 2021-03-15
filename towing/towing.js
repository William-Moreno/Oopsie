'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const { Consumer } = require('sqs-consumer');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const sns = new AWS.SNS();
const dynamoose = require('dynamoose');
const towingModel = require('./towing-schema.js');

const queueUrl = 'https://sqs.us-west-2.amazonaws.com/560831323692/towing-service.fifo';

const params = {
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

let deleteParams;
let incidentInfo;

setInterval(() => {
  let stageOne;

  sqs.receiveMessage(params, function(err, data) {
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
        
      }
    });
}, 5000);

// route information to DB (superagent?) --> oopsie-api (not yet deployed)
exports.handler = async (event) => {

  let data;

  try {
    record = new towingModel({
      incidentId: incidentInfo.incidentId,
      date: incidentInfo.date,
      name: incidentInfo.name,
      phone: incidentInfo.phone,
      vehicle: incidentInfo.vehicle,
      location: incidentInfo.location,
    });
    data = await record.save();
  } catch (e) {
    return {
      status: 500,
      body: e.message,
    }
  }
  let response = {
    status: 200,
    body: JSON.stringify(data),
  }
  return response;
};

// respond to user with notification
console.log(`${incidentInfo.customer}, a tow truck has been dispatched to your location`);

  

setInterval(() => {
  sqs.deleteMessage(deleteParams, function(err, data) {
        if (err) {
          console.log('Delete Error', err);
        } else {
          console.log('Message Deleted', data);
        }
        
      });
}, 5000);