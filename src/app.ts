import express, { json, type Application } from 'express'
import sendAsJson from './middleware/sendAsJson'
import SectionRoutes from './controller/Section'
import ItemRoutes from './controller/Item'

const app: Application = express()

app.use(json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.json({ message: 'Server up' }))
app.use('/sections', SectionRoutes)
app.use('/items', ItemRoutes)

app.use(sendAsJson())

export default app
