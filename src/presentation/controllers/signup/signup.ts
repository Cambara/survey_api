import { Controller, EmailValidator, InvalidParamError, MissingParamError, HttpRequest, HttpResponse } from './signup-protocols'
import { badRequest, internalErrorRequest, successRequest } from '../../helpers/http-helper'
import { AddAccount } from '../../domain/usercases/add-account'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body.name) return badRequest(new MissingParamError('name'))
      else if (!httpRequest.body.email) return badRequest(new MissingParamError('email'))
      else if (!this.emailValidator.isValid(httpRequest.body.email)) return badRequest(new InvalidParamError('email'))
      else if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))
      const { email, password, name } = httpRequest.body
      const account = this.addAccount.add({ email, password, name })
      return successRequest(account)
    } catch (error) {
      return internalErrorRequest()
    }
  }
}
