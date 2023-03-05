class ErrorWithStatus extends Error {
  public statusCode: number
  public original?: Error
  constructor(statusCode: number, message: string, error?: Error) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = Error.name
    this.statusCode = statusCode
    if (error) this.original = error
    Error.captureStackTrace(this)
  }
}

export default ErrorWithStatus
