import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/api/task', async (req: Request, res: Response) => {
  res.status(200).send({ text: 'Hello world' })
})

export { router as indexTaskRouter }