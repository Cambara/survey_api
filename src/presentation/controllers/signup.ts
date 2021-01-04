import { MissingParamError } from '../protocols/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let msg

    if (!httpRequest.body.name) msg = 'name'
    else if (!httpRequest.body.email) msg = 'email'

    if (!msg) {
      return {
        statusCode: 200,
        body: {}
      }
    }

    return {
      statusCode: 400,
      body: new MissingParamError(msg)
    }
  }
}
