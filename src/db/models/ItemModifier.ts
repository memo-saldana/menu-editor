import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript'
import { Item } from './Item'
import { Modifier } from './Modifier'

@Table
export class ItemModifier extends Model {
  @ForeignKey(() => Item)
  @Column
  itemId!: string

  @ForeignKey(() => Modifier)
  @Column
  modifierId!: string
}
