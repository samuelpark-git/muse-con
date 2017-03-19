import mongoose from 'mongoose'
import User from './models/user'

export default (isDevelop) => {
  let db  = ''
  
  mongoose.Promise = require('bluebird')

    if(isDevelop) db = 'mongodb://localhost/test'
    else  db = process.env.MONGODB_URI || 'mongodb://localhost/express_prod'

    const options = {
        server: {
          socketOptions: { keepAlive: 1 }
        }
      }

    const connect = () => {
      mongoose.connect(db, options, (err) => {
        if (err) {
          console.log(`Error connecting to db: ${db}, error@: ${err}`)
        } else {
          console.log(`Connected to db: ${db}`)
        }
      })
    }
    connect()
    mongoose.connection.on('error', console.log)
    mongoose.connection.on('disconnected', connect)

}
