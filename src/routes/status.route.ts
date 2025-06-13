import { StatusCodes } from 'http-status-codes'

import { successResponse } from '@/shared/helpers/http-success-response.helper'
import { AppRoute, EndpointMethod } from '@/shared/types/route.type'

export const statusRoutes: AppRoute = {
  basePath: '/status',
  endpoints: [
    {
      method: EndpointMethod.GET,
      path: '/',
      controller: () => {
        return successResponse({
          statusCode: StatusCodes.OK,
          body: { message: 'Server is up and running!' },
        })
      },
      options: {
        disableRouteCallLogs: true,
      },
    },
  ],
}
