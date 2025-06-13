import { Exclude, Expose } from 'class-transformer'

import { PaginatedResponseType } from '../../types/pagination.type'

type PaginatedParamsResponseDto<T> = {
  total: number
  data: T[]
}

@Exclude()
export class PaginatedResponseDto<T> implements PaginatedResponseType<T> {
  @Expose()
  data: T[]

  @Expose()
  total: number

  constructor({ total, data }: PaginatedParamsResponseDto<T>) {
    this.data = data
    this.total = total
  }
}
