export type HttpRequest<Body = any, Params = any, Query = any> = {
  body: Body
  params: Params
  query: Query
}

export type HttpResponse<ResponseType = any> = {
  statusCode: number
  message?: string
  response?: ResponseType
  type?: 'image' | 'json'
}

export type ResponseParams = {
  statusCode?: number
  message?: string
  body?: any
}
