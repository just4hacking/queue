import express, { Request, Response } from 'express'
import { DonationRepo, ActionStatus } from '@asaqueue/common'

const router = express.Router()

router.post('/api/donations', async (req: Request, res: Response) => {
  const { comment, amount } = req.body
  
  const result = await DonationRepo.insert(comment, amount, ActionStatus.WithAction, false);
  
  res.status(201).send({ status: 'Successfully created! 🎉', result })
})

router.get('/api/donations/:id?', async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(id)
  const donations = id? [ await DonationRepo.findById(id) ] : await DonationRepo.find()

  res.status(200).send({ donations })
})

export { router as donationsRouter }