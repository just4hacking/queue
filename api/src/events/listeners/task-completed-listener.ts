import { Message } from 'node-nats-streaming'
import {
  Subjects,
  Listener,
  TaskCompletedEvent
} from '@asaqueue/common'
import { queueGroupName } from './queue-group-name'

export class TaskCompletedListener extends Listener<TaskCompletedEvent> {
  readonly subject = Subjects.TaskCompleted
  readonly queueGroupName = queueGroupName

  async onMessage(data: TaskCompletedEvent['data'], msg: Message) {
    const { task, id } = data
    
    console.log(`${id}:${task.id} - Text was painted to ${task.result} color` )

    msg.ack()
  }
}