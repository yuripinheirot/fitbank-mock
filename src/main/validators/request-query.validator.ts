import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { formatValidationErrors } from '@/shared/utils/format-validation-errors.utils'
import { BadRequestError } from '@/shared/errors'
import { logger } from '@/services/logger'

export const requestQueryValidator = async (
  validator: new () => any,
  query: any
) => {
  const validatorInstance = plainToClass(validator, query)

  const errors = await validate(validatorInstance, {
    whitelist: true,
    forbidNonWhitelisted: true,
  })

  if (errors.length) {
    const formattedErrors = formatValidationErrors(errors)
    logger.error(
      `[QueryValidationMiddleware] - Validation error: ${JSON.stringify(
        formattedErrors
      )}`
    )

    throw new BadRequestError('Invalid query params', formattedErrors)
  }
}
