import express, { Request, Response } from 'express'
import { DonationsRepo, NotFoundError, ActionStatus } from '@asaqueue/common'
import { natsWrapper } from '../nats-wrapper'
import { DonationConfirmedPublisher } from '../events/publishers'

const router = express.Router()

router.post('/api/payment/secret', async (req: Request, res: Response) => {
  const { id } = req.body

  const donation = await DonationsRepo.findById(id)

  if (!donation) {
    throw new NotFoundError()
  }

  await DonationsRepo.setPaid(id)

  if (donation.actionStatus === ActionStatus.WithAction) {
    await new DonationConfirmedPublisher(natsWrapper.client).publish({
      id: donation.id.toString()
    })
    await DonationsRepo.updateActionStatus(id, ActionStatus.InProgress)
    res.status(200).send({ status: `Success!🎉'` })
    return 
  }

  res.status(200).send({ status: `Donation is already processed. ActionStatus: ${donation.actionStatus}` })
})

export { router as paymentsRouter }