import { StatusCodes } from 'http-status-codes'

import { HttpRequest, HttpResponse } from '@/shared/types/http.type'
import { AppController } from '@/shared/types/app-controller.type'
import { successResponse } from '@/shared/helpers/http-success-response.helper'

import { CreateUserRequestDto } from '../dtos/request/create-user.request.dto'
import { CreateUserService } from '../services/create.user.service'

export class CreateUserController implements AppController {
  constructor(private readonly createUserService: CreateUserService) {}

  async handle(req: HttpRequest<CreateUserRequestDto>): Promise<HttpResponse> {
    const user = await this.createUserService.handle(req.body)

    return successResponse({
      statusCode: StatusCodes.CREATED,
      body: user,
    })
  }
}
