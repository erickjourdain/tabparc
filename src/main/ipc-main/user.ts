import { User } from '@entity/*'
import { ipcMain } from 'electron'
import os from 'os'
import { FindManyOptions } from 'typeorm'
import userController from '../database/controller/user'

ipcMain.handle('user.logged', () => userController.findByLogin(os.userInfo().username))
ipcMain.handle('user.all', (_event, filter: FindManyOptions<User>) =>
  userController.findAll(filter)
)
ipcMain.handle('user.search', (_event, filter: FindManyOptions<User>, search: string) =>
  userController.search(filter, search)
)
ipcMain.handle('user.find', (_event, id: number) => userController.findById(id))
ipcMain.handle('user.update', (_event, user: User) => userController.update(user))
ipcMain.handle('user.save', (_event, user: User) => userController.save(user))
