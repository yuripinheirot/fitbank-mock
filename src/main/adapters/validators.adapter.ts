import { RouteAdapterOptions } from '@/shared/types/route.type'
import { HttpRequest } from '@/shared/types/http.type'

import { requestQueryValidator } from '../validators/request-query.validator'
import { requestParamsValidator } from '../validators/request-params.validator'
import { requestBodyValidator } from '../validators/request-body.validator'

export const requestValidatorsAdapter = async (
  routeOptions: RouteAdapterOptions,
  request: HttpRequest
) => {
  const { bodyValidator, paramsValidator, queryValidator } = routeOptions
  const { params, body, query } = request

  if (paramsValidator) {
    await requestParamsValidator(paramsValidator, params)
  }
  if (queryValidator) {
    await requestQueryValidator(queryValidator, query)
  }
  if (bodyValidator) {
    await requestBodyValidator(bodyValidator, body)
  }
}
