import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { formatValidationErrors } from '@/shared/utils/format-validation-errors.utils'
import { BadRequestError } from '@/shared/errors'
import { logger } from '@/services/logger'

export const requestParamsValidator = async (
  validator: new () => any,
  params: any
) => {
  const validatorInstance = plainToClass(validator, params)
  const errors = await validate(validatorInstance, {
    whitelist: true,
    forbidNonWhitelisted: true,
  })

  if (errors.length) {
    const formattedErrors = formatValidationErrors(errors)

    logger.error(
      `[ParamsValidationMiddleware] - Validation error: ${JSON.stringify(
        formattedErrors
      )}`
    )

    throw new BadRequestError('Invalid path params', formattedErrors)
  }
}
