# Oopsie
Version 1.0.0

## Overview

- Summary: 
A back-end application simulating communication between a driver in distress and different entities of roadside assistance, such as police report, towing service or a service like AAA. The app will utilize several elements of Amazon Web Services including, SNS, SQS, API Gateway, Lambda functions and DynamoDB.
- What problem or pain point does it solve? 
    - Our application helps drivers with situations that need to be solved by the services that we provide. Stream lines the dispatch of road side assistance to drivers in need.
- Minimum Viable Product (MVP) definition.
    - An application that generates simulated situations through AWS and communicates to responders and drivers. Responders will store records in database using an API Gateway and Lambda functions.

- In addition, the app sends emails and SMS messages to users using AWS SNS, SMS and SES.

## Authors
- Nick Abramowicz
- Nick Magruder
- Seid Mohamed
- William Moreno

## Getting Started

- Currently, this application is written and configured to run on specific AWS SNS queues, lambdas and API routes that are not publicly accessible.
- If one wanted to run the application themselves, one would have to configure their own AWS SNS queues, lambdas and API routes and update the ARNs and URLs at various places in the code.
- For a user with the correct permissions, operation is as follows:
  - Clone the repo to a local directory
  - Open a separate terminal window for and navigate to each of the following directories and run the terminal command "npm install"
    - incident, insurance, policeDispatch, policeRecords, roadside, towing
  - First, within each folder that isn't "incident", run the terminal command "node <foldername>.js" to start the service response nodes
  - Then, run "node manualevent.js" within the incident terminal window
  - Follow the in-terminal instructions to generate incidents that will be responded to by the correct service nodes

## Features

- Simulated incidents are fed into the system and will automatically be routed to the relevant services through use of SNS and SQS FIFO topics and queues.
- A specific incident can be created and fed into the system using the manualEvent.js file located in the 'incident' folder.
- The simulated services will respond to messages in their queues in a First-In-First-Out manner and send emails and texts to the user.
- Simulated services access Lambda functions to store records in their associated DynamoDB table through routes in the API Gateway.

### Amazon Web Services
- Created 6 AWS SNS FIFO topics for publications
- Created 5 AWS SQS FIFO queues subscribed to various topics
- Created 4 DynamoDB tables for storing records
- Created an AWS API Gateway with routes to POST records to DynamoDB tables
- Created 4 AWS Lambda functions created to POST records to DynamoDB
- AWS SES utilited to facilitate emailing users with updates to their event
- AWS SMS utilized to facilitate text messaging users with updates

## Process

SNS topics were created first. Second, SQS queues were created and subscribed to the correct SNS topics. DynamoDB tables and API Gateway were created next. Lambda functions were created, zipped and uploaded. Using AWS management console, roles and permissions were assigned and routes were created and assigned lambda functions. Lambda functions were given permissions needed to interact with the DynamoDB. API Gateway was then deployed.

To facilitate permissions for writing code and testing, an additional IAM role was created with the correct permissions policies. This provided access to the SNS queues, Lambdas, API Gateway and Dynamo DB tables.

JS files were mob programmed for one entire path through the system.
Files were then created for the other paths to duplicate functionality for those routes. Finally, SES and SMS were researched and then integrated into the JS files.

A test suite was written to verify functionality of the api routes and is included.


*Be sure to clone the repository and then `npm install` in the terminal in order to run the tests*


## UML Diagram
Conceptual UML Diagram
![UML Whiteboard](./assets/uml-dispatch-records-add.PNG)


## Resources

- [AWS Documentation](https://docs.aws.amazon.com/)
- SNS Messaging Lambda Adapted from Sean Bradley's AWS SMS Demo on YouTube and [Github](https://github.com/Sean-Bradley/AWS-SNS-SMS-with-NodeJS)
- [AWS SNS Tutorial/Examples](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-sending-sms.html)
- UML drawing created with [miro](https://miro.com/)
