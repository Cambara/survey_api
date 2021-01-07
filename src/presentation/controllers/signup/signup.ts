import { Controller, EmailValidator, InvalidParamError, MissingParamError, HttpRequest, HttpResponse } from './signup-protocols'
import { badRequest, internalErrorRequest, successRequest } from '../../helpers/http-helper'
import { AddAccount } from '../../../domain/usercases/add-account'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest):Promise<HttpResponse> {
    try {
      const validateParams = ['name', 'email', 'password', 'passwordConfirmation']

      for (let i = 0; i < validateParams.length; i++) {
        const param = httpRequest.body[validateParams[i]]
        if (!param) return badRequest(new MissingParamError(validateParams[i]))
      }

      if (!this.emailValidator.isValid(httpRequest.body.email)) return badRequest(new InvalidParamError('email'))
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))

      const { email, password, name } = httpRequest.body
      const account = await this.addAccount.add({ email, password, name })
      return successRequest(account)
    } catch (error) {
      return internalErrorRequest()
    }
  }
}
