import { TextItem, Storage } from '../storage'

export const storageImpl:Storage<TextItem> = {
  push: jest
    .fn()
    .mockImplementation(
      (item: TextItem) => {
        console.log('PUSHED')
        return item
      }
    ),

  pop: jest
    .fn()
    .mockImplementation(
      () => {
        console.log('PUSHED')
        return null
      }
    ),

  getAll: jest
    .fn()
    .mockImplementation(
      () => {
        console.log('ALL')
        return []
      }
    )
}