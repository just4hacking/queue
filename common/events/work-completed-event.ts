import { Subjects } from './subjects';

export interface WorkCompletedEvent {
  subject: Subjects.WorkCompleted;
  data: {
    id: string;
    work: {
      id: string;
      result: string;
    }
  };
}
