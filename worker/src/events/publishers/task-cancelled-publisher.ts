import {
  Publisher,
  TaskCancelledEvent,
  Subjects
} from '@asaqueue/common'

export class TaskCancelledPublisher extends Publisher<TaskCancelledEvent> {
  readonly subject = Subjects.TaskCancelled
}