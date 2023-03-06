import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'sequelize'
import ErrorWithStatus from '../utils/ErrorWithStatus'

const errorHandler =
  () =>
  (
    err: ErrorWithStatus | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof ValidationError) {
      next(
        new ErrorWithStatus(
          400,
          'Validation error ocurred, check the given input',
          err
        )
      )
    } else if (err instanceof ErrorWithStatus) {
      next(err)
    } else {
      if (process.env.NODE_ENV === 'prod') {
        next(new ErrorWithStatus(500, 'SERVER ERROR'))
      } else if (err) {
        next(new ErrorWithStatus(500, err.message))
      }
    }
  }

export default errorHandler
