import { Subjects } from './subjects';

export interface TaskCreatedEvent {
  subject: Subjects.TaskCreated;
  data: {
    id: string;
    task: {
      id: string;
      content: string;
    }
  };
}
