import { UserModel } from '@/modules/users/models/user.model'
import { AppService } from '@/shared/types/service.type'

export class ListUserService implements AppService {
  async handle() {
    const user = new UserModel()
    return user.collection.find({}).toArray()
  }
}
