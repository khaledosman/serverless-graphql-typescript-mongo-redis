import { RedisCache } from 'apollo-server-cache-redis'
import Redis from 'ioredis'

const IS_OFFLINE = process.env.IS_OFFLINE
const redisOpts = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: Number(process.env.REDIS_PORT)
}

let redisCache: RedisCache = null
let redisClient: Redis.Redis = null
export function onRedisConnected (): Promise<{redisCache: RedisCache, redisClient: Redis.Redis}> {
  return new Promise((resolve, reject) => {
    if (redisClient) {
      console.log('using cached redis connection')
      resolve({ redisCache, redisClient })
    } else {
      redisCache = !IS_OFFLINE && new RedisCache(redisOpts)
      redisClient = IS_OFFLINE ? null /* new Redis(redisOpts) */: redisCache.client

      if (!IS_OFFLINE) {
        redisClient.on('connect', () => {
          console.log('connected to redis')
          resolve({ redisCache, redisClient })
        })
        redisClient.on('error', err => {
          reject(err)
        })
      } else {
        resolve({ redisCache, redisClient })
      }
    }
  })
}
