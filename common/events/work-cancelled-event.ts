import { Subjects } from './subjects';

export interface WorkCancelledEvent {
  subject: Subjects.WorkCancelled;
  data: {
    id: string;
    work: {
      id: string,
      error: string
    }
  };
}
