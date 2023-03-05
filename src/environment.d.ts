declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'test' | 'prod'
      PORT?: string
      DB_USER: string
      DB_HOST: string
      DB_NAME: string
      DB_PASSWORD: string
      DB_PORT: string
      DB_DRIVER: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
