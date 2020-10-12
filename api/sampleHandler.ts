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
    const Team = connection.model('Team')
    await Team.find({})

    // await Promise.all([
    //   SportRadarOdds.bulkWrite(
    //     flattenedResults
    //       .map(item => ({
    //         updateOne: {
    //           filter: { id: item.id },
    //           update: { $set: item },
    //           upsert: true
    //         }
    //       }
    //       )))
    // ])
  } catch (error) {
    console.error(error.response ? error.response : error.message)
    throw error
    // return {
    //   statusCode: error.statusCode || error.status || (error.response && error.response.status) || 500,
    //   body: (error.response && error.response.message) || error.message || error.error || 'Internal Server Error'
    // }
  }
}
