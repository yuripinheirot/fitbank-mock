import { IsEmail, IsNotEmpty } from 'class-validator'

import { IUser } from '../../models/user.model'

export class CreateUserRequestDto implements IUser {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  document: string

  @IsNotEmpty()
  phone: string

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}
