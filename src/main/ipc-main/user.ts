import { User } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import userController from '../database/controller/user'
import { loggedUser } from '../database/controller/login'

ipcMain.handle('user.logged', () => loggedUser)
ipcMain.handle('user.all', (_event, args: [FindManyOptions<User>]) => {
  try {
    return userController.findAll(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('user.search', (_event, args: [FindManyOptions<User>, string]) => {
  try {
    return userController.search(args[0], args[1])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('user.find', (_event, args: [number]) => {
  try {
    return userController.findById(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('user.update', (_event, args: [User]) => {
  try {
    return userController.update(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('user.save', (_event, args: [User]) => {
  try {
    return userController.save(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})
