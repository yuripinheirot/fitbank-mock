import { BaseHttpError } from './base-http.error'

export class BadRequestError extends BaseHttpError {
  constructor(
    readonly message = 'Bad request',
    readonly data: any = undefined
  ) {
    super(message, 400)
    this.data = data
  }
}
