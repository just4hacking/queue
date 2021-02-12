import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/api/test', async (req: Request, res: Response) => {
  res.send({ text: 'Hello world' })
})

export { router as indexOrderRouter }