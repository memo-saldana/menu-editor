import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Item } from './Item'

@Table
export class Section extends Model {
  @Column
  name!: string

  @Column(DataType.TEXT)
  description!: string

  @HasMany(() => Item)
  items!: Item[]
}
