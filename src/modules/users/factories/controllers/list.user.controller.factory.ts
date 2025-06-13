import { ListUserController } from '@/modules/users/controllers/list.user.controller'
import { ListUserService } from '@/modules/users/services/list.user.service'

export const listUserControllerFactory = () => {
  const listUserService = new ListUserService()
  return new ListUserController(listUserService)
}
