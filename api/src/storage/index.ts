import { InMemoryStorage, TextItem } from './in-memory-storage'
import { Storage } from './storage'
const storage:Storage<TextItem> = new InMemoryStorage()

export {
  storage,
  Storage,
  TextItem
}
export * from './item-types'