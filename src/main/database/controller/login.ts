import { User } from '@entity/*'
import userController from './user'
import os from 'os'

let loggedUser: User

const login = async () => {
  loggedUser = await userController.findByLogin(os.userInfo().username)
}

export { login, loggedUser }
