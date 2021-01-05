import { ServerError } from '../protocols/errors/server-error'
import { HttpResponse } from '../protocols/http'

export const successRequest = (body:any):HttpResponse => ({
  statusCode: 200,
  body
})

export const badRequest = (error:Error):HttpResponse => ({
  statusCode: 400,
  body: error
})

export const internalErrorRequest = ():HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
