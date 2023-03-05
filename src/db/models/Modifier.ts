import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript'
import { Item } from './Item'
import { ItemModifier } from './ItemModifier'

@Table
export class Modifier extends Model {
  @Column(DataType.TEXT)
  description!: string

  @BelongsToMany(() => Item, () => ItemModifier)
  items!: Item[]
}
