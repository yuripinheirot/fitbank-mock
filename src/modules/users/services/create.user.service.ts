import { AppService } from '@/shared/types/service.type'

import { CreateUserRequestDto } from '../dtos/request/create-user.request.dto'
import { UserModel } from '../models/user.model'

export class CreateUserService implements AppService {
  async handle(dto: CreateUserRequestDto) {
    const user = new UserModel(dto)
    await user.save()

    return user
  }
}
