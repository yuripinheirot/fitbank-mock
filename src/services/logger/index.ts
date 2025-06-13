import { winstonLogger } from './winston'

export class LoggerService {
  info(message: string, ...metadata: any) {
    winstonLogger.info(message, metadata)
  }
  debug(message: string, ...metadata: any) {
    winstonLogger.debug(message, metadata)
  }
  error(message: string | any, ...metadata: any) {
    if (message instanceof Error) {
      winstonLogger.error({
        message: message.message,
        stack: message.stack,
        ...metadata,
      })
    } else {
      winstonLogger.error({
        message: message,
        ...metadata,
      })
    }
  }
  warn(message: string, ...metadata: any) {
    winstonLogger.warn(message, metadata)
  }
}

export const logger = new LoggerService()
