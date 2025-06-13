import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

import { PaginationParams } from '../../types/pagination.type'

export class PaginationParamsRequestDto implements PaginationParams {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== null ? parseInt(value, 10) : null), {
    toClassOnly: true,
  })
  length?: number

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNotEmpty()
  page: number
}
