'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const { Consumer } = require('sqs-consumer');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const sns = new AWS.SNS();
const dynamoose = require('dynamoose');
const towingModel = require('./towing-schema.js');
const superagent = require('superagent');

const queueUrl = 'https://sqs.us-west-2.amazonaws.com/560831323692/towing-service.fifo';
const apiUrl = 'https://ey5bvhivwj.execute-api.us-west-2.amazonaws.com/beta';

const companyName = 'Bob\'s Towing'
const companyAddress = '1313 Industrial Blvd'


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
let returnedID;

setInterval(() => {
  let stageOne;

  sqs.receiveMessage(params, function (err, data) {
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

      sqs.deleteMessage(deleteParams, function (err, data) {
        if (err) {
          console.log('Delete Error', err);
        } else {
          console.log('Message Deleted', data);
        }

      });

      incidentInfo.dispatchDate = Date();
      incidentInfo.company = companyName;

      function getID(input) {
        returnedID = input;
        return returnedID;
      }

      superagent.post(`${apiUrl}/towing`).send(incidentInfo).then(() => {
        // console.log(response.body);
        getID(response.body.id)
      });

      incidentInfo.id = returnedID;
      console.log( 'first', incidentInfo);

      // respond to user with notification
      console.log(`${incidentInfo.name}, a ${companyName} tow truck has been dispatched from ${companyAddress} to ${incidentInfo.location}`);
    }

  });


}, 5000);

setInterval(() => {

  console.log('second', incidentInfo);

  // update the db record to show completed time, completed-by company
  superagent.put(`${apiUrl}/towing/${incidentInfo.id}`).send(incidentInfo).then(console.log('Towing DB complete test'));

  // respond to user with notification
  console.log(`${incidentInfo.name}, your Oopsie incident has been completed by ${companyName}`);

}, 5000);
