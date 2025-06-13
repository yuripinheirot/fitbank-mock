import { BaseHttpError } from './base-http.error'

export class NotFoundError extends BaseHttpError {
  constructor(message = 'Not found') {
    super(message, 404)
  }
}
