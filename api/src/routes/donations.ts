import express, { Request, Response } from 'express'
import { DonationsRepo, ActionStatus, NotFoundError } from '@asaqueue/common'

const router = express.Router()

router.post('/api/donations', async (req: Request, res: Response) => {
  const { comment, amount } = req.body
  
  const result = await DonationsRepo.insert(comment, amount, ActionStatus.WithAction, false);
  
  res.status(201).send({ status: 'Successfully created! 🎉', result })
})

router.get('/api/donations/:id?', async (req: Request, res: Response) => {
  const { id } = req.params

  const donations = id? 
    await DonationsRepo.findById(id) 
    : await DonationsRepo.find()

  if (donations === null) {
    throw new NotFoundError()
  }

  res.status(200).send({ result: donations })
})

export { router as donationsRouter }