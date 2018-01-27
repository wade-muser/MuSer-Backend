require("dotenv").config({
    path: "env/config.env"
});
const aws = require("aws-sdk");
const config = {
    accessKeyId: process.env.SQS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SQS_SECRET_ACCES_KEY,
    region: process.env.SQS_REGION,
};
aws.config.update(config);
const sqs = new aws.SQS();

const message = {
    payload: "Hello Bo$$"
};
const sqsParams = {
    MessageBody: JSON.stringify(message),
    QueueUrl: process.env.SQS_CRON_JOB_QUEUE_URL
};

sqs.sendMessage(sqsParams, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});