import request from 'supertest'
import app from '../../src/app'
import { sequelizeConnection } from '../../src/db/config'

const itemData = {
  name: 'Entrees',
  description: 'Full meals',
  price: 15,
}
const item = {
  ...itemData,
  id: 1,
}

describe('Item endpoints', () => {
  beforeAll(async () => {
    await sequelizeConnection.sync({ force: true })
  })
  afterAll(async () => {
    await sequelizeConnection.drop()
    await sequelizeConnection.close()
  })
  describe('POST /items', () => {
    test('Correctly adds new item', async () => {
      const res = await request(app).post('/items').send(itemData)
      expect(res.statusCode).toEqual(201)
      expect(res.body.message).toEqual('Item registered successfully')
    })
  })
  describe('GET /items/:id', () => {
    test('Gets one item', async () => {
      const res = await request(app).get('/items/1')
      expect(res.body).toEqual({ item })
    })
  })
  describe('GET /items', () => {
    test('Gets list of items', async () => {
      const res = await request(app).get('/items')
      expect(res.body).toEqual({ items: [item] })
    })
  })
  describe('PUT /items/:id', () => {
    test('Edits item', async () => {
      const description = 'Edited'
      const res = await request(app).put('/items/1').send({ description })
      expect(res.status).toEqual(200)
    })
  })
  describe('DELETE /items/:id', () => {
    test('Deletes item', async () => {
      const res = await request(app).del('/items/1')
      expect(res.status).toEqual(200)
    })
  })
})
