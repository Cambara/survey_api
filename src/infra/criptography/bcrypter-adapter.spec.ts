import bcrypt from 'bcrypt'
import { BcrypterAdapter } from './bcrypter-adapter'

jest.mock('bcrypt', () => ({
  async hash ():Promise<string> {
    return Promise.resolve('any_hash')
  }
}))

interface SutTypes {
  sut: BcrypterAdapter
  salt: number
}

const makeSut = ():SutTypes => {
  const salt = 12
  const sut = new BcrypterAdapter(salt)
  return {
    salt,
    sut
  }
}

describe('Bcrypt Adapter', async () => {
  test('Should call bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()
    const hasSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hasSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toEqual('any_hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
