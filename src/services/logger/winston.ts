import { createLogger, transports, format } from 'winston'

import { env } from 'process'

export const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(format.errors({ stack: true }), format.splat()),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.splat(),
        format.metadata(),
        format.timestamp(),
        format.printf(({ timestamp, level, message, metadata }) => {
          return `[${timestamp}] ${level}: ${message}. ${Object.keys(metadata as object).length ? JSON.stringify(metadata) : ''}`
        })
      ),
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    }),
  ],
})
