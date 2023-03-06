import { Item } from '../../src/db/models/Item'
import request from 'supertest'
import app from '../../src/app'
import { sequelizeConnection } from '../../src/db/config'

const sectionData = {
  name: 'Entrees',
  description: 'Full meals',
}
const section = {
  ...sectionData,
  id: 1,
}

describe('Section endpoints', () => {
  beforeAll(async () => {
    await sequelizeConnection.sync({ force: true })
  })
  afterAll(async () => {
    await sequelizeConnection.drop()
    await sequelizeConnection.close()
  })
  describe('POST /sections', () => {
    test('Correctly adds new section', async () => {
      const res = await request(app).post('/sections').send(sectionData)
      expect(res.statusCode).toEqual(201)
      expect(res.body.message).toEqual('Section registered successfully')
    })
    test('Validates that name is provided', async () => {
      const res = await request(app)
        .post('/sections')
        .send({ description: 'Descriptive' })
      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual('Section name not provided')
    })
    test('Validates that description is provided', async () => {
      const res = await request(app).post('/sections').send({ name: 'Name' })
      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual('Section description not provided')
    })
    test('Validates that sections with unique names are provided', async () => {
      const res = await request(app).post('/sections').send(sectionData)
      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual('Section with that name already exists')
    })
  })
  describe('GET /sections/:id', () => {
    test('Gets one section', async () => {
      const res = await request(app).get('/sections/1')
      expect(res.body).toEqual({ section })
    })
    test('Validates section exists', async () => {
      const res = await request(app).get('/sections/2')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Section not found')
    })
  })
  describe('GET /sections', () => {
    test('Gets list of sections', async () => {
      const res = await request(app).get('/sections')
      expect(res.body).toEqual({ sections: [section] })
    })
  })
  describe('PUT /sections/:id', () => {
    test('Edits section', async () => {
      const description = 'Edited'
      const res = await request(app).put('/sections/1').send({ description })
      expect(res.status).toEqual(200)
    })
    test('Validates section exists', async () => {
      const description = 'Edited'
      const res = await request(app).put('/sections/2').send({ description })
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Section not found')
    })
  })
  describe('PUT /sections/:id/items/:itemId', () => {
    test('Maps item to section', async () => {
      const item = await Item.create({
        name: 'Item',
        description: 'Interesting food',
        price: 10,
      })

      const res = await request(app).put(`/sections/1/items/${item.id}`)
      expect(res.status).toEqual(200)
    })
    test('Validates section exists', async () => {
      const res = await request(app).put('/sections/2/items/1')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Section not found')
    })
    test('Validates item exists', async () => {
      const res = await request(app).put('/sections/1/items/2')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Item not found')
    })
  })
  describe('Get /sections/:id/items', () => {
    test('Gets all items of section', async () => {
      const res = await request(app).get('/sections/1/items')
      expect(res.status).toEqual(200)
      expect(res.body.items.length).toEqual(1)
    })
    test('Validates section exists', async () => {
      const res = await request(app).get('/sections/2/items')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Section not found')
    })
  })
  describe('DELETE /sections/:id', () => {
    test('Deletes section', async () => {
      const res = await request(app).del('/sections/1')
      expect(res.status).toEqual(200)
    })
    test('Validates section exists', async () => {
      const res = await request(app).del('/sections/2')
      expect(res.statusCode).toEqual(404)
      expect(res.body.message).toEqual('Section not found')
    })
  })
})
