import { BaseHttpError } from './base-http.error'

export class BadGatewayError extends BaseHttpError {
  constructor(
    readonly message = 'Bad Gateway',
    readonly data: any = undefined
  ) {
    super(message, 502)
    this.data = data
  }
}
