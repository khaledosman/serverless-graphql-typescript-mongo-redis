import 'source-map-support/register'
import { setupXRay } from '../helpers/setup-xray'
import { createApolloServer } from '../graphql/apollo-server'
import { initConnection } from '../database/connection'
import { Connection } from 'mongoose'
import { APIGatewayEvent, Callback, Context } from 'aws-lambda'
import { onRedisConnected } from '../graphql/redis'
import { isWarmupRequest } from '../helpers/handle-warmup-plugin'
import { RedisCache } from 'apollo-server-cache-redis'
import { Redis } from 'ioredis'

setupXRay()

export const graphqlHandler = (event: APIGatewayEvent, context: Context & any, callback: Callback): void => {
  context.callbackWaitsForEmptyEventLoop = false
  if (isWarmupRequest(event, context)) {
    callback(null, {
      statusCode: 200,
      body: 'warmed'
    })
  } else {
    Promise.all([initConnection(), onRedisConnected()])
      .then(async ([connection, { redisCache, redisClient }]: [Connection, {redisCache: RedisCache, redisClient: Redis}]) => {
        const server = createApolloServer(redisCache)
        console.log('creating handler')
        server.createHandler({
          cors: {
            origin: '*',
            credentials: true
          }
        })(event, { ...context, mongooseConnection: connection, redisClient }, callback)
      })
  }
}
