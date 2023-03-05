import dotenv from 'dotenv'
import path from 'path'

let fileName = process.env.DOCKER ? '.docker.test.env' : '.test.env'

dotenv.config({
  path: path.resolve(process.cwd(), '__tests__', 'config', fileName),
  override: true,
})
