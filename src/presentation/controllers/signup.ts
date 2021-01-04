import { badRequest, successRequest } from '../helpers/http-helper'
import { MissingParamError } from '../protocols/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) return badRequest(new MissingParamError('name'))
    else if (!httpRequest.body.email) return badRequest(new MissingParamError('email'))

    return successRequest({})
  }
}
