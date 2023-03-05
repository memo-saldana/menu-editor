import { type Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import { Item } from './models/Item'
import { ItemModifier } from './models/ItemModifier'
import { Modifier } from './models/Modifier'
import { Section } from './models/Section'

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbPassword = process.env.DB_PASSWORD as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  models: [Section, Item, Modifier, ItemModifier],
  logging: process.env.NODE_ENV !== 'test',
})
