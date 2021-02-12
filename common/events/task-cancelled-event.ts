import { Subjects } from './subjects';

export interface TaskCancelledEvent {
  subject: Subjects.TaskCancelled;
  data: {
    id: string;
    task: {
      id: string,
      error: string
    }
  };
}
