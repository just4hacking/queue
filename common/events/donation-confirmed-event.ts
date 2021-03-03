import { Subjects } from './subjects';

export interface DonationConfirmedEvent {
  subject: Subjects.DonationConfirmed;
  data: {
    id: string
  };
}