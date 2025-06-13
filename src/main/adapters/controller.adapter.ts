import { RequestHandler, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { requestValidatorsAdapter } from './validators.adapter'

import { logger } from '@/services/logger'
import { errorResponse } from '@/shared/helpers/http-error-response.helper'
import { successResponse } from '@/shared/helpers/http-success-response.helper'
import { HttpRequest } from '@/shared/types/http.type'
import { RouteAdapterOptions } from '@/shared/types/route.type'

import { ControllerType } from '../types/controller.type'
import { BaseHttpError } from '../../shared/errors/base-http.error'

const handleJsonResponse = (res: Response, httpResponse: any) => {
  res
    .status(httpResponse?.statusCode || StatusCodes.OK)
    .json(httpResponse?.response || successResponse())
}

const handleError = (error: any, res: Response) => {
  logger.error(error)

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  let response = errorResponse()

  if (error instanceof BaseHttpError) {
    statusCode = error.statusCode
    response = errorResponse({
      message: error.message,
      statusCode,
      body: error.data,
    })
  }

  res.status(statusCode).json(response)
}

export const controllerAdapter = (
  controller: ControllerType,
  options?: RouteAdapterOptions
): RequestHandler => {
  return async (req: Request, res: Response) => {
    try {
      if (!options?.disableRouteCallLogs) {
        logger.info(
          `Controller called: ${controller.toString() || 'Anonymous Controller'}`,
          {
            method: req.method,
            url: req.url,
            body: req.body,
            query: req.query,
            params: req.params,
          }
        )
      }

      const { body, query, params } = req
      const httpRequest: HttpRequest = {
        body,
        params,
        query,
      }

      if (options) {
        await requestValidatorsAdapter(options, httpRequest)
      }

      const httpResponse = await controller(httpRequest)

      return handleJsonResponse(res, httpResponse)
    } catch (error) {
      handleError(error, res)
    }
  }
}
