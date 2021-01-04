import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let msg

    if (!httpRequest.body.name) msg = 'Missing param: name'
    else if (!httpRequest.body.email) msg = 'Missing param: email'

    if (!msg) {
      return {
        statusCode: 200,
        body: {}
      }
    }

    return {
      statusCode: 400,
      body: new Error(msg)
    }
  }
}
