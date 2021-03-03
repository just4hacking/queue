import express, { Request, Response } from 'express'
import { DonationMessagesRepo, NotFoundError } from '@asaqueue/common'

const router = express.Router()
/*
router.post('/api/donations/messages', async (req: Request, res: Response) => {
  const { comment, amount } = req.body
  
  const result = await DonationsRepo.insert(comment, amount, ActionStatus.WithAction, false);
  
  res.status(201).send({ status: 'Successfully created! 🎉', result })
})
*/

router.get('/api/donation/messages/:id?', async (req: Request, res: Response) => {
  const { id } = req.params
  const messages = id? 
    await DonationMessagesRepo.findById(id)
    : await DonationMessagesRepo.find()
  
  if (messages === null) {
    throw new NotFoundError()
  }

  res.status(200).send({ result: messages })
})

export { router as donationMessagesRouter }