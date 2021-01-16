import bcrypt, { hash } from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class BcrypterAdapter implements Encrypter {
  private salt:number

  constructor (salt:number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
