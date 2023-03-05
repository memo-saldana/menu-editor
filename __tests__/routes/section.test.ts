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
  })
  describe('GET /sections/:id', () => {
    test('Gets one section', async () => {
      const res = await request(app).get('/sections/1')
      expect(res.body).toEqual({ section })
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
  })
  describe('DELETE /sections/:id', () => {
    test('Deletes section', async () => {
      const res = await request(app).del('/sections/1')
      expect(res.status).toEqual(200)
    })
  })
})