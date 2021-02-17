import { storageImpl as storage } from '../../storage/storage-impl'
import { ItemTypes } from '../../storage'

it('test 2', async () => {
  storage.push({
    type: ItemTypes.TextColor,
    data: {
      text: 'text',
      color: 'color'
    }
  })

  console.log(storage.getAll())
});

it('test 1', async () => {
  console.log(storage.getAll())
});
