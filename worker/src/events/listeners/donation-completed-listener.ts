import { Message } from 'node-nats-streaming'
import {
  Subjects,
  Listener,
  TaskCreatedEvent,
  DonationConfirmedEvent,
  DonationsRepo,
  DonationMessagesRepo,
  ActionStatus
} from '@asaqueue/common'
import { createDonationMesssageAction } from './queue-group-name'

export class DonationConfirmedListener extends Listener<DonationConfirmedEvent> {
  readonly subject = Subjects.DonationConfirmed
  readonly queueGroupName = createDonationMesssageAction

  async onMessage(data: TaskCreatedEvent['data'], msg: Message) {
    const { id } = data

    const donation = await DonationsRepo.findById(id)

    if (donation && donation.actionStatus === ActionStatus.InProgress) {
      //should be a transaction
      {
        await DonationMessagesRepo.insert('FFFFFF', parseInt(id));
        await DonationsRepo.updateActionStatus(id, ActionStatus.Done)
        console.log(`Donation ${id} confirmed`)
      }
      msg.ack()
    }
  }
}