import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../usecases/add-account/db-add-account-protocols'

export interface AddAccountRepository {
  add(accountData:AddAccountModel): Promise<AccountModel>
}
