import 'express-async-errors'
import { pool } from '@asaqueue/common'
import { app } from './app'
import { natsWrapper } from './nats-wrapper'

const start = async () => {
  console.log('Starting... (dev)')
  
  if (!process.env.NATS_URI) {
    throw new Error("NATS_URI must be defined")
  }
  
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined")
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined")
  }

  if (!process.env.DB_NAME) {
    throw new Error("DB_NAME must be defined")
  }

  if (!process.env.DB_USER) {
    throw new Error("DB_USER must be defined")
  }

  if (!process.env.DB_PASSWORD) {
    throw new Error("DB_PASSWORD must be defined")
  }

  if (!process.env.DB_PORT) {
    throw new Error("DB_PORT must be defined")
  }

  if (!process.env.DB_HOST) {
    throw new Error("DB_HOST must be defined")
  }

  try {
    
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID, 
      process.env.NATS_CLIENT_ID, 
      process.env.NATS_URI
    )
    
    natsWrapper.client.on('close', () => {
      console.log('NATSconnection closed')
      process.exit()
    })

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())
    
    //new TaskCompletedListener(natsWrapper.client).listen()

    await pool.connect({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    })
    console.log(`API connected to db on port: ${process.env.DB_PORT}`)
  }
  catch (err) {
    console.log(err)
  }

  const port = 3000
  app.listen(port, () => {
    console.log(`listening on ${port}!`)
  })
}

start()

