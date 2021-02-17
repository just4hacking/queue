import { Storage, Item } from './storage'
import { ItemTypes } from './item-types'

export interface TextItem extends Item {
  type: ItemTypes.TextColor
  data: {
    text: string,
    color: string
  }
}

class InMemoryStorage implements Storage<TextItem> {
  items:TextItem[] = []

  push(item: TextItem) {
    this.items.push(item)
    return item
  }

  pop() {
    return this.items.pop() || null 
  }

  getAll() {
    return this.items
  }
}

export const inMemoryStorage:Storage<TextItem> = new InMemoryStorage() 