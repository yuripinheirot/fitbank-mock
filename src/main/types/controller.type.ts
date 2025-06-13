import { HttpResponse, HttpRequest } from '@/shared/types/http.type'

type ResponseTypes = HttpResponse | void

export type ControllerType<Body = any, Params = any, Query = any> = (
  request: HttpRequest<Body, Params, Query>
) => Promise<ResponseTypes> | ResponseTypes
