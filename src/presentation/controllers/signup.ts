import { badRequest, internalErrorRequest, successRequest } from '../helpers/http-helper'
import { Controller, EmailValidator } from '../protocols'
import { InvalidParamError, MissingParamError } from '../protocols/errors'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body.name) return badRequest(new MissingParamError('name'))
      else if (!httpRequest.body.email) return badRequest(new MissingParamError('email'))
      else if (!this.emailValidator.isValid(httpRequest.body.email)) return badRequest(new InvalidParamError('email'))
      return successRequest({})
    } catch (error) {
      return internalErrorRequest()
    }
  }
}
