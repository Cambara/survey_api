import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usercases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const accountMongo = result.ops[0]
    const { _id, ...account } = accountMongo
    return Object.assign({}, account, { id: accountMongo._id })
  }
}
