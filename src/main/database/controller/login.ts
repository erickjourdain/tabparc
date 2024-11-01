import { User } from '@entity/*'
import userController from './user'
import os from 'os'

let loggedUser: User | null

const login = async () => {
  try {
    loggedUser = await userController.findByLogin(os.userInfo().username)
  } catch (error) {
    loggedUser = null
  }
}

export { login, loggedUser }
