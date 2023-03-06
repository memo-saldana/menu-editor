import { Modifier } from '../../src/db/models/Modifier'
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
    test('Validates that name is provided', async () => {
      const res = await request(app).post('/items').send({})
      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual('Item name not provided')
    })
    test('Validates that description is provided', async () => {
      const res = await request(app).post('/items').send({ name: 'Name' })
      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual('Item description not provided')
    })
    test('Validates that price is provided', async () => {
      const res = await request(app)
        .post('/items')
        .send({ name: 'Name', description: 'Description' })
      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual('Item price not provided')
    })
    test('Validates that price is positive', async () => {
      const res = await request(app)
        .post('/items')
        .send({ name: 'Name', description: 'Description', price: -1 })
      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual(
        'Validation error ocurred, check the given input'
      )
    })
    test('Validates that items with unique names are provided', async () => {
      const res = await request(app).post('/items').send(itemData)
      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual('Item with that name already exists')
    })
  })
  describe('GET /items/:id', () => {
    test('Gets one item', async () => {
      const res = await request(app).get('/items/1')
      expect(res.body).toEqual({ item })
    })
    test('Validates item exists', async () => {
      const res = await request(app).get('/items/2')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Item not found')
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
    test('Validates section exists', async () => {
      const description = 'Edited'
      const res = await request(app).put('/items/2').send({ description })
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Item not found')
    })
  })
  describe('PUT /items/:id/modifiers/:modifierId', () => {
    test('Maps modifier to item', async () => {
      const modifier = await Modifier.create({
        description: 'Some modification',
      })

      const res = await request(app).put(`/items/1/modifiers/${modifier.id}`)
      expect(res.status).toEqual(200)
    })
    test('Validates item exists', async () => {
      const res = await request(app).put('/items/2/modifiers/1')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Item not found')
    })
    test('Validates modifier exists', async () => {
      const res = await request(app).put('/items/1/modifiers/2')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Modifier not found')
    })
  })
  describe('Get /items/:id/modifiers', () => {
    test('Gets all modifiers if item', async () => {
      const res = await request(app).get('/items/1/modifiers')
      expect(res.status).toEqual(200)
      expect(res.body.modifiers.length).toEqual(1)
    })
    test('Validates item exists', async () => {
      const res = await request(app).get('/items/2/modifiers')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Item not found')
    })
  })
  describe('DELETE /items/:id', () => {
    test('Deletes item', async () => {
      const res = await request(app).del('/items/1')
      expect(res.status).toEqual(200)
    })
    test('Validates item exists', async () => {
      const res = await request(app).del('/items/2')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Item not found')
    })
  })
})
