import 'express-async-errors'
import { app } from './app'
import { TaskCreatedListener } from './events/listeners'
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
    
    new TaskCreatedListener(natsWrapper.client).listen()
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

