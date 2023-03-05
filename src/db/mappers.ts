import ErrorWithStatus from '../utils/ErrorWithStatus'
import { Item } from './models/Item'
import { Modifier } from './models/Modifier'

export const addModifierToItem = async (modifierId: number, itemId: number) => {
  const item = await Item.findOne({ where: { id: itemId } })

  if (!item) {
    return Promise.reject(new ErrorWithStatus(404, 'Item not found'))
  }

  const modifier = await Modifier.findOne({ where: { id: modifierId } })

  if (!modifier) {
    return Promise.reject(new ErrorWithStatus(404, 'Modifier not found'))
  }

  await item.$add('modifier', modifier)
}
