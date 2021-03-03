import {
  Publisher,
  Subjects,
  DonationConfirmedEvent
} from '@asaqueue/common'

export class DonationConfirmedPublisher extends Publisher<DonationConfirmedEvent> {
  readonly subject = Subjects.DonationConfirmed
}