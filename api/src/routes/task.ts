import express, { Request, Response } from 'express'
import { withStorage } from '../middlewares'

const router = express.Router()

router.get('/api/task', withStorage, async (req: Request, res: Response) => {
  const item = req.storage?.pop()
  res.status(200).send({ item })
})

export { router as indexTaskRouter }