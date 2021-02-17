import express, { Request, Response } from 'express'
import { TaskCreatedPublisher } from '../events/publishers'
import { natsWrapper } from '../nats-wrapper'
import { randomBytes } from 'crypto'

const router = express.Router()

router.post('/api/task', async (req: Request, res: Response) => {
  const { text } = req.body
  const id = randomBytes(6).toString('hex')
  const taskId = randomBytes(6).toString('hex')

  await new TaskCreatedPublisher(natsWrapper.client)
    .publish({
      id,
      task: {
        id: taskId,
        content: text
      }
    })
  
  res.status(201).send({ status: 'Successfully sent! 🎉' })
})

export { router as newTaskRouter }