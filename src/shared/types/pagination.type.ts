export type PaginationParams = {
  length?: number
  page?: number
}

export type PaginatedResponseType<T> = {
  data: T[]
  total: number
}

export type IncludeParams = {
  [key: string]: unknown
}
