import { sequelizeConnection } from './db/config'
import app from './app'

const PORT = process.env.PORT || 3000

const start = async () => {
  await sequelizeConnection.sync()

  app.listen(PORT, () => {
    console.log(`Server running on the port number ${PORT}`)
  })
}

start()
