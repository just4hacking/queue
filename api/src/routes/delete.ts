import { NotFoundError } from '@asaqueue/common'
import express, { Request, Response } from 'express'
import { withStorage } from '../middlewares'

const router = express.Router()

router.delete('/api/task', withStorage, async (req: Request, res: Response) => {
  const item = req.storage?.pop()

  if (item === null) {
    res.status(204).send()
    return
  }
  
  res.status(200).send({ item })
})

export { router as indexTaskRouter }