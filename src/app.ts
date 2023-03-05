import express, { json, type Application } from 'express'
import sendAsJson from './middleware/sendAsJson'

const app: Application = express()

app.use(json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.json({ message: 'Server up' }))

app.use(sendAsJson())

export default app
