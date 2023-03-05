import express, { json, type Application } from 'express'
import sendAsJson from './middleware/sendAsJson'
import errorHandler from './middleware/errorHandler'
import SectionRoutes from './controller/Section'
import ItemRoutes from './controller/Item'
import ModifierRoutes from './controller/Modifier'
import MenuRoutes from './controller/Menu'

const app: Application = express()

app.use(json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.json({ message: 'Server up' }))
app.use('/sections', SectionRoutes)
app.use('/items', ItemRoutes)
app.use('/modifiers', ModifierRoutes)
app.use('/menu', MenuRoutes)

app.use(errorHandler())
app.use(sendAsJson())

export default app
