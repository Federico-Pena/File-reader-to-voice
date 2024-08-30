export class ApiError extends Error {
  statusCode: number = 500
  public type = 'ApiError'
  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  constructor(message: string, statusCode: number = 500) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}
