export class BaseHttpError extends Error {
  constructor(
    readonly message: string,
    readonly statusCode: number,
    readonly data: any = undefined
  ) {
    super(message)
    this.data = data
    this.statusCode = statusCode
  }
}
