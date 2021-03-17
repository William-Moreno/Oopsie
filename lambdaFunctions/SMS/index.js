// Adapted from Sean Bradley's AWS SMS Demo on YouTube and Github: https://github.com/Sean-Bradley/AWS-SNS-SMS-with-NodeJS

var AWS = require('aws-sdk');

module.exports.sms = async (event) => {

    console.log("Message = " + event.query.message);
    console.log("Number = " + event.query.number);
    console.log("Subject = " + event.query.subject);
    var params = {
        Message: event.query.message,
        PhoneNumber: '+' + event.query.number,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': event.query.subject
            }
        }
    };

    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    publishTextPromise.then(
        function (data) {
            res.end(JSON.stringify({ MessageID: data.MessageId }));
        }).catch(
            function (err) {
                res.end(JSON.stringify({ Error: err }));
            });

};

