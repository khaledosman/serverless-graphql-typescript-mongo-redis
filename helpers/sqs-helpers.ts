import SQS, { SendMessageResult } from 'aws-sdk/clients/sqs'

const sqs = new SQS(
  // {
  //   accessKeyId: '', // process.env.AWS_ACCESS_KEY,
  //   secretAccessKey: '', // process.env.AWS_SECRET_KEY,
  //   region: process.env.AWS_REGION
  // }
)

export function sendMessageToSQS (message): Promise<SendMessageResult> {
  return sqs.sendMessage({
    MessageBody: message,
    QueueUrl: process.env.SQS_QUEUE_URL
  }).promise()
}
