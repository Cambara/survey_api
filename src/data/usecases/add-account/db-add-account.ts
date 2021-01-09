import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add ({ name, password, email }: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(password)
    return new Promise(resolve => resolve(null))
  }
}
