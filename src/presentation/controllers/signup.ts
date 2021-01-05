import { badRequest, successRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../protocols/errors/invalid-param-error'
import { MissingParamError } from '../protocols/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController implements Controller {
  private readonly emailValidator:EmailValidator

  constructor (emailValidator:EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) return badRequest(new MissingParamError('name'))
    else if (!httpRequest.body.email) return badRequest(new MissingParamError('email'))
    else if (!this.emailValidator.isValid(httpRequest.body.email)) return badRequest(new InvalidParamError('email'))
    return successRequest({})
  }
}
