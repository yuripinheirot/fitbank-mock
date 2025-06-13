import { Express } from 'express'

import { statusRoutes } from './status.route'
import { userRoutes } from './user.route'

import { AppRoute } from '@/shared/types/route.type'

import { env } from '../main/configs/envs.config'
import { routeAdapter } from '../main/adapters/route.adapter'

const { API_PREFIX } = env

export const registerRoutes = (app: Express) => {
  const routes: AppRoute[] = [statusRoutes, userRoutes]

  routes.forEach((route) => {
    app.use(API_PREFIX, routeAdapter(route))
  })
}
