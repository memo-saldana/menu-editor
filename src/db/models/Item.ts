import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Min,
  Model,
  Table,
} from 'sequelize-typescript'
import { ItemModifier } from './ItemModifier'
import { Modifier } from './Modifier'
import { Section } from './Section'

@Table
export class Item extends Model {
  @Column
  name!: string

  @Column(DataType.TEXT)
  description!: string

  @Min(0)
  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
    get(this: Item): number {
      return parseFloat(this.getDataValue('price'))
    },
  })
  price!: number

  @ForeignKey(() => Section)
  sectionId!: number

  @BelongsTo(() => Section, 'sectionId')
  section!: Section

  @BelongsToMany(() => Modifier, () => ItemModifier)
  modifiers!: Modifier[]
}
