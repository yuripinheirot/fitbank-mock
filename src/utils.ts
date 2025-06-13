import { FitbankIdentifierType } from './types'

export const generateFitbankIdentifier = (params: {
  type: FitbankIdentifierType
  documentId: string
}): string => {
  return `${params.type}-${params.documentId}`
}

export const parseFitbankIdentifier = (
  identifier: string
): {
  type: FitbankIdentifierType
  documentId: string
} => {
  const [type, documentId] = identifier.split('-')
  return { type: type as FitbankIdentifierType, documentId }
}
