import { Message } from 'node-nats-streaming'
import {
  Subjects,
  Listener,
  TaskCreatedEvent
} from '@asaqueue/common'
import { randomBytes } from 'crypto'
import { TaskCompletedPublisher } from '../publishers'
import { queueGroupName } from './queue-group-name'

export class TaskCreatedListener extends Listener<TaskCreatedEvent> {
  readonly subject = Subjects.TaskCreated
  readonly queueGroupName = queueGroupName

  async onMessage(data: TaskCreatedEvent['data'], msg: Message) {
    const { task, id } = data
    
    console.log(`${id}:${task.id} - We received text: ${task.content}` )
    
    const color = randomBytes(6).toString('hex')

    setTimeout(() => {
      new TaskCompletedPublisher(this.client).publish({
        id,
        task: {
          id: task.id,
          result: color
        }
      })
    }, 2000)

    msg.ack()
  }
}