import { ValidationError } from 'class-validator'

export const formatValidationErrors = (errors: ValidationError[]): string[] => {
  const errorMessages: string[] = []
  for (const error of errors) {
    if (error.children && error.children.length > 0) {
      for (const childError of error.children) {
        errorMessages.push(...Object.values(childError.constraints || {}))
      }
    } else {
      errorMessages.push(...Object.values(error.constraints || {}))
    }
  }
  return errorMessages
}
