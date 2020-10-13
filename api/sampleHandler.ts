import 'source-map-support/register'
import { Connection } from 'mongoose'
import { setupXRay } from '../helpers/setup-xray'
import { initConnection } from '../database/connection'
import { CloudWatchLogsHandler, APIGatewayProxyHandler, CloudWatchLogsEvent, Context, APIGatewayEvent } from 'aws-lambda'

setupXRay()

export const handler: CloudWatchLogsHandler | APIGatewayProxyHandler = async (event: CloudWatchLogsEvent | APIGatewayEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    const connection: Connection = await initConnection()
    const User = connection.model('User')
    await User.find({})
  } catch (error) {
    console.error(error.response ? error.response : error.message)
    throw error
  }
}
