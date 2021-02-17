import { Subjects } from './subjects';

export interface TaskCompletedEvent {
  subject: Subjects.TaskCompleted;
  data: {
    id: string;
    task: {
      id: string;
      result: any;
    }
  };
}
