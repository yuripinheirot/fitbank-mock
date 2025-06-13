import { CreateUserController } from '@/modules/users/controllers/create.user.controller'
import { CreateUserService } from '@/modules/users/services/create.user.service'

export const createUserControllerFactory = () => {
  const createUserService = new CreateUserService()
  return new CreateUserController(createUserService)
}
