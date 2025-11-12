const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { message, topicArn } = body;
    if (!message || !topicArn) {
      return { statusCode: 400, body: JSON.stringify({ error: 'message and topicArn required' }) };
    }
    await sns.publish({
      Message: message,
      TopicArn: topicArn,
    }).promise();
    return { statusCode: 200, body: JSON.stringify({ message: 'Reminder sent successfully' }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
