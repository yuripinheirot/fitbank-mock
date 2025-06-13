import dotenv from 'dotenv'

dotenv.config()

export const env = {
  // Server configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 4433,
  API_PREFIX: process.env.API_PREFIX || '/api',

  // Protest Rating Microservice
  DOCUMENT_RATING_MS_URL:
    process.env.DOCUMENT_RATING_MS_URL ||
    'https://ml-rating-protesto-endpoint.brazilsouth.inference.ml.azure.com',
  DOCUMENT_RATING_MS_BEARER_TOKEN:
    process.env.DOCUMENT_RATING_MS_BEARER_TOKEN || 'YOUR_TOKEN',

  // Debtor Rating Microservice
  DEBTOR_RATING_MS_URL:
    process.env.DEBTOR_RATING_MS_URL ||
    'https://xgboost-rating-endpoint-7ecb0ec4.brazilsouth.inference.ml.azure.com',
  DEBTOR_RATING_MS_BEARER_TOKEN:
    process.env.DEBTOR_RATING_MS_BEARER_TOKEN || 'YOUR_TOKEN',

  // Protests By Document Microservice
  PROTESTS_BY_DOCUMENT_MS_URL:
    process.env.PROTESTS_BY_DOCUMENT_MS_URL ||
    'https://sis-req-dados-endpoint-d2abf524.brazilsouth.inference.ml.azure.com',
  PROTESTS_BY_DOCUMENT_MS_BEARER_TOKEN:
    process.env.PROTESTS_BY_DOCUMENT_MS_BEARER_TOKEN || 'YOUR_TOKEN',
} as const
