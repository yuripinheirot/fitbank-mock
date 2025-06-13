import bodyParser from 'body-parser'
import express, { Express } from 'express'

export const registerMiddlewares = (app: Express) => {
  app.use(bodyParser.json())
  app.use(express.static('public'))
}
