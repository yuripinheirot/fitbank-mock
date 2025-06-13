import { Router } from 'express'

import { controllerAdapter } from './controller.adapter'

import { logger } from '@/services/logger'
import { AppRoute } from '@/shared/types/route.type'

import { env } from '../configs/envs.config'

const { API_PREFIX } = env

export const routeAdapter = (routes: AppRoute): Router => {
  const router = Router()

  routes.endpoints.forEach((route) => {
    const path = `${routes.basePath}${route.path}`
    const controller = controllerAdapter(route.controller, route.options)

    router[route.method](
      path,
      route.middlewares?.length
        ? [...route.middlewares, controller]
        : controller
    )

    logger.debug(
      `Route ${route.method.toUpperCase()} ${API_PREFIX}${path} registered`
    )
  })

  return router
}
