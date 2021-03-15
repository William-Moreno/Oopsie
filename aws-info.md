# AWS Elements

## SNS Topics

major-accident.fifo

arn:aws:sns:us-west-2:560831323692:major-accident.fifo

minor-accident.fifo

arn:aws:sns:us-west-2:560831323692:minor-accident.fifo

major-breakdown.fifo

arn:aws:sns:us-west-2:560831323692:major-breakdown.fifo

roadside-assistance.fifo

arn:aws:sns:us-west-2:560831323692:roadside-assistance.fifo

auto-theft-breakin.fifo

arn:aws:sns:us-west-2:560831323692:auto-theft-breakin.fifo


## SQS Queues

police-dispatch.fifo

arn:aws:sqs:us-west-2:560831323692:police-dispatch.fifo

https://sqs.us-west-2.amazonaws.com/560831323692/police-dispatch.fifo

police-records.fifo

arn:aws:sqs:us-west-2:560831323692:police-records.fifo

https://sqs.us-west-2.amazonaws.com/560831323692/police-records.fifo

towing-service.fifo

arn:aws:sqs:us-west-2:560831323692:towing-service.fifo

https://sqs.us-west-2.amazonaws.com/560831323692/towing-service.fifo

roadside-assistance.fifo

arn:aws:sqs:us-west-2:560831323692:roadside-assistance.fifo

https://sqs.us-west-2.amazonaws.com/560831323692/roadside-assistance.fifo

insurance-reporting.fifo

arn:aws:sqs:us-west-2:560831323692:insurance-reporting.fifo

https://sqs.us-west-2.amazonaws.com/560831323692/insurance-reporting.fifo


## API Gateway

oopsie-api (not yet deployed)

## DynamoDB

police-records

arn:aws:dynamodb:us-west-2:560831323692:table/police-records

towing-records

arn:aws:dynamodb:us-west-2:560831323692:table/towing-records

roadside-records

arn:aws:dynamodb:us-west-2:560831323692:table/roadside-records

insurance-claims

arn:aws:dynamodb:us-west-2:560831323692:table/insurance-claims



## Example Towing Schema Structure

- OopsieId (incidentId)
- name
- phone
- \* email
- date (incidentDate)
- location
- vehicle information


### Other Fields

- police report id
- insurance claim number
- \* name of responder



