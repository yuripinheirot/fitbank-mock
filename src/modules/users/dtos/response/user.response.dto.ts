import { IUser } from '../../models/user.model'

export class UseResponserDto implements IUser {
  _id: string
  username: string
  password: string
  email: string
  document: string
  phone: string

  constructor(data: Partial<UseResponserDto>) {
    Object.assign(this, data)
  }
}
