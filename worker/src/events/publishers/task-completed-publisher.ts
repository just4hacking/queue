import {
  Publisher,
  TaskCompletedEvent,
  Subjects
} from '@asaqueue/common'

export class TaskCompletedPublisher extends Publisher<TaskCompletedEvent> {
  readonly subject = Subjects.TaskCompleted
}