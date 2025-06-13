import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { Request } from 'express'

import { formatValidationErrors } from '@/shared/utils/format-validation-errors.utils'
import { BadRequestError } from '@/shared/errors'

export const requestBodyValidator = async (
  validator: new () => unknown,
  body: unknown
): Promise<string[] | void> => {
  const data = plainToClass(validator, body) as object
  const errors = await validate(data, {
    whitelist: true,
    forbidNonWhitelisted: true,
  })

  body = data as unknown as Request['body']

  if (errors.length) {
    const formattedErrors = formatValidationErrors(errors)

    throw new BadRequestError('Invalid body params', formattedErrors)
  }
}
