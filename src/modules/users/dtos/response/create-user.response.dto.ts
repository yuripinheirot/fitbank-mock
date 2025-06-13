export class CreateUserResponseDto {
  _id: string
  username: string
  __v: number

  constructor(data: Partial<CreateUserResponseDto>) {
    Object.assign(this, data)
  }
}
