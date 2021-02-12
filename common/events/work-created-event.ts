import { Subjects } from './subjects';

export interface WorkCreatedEvent {
  subject: Subjects.WorkCreated;
  data: {
    id: string;
    work: {
      id: string;
      content: string;
    }
  };
}
