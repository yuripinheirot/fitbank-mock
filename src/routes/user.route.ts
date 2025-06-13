import { AppRoute, EndpointMethod } from '@/shared/types/route.type'
import { CreateUserRequestDto } from '@/modules/users/dtos/request/create-user.request.dto'

import { createUserControllerFactory } from '../modules/users/factories/controllers/create.user.controller.factory'
import { listUserControllerFactory } from '../modules/users/factories/controllers/list.user.controller.factory'

const createUserController = createUserControllerFactory()
const listUserController = listUserControllerFactory()

export const userRoutes: AppRoute = {
  basePath: '/users',
  endpoints: [
    {
      method: EndpointMethod.POST,
      path: '/',
      controller: (req) => createUserController.handle(req!),
      options: {
        bodyValidator: CreateUserRequestDto,
      },
    },
    {
      method: EndpointMethod.GET,
      path: '/',
      controller: () => listUserController.handle(),
    },
  ],
}
