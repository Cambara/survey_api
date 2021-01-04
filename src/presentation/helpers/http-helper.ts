import { HttpResponse } from '../protocols/http'

export const successRequest = (body:any):HttpResponse => ({
  statusCode: 200,
  body
})

export const badRequest = (error:Error):HttpResponse => ({
  statusCode: 400,
  body: error
})
