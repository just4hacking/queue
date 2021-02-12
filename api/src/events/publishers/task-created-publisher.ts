import {
  Publisher,
  TaskCreatedEvent,
  Subjects
} from '@asaqueue/common'

export class TaskCreatedPublisher extends Publisher<TaskCreatedEvent> {
  readonly subject = Subjects.TaskCreated
}