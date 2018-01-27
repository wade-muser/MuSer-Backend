require("dotenv").config({
    path: "env/config.env"
});
const SQSConsumer = require("sqs-consumer");

function handleSQSMessage(message, done) {
    const body = JSON.parse(message.Body);
    console.log(body);
    return done();
}

const app = SQSConsumer.create({
    queueUrl: process.env.SQS_CRON_JOB_QUEUE_URL,
    region: process.env.SQS_REGION,
    batchSize: 10,
    handleMessage: handleSQSMessage,
    waitTimeSeconds: 5,
    visibilityTimeout: 0.5,
});

app.on('error', (err) => {
    console.error(err);
});

app.start();