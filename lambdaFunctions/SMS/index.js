// Adapted from Sean Bradley's AWS SMS Demo on YouTube and Github: https://github.com/Sean-Bradley/AWS-SNS-SMS-with-NodeJS
// Adapted rom AWS SNS examples: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-sending-sms.html

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });

exports.handler = async (event) => {

    var smsParams = {
        Message: event.message,
        PhoneNumber: '12064862490',
    };

    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(smsParams).promise();

    publishTextPromise.then(
        function (data) {
            console.log("MessageID is " + data.MessageId);
        }).catch(
            function (err) {
                res.end(JSON.stringify({ Error: err }));
            });

}

