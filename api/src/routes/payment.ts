import express, { Request, Response } from 'express'

const router = express.Router()

router.post('/api/secret', async (req: Request, res: Response) => {
  console.log('Invoked')
})

export { router as paymentsRouter }