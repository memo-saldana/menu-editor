import { NextFunction, Request, Response } from 'express'
import ErrorWithStatus from '../utils/ErrorWithStatus'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sendAsJson =
  () =>
  (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    if (err.statusCode !== 500) {
      return res
        .status(err.statusCode)
        .json({ code: err.statusCode, name: err.name, message: err.message })
    } else {
      return res.status(500).send('SERVER ERROR')
    }
  }

export default sendAsJson
