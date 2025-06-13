import { HttpRequest, HttpResponse } from './http.type'

export interface AppController {
  handle(req?: HttpRequest): Promise<HttpResponse> | HttpResponse
}
