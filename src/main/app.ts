import express from 'express'

import { registerMiddlewares } from './middlewares'

import { registerRoutes } from '../routes'

export const buildApp = async () => {
  const app = express()

  registerMiddlewares(app)
  registerRoutes(app)

  return app
}
