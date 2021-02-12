import { Message } from 'node-nats-streaming'
import {
  Subjects,
  Listener,
  TaskCreatedEvent
} from '@asaqueue/common'
import { TaskCompletedPublisher } from '../publishers'
import { queueGroupName } from './queue-group-name'

export class TaskCreatedListener extends Listener<TaskCreatedEvent> {
  readonly subject = Subjects.TaskCreated
  readonly queueGroupName = queueGroupName

  async onMessage(data: TaskCreatedEvent['data'], msg: Message) {
    const { task, id } = data
    
    console.log(`${id} - Task id: ${task.id}. Content: ${task.content}` )
    
    await new TaskCompletedPublisher(this.client).publish({
      id,
      task: {
        id: task.id,
        result: 'Completed'
      }
    })

    msg.ack()
  }
}