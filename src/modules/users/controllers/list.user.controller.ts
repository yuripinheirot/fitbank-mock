import { HttpResponse } from '@/shared/types/http.type'
import { AppController } from '@/shared/types/app-controller.type'
import { successResponse } from '@/shared/helpers/http-success-response.helper'

import { ListUserService } from '../services/list.user.service'

export class ListUserController implements AppController {
  constructor(private readonly listUserService: ListUserService) {}

  async handle(): Promise<HttpResponse> {
    const user = await this.listUserService.handle()

    return successResponse({
      body: user,
    })
  }
}
