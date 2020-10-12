import 'source-map-support/register'
import { setupXRay } from '../helpers/setup-xray'
import { SQSHandler, SQSEvent, Context } from 'aws-lambda'
import { sendFcmMessage, getAccessToken } from '../helpers/firebase-cloud-messaging'

setupXRay()

export const handler: SQSHandler = async function (event: SQSEvent, context: Context) {
  context.callbackWaitsForEmptyEventLoop = false
  await Promise.all(event.Records.map(async record => {
    console.log(record)
    const { body } = record

    const { pushToken, title, message } = JSON.parse(body)
    const token = await getAccessToken()
    await sendFcmMessage(pushToken, token, {
      title: title,
      body: message
    })
  }))
}
