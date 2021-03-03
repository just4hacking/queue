import { Message } from 'node-nats-streaming'
import {
  Subjects,
  Listener,
  TaskCreatedEvent,
  DonationConfirmedEvent
} from '@asaqueue/common'
import { createDonationMesssageAction } from './queue-group-name'

export class DonationConfirmedListener extends Listener<DonationConfirmedEvent> {
  readonly subject = Subjects.DonationConfirmed
  readonly queueGroupName = createDonationMesssageAction

  async onMessage(data: TaskCreatedEvent['data'], msg: Message) {
    const { id } = data
    console.log(`Donation ${id} confirmed`)
    msg.ack()
  }
}