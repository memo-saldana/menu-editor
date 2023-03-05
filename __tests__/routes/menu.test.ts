import { Modifier } from '../../src/db/models/Modifier'
import { Item } from '../../src/db/models/Item'
import { Section } from '../../src/db/models/Section'
import request from 'supertest'
import app from '../../src/app'
import { sequelizeConnection } from '../../src/db/config'

const section = {
  id: 1,
  name: 'Lunch Specials',
  description: 'Tasty specials',
}
const item = {
  id: 1,
  name: 'Soup Lunch',
  description: 'Tasty soup',
  price: 12.99,
}
const modOne = {
  id: 1,
  description: 'Extra Spicy',
}
const modTwo = {
  id: 2,
  description: 'Regular Spice',
}
const modThree = {
  id: 3,
  description: 'No Spice',
}
const data = {
  sections: [
    {
      ...section,
      items: [
        {
          ...item,
          modifiers: [{ ...modOne }, { ...modTwo }, { ...modThree }],
        },
      ],
    },
  ],
}
describe('Menu endpoint', () => {
  beforeAll(async () => {
    await sequelizeConnection.sync({ force: true })
    const t = await Promise.all([
      Modifier.create(modOne),
      Modifier.create(modTwo),
      Modifier.create(modThree),
      Item.create(item),
      Section.create(section),
    ])
    await Promise.all([
      t[3].$add('modifiers', [t[0], t[1], t[2]]),
      t[3].$set('section', t[4]),
    ])
  })
  afterAll(async () => {
    await sequelizeConnection.drop()
    await sequelizeConnection.close()
  })
  describe('GET /menu', () => {
    test('Gets correct section, item, and modifiers', async () => {
      const res = await request(app).get('/menu')
      expect(res.body).toEqual(data)
    })
  })
})
