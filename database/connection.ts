import { Connection, createConnection } from 'mongoose'

import { UserSchema } from './User'

// if (process.env.IS_OFFLINE) {
//   const mongoose = require('mongoose')
//   mongoose.set('debug', true)
// }
let cachedConnection: Connection = null

function setupMongooseModels (connection: Connection): void {
  try {
    // Dont redefine the model if its already defined, check if its there, if it fails re-define it
    connection.model('User')
    console.log('using cached models')
  } catch (error) {
    console.log('setting up models')
    connection.model('User', UserSchema)
  }
}

export async function initConnection (): Promise<Connection> {
  if (cachedConnection === null) {
    const connection: Connection = await createConnection(process.env.MONGO_URL, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      dbName: 'db',
      useFindAndModify: false
    })
    console.log('connected to mongo')
    setupMongooseModels(connection)
    // eslint-disable-next-line
    cachedConnection = connection
  } else {
    console.log('using cached connection')
  }
  return cachedConnection
}
