/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express'

import { ControllerType } from '@/main/types/controller.type'

type RouteOptions = {
  paramsValidator?: any
  bodyValidator?: any
  queryValidator?: any
  disableRouteCallLogs?: boolean
}

export enum EndpointMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export type MiddlewareType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>

export type RouteAdapterOptions = {
  bodyValidator?: new () => any
  paramsValidator?: new () => any
  queryValidator?: new () => any
  disableRouteCallLogs?: boolean
}

type EndpointType = {
  method: EndpointMethod
  path: string
  controller: ControllerType
  middlewares?: MiddlewareType[]
  options?: RouteOptions
}

export type AppRoute = {
  basePath: string
  endpoints: EndpointType[]
}
