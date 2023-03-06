import { Item } from '../../src/db/models/Item'
import request from 'supertest'
import app from '../../src/app'
import { sequelizeConnection } from '../../src/db/config'

const modifierData = {
  description: 'Full meals',
}
const modifier = {
  ...modifierData,
  id: 1,
}

describe('Modifier endpoints', () => {
  beforeAll(async () => {
    await sequelizeConnection.sync({ force: true })
  })
  afterAll(async () => {
    await sequelizeConnection.drop()
    await sequelizeConnection.close()
  })
  describe('POST /modifiers', () => {
    test('Correctly adds new modifier', async () => {
      const res = await request(app).post('/modifiers').send(modifierData)
      expect(res.statusCode).toEqual(201)
      expect(res.body.message).toEqual('Modifier registered successfully')
    })
    test('Validates that description is provided', async () => {
      const res = await request(app).post('/modifiers').send({})
      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual('Modifier description not provided')
    })
    test('Validates that modifier with unique descriptions are provided', async () => {
      const res = await request(app).post('/modifiers').send(modifierData)
      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual(
        'Modifier with that description already exists'
      )
    })
  })
  describe('GET /modifiers/:id', () => {
    test('Gets one modifier', async () => {
      const res = await request(app).get('/modifiers/1')
      expect(res.body).toEqual({ modifier })
    })
    test('Validates modifier exists', async () => {
      const res = await request(app).get('/modifiers/2')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Modifier not found')
    })
  })
  describe('GET /modifiers', () => {
    test('Gets list of modifiers', async () => {
      const res = await request(app).get('/modifiers')
      expect(res.body).toEqual({ modifiers: [modifier] })
    })
  })
  describe('PUT /modifiers/:id', () => {
    test('Edits modifier', async () => {
      const description = 'Edited'
      const res = await request(app).put('/modifiers/1').send({ description })
      expect(res.status).toEqual(200)
    })
    test('Validates modifier exists', async () => {
      const description = 'Edited'
      const res = await request(app).put('/modifiers/2').send({ description })
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Modifier not found')
    })
  })
  describe('PUT /modifiers/:id/items/:itemId', () => {
    test('Maps item to modifier', async () => {
      const item = await Item.create({
        name: 'Item',
        description: 'Interesting food',
        price: 10,
      })

      const res = await request(app).put(`/modifiers/1/items/${item.id}`)
      expect(res.status).toEqual(200)
    })
    test('Validates modifiers exists', async () => {
      const res = await request(app).put('/modifiers/2/items/1')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Modifier not found')
    })
    test('Validates item exists', async () => {
      const res = await request(app).put('/modifiers/1/items/2')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Item not found')
    })
  })
  describe('Get /modifiers/:id/items', () => {
    test('Gets all items that have modifier', async () => {
      const res = await request(app).get('/modifiers/1/items')
      expect(res.status).toEqual(200)
      expect(res.body.items.length).toEqual(1)
    })
    test('Validates modifier exists', async () => {
      const res = await request(app).get('/modifiers/2/items')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Modifier not found')
    })
  })
  describe('DELETE /modifiers/:id', () => {
    test('Deletes modifier', async () => {
      const res = await request(app).del('/modifiers/1')
      expect(res.status).toEqual(200)
    })
    test('Validates modifier exists', async () => {
      const res = await request(app).del('/modifiers/2')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Modifier not found')
    })
  })
})
